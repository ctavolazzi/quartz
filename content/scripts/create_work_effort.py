#!/usr/bin/env python3

import os
import sys
from datetime import datetime
import re
import logging
import signal

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(message)s'  # Simplified format for user-facing messages
)
logger = logging.getLogger(__name__)

# Get date info once
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
CURRENT_YEAR = NOW.year
CURRENT_DATE = NOW.strftime("%m%d")

BASE_PATH = "/Users/ctavolazzi/Code/quartz/content/work-efforts"

# Regular expression patterns
FULL_WE_PATTERN = r'^WE\d{4}-\d{4}-\d{4}$'
CODE_ONLY_PATTERN = r'^\d{4}$'
CODE_DATE_PATTERN = r'^\d{4}-\d{4}$'
CHILD_PATTERN = r'^\d{4}-[a-z]$'

# Valid child effort types with their metadata
VALID_CHILD_TYPES = {
    'a': ('Frontend Implementation', ['frontend', 'ui-ux']),
    'b': ('Backend Implementation', ['backend', 'api']),
    'c': ('Database Implementation', ['database', 'data-model']),
}

def validate_environment():
    """Validates required paths and permissions."""
    if not os.path.exists(BASE_PATH):
        logger.error(f"Error: Base path does not exist: {BASE_PATH}")
        logger.info("Please create the work-efforts directory or update BASE_PATH")
        sys.exit(1)

    if not os.access(BASE_PATH, os.W_OK):
        logger.error(f"Error: No write permission for: {BASE_PATH}")
        logger.info("Please check directory permissions")
        sys.exit(1)

def validate_we_id(we_id: str) -> str:
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

    # Add pattern for child efforts (e.g., 2432-a)
    child_pattern = r'^\d{4}-[a-z]$'

    # If it's a child effort format
    if re.match(child_pattern, we_id):
        code, suffix = we_id.split('-')
        return f"WE{code}-{CURRENT_DATE}-{CURRENT_YEAR}-{suffix}"

    raise ValueError("Invalid WE ID format")

def check_existing_we(we_path):
    """Check if work effort already exists."""
    if os.path.exists(we_path):
        return True
    return False

def get_parent_id(we_id: str) -> str | None:
    """Extracts parent ID from a child work effort ID."""
    # For IDs like WE2432-1117-2024-a, return WE2432-1117-2024
    if re.search(r'-[a-z]$', we_id):
        return we_id.rsplit('-', 1)[0]
    return None

def update_parent_child_efforts(parent_file, child_id):
    """Updates parent's child-efforts array while preserving existing children.

    Args:
        parent_file (str): Path to the parent work effort's markdown file
        child_id (str): ID of the child work effort to add
    """
    with open(parent_file, 'r') as f:
        content = f.read()

    # Extract current child-efforts
    match = re.search(r'child-efforts: \[(.*?)\]', content, re.DOTALL)
    if match:
        current_children = match.group(1).strip()
        new_child = f'"[[{child_id}]]"'

        if current_children:
            # Add new child to existing list
            children_list = f"{current_children}, {new_child}"
        else:
            # First child
            children_list = new_child

        # Update content
        content = re.sub(
            r'child-efforts: \[(.*?)\]',
            f'child-efforts: [{children_list}]',
            content,
            flags=re.DOTALL
        )

        with open(parent_file, 'w') as f:
            f.write(content)

def check_existing_child_suffix(parent_id, suffix):
    """Check if a child effort with this suffix already exists."""
    parent_path = os.path.join(BASE_PATH, parent_id)
    if os.path.exists(parent_path):
        # Check for any file matching the pattern WE{code}-{date}-{year}-{suffix}
        pattern = f"*-{suffix}"
        for item in os.listdir(parent_path):
            if item.endswith(f"-{suffix}.md"):
                return True
    return False

def get_child_metadata(suffix):
    """Returns common metadata based on child effort suffix."""
    metadata = {
        'a': {
            'title_suffix': 'Frontend Implementation',
            'tags': ['frontend', 'ui-ux'],
        },
        'b': {
            'title_suffix': 'Backend Implementation',
            'tags': ['backend', 'api'],
        },
        'c': {
            'title_suffix': 'Database Implementation',
            'tags': ['database', 'data-model'],
        }
    }
    return metadata.get(suffix, {
        'title_suffix': 'Component Implementation',
        'tags': ['component'],
    })

def validate_child_suffix(suffix):
    """Validates that the child suffix is supported."""
    valid_suffixes = {'a', 'b', 'c'}  # Add more as needed
    if suffix not in valid_suffixes:
        logger.warning(f"Warning: Suffix '{suffix}' is not standard.")
        logger.info("Standard suffixes are:")
        logger.info("  a - Frontend Implementation")
        logger.info("  b - Backend Implementation")
        logger.info("  c - Database Implementation")
        response = input("Continue anyway? (y/N): ").lower()
        return response == 'y'
    return True

