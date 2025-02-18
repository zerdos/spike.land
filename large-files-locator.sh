#!/bin/bash

# Check if directory parameter is provided
if [ $# -ne 1 ]; then
    echo "Usage: $0 <directory_path>"
    exit 1
fi

# Check if provided path is a directory
if [ ! -d "$1" ]; then
    echo "Error: '$1' is not a directory"
    exit 1
fi

# Store the directory path
DIR="$1"

echo "Searching for the 10 files with the most lines in: $DIR"
echo "This might take a while depending on the directory size..."
echo

# Find all files, count lines in each file, sort by line count (numerically reversed),
# and take top 10. We exclude hidden directories and binary files.
find "$DIR" -type f \
    ! -path "*/\.*" \
    -exec file {} \; \
    | grep -v "binary" \
    | cut -d: -f1 \
    | xargs wc -l 2>/dev/null \
    | sort -nr \
    | head -n 10 \
    | awk '{
        printf "%-8s lines: %s\n", $1, $2
    }'

echo
echo "Search complete!"