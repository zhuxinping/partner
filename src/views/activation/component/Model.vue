<template>
    <div v-if="show">
		<mt-popup class="share-popup" v-model="popupVisible" position="bottom">
			<ul class="picker">
				<li class="date">
					<div class="title">
						<span>是否达标</span>
					</div>
					<div class="label">
						<span v-for="(item, index) in select_date" :key="index" @click="selectDate(item)" :class="item.check?'click_span':''">{{item.name}}</span>
					</div>
				</li>
				<li class="date">
					<div class="title">
						<span>学校类别</span>
					</div>
					<div class="label">
						<span v-for="(item, index) in schoolClassify" :key="index" @click="selectDate(item)" :class="item.check?'click_span':''">{{item.dataName}}</span>
					</div>
				</li>
				<li class="date">
					<div class="title">
						<span>学校类型</span>
					</div>
					<div class="label">
						<span v-for="(item, index) in schoolType" :key="index" @click="selectDate(item)" :class="item.check?'click_span':''">{{item.name}}</span>
					</div>
				</li>
				<li class="date" style="border-bottom: 0px">
					<div class="title">
						<span>活跃级别</span>
					</div>
					<div class="label">
						<span v-for="(item, index) in schoolActive" :key="index" @click="selectDate(item)" :class="item.check?'click_span':''">{{item.name}}</span>
					</div>
				</li>
				<li class="button">
					<div @click="reset">重置</div>
					<div @click='selectSuccess' class="success">完成</div>
				</li>
			</ul>
		</mt-popup>
	</div>
</template>

<script>
import { newDictionary, dictionary, getCode } from '@/utils/common'
import Vue from 'vue'
import { Popup } from 'mint-ui'
Vue.component(Popup.name, Popup)
export default {
	name: 'Model',
	props: {
		show: false
	},
	data () {
		return {
			popupVisible: false,
			select_date: [{name: '已达标', check: false, code: 1}, {name: '未达标', check: false, code: 2}],
			schoolClassify: [],
			schoolType: [],
			schoolActive: [],
			selectIndex: null,
			schoolClassifyIndex: '',
			schoolTypeIndex: '',
			schoolActiveIndex: ''
		}
	},
	mounted () {
		this.getInformation()
	},
	methods: {
		getInformation () {
			newDictionary('SCH_CATEGORY').then(res => {
				this.schoolClassify = res
			})
			dictionary('SCHOOL_TYPE', null).then(res => {
				this.schoolType = res
			})
			dictionary('SCHOOL_ACT_LEVEL', null).then(res => {
				this.schoolActive = res
			})
		},
		selectDate (item) {
			item.check = !item.check
		},
		reset () {
			this.select_date = [{name: '已达标', check: false, code: 1}, {name: '未达标', check: false, code: 2}]
			this.getInformation()
			this.selectIndex = ''
			this.schoolClassifyIndex = getCode(this.schoolClassify, 'dataId')
			this.schoolTypeIndex = getCode(this.schoolType, 'code')
			this.schoolActiveIndex = getCode(this.schoolActive, 'name')
		},
		selectSuccess () {
			if (getCode(this.select_date, 'code').length > 1) {
				this.selectIndex = '3'
			} else {
				this.selectIndex = getCode(this.select_date, 'code')
			}
			this.schoolClassifyIndex = getCode(this.schoolClassify, 'dataId')
			this.schoolTypeIndex = getCode(this.schoolType, 'code')
			this.schoolActiveIndex = getCode(this.schoolActive, 'name')
			this.$emit('success', this.selectIndex, this.schoolClassifyIndex, this.schoolTypeIndex, this.schoolActiveIndex)
		}
	},
	watch: {
		show (newV, oldV) {
			if (newV) {
				this.popupVisible = true
			}
		},
		popupVisible (newV, oldV) {
			if (!newV) {
				this.$emit('change')
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
	// 筛选样式
	.share-popup
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
