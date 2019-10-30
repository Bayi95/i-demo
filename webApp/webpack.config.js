var webpack = require('webpack')
var autoprefixer = require('autoprefixer');//自动加前缀
//webpack插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './src/app.js',
        vendor: ["react","react-dom","react-router","history","whatwg-fetch"]
    },
    output: {
        filename: 'bundle.js',
        publicPath: "./"
    },
    module: {
        loaders: [
            //es6 react
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            //html
            {
                test: /\.html$/,
                loader: 'html'
            },
            //对图片做处理
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader?limit=10000&name=imgs/[hash:8].[name].[ext]'//小于10kb转为base64
            },
            //css
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
            },
            //scss
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader")
            }
        ]
    },
    devtool: '#eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin("[name].[hash].css"),
        //第一个对应entry里的vendor 第二个是要生成的文件名字
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.[hash].js"),
        new CopyWebpackPlugin([{ from: 'vendor' }])
        
    ],
    // postcss: [ autoprefixer() ]//自动补齐前缀
    postcss: [ autoprefixer({ browsers: ['last 52 versions'] }) ]
}
if (process.env.NODE_ENV === 'production') {
//   module.exports.devtool = '#source-map' 生成.map文件
  module.exports.devtool = false
  module.exports.plugins = (module.exports.plugins || []).concat([
    //将react切换到产品环境
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    //压缩css html js
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,  // remove all comments
      },
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}