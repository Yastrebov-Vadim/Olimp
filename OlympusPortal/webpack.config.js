var webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    entry: {
        'polyfills': './app/polyfills.ts',
        'vendor': './app/vendor.ts',
        'app': './app/main.ts'
    },
    output: {
        path: path.resolve('Scripts/minify'),
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.html', '.css']
    },

    module: {
        rules: [

          {
              test: /\.ts$/,
              loaders: ['awesome-typescript-loader', 'angular2-template-loader']
          },
          {
              test: /\.html$/,
              loaders: ['html-loader']
          },
          {
              test: /\.less$/,
              loaders: ['style-loader', 'css-loader?importLoaders=1', 'less-loader'],
              exclude: ['node_modules']
          },
          { //this rule will only be used for any vendors
              test: /\.css$/,
              loaders: ['style-loader', 'css-loader'],
              include: [/node_modules/]
          },
          {
              test: /\.css$/,
              loaders: ['to-string-loader', 'css-loader'],
              exclude: [/node_modules/] //add this line so we ignore css coming from node_modules
          },
          {
              test: /\.(jpe?g|png|gif|svg)$/i,
              use: [
                   'url-loader?limit=10000',
                   'img-loader'
              ]
          },
          {
              test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
              loader: 'file-loader?name=font/[name].[ext]'
          }

        ]
    },

    plugins: [
         new webpack.optimize.CommonsChunkPlugin({
             name: ['app', 'vendor', 'polyfills']
         }),
         new WebpackNotifierPlugin({
             title: 'Webpack', alwaysNotify: true, excludeWarnings: true
         }),
         new webpack.SourceMapDevToolPlugin({
             filename: '[name].js.map', exclude: ['vendor.js']
         })
    ]
};