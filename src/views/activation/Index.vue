<template>
	<div class="container">
		<div class="flex">
			<m-header @backClick="handleClose" headerTitle="激活报表"></m-header>
			<span class="right-text">昨天({{date}})</span>
			<ul class="nav-status">
				<li class="status" v-for="(item, index) in status" :key="index" @click="selectStatus(index)"><span class="bg-color" :class="index == statusIndex ? 'change-color': ''">{{item}}</span></li>
			</ul>
			<div class="search">
				<div class="search_school search-input">
					<img src="../../assets/images/report-search.png" alt="">
					<input id="searchSchool" type="text" v-model="searchSchoolName" placeholder="输入学校名称关键字搜索">
				</div>
				<img class="screen" src="../../assets/images/icon_screen.png" alt="" @click="modelFlag = true">
			</div>
			<div v-show='actionCode.indexOf("\"codeId\":\"ACTIVATE_REPORT_COUNT_MENU\"") ==-1?false:true' class="active-text">
				<div>
					<p class="p-text">昨天新增{{status[statusIndex]}}达标园 {{activationObject.standardsTotalYesterdayCount}} 家；</p>
					<p class="p-text">本周新增{{status[statusIndex]}}达标园 {{activationObject.standardsTotalWeekCount}} 家；</p>
					<p class="p-text">已达标 {{activationObject.standardCount}} 家，达标率 {{activationObject.controlRatesStr}}，未达标 {{activationObject.belowStandardCount}} 家</p>
				</div>
				<i class="icon-wenhao" @click="playFlag = true"></i>
			</div>
		</div>
		<mt-loadmore class="main" v-code='"ACTIVATE_REPORT_LIST"'  :top-method="loadTop" @top-status-change="handleTopChange" topLoadingText="正在刷新..." ref="loadmore">
			<div v-infinite-scroll="loadMore" infinite-scroll-distance="100" :infinite-scroll-immediate-check="true">
				<ul class="from-table" v-for="(item, index) in list" :key="item.id"  @click.prevent="baseInfrom(item.schoolId, item)">
					<li class="table-li from-li">
						<span class="li-index" :class="item.isStandard == 2?'school-radio':''">{{index + 1}}</span>
						<div class="li-center">
							<div class="center-top">
								<span class="serial" :class="item.isStandard == 2?'school-radio':''">{{item.schoolNumber}}</span>
								<span class="school-name" :class="item.isStandard == 2?'school-radio':''">{{item.schoolName}}</span>
							</div>
							<div class="center-bottom">
								<span class="school-bottom" v-if="item.schoolCategoryVal">{{item.schoolCategoryVal}}</span>
								<span class="school-bottom" v-if="item.schoolTypeStr">{{item.schoolTypeStr}}</span>
								<span class="school-bottom" v-if="item.schoolActLevel">活跃{{item.schoolActLevel}}级</span>
							</div>
						</div>
						<div class="li-right">
							<span v-if="statusIndex == 0" class="radio" :class="item.isStandard == 2?'school-radio':''">{{item.importRatio}}</span>
							<span v-else-if="statusIndex == 1" class="radio" :class="item.isStandard==2?'school-radio':''">{{item.activationRatio}}</span>
							<span v-else class="radio" :class="item.isStandard == 2?'school-radio':''">{{item.studentActivationRatioStr}}</span>
							<i class="icon-right"></i>
						</div>
					</li>
				</ul>
			</div>
			<v-loading ref="loading" :loadingFlag="true"></v-loading>
		</mt-loadmore>
		<dialogModal :isShow="playFlag" @close="playFlag = false">
			<ul slot="content" class="alert_ul">
				<li class="example">
					<p class="raito">导入比:</p>
					<p class="roito-left">一个在读学生导入多少个家长。</p>
					<p class="roito-left">在读学生家长数<span>÷</span>在读学生数</p>
				</li>
				<li class="example">
					<p class="raito">导入比目标值: <span>{{activationObject.importTheRatioTargetValue | numFilter}}</span></p>
				</li>
				<li class="example">
					<p class="raito">激活比:</p>
					<p class="roito-left">一个在读学生有多少个激活的家长。</p>
					<p class="roito-left">在读激活家长数<span>÷</span>在读学生数</p>
				</li>
				<li class="example">
					<p class="raito">激活比目标值: <span>{{activationObject.activateTheRatioTargetValue | numFilter}}</span></p>
				</li>
				<li class="example">
					<p class="raito">激活率:</p>
					<p class="roito-left">导入的用户中有百分之多少激活了</p>
					<p class="roito-left">激活数<span>÷</span>在读/在职数 * 100%</p>
				</li>
				<li class="example">
					<p class="raito">学生激活率目标值: <span>{{activationObject.studentActivationRateTargetValue}}%</span></p>
				</li>
			</ul>
		</dialogModal>
		<Model ref="mychild" :show="modelFlag" @change="modelFlag=false" @success="selectSuccess"></Model>
	</div>
