#Then copy it to docs as thats how you can use git webpages as docs can be root.
#You have to update  "homepage": "./", in package json
#To make it all relative.
#chmod +x build.sh 
#$ ./build.sh

npm run build
rm -rf docs
mv build docs
