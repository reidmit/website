#/usr/bin bash

origin="git@github.com:reid47/website.git"
date=`date`
message="Deploy! ($date)"

echo "Cleaning out ./public directory..."
rm -rf ./public/**

echo "Pulling in remote changes..."
pushd ./public
rm .gitkeep
git init .
git remote add origin-temp $origin
git pull origin-temp gh-pages
git checkout gh-pages
popd

echo "Building site..."
hugo

echo "Committing & pushing changes..."
pushd ./public
git commit -am "$message" && git push origin-temp gh-pages:gh-pages --force
rm -rf ./.git
popd

echo "Cleaning out ./public directory again..."
rm -rf ./public/**