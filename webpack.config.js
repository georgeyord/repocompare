var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '/app/index.html'),
  filename: '../index.html',
  inject: 'body'
});

module.exports = {
  devtool: 'cheap-module-inline-source-map',
  entry: './app/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: "dist/"
  },
  devServer: {
    hot: true,
    inline: true,
    port: 8080,
    historyApiFallback: true
  },
  module: {
    preLoaders: [
      {
        test: [/\.js$/, /\.jsx$/],
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: [/\.js$/, /\.jsx$/],
        include: path.join(__dirname, 'app'),
        loader: "babel"
      },
      {
        test: /\.json$/,
        include: path.join(__dirname, 'app'),
        loader: "json"
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  resolve: {
    // root: path.resolve('./app'), // TODO: Enable it and fix paths
    extensions: ['', '.js', '.jsx', '.json', '.scss'],
    modulesDirectories: ['node_modules']
  },
  plugins: [HTMLWebpackPluginConfig]
}
