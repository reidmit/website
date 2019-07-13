#/usr/bin bash

echo "Cleaning out ./public directory..."
rm -rf ./public/**

echo "Building site..."
hugo

echo "Cleaning out ./public directory again..."
rm -rf ./public/**

# git subtree push --prefix public origin gh-pages