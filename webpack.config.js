const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
	mode: 'development',
	entry: './src',
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Tyson Farley Portfolio',
		}),
		new VueLoaderPlugin(),
		new VuetifyLoaderPlugin(),
		// Webpack 5 does not have process environment variables. Needed for Vuelidate.
		new webpack.EnvironmentPlugin({
			BUILD: 'web'
		})
	],
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true
	},
	module: {
		rules: [{
			test: /\.vue$/,
			loader: 'vue-loader'
		}, {
			test: /\.s(c|a)ss$/,
			use: [
				'vue-style-loader',
				'css-loader',
				{
					loader: 'sass-loader',
					options: {
						implementation: require('sass'),
					}
				}
			]
		}, {
			test: /\.css$/i,
			use: ["style-loader", "css-loader"],
		}]
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.min.js'
		},
		modules: [
			'node_modules',
			'src',
			'src/components',
			'src/pages',
			'src/plugins',
			'src/util',
		]
	}
};
