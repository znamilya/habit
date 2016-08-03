'use strict';

const webpack           = require('webpack');
const path              = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer      = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '..', 'src', 'client'),
    dist: path.join(__dirname, '..', 'public'),
};
const PORT = 7777;

module.exports = {
    target: 'web',
    entry: [
        PATHS.src + '/main',
    ],

    output: {
        path: PATHS.dist,
        filename: 'main.[hash:6].js',
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
                loader: 'babel-loader',
            },
            {
                test: /\.jsx?$/,
                include: PATHS.src,
                loader: 'babel-loader',
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!stylus-loader'),

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

    postcss: () => {
        return [autoprefixer];
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './src/client/index.tpl.html',
        }),
        new ExtractTextPlugin('main.css', { allChunks: true }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            DEV: false,
            PROD: true,
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        // new webpack.optimize.UglifyJsPlugin({
            // compress: {
                // warnings: false,
                // drop_console: true,
                // unsafe: true,
                // drop_debugger: true,
            // },
            // output: {
                // comments: false
            // }
        // }),
    ],
};
