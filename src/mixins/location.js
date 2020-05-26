import { setSession, errorMsg } from '@/utils/common'
import AMap from 'AMap'
let geocoder
let i = 1
export default {
	data () {
		return {
			address: ''
		}
	},
	beforeCreate () {
		AMap.plugin('AMap.Geocoder', function () {
			geocoder = new AMap.Geocoder({})
		})
	},
	mounted () {
		this.locationAddress()
	},
	methods: {
		locationAddress () {
			this.address = ''
			const that = this
			/* global dd */
			dd.device.geolocation.get({
				targetAccuracy: 100,
				coordinate: 1,
				withReGeocode: true,
				useCache: false, // 默认是true，如果需要频繁获取地理位置，请设置false
				onSuccess: function (result) {
					if (~~result.errorCode === 4) {
						dd.device.notification.alert({
							message: '手机定位服务没有开启，请在设置中打开GPS定位服务开关',
							title: '温馨提示', // 可传空
							buttonName: '我知道了'
						})
						that.address = '未开启定位权限！'
					}
					if (result.latitude === '' || result.longitude === '') {
						errorMsg('成功方法钉钉定位错误', result, {})
					}
					if (!result.address) {
						geocoder.getAddress([result.longitude, result.latitude], function (status, result1) {
							if (status === 'complete' && result1.regeocode) {
								that.address = result1.regeocode.formattedAddress
								if (!that.address) {
									errorMsg('高德错误', result, {})
									that.address = '获取当前位置失败，请点击这一行,重新获取！'
								}
								clearTimeout(time)
							} else {
								errorMsg('高德错误', result, {})
							}
						})
					} else {
						that.address = result.address
						clearTimeout(time)
					}
					setSession('longitude', result.longitude)
					setSession('latitude', result.latitude)
				},
				onFail: function (error) {
					errorMsg('失败方法钉钉定位错误', error, {})
					if (~~error.errorCode === 4 || ~~error.errorCode === 445) {
						dd.device.notification.alert({
							message: '您已禁止授予钉钉 定位 权限，会造成该功能不可用，请到手机的 设置 里找到钉钉这个应用，并授予 定位 权限',
							title: '温馨提示', // 可传空
							buttonName: '我知道了'
						})
						that.address = '未开启定位权限！'
					} else {
						if (i <= 3) {
							i++
							clearTimeout(time)
							that.locationAddress()
						}
					}
				}
			})
			let time = setTimeout(() => {
				if (that.address === '') {
					that.address = '获取当前位置超时，请点击这一行,重新获取！'
				}
			}, 10000)
		}
	}
}
