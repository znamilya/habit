'use strict';

var webpack           = require('webpack');
var path              = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer      = require('autoprefixer');

var PATHS = {
    src: path.join(__dirname, '..', 'src', 'client'),
    dist: path.join(__dirname, '..', 'public'),
};
var PORT = 7777;

module.exports = {
    devtool: 'eval',
    target: 'web',
    entry: [
        'webpack-dev-server/client?http://localhost:' + PORT,
        'webpack/hot/only-dev-server',
        PATHS.src + '/main',
    ],

    output: {
        path: PATHS.dist,
        filename: 'main.js',
        publicPath: '/',
    },

    resolve: {
        root: PATHS.src,
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx'],
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*'],
        extensions: ['', '.js'],
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                include: PATHS.src,
                loaders: ['babel-loader'],
            },
            {
                test: /\.jsx?$/,
                include: PATHS.src,
                loaders: ['react-hot-loader', 'babel-loader'],
            },
            {
                test: /\.styl$/,
                loaders: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'],
                // loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'),
            },
            {
                test: /\.svg$/,
                loaders: ['file-loader?name=svg/[name].[ext]'],
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$/,
                loaders: ['file-loader?name=img/[name].[ext]'],
            },
        ],
    },

    postcss: function () {
        return [autoprefixer];
    },

    plugins: [
        // new ExtractTextPlugin('main.css'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],

    devServer: {
        port: PORT,
        host: 'localhost',
        hot: true,
        historyApiFallback: true,
        proxy: {
            '*': 'http://localhost:7878',
        },
    },
};
