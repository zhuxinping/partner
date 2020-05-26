<template>
	<div class="container">
		<div class="flex">
			<m-header @backClick="handleClose" headerTitle="报备园"></m-header>
			<img @click="addReport" class="right-img" src="../../assets/images/reprot-add.png" v-code="'REPORT_SCHOOL_ADD'">
			<ul class="nav-status">
				<li class="status" v-for="(item, index) in status" :key="index" @click="selectStatus(index)"><span class="bg-color" :class="index == statusFlag ? 'change-color': ''">{{item}}</span></li>
			</ul>
			<div class="search">
				<div class="search_school">
					<img src="../../assets/images/report-search.png" alt="">
					<input id="searchSchool" type="text" v-model="searchSchoolName" placeholder="输入学校名称关键字搜索">
				</div>
			</div>
			<p class="waitting" v-if="statusFlag == 0">待审批: {{totalCount}} 家</p>
			<p class="waitting" v-if="statusFlag == 1"><span>已过期: {{expiredCount}} 家</span><span>快过期: {{fastExpiredCount}} 家</span><span>未过期: {{unexpiredCount}} 家</span></p>
			<p class="waitting" v-if="statusFlag == 2">未通过: {{totalCount}} 家</p>
		</div>
		<mt-loadmore class="main" v-code = '"REPORT_MANAGE_LIST"' :top-method="loadTop" @top-status-change="handleTopChange" topLoadingText="正在刷新..." ref="loadmore">
			<div v-infinite-scroll="loadMore" infinite-scroll-distance="100" :infinite-scroll-immediate-check="true">
				<dl class="report-main" v-for="(item, index) in list" :key="index"  @click.prevent="baseInfrom(item.schoolName,item.schoolId,item.id)">
					<dt><img class="left-img" :src='item.schoolPicUrl' alt=""></dt>
					<dd>
						<p class="schoolName">{{item.schoolName}}</p>
						<p class="tel">{{item.linkMan}}</p>
						<p class="address">{{item.address}}</p>
						<div class="class">
							<span v-if="statusFlag == 1 && item.schoolActLevel && item.schoolActiveLevel">
							<span >激活{{item.schoolActLevel}}</span>活跃{{item.schoolActiveLevel}}级</span>
						</div>
						<i class="icon-right"></i>
						<img class="right-top" :style="statusFlag == 1 && item.schoolActLevel && item.schoolActiveLevel?'top:-10px':''" v-if="statusFlag == 1" :src="item.timeStateName" alt="">
					</dd>
				</dl>
				<v-loading ref="loading" :loadingFlag = 'true'></v-loading>
			</div>
		</mt-loadmore>
		<div @click="nextFlag = false" >
			<dialogModal :isShow="nextFlag" :sureShow="false">
				<ul slot="content" class="alert_ul" style="padding: 0">
					<li class="next_router" @click.stop="update" v-show='statusFlag == 2 && actionCode.indexOf("\"buttonCode\":\"REPORT_SCHOOL_EDIT\"")!=-1?true:false'>修改</li>
					<li class="next_router" @click.stop="searchInfo" v-show='actionCode.indexOf("\"buttonCode\":\"REPORT_MANAGE_DETAIL\"")!=-1?true:false'>查看学校详情</li>
					<li class="next_router" @click.stop="nextRouter" v-show='actionCode.indexOf("\"buttonCode\":\"CALL_ON_ACTION_RECORD_ADD\"")==-1 ? false:true'>添加拜访记录</li>
				</ul>
			</dialogModal>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import { setStore, debounce, toast, errorMsg, tongji } from '@/utils/common'
