var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
	entry : 'src/main.ts',
	output : {
		path : __dirname + '/webapp',
		publicPath : 'webapp/',
		filename : 'stattool.js'
	},
	module : {
		loaders : [{
			test : /\.ts$/,
			loaders : [ 'ts-loader','angular2-template-loader'],
			exclude: /(node_modules)/
		},{
			test : /\.html$/,
			loader : 'html-loader'
		}]
	},
	resolve : {
		root: path.resolve(__dirname),
		modulesDirectories:['node_modules'],
		extensions:[ '', '.js', '.ts','.umd.js','.css'],
	},
	plugins :[new webpack.optimize.OccurrenceOrderPlugin(true)],
	devtool: 'inline-source-map'
};
