module.exports = {
    publicPath: '',
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import '@/assets/sass/main.sass';`
            }
        }
    }
};