<template>
	<div class="container">
		<div class="flex">
			<m-header @backClick="handleClose" headerTitle="签到报表"></m-header>
			<span class="right-text">昨天({{date}})</span>
			<div class="search" style="border-bottom: 0">
				<div class="search_school ">
					<img src="../../assets/images/report-search.png" alt="">
					<input id="searchSchool" type="text" v-model="searchSchoolName" placeholder="输入学校名称关键字搜索">
				</div>
			</div>
		</div>
		<div class="table">
			<ul class="table-left">
				<li>学校名称</li>
				<li>学生<br>绑卡率</li>
				<li style="width: 90px">家长人脸<br>录入率</li>
				<li>学生<br>签到率</li>
				<li>人脸<br>签到率</li>
			</ul>
			<i class="icon-answer" @click="sginFlag=true"></i>
		</div>
		<mt-loadmore class="main" v-code='"ACTIVE_REPORT_LIST"'  :top-method="loadTop" @top-status-change="handleTopChange" topLoadingText="正在刷新..." ref="loadmore">
			<div v-infinite-scroll="loadMore" infinite-scroll-distance="100" :infinite-scroll-immediate-check="true">
				<ul class="from-table" v-for="item in list" :key="item.id"  @click.prevent="baseInfrom(item.schoolId,item)">
					<li class="table-li-no-height">
						<ul class="table-li-left">
							<li class="school-name">{{item.schoolName}}</li>
							<li class="bind-card-rate" :style="item.bindCardRate == '100.00%'?'':'color:#FF5E68'">{{item.bindCardRate}}</li>
							<li class="par-sgin-rate" style="width: 90px">
								<span :style="item.recognitionPicUploadRate == '100.00%'?'':'color:#FF5E68'">{{item.recognitionPicUploadRate}}</span>
								<span class="btm" v-show="item.recognitionPicUploadRateGrowth!='0.00%'">比前日<span :style="parseFloat(item.recognitionPicUploadRateGrowth)>0?'color:#7ED321':'color:#FF5E68'">{{parseFloat(item.recognitionPicUploadRateGrowth)>0?'+'+item.recognitionPicUploadRateGrowth:item.recognitionPicUploadRateGrowth}}</span></span>
							</li>
							<li class="stu-sgin-rate">{{item.signRate}}</li>
							<li class="recog-rate">{{item.recognitionRate}}</li>
						</ul>
						<i class="icon-right"></i>
					</li>
				</ul>
			</div>
			<v-loading ref="loading" :loadingFlag="true"></v-loading>
		</mt-loadmore>
		<dialogModal :isShow="sginFlag" @close="sginFlag = false">
			<ul slot="content" class="alert_ul">
				<li class="example">
					<p class="raito">学生绑卡率:</p>
					<p class="roito-left">已绑卡学生数÷当前在读学生数</p>
				</li>
				<li class="example">
					<p class="raito">家长人脸录入率:</p>
					<p class="roito-left">已绑卡且已录人脸家长数÷当前已绑卡家长数</p>
				</li>
				<li class="example">
					<p class="raito">学生签到率:</p>
					<p class="roito-left">已签到学生数÷在读学生数</p>
				</li>
				<li class="example">
					<p class="raito">人脸签到率:</p>
					<p class="roito-left">人脸签到学生数÷在读学生数</p>
				</li>
				<li class="example">
					<p class="raito">家长签到查看率:</p>
					<p class="roito-left">查看APP签到页家长数÷在读激活家长数</p>
				</li>
				<li class="example">
					<p class="raito">近5周趋势:</p>
					<p class="roito-left">近5周，每周周一至周五的每日均值，统计不包含周六周日</p>
				</li>
			</ul>
		</dialogModal>
	</div>
</template>
<script>
import Vue from 'vue'
import { setStore, debounce, toast, tongji } from '@/utils/common'
import { ReportApi } from '@/api/index'
import	{ Loadmore } from 'mint-ui'
import MHeader from '@/components/MHeader'
import VLoading from '@/components/loading'
import DialogModal from '@/components/dialogModal'
import moment from 'moment'
Vue.component(Loadmore.name, Loadmore)
export default {
	name: 'index',
	components: {
		MHeader,
		VLoading,
		DialogModal
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
			date: '',
			sginFlag: false
		}
	},
	mounted () {
		document.getElementById('searchSchool').addEventListener('input', debounce(this.searchSchool, 300), false)
		this.delayLoad = true
		this.date = moment(new Date()).add(-1, 'days').format('MM月DD日')
		this.getData()
		tongji('12_01_attend_report', '0')
	},
	methods: {
		handleClose () {
			this.$router.push('/home')
		},
		searchSchool () {
			this.page = 1
			this.getData(1)
			this.$refs.loading.onchange()
		},
		getData (pullDown) {
			let params = {}
			params.agentId = this.infoInform.id
			params.areaId = this.infoInform.agentChildAuthArea
			params.pageNo = this.page
			params.pageSize = this.pageSize
			params.schoolName = this.searchSchoolName
			ReportApi.schoolReportList(params, res => {
				if (res.code === 10000) {
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
		},
		// 获取首页列表数据(下拉刷新)
		loadTop () {
			this.page = 1
			this.getData(1)
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
		handleTopChange () {
			this.switch = false
			setTimeout(() => {
				if (this.$refs.loadmore) {
					this.$refs.loadmore.onTopLoaded()
				}
				this.switch = true
			}, 3000)
		},
		baseInfrom (schoolId, item) {
			if (this.actionCode.indexOf('"buttonCode":"REPORT_MANAGE_DETAIL"') !== -1) {
				if (!this.switch) {
					return
				}
				tongji('12_01_linkto_school_info', '1')
				setStore('base', item)
				setStore('state', '0') // 控制修改按钮
				this.$router.push({path: `/reportBaseInfrom/5/${schoolId}`})
			} else {
				toast('您没有查看列表详情的权限！')
			}
		}
	}
}
</script>
<style scoped lang="stylus">
	@import "./assets/index.styl"
</style>
