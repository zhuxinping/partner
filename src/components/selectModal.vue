<template>
	<div v-if="show">
		<mt-popup class="sharePopup" v-model="popupVisible" position="bottom">
			<ul class="picker">
				<li class="date">
					<div class="title">
						<span>拜访日期</span>
					</div>
					<div class="date_select">
						<span>自定义周期</span>
						<div @click="openPicker('start')">{{startTime}}</div>
						<span class="solt"></span>
						<div @click="openPicker('end')">{{endTime}}</div>
					</div>
					<div class="label">
						<span v-for="(item, index) in date" :key="index" @click="selectDate(index)" :class="selectDateIndex === index?'click_span':''">{{item.name}}</span>
					</div>
				</li>
				<li class="date" v-for="(item, index) in  list" :key="index">
					<div class="title">
						<span>{{item.type}}</span>
					</div>
					<div class="label">
						<span v-for="(item1, k) in item.item" :key="k" @click="selectInfo(item1)" :class="item1.check?'click_span':''">{{item.type=='商机名称'?item1.description:item1.name}}</span>
					</div>
				</li>
				<li class="button">
					<div @click="reset">重置</div>
					<div @click='selectSuccess' class="success">完成</div>
				</li>
			</ul>
		</mt-popup>
		<mt-datetime-picker class="time"
							ref="picker"
							type="date"
							v-model="pickerValue"
							@confirm="handleConfirm"
							@cancel="cancelTime"
							:endDate="endDate"
							:startDate="startDate">
		</mt-datetime-picker>
	</div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { Popup, DatetimePicker } from 'mint-ui'
