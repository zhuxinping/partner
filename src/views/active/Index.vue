<template>
	<div class="container">
		<div class="flex">
			<m-header @backClick="handleClose" headerTitle="活跃报表"></m-header>
			<span class="right-text">昨天({{date}})</span>
			<ul class="nav-status">
				<li class="status" v-for="(item, index) in status" :key="index" @click="selectStatus(index)"><span class="bg-color" :class="index == statusIndex ? 'change-color': ''">{{item}}</span></li>
			</ul>
			<div class="search">
				<div class="search_school ">
					<img src="../../assets/images/report-search.png" alt="">
					<input id="searchSchool" type="text" v-model="searchSchoolName" placeholder="输入学校名称关键字搜索">
				</div>
			</div>
			<div class="b-explain" v-show="statusIndex == 0">
				<span>班级周活比 <em></em>B级以上班级/总数</span>
				<i class="icon-wenhao" @click="explain"></i>
			</div>
		</div>
		<mt-loadmore class="main" v-code='"ACTIVE_REPORT_LIST"'  :top-method="loadTop" @top-status-change="handleTopChange" topLoadingText="正在刷新..." ref="loadmore">
			<div v-infinite-scroll="loadMore" infinite-scroll-distance="100" :infinite-scroll-immediate-check="true">
				<ul class="from-table" v-for="(item, index) in list" :key="item.id"  @click.prevent="baseInfrom(item.schoolId,item)">
					<li class="table-li from-li active-li">
						<span class="li-index">{{index + 1}}</span>
						<span class="li-serial">{{item.schoolNumber}}</span>
						<div class="li-school"><span class="school-name">{{item.schoolName}}</span></div>
						<div class="li-right">
							<span v-if="statusIndex==0" class="radio" ><span style="color: #00AAFF">{{item.bAboveClassCount}}</span>/{{item.totalClassCount}}</span>
							<span v-else-if="statusIndex==1" class="radio" :class="item.isStandard == 2?'school_radio':''">{{item.activeRatio}}</span>
							<span v-else class="radio" :class="item.isStandard == 2?'school_radio':''">{{item.parentActiveRatioStr}}</span>
							<i class="icon-right"></i>
						</div>
					</li>
				</ul>
			</div>
			<v-loading ref="loading" :loadingFlag="true"></v-loading>
		</mt-loadmore>
	</div>
