<template>
	<div class="container">
		<div class="flex">
			<m-header @backClick="handleClose" headerTitle="付费报表"></m-header>
			<span class="right-text">昨天({{date}})</span>
			<div class="strategy" v-if="strategyFlag">
				<img class="tip" src="../../assets/images/icon_tips.png" alt="">
				<span @click="seeStrategy">点击查看《开视频园攻略》，助您收入翻倍~</span>
				<img @click="strategy" class="tip_close" src="../../assets/images/icon_addvisited_close.png" alt="">
			</div>
		</div>
		<div class="main">
			<ArpuBar v-show='actionCode.indexOf("\"buttonCode\":\"PAY_REPORT_TARGET\"")==-1 ? false:true' :show="show" :date="date" @callBack="changeStatus"></ArpuBar>
			<ul class="nav-status"  v-show = 'actionCode.indexOf("\"buttonCode\":\"PAY_REPORT_LIST\"")==-1 ? false:true'>
				<li class="status" v-for="(item, index) in status" :key="index" @click="selectStatus(index)"><span class="bg-color" :class="index == statusIndex ? 'change-color': ''">{{item}}</span></li>
			</ul>
			<div class="search"  v-show = 'actionCode.indexOf("\"buttonCode\":\"PAY_REPORT_LIST\"")==-1 ? false:true'>
				<div class="search_school">
					<img src="../../assets/images/report-search.png" alt="">
					<input id="searchSchool" type="text" v-model="searchSchoolName" placeholder="输入学校名称关键字搜索">
				</div>
			</div>
			<div class="header-table"  v-show = 'actionCode.indexOf("\"buttonCode\":\"PAY_REPORT_LIST\"")==-1 ? false:true'>
				<span class="header-span">学校</span>
				<span class="last-time">上学期</span>
				<span class="next-time">
					<span class="text">本学期</span>
					<i class="icon-answer" @click="playFlag = true"></i>
				</span>
			</div>
			<div v-code = '"PAY_REPORT_LIST"'>
				<ul class="from-table" v-for="(item, index) in list" :key="item.id"  @click.prevent="baseInfrom(item.schoolId,item)">
					<li class="table-li play-li">
						<span class="li-index">{{index + 1}}</span>
						<div class="li-info">
							<span class="school-name">{{item.schoolName}}</span>
							<span class="school-id">{{item.schoolNumber?item.schoolNumber: ''}}</span>
						</div>
						<div class="last-time">
							<span v-if="statusIndex === 0" >{{item.apru.lastArpu | numFilter | numThousand}}</span>
							<span v-else-if="statusIndex === 1">{{item.orderAmount.lastOrderAmount | numFilter | numThousand}}</span>
							<span v-else>{{item.stuPayRate.lastStuPayRate * 100 | numFilter}}%</span>
						</div>
						<div class="next-time">
							<span v-if="statusIndex === 0" :class="item.apru.standard == 2?'school-radio':''">{{item.apru.currArpu | numFilter | numThousand}}</span>
							<span v-else-if="statusIndex === 1" :class="item.orderAmount.standard == 2?'school-radio':''">{{item.orderAmount.currOrderAmount | numFilter | numThousand}}</span>
							<span v-else :class="item.stuPayRate.standard == 2?'school-radio':''">{{item.stuPayRate.curStuPayRate * 100 | numFilter}}%</span>
							<i v-if="statusIndex === 0" :class="item.apru.arpuSeq==1?'icon-up': 'icon-down'" :style="item.apru.arpuSeq==3?'display:none': ''"></i>
							<i v-else-if="statusIndex === 1" :class="item.orderAmount.orderAmountSeq==1?'icon-up': 'icon-down'" :style="item.orderAmount.orderAmountSeq==3?'display:none': ''"></i>
							<i v-else :class="item.stuPayRate.stuPayRateSeq==1?'icon-up': 'icon-down'" :style="item.stuPayRate.stuPayRateSeq==3?'display:none': ''"></i>
						</div>
						<i class="icon-right"></i>
					</li>
				</ul>
			</div>
			<v-loading :loadingFlag="true" ref="loading"></v-loading>
		</div>
		<dialogModal :isShow="playFlag" @close="playFlag = false">
			<ul slot="content" class="alert_ul">
				<ul slot="content" class="alert_ul">
					<li class="example">
						<p class="raito">学期:</p>
						<p class="roito-left">春季:2月1日 ~ 7月31日</p>
						<p class="roito-left">秋季:8月1日 ~ 次年1月31日</p>
					</li>
					<li class="example">
						<p class="raito">ARPU值:</p>
						<p class="roito-left">平均每个在读学生带来的收入</p>
					</li>
					<li class="example">
						<p class="raito">订单金额:</p>
						<p class="roito-left">增值服务收入金额</p>
					</li>
					<li class="example">
						<p class="raito">学生付费率:</p>
						<p class="roito-left">有xx%的在读激活学生购买了增值服务</p>
					</li>
				</ul>
			</ul>
		</dialogModal>
	</div>
