var fs = require('fs');
var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

var entries = [
  "webpack-dev-server/client?http://0.0.0.0:9090",
  'webpack/hot/only-dev-server'
];

glob.sync("./lib/ext/*/dist/*.js").forEach(function(ext) {
  console.log('Loading Extension: ', ext);
  entries.push(ext);
});

entries.push('./src/index.js');

module.exports = {
  entry: entries,
  output: {
    path: path.join(__dirname, "public"),
    filename: 'bundle.js'
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildStart:['node scripts/generateResources.js']
    }),
    new CopyWebpackPlugin([
      { from: './resources/public/', to: path.join(__dirname, "public")},
      { from: './resources/', to: path.join(__dirname, "public/resources")},
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/vertx/)
  ],
  debug: true,
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.scss']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/,    loader: 'babel', include: path.join(__dirname, 'src'), exclude: '/node_modules/' },
      { test: /\.scss$/,    loader: 'style!css!sass' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  node: {
    fs: "empty"
  }
};