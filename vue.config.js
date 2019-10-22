module.exports = {
  publicPath: process.env.PUBLIC_PATH || "/",
  configureWebpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: [
        {
          loader: "html-loader"
        },
        {
          loader: "markdown-loader"
        }
      ]
    });
  }
};
