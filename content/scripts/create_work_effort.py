#!/usr/bin/env python3

import os
import sys
from datetime import datetime
import re
import logging

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(message)s'  # Simplified format for user-facing messages
)
logger = logging.getLogger(__name__)

# Get date info once
NOW = datetime.now()
CURRENT_YEAR = NOW.year
CURRENT_DATE = NOW.strftime("%m%d")

BASE_PATH = "/Users/ctavolazzi/Code/quartz/content/work-efforts"

def validate_we_id(we_id):
    """Validates and completes partial WE IDs."""
    # Full ID pattern: WE2432-1117-2024
    full_pattern = r'^WE\d{4}-\d{4}-\d{4}$'

    # If it's already a full valid ID
    if re.match(full_pattern, we_id):
        return we_id

    # If it's just the 4-digit code (e.g., "2432")
    if re.match(r'^\d{4}$', we_id):
        return f"WE{we_id}-{CURRENT_DATE}-{CURRENT_YEAR}"

    # If it's code-date format (e.g., "2432-1117")
    if re.match(r'^\d{4}-\d{4}$', we_id):
        code, date = we_id.split('-')
        return f"WE{code}-{date}-{CURRENT_YEAR}"

    raise ValueError("Invalid WE ID format")

def check_existing_we(we_path):
    """Check if work effort already exists."""
    if os.path.exists(we_path):
        return True
    return False

def create_we_structure(we_id):
    """Creates the work effort folder structure and files."""
    we_path = os.path.join(BASE_PATH, we_id)

    # Check if already exists
    if check_existing_we(we_path):
        logger.error(f"Error: Work Effort {we_id} already exists!")
        return False

    try:
        # Create directories
        os.makedirs(os.path.join(we_path, "chats"))

        # Create main WE file
        with open(os.path.join(we_path, f"{we_id}.md"), 'w') as f:
            f.write(f"""---
title: "{we_id}"
created: {NOW.strftime("%Y-%m-%d")}
status: in-progress
type: documentation
aliases:
  - {we_id} Implementation
tags:
  - work-effort
  - technical-requirements
  - system-design
  - documentation
related:
  - "[[Work Efforts Management]]"
  - "[[Technical Documentation]]"
  - "[[Implementation Guidelines]]"
parent-effort: null
child-efforts: []
related-efforts: []
chat-router: "[[{we_id}/_router-{we_id}]]"
recent-chats: []
---

# {we_id}

## Initial Setup

> [!question] Initial Requirements
> **Preview:** [Brief description]
>
> > [!abstract]- Full Content (Click to expand)
> > ```markdown
> > [Detailed content]
> > ```

## Technical Requirements Development

### {we_id} - Iteration 1
[Initial iteration content]

## Overview
[Add work effort overview here]

## Objectives
- [ ] First objective
- [ ] Second objective

## Related Pages
- [[Work Efforts Management]]
- [[Technical Documentation]]
- [[Implementation Guidelines]]

## Tags
#work-effort
#technical-requirements
#system-design
#documentation

---

> [!note] Navigation
> - [[Previous: Work Efforts Overview]]
> - [[Next: Implementation Details]]
""")

        # Create router file
        with open(os.path.join(we_path, f"_router-{we_id}.md"), 'w') as f:
            f.write(f"""---
title: "Router - {we_id}"
work-effort: "[[{we_id}]]"
type: router
---

# Chat History for {we_id}

## Active Conversations
- None yet
  <!-- Format: [[CH{we_id[-4:]}-{CURRENT_DATE}-{CURRENT_YEAR}-001]] - Description -->

## Archived Conversations
- None yet

## Tags
#chat-history #{we_id}
""")

        logger.info(f"Successfully created Work Effort: {we_id}")
        return True

    except Exception as e:
        logger.error(f"Error creating Work Effort: {str(e)}")
        return False

def main():
    if len(sys.argv) != 2:
        logger.error("\nError: No Work Effort ID provided!")
        logger.info("\nUsage: python create_work_effort.py <WE_ID>")
        logger.info("\nExamples:")
        logger.info("  python create_work_effort.py 2432          # Uses today's date")
        logger.info("  python create_work_effort.py 2432-1117     # Uses current year")
        logger.info("  python create_work_effort.py WE2432-1117-2024  # Uses exact ID")
        logger.info("\nFormat options:")
        logger.info("  - 4 digits (e.g., 2432)")
        logger.info("  - code-date (e.g., 2432-1117)")
        logger.info("  - full ID (e.g., WE2432-1117-2024)")
        sys.exit(1)

    try:
        we_id = validate_we_id(sys.argv[1])
        create_we_structure(we_id)
    except ValueError as e:
        logger.error(f"\nError: {str(e)}")
        logger.info("\nPlease use one of these formats:")
        logger.info("  - 4 digits (e.g., 2432)")
        logger.info("  - code-date (e.g., 2432-1117)")
        logger.info("  - full ID (e.g., WE2432-1117-2024)")
        sys.exit(1)

if __name__ == "__main__":
    main()