let HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
    baseUrl: '',
    configureWebpack: config => {
        config.optimization = {
            splitChunks: {
                chunks: 'all'
            }
        }
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].inlineSource = '.js$';
                return args
            })
        config
            .plugin('html-inline-source')
            .use(HtmlWebpackInlineSourcePlugin)
    }
}