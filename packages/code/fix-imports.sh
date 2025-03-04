#!/bin/bash

# Script to fix import paths in test files moved to __tests__ directory

# Base directories
SRC_DIR="packages/code/src"
TEST_DIR="packages/code/src/__tests__"

# Find all test files in the __tests__ directory
find "$TEST_DIR" -name "*.test.*" -o -name "*.spec.*" | while read -r file; do
    # Skip .d.ts files and .snap files
    if [[ "$file" == *".d.ts" || "$file" == *".snap" ]]; then
        echo "Skipping $file (declaration or snapshot file)"
        continue
    fi
    
    # Get the relative path from TEST_DIR
    rel_path="${file#$TEST_DIR/}"
    
    # Get the directory part
    dir_part=$(dirname "$rel_path")
    
    # Calculate the relative path prefix to go back to src
    if [[ "$dir_part" == "." ]]; then
        # File is directly in __tests__ directory
        prefix="../"
    else
        # File is in a subdirectory of __tests__
        # Count the number of directories in the path
        depth=$(echo "$dir_part" | tr -cd '/' | wc -c)
        depth=$((depth + 1))
        
        # Create the prefix with the appropriate number of "../"
        prefix=""
        for ((i=0; i<depth; i++)); do
            prefix="../$prefix"
        done
    fi
    
    echo "Fixing imports in $file (prefix: $prefix)"
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Replace relative imports that don't start with "../" with the prefix
    sed "s/from ['\"]\\.\\/\\([^'\"]*\\)['\"];/from '${prefix}\\1';/g" "$file" > "$temp_file"
    sed -i "" "s/from ['\"]\\.\\.\\//from '${prefix}/g" "$temp_file"
    
    # Move the temporary file back to the original
    mv "$temp_file" "$file"
done

echo "All import paths have been fixed."