import { toast, dictionary, getCode, newDictionary } from '@/utils/common'
Vue.component(Popup.name, Popup)
Vue.component(DatetimePicker.name, DatetimePicker)
export default {
	name: 'selectModal',
	props: {
		show: false,
		listInfo: {
			type: Array
		}
	},
	data () {
		return {
			popupVisible: false,
			startTime: '请选择',
			endTime: '请选择',
			templateStartTime: '',
			templateEndTime: '',
			startDate: new Date('2010/01/01'),
			endDate: new Date('2030/12/31'),
			pickerValue: new Date(),
			selectDateIndex: null,
			selectLikeDuIndex: null,
			date: [{name: '昨天'}, {name: '今天'}, {name: '上周'}, {name: '本周'}],
			arrCode: [],
			ref: '',
			list: [],
			type: ''
		}
	},
	created () {
		this.$nextTick(() => {
			this.endDate = new Date(moment().add(10, 'years').format('YYYY/MM/DD'))
		})
		this.getInformation()
	},
	methods: {
		getInformation () {
			newDictionary('SCH_CATEGORY').then(res => {
				this.schoolType = res.body
			})
			this.list = []
			if (this.listInfo) {
				this.listInfo.forEach((item, index) => {
					dictionary(item.code, null).then(res => {
						let object = {}
						object.type = item.title
						object.item = res
						this.$set(this.list, index, object)
					})
				})
			}
		},
		handleConfirm (data) {
			if (this.selectDateIndex !== null) {
				this.selectDateIndex = null
				this.startTime = '请选择'
				this.templateStartTime = ''
				this.endTime = '请选择'
				this.templateEndTime = ''
			}
			let date = moment(data).format('YYYY-MM-DD')
			let tempStarttime, tempEndtime
			if (this.type === 'start') {
				tempStarttime = date.replace(/-/g, '/')
				tempEndtime = this.templateEndTime.replace(/-/g, '/')
				if (tempStarttime && tempEndtime) {
					if (moment(tempEndtime).isBefore(tempStarttime)) {
						toast('开始日期不能大于结束日期')
						this.$refs.picker.open()
					} else {
						this.startTime = date
						this.templateStartTime = date
					}
				} else {
					this.startTime = date
					this.templateStartTime = date
				}
			} else {
				tempStarttime = this.templateStartTime.replace(/-/g, '/')
				tempEndtime = date.replace(/-/g, '/')
				if (tempStarttime && tempEndtime) {
					if (moment(tempEndtime).isBefore(tempStarttime)) {
						toast('开始日期不能大于结束日期')
						this.$refs.picker.open()
					} else {
						this.endTime = date
						this.templateEndTime = date
					}
				} else {
					this.endTime = date
					this.templateEndTime = date
				}
			}
		},
		selectDate (index) {
			if (this.selectDateIndex === index) {
				this.selectDateIndex = null
				this.templateStartTime = ''
				this.templateEndTime = ''
			} else {
				this.selectDateIndex = index
				this.startTime = '请选择'
				this.endTime = '请选择'
				if (index === 0) {
					this.templateStartTime = moment().subtract('days', 1).format('YYYY-MM-DD')
					this.templateEndTime = moment().subtract('days', 1).format('YYYY-MM-DD')
				} else if (index === 1) {
					this.templateStartTime = moment().format('YYYY-MM-DD')
					this.templateEndTime = moment().format('YYYY-MM-DD')
				} else if (index === 2) {
					let weekOfday = parseInt(moment().format('d')) // 计算今天是这周第几天  周日为一周中的第一天
					this.templateStartTime = moment().subtract(weekOfday + 6, 'days').format('YYYY-MM-DD') // 周一日期
					this.templateEndTime = moment().subtract(weekOfday, 'days').format('YYYY-MM-DD') // 周日日期
				} else {
					let weekOfday = parseInt(moment().format('d')) // 计算今天是这周第几天  周日为一周中的第一天
					this.templateStartTime = moment().subtract(weekOfday - 1, 'days').format('YYYY-MM-DD') // 周一日期
					this.templateEndTime = moment().format('YYYY-MM-DD') // 周日日期
				}
			}
		},
		selectInfo (item) {
			item.check = !item.check
		},
		reset () {
			this.selectDateIndex = null
			this.startDate = new Date('2010/01/01')
			this.endDate = new Date(moment().add(10, 'years').format('YYYY/MM/DD'))
			this.startTime = '请选择'
			this.endTime = '请选择'
			this.templateStartTime = ''
			this.templateEndTime = ''
			this.arrCode = []
			this.list.forEach(item => {
				item.item.forEach(item1 => {
					item1.check = false
				})
			})
		},
		selectSuccess () {
			this.arrCode = []
			this.list.forEach(item => {
				if (getCode(item.item, 'code')) {
					this.arrCode.push(getCode(item.item, 'code'))
				} else {
					this.arrCode.push('')
				}
			})
			let startTime, endTime
			startTime = this.templateStartTime.replace(/-/g, '/')
			endTime = this.templateEndTime.replace(/-/g, '/')
			if (startTime && endTime) {
				if (moment(endTime).isBefore(startTime)) {
					toast('开始日期不能大于结束日期')
				} else {
					this.$emit('success', this.arrCode, this.templateStartTime, this.templateEndTime)
				}
			} else {
				this.$emit('success', this.arrCode, this.templateStartTime, this.templateEndTime)
			}
		},
		openPicker (type) {
			this.type = type
			this.popupVisible = false
			this.ref = this.$refs.picker
			this.$refs.picker.open()
		},
		cancelTime () {
			if (this.type === 'start') {
				this.startTime = '请选择'
				this.templateStartTime = ''
			} else {
				this.templateEndTime = ''
				this.endTime = '请选择'
			}
			this.popupVisible = true
		}
	},
	watch: {
		ref (newV, oldV) {
			if (newV) {
				this.popupVisible = true
				this.ref = ''
			}
		},
		popupVisible (newV, oldV) {
			if (!newV) {
				this.$emit('change', false)
			}
		},
		show (newV, oldV) {
			if (newV) {
				this.popupVisible = true
			} else {
				this.popupVisible = false
			}
		},
		listInfo (newV, oldV) {
			if (newV) {
				this.reset()
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
	.sharePopup
		width 100%
		max-height 90%
		overflow auto
		.picker
			overflow hidden
			.date
				overflow hidden
				margin-top 30px
				border-bottom 10px solid #f2f3f5
				margin-bottom 20px
				.title
					overflow hidden
					margin-left 30px
					span
						float left
						font-size 30px
						color #333333
				.label
					overflow hidden
					margin-bottom 20px
					span
						width 150px
						height 50px
						margin-top 20px
						line-height 50px
						background #F2F3F5
						border-radius 8px
						font-size 24px
						color #818D9D
						text-align center
						float left
						margin-left 30px
						overflow hidden
						white-space nowrap
						text-overflow ellipsis
					.click_span
						background #E5F6FF
						color #00AAFF
				.date_select
					margin-left 30px
					margin-top 20px
					overflow hidden
					span
						font-size 28px
						color #818D9D
						text-align center
						float left
						margin-right 30px
					div
						width 210px
						height 50px
						line-height 50px
						float left
						background #F2F3F5
						border-radius 8px
						font-size 24px
						color #818D9D
						text-align center
					.solt
						width 30px
						margin-top 20px
						margin-left 15px
						margin-right 15px
						display block
						border-bottom 2.1px solid #818d9d
				.sharePopup1
					width 100%
					height 440px
					.div
						width 100%
						height 88px
						line-height 88px
						background-color #f9f9f9
						font-size 32px
						color: #333333
						margin-top 0
						margin-right 0
					span
						color #74A9FF
						display block
						float left
						width 15%
						text-align center
						font-size 28px
					.span
						display block
						float left
						width 70%
						font-size 32px
						color #333333
						text-align center
			.button
				position relative
				bottom 0
				width 100%
				height 88px
				div
					float left
					width 50%
					font-size 32px
					color #333333
					text-align center
					line-height 88px
				.success
					background #74A9FF
					color #ffffff

</style>
