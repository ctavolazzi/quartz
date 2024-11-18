import os

def create_johnny_decimal_structure(base_path):
    """
    Creates the Johnny Decimal folder structure under the specified base path.
    Skips existing directories and ensures nothing is overwritten.
    Adds numbered subfolders according to the Johnny Decimal system.
    """
    structure = {
        "00-Foundations": ["00.01-Policies", "00.02-Values", "00.03-Contacts"],
        "01-Strategy": ["01.01-Goals", "01.02-Roadmap", "01.03-Vision"],
        "02-Knowledge": ["02.01-Research", "02.02-Guides", "02.03-Notes"],
        "03-Projects": ["03.01-Current", "03.02-Pending", "03.03-Completed"],
        "04-Outreach": ["04.01-Partners", "04.02-Events", "04.03-Talks"],
        "05-Labs": ["05.01-Prototypes", "05.02-Testing", "05.03-Reports"],
        "06-Systems": ["06.01-Tools", "06.02-Scripts", "06.03-Workflows"],
        "07-Financials": ["07.01-Income", "07.02-Expenses", "07.03-Inventory"],
        "08-Media": ["08.01-Videos", "08.02-Graphics", "08.03-Scripts"],
        "09-Archives": ["09.01-Old", "09.02-Legacy", "09.03-Misc"],
    }

    # Iterate through the structure and create directories and subdirectories
    for folder, subfolders in structure.items():
        folder_path = os.path.join(base_path, folder)
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)
            print(f"Created: {folder_path}")
        else:
            print(f"Skipped: {folder_path} (already exists)")

        # Create numbered subfolders
        for subfolder in subfolders:
            sub_path = os.path.join(folder_path, subfolder)
            if not os.path.exists(sub_path):
                os.makedirs(sub_path)
                print(f"Created: {sub_path}")
            else:
                print(f"Skipped: {sub_path} (already exists)")

if __name__ == "__main__":
    # Set the base path to the parent of the `scripts` directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    base_path = os.path.abspath(os.path.join(script_dir, ".."))  # This points to quartz/content

    # Ensure the base path exists
    if not os.path.exists(base_path):
        print(f"Error: Base path '{base_path}' does not exist. Please create it first.")
    else:
        print(f"Creating Johnny Decimal structure under '{base_path}'...")
        create_johnny_decimal_structure(base_path)
