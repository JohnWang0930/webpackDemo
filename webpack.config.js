var HtmlWebpackPlugin = require('html-webpack-plugin');
var fs = require('fs')

var deleteFolderRecursive = function(path) { // 递归删除文件夹下文件的方法
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

deleteFolderRecursive('./public')
console.log('delete')

module.exports = {
    mode:'production',
    devtool: 'source-map',
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + '/public',
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test:/\.html$/,
                use:'html-loader',
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
        new HtmlWebpackPlugin({
            template:'./app/page1/index.html',
        })
    ],
}