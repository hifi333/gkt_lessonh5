const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: __dirname + "/app/index.jsx", //已多次提及的唯一入口文件
    output: {
    filename: "hotbundle.js"//打包后输出文件的文件名
  },
     
   devServer: {
    contentBase: path.join(__dirname, 'hotdevdist'),
    compress: true,
    port: 9000
   },


    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "plugins": ["transform-decorators-legacy"],
                        presets: ['es2015', 'react','stage-0']
                    }
                },
                exclude: /node_modules/
            },

            {
                test: /\.css$/,
                use: ['style-loader','css-loader'],
                
                exclude: /node_modules/
            },

            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader'],
                exclude: /node_modules/
            },
           {
                test: /\.(png|jpg)$/,
                use: {
                   loader: 'url-loader'
                },
                exclude: /node_modules/
            }

        ]
    },


    plugins: [

        //webpack 自带的js 压缩 plugin, 这样编译出来的bundle.js 就是压缩过的。 编译时间长。 开发模式下，不要用。


    ]


  }
