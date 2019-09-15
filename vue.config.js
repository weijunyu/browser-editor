module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/browser-editor/' : '/',
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
    }
}