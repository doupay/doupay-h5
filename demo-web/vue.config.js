const path = require('path');

const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
    baseUrl: './',
    productionSourceMap: false,
    devServer: {
        //host: '0.0.0.0',//target host
        port: 9009,
        proxy: {
            '/api':{
                target:'http://ip:port',
                changeOrigin:true,
                pathRewrite:{
                    '/api':'/api'
                }
            },
            '/ms':{
                target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
                changeOrigin: true
            }
        }
    },
    configureWebpack:{
        resolve:{
          alias:{
            '@':path.resolve(__dirname, './src'),
            '@i':path.resolve(__dirname, './src/assets'),
          } 
        },
        plugins: [
          new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
          // 下面是下载的插件的配置
          new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
          }),
          new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 5, 
            minChunkSize: 100
          })
        ]
      }
}