</template>
<script>
import { setStore, debounce, toast, tongji, openLink, setSession } from '@/utils/common'
import { ReportApi } from '@/api/index'
import MHeader from '@/components/MHeader'
import ArpuBar from './components/arpuBar'
import DialogModal from '@/components/dialogModal'
import VLoading from '@/components/loading'
export default {
	name: 'index',
	components: {
		MHeader,
		ArpuBar,
		DialogModal,
		VLoading
	},
	data () {
		return {
			list: [],
			infoInform: setStore('infoInform') ? setStore('infoInform') : '',
			actionCode: setStore('actionCode') ? JSON.stringify(setStore('actionCode')) : '',
			searchSchoolName: '',
			status: ['ARPU值', '订单金额', '学生付费率'],
			statusIndex: 1,
			date: '',
			playFlag: false,
			show: false,
			strategyFlag: true,
			jumpUrl: ''
		}
	},
	beforeRouteEnter (to, from, next) {
		if (from.name === 'ZtpartnerHome') {
			to.meta.index = 1
		}
		next()
	},
	mounted () {
		this.statusIndex = ~~this.$route.meta.index
		document.getElementById('searchSchool').addEventListener('input', debounce(this.searchSchool, 300), false)
		this.getData()
		this.getUrl()
		this.preventDefault()
		if (this.statusIndex === 0) {
			tongji('10_01_arpu', '1')
		} else if (this.statusIndex === 1) {
			tongji('10_01_order_amount', '1')
		} else {
			tongji('10_01_payment_ratio', '1')
		}
	},
	methods: {
		changeStatus (flag, date) {
			this.show = flag
			this.date = date
		},
		preventDefault () {
			this.$nextTick(() => {
				let box = document.querySelectorAll('.ab-mid')
				box.forEach((item, i) => {
					document.addEventListener('click', () => {
						if (this.show) {
							this.show = false
						}
					})
					item.addEventListener('click', (event) => {
						event = event || window.event
						event.stopPropagation()
					})
				})
			})
		},
		handleClose () {
			if (!~~setSession('activeAnaly')) {
				this.$router.push('/home')
			}
		},
		seeStrategy () {
			if (this.jumpUrl) {
				tongji('10_01_call_no_noticebar', '1')
				openLink(this.jumpUrl)
			} else {
				this.strategyFlag = false
			}
		},
		strategy () {
			this.strategyFlag = false
			setTimeout(() => {
				let copyBox = document.querySelectorAll('.copy-box')
				copyBox[0].style.marginTop = 45 + 'px'
			})
		},
		getUrl () {
			let params = {}
			ReportApi.getStrategy(params, res => {
				if (res.flag) {
					this.jumpUrl = res.data
				}
			}).catch((error) => {
				console.log(error)
			})
		},
		searchSchool () {
			this.getData()
		},
		getData () {
			let params = {}
			params.agentId = this.infoInform.id
			params.schoolName = this.searchSchoolName
			params.areaIds = this.infoInform.agentChildAuthArea
			params.sortField = this.statusIndex + 1
			ReportApi.getPaylist(params, res => {
				if (res.code === 10000) {
					this.list = res.body
				}
				this.$refs.loading.change()
			})
		},
		selectStatus (state) {
			this.statusIndex = state
			this.$route.meta.index = state
			this.searchSchoolName = ''
			this.$refs.loading.onchange()
			this.getData()
		},
		baseInfrom (schoolId, item) {
			if (this.actionCode.indexOf('"buttonCode":"REPORT_MANAGE_DETAIL"') !== -1) {
				tongji('10_01_linkto_school_info', '1')
				setStore('basePath', '3')
				setStore('base', item)
				setStore('state', '0') // 控制修改按钮
				this.$router.push({path: `/reportBaseInfrom/4/${schoolId}`})
			} else {
				toast('您没有查看列表详情的权限！')
			}
		}
	}
}
</script>
