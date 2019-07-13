#/usr/bin bash

echo "Cleaning out ./public directory..."
rm -rf ./public/**

echo "Building site..."
hugo

echo "Pushing ./public to gh-pages branch..."
git subtree push --prefix public origin gh-pages

echo "Cleaning out ./public directory again..."
rm -rf ./public/**