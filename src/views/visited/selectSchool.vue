
<template>
	<div class="container">
		<div class="flex">
			<m-header @backClick="handleClose" headerTitle="选择学校"></m-header>
			<div class="search">
				<div class="search_school">
					<img src="../../assets/images/report-search.png" alt="">
					<input id="searchSchool" type="text" v-model="searchSchoolName" ref="content" placeholder="输入学校名称关键字搜索">
				</div>

			</div>
		</div>
		<mt-loadmore class="main"  :top-method="loadTop" @top-status-change="handleTopChange" topLoadingText="正在刷新..." ref="loadmore">
			<div  v-infinite-scroll="loadMore" infinite-scroll-distance="100" :infinite-scroll-immediate-check="true">
				<ul class="main-list" v-for="item in list" :key="item.schoolId" @click.prevent="selectSchool(item.schoolId, item.schoolType, item.schoolName)">
					<li class="first">
						<img class="logo" :src='item.schoolPicture&&item.schoolPicture.length?item.schoolPicture:defaultImg' alt="">
						<div class="right-content">
							<div class="right-content-top" :class="item.isFlagStr == '禁用'? 'forbid': ''">
								<span>{{item.schoolNumber}}</span>
								<span>{{item.schoolName}}</span>
							</div>
							<div class="right-content-top right-content-bottom" :class="item.isFlagStr == '禁用'? 'forbid': ''">
								<span>{{item.linkMan}}</span>
								<span>{{item.address}}</span>
							</div>
						</div>
						<img v-if ="item.isFlagStr == '禁用'&& item.schoolType !== '自主注册园'? true:false" class="right-top" src="../../assets/images/report-disables.png" alt="">
						<img v-else-if="item.isFlagStr == '禁用'  && item.schoolType == '自主注册园'? true:false" class="right-top" src="../../assets/images/report-useless.png" alt="">
						<img v-else style="display: none" class="right-top" src="" alt="">
					</li>
					<li class="art-second" :class="item.isFlagStr == '禁用'? 'forbid': ''">
						<span class="art-bg">{{item.schoolTypeStr}}</span>
						<span class="art-bg" v-show="item.schoolActivationLevel?true:false">激活{{item.schoolActivationLevel}}</span>
						<span class="art-bg" v-show="item.schoolActiveLevel?true:false">活跃{{item.schoolActiveLevel}}级</span>
					</li>
				</ul>
				<v-loading :loadingFlag="true" ref="loading"></v-loading>
			</div>
		</mt-loadmore>
	</div>
</template>

<script>
import Vue from 'vue'
import { setStore, debounce, toast, errorMsg, dictionary, setSession, remove } from '@/utils/common'
import { ReportApi } from '@/api/index'
import { Loadmore } from 'mint-ui'
import MHeader from '@/components/MHeader'
import VLoading from '@/components/loading'
Vue.component(Loadmore.name, Loadmore)
export default {
	name: 'select-school',
	components: {
		MHeader,
		VLoading
	},
	data () {
		return {
			searchSchoolName: '',
			list: [],
			infoInform: setStore('infoInform'),
			page: 1,
			pageSize: 10,
			delayLoad: false,
			switch: true,
			requestTag: true,
			alertFlag: false,
			defaultImg: require('../../assets/images/school.png'),
			productType: 1
		}
	},
	beforeRouteEnter (to, from, next) {
		to.meta.type = to.params.type
		next()
	},
	mounted () {
		this.getData()
		document.getElementById('searchSchool').addEventListener('input', debounce(this.searchSchool, 300), false)
		// document.getElementById('searchSchool').addEventListener('keypress', debounce(this.searchSchool, 300), false)
	},
	methods: {
		handleClose () {
			if (~~this.$route.meta.type === 1) {
				this.$router.push({path: '/visitedAdd/null'})
			} else if (~~this.$route.meta.type === 2) {
				this.$router.push({path: '/addSmartOrder/null'})
			} else {
				this.$router.push({path: '/backvisitedAdd/null'})
			}
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
		selectSchool (schoolId, schoolType, schoolName) {
			if (!this.switch) {
				return
			}
			let info = {}
			info.schoolId = schoolId
			info.schoolType = schoolType
			info.schoolName = schoolName
			if (~~this.$route.meta.type === 1) {
				let params = {}
				params.schoolId = schoolId
				params.userCenterIdDing = this.infoInform.userCenterId
				ReportApi.getHistoryBusiness(params, res => {
					if (res.flag) {
						if (res.msg && res.msg !== 'null') {
							dictionary('OPPORTUNITY_NAME', 1).then(ress => {
								let codeFlag = true
								ress.forEach((item, index) => {
									if (res.msg) {
										if (~~res.msg === item.code) {
											codeFlag = false
											setSession('businessingNameDefault', index.toString())
											setSession('businessingNameIndex', item.code)
											setSession('businessName', item.description)
											this.$router.push({path: `/visitedAdd/${JSON.stringify(info)}`})
										}
									}
								})
								if (codeFlag) {
									remove('businessingNameDefault')
									remove('businessName')
									this.$router.push({path: `/visitedAdd/${JSON.stringify(info)}`})
								}
							})
						} else {
							remove('businessingNameDefault')
							remove('businessName')
							this.$router.push({path: `/visitedAdd/${JSON.stringify(info)}`})
						}
					} else {
						toast(res.msg)
						errorMsg('接口错误', res, params)
					}
				})
			} else if (~~this.$route.meta.type === 2) {
				this.$router.push({path: `/addSmartOrder/${JSON.stringify(info)}`})
			} else {
				this.$router.push({path: `/backvisitedAdd/${JSON.stringify(info)}`})
			}
		},
		searchSchool () {
			this.page = 1
			this.getData(1)
			this.$refs.loading.onchange()
		},
		getData (pullDown) {
			let params = {
				'agentUser.id': this.infoInform.id,
				'agentUser.agentChildAuthArea': this.infoInform.agentChildAuthArea
			}
			params.pageNo = this.page
			params.pageSize = this.pageSize
			params.productType = setSession('productTypeIndex') ? setSession('productTypeIndex') : 1
			params.schoolName = this.searchSchoolName
			params.agentChildAccount = this.infoInform.agentChildAccount
			params.userCenterIdDing = this.infoInform.userCenterId
			if (~~this.$route.meta.type === 2) {
				params.type = 999
			}
			ReportApi.getschoolName(params, res => {
				if (res.data) {
					if (res.flag) {
						res.data.list.forEach((v) => {
							if (v.schoolPicture) {
								if (v.schoolPicture.indexOf('?') > -1) {
									v.schoolPicture = v.schoolPicture + '|imageView/1/w/160/h/160'
								} else {
									v.schoolPicture = v.schoolPicture + '?imageView/1/w/160/h/160'
								}
							} else {
								v.schoolPicture = require('../../assets/images/school.png')
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
				} else {
					errorMsg('接口错误', res, params)
				}
			})
		}
	}
}
</script>
