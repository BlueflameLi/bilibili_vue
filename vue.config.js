module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://api.bilibili.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/search': {
                target: 'https://s.search.bilibili.com/main',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/search': ''
                }
            },
            '/passport': {
                target: 'https://passport.bilibili.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/passport': ''
                }
            },
            '/bili': {
                target: 'https://www.bilibili.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/bili': ''
                }
            },
        }
    }
}