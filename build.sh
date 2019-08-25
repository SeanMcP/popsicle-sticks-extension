#!/env/bash

echo "Version (e.g. 1.1)"

read version

mkdir temp/ build/

rm -rf build/*

cp -r src/ temp/ && cp manifest.json temp/

cd temp/

zip -r -X ../build/popsicle-sticks-extension-v$version.zip .

cd ..

rm -rf temp/