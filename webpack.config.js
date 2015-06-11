var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var appPath = path.resolve(__dirname, 'src', 'js', 'app.js');

var deps = [
    'react/dist/react.min.js'
];

var config = {
    context: __dirname,
    devtool: 'eval-source-map',
    entry: [

        // For hot style updates
        'webpack/hot/dev-server',

        // The script refreshing the browser on none hot updates
        'webpack-dev-server/client?http://localhost:3001',

        // The application
        appPath
    ],
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    resolve: {
        alias: {}
    },
    module: {
        noParse: [],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: [nodeModulesPath]
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.(png|jpg)$/, 
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    plugins: [new Webpack.HotModuleReplacementPlugin()]
};

deps.forEach(function(dep) {
    var depPath = path.resolve(nodeModulesPath, dep);
    config.resolve.alias[dep.split(path.sep)[0]] = depPath;
    config.module.noParse.push(depPath);
});

module.exports = config;
