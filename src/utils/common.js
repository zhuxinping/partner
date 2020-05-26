import { ReportApi } from '@/api/index'
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return
	if (content) {
		if (typeof content !== 'string') {
			content = JSON.stringify(content)
		}
		window.localStorage.setItem(name, content)
	} else {
		try {
			let value = window.localStorage.getItem(name)
			if (value.indexOf('[') !== -1 || value.indexOf('{') !== -1) {
				value = JSON.parse(value)
				return value
			} else {
				return value
			}
		} catch (e) {
			return ''
		}
	}
}
/**
 * 存储sessionStorage
 */
export const setSession = (name, content) => {
	if (!name) return
	if (content) {
		if (typeof content !== 'string') {
			content = JSON.stringify(content)
		}
		window.sessionStorage.setItem(name, content)
	} else {
		try {
			let value = window.sessionStorage.getItem(name)
			if (value.indexOf('[') !== -1 || value.indexOf('{') !== -1) {
				value = JSON.parse(value)
				return value
			} else {
				return value
			}
		} catch (e) {
			return ''
		}
	}
}
/**
 * 删除localStorage
 */
export const remove = (name, type) => {
	if (!name) return
	if (type) {
		window.localStorage.removeItem(name)
	} else {
		window.sessionStorage.removeItem(name)
	}
}
export const throttle = (handler, wait) => {
	let lastTime = 0
	return function () {
		let nowTime = new Date().getTime()
		if (nowTime - lastTime > wait) {
			handler.apply(this, arguments)
			lastTime = nowTime
		}
	}
}

export const debounce = (handler, delay) => {
	let timer
	return function () {
		let self = this
		let	arg = arguments
		clearTimeout(timer)
		timer = setTimeout(function () {
			handler.apply(self, arg)
		}, delay)
	}
}

export const tongji = (id, type, object) => {
	const currentHost = window.location.host
	let logger
	/* global AliLogStatistics */
	switch (currentHost) {
	case 'dls.szy.cn':
		logger = new AliLogStatistics(['cn-hangzhou.log.aliyuncs.com', 'ztjy', 'app_business'])// 阿里统计对象
		break
	default:
		logger = new AliLogStatistics(['cn-hangzhou.log.aliyuncs.com', 'ztjy-test', 'app_business'])// 阿里统计对象
		break
	}
	let userName = setStore('infoInform')
	if (object) {
		logger.push({'eventid': id, 'eventtype': type, 'pagetype': '掌通伙伴', 'user_name': userName.userName, ext: object})
	} else {
		logger.push({'eventid': id, 'eventtype': type, 'pagetype': '掌通伙伴', 'user_name': userName.userName})
	}
}
// 钉钉提示
export const toast = (title) => {
	/* global dd */
	dd.device.notification.toast({
		text: title, // 提示信息
		duration: 1, // 显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
		delay: 0
	})
}
// 钉钉关闭
export const close = () => {
	dd.biz.navigation.close({
		onSuccess: function (result) {
			console.log(result)
			localStorage.clear()
			sessionStorage.clear()
		},
		onFail: function (err) {
			console.log(err)
		}
	})
}
// 钉钉打开新窗口
export const openLink = (url) => {
	dd.biz.util.openLink({
		url: url, // 要打开链接的地址
		onSuccess: function (result) {
			console.log(result)
		},
		onFail: function (error) {
			console.log(error)
		}
	})
}
/* global dd */
export const loading = (msg) => {
	dd.device.notification.showPreloader({
		text: msg, // loading显示的字符，空表示不显示文字
		showIcon: true
	})
}
// 错误日志
// 上报错误日志格式：
// {
// 	错误类型(类型：1.钉钉配置错误，2.钉钉定位错误，3.接口错误，4.catch错误，5.高德错误，6.vue全局捕获错误,7钉钉方法失败错误日志)
// 	错误内容（钉钉的错误提示和自己设置的错误文字）
//     用户信息（当前登录用户信息，如果未登录，可放空）
//     所在页面(当前页面地址)
// 	用户手机信息(可选，取不到时不传)
// 	网络环境（可选）
// }
export const errorMsg = (tag, errorInfo, params) => {
	let errormsg = {}
	errormsg.tag = tag
	errormsg.errorInfo = errorInfo
	errormsg.params = params
	errormsg.userInfo = setStore('infoInform')
	errormsg.url = window.location.href
	errormsg.path = setStore('path') ? setStore('path') : ''
	dd.device.base.getPhoneInfo({
		onSuccess: function (data) {
			errormsg.mobileInfo = data
			let formData = new FormData()
			formData.append('errorMsg', JSON.stringify(errormsg))
			ReportApi.errorMsg(formData, res => {
				console.log(res)
			})
		},
		onFail: function (err) {
			errormsg.mobileInfo = err
			let formData = new FormData()
			formData.append('errorMsg', JSON.stringify(errormsg))
			ReportApi.errorMsg(formData, res => {
				console.log(res)
			})
		}
	})
}
export const toThousand = (num) => {
	let re = /\d{1,3}(?=(\d{3})+$)/g
	num = num.toString().replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
		return s1.replace(re, '$&,') + s2
	})
	return num
}
export const toDecimal2 = (x) => {
	// debugger
	let f = parseFloat(x)
	if (isNaN(f)) {
		return 0
	}
	f = Math.round(x * 100) / 100
	let s = f.toString()
	let rs = s.indexOf('.')
	if (rs < 0) {
		rs = s.length
		s += '.'
	}
	while (s.length <= rs + 2) {
		s += '0'
	}
	return s
}
export const ceilMax = (num) => {
	num = num + ''
	var float = num.split('.')[1]
	if (!float) {
		return (Number(num) + 0.5).toFixed(1)
	} else if (float < 5) {
		return (Number(num.split('.')[0]) + 0.5).toFixed(1)
	} else if (float >= 5) {
		return Number(num.split('.')[0]) + 1
	}
}

