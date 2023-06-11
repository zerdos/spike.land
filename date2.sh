#!/bin/bash

# Install exiftool if not installed
if ! command -v exiftool &> /dev/null
then
    echo "exiftool could not be found, installing..."
    sudo apt-get install exiftool
fi

# Install parallel if not installed
if ! command -v parallel &> /dev/null
then
    echo "parallel could not be found, installing..."
    sudo apt-get install parallel
fi

# Change to the directory containing the JPEG files
cd /path/to/jpeg/files

# Define the start number
export START=100

# Export the exiftool command as a function
exif_func() {
    # The first argument is the file name
    local file="$1"

    local file="$1"

    SUM=$(($PARALLEL_SEQ+$START))
    # Print the counter
    echo "Processing file #$SUM: $file"

    # Process the file
    exiftool "-DateTimeOriginal>FileModifyDate" "$file"
}
export -f exif_func

# Use parallel to process multiple files at the same time, with a maximum of 8 processes
# Skip the first START-1 files
find . -name "*.jpg" -type f | tail -n +$START | parallel -P 8 exif_func
