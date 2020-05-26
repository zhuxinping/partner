<template>
	<div id="near">
		<m-header @backClick="handleClose" headerTitle="坐标"></m-header>
		<div id="container"></div>
		<div class="bottom" v-show="true">
			<ul>
				<li class="up"><img src="../../assets/images/list-location.png" alt=""><p>{{setX}}</p></li>
			</ul>
		</div>
	</div>
</template>

<script>
import MHeader from '@/components/MHeader'
import { setStore } from '@/utils/common'
import AMap from 'AMap'
let map
export default {
	name: 'display-map',
	components: {
		MHeader
	},
	data () {
		return {
			setX: '',
			setY: true,
			setNew: false,
			base: setStore('base')
		}
	},
	mounted () {
		this.setX = this.base.mapAddress
		this.init()
	},
	methods: {
		handleClose () {
			this.$router.go(-1)
		},
		init () {
			const that = this
			map = new AMap.Map('container', {
				zoom: 16,
				resizeEnable: true
			})
			if (that.base.longitude && that.base.latitude) {
				map.setZoomAndCenter(16, [that.base.longitude, that.base.latitude])
				let marker = new AMap.Marker({
					draggable: false,
					cursor: 'move',
					raiseOnDrag: true,
					title: '您当前位置'
				})
				map.add(marker)
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
	.amap-logo {
		display: none;
	}
	#near
		#container
			width: 100%;
			height: 93%;
			position: absolute;
		.bottom
			position: fixed;
			z-index: 99999999999999999999
			width: 100%;
			height: 8%;
			bottom: 0px;
			background-color: #ffffff;
			ul
				width: 100%;
				height: 100%;
				li
					width: 100%;
					height: 100%;
				.up
					line-height: 50%;
					img
						width: 24px;
						height: 32px;
						position: absolute;
						left: 30px;
						top: 40px;
					p
						font-size: 30px;
						color: #333333;
						text-align: left;
						position: absolute;
						width: 660px;
						height: 100px;
						left: 80px;
						top: 6px;
						line-height: 100px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
</style>
<style>
	.amap-scalecontrol{
		display: none !important;
	}
	.amap-logo{
		display: none !important;
	}
	.amap-copyright{
		display: none !important;
	}
	.amap-zoomcontrol{
		display: none !important;
	}
</style>
