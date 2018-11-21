let HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
let production = process.env.NODE_ENV === 'production';
module.exports = {
    baseUrl: '',
    configureWebpack: config => {
        if (production) {
            config.optimization = {
                splitChunks: {
                    chunks: 'all'
                }
            }
        }
    },
    chainWebpack: config => {
        if (production) {
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
}