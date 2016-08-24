const autoprefixer = require('autoprefixer');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = require('./config');

const webpackConfig = {
  devServer: {
    // option changes
    contentBase: './dist',
    host: config.host,
    port: config.port
  },

  // remove devtool

  entry: {
    app: [
      // remove lines here
      './src/index.js'
    ]
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
      // remove css/scss
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js'
  },

  plugins: [
    // remove HotModuleReplacementPlugin

    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      // new config
      minify: {
        collapseWhitespace: true
      }
    })
  ],

  postcss: [autoprefixer]
};

// new section to apply config based on our environment (dev or prod)
if (config.production) {
  // add css loader with ExtractTextPlugin
  webpackConfig.module.loaders.push({
    test: /\.(css|scss)$/,
    loader: ExtractTextPlugin.extract([
      'css?modules&importLoaders=1&minimize',
      'postcss',
      'sass'
    ])
  });
  // add optimizations
  webpackConfig.plugins.push(
    new ExtractTextPlugin('styles-[contenthash].css'),
    new webpack.optimize.DedupePlugin(), // remove duplicate code
    new webpack.optimize.OccurrenceOrderPlugin(), // webpack optimization
    new webpack.optimize.UglifyJsPlugin({
      comments: false, // remove comments
      compress: {
        warnings: false // disable command line warnings
      }
    }),
    // create global constants at compile time...
    // this enables the minification step to remove
    // entire environment specific code blocks (React.js)
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  );
} else {
  // devServer options
  webpackConfig.devServer.debug = true;
  webpackConfig.devServer.hot = true;
  // source maps
  webpackConfig.devtool = 'source-map';
  // add css loader
  webpackConfig.module.loaders.push({
    test: /\.(css|scss)$/,
    loaders: [
      'style',
      'css?modules&sourceMap&importLoaders=1',
      'postcss',
      'sass'
    ]
  });
  // add HMR
  webpackConfig.entry.app.unshift(
    `webpack-dev-server/client?http://${config.host}:${config.port}`,
    'webpack/hot/only-dev-server'
  );
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

// export our config variable
module.exports = webpackConfig;
