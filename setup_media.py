#!/usr/bin/env python3
"""
Setup script for Shoppit media directories
Run this script after cloning the repository to set up the required media directories.
"""

import os
import sys
from pathlib import Path

def setup_media_directories():
    """Create the required media directories for the Django application."""
    
    # Get the backend directory
    backend_dir = Path("backend")
    if not backend_dir.exists():
        print("Error: backend directory not found!")
        print("Please run this script from the project root directory.")
        sys.exit(1)
    
    # Define media directories to create
    media_dirs = [
        "media",
        "media/img",
        "media/profile_pictures"
    ]
    
    print("Setting up media directories...")
    
    for dir_path in media_dirs:
        full_path = backend_dir / dir_path
        if not full_path.exists():
            full_path.mkdir(parents=True, exist_ok=True)
            print(f"✓ Created: {full_path}")
        else:
            print(f"✓ Already exists: {full_path}")
    
    print("\nMedia directories setup complete!")
    print("\nNext steps:")
    print("1. Start the Django server: cd backend && python manage.py runserver 3000")
    print("2. Go to http://localhost:3000/admin/")
    print("3. Create a superuser if you haven't already: python manage.py createsuperuser")
    print("4. Add products with images through the admin interface")
    print("\nOr manually add images to:")
    print(f"  - {backend_dir}/media/img/ (for product images)")
    print(f"  - {backend_dir}/media/profile_pictures/ (for user profile pictures)")

if __name__ == "__main__":
    setup_media_directories() 