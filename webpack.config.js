var path = require('path');

module.exports = {
  entry : "./app/assets/scripts/app.js",
  mode: 'development',
  output : {
    path : path.resolve(__dirname, "./app/temp/scripts"),
    filename: "App.js"
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
