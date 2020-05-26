<template>
	<div class="uploadImg">
		<span class="businessspan">(添加照片{{photoLength}}/{{imgMaxlength}}张)</span>
		<div class="photoCamera" v-if="picValueList.length || progress.length">
			<div class="progress" v-for="(item, index) in picValueList" :key="index" >
				<img class='itemImg' :src="item.picUrl" alt=""  @click="isChoose = !isChoose">
				<div v-if="item.picUrl" class="uploadImgDelete" >
					<p class="showImage"  @click="showBigImage(index)"></p>
					<img class="deleteImg" src="../assets/images/deleteImg.png" alt="" @click="deleteImg(item, index)">
				</div>
			</div>
		</div>
		<div class="progress-outer">
			<div class="progress1" v-for="(item, index) in progress" :key="index">
				<p v-show="item == '100%'? false:true" class="progress-p" :style="'width:'+ item" ></p>
			</div>
		</div>
		<div class="uploadCamera" v-if="picValueList.length != imgMaxlength">
			<input type="file" id="file" accept="image/*" class="uploadCameraIpt" multiple @change="loadFile" readonly ref="upload">
			<img  src="../assets/images/list-add.png" class="uploadCameraImg" alt="" >
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
		<swiperImage @change="isChoose = false" :imgFlag="isChoose" :previewImg="picValueList"></swiperImage>
	</div>
</template>

<script>
import { setStore, toast, errorMsg, setSession } from '@/utils/common'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { REPORT } from '@/api/apiMaps'
import axios from 'axios'
import swiperImage from '@/components/swiperImage'
export default {
	name: 'upload',
	components: {
		swiper,
		swiperSlide,
		swiperImage,
		axios
	},
	props: {
		picValueList: Array,
		imgMaxlength: Number
	},
	data () {
		return {
			isChoose: false,
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
			if (files.length > this.imgMaxlength - this.photoLength) {
				toast('照片最多上传' + this.imgMaxlength + '张！')
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
	.uploadImg
		height: 260px;
		padding 30px 0
		.photoCamera
			position: relative

			float: left
			.progress
				width: 150px;
				height: 150px;
				display: block;
				float: left;
				margin: 0 20px 10px 0;
				position: relative;
				bottom:0px;
				&:last-children
					margin 0
				.itemImg
					width: 100%;
					height: 100%;
					float: left;
					margin-right:20px;
					display: block;
				.showImage
					width: 150px;
					height: 120px;
					position: absolute;
					left:0px;
					top: 20px;
				.deleteImg
					width: 32px;
					height: 32px;
					display: block;
					padding:0 0 20px 30px;
					position: absolute;
					right: -5px;
					top:-10px;
		.progress-outer
			position: absolute
			left: 25px
			top: 25px;
			.progress1
				width: 160px;
				height: 12px;
				display: block;
				float:left
				margin-right: 20px;
				position: relative;
				top:205px;
				.progress-p
					width:100%
					height: 12px;
					position: absolute;
					bottom: 0px;
					background-color: #7CA8EF
		.uploadCameraImg
			width: 160px;
			height: 160px;
			float: left;
			display: block;
		.uploadCameraIpt
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
<style lang='stylus'>
.businessspan
	display block
	//margin 0 0 40px 30px
	line-height 1.25rem
	text-align left
	color #333
	height 20px
.uploadImgDelete
	width 160px
	height 160px
	position absolute
	top 0px
	left 0px
	display block
.uploadCamera
	position relative
	margin-left 5px
	// margin-top 25px
	margin-bottom 10px
	float left
</style>
