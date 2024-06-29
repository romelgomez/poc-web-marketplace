#!/bin/bash

# The script checks if the SSH key already exists before attempting to generate it.
# It checks if the ssh-agent is already running before starting it.
# It checks if the configuration already exists in ~/.ssh/config before appending.
# It checks if the SSH key is already added to the ssh-agent before adding it.
# Added user feedback messages to inform the user about the actions being taken.

# Function to check if a string exists in a file
containsString() {
    local _file="$1"
    local _str="$2"
    grep -qF "$_str" "$_file"
}

# Prompt for email address
read -p "Enter your GitHub email address: " email

# Generate SSH key if it doesn't exist
if [ ! -f ~/.ssh/id_ed25519 ]; then
    ssh-keygen -t ed25519 -C "$email"
else
    echo "SSH key already exists. Skipping generation."
fi

# Start the ssh-agent if not running
if ! pgrep "ssh-agent" >/dev/null; then
    eval "$(ssh-agent -s)"
fi

# Create ~/.ssh/config if it doesn't exist
if [ ! -f ~/.ssh/config ]; then
    touch ~/.ssh/config
fi

# Add configuration to ~/.ssh/config if it doesn't exist
CONFIG_STRING="Host github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519"

if ! containsString ~/.ssh/config "Host github.com"; then
    echo "$CONFIG_STRING" >>~/.ssh/config
    echo "Configuration added to ~/.ssh/config."
else
    echo "Configuration already exists in ~/.ssh/config. Skipping."
fi

# Add SSH key to ssh-agent if not already added
if ! ssh-add -L | grep -qF "id_ed25519"; then
    ssh-add -K ~/.ssh/id_ed25519
    echo "SSH key added to ssh-agent."
else
    echo "SSH key already added to ssh-agent. Skipping."
fi

echo "Please ensure you add the public key (~/.ssh/id_ed25519.pub) to your GitHub account if you haven't already."
