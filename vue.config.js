let HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
let production = process.env.NODE_ENV === 'production';
module.exports = {
    baseUrl: '',
    configureWebpack: config => {
        config.module.rules.push(
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'html-loader'
                    },
                    {
                        loader: 'markdown-loader',
                    }
                ]
            }
        )
    },
    chainWebpack: config => {
        // Use webpack-chain to modify existing html-webpack-plugin
        if (production) {
            config
                .plugin('html')
                .tap(args => {
                    args[0].inlineSource = '.js$';
                    return args
                })
            // html-inline-source inlines js files into the output html
            config
                .plugin('html-inline-source')
                .use(HtmlWebpackInlineSourcePlugin)
        }
    }
}