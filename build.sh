#!/env/bash

version=$(cat ./manifest.json | node -pe 'JSON.parse(fs.readFileSync(0)).version')

to_replace="%VERSION_NUMBER%"

sed -i '' "s/$to_replace/$version/g" ./src/views/settings.html

# zip -r build-v$version.zip ./manifest.json ./src/ -x "*.svg"

# There is probably a better way to do this.
sed -i '' "s/$version/$to_replace/g" ./src/views/settings.html

