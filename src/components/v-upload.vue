<template>
	<div class="upload">
		<span class="businessspan">添加照片({{photoLength}}/5张)</span>
		<div class="photoCamera" v-if="picValueList.length || progress.length">
			<div class="progress" v-for="(item, index) in picValueList" :key="index" >
				<img :src="item.picUrl" alt="" >
				<div v-if="item.picUrl" class="delete" >
					<p class="showImage"  @click="showBigImage(index)"></p>
					<img class="delete1" src="../assets/images/deleteImg.png" alt="" @click="deleteImg(item, index)">
				</div>
			</div>
		</div>
		<div class="progress-outer">
			<div class="progress1" v-for="(item, index) in progress" :key="index">
				<p v-show="item == '100%'? false:true" class="progress-p" :style="'width:'+ item" ></p>
			</div>
		</div>
		<div class="camera" v-if="picValueList.length != 5">
			<input type="file" id="file" accept="image/*" multiple @change="loadFile" readonly ref="upload">
			<img  src="../assets/images/list-add.png" alt="" >
		</div>
		<div class="closeBigImage" v-if="showBigImageFlag" @click = closeBigImage>
			<swiper :options="swiperOption" style="height: 100%;">
				<swiper-slide v-for="(url, index) in picValueList" :key="index">
					<div class="swiper-zoom-container">
						<img :src="url.picUrl1" alt="">
					</div>
				</swiper-slide>
			</swiper>
		</div>
	</div>
</template>

<script>
import { setStore, toast, errorMsg, setSession } from '@/utils/common'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { REPORT } from '@/api/apiMaps'
import axios from 'axios'
export default {
	name: 'v-upload',
	components: {
		swiper,
		swiperSlide,
		axios
	},
	props: {
		picValueList: Array
	},
	data () {
		return {
			progress: [],
			photoLength: 0,
			sheetVisible: false,
			infoInform: setStore('infoInform') ? setStore('infoInform') : '',
			imgsFlag: false,
			showBigImageFlag: false,
			swiperOption: {
				zoom: true
			},
			previewImg: [],
			imgData: {
				accept: 'image/gif, image/jpeg, image/png, image/jpg'
			}
		}
	},
	mounted () {
		this.photoLength = setSession('picValueList') ? setSession('picValueList').length : 0
	},
	methods: {
		showBigImage (index) {
			let that = this
			this.$set(this.swiperOption, 'initialSlide', index)
			setTimeout(() => {
				that.showBigImageFlag = true
			}, 10)
		},
		closeBigImage () {
			this.showBigImageFlag = false
		},
		deleteImg (a, b) {
			this.picValueList.splice(b, 1)
			this.progress.splice(b, 1)
			this.photoLength = this.picValueList.length
			this.$emit('change', this.picValueList)
		},
		loadFile (e) {
			let that = this
			let files = e.target.files || e.dataTransfer.files
			let uploadImg = require('../assets/images/icon_upload.png')
			if (!files.length) return
			e.target.values = ''
			files = [...files]
			if (files.length > 5 - this.photoLength) {
				toast('照片最多上传五张！')
			} else {
				files.forEach((file, i) => {
					if (this.imgData.accept.indexOf(file.type) <= 0) {
						toast('请选择正确的图片格式！')
						return
					}
					let formData = new FormData() // 通过formdata上传
					formData.append('uploadify', file)
					formData.append('userCenterIdDing', this.infoInform.userCenterId)
					let object = {}
					object.picUrl = uploadImg
					object.isFlag = 0
					object.picType = 0
					object.picUrl1 = ''
					that.$set(that.picValueList, that.picValueList.length, object)
					that.photoLength = that.picValueList.length
					axios.post(REPORT.GETIMGURL, formData, {
						onUploadProgress: progressEvent => {
							let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
							that.$set(that.progress, that.picValueList.length - i - 1, complete)
						}
					}).then((res) => {
						if (res.data.flag) {
							that.picValueList[that.picValueList.length - i - 1].picUrl = res.data.data + '?imageView/1/w/160/h/160'
							that.picValueList[that.picValueList.length - i - 1].picUrl1 = res.data.data
						} else {
							toast(res.data.msg)
						}
					}).catch((error) => {
						errorMsg('catch错误', error, {})
					})
				})
			}
			this.$emit('change', this.picValueList)
		}
	}
}
</script>

<style lang='stylus' scoped>
	.upload
		position: relative;
		height: 260px;
		.businessspan
			display: block;
			margin-left: 30px;
			line-height: 1.25rem;
			text-align: left ;
			color: #333333;
			height: 20px;
			margin-bottom: 40px
		.photoCamera
			position: relative
			margin-left: 25px
			margin-top: 25px;
			padding-bottom 30px
			float: left
			.progress
				width: 122px;
				height: 122px;
				display: block;
				float: left;
				margin-right: 20px;
				position: relative;
				bottom:0px;
				img
					width: 122px;
					height: 122px;
					float: left;
					margin-right:20px;
					display: block;
				.delete
					width: 122px;
					height: 122px;
					position: absolute;
					top:0px;
					left:0px;
					display:block;
					.showImage
						width: 110px;
						height: 80px;
						position: absolute;
						left:0px;
						top: 20px;
					img
						width: 32px;
						height: 32px;
						display: block;
						padding-left:30px;
						position: absolute;
						right: -20px;
						top:-10px;
		.progress-outer
			position: absolute
			left: 25px
			top: 25px;
			.progress1
				width: 122px;
				height: 12px;
				display: block;
				float:left
				margin-right: 20px;
				position: relative;
				top:170px;
				.progress-p
					width:100%
					height: 12px;
					position: absolute;
					bottom: 0px;
					background-color: #7CA8EF
		.camera
			position: relative
			margin-left: 25px
			margin-top: 25px;
			margin-bottom 30px
			float: left
			img
				width: 122px;
				height: 122px;
				float: left;
				display: block;
			input
				position: absolute
				opacity: 0;
				z-index: 99;
				display: block;
				width: 140px;
				height: 140px;
				margin-left: 20px;
		.closeBigImage
			position: fixed;
			z-index: 30
			left: 0px;
			top: 0px;
			width: 100%;
			height: 100%;
			background-color: #000000;
			.openCamera
				height:300px;
				font-size:32px;
</style>
