<template>
	<div class="container">
		<m-header @backClick="handleClose" headerTitle="故障预警"></m-header>
		<ul class="fault-tab">
			<li :class="index === currentTab ? 'current' : ''" v-for="(item, index) in tabData" :key="index" @click="tabSwitch(index)"><span>{{item}}</span></li>
		</ul>
		<div v-code = '"VEDIO_ALARM_LIST"'>
			<ul class="fault-caption">
				<li>
					<div class="fault-caption-info">今日新增</div>
					<span class="add-total">{{countData.addCount}}</span> {{currentTab ? '台' : '条'}}
				</li>
				<li>
					<div class="fault-caption-info">累计{{currentTab ? '' : '未处理'}}</div>
					<span class="ndeal">{{countData.undealCount}}</span>{{currentTab ? '台' : '条'}}
				</li>
			</ul>
			<div class="fault-list-status">
				<template v-if="currentTab">
					<strong>离线信息</strong>
				</template>
				<template v-else>
					<strong>故障内容</strong>
					<span class="status-btn layer-sel" @click="selectStatus">{{statusQua.curName}}<i></i></span>
				</template>
			</div>
			<div v-show="statusQua.flag">
				<div class="layer-status">
					<ul>
						<li :key="item.value" v-for="(item,index) in statusQua.option"><div class="form-chk-ct"><input type="radio" :value="item.value" v-model="statusQua.value" @click="statusChange(item.value,item.name)" :id="'layer-ipt' + index" name="layer-ipt"><label :for="'layer-ipt' + index"></label></div><label :for="'layer-ipt' + index">{{item.name}}</label></li>
					</ul>
				</div>
				<div class="layer-shade" @click="statusQua.flag = 0"></div>
			</div>
		</div>
		<mt-loadmore  v-code = '"VEDIO_ALARM_LIST"' class="main" :top-method="loadTop" @top-status-change="handleTopChange" topLoadingText="正在刷新..." ref="loadmore">
			<ul class="fault-list" ref='quaParent' v-infinite-scroll="loadMore" infinite-scroll-distance="100" :infinite-scroll-immediate-check="true">
				<template  v-if="currentTab">
					<li @click="offDetail(item)"  v-for="(item, index) in items" :key="index">
						<span v-show="item.newFlag" class="fault-list-new"></span>
						<div class="line-list-l">
							<div class="fault-list-title text-over">{{item.schoolName}} [{{item.className}} {{item.deviceName}}]</div>
							<div class="fault-list-time off-list-time">{{item.createTime}}</div>
						</div>
						<div class="line-list-r">
							<span class="line-list-feedback">{{item.feedbackNum}}</span>次反馈
						</div>
					</li>
				</template>
				<template v-else>
					<li v-for="(item, index) in items" :key="index">
						<div class="qua-list-l"  @click="offDetail(item)" >
							<span v-show="item.newFlag" class="fault-list-new"></span>
							<div class="fault-list-title text-over">{{item.schoolName}} [{{item.className}} {{item.cameraName}}]</div>
							<div class="fault-list-time">{{item.mobile}}<span>{{item.createTime}}</span></div>
							<div class="qua-list-content text-over">{{item.feedbackCont}}</div>
						</div>
						<img :src="item.picUrl" v-if="item.picUrl || ''" alt="" @click="imgEnlarge(item.picUrl)">
					</li>
				</template>
			</ul>
			<v-loading ref="loading" :loadingFlag = 'true'></v-loading>
		</mt-loadmore>
		<swiperImage @change="imgEnlargeSrc = ''" :chooseFlag="imgEnlargeSrc" :schoolPicUrl="imgEnlargeSrc"></swiperImage>
		<v-dictionary ref="dictionary" type="1" :pickerFlag="pickerFlag" code="value" keyValue="name" titleText="故障预警"
		:keyArray="dictionaryArray" :defaultIndex = 'dictionaryIndex' @sureData = 'sureCommon' @changeStatus="changeStatus"></v-dictionary>
	</div>
