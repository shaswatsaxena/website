var path = require('path');

module.exports = {
  entry :{
    App :  "./app/assets/scripts/app.js",
    Vendor :  "./app/assets/scripts/Vendor.js"
  },
  mode: 'development',
  output : {
    path : path.resolve(__dirname, "./app/temp/scripts"),
    filename: "[name].js"
  },
  module : {
    rules: [
      {
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','es2015']
          }
        },
        test: /\.js$/,
        exclude: /(node_modules)/
      }
    ]
  }
}
