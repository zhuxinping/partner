<template>
	<div class="container">
		<div class="flex">
			<m-header @backClick="goBack" headerTitle="历史排行"></m-header>
			<div class="nav-status">
				<li class="status" v-for="(item,index) in tabList" :key="index"  @click="ChangeTab(index)"><span class="bg-color" :class="index == currentIndex ? 'change-color': ''">{{item}}</span></li>
			</div>
		</div>
		<div class="main">
			<ul class="from-table" v-for="(item, index) in list" :key="index">
				<li class="table-li history-list" @click="toDetailRank(item.championDateStr, item.championDate, item.schoolId)" >
					<span class="history-left">{{item.championDateStr}}</span>
					<div class="history-right">
						<span class="name-str">{{timeRank}}:{{item.name}}</span>
						<i class="icon-right"></i>
					</div>
				</li>
			</ul>
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
	name: 'historyRank',
	components: {
		MHeader,
		VLoading
	},
	data () {
		return {
			tabList: ['教师周榜', '教师月榜'],
			currentIndex: 0,
			list: [],
			type: null,
			infoInform: setStore('infoInform'),
			timeRank: ''
		}
	},
	// 每次进入路由之前都会执行这个钩子函数 然后获取数据 赋值给下一个组件
	beforeRouteEnter (to, from, next) {
		to.meta.type = to.params.type
		to.meta.schoolId = to.params.schoolId
		if (from.name === 'ZtteacherRank' || from.name === 'ZtnewTeacherRank') {
			to.meta.index = to.params.index
		}
		next()
	},
	mounted () {
		this.type = ~~this.$route.meta.type // 1表示按学校维度
		this.currentIndex = ~~this.$route.meta.index // 表示周榜月榜的索引
		if (this.type) {
			tongji('07_06_history_weekly_ranking', '0')
		} else {
			tongji('07_02_history_weekly_ranking', '0')
		}
		this.getData(this.type, this.currentIndex)
	},
	methods: {
		goBack () {
			if (this.type === 1) {
				this.$router.push({path: `/newTeacherRank/${this.$route.meta.schoolId}`})
				tongji('07_06_back', '1')
			} else {
				this.$router.push('/teacherRank')
				tongji('07_02_back', '1')
			}
		},
		ChangeTab (index) {
			if (this.type) {
				if (index) {
					tongji('07_06_history_monthly_ranking', '1')
				}
			} else {
				if (index) {
					tongji('07_02_history_monthly_ranking', '1')
				}
			}
			this.list = []
			this.currentIndex = index
			this.$route.meta.index = index
			this.getData(this.type, index)
		},
		getData (type, index) {
			if (type) {
				if (index) {
					this.schoolMonthRank()
				} else {
					this.schoolWeekRank()
				}
			} else {
				if (index) {
					this.agentMonthRank()
				} else {
					this.agentWeekRank()
				}
			}
		},
		// 学校维度周排行榜
		schoolWeekRank () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			ReportApi.getTeacherRankListByWeekWithSchool(params, res => {
				if (res.code === '10000' && res.body.historyRank.length) {
					this.timeRank = '周冠军'
					this.list = res.body.historyRank
				}
				this.$refs.loading.change()
			})
		},
		// 学校维度月排行榜
		schoolMonthRank () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			ReportApi.getTeacherRankListByMonthWithSchool(params, res => {
				if (res.code === '10000' && res.body.historyRank.length) {
					this.timeRank = '月冠军'
					this.list = res.body.historyRank
				}
				this.$refs.loading.change()
			})
		},
		// 代理商维度周排行榜
		agentWeekRank () {
			let params = {}
			params.agentId = this.infoInform.id
			ReportApi.getTeacherRankListByWeekWithAgent(params, res => {
				if (res.code === 10000 && res.body.historyRank.length) {
					this.timeRank = '周冠军'
					this.list = res.body.historyRank
				}
				this.$refs.loading.change()
			})
		},
		// 代理商维度月排行榜
		agentMonthRank () {
			let params = {}
			params.agentId = this.infoInform.id
			ReportApi.getTeacherRankListByMonthWithAgent(params, res => {
				if (res.code === 10000 && res.body.historyRank.length) {
					this.timeRank = '月冠军'
					this.list = res.body.historyRank
				}
				this.$refs.loading.change()
			})
		},
		// 点击排行列表跳转
		toDetailRank (timeStr, time, schoolId) {
			let userId
			if (this.type) {
				userId = schoolId
				if (this.currentIndex) {
					tongji('07_06_history_ranking_weekly_details', '1')
				} else {
					tongji('07_06_history_ranking_monthly_details', '1')
				}
			} else {
				userId = this.infoInform.id
				if (this.currentIndex) {
					tongji('07_02_history_ranking_weekly_details', '1')
				} else {
					tongji('07_02_history_ranking_monthly_details', '1')
				}
			}
			this.$router.push({path: `/detailRank/${this.currentIndex}/${this.type}/${time}/${userId}/${timeStr}`})
		}
	}
}
</script>
