const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  //instructions on whether to add error details. Set to
  // 'auto' showing details when is 2 or less
  stats: {
    errorDetails: true
  },

  // Set the mode to development or production
  mode: 'development',
  watch: true,

  // Control how source maps are generated
  devtool: 'inline-source-map',

  entry: {
    index: './src/js/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'js/bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src',
          globOptions: {
            ignore: [
              '**/js/*',
            ],
          },
        }],
      options: {
        concurrency: 100,
      },
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    open: true,
    compress: true,
    port: 8080,

  },
};
