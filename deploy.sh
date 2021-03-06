# 在持续集成的设置中，设置在每次push代码时自动运行上述脚本。

# 确保脚本抛出遇到的错误
set -e

rm -rf pubilc

# 生成静态文件
npm run build

# 进入生成的文件夹
cd public
 
# 如果是发布到自定义域名
# echo 'www.yourwebsite.com' > CNAME

githubUrl=https://option-star:${GITHUB_TOKEN}@github.com/option-star/blog.git
git config --global user.email "2713554182@qq.com"
git config --global user.name "李佳成"

git init
git add -A
git commit -m "deploy"

# 如果你想要部署到 https://USERNAME.github.io
git push -f $githubUrl  master:gh-page

# 如果发布到 https://USERNAME.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:USERNAME/<REPO>.git master:gh-pages

cd -

rm -rf public

