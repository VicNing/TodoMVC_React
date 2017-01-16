const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './js/app.jsx',
	output: {
		filename: 'bundle.js?[hash]',
		path: './dist/script',
		publicPath: '/'
	},
	module: {
		loaders: [{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react'],
					cacheDirectory: './cache'
				}
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader", "sass-loader")
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			}
		]
	},
	devServer: {
		inline: true,
		historyApiFallback: true

	},
	devtool: "source-map",
	plugins: [
		new ExtractTextPlugin("../css/[name].css?[hash]"),
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: '../index.html'
		}),
	]
};
