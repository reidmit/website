#/usr/bin bash

echo "Cleaning out ./public directory..."
rm -rf ./public/**

echo "Building site..."
hugo

echo "Staging ./public changes..."
git add public

currentDate=`date`
git ci -m "Deploy! ($currentDate)"

echo "Pushing ./public to gh-pages branch..."
git subtree push --prefix public origin gh-pages

echo "Undoing deploy commit..."
git reset HEAD^

echo "Cleaning out ./public directory again..."
rm -rf ./public/**