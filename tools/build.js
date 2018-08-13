var HtmlWebpackPlugin = require('html-webpack-plugin');
var deleteFolderRecursive = require('./rm')
var webpack = require('webpack')
var path = require('path')
var fs = require('fs')

deleteFolderRecursive(path.resolve(__dirname, '..','public')) // 删除public文件夹
console.log('has been delete')

var appJson = require(path.resolve(__dirname, '..','app','app.json'))
var entry = appJson.pages
console.log(entry)
// function parseEntry(arr){
//   var name = ''
//   var itemArr=[]
//   var obj = {}
//   arr.forEach(function(item){
//     obj['/' + item] =path.resolve(__dirname, '..','app',item+'.js')
//     obj['/app']=path.resolve(__dirname, '..','app','app.js')
//   })
//   return obj
// }
// console.log(parseEntry(entry))
console.log(process.cwd())
// function cpFile(arr){
//   arr.forEach(function(item){
//     fs.copyFileSync(path.resolve( 'app',item+'.js'), path.resolve('app',item+'111.js'),function(err){
//       if (err) throw err
//       console.log('sth wrong')
//     });
//     // fs.copyFileSync(path.resolve(__dirname, '..','app',item+'.js'), path.resolve(__dirname, '..','public',item+'.js'));
//     console.log(path.resolve(__dirname, '..','app',item+'.js')+'was copied');
//   });
// }
// cpFile(entry)

/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(src, dist, callback) {
  fs.access(dist, function(err){
    if(err){
      // 目录不存在时创建目录
      fs.mkdirSync(dist);
    }
    _copy(null, src, dist);
  });

  function _copy(err, src, dist) {
    if(err){
      callback(err);
    } else {
      fs.readdir(src, function(err, paths) {
        if(err){
          callback(err)
        } else {
          paths.forEach(function(path) {
            var _src = src + '/' +path;
            var _dist = dist + '/' +path;
            fs.stat(_src, function(err, stat) {
              if(err){
                callback(err);
              } else {
                // 判断是文件还是目录
                if(stat.isFile()) {
                  fs.writeFileSync(_dist, fs.readFileSync(_src));
                } else if(stat.isDirectory()) {
                  // 当是目录是，递归复制
                  copyDir(_src, _dist, callback)
                }
              }
            })
          })
        }
      })
    }
  }
}

copyDir(path.resolve( 'app'),path.resolve( 'public'),function(err){
  if (err) {
    console.log(err)
  }
})

// webpack({
//     mode: 'development',
//     // devtool: 'source-map',
//     devtool: false,
//     entry: parseEntry(entry),
//     output: {
//       path: path.resolve(__dirname, '..','public'),
//       filename: "[name].js"
//     },
//     module: {
//       rules: [
//         {
//           test: /\.js$/,
//           exclude: /node_modules/,
//           use: [
//             // {
//             //   loader: 'file-loader',
//             //   options: {
//             //     name: '[name]1.[ext]'
//             //   }
//             // },
//             {
//               loader: 'babel-loader',
//               options: {
//                 presets: ["env"]
//               }
//             }
//             ]
//         },
//         {
//           test: /\.html$/,
//           use: 'html-loader',
//         },
//         {
//           test: /\.css$/,
//           use: [
//             'style-loader',
//             'css-loader',
//           ]
//         },
//       ]
//     },
//     plugins: [
//       // TODO
//       // new webpack.optimize.CommonsChunkPlugin({
//       //   name: "commons",
//       //   // ( 公共chunk(commnons chunk) 的名称)
      
//       //   filename: "commons.js",
//       //   // ( 公共chunk 的文件名)
      
//       //   // minChunks: 3,
//       //   // (模块必须被3个 入口chunk 共享)
      
//       //   // chunks: ["pageA", "pageB"],
//       //   // (只使用这些 入口chunk)
//       // })
//     ], 
//     resolve: {
//       extensions: ['.js', '.json', '.scss'],
//     }
//   }, function(err, stats) {
//     if (err || stats.hasErrors()) {
//       // 在这里处理错误
//       console.log('error')
//     }
//     console.log('done')
//     // 处理完成
//   }) 

// function findSync(startPath) {
//   let result=[];
//   function finder(path) {
//       let files=fs.readdirSync(path);
//       files.forEach((val,index) => {
//           let fPath=join(path,val);
//           let stats=fs.statSync(fPath);
//           if(stats.isDirectory()) finder(fPath);
//           if(stats.isFile()) result.push(fPath);
//       });

//   }
//   finder(startPath);
//   return result;
// }
// let fileNames=findSync('./');