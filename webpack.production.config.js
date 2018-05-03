const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'null',
    entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",//打包后的文件存放的地方
        filename: "bundle-[hash].js"//打包后输出文件的文件名
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /(\.vue)$/,
                use: {
                    loader: "vue-loader"
                },
                exclude: /node_modules/
            }
        ]
    },
    performance: {
        hints: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html" // new 一个这个插件的实例，并传入相关的参数
        })
    ]
}