def cleanup_failed_creation(we_path):
    """Removes partially created work effort directory on failure."""
    try:
        if os.path.exists(we_path):
            import shutil
            shutil.rmtree(we_path)
            logger.info(f"Cleaned up partial creation at: {we_path}")
    except Exception as e:
        logger.error(f"Error during cleanup: {str(e)}")

def create_we_structure(we_id: str) -> bool:
    """Creates the work effort folder structure and files."""
    we_path = os.path.join(BASE_PATH, we_id)

    # Check if already exists
    if check_existing_we(we_path):
        logger.error(f"Error: Work Effort {we_id} already exists!")
        return False

    # Check for duplicate child suffixes
    parent_id = get_parent_id(we_id)
    if parent_id and re.search(r'-[a-z]$', we_id):
        suffix = we_id[-1]
        if not validate_child_suffix(suffix):
            return False
        if check_existing_child_suffix(parent_id, suffix):
            logger.error(f"Error: A child effort with suffix '{suffix}' already exists!")
            return False

    # Check if parent exists when creating child effort
    if parent_id:
        parent_path = os.path.join(BASE_PATH, parent_id)
        if not os.path.exists(parent_path):
            logger.error(f"Error: Parent work effort {parent_id} doesn't exist!")
            logger.info("Please create the parent work effort first.")
            return False

    try:
        # Create directories
        os.makedirs(os.path.join(we_path, "chats"))

        # Get parent ID if this is a child effort
        parent_id = get_parent_id(we_id)

        # Get additional metadata for child efforts
        extra_tags = []
        title_suffix = ""
        if parent_id and re.search(r'-[a-z]$', we_id):
            suffix = we_id[-1]
            metadata = get_child_metadata(suffix)
            extra_tags = metadata['tags']
            title_suffix = f" - {metadata['title_suffix']}"

        # Create main WE file
        with open(os.path.join(we_path, f"{we_id}.md"), 'w') as f:
            f.write(f"""---
title: "{we_id}{title_suffix}"
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
  {' '.join([f'- {tag}' for tag in extra_tags])}
related:
  - "[[Work Efforts Management]]"
  - "[[Technical Documentation]]"
  - "[[Implementation Guidelines]]"
parent-effort: {f'"[[{parent_id}]]"' if parent_id else "null"}
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

        # Update parent's child-efforts if this is a child effort
        if parent_id:
            parent_file = os.path.join(BASE_PATH, parent_id, f"{parent_id}.md")
            if os.path.exists(parent_file):
                update_parent_child_efforts(parent_file, we_id)

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
        if parent_id:
            logger.info(f"Created child effort {we_id} under parent {parent_id}")
            logger.info(f"Updated parent's child-efforts array")
        else:
            logger.info(f"Created main work effort {we_id}")
        return True

    except PermissionError:
        logger.error(f"Permission denied when creating: {we_path}")
        logger.info("Please check your file permissions")
        return False
    except FileExistsError:
        logger.error(f"Work Effort already exists: {we_id}")
        return False
    except Exception as e:
        logger.error(f"Error creating Work Effort: {str(e)}")
        cleanup_failed_creation(we_path)
        return False

def main():
    if len(sys.argv) < 2:
        logger.error("\nError: No Work Effort ID provided!")
        logger.info("\nUsage: python create_work_effort.py <WE_ID>")
        logger.info("\nExamples:")
        logger.info("  python create_work_effort.py 2432          # Uses today's date")
        logger.info("  python create_work_effort.py 2432-1117     # Uses current year")
        logger.info("  python create_work_effort.py WE2432-1117-2024  # Uses exact ID")
        logger.info("  python create_work_effort.py 2432-a        # Creates child effort")
        logger.info("\nFormat options:")
        logger.info("  - 4 digits (e.g., 2432)")
        logger.info("  - code-date (e.g., 2432-1117)")
        logger.info("  - full ID (e.g., WE2432-1117-2024)")
        logger.info("  - child effort (e.g., 2432-a)")
        sys.exit(1)

    dry_run = '--dry-run' in sys.argv
    we_id_arg = next(arg for arg in sys.argv[1:] if not arg.startswith('--'))

    try:
        we_id = validate_we_id(we_id_arg)
        if dry_run:
            logger.info(f"Dry run: Would create Work Effort {we_id}")
            logger.info(f"  - Directory: {os.path.join(BASE_PATH, we_id)}")
            if get_parent_id(we_id):
                logger.info(f"  - Parent: {get_parent_id(we_id)}")
            return
        create_we_structure(we_id)
    except ValueError as e:
        logger.error(f"\nError: {str(e)}")
        logger.info("\nPlease use one of these formats:")
        logger.info("  - 4 digits (e.g., 2432)")
        logger.info("  - code-date (e.g., 2432-1117)")
        logger.info("  - full ID (e.g., WE2432-1117-2024)")
        logger.info("  - child effort (e.g., 2432-a)")
        sys.exit(1)

def signal_handler(signum, frame):
    """Handle interrupt signals gracefully."""
    logger.info("\nOperation cancelled by user")
    sys.exit(1)

signal.signal(signal.SIGINT, signal_handler)

if __name__ == "__main__":
    main()