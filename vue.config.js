const path = require('path')

const resolve = (dir) => path.join(__dirname, dir)

const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/'
const port = 8080
module.exports = {
	lintOnSave: false,
	baseUrl: BASE_URL,
	chainWebpack: config => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('_c', resolve('src/components'))
	},
	productionSourceMap: false,
	devServer: {
		port: port,
		open: true,
		overlay: {
			warnings: false,
			errors: true
		},
		// 反向代理配置
		proxy: {
			// 全路径替换务必放到最后
			'/api': {
				target: 'http://47.244.115.107:8025/',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			},
		}
	}
}
