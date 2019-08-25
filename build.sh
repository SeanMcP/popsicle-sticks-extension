#!/env/bash

mkdir temp/ build/

rm -rf build/*

cp -r src/ temp/ && cp manifest.json temp/

cd temp/

zip -r -X ../build/popsicle-sticks-extension.zip .

cd ..

rm -rf temp/