import { Loadmore } from 'mint-ui'
import { ReportApi } from '@/api/index'
import MHeader from '@/components/MHeader'
import DialogModal from '@/components/dialogModal'
import VLoading from '@/components/loading'
Vue.component(Loadmore.name, Loadmore)
export default {
	name: 'index',
	components: {
		MHeader,
		DialogModal,
		VLoading
	},
	data () {
		return {
			actionCode: JSON.stringify(setStore('actionCode')),
			searchSchoolName: '',
			list: [],
			infoInform: setStore('infoInform'),
			page: 1,
			pageSize: 10,
			delayLoad: false,
			switch: true,
			totalCount: '',
			expiredCount: '',
			fastExpiredCount: '',
			unexpiredCount: '',
			status: ['待审批', '已通过', '未通过'],
			statusFlag: 1,
			nextFlag: false,
			nextFlagButton: false,
			schoolId: '',
			reportId: '',
			schoolName: ''
		}
	},
	beforeRouteEnter (to, from, next) {
		if (from.name === 'ZtpartnerHome' || ~~setStore('firstComeIn')) {
			to.meta.isBack = true
			to.meta.index = 1
		}
		next()
	},
	activated () {
		this.infoInform = setStore('infoInform')
		this.actionCode = JSON.stringify(setStore('actionCode'))
		document.getElementById('searchSchool').addEventListener('input', debounce(this.searchSchool, 300), false)
		document.getElementsByClassName('main')[0].scrollTop = ~~setStore('scrollTop')
		this.delayLoad = false
		if (this.$route.meta.isBack || ~~setStore('firstComeIn')) {
			// 清理已有商品列表的数据，重新请求数据，如果不清除的话就会有之前的商品缓存，延迟显示最新的商品
			this.list = []
			this.page = 1
			this.statusFlag = 1
			setStore('state', this.statusFlag.toString()) // 控制修改按钮
			this.searchSchoolName = ''
			this.delayLoad = true
			this.getData()
			this.$refs.loading.onchange()
		}
		this.$route.meta.isBack = false
		setStore('firstComeIn', '0')
	},
	mounted () {
		tongji('01_01_report_school', '0')
		if (!this.$route.meta.isBack) {
			this.getData()
		}
	},
	methods: {
		handleClose () {
			this.delayLoad = true
			this.$router.push('/home')
		},
		loadMore () {
			if (this.delayLoad) {
				return false
			}
			this.delayLoad = true
			this.getData()
		},
		searchSchool () {
			document.getElementsByClassName('main')[0].scrollTop = 0
			this.list = []
			this.page = 1
			this.getData(1)
			this.$refs.loading.onchange()
		},
		// 获取首页列表数据(下拉刷新)
		loadTop () {
			this.page = 1
			this.getData(1)
			this.$refs.loading.onchange()
		},
		getData (pullDown) {
			let params = {}
			params.id = this.infoInform.id
			params.pageNo = this.page
			params.pageSize = this.pageSize
			params.schoolName = this.searchSchoolName
			params.state = this.statusFlag + 1
			params.agentChildAuthArea = this.infoInform.agentChildAuthArea
			params.agentChildAccount = this.infoInform.agentChildAccount
			params.userCenterIdDing = this.infoInform.userCenterId
			ReportApi.getList(params, res => {
				if (res.flag && res.data) {
					this.totalCount = res.data.totalCount
					this.expiredCount = res.data.expiredCount
					this.fastExpiredCount = res.data.fastExpiredCount
					this.unexpiredCount = res.data.unexpiredCount
					res.data.list && res.data.list.forEach((v) => {
						if (v.schoolPicUrl) {
							if (v.schoolPicUrl.indexOf('?') > -1) {
								v.schoolPicUrl = v.schoolPicUrl
							} else {
								v.schoolPicUrl = v.schoolPicUrl + '?imageView/1/w/160/h/160'
							}
						} else {
							v.schoolPicUrl = require('../../assets/images/school.png')
						}
						if (v.timeStateName === '未过期') {
							v.timeStateName = require('../../assets/images/report-notoverdue.png')
						} else if (v.timeStateName === '快过期') {
							v.timeStateName = require('../../assets/images/report-expire.png')
						} else if (v.timeStateName === '已过期') {
							v.timeStateName = require('../../assets/images/report-overdue.png')
						}
					})
					if (pullDown) {
						this.list = res.data.list
					} else {
						this.list = this.list.concat(res.data.list)
					}
					this.delayLoad = false
					this.page++
					if (res.data.list.length <= this.pageSize - 1) {
						this.delayLoad = true
						this.$refs.loading.change()
					}
				} else {
					this.$refs.loading.change()
				}
				this.switch = true
			})
		},
		handleTopChange (status) {
			this.switch = false
			setTimeout(() => {
				if (this.$refs.loadmore) {
					this.$refs.loadmore.onTopLoaded()
				}
				this.switch = true
			}, 3000)
		},
		selectStatus (index) {
			this.statusFlag = index
			setStore('state', this.statusFlag.toString()) // 控制修改按钮
			this.searchSchoolName = ''
			this.totalCount = ''
			this.delayLoad = true
			this.searchSchool()
		},
		addReport () {
			let params = {}
			params.id = this.infoInform.id
			params.userCenterIdDing = this.infoInform.userCenterId
			ReportApi.addReport(params, res => {
				if (res.flag) {
					this.delayLoad = true
					this.$router.push({path: '/reportAdd'})
				} else {
					toast(res.msg)
					errorMsg('接口错误', res, params)
				}
			})
		},
		baseInfrom (schoolName, schoolId, reportId) {
			if (!this.switch) {
				return
			}
			this.schoolName = schoolName
			this.schoolId = schoolId
			this.reportId = reportId
			setStore('reportId', reportId)
			let code = this.actionCode
			if (code.indexOf('REPORT_MANAGE_DETAIL') !== -1 || code.indexOf('CALL_ON_ACTION_RECORD_ADD') !== -1 || (code.indexOf('REPORT_SCHOOL_EDIT') !== -1 && this.statusFlag === 2)) {
				this.nextFlag = true
				return
			}
			if (this.actionCode.indexOf('REPORT_MANAGE_DETAIL') < 0) {
				toast('您没有查看列表详情的权限！')
			}
		},
		update () {
			let params = {}
			params.schoolId = this.schoolId
			params.agentId = this.infoInform.id
			params.reportId = this.reportId
			params.userCenterIdDing = this.infoInform.userCenterId
			ReportApi.updateBaseInform(params, res => {
				if (res.flag) {
					this.nextFlag = false
					setStore('base', res.data)
					setStore('scrollTop', document.getElementsByClassName('main')[0].scrollTop.toString())
					this.delayLoad = true
					this.$router.push({path: '/updateBaseInform/10000'})
				} else {
					toast(res.msg)
					errorMsg('接口错误', res, params)
				}
			})
		},
		searchInfo () {
			if (this.actionCode.indexOf('REPORT_MANAGE_DETAIL') !== -1) {
				if (!this.switch) {
					return
				}
				let params = {}
				params.schoolId = this.schoolId
				params.agentId = this.infoInform.id
				params.reportId = this.reportId
				params.userCenterIdDing = this.infoInform.userCenterId
				ReportApi.getBaseInform(params, res => {
					if (res.flag) {
						this.nextFlag = false
						setStore('base', res.data)
						setStore('jumpPath', 'report')
						setStore('scrollTop', document.getElementsByClassName('main')[0].scrollTop.toString())
						this.delayLoad = true
						this.$router.push({path: `/reportBaseInfrom/0/${this.schoolId}`})
					} else {
						toast(res.msg)
						errorMsg('接口错误', res, params)
					}
				})
			} else {
				toast('您没有查看列表详情的权限！')
			}
		},
		nextRouter () {
			this.nextFlag = false
			this.delayLoad = true
			let info = {}
			let schoolType = ''
			if (this.statusFlag === 1) {
				schoolType = '报备园'
			} else {
				schoolType = '报备申请'
			}
			info.schoolId = this.schoolId
			info.schoolType = schoolType
			info.schoolName = this.schoolName
			setStore('scrollTop', document.getElementsByClassName('main')[0].scrollTop.toString())
			this.$router.push({path: `/visitedAdd/${JSON.stringify(info)}`})
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
	/*@import "../../assets/stylus/common.styl"*/
	@import "./assets/index.styl"
</style>
