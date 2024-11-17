#!/usr/bin/env python3

import unittest
import os
import shutil
from datetime import datetime
from create_work_effort import validate_we_id, check_existing_we, create_we_structure

class TestWorkEffortCreation(unittest.TestCase):
    def setUp(self):
        """Set up test environment with a temporary directory."""
        self.test_base_path = "/tmp/test_work_efforts"
        if os.path.exists(self.test_base_path):
            shutil.rmtree(self.test_base_path)
        os.makedirs(self.test_base_path)

        # Temporarily override the BASE_PATH in the main script
        import create_work_effort
        self.original_base_path = create_work_effort.BASE_PATH
        create_work_effort.BASE_PATH = self.test_base_path

    def tearDown(self):
        """Clean up test environment."""
        shutil.rmtree(self.test_base_path)
        # Restore original BASE_PATH
        import create_work_effort
        create_work_effort.BASE_PATH = self.original_base_path

    def test_validate_we_id(self):
        """Test WE ID validation and completion."""
        current_year = datetime.now().year
        current_date = datetime.now().strftime("%m%d")

        # Test full ID
        self.assertEqual(
            validate_we_id("WE2024-1117-2432"),
            "WE2024-1117-2432"
        )

        # Test partial ID (date-code)
        self.assertEqual(
            validate_we_id("1117-2432"),
            f"WE{current_year}-1117-2432"
        )

        # Test minimal ID (just code)
        self.assertEqual(
            validate_we_id("2432"),
            f"WE{current_year}-{current_date}-2432"
        )

        # Test invalid formats
        with self.assertRaises(ValueError):
            validate_we_id("invalid")
        with self.assertRaises(ValueError):
            validate_we_id("WE-1234")
        with self.assertRaises(ValueError):
            validate_we_id("123")

    def test_check_existing_we(self):
        """Test work effort existence checking."""
        test_we_path = os.path.join(self.test_base_path, "WE2024-1117-2432")

        # Should not exist initially
        self.assertFalse(check_existing_we(test_we_path))

        # Create the directory and check again
        os.makedirs(test_we_path)
        self.assertTrue(check_existing_we(test_we_path))

    def test_create_we_structure(self):
        """Test work effort creation."""
        we_id = "WE2024-1117-2432"

        # Test successful creation
        self.assertTrue(create_we_structure(we_id))

        # Verify directory structure
        we_path = os.path.join(self.test_base_path, we_id)
        self.assertTrue(os.path.exists(we_path))
        self.assertTrue(os.path.exists(os.path.join(we_path, "chats")))
        self.assertTrue(os.path.exists(os.path.join(we_path, f"{we_id}.md")))
        self.assertTrue(os.path.exists(os.path.join(we_path, f"_router-{we_id}.md")))

        # Test duplicate creation (should fail)
        self.assertFalse(create_we_structure(we_id))

    def test_file_contents(self):
        """Test the contents of created files."""
        we_id = "WE2024-1117-2432"
        create_we_structure(we_id)

        # Check main WE file
        with open(os.path.join(self.test_base_path, we_id, f"{we_id}.md"), 'r') as f:
            content = f.read()
            self.assertIn(f"title: \"{we_id}\"", content)
            self.assertIn("status: in-progress", content)
            self.assertIn("type: work-effort", content)

        # Check router file
        with open(os.path.join(self.test_base_path, we_id, f"_router-{we_id}.md"), 'r') as f:
            content = f.read()
            self.assertIn(f"title: \"Router - {we_id}\"", content)
            self.assertIn("type: router", content)

if __name__ == '__main__':
    unittest.main()