const webpack = require('webpack');

module.exports = {
  entry: './lib/aes_json.js',
  output: {
    path: './web',
    filename: 'aes_json.js',
    library: 'AESjson'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: { presets: ['es2015']}
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false},
      output: { comments: false },
    })
  ]
}
