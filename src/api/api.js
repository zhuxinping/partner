import axios from 'axios'
import { errorMsg } from '@/utils/common'
const instance = axios.create({
	timeout: 15000,
	headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
const instanceJson = axios.create({
	timeout: 15000,
	headers: {'Content-Type': 'application/json'}
})
const instanceImg = axios.create({
	headers: {'Content-Type': 'multipart/form-data'}
})
const API = {
	get (url, params, callback) {
		params['r'] = (Math.random() + '').substring(2)
		return new Promise((resolve, reject) => {
			instance.get(url, {params: params}).then((response) => {
				if (response.data) {
					callback && callback(response.data)
					resolve(response.data)
				} else {
					// debugger
					// console.log(response.data)
					errorMsg('接口错误', response, {})
					reject(response.data)
				}
			}).catch((error) => {
				// console.log(error)
				errorMsg('catch错误', error, {})
				reject(error)
			})
		})
	},
	post (url, params, callback) {
		params['r'] = (Math.random() + '').substring(2)
		return new Promise((resolve, reject) => {
			instance.post(url, params).then((response) => {
				if (response.data) {
					callback && callback(response.data)
					resolve(response.data)
				} else {
					errorMsg('接口错误', response, {})
					reject(response.data)
				}
			}).catch((error) => {
				errorMsg('catch错误', error, {})
				reject(error)
			})
		})
	},
	post2json (url, params, callback) {
		return new Promise((resolve, reject) => {
			instanceJson.post(url, params).then((response) => {
				if (response.data) {
					callback && callback(response.data)
					resolve(response.data)
				} else {
					errorMsg('接口错误', response, {})
					reject(response.data)
				}
			}).catch((error) => {
				errorMsg('catch错误', error, {})
				reject(error)
			})
		})
	},
	postImg (url, params, callback) {
		return new Promise((resolve, reject) => {
			instanceImg.post(url, params).then((response) => {
				// console.log(response.data.data)
				if (response.data) {
					callback && callback(response.data)
					resolve(response.data)
				} else {
					errorMsg('接口错误', response, {})
					reject(response.data)
				}
			}).catch((error) => {
				errorMsg('catch错误', error, {})
				reject(error)
			})
		})
	}
}

export { API }
