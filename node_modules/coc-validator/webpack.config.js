const pkg = require('./package.json')
const webpack = require('webpack')
const path = require('path')
// const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  target: 'node',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${pkg.name}.js`,
    libraryTarget: 'umd',
    library: `${pkg.name}`,
    umdNamedDefine: true,
    globalObject: 'this',
    publicPath: '/dist',
},
optimization: {
    minimizer: [
      // new TerserPlugin(),
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
            presets: [['es2015', { module: true }], 'stage-0']
          }
      },
      // {
      //   test: /\.js$/,
      //   use: ["source-map-loader"],
      //   enforce: "pre"
      // }
    ]
  },
  plugins: [
  // new TerserPlugin({
  //   parallel: true,
  //   terserOptions: {
  //     ecma: 6,
  //   },
  // }),
  ],
}
