<template>
	<div class="sgj-sheader">
		<div class="sgj-sheader-hd">
			<div class="spr-left">
				<em>{{stitle}}</em>
				<img src="../../assets/images/operate-explain.png" class="icon-sgj-que" alt=""  @click="layerFlag = true" />
				<span class="time">(统计截止日期 {{stime}})</span>
				<span v-if="~~chosenFlag" class="sel-time" @click="chosenPicker">选择<img src="../../assets/images/icon-arrow_blue.png" alt=""></span>
			</div>
		</div>
		<dialogModal :isShow="layerFlag" @close="layerFlag = false">
			<div slot="content">
				<slot name="sgjDialog"></slot>
			</div>
		</dialogModal>
		<mt-datetime-picker
			ref="picker"
			v-if="pickerVisible"
			v-model="pickerValue"
			:startDate="minDayFormat"
			:endDate="maxDayFormat"
			type="date"
			@confirm="pickerConfirm">
		</mt-datetime-picker>
	</div>
</template>
<script>
import Vue from 'vue'
import moment from 'moment'
import { setSession } from '@/utils/common'
import { DatetimePicker } from 'mint-ui'
import DialogModal from '@/components/dialogModal'
Vue.component(DatetimePicker.name, DatetimePicker)
export default {
	name: 'chosenTime',
	components: {
		DialogModal
	},
	props: ['chosenFlag', 'stitle'],
	data () {
		return {
			layerFlag: false,
			// chosenFlag: 1,
			minDayFormat: '',
			maxDayFormat: '',
			pickerVisible: false,
			pickerValue: '',
			stime: ''
			// stitle: ''
		}
	},
	methods: {
		chosenPicker () {
			this.pickerVisible = true

			let _this = this
			setTimeout(function () {
				_this.$refs.picker.open()
			}, 50)
		},
		pickerConfirm (v) {
			let y = v.getFullYear()
			let	d = v.getDate()
			let	m = v.getMonth() + 1
			d = d >= 10 ? d : '0' + d
			m = m >= 10 ? m : '0' + m

			this.tabData(y + '/' + m + '/' + d)
		},
		tabData (t) {
			if (t === this.stime) return !1
			this.stime = t
			this.$emit('tfd', t)
		}
	},
	mounted () {
		let	time1 = new Date('2019/01/01')
		let	minTime = time1.getTime()
		let	maxTimeCurr = moment().subtract(1, 'day').format('YYYY/MM/DD') // 昨天 最大时间
		let	time2 = new Date(moment().subtract(1, 'years').format('YYYY/MM/DD')) // 跨度一年 最小时间 不能小于2019/01/01
		let	minTimeCurr = time2.getTime()

		let sdata = setSession('sFormsData')
		let currDate = sdata ? (typeof (sdata) === 'string' ? JSON.parse(sdata).sdate : sdata.sdate) : ''
		this.minDayFormat = minTime > minTimeCurr ? time1 : time2
		this.pickerValue = new Date(currDate || maxTimeCurr) // maxTimeCurr
		this.maxDayFormat = new Date(maxTimeCurr)
		this.tabData(currDate || maxTimeCurr)
	}
}
</script>
<style scoped lang="stylus">
	@import "./index.styl"
</style>
<style lang="stylus">
.sgj-ct
	.mint-datetime-action
		font-size 28px
		margin-top 25px
	.picker-toolbar
		height 88px
	.picker-item
		font-size 38px
	.dialog-content
		width 85% !important
</style>
