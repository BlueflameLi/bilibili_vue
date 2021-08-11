module.exports = {
    devServer: {
        proxy: {
            '/api/bili': {
                target: 'https://api.bilibili.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/bili': ''
                }
            },
            '/api/search': {
                target: 'https://s.search.bilibili.com/main',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/search': ''
                }
            },
            '/api/passport': {
                target: 'https://passport.bilibili.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/passport': ''
                }
            },
            '/api/live': {
                target: 'https://api.live.bilibili.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/live': ''
                }
            },
            '/api/manga': {
                target: 'http://localhost:5000',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/manga': ''
                }
            },
            '/api/sclrcmd': {
                target: 'http://localhost:5001',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/sclrcmd': ''
                }
            },
        }
    }
}