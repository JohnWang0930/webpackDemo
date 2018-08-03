var HtmlWebpackPlugin = require('html-webpack-plugin');
var deleteFolderRecursive = require('./tools/rm')

deleteFolderRecursive('./public') // 删除public文件夹
console.log('has been delete')

var appJson = require('./app/app.json')
var entry = appJson.pages
console.log(entry[0])

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    __dirname + "/app/app.js",
    __dirname + "/app/config.js"
  ],
  output: {
    path: __dirname + '/public',
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
          ]
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //     template:'./app/page1/index.html',
    // })
  ],
}