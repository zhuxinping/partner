<template>
	<div class="container">
		<div class="flex">
			<m-header @backClick="handleClose" headerTitle="客户回访(售后)"></m-header>
			<img @click="addVisited" class="right-img" src="../../assets/images/reprot-add.png"  v-code ='"RETURN_VISIT_ADD"'>
			<ul class="nav-status">
				<li class="status" v-for="(item, index) in status" :key="index" @click="selectStatus(index)"><span class="bg-color" :class="index == statusIndex ? 'change-color': ''">{{item}}</span></li>
			</ul>
			<div class="search">
				<div class="search_school search-input">
					<img src="../../assets/images/report-search.png" alt="">
					<input id="searchSchool" type="text" v-model="searchSchoolName" placeholder="输入学校名称关键字搜索">
				</div>
				<img class="screen" src="../../assets/images/icon_screen.png" alt="" @click="openSelect">
			</div>
		</div>
		<mt-loadmore class="main" v-code = '"RETURN_VISIT_LIST"' :top-method="loadTop" @top-status-change="handleTopChange" topLoadingText="正在刷新..." ref="loadmore">
			<div v-infinite-scroll="loadMore" infinite-scroll-distance="100" :infinite-scroll-immediate-check="true">
				<ul class="main-list" v-for="(item, index) in list" :key="index">
					<li class="first">
						<img class="logo" :src="item.url" alt="">
						<div class="right-content">
							<div class="content-top">
								<p class="schoolName">{{item.schoolName}}</p>
								<div>
									<p class="stand">{{item.visitTypeName}}</p>
								</div>
							</div>
							<div class="content-bottom">
								<span>{{item.visitTime|capitalize}}</span>
								<span>{{item.visitTime|capitalizetime}}</span>
								<span>{{item.visitorName}}</span>
								<span>{{item.visitWayName}}</span>
							</div>
						</div>
					</li>
					<li class="thrid" @click = 'showAlert(item.visitContent)'>{{item.visitContent}}</li>
					<li class="fourth" v-show="item.returnVisitPicList && item.returnVisitPicList.length">
						<img class="select-img" v-if="url.picUrl.length" @click="showSwiper(item.returnVisitPicList,index)" v-for="(url, index) in item.returnVisitPicList" :key="index" :src="url.picUrl+'?imageView/1/w/160/h/160'" alt="">
					</li>
				</ul>
			</div>
			<v-loading :loadingFlag="true" ref="loading"></v-loading>
		</mt-loadmore>
		<openModal :show="popupVisible" :listInfo="listInfo" @change="popupVisible = false" @success = 'selectSuccess'></openModal>
		<dialogModal :isShow="alertFlag" :sureShow="false">
			<ul slot="content"  class="visited-text">
				<li class="alert-logo" @click="alertFlag = false">回访内容 <img src="../../assets/images/icon_close.png" alt=""></li>
				<li class="alert-content">{{summary}}</li>
			</ul>
		</dialogModal>
		<swiperImage @change="imgFlag = false" :imgFlag="imgFlag" :previewImg="previewImg" :imgIndex="imgIndex"></swiperImage>
	</div>
</template>

