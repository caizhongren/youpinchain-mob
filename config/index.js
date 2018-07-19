// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: {
            NODE_ENV: '"development"'
        },
        port: 8889,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // proxyTable: {
        //     '/wx': {
        //         // target: 'http://127.0.0.1:8080', // 目标域名
        //         target: 'https://heizhu360.datbc.com',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/wx': '/wx/wx' // 规则, 见下面说明
        //         },
        //         headers: {
        //         // 'Cookie': 'SID=810q3nmoi5mfp8geb9bkm9jql0;SESSION=34e6e7d6-d6f3-41b0-a487-3174bb55d582;' //这里可以设置cookies, 也可以不设置
        //         }
        //     }
        // },
        context: [ //代理路径
            '/wx',
        ],
        proxypath: 'https://heizhu360.datbc.com',
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}