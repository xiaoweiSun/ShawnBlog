const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry:	__dirname + "/app/main.js",//已多次提及的唯一入口文件
	output: {
		path: __dirname + "/build",//打包后的文件存放的地方
		filename: "bundle.js"//打包后输出文件的文件名
	},

	devServer: {
		contentBase: "./build",//本地服务器所加载的页面所在的目录
		historyApiFallback: true,//不跳转
		inline: true,//实时刷新
		proxy: {
			'/': {
				target: 'http://localhost:80/'
			}
		}
	},
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				use: [
					{
						loader: "babel-loader"
					},
					{
						loader: "eslint-loader",
            options: {
              formatter: require('eslint-friendly-formatter'),   // 编译后错误报告格式
              fix: true
            }
					}
				],
				exclude: /node_modules/
			},
			{
				test: /(\.vue)$/,
				use: [
					{
						loader: "vue-loader",
            options: {
              loaders: {
                scss: 'vue-style-loader!css-loader!sass-loader' // <style lang="scss">
              }
            }
					},
					{
						loader: "eslint-loader",
						options: {
							formatter: require('eslint-friendly-formatter'),	 // 编译后错误报告格式
              fix: true
						}
					}
				],
				exclude: /node_modules/
			},
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
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