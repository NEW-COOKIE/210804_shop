
const path = require('path');
const px2rem = require('postcss-px2rem');

// 配置基本大小
const postcss = px2rem({
    // 基准大小 baseSize，需要和rem.js中相同
    remUnit: 37.5
})

module.exports = {
    lintOnSave: true,

    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    postcss
                ]
            }
        }
    },

    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                "@": path.resolve(__dirname, 'src')
            }
        }
    },

    devServer: {
        port: 8080,
        
        proxy: {
            "/api": {
                target: "http://localhost:4000",
                pathRewrite: { "^/api": "" },
                changeOrigin: true
            }
        }
    }
}
