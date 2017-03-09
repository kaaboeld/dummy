const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const sourcePath = path.join(__dirname, './src');
const distPath = path.join(__dirname, './dist');

module.exports = function(env) {
	const nodeEnv = process.env.NODE_ENV;
	const isProd = nodeEnv == 'production';

	let modules = {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: [{
				loader: 'babel-loader',
			}, {
				loader: 'eslint-loader'
			}]
		}, {
			test: /\.jade$/,
			exclude: /(node_modules)/,
			loader: 'jade-loader'
		}, {
			test: /\.css$/,
			exclude: /(node_modules)/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader?importLoaders=1', 'postcss-loader']
			})
		}]
	};
	let plugins = [
		new HtmlWebpackPlugin({
			template: './app/jade/index.jade'
		}),
		new ExtractTextPlugin({ filename: 'app.css', disable: false, allChunks: true }),
	];
	return {
		devtool: isProd ? 'source-map' : 'eval',
		context: sourcePath,
		entry: {
			index: 'index.js',
		},
		output: {
			path: distPath,
			filename: '[name].bundle.js'
		},
		module: modules,
		plugins,
		resolve: {
			extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js'],
			modules: [
				path.resolve(__dirname, 'node_modules'),
				sourcePath
			]
		},
		devServer: {
			contentBase: distPath,
			port: 3000,
			compress: isProd,
			historyApiFallback: true,
			stats: {
				assets: true,
				children: false,
				chunks: false,
				hash: false,
				modules: false,
				publicPath: false,
				timings: true,
				version: true,
				warnings: true,
				colors: {}
			}
		}
	};
}