</template>
<script>
import Vue from 'vue'
import MHeader from '@/components/MHeader'
import { ReportApi } from '@/api/index'
import { Loadmore } from 'mint-ui'
import VLoading from '@/components/loading'
import VDictionary from '@/components/dictionary'
import { setStore, remove, tongji } from '@/utils/common'
Vue.component(Loadmore.name, Loadmore)
export default {
	name: 'FaultAlarm',
	components: {
		swiperImage: () => import('@/components/swiperImage'),
		MHeader,
		VLoading,
		VDictionary
	},
	data () {
		return {
			imgEnlargeSrc: '',
			tabData: ['视频质量', '视频离线'],
			infoInform: setStore('infoInform'),
			currentTab: 0,
			countData: {
				addCount: '',
				undealCount: ''
			},
			statusQua: {
				flag: 0,
				value: 0,
				curName: '未处理',
				option: [
					{name: '未处理', value: 0},
					{name: '处理中', value: 2},
					{name: '延期处理', value: 3},
					{name: '已解决', value: 1}]
			},
			dictionaryIndex: '',
			pickerFlag: false,
			currentStatus: '',
			dictionaryArray: [],
			items: [],
			delayLoad: false,
			switch: true,
			pageSize: 10,
			pageNo: 1
		}
	},
	created () {
		this.quaParams = {
			agentId: this.infoInform.id,
			agentChildAuthArea: this.infoInform.agentChildAuthArea,
			agentChildAccount: this.infoInform.agentChildAccount,
			roleId: this.infoInform.roleId,
			userType: this.infoInform.userType,
			userCenterIdDing: this.infoInform.userCenterId
		}
		this.offParams = {
			agentId: this.infoInform.id,
			'agentChildAuthArea': this.infoInform.agentChildAuthArea,
			'agentChildAccount': this.infoInform.agentChildAccount
		}
		tongji('11_01_quality_alert', 0)
	},
	beforeRouteEnter (to, from, next) {
		if (from.name === 'ZtpartnerHome') {
			to.meta.isBack = true
		}
		next()
	},
	activated () {
		this.delayLoad = false
		this.currentStatus = 0
		let sflag = setStore('quaSubmitFlag')
		if (this.$route.meta.isBack || sflag) {
			// 清理已有商品列表的数据，重新请求数据，如果不清除的话就会有之前的商品缓存，延迟显示最新的商品
			// 数据初始化
			this.pageNo = 1
			this.currentTab = 0
			this.items = []
			this.infoInform = setStore('infoInform')
			this.countData = {
				addCount: '',
				undealCount: ''
			}
			if (!sflag) {
				this.statusQua.value = 0
				this.statusQua.curName = '未处理'
			}
			this.loadData()
			this.qualityCount()
			this.delayLoad = true
			// this.$refs.loading.onchange()
			sflag && remove('quaSubmitFlag', 1)
		}
		this.$route.meta.isBack = false
	},
	methods: {
		imgEnlarge (pic) {
			tongji('11_01_quality_alert_pic', 1)
			let index = pic.indexOf('?')
			this.imgEnlargeSrc = index !== -1 ? pic.substring(0, index) : pic
		},
		tabSwitch (value) {
			tongji(value === 1 ? '11_02_offline_alert' : '11_01_quality_alert', 0)
			this.currentTab = value
			this.pageNo = 1
			this.statusQua.value = 0
			this.statusQua.curName = '未处理'
			// this.dictionaryIndex = null
			this.currentStatus = 0
			this.items = []
			this.qualityCount()
			this.loadData(1)
		},
		handleClose () {
			this.$router.push('/home')
		},
		statusChange (value, name) {
			// if (value !== this.statusValue) {
			// 	this.statusQua.value = value
			// 	this.statusQua.curName = name
			// 	this.statusQua.flag = 0
			// 	this.pageNo = 1
			// 	this.loadData(1)
			// } else {
			// 	this.statusQua.flag = 0
			// }
		},
		qualityCount () {
			if (this.currentTab) { // 离线
				ReportApi.offlityCount(this.offParams, res => {
					res.code === 10000 && this.dealCount(res.body)
				})
			} else { // 质量
				let params = Object.assign({}, this.quaParams, {
					status: 0,
					pageSize: 10,
					pageNo: 1
				})
				ReportApi.qualityCount(params, res => {
					res.code === 10000 && this.dealCount(res.body)
				})
			}
		},
		dealCount (data) {
			// 趋势(0-下降 1-上升 2-相等)
			// this.countData.tendency = data.tendency === 0 ? 'icon-down' : (data.tendency === 1 ? 'icon-up' : '')
			this.countData.undealCount = data.undealCount || data.count
			this.countData.addCount = data.addCount
		},
		quaDetail (id) {
			this.$router.push({path: '/videoQuaDetail', query: {id}})
		},
		loadData (pullDown) {
			this.$refs.loading.onchange()
			if (this.currentTab) { // 离线
				let params = Object.assign({}, this.offParams, {
					pageNo: this.pageNo,
					pageSize: this.pageSize
				})
				ReportApi.offlityList(params, res => {
					this.dealListData(res, pullDown)
				})
			} else { // 质量
				let params = Object.assign({}, this.quaParams, {
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					status: this.statusQua.value
				})
				ReportApi.qualityList(params, res => {
					this.dealListData(res, pullDown)
				})
			}
		},
		dealListData (res, pullDown) {
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
		},
		loadTop () { // 下拉刷新
			this.pageNo = 1
			this.loadData(1)
			this.$refs.loading.onchange()
		},
		loadMore () { // 上拉翻頁
			if (this.delayLoad) {
				return false
			}
			this.delayLoad = true
			this.loadData()
		},
		handleTopChange () { // 下拉刷新1秒后关闭下拉刷新样式
			this.switch = false
			setTimeout(() => {
				if (this.$refs.loadmore) {
					this.$refs.loadmore.onTopLoaded()
				}
				this.switch = true
			}, 3000)
		},
		offDetail (item) {
			if (this.currentTab) {
				setStore('offDetail', JSON.stringify(item))
				this.$router.push({path: `/videoOffDetail`})
			} else {
				this.$router.push({path: `/videoQuaDetail?id=${item.id}`})
			}
		},
		// 弹窗
		selectStatus () {
			this.dictionaryArray = this.statusQua.option
			this.dictionaryIndex = this.currentStatus || 0
			this.pickerFlag = true
		},
		sureCommon (titleText, value, index) {
			this.dictionaryIndex = index
			this.statusQua.curName = value[index].name
			this.pickerFlag = false
			// this.dictionaryIndex = index
			this.currentStatus = index
			this.statusQua.value = this.statusQua.option[index].value
			this.pageNo = 1
			this.loadData(1)
		},
		changeStatus () {
			this.pickerFlag = false
			this.dictionaryIndex = null
		}
	}
}
</script>

<style lang="stylus" scoped>
	@import "./assets/index.styl"
</style>
