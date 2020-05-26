<template>
	<div class="container">
		<m-header @backClick="handleClose" headerTitle="故障预警"></m-header>
		<ul class="det-info-list fault-det-list">
			<li>
				<div class="td-key">幼儿园名称:</div>
				<div class="td-value text-over">{{offDetailData.schoolName}}</div>
			</li>
			<li>
				<div class="td-key">幼儿园编号:</div>
				<div class="td-value text-over">{{offDetailData.schoolNo}}</div>
			</li>
			<li>
				<div class="td-key">班级名称:</div>
				<div class="td-value">{{offDetailData.className}}</div>
			</li>
			<li>
				<div class="td-key">设备名称:</div>
				<div class="td-value">{{offDetailData.deviceName}}</div>
			</li>
		</ul>
		<mt-loadmore class="main" v-code = '"REPORT_MANAGE_LIST"' :top-method="loadTop" @top-status-change="handleTopChange" topLoadingText="正在刷新..." ref="loadmore">
			<ul class="feedback-list fault-det-list" v-infinite-scroll="loadMore" infinite-scroll-distance="100" :infinite-scroll-immediate-check="true">
				<li>
					<span class="feedback-tit">反馈人</span>
					<span class="feedback-tit">反馈时间</span>
				</li>
				<li :key="index" v-for="(item, index) in items">
					<span class="feedback-name">{{item.userName}} {{item.userAccount}}</span>
					<span class="feedback-time">{{item.createTime}}</span>
				</li>
			</ul>
			<v-loading ref="loading" :loadingFlag = 'true'></v-loading>
		</mt-loadmore>
	</div>
</template>
<script>
import Vue from 'vue'
import { ReportApi } from '@/api/index'
import MHeader from '@/components/MHeader'
import { Loadmore } from 'mint-ui'
import VLoading from '@/components/loading'
import { setStore, tongji } from '@/utils/common'
Vue.component(Loadmore.name, Loadmore)
export default {
	data () {
		return {
			offDetailData: {},
			delayLoad: false,
			switch: true,
			pageNo: 1,
			pageSize: 10,
			infoInform: setStore('infoInform'),
			items: []
		}
	},
	components: {
		MHeader,
		VLoading
	},
	mounted () {
		let item = setStore('offDetail')
		this.offDetailData = item || {}
		this.params = {
			'deviceId': this.offDetailData.deviceId,
			'userCenterIdDing': this.infoInform.userCenterId,
			'roleId': this.infoInform.roleId,
			'userType': this.infoInform.userType
		}
		tongji('11_02_offline_alert_info', 0)
		// this.quaDetail()
		this.loadMore()
	},
	methods: {
		quaDetail () {
			/* let params = Object.assign({}, this.params, {
				pageNo: this.pageNo,
				pageSize: this.pageSize
			})
			ReportApi.offDetail(params, res => {
				if (res.code === 10000) {

				} else {
					toast('获取数据失败')
				}
			}) */
		},
		handleClose () {
			this.$router.go(-1)
		},
		loadData (pullDown) {
			this.$refs.loading.onchange()
			let params = Object.assign({}, this.params, {
				pageNo: this.pageNo,
				pageSize: this.pageSize
			})
			ReportApi.offDetail(params, res => {
				if (res.code === 10000) {
					this.items = pullDown ? res.body : this.items.concat(res.body)
					this.delayLoad = false
					this.pageNo++
					if (res.body.length <= this.pageSize - 1) {
						this.delayLoad = true
						this.$refs.loading.change()
					}
				} else {
					this.$refs.loading.change()
				}
				this.switch = true
			})
		},
		loadTop () { // 下拉刷新
			this.pageNo = 1
			this.loadData(1)
			this.$refs.loading.onchange()
		},
		loadMore () { // 上拉翻頁
			if (!this.delayLoad) {
				this.delayLoad = true
				this.loadData()
			}
		},
		handleTopChange () { // 下拉刷新1秒后关闭下拉刷新样式
			this.switch = false
			setTimeout(() => {
				if (this.$refs.loadmore) {
					this.$refs.loadmore.onTopLoaded()
				}
				this.switch = true
			}, 3000)
		}
	}
}
</script>

<style lang="stylus" scoped>
	@import "assets/index.styl"
</style>
