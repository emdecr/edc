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
    },
    entry: [
        'babel-polyfill',
        'webpack-dev-server/client?http://127.0.0.1:8080/', // Specify the local server port
        'webpack/hot/only-dev-server', // Enable hot reloading
        './src/scripts' // This is where Webpack will be looking for the entry index.js file
    ],
    output: {
        path: path.resolve(__dirname, 'build'), // This is used to specify folder for build bundle.
        filename: 'bundle.js', // Filename for production bundle
        publicPath: '/build/'
    },
    resolve: {
        modules: [
            'node_modules', 
            'src',
            path.resolve(__dirname, 'src/scripts'),
            path.resolve(__dirname, 'node_modules')
        ], // Folders where Webpack is going to look for files to bundle together
        extensions: ['.jsx', '.js'] // Extensions that Webpack is going to expect
    },
    module: {
        // Loaders allow you to preprocess files as you require() or “load” them. Loaders are kind of like “tasks” in other build tools, and provide a powerful way to handle frontend build steps.
        rules: [
            {
                test: /\.jsx?$/, // Here we're going to use JS for react components but including JSX in case this extension is prefered
                exclude: [
                    path.resolve(__dirname, 'node_modules') // Speaks for itself
                ],
                use: [
                    {
                        loader: 'react-hot-loader' // Modules that help with hot reloading and ES6 transcription  
                    },
                    {  
                        loader: 'babel-loader',
                        // Options to configure babel with
                        options: {
                            plugins: ['transform-runtime'],
                            presets: ['es2015', 'stage-0', 'react'],
                        }
                    }
                ]
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