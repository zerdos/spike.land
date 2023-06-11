#!/bin/bash

# Directory to remove duplicates from
dir="/home/z/output/jpg"

# Create a temporary file to store file hashes
temp_file=$(mktemp)

# Find all files in the directory, calculate their hash, and store the results in the temporary file
find "$dir" -type f -name "*.jpg" -exec sh -c 'convert "$0" -strip -resize 8x8\! -colorspace Gray -format "%c" histogram:info:-' {} \; | sort > "$temp_file"

# Read the temporary file line by line
prev_hash=""
prev_file=""
while read -r line; do
echo $file
  # Extract the hash and file name from the line
  hash=$(echo "$line" | awk '{ print $1 }')
  file=$(echo "$line" | awk '{ print $2 }')

  # If the hash is the same as the previous hash, this file is a duplicate
  if [ "$hash" == "$prev_hash" ]; then
    # Remove the file
   echo " rm $file  "
  else
    # Remember this hash and file for the next iteration
    prev_hash="$hash"
    prev_file="$file"
  fi
done < "$temp_file"

# Remove the temporary file
rm "$temp_file"
