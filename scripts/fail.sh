#!/usr/bin/env bash

function fail {
    printf '%s\n' "$1" >&2    # Send message to stderr.
    exit "${2-1}"             # Return a code specified by $2, or 1 by default.
}
