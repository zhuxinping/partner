<template>
	<div class="picker-component">
		<mt-popup class="sharePopup" v-model="popupVisible" position="bottom">
			<div class="div"><span @click="popupVisible=false">取消</span><span class="span">{{titleText}}</span><span @click="sureCommon(titleText)">确定</span></div>
			<mt-picker  :slots="commonSlots" :value-key="description" @change="onCommonSlots" class="addressx" ></mt-picker>
		</mt-popup>
	</div>
</template>

<script>
import { Popup, Picker } from 'mint-ui'
export default {
	name: 'picker',
	props: {
	},
	components: {
		Popup,
		Picker
	},
	data () {
		return {

		}
	},
	methods: {

	},
	watch: {

	}
}
</script>

<style scoped lang="stylus">
	@import "../../assets/stylus/picker.styl"
	.sharePopup
		width:100%;
		height: 40%;
		.div
			width: 100%;
			height: 88px;
			line-height: 88px;
			background-color: #f9f9f9;
			font-size: 32px;
			color: #333333;
			margin-top: 0px;
			span
				color: #74A9FF;
				display: block;
				float: left;
				width: 15%;
				text-align: center;
				font-size: 28px;
			.span
				display: block;
				float: left;
				width: 70%;
				margin: 0px
				font-size: 32px;
				color: #333333;
				text-align: center;
		.addressx
			width: 100%;
			height: 440px;
			font-size: 38px;
			margin-top: 0px;
			background-color: #ffffff;
</style>
