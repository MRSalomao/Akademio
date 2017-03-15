var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

// const sassLoaders = [
//   'css-loader',
//   'postcss-loader',
//   'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './src')
// ];

module.exports = {

  // Efficiently evaluate modules with source maps
  devtool: "eval",

  // Set entry point to ./src/main and include necessary files for hot load
  entry: [
    "webpack-dev-server/client?http://localhost:9090",
    "webpack/hot/only-dev-server",
    "./src/main"
  ],

  // This will not actually create a bundle.js file in ./build. It is used
  // by the dev server for dynamic hot loading.
  output: {
    path: __dirname + "/build/",
    filename: "app.js",
    publicPath: "http://localhost:9090/build/"
  },

  // Necessary plugins for hot load
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  // sassLoader: {
  //   includePaths: ['src']
  // },

  // Transform source code using Babel and React Hot Loader
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["react-hot", "babel-loader"] },
      { test: /react-icons\/(.)*(.js)$/, loader: 'babel-loader', query: {presets: ['es2015', 'react']} },
      { test: /\.sass$/, loaders: ['style', 'css', 'sass'] }
      // { test: /\.sass$/, loaders: ['style', 'css', 'sass'], include: path.join(__dirname, 'src') }
    ]
  },

  // Automatically transform files with these extensions
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.jsx', '.sass']
  }
};
