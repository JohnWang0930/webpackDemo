var HtmlWebpackPlugin = require('html-webpack-plugin');
var deleteFolderRecursive = require('./rm')
var webpack = require('webpack')
var path = require('path')

deleteFolderRecursive(path.resolve(__dirname, '..','public')) // 删除public文件夹
console.log('has been delete')

var appJson = require(path.resolve(__dirname, '..','app','app.json'))
var entry = appJson.pages
console.log(entry)
entry = ['app']
function parseEntry(arr){
  var name = ''
  var itemArr=[]
  var obj = {}
  arr.forEach(function(item){
    obj['/' + item] =path.resolve(__dirname, '..','app',item+'.js')
    obj['/app']=path.resolve(__dirname, '..','app','app.js')
  })
  return obj
}
console.log(parseEntry(entry))

webpack({
    mode: 'development',
    // devtool: 'source-map',
    devtool: false,
    entry: parseEntry(entry),
    output: {
      path: path.resolve(__dirname, '..','public'),
      filename: "[name].js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            // {
            //   loader: 'file-loader',
            //   options: {
            //     name: '[name]1.[ext]'
            //   }
            // },
            {
              loader: 'babel-loader',
              options: {
                presets: ["env"]
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
      // TODO
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: "commons",
      //   // ( 公共chunk(commnons chunk) 的名称)
      
      //   filename: "commons.js",
      //   // ( 公共chunk 的文件名)
      
      //   // minChunks: 3,
      //   // (模块必须被3个 入口chunk 共享)
      
      //   // chunks: ["pageA", "pageB"],
      //   // (只使用这些 入口chunk)
      // })
    ], 
    resolve: {
      extensions: ['.js', '.json', '.scss'],
    }
  }, function(err, stats) {
    if (err || stats.hasErrors()) {
      // 在这里处理错误
      console.log('error')
    }
    console.log('done')
    // 处理完成
  }) 