module.exports = {

    //  entry: {
    //          app: [
    //              'webpack-dev-server/client?http://localhost:8080/',
    //              __dirname + "/app/index.jsx"
    //          ]
    //      },

    entry: __dirname + "/app/index.jsx", //已多次提及的唯一入口文件
    output: {
    path: __dirname + "/build",//打包后的文件存放的地方
    filename: "lessonh5.js"//打包后输出文件的文件名
  },
module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
  query:
      {
        "plugins": ["transform-decorators-legacy"],
        presets:['react','es2015','stage-0']
      }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    },{
      test: /\.(png|jpg)$/,
      loader: 'url-loader'
    }]
  }

}

