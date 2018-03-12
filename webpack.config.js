const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
  entry: {
    app : ['babel-polyfill', './src/index.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname,'dist'),
    publicPath: path.resolve(__dirname,'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015',  'react','stage-2']
        }
      },
      // {
      //    test: /\.js$/,
      //    exclude: /node_modules/,
      //    use: ['eslint-loader'],
      //  },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]'
      },
      {
         test: /\.(png|svg|jpg|gif)$/,
         loader: 'url-loader'
       },
       {
         test: /\.(csv|tsv)$/,
         loader: 'csv-loader'
       },
       {
         test: /\.xml$/,
         loader:  'xml-loader'
       }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot:true,
   },
  plugins: [
       // new HtmlWebpackPlugin({
       //   title: 'Login',
       //   hash:true
       // }),
       // new webpack.NamedModulesPlugin(),
       new webpack.HotModuleReplacementPlugin()
     ],
};

module.exports = config;
