'use strict';

const webpack           = require('webpack');
const path              = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer      = require('autoprefixer');

const PATHS = {
    src: path.join(__dirname, '..', 'src', 'client'),
    dist: path.join(__dirname, '..', 'public'),
};
const PORT = 7777;

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
        new HtmlWebpackPlugin({
            inject: true,
            template: './src/client/index.tpl.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            DEV: true,
            PROD: false,
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],

    devServer: {
        port: PORT,
        host: 'localhost',
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/api/*': 'http://localhost:7878',
        },
    },
};
