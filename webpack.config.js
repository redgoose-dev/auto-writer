const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

// user variables
const libraryName = 'AutoWriter';

// set core
const core = (env, options) => {
  let isDev = options.mode === 'development';
  let config = {
    mode: isDev ? 'development' : 'production',
    entry: './src/index.ts',
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: "ts-loader" },
      ],
    },
    plugins: [],
  };

  if (isDev)
  {
    /**
     * Development
     * Open the server for testing.
     */
    config.output = {
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[name].js',
      library: libraryName,
      libraryExport: 'default',
    };
    config.devtool = 'inline-source-map';
    config.devServer = {
      hot: true,
      host: '0.0.0.0',
      port: options.port || 4000,
      stats: { color: true },
      historyApiFallback: true,
      noInfo: true,
      contentBase: path.resolve(__dirname, 'dev'),
    };
    config.plugins.push(new HtmlWebpackPlugin({
      template: './dev/index.html',
      showErrors: true,
    }));
  }
  else
  {
    /**
     * Production
     */
    config.output = {
      filename: libraryName + '.js',
      path: path.resolve(__dirname, 'dist'),
      library: libraryName,
      libraryTarget: 'umd',
      libraryExport: 'default',
    };
    config.optimization = {
      minimizer: [
        new TerserJSPlugin({}),
      ],
    };
  }

  return config;
};


module.exports = core;
