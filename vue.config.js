const path = require('path')
const moment = require('moment')
const WebpackBar = require('webpackbar');

function resolve(dir) {
    return path.join(__dirname, dir)
}

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 8080 // dev port

module.exports = {
    // 基本路径 baseURL已经过时
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    // 输出文件目录  build 时构建文件的目录 构建时传入 --no-clean 可关闭该行为
    outputDir: `dist/loomee-admin-web-${process.env.VUE_APP_OUTPUT_NAME}_${moment().format('YYYYMMDDHHmm')}`,
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    indexPath: 'index.html',
    // 默认在生成的静态资源文件名中包含hash以控制缓存
    filenameHashing: true,
    lintOnSave: false,//是否开启eslint保存检测 ,它的有效值为 true || false || 'error'
    devServer: {
        open: false, //浏览器自动打开页面
        host: "0.0.0.0", //如果是真机测试，就使用这个IP
        port: port,
        https: false,
        hotOnly: false, //热更新（webpack已实现了，这里false即可）
        proxy: {
            '/api': {
                changeOrigin: true,
                target: process.env.VUE_APP_BASE_API,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        overlay: {
            warnings: false,
            errors: true
        },
        before: require('./mock/mock-server.js')
    },
    configureWebpack: {
        plugins: [
            //打包进度条
            new WebpackBar({
                name: '加载进度',
                color: '#00FF00'
            })
        ],
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        devtool: '#eval-source-map'//'#source-map'
    },
    chainWebpack: config => {
        // set svg-sprite-loader SVG配置
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/svg'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    }
}