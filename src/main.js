import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import '@/directives/code'
import { errorMsg, setStore, toast, close } from './utils/common'
import * as dd from 'dingtalk-jsapi'
import FastClick from 'fastclick'
import AMap from 'vue-amap'
import infiniteScroll from 'vue-infinite-scroll'
import './assets/stylus/main.styl'
import * as filter from './filters/filters'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
const errorHandler = (error, vm) => {
	errorMsg('vue全局捕获错误', error, vm)
}
Vue.config.errorHandler = errorHandler
Vue.prototype.$throw = (error) => errorHandler(error, this)
Vue.use(dd)
Vue.use(Vuex)
Object.keys(filter).forEach(key => {
	Vue.filter(key, filter[key])
})
Vue.use(infiniteScroll)
Vue.config.productionTip = false
const deviceIsWindowsPhone = navigator.userAgent.indexOf('Windows Phone') >= 0
const deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone
FastClick.prototype.focus = function (targetElement) {
	var length
	if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
		length = targetElement.value.length
		targetElement.focus()
		targetElement.setSelectionRange(length, length)
	} else {
		targetElement.focus()
	}
}
FastClick.attach(document.body)
router.beforeEach((to, from, next) => {
	setStore('path', from.path)
	dd.device.notification.hidePreloader({})
	if (!store.getters.configInfo) {
		getDingCropId(next)
	} else {
		next()
	}
})
function getDingCropId (next) {
	store.dispatch('Config/dingGetCropId').then(res => {
		dingdingConfig(res, next)
		// next()
	}).catch((error) => {
		errorMsg('catch错误', error, {})
	})
}
let buttonIndexFlag = true
function dingdingConfig (dingding, next) {
	dd.config({
		agentId: dingding.agentId, // 必填，微应用ID
		corpId: dingding.corpId, // 必填，企业ID
		timeStamp: dingding.timeStamp, // 必填，生成签名的时间戳
		nonceStr: dingding.nonceStr, // 必填，生成签名的随机串
		signature: dingding.signature, // 必填，签名
		type: 0, // 选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
		jsApiList: [
			'runtime.info',
			'biz.contact.choose',
			'device.notification.confirm',
			'device.notification.alert',
			'device.notification.prompt',
			'biz.ding.post',
			'biz.util.openLink',
			'biz.util.uploadImage',
			'device.geolocation.get',
			'device.geolocation.start',
			'device.geolocation.stop',
			'biz.navigation.setLeft',
			'biz.navigation.close',
			'biz.navigation.goBack',
			'biz.alipay.pay'
		] // 必填，需要使用的jsapi列表，注意：不要带dd。
	})
	dd.ready(function () {
		next()
	})
	dd.error(function (error) {
		// 钉钉授权异常，请重新进入掌通伙伴或联系客服!
		errorMsg('钉钉配置错误', error, dingding)
		if (buttonIndexFlag) {
			dd.device.notification.confirm({
				title: '温馨提示',
				message: '钉钉授权异常，是否重新授权!',
				buttonLabels: ['取消', '确定'],
				onSuccess: function (result) {
					if (result.buttonIndex) {
						buttonIndexFlag = false
						getDingCropId(next)
					} else {
						setTimeout(() => {
							toast('钉钉授权异常，请重新进入掌通伙伴或联系客服!')
						}, 3000)
						close()
					}
				},
				onFail: function (error) {
					close()
					errorMsg('钉钉失败方法', error, dingding)
				}
			})
		} else {
			dd.device.notification.alert({
				message: '钉钉授权异常，请重新进入掌通伙伴或联系客服！',
				title: '温馨提示', // 可传空
				buttonName: '我知道了',
				onSuccess: function (result) {
					errorMsg('钉钉配置错误第二次失败', result, dingding)
					setTimeout(() => {
						toast('钉钉授权异常，请重新进入掌通伙伴或联系客服!')
					}, 3000)
					close()
				}
			})
		}
	})
}
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
AMap.initAMapApiLoader({
	// 申请的高德key
	key: 'bd610e0c914a29f822d30fdb5c09dc43',
	// 插件集合
	plugin: ['AMap.PlaceSearch', 'AMap.Geolaction']
})
