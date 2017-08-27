// Vars
var webpack = require('webpack');
var path    = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// Consts
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
    devtool: 'source-map', // This will show line numbers where errors are accured in the terminal
    devServer: {
        historyApiFallback: true, // This will make the server understand "/some-link" routes instead of "/#/some-link"
    },
    entry: [
        './src/scripts' // This is where Webpack will be looking for the entry index.js file
    ],
    output: {
        path: path.resolve(__dirname, 'build'), // This is used to specify folder for producion bundle
        filename: 'bundle.js', // Filename for production bundle
        publicPath: '/'
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
                    path.resolve(__dirname, "node_modules/") // Speaks for itself
                ],
                use: [
                    {
                        loader: "react-hot-loader" // Modules that help with hot reloading and ES6 transcription  
                    },
                    {  
                        loader: "babel-loader",
                        // Options to configure babel with
                        query: {
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
                            loader: "css-loader", 
                            options: { sourceMaps: true } 
                        },
                        { 
                            loader: "postcss-loader" 
                        },
                        { 
                            loader: "sass-loader", 
                            options: { sourceMaps: true } 
                        }
                    ],
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "css/bundle.css",
            allChunks: true
        }),
        new webpack.DefinePlugin({
              'process.env': {
                'NODE_ENV': JSON.stringify('production')
              }
            }),
        // new webpack.optimize.UglifyJsPlugin(), //minify everything
        new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
        new webpack.HotModuleReplacementPlugin(), // Hot reloading
        new webpack.NoEmitOnErrorsPlugin() // Webpack will let you know if there are any errors
    ]
}