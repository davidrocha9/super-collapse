const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};
