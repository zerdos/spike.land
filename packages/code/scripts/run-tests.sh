#!/bin/sh

set -u

# Configuration
MAX_OUTPUT_LINES=200
CONTEXT_LINES=10

# Create temporary files for buffering
stdout_file=$(mktemp) || { echo "Failed to create temporary file for stdout"; exit 1; }
stderr_file=$(mktemp) || { echo "Failed to create temporary file for stderr"; exit 1; }
filtered_file=$(mktemp) || { echo "Failed to create temporary file for filtering"; exit 1; }

# Cleanup function
cleanup() {
    rm -f "$stdout_file" "$stderr_file" "$filtered_file"
}
trap cleanup EXIT

# Run vitest with optimized settings for minimal output
# --bail=1: Stop after first test failure
# --reporter=default: Use default reporter (we'll filter output later)
# --no-coverage: Skip coverage to reduce output
# --no-watch: Ensure we're in run mode
if vitest \
    --no-color \
    --bail=1 \
    --reporter=default \
    --no-coverage \
    --no-watch \
    run "$@" > "$stdout_file" 2> "$stderr_file"; then
    exit_code=0
else
    exit_code=$?
fi

if [ "$exit_code" -ne 0 ]; then
    # Extract only the essential failure information
    {
        # First, show any test failure summary
        grep -E "(FAIL|✓|×|Error:|Expected:|Received:|AssertionError)" "$stdout_file" | \
            grep -v -E "(node_modules|\.yarn|\.pnp)" | \
            head -n 50
        
        echo ""
        echo "--- Error Details ---"
        
        # Show the actual error with some context
        # This captures the test file, test name, and error details
        awk '
        /FAIL.*\.(test|spec)\.(js|jsx|ts|tsx)/ { 
            print; 
            capture=1; 
            lines=0; 
            next;
        }
        capture && /^$/ { 
            if (lines > 0) capture=0; 
            next;
        }
        capture && lines < '"$CONTEXT_LINES"' { 
            if (!/(node_modules|\.yarn|\.pnp)/) {
                print; 
                lines++;
            }
        }
        /AssertionError:|Error:/ {
            if (!capture) {
                print;
                capture=1;
                lines=0;
            }
        }
        ' "$stdout_file" | head -n 100
        
        # If there's relevant stderr output, include it
        if [ -s "$stderr_file" ]; then
            echo ""
            echo "--- Standard Error ---"
            grep -v -E "(node_modules|\.yarn|\.pnp|Vite|vite)" "$stderr_file" | \
                grep -v "^$" | \
                head -n 50
        fi
    } > "$filtered_file"
    
    # Output the filtered content, limited to MAX_OUTPUT_LINES
    head -n "$MAX_OUTPUT_LINES" "$filtered_file"
    
    # If output was truncated, indicate this
    if [ "$(wc -l < "$filtered_file")" -gt "$MAX_OUTPUT_LINES" ]; then
        echo ""
        echo "... output truncated (showing first $MAX_OUTPUT_LINES lines) ..."
    fi
else
    # On success, show minimal success message
    echo "✓ All tests passed"
    
    # Optionally show test count
    grep -E "Test Files|Tests" "$stdout_file" | tail -n 2
fi

exit "$exit_code"