// 动态插入script标签
export const createScript = (url, callback) => {
	let oScript = document.createElement('script')
	oScript.type = 'text/javascript'
	oScript.async = true
	oScript.src = url
	/*
     ** script标签的onload和onreadystatechange事件
     ** IE6/7/8支持onreadystatechange事件
     ** IE9/10支持onreadystatechange和onload事件
     ** Firefox/Chrome/Opera支持onload事件
     */
	document.body.appendChild(oScript)
	// 判断IE8及以下浏览器
	let isIE = !-[ 1 ]
	if (isIE) {
		oScript.onreadystatechange = function () {
			if (this.readyState === 'loaded' || this.readyState === 'complete') {
				callback()
			}
		}
	} else {
		// IE9及以上浏览器，Firefox，Chrome，Opera
		oScript.onload = function () {
			callback()
		}
	}
}

export const deafultImg = (userType, sex) => {
	if (userType === 'teacher') {
		// 老师
		if (sex === 'male') {
			//  男老师
			return require('../assets/images/avater_teacher_male@3x.png')
		} else {
			// 女老师
			return require('../assets/images/avater_teacher_female@3x.png')
		}
	} else if (userType === 'student') {
		// 学生
		if (sex === 'male') {
			// 男学生
			return require('../assets/images/avater_boy@3x.png')
		} else {
			// 女学生
			return require('../assets/images/avater_girl@3x.png')
		}
	}
}
// 数组去重
export const uniq = (array) => {
	let temp = [] // 一个新的临时数组
	let object = {}
	for (var i = 0; i < array.length; i++) {
		if (!object[array[i].championDate]) {
			temp.push(array[i])
			object[array[i].championDate] = true
		}
	}
	return temp
}
// 数据字典
export const dictionary = (code, enable) => {
	return new Promise((resolve, reject) => {
		let params = {}
		params.code = code
		params.enable = enable
		ReportApi.getVisited(params, res => {
			if (res.code === 10000) {
				res.body.forEach(item => {
					item.check = false
				})
				resolve(res.body)
			}
		}).catch((error) => {
			reject(error)
		})
	})
}
// 新的数据字典接口
export const newDictionary = (code) => {
	return new Promise((resolve, reject) => {
		let params = {}
		params.code = code
		ReportApi.gttActivation(params, res => {
			if (res.code === 10000) {
				res.body.forEach(item => {
					item.check = false
				})
				resolve(res.body)
			}
		}).catch((error) => {
			reject(error)
		})
	})
}
// 搜集code
export const getCode = (list, key) => {
	let code = ''
	list.forEach(item => {
		if (item.check) {
			code += item[key] + ','
		}
	})
	code = code.substr(0, code.length - 1)
	return code
}

export const validate = (param) => { // 简单的表单验证
	let obj = {
		valid: function (params) {
			this.params = params || {}
			this.rules = this.params.rules || {}
			this.msgs = this.params.messages || {}

			let submitFlag = true
			for (let j in this.rules) {
				if (!this.params.form[j]) continue

				if (!this.validSingle(j)) {
					submitFlag = false
					break
				}
			}
			submitFlag && params.fn && params.fn(this.params.form)

			return submitFlag ? 1 : 0
		},
		validSingle: function (j) {
			let r = this.rules[j]
			let	form = this.params.form
			let value = ''
			for (let k in r) {
				value = form[j].value.trim()
				switch (form[j]['type']) {
				case 'checkbox' :
					if (k === 'required') {
						if (!form[j].checked) {
							return this.errorPlace(j, k)
						}
						break
					}
				/* falls through */
				case 'select-one' :
				case 'select-two' :
					if (k === 'required') {
						if (!value) {
							return this.errorPlace(j, k)
						}
						break
					}
				/* falls through */
				case 'text' :
				case 'textarea' :
				case 'password':
				case 'hidden':
					if (k === 'required' && r[k]) {
						if (!value) {
							return this.errorPlace(j, k)
						}
						break
					}
					if (k === 'equalTo') {
						if (value !== form[r[k]].value) {
							return this.errorPlace(j, k)
						}
						break
					}

					if (k === 'blank') {
						r[k] = k === 'blank' ? /\s/g : r[k]
						if (r[k].test(value)) {
							return this.errorPlace(j, k)
						}
						break
					}

					if (k === 'rxp' || k === 'telephone') {
						r[k] = k === 'telephone' ? /^((11[0-2])|(13[0-9])|(14[0-9])|(15[0-9])|166|(17[0-9])|(18[0-9])|(19[8-9]))\d{8}$/ : r[k]
						if (!r[k].test(value)) {
							return this.errorPlace(j, k)
						}
						break
					}
					if (k === 'minLength') {
						if (value.length < r[k]) {
							return this.errorPlace(j, k)
						}
						break
					}
					if (k === 'maxLength') {
						if (value.length > r[k]) {
							return this.errorPlace(j, k)
						}
						break
					}
					if (k === 'fn') {
						if (!r[k](value)) {
							return this.errorPlace(j, k)
						}
						break
					}
				/* falls through */
				default:
				}
			}
			return true
		},
		errorPlace: function (j, k) {
			toast(this.msgs[j][k] || '错误')
			return false
		}
	}
	return obj.valid(param)
}
