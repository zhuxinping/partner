<template>
	<div id="near">
		<m-header @backClick="handleClose" headerTitle="坐标"></m-header>
		<div id="map"></div>
		<div class="bottom" v-show="true">
			<ul>
				<li class="up"><img src="../../assets/images/list-location.png" alt=""><p>{{setX}}</p></li>
				<li class="down" @click="sureAddress">我选好了</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { setSession, errorMsg, remove } from '@/utils/common'
import MHeader from '@/components/MHeader'
import AMap from 'AMap'
let map, geocoder, marker
let i = 1
export default {
	name: 'open-map',
	components: {
		MHeader
	},
	data () {
		return {
			setX: '',
			setY: true,
			baseInform: setSession('base'),
			jumpFlag: 1
		}
	},
	beforeRouteEnter (to, from, next) {
		window.scrollTo(0, 0)
		to.meta.route = to.params.type
		next()
	},
	mounted () {
		/* global dd */
		this.jumpFlag = ~~this.$route.meta.route
		AMap.plugin('AMap.Geocoder', function () {
			geocoder = new AMap.Geocoder({})
		})
		this.init()
	},
	methods: {
		handleClose () {
			if (this.jumpFlag) {
				remove('mapAddress')
				this.$router.push('/reportAdd')
			} else {
				this.$router.push('/updateBaseInform/10000')
			}
		},
		init () {
			map = new AMap.Map('map', {
				zoom: 16,
				resizeEnable: true
			})
			const that = this
			marker = new AMap.Marker({
				draggable: false,
				cursor: 'move',
				raiseOnDrag: true,
				title: '您当前位置'
			})
			if (this.jumpFlag) {
				dd.device.geolocation.get({
					targetAccuracy: 100,
					coordinate: 1,
					withReGeocode: true,
					useCache: false, // 默认是true，如果需要频繁获取地理位置，请设置false
					onSuccess: function (result) {
						map.setZoomAndCenter(16, [result.longitude, result.latitude])
						map.add(marker)
						if (result.latitude === '' || result.longitude === '') {
							errorMsg('成功方法钉钉定位错误', result, {})
						}
						if (!result.address) {
							geocoder.getAddress([result.longitude, result.latitude], function (status, result1) {
								if (status === 'complete' && result1.regeocode) {
									that.setX = result1.regeocode.formattedAddress
									if (that.setX === undefined) {
										errorMsg('高德错误', result1, {})
										that.setX = '获取当前位置失败，请点击这一行,重新获取！'
									}
									setSession('mapAddress', result1.regeocode.formattedAddress)
								} else {
									console.log(JSON.stringify(result))
									errorMsg('高德错误', result1, {})
								}
							})
						} else {
							that.setX = result.address
							setSession('mapAddress', result.address)
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
							that.setX = '未开启定位权限！'
						} else {
							if (i <= 3) {
								i++
								that.init()
							}
						}
					}
				})
			} else {
				if (that.baseInform.longitude && that.baseInform.latitude) {
					map.setZoomAndCenter(16, [that.baseInform.longitude, that.baseInform.latitude])
					marker.setPosition([that.baseInform.longitude, that.baseInform.latitude])
					map.add(marker)
				}
				that.setX = that.baseInform.mapAddress
			}
			map.on('click', function (e) {
				marker.setPosition([e.lnglat.getLng(), e.lnglat.getLat()])
				marker.setMap(map)
				geocoder.getAddress(e.lnglat, function (status, result) {
					if (status === 'complete' && result.info === 'OK') {
						setSession('mapAddress', result.regeocode.formattedAddress)
						setSession('longitude', e.lnglat.getLng())
						setSession('latitude', e.lnglat.getLat())
						that.setX = result.regeocode.formattedAddress
					}
				})
			})
		},
		sureAddress () {
			if (this.jumpFlag) {
				this.$router.push('/reportAdd')
			} else {
				this.baseInform.longitude = setSession('jd')
				this.baseInform.latitude = setSession('weidu')
				this.baseInform.mapAddress = setSession('mapAddress')
				setSession('base', this.baseInform)
				this.$router.push('/updateBaseInform/10000')
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
html,body
	height: 100%;
	width: 100%;
	position: absolute;
#near
	#map
		width 100%
		height 93%
		position absolute
	.bottom
		position fixed
		z-index 999
		width 100%
		height 15%
		bottom 0
		background-color #ffffff
		ul
			width 100%
			height 100%
			li
				width 100%
				height 50%
			.up
				border-bottom 1px solid #eeeeee
				line-height 50%
				img
					width 24px
					height 32px
					position absolute
					left 30px
					top 40px
				p
					font-size 30px
					color #333333
					text-align left
					position absolute
					width 660px
					height 100px
					left 80px
					top 6px
					line-height 100px
					overflow hidden
					text-overflow ellipsis
					white-space nowrap
			.down
				color #74A9FF
				font-size 32px
				text-align center
				line-height 92px
</style>
