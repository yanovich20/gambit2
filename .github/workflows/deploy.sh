#!/usr/bin/env sh

# abort on errors
set -e
npm install
# build
npm run build
pwd
# navigate into the build output directory
cd ..
pwd
cd ..
ls

cd dist
# если вы деплоите на кастомный домен
# echo 'www.example.com' > CNAME
pwd
eval "$(ssh-agent -s)"
chmod 600 ./../.github/id_rsa2
chmod 600 ./../.github/id_rsa2.pub
#ssh-add ./../.github/id_rsa2

git config --global user.email "yanovich20@gmail.com"
git config --global user.name "Anatoliy3"


git init
git add -A
git commit -m 'deploy'

# если вы деплоите на https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# если вы деплоите на https://<USERNAME>.github.io/<REPO>
#git push -f git@github.com:yanovich20/gambit2.git master:gh-pages
git push -f https://yanovich20.github.io/gambit2/gambit2.git master:gh-pages
cd -