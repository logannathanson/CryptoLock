var config = {
   entry: './main.js',
   output: {
      path:'/',
      filename: 'index.js',
   },
   devServer: {
      inline: true,
      port: 8080
   },
   module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            cacheDirectory: true,
            presets: ['react', 'es2015']
          }
        },
        {
          test: /\.css$/,
          loader: 'css-loader'
        }
      ]
   }
}
module.exports = config;