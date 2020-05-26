'use strict'
// 这个文件主要是对开发环境和生产环境的一个基本的配置
const path = require('path')

module.exports = {
	// 开发环境的一个基本配置
	dev: {
		// 编译输出的二级目录
		assetsSubDirectory: 'static',
		// 编译发布的根目录，可配置为资源服务器域名或者cdn域名
		assetsPublicPath: '/ding',
		// 需要使用proxyTable代理的接口(可以跨域)
		proxyTable: {
			'/api': {
				// target: 'https://dls.szy.cn/ams',
				// target: 'http://rcams.ztjy61.com/ams', // RC环境接口
				// target: 'http://a.szy.com:88/ams', // 测试环境接口
				target: 'http://10.1.30.90:8888/ams',
				// target: 'http://172.16.52.163:8083',
				//  target: 'http://a.szy.net:8888/ams',//设置你调用的接口域名和端口号 别忘了加http
				changeOrigin: true,
				pathRewrite: {
					'^/api': '' // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
				},
				onProxyReq(proxyReq, req, res) {
					proxyReq.setHeader('Referer', 'http://10.1.30.90:8888/ams');//开发IP
					proxyReq.setHeader('Origin', 'http://10.1.30.90:8888/ams');//开发IP
				},
				onProxyRes(proxyRes, req, res) {
					proxyRes.headers['Access-Control-Request-Origin'] = '*';
					proxyRes.headers['Access-Control-Request-Headers'] = '*';
				}
			},
			'/ams': {
				// target: 'https://dls.szy.cn/amsserver',
				// target: 'http://rcams.ztjy61.com/amsserver', // RC环境接口
				// target: 'http://a.szy.com:88/amsserver', // 测试环境接口
				target: 'http://172.16.52.229:8088/amsserver',
				//target: 'http://a.szy.net:4080/amsserver',
				// target: 'http://172.16.52.163:8088/amsserver',//设置你调用的接口域名和端口号 别忘了加http
				// target: 'http://172.16.52.151:8088/amsserver',//设置你调用的接口域名和端口号 别忘了加http
				changeOrigin: true,
				pathRewrite: {
					'^/ams': '' // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
				},
				onProxyReq(proxyReq, req, res) {
					proxyReq.setHeader('Referer', 'http://172.16.52.229:8088/amsserver');//开发IP
					proxyReq.setHeader('Origin', 'http://172.16.52.229:8088/amsserver');//开发IPxia
				},
				onProxyRes(proxyRes, req, res) {
					proxyRes.headers['Access-Control-Request-Origin'] = '*';
					proxyRes.headers['Access-Control-Request-Headers'] = '*';
				}
			},
			'/rank': {
				// target: 'http://api.szy.cn',
				// target: 'http://rc-api.szy.cn', // RC环境接口
				target: 'http://alpha-api.szy.com', // 测试环境接口
				// target: 'http://172.16.52.229:8088/amsserver',
				// target: 'http://dev-api.szy.net',
				changeOrigin: true,
				pathRewrite: {
					'^/rank': '' // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
				},
				onProxyReq(proxyReq, req, res) {
					proxyReq.setHeader('Referer', 'http://alpha-api.szy.com');//开发IP
					proxyReq.setHeader('Origin', 'http://alpha-api.szy.com');//开发IPxia
				},
				onProxyRes(proxyRes, req, res) {
					proxyRes.headers['Access-Control-Request-Origin'] = '*';
					proxyRes.headers['Access-Control-Request-Headers'] = '*';
				}
			},
		},
		// 开发时候的访问域名。可以通过环境变量自己设置。
		host: '0.0.0.0',
		// 开发时候的端口。可以通过环境变量PORT设定。如果端口被占用了，会随机分配一个未被使用的端口
		port: 8586,
		// 是否自动打开浏览器
		autoOpenBrowser: true,
		// 下面两个都是浏览器展示错误的方式
		//  在浏览器是否展示错误蒙层
		errorOverlay: true,
		// 是否展示错误的通知
		notifyOnErrors: true,

		// 这个是webpack-dev-servr的watchOptions的一个选项，指定webpack检查文件的方式
		// 因为webpack使用文件系统去获取文件改变的通知。在有些情况下，这个可能不起作用。例如，当使用NFC的时候，
		// vagrant也会在这方面存在很多问题，在这些情况下，使用poll选项（以轮询的方式去检查文件是否改变）可以设定为true
		// 或者具体的数值，指定文件查询的具体周期。
		poll: false,

		// 是否使用eslint loader去检查代码
		useEslint: true,
		// 如果设置为true，在浏览器中，eslint的错误和警告会以蒙层的方式展现。
		showEslintErrorsInOverlay: false,

		/**
		 * Source Maps
		 */

		// source maps的格式
		devtool: 'cheap-module-eval-source-map',
		// 指定是否通过在文件名称后面添加一个查询字符串来创建source map的缓存
		cacheBusting: true,
		// 开启css的source map
		cssSourceMap: true,
		// 允许使用本地IP打开
		useLocalIp: true
	},

	// 生产环境的一个基本配置
	build: {
		// html文件的生成的地方
		index: path.resolve(__dirname, '../dist/index.html'),

		// 编译生成的文件的目录
		assetsRoot: path.resolve(__dirname, '../dist'),
		// 编译生成的静态文件的目录
		assetsSubDirectory: 'static',
		// 编译发布的根目录，可配置为资源服务器域名或者cdn域名
		assetsPublicPath: '/ding',

		/**
		 * Source Maps
		 */

		productionSourceMap: false,
		devtool: '#source-map',

		// 是否开启生产环境的gzip压缩
		productionGzip: false,
		// 开启gzip压缩的文件的后缀名称
		productionGzipExtensions: ['js', 'css', 'svg'],

		// 如果这个选项是true的话，那么则会在build后，会在浏览器中生成一份bundler报告
		bundleAnalyzerReport: process.env.npm_config_report
	}
}
