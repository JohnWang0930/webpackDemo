var HtmlWebpackPlugin = require('html-webpack-plugin');
var deleteFolderRecursive = require('./tools/rm')

deleteFolderRecursive('./public') // 删除public文件夹
console.log('has been delete')

var appJson = require('./app/app.json')
var entry = appJson.pages
entry = ['app']
function parseEntry(arr){
  var name = ''
  var itemArr=[]
  var obj = {}
  arr.forEach(function(item){
    obj['/' + item] = __dirname+ '/app/'+item+'.js'
  });
  obj['/app']=__dirname+ '/app/app.js'
  return obj
}
console.log(parseEntry(entry))


console.log(__dirname)
module.exports = {
  mode: 'development',
  // devtool: 'source-map',
  devtool: false,
  entry: parseEntry(entry),
  output: {
    path: __dirname + '/public',
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

}