<template>
	<div class="camera">
		<input type="file" id="file" accept="image/*" multiple @change="loadFile" readonly>
		<img :src="headerImage1" alt="">
		<div id="Progress" :style="'width:'+ progress" v-if="photoFlag"></div>
	</div>
</template>

<script>
import { setSession, toast, setStore } from '@/utils/common'
import { REPORT } from '@/api/apiMaps'
import axios from 'axios'
export default {
	name: 'upload',
	props: {
		headerImage: ''
	},
	component: {
		axios
	},
	data () {
		return {
			headerImage1: require('../../../assets/images/list-add.png'),
			progress: '',
			photoFlag: false,
			imgData: {
				accept: 'image/gif, image/jpeg, image/png, image/jpg'
			},
			infoInform: setStore('infoInform') ? setStore('infoInform') : ''
		}
	},
	methods: {
		loadFile (e) {
			if (this.photoFlag) {
				toast('照片正在上传！')
			} else {
				let files = e.target.files || e.dataTransfer.files
				if (!files.length) return
				e.target.values = ''
				files = [...files]
				if (files.length > 1) {
					toast('照片只能上传一张！')
				} else {
					if (this.imgData.accept.indexOf(files[0].type) <= 0) {
						toast('请选择正确的图片格式！')
						return
					}
					this.headerImage1 = require('../../../assets/images/icon_upload.png')
					this.photoFlag = true
					let formData = new FormData() // 通过formdata上传
					formData.append('uploadify', files[0])
					formData.append('userCenterIdDing', this.infoInform.userCenterId)
					let config = {
						onUploadProgress: progressEvent => {
							let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
							this.progress = complete
						}
					}
					axios.post(REPORT.GETIMGURL, formData, config).then((res) => {
						if (res.data.flag) {
							this.headerImage1 = res.data.data + '?imageView/1/w/160/h/160'
							setSession('headerImage', res.data.data)
							setSession('headerImage1', this.headerImage1)
							if (res.data.data.indexOf('http') !== -1) {
								this.photoFlag = false
							}
							this.$emit('change', res.data.data)
						} else {
							toast(res.data.msg)
						}
					})
				}
			}
		}
	},
	watch: {
		headerImage (newV, oldV) {
			if (newV) {
				if (newV.indexOf('?') > -1) {
					this.headerImage1 = newV + '|imageView/1/w/160/h/160'
				} else {
					this.headerImage1 = newV + '?imageView/1/w/160/h/160'
				}
			} else {
				this.headerImage1 = require('../../../assets/images/list-add.png')
			}
		}
	}
}
</script>

<style scoped lang='stylus'>
	.camera
		position relative
		top 25px
		left 30px
		width 140px
		margin-bottom 50px
		input
			position absolute
			opacity 0
			z-index 99
			display block
			width 140px
			height 140px
		img
			width 140px
			height 140px
			display block
			position relative
			z-index 5
			object-fit cover
		#Progress
			position absolute
			bottom 0
			width 0
			background-color #7CA8EF
			height 12px
			z-index 10
		.Progress
			position absolute
			left 30px
			bottom 0
			width 100%
			background-color #7CA8EF
			height 12px
			z-index 10
</style>
