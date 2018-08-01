const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        lessonh5: __dirname +"/app/index.jsx"
    },
    output: {
    path: __dirname + "/build",  //打包后的文件存放的地方
    filename: '[name].js'  //打包后输出文件的文件名
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

        //webpack 自带的js 压缩 plugin, 这样编译出来的bundle.js 就是压缩过的。 编译时间长。  这个plugin 在webpack4 下，还不会用呢？

        //如何让webpack编译出 react -- production version 呢？， 缺省的react 包都是development 的。
        // 用如下环境变量定义就OK了。 用react developtool测试一下就知道了。
        new webpack.DefinePlugin({
                 'process.env.NODE_ENV': JSON.stringify('production')
        })

    ]


}
