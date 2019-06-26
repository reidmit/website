#/usr/bin bash

rm -rf ./public

hugo

git subtree push --prefix public origin gh-pages