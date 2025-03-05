#!/bin/bash

# Configuration - set the threshold for large files
LINE_THRESHOLD=200

# Optional: exclude folders like node_modules, dist, .next, etc.
EXCLUDE_DIRS="node_modules|dist|.next|build|coverage|public"

# Find all .ts and .tsx files, ignoring excluded directories
find . -type f \( -name "*.ts" -o -name "*.tsx" \) \
    | grep -Ev "/($EXCLUDE_DIRS)/" \
    | while read file; do
        line_count=$(wc -l < "$file")
        if [ "$line_count" -gt "$LINE_THRESHOLD" ]; then
            echo "$line_count lines - $file"
        fi
    done