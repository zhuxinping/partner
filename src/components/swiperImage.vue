<template>
	<div>
		<div class="imgs" v-if="imgFlag && previewImg.length" @click="closeSwiper">
			<swiper :options="swiperOption" style="height: 100%;">
				<swiper-slide v-for="(url, index) in previewImg" :key="index">
					<div class="swiper-zoom-container">
						<img :src="url.picUrl" alt="">
					</div>
				</swiper-slide>
			</swiper>
		</div>
		<div class="imgs" v-if="chooseFlag" @click="closeSwiper">
			<swiper :options="swiperOption" style="height: 100%;">
				<swiper-slide>
					<div class="swiper-zoom-container">
						<img :src="schoolPicUrl" alt="">
					</div>
				</swiper-slide>
			</swiper>
		</div>
	</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
	name: 'swiperImage',
	props: {
		imgFlag: false,
		schoolPicUrl: '',
		previewImg: {
			type: Array
		},
		imgIndex: '',
		chooseFlag: false
	},
	components: {
		swiper,
		swiperSlide
	},
	data () {
		return {
			swiperOption: {
				zoom: true
			}
		}
	},
	methods: {
		closeSwiper () {
			this.$emit('change', false)
		}
	},
	watch: {
		imgIndex (newV, oldV) {
			this.$set(this.swiperOption, 'initialSlide', this.imgIndex)
		}
	}
}
</script>

<style scoped lang="stylus">
	.imgs
		position fixed
		z-index 1000000
		left 0
		top 0
		width 100%
		height 100%
		background-color: #000000
</style>
