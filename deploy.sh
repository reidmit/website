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
sha=`git subtree split --prefix public master`
git push origin $sha:gh-pages --force

echo "Undoing deploy commit..."
git reset HEAD^

echo "Cleaning out ./public directory again..."
rm -rf ./public/**