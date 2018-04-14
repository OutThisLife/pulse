module.exports = {
  webpack: config => {
    config.module.rules.push(
      {
        test: /\.(css|scss|sass)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.(scss|sass)$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader'
      }
    )

    return config
  }
}
