<template>
	<div class="container">
		<div class="flex">
			<m-header @backClick="goBack" headerTitle="历史排行"></m-header>
			<span @click="toHistoryRank" class="right-text">旧榜历史</span>
			<div class="nav-status">
				<li class="status" v-for="(item,index) in tabList" :key="index"  @click="ChangeTab(index)"><span class="bg-color" :class="index == currentIndex ? 'change-color': ''">{{item}}</span></li>
			</div>
		</div>
		<div class="main">
			<mt-loadmore class="main" v-code = '"REPORT_MANAGE_LIST"' :top-method="loadTop" @top-status-change="handleTopChange" topLoadingText="正在刷新..." ref="loadmore">
				<div v-infinite-scroll="loadMore" infinite-scroll-distance="100" :infinite-scroll-immediate-check="true">
					<ul class="from-table" v-for="(item, index) in list" :key="index">
						<li class="table-li newhistory-list" @click="toDetailRank(item.rankingId, item.startDate, item.endDate, item.title, item.date)" >
							<img  class="logo" :src='(currentIndex === 0 || currentIndex===1)?item.championAvatar:item.championPic' alt="">
							<div class="mid-content">
								<div>
									<span v-if="(currentIndex === 0 || currentIndex===1)&&item.startDate&&item.endDate">{{item.startDate}}至{{item.endDate}}{{currentIndex ? '月排行' : '周排行'}}</span>
									<span v-if="currentIndex === 2 || currentIndex===3">{{item.title}}</span>
								</div>
								<p>{{(currentIndex === 0 || currentIndex===1)?item.championName:item.className}}获得{{(currentIndex === 1 || currentIndex === 3) ? '月冠军' : '周冠军'}}</p>
							</div>
							<i class="icon-right"></i>
						</li>
					</ul>
				</div>
			</mt-loadmore>
			<v-loading ref="loading" :loadingFlag="true"></v-loading>
		</div>
	</div>
</template>
<script>
import MHeader from '@/components/MHeader'
import { setStore, tongji } from '@/utils/common'
import { ReportApi } from '@/api/index'
import VLoading from '@/components/loading'
export default {
	name: 'newHistoryRank',
	components: {
		MHeader,
		VLoading
	},
	data () {
		return {
			tabList: ['教师周榜', '教师月榜', '班级周榜', '班级月榜'],
			currentIndex: 0,
			list: [],
			type: null,
			infoInform: setStore('infoInform'),
			timeRank: '',
			page: 0,
			pageSize: 15,
			delayLoad: false,
			switch: true
		}
	},
	// 每次进入路由之前都会执行这个钩子函数 然后获取数据 赋值给下一个组件
	beforeRouteEnter (to, from, next) {
		// to.meta.schoolId = to.params.schoolId
		to.meta.teacherId = to.params.teacherId
		to.meta.teacherId = '1CyCJ3FGGNiyVRvsGj9'
		if (from.name === 'ZtnewTeacherRank') {
			to.meta.index = to.params.index
		}
		next()
	},
	mounted () {
		this.currentIndex = ~~this.$route.meta.index // 表示周榜月榜的索引
		if (this.currentIndex === 0 || this.currentIndex === 1) {
			this.page = 0
		} else {
			this.page = 1
		}
		this.getData(this.currentIndex)
		this.changeTonji()
	},
	methods: {
		goBack () {
			this.$router.push({path: `/newTeacherRank/${this.$route.meta.schoolId}`})
		},
		loadMore () {
			if (this.delayLoad) {
				return false
			}
			this.delayLoad = true
			this.getData(this.currentIndex)
		},
		// 获取首页列表数据(下拉刷新)
		loadTop () {
			if (this.currentIndex === 0 || this.currentIndex === 1){
				this.page = 0
			} else {
				this.page = 1
			}
			this.getData(this.currentIndex, 1)
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
		changeTonji () {
			switch (this.currentIndex) {
			case 0:
				tongji('07_07_new_history_weekly_ranking', '0')
				break
			case 1:
				tongji('07_07_new_history_monthly_ranking', '0')
				break
			case 2:
				tongji('07_07_history_class_weekly_rankingc', '0')
				break
			case 3:
				tongji('07_07_history_class _monthly_ranking', '0')
				break
			}
		},
		ChangeTab (index) {
			this.list = []
			this.currentIndex = index
			this.$route.meta.index = index
			if (this.currentIndex === 0 || this.currentIndex === 1) {
				this.page = 0
			} else {
				this.page = 1
			}
			this.getData(index, 0)
		},
		getData (index, flag) {
			if (index === 0 || index === 1) {
				this.newTeacherHistoryList(flag)
			} else {
				this.classRankHistoryList(flag)
			}
		},
		// 教师历史排行榜
		newTeacherHistoryList (pullDown) {
			let params = {}
			params.teacherId = this.$route.meta.teacherId
			params.roleType = 5
			params.schoolId = this.$route.meta.schoolId
			params.termType = this.currentIndex + 1
			params.page = this.page
			params.pageSize = this.pageSize
			ReportApi.newTeacherHistoryList(params, res => {
				if (res.code === 10000) {
					if (pullDown) {
						this.list = res.body.rankingList
					} else {
						this.list = this.list.concat(res.body.rankingList)
					}
					this.list.forEach(item => {
						item.championAvatar = item.championAvatar ? item.championAvatar + '?imageView/1/w/160/h/160' : require('../../assets/images/icon_head.png')
						item.startDate = item.startDate ? item.startDate.substr(5, 8) : ''
						item.endDate = item.endDate ? item.endDate.substr(5, 8) : ''
					})
					this.delayLoad = false
					this.page++
					if (res.body.rankingList.length <= this.pageSize - 1) {
						this.delayLoad = true
						this.$refs.loading.change()
					}
				} else {
					this.$refs.loading.change()
				}
				this.switch = true
			})
		},
		// 班级历史排行榜
		classRankHistoryList (pullDown) {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			params.type = this.currentIndex - 1
			params.pageNo = this.page
			params.pageSize = this.pageSize
			ReportApi.classRankHistoryList(params, res => {
				if (res.code === 10000) {
					if (pullDown) {
						this.list = res.body.historyRank[0].records
					} else {
						this.list = this.list.concat(res.body.historyRank[0].records)
					}
					this.delayLoad = false
					this.page++
					if (res.body.historyRank.length <= this.pageSize - 1) {
						this.delayLoad = true
						this.$refs.loading.change()
					}
				} else {
					this.$refs.loading.change()
				}
				this.switch = true
			})
		},
		toHistoryRank () {
			tongji('07_07_old_history_ranking', '1')
			this.$router.push({path: `/historyRank/1/1/${this.$route.meta.schoolId}`})
		},
		// 点击排行列表跳转
		toDetailRank (rankingId, startDate, endDate, title, timeStr) {
			let schoolId = this.$route.meta.schoolId
			if (this.currentIndex === 0 || this.currentIndex === 1) {
				let aa = startDate + '至' + endDate + (this.currentIndex ? '月排行' : '周排行')
				this.$router.push({path: `/newDetailRank/${schoolId}/${rankingId}/${aa}`})
			} else {
				this.$router.push({path: `/classDetailRank/${schoolId}/${title}/${this.currentIndex - 1}/${timeStr}`})
			}
		}
	}
}
</script>