<script>
import Vue from 'vue'
import { setStore, debounce, tongji } from '@/utils/common'
import { Loadmore } from 'mint-ui'
import { ReportApi } from '@/api/index'
import MHeader from '@/components/MHeader'
import DialogModal from '@/components/dialogModal'
import OpenModal from '@/components/selectModal'
import SwiperImage from '@/components/swiperImage'
import VLoading from '@/components/loading'
Vue.component(Loadmore.name, Loadmore)
export default {
	name: 'index',
	components: {
		MHeader,
		DialogModal,
		OpenModal,
		SwiperImage,
		VLoading
	},
	data () {
		return {
			popupVisible: false,
			searchSchoolName: '',
			list: [],
			infoInform: setStore('infoInform'),
			page: 1,
			pageSize: 10,
			delayLoad: false,
			switch: true,
			alertFlag: false,
			imgFlag: false,
			summary: '',
			imgIndex: 0,
			previewImg: [],
			defaultImg: require('../../assets/images/school.png'),
			templateStartTime: '',
			templateEndTime: '',
			listInfo: [
				{code: 'RETURN_VISIT_WAY', title: '回访方式'},
				{code: 'RETURN_VISIT_TYPE', title: '回访类型'}],
			visitWayCode: '',
			visitTypeCode: '',
			statusIndex: 0,
			status: ['智慧校园', '时光集']
		}
	},
	filters: {
		capitalize (value) {
			return value.substring(5, 11)
		},
		capitalizetime (value) {
			return value.substring(11, 16)
		}
	},
	mounted () {
		this.$route.query.status ? this.statusIndex = ~~this.$route.query.status - 1 : ''
		this.getData()
		tongji('03_01_return_visit', '0')
		document.getElementById('searchSchool').addEventListener('input', debounce(this.searchSchool, 300), false)
		// document.getElementById('searchSchool').addEventListener('keypress', debounce(this.searchSchool, 300), false)
	},
	methods: {
		handleClose () {
			this.$router.push('/home')
		},
		handleTouchmove (e) {
			e.preventDefault()
		},
		openSelect () {
			tongji('03_01_return_visit_filter', '1')
			this.popupVisible = true
		},
		selectSuccess (code, start, end) {
			this.visitWayCode = code[0] ? code[0] : ''
			this.visitTypeCode = code[1] ? code[1] : ''
			this.templateStartTime = start
			this.templateEndTime = end
			this.search()
		},
		search () {
			document.documentElement.scrollTop = 0
			this.page = 1
			this.getData(1)
			this.popupVisible = false
			this.$refs.loading.onchange()
		},
		showAlert (a) {
			if (!this.switch) {
				return
			}
			this.alertFlag = true
			this.summary = a
		},
		showSwiper (a, index) {
			if (!this.switch) {
				return
			}
			this.imgIndex = index
			this.previewImg = a
			this.imgFlag = true
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
		handleTopChange (status) {
			this.switch = false
			setTimeout(() => {
				if (this.$refs.loadmore) {
					this.$refs.loadmore.onTopLoaded()
				}
				this.switch = true
			}, 3000)
		},
		addVisited () {
			tongji('03_01_return_visit_add', '1')
			this.$router.push({path: '/backvisitedAdd/null'})
		},
		searchSchool () {
			document.getElementsByClassName('main')[0].scrollTop = 0
			this.templateStartTime = ''
			this.templateEndTime = ''
			this.visitWayCode = ''
			this.visitWayCode = ''
			this.visitTypeCode = ''
			this.listInfo = [{code: 'RETURN_VISIT_WAY', title: '回访方式'}, {code: 'RETURN_VISIT_TYPE', title: '回访类型'}]
			this.search()
		},
		selectStatus (index) {
			this.statusIndex = index
			document.getElementsByClassName('main')[0].scrollTop = 0
			this.page = 1
			this.getData(1)
			this.$refs.loading.onchange()
		},
		getData (pullDown) {
			let params = {}
			params.agentId = this.infoInform.id
			params.pageNo = this.page
			params.pageSize = this.pageSize
			params.schoolName = this.searchSchoolName
			params.startTime = this.templateStartTime
			params.endTime = this.templateEndTime
			params.visitWayMultiSelect = this.visitWayCode
			params.visitTypeMultiSelect = this.visitTypeCode
			params.userType = this.infoInform.userType
			params.roleId = this.infoInform.roleId
			params.productType = this.statusIndex + 1
			params.agentChildAccount = this.infoInform.agentChildAccount
			params.agentChildAuthArea = this.infoInform.agentChildAuthArea
			params.userCenterIdDing = this.infoInform.userCenterId
			ReportApi.getReturnVisitList(params, res => {
				if (res.code === 10000 && res.body) {
					res.body.list && res.body.list.forEach((v) => {
						if (v.url) {
							if (v.url.indexOf('?') > -1) {
								v.url = v.url
							} else {
								v.url = v.url + '?imageView/1/w/160/h/160'
							}
						} else {
							v.url = require('../../assets/images/school.png')
						}
					})
					if (pullDown) {
						this.list = res.body.list
					} else {
						this.list = this.list.concat(res.body.list)
					}
					this.delayLoad = false
					this.page++
					if (res.body.list.length <= this.pageSize - 1) {
						this.delayLoad = true
						this.$refs.loading.change()
					}
				} else {
					this.$refs.loading.change()
				}
				this.switch = true
			})
		}
	}
}
</script>
