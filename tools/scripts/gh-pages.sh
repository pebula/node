set -euo pipefail

##
# This script sync's gh-pages with new/updates builds in a manner suitable for a monorepo.
#
# Each directory in "dist/gh-pages" is a bundled app ready for GH Pages publishing
# We clone the repo in gh-pages branch and update physically existing apps in gh-pages and push to github.
# This way we only update new / updates apps. Unchanged apps remain untouched at the remote.
##

cd ./dist

if [[ "$PWD" =~ ^.+\/dist$ ]]
then
    rm -rf ./tmp
    git clone git@github.com:pebula/node.git tmp
    cd tmp
    git checkout gh-pages
    cd ..
    for dir in ./gh-pages/*
    do
      if [[ -d "$dir" && ! -L "$dir" ]]; then
        dir=${dir%*/}
        echo "${dir##*/}"
        rsync -a --delete "$dir"/ tmp/"${dir##*/}"/
      fi;
    done
    cd tmp
    git add .
    git commit -m "update"
    git push --set-upstream origin gh-pages
else
    echo "not"
fi

