#!/env/bash

echo "Version (e.g. 1.1)"

read version

zip -r build-v$version.zip ./ -x "*.DS_Store" "*.svg" \*.git\* "*README.md" \*.chrome\*