</template>
<script>
import Vue from 'vue'
import { setStore, debounce, toast, tongji, toDecimal2 } from '@/utils/common'
import { ReportApi } from '@/api/index'
import	{ Loadmore } from 'mint-ui'
import MHeader from '@/components/MHeader'
import VLoading from '@/components/loading'
import moment from 'moment'
Vue.component(Loadmore.name, Loadmore)
export default {
	name: 'index',
	components: {
		MHeader,
		VLoading
	},
	data () {
		return {
			list: [],
			infoInform: setStore('infoInform') ? setStore('infoInform') : '',
			actionCode: setStore('actionCode') ? JSON.stringify(setStore('actionCode')) : '',
			searchSchoolName: '',
			page: 1,
			pageSize: 15,
			delayLoad: false,
			switch: true,
			status: ['班级周日均活跃比', '活跃比', '家长活跃率'],
			statusIndex: 0,
			date: ''
		}
	},
	beforeRouteEnter (to, from, next) {
		if (from.name === 'ZtlivelyAnalyzing') {
			to.meta.path = 1
			to.meta.isBack = true
		}
		if (from.name === 'ZtpartnerHome') {
			to.meta.path = 0
			to.meta.isBack = true
		}
		next()
	},
	activated () {
		this.infoInform = setStore('infoInform')
		this.actionCode = JSON.stringify(setStore('actionCode'))
		document.getElementById('searchSchool').addEventListener('input', debounce(this.searchSchool, 300), false)
		this.delayLoad = false
		if (this.$route.meta.isBack || ~~setStore('firstComeIn')) {
			// 清理已有商品列表的数据，重新请求数据，如果不清除的话就会有之前的商品缓存，延迟显示最新的商品
			this.list = []
			this.page = 1
			this.statusIndex = 1
			this.searchSchoolName = ''
			this.delayLoad = true
			this.selectType(this.statusIndex, 0)
			this.$refs.loading.onchange()
		}
		this.$route.meta.isBack = false
		setStore('firstComeIn', '0')
	},
	mounted () {
		if (this.statusIndex) {
			tongji('06_01_parent_active_rate', '0')
		} else {
			tongji('06_01_active_ratio', '0')
		}
		if (!this.$route.meta.isBack) {
			// 当前页面刷新需要请求参数
			this.selectType(this.statusIndex, 0)
		}
	},
	methods: {
		handleClose () {
			~~this.$route.meta.path === 1 ? this.$router.push('/activeAnalyzing') : this.$router.push('/home')
		},
		loadMore () {
			// 加载完毕不在上拉请求数据
			if (this.delayLoad) {
				return false
			}
			this.delayLoad = true
			this.selectType(this.statusIndex, 0)
			this.$refs.loading.onchange()
		},
		searchSchool () {
			document.getElementsByClassName('main')[0].scrollTop = 0
			this.page = 1
			this.selectType(this.statusIndex, 1)
			this.$refs.loading.onchange()
		},
		selectType (index, type) {
			if (index) {
				this.getData(type)
			} else {
				this.getClassList(type)
			}
		},
		getClassList (pullDown) {
			let params = {}
			params.agentId = this.infoInform.id
			params.pageNo = this.page
			params.pageSize = this.pageSize
			params.schoolName = this.searchSchoolName
			params.areaIds = this.infoInform.agentChildAuthArea
			ReportApi.getClassGetList(params, res => {
				if (res.code === 10000) {
					this.date = res.body.yesterdayStr
					if (pullDown) {
						this.list = res.body.activeList
					} else {
						this.list = this.list.concat(res.body.activeList)
					}
					this.delayLoad = false
					this.page++
					if (res.body.activeList.length <= this.pageSize - 1) {
						this.delayLoad = true
						this.$refs.loading.change()
					}
				} else {
					this.$refs.loading.change()
				}
				this.switch = true
			})
		},
		getData (pullDown) {
			let params = {}
			params.agentId = this.infoInform.id
			params.pageNo = this.page
			params.pageSize = this.pageSize
			params.schoolName = this.searchSchoolName
			params.type = this.statusIndex
			if (this.infoInform.agentChildAccount) {
				params.areaIds = this.infoInform.agentChildAuthArea
			}
			params.userCenterIdDing = this.infoInform.userCenterId
			ReportApi.getActiveReportList(params, res => {
				if (res.code === 10000) {
					this.date = moment(res.body.date).format('M月D日')
					res.body.list.result.forEach(item => {
						item.activeRatio = toDecimal2(item.activeRatio)
					})
					if (pullDown) {
						this.list = res.body.list.result
					} else {
						this.list = this.list.concat(res.body.list.result)
					}
					this.delayLoad = false
					this.page++
					if (res.body.list.result.length <= this.pageSize - 1) {
						this.delayLoad = true
						this.$refs.loading.change()
					}
				} else {
					this.$refs.loading.change()
				}
				this.switch = true
			})
		},
		// 获取首页列表数据(下拉刷新)
		loadTop () {
			this.page = 1
			this.selectType(this.statusIndex, 1)
			this.$refs.loading.onchange()
		},
		handleTopChange () {
			this.switch = false
			setTimeout(() => {
				if (this.$refs.loadmore) {
					this.$refs.loadmore.onTopLoaded()
				}
				this.switch = true
			}, 3000)
		},
		selectStatus (state) {
			this.statusIndex = state
			this.$route.meta.type = state
			this.searchSchoolName = ''
			this.searchSchool()
		},
		baseInfrom (schoolId, item) {
			if (this.actionCode.indexOf('"buttonCode":"REPORT_MANAGE_DETAIL"') !== -1) {
				if (!this.switch) {
					return
				}
				setStore('base', item)
				setStore('state', '0') // 控制修改按钮
				tongji('06_01_linkto_school_info', '1')
				this.$router.push({path: `/reportBaseInfrom/3/${schoolId}`})
			} else {
				toast('您没有查看列表详情的权限！')
			}
		},
		explain () {
			this.$router.push('/classRatioExplain/0')
		}
	}
}
</script>
<style scoped lang="stylus">
	@import "./assets/index.styl"
</style>
