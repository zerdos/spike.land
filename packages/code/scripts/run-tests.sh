#!/bin/sh
# This script buffers test output and shows filtered errors (max 10 lines) on failure.

# Enable error checking for undefined variables.
set -u

# Create temporary files for buffering.
stdout_file=$(mktemp) || { echo "Failed to create temporary file for stdout"; exit 1; }
stderr_file=$(mktemp) || { echo "Failed to create temporary file for stderr"; exit 1; }

# Run vitest with additional parameters silently and capture its exit code.
if vitest --no-color --reporter dot run "$@" > "$stdout_file" 2> "$stderr_file"; then
    exit_code=0
else
    exit_code=$?
fi

if [ "$exit_code" -ne 0 ]; then
    # Filter out lines containing '.yarn' or 'node_modules' and show at most 200 lines.
    grep -v '.yarn' "$stderr_file" | grep -v 'node_modules'  | head -n 500
else
    # On success, output the buffered stdout.
    cat "$stdout_file"
fi

# Clean up temporary files.
rm -f "$stdout_file" "$stderr_file"

exit "$exit_code"