</template>
<script>
import Vue from 'vue'
import { setStore, debounce, tongji, toDecimal2, toast } from '@/utils/common'
import	{ Loadmore } from 'mint-ui'
import { ReportApi } from '@/api/index'
import MHeader from '@/components/MHeader'
import DialogModal from '@/components/dialogModal'
import Model from './component/Model'
import VLoading from '@/components/loading'
import moment from 'moment'
Vue.component(Loadmore.name, Loadmore)
export default {
	name: 'index',
	components: {
		MHeader,
		DialogModal,
		Model,
		VLoading
	},
	data () {
		return {
			actionCode: setStore('actionCode') ? JSON.stringify(setStore('actionCode')) : '',
			searchSchoolName: '',
			list: [],
			infoInform: setStore('infoInform') ? setStore('infoInform') : '',
			page: 1,
			pageSize: 10,
			delayLoad: false,
			switch: true,
			loadingFlag: true,
			status: ['导入比', '激活比', '学生激活率'],
			statusIndex: 1,
			schoolClassifyIndex: '',
			schoolTypeIndex: '',
			schoolActiveIndex: '',
			date: '',
			playFlag: false,
			activationObject: {},
			modelFlag: false
		}
	},
	beforeRouteEnter (to, from, next) {
		if (from.name === 'ZtactiveAnalyzing') {
			to.meta.path = 1
			to.meta.isBack = true
		}
		if (from.name === 'ZtpartnerHome') {
			to.meta.path = 0
			to.meta.isBack = true
		}
		to.meta.id = to.params.id
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
			this.getData()
			this.getActivationInfo()
			this.$refs.loading.onchange()
		}
		this.$route.meta.isBack = false
		setStore('firstComeIn', '0')
	},
	mounted () {
		if (this.statusIndex === 2) {
			tongji('05_01_student_active_rate', '0')
		} else if (this.statusIndex === 1) {
			tongji('05_01_activation_ratio', '0')
		} else {
			tongji('05_01_import_ratio', '0')
		}
		if (!this.$route.meta.isBack) {
			// 当前页面刷新需要请求参数
			this.getData()
		}
	},
	methods: {
		handleClose () {
			~~this.$route.meta.path === 1 ? this.$router.push('/activeAnalyzing') : this.$router.push('/home')
		},
		selectSuccess (selectIndex, schoolClassifyIndex, schoolTypeIndex, schoolActiveIndex) {
			this.selectIndex = selectIndex
			this.schoolClassifyIndex = schoolClassifyIndex
			this.schoolTypeIndex = schoolTypeIndex
			this.schoolActiveIndex = schoolActiveIndex
			this.search()
		},
		search () {
			document.getElementsByClassName('main')[0].scrollTop = 0
			this.page = 1
			this.getData(1)
			this.modelFlag = false
			this.$refs.loading.onchange()
		},
		loadMore () {
			// 加载完毕不在上拉请求数据
			if (this.delayLoad) {
				return false
			}
			this.delayLoad = true
			this.getData()
			this.$refs.loading.onchange()
		},
		// 获取首页列表数据(下拉刷新)
		loadTop () {
			this.page = 1
			this.getData(1)
			this.$refs.loading.onchange()
		},
		searchSchool () {
			document.getElementsByClassName('main')[0].scrollTop = 0
			this.$refs.mychild.reset()
			this.page = 1
			this.schoolClassifyIndex = ''
			this.schoolTypeIndex = ''
			this.schoolActiveIndex = ''
			this.getData(1)
		},
		getActivationInfo () {
			let params = {}
			params.agentId = this.infoInform.id
			params.type = this.statusIndex + 1
			if (this.infoInform.agentChildAccount) {
				params.areaIds = this.infoInform.agentChildAuthArea
			}
			ReportApi.getActivationInfo(params, res => {
				if (res.code === 10000) {
					this.activationObject = res.body
				} else {
					toast(res.message)
				}
			})
		},
		getData (pullDown) {
			let params = {}
			params.agentId = this.infoInform.id
			params.pageNo = this.page
			params.pageSize = this.pageSize
			params.type = this.statusIndex + 1
			params.isStandard = this.selectIndex
			params.schoolName = this.searchSchoolName
			params.schoolCategoryVals = this.schoolClassifyIndex
			params.schoolTypes = this.schoolTypeIndex
			params.actLevels = this.schoolActiveIndex
			if (this.infoInform.agentChildAccount) {
				params.areaIds = this.infoInform.agentChildAuthArea
			}
			params.userCenterIdDing = this.infoInform.userCenterId
			ReportApi.getActivationReportList(params, res => {
				if (res.code === 10000) {
					this.loadingFlag = true
					this.date = moment(res.body.date).format('M月D日')
					res.body.list.result.forEach(item => {
						item.importRatio = toDecimal2(item.importRatio)
						item.activationRatio = toDecimal2(item.activationRatio)
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
			this.$route.meta.type = state
			this.statusIndex = state
			this.searchSchoolName = ''
			this.popupVisible = false
			this.getActivationInfo()
			this.search()
		},
		baseInfrom (schoolId, item) {
			if (this.actionCode.indexOf('"buttonCode":"REPORT_MANAGE_DETAIL"') !== -1) {
				if (!this.switch) {
					return
				}
				tongji('05_01_linkto_school_info', '1')
				setStore('base', item)
				setStore('state', '0') // 控制修改按钮
				if (this.statusIndex) {
					this.$router.push({path: `/reportBaseInfrom/2/${schoolId}`})
				} else {
					this.$router.push({path: `/reportBaseInfrom/1/${schoolId}`})
				}
			} else {
				toast('您没有查看列表详情的权限！')
			}
		}
	}
}
</script>
