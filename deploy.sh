#/usr/bin bash

echo "Cleaning out ./public directory..."
rm -rf ./public/**

echo "Building site..."
hugo

echo "Committing ./public changes..."
git add public
currentDate=`date`
git ci -m "Deploy! ($currentDate)"

echo "Pushing ./public to gh-pages branch..."
git branch -D gh-pages || true
git subtree push --prefix public origin gh-pages

echo "Undoing deploy commit..."
git reset HEAD^

echo "Cleaning out ./public directory again..."
rm -rf ./public/**