#!/bin/bash


export PHASH="/home/z/output/jpg/phash"
export DEDUP="/home/z/output/jpg/md5"

mkdir -p duplicated

mkdir -p  $PHASH $DEDUP
# Change to the directory containing the JPEG files

# Define the start number
export START=0

# Export the exiftool command as a function
exif_func() {
    # The first argument is the file name
    local file="$1"

    local file="$1"


    

    SUM=$(($PARALLEL_SEQ+$START))
    # Print the counter
    echo "Processing file #$SUM: $file"

    # Process the file
    
    exiftool -F "-DateTimeOriginal>FileModifyDate" "$file";
    md5=$(md5sum "$file" | awk '{print $1}')
    #hash=$(convert "$file" -resize 8x8 -colorspace Gray -format "%c" histogram:info:- )
    mv $file $DEDUP/$md5
    mkdir -p "$PHASH/${hash}"
    ln -P "$file" "$PHASH/${hash}/${md5}" || (mv $file ./duplicated/ && echo "duplicated $file" &&  ln -s "$PHASH/${hash}/${md5}" "$file" )

}
export -f exif_func

# Use parallel to process multiple files at the same time, with a maximum of 8 processes
# Skip the first START-1 files
find . -name "*.jpg" -type f | tail -n +$START | parallel -P 4 exif_func