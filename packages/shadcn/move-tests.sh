#!/bin/bash

# Script to move test files to __tests__ directory and remove the originals

# Base directories
SRC_DIR="packages/code/src"
TEST_DIR="packages/code/src/__tests__"

# Find all test files
find "$SRC_DIR" -name "*.test.*" -o -name "*.spec.*" | while read -r file; do
    # Skip files that are already in __tests__ directories
    if [[ "$file" == *"__tests__"* ]]; then
        echo "Skipping $file (already in __tests__)"
        continue
    fi
    
    # Skip .d.ts files (TypeScript declaration files)
    if [[ "$file" == *".d.ts" ]]; then
        echo "Skipping $file (declaration file)"
        continue
    fi
    
    # Get the relative path from SRC_DIR
    rel_path="${file#$SRC_DIR/}"
    
    # Get the directory part
    dir_part=$(dirname "$rel_path")
    
    # Get the filename part
    file_part=$(basename "$rel_path")
    
    # Create the target directory
    target_dir="$TEST_DIR/$dir_part"
    mkdir -p "$target_dir"
    
    # Copy the file to the target directory
    echo "Moving $file to $target_dir/$file_part"
    cp "$file" "$target_dir/$file_part"
    
    # Remove the original file
    echo "Removing original file $file"
    rm "$file"
done

echo "All test files have been moved to the __tests__ directory."
