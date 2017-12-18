// Vars
var webpack = require('webpack');
var path    = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// Consts
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'cheap-module-source-map', // This will show line numbers where errors are accured in the terminal
  devServer: {
    historyApiFallback: true, // This will make the server understand "/some-link" routes instead of "/#/some-link"
    contentBase: './'
  },
  entry: [
    './src/index.js'
  ],
  output: {
      path: path.resolve(__dirname, 'dist'), // This is used to specify folder for build bundle.
      filename: 'bundle.js', // Filename for production bundle
      publicPath: '/dist/'
  },
  resolve: {
      extensions: ['.jsx', '.js'] // Extensions that Webpack is going to expect
  },
  module: {
      // Loaders allow you to preprocess files as you require() or “load” them. Loaders are kind of like “tasks” in other build tools, and provide a powerful way to handle frontend build steps.
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [
              { 
                  loader: 'css-loader', 
                  options: { sourceMaps: true } 
              },
              { 
                  loader: 'postcss-loader' 
              },
              { 
                  loader: 'sass-loader', 
                  options: { sourceMaps: true } 
              }
            ],
            fallback: 'style-loader'
          })
        }
      ]
  },
  plugins: [
      new ExtractTextPlugin({
        filename: 'css/bundle.css',
        allChunks: true
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin(), //minify everything
      new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
      new webpack.HotModuleReplacementPlugin(), // Hot reloading
      new webpack.NoEmitOnErrorsPlugin() // Webpack will let you know if there are any errors
  ]
}

