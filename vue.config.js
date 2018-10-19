module.exports = {
    configureWebpack: {
        module: {
            rules: [
            ]
        },
        plugins: [
        ],
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        }
    }
}