#!/bin/bash
set -e

# Setup signal handlers
trap 'exit 0' SIGTERM

# Source profile if it exists
if [ -f "$HOME/.profile" ]; then
    source "$HOME/.profile"
fi

# Execute CMD
exec "$@" 