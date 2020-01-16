module.exports = {
    outputDir: '../public/admin',
    publicPath: '/admin',

    chainWebpack (config) {
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
    }
}
