#!/usr/bin/env sh
# prek commit-msg hook: validate the commit message with cocogitto.
# prek passes the path to the staged commit-message file as the last argument.
set -e
msg_file="$1"
cog verify "$(cat "$msg_file")"
