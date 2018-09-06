# ShawnBlog
## Environment
1. Node:7.10.0
2. Webpack:4.6.0
3. Vue:2.5.16
4. MongoDB:3.6.4
## 包含功能
1. 文章的增删改查
2. 文章以markdown语法为基础来编辑与实时预览
3. 支持分类管理。可以为文章指定分类，以及按分类查看文章
4. 支持归档，文章以时间线的方式展示
5. 管理员登录
## 技术栈
### 前端
1. vue
2. Vue-router
3. Vue-session
4. Vue-axios
5. Marked
### 后端
1. Node.js
2. Express
3. connet-history-api-fallback
4. Mongoose
### 系统配置
1. Webpack
2. Babel
3. eslint
4. file-loader
5. html-webpack-plugin
## 项目目录
```
| package.json                    Node配置
| webpack.config.js               Webpack开发模式配置
| webpack.production.config.js    Webpack生产模式配置
| READMO.md                       Readme
| .babelrc                        Babel配置
| .eslintrc.js                    eslint配置
| .gitignore                      git配置
| index.js                        后端入口
|-node_modules                    Node模块
|-app                             前端
    |-components                  Vue组件
    |-router                      前端路由
    | App.vue                     Vue外层组件
    | favicon.png                 系统logo
    | index.tmpl.html             前端入口页面
    | main.js                     前端js入口
|-server                          服务端
    | db.js                       数据库
    | router.js                   后端路由
|-build                           项目打包后生成文件所在目录
```
## 项目启动
```
# clone项目
git clone

# 安装依赖
npm install

# 启动数据库
mongod

# 打包生产环境所需文件
npm run build

# 启动服务器
node index
```
