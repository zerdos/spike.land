module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'postcss-loader', 'autoprefixer'],
        }
      ]
    }
  }