<template>
	<div class="container">
		<div class="flex">
			<m-header @backClick="goBack" :headerTitle="timeStr + '排行'"></m-header>
		</div>
		<ul class="load-list">
			<li class="rank-li detail-li" @click="toDetailRank(item.userId, item.schoolId)" v-for="(item, index) in list" :key="index">
				<div class="list-left">
					<i class="common" v-if="item.rank <=3 && item.score" :class="item.rank==1?'rank1':item.rank==2?'rank2':item.rank==3?'rank3':''"></i>
					<i class="common" v-else>{{item.score?item.rank: ''}}</i>
					<img class="avtar-img" :src="type?item.pic :item.userPic" alt="">
					<div class="user-info">
						<span class="active">{{item.name}}</span>
						<span v-if="type">
						<em v-if="!item.active" style="color: #818D9D;">老师还没有激活，参与不了排行</em>
						<em v-else-if="item.active && !item.rank">{{current?'本月有点懒，还没参与互动':'本周有点懒，还没参与互动'}}</em>
						<em v-else-if="item.active && !item.rank && !item.championTimes"></em>
						<em v-else-if="item.active && item.rank && item.championTimes" >共<em >{{item.championTimes}}</em>{{current?'次荣获本学年月榜冠军':'次荣获本学年周榜冠军'}}</em>
					</span>
						<span v-else class="agent-school">
							<em>{{item.schoolNumber}}</em>
							<em class="name-str">{{item.schoolName}}</em>
						</span>
					</div>
				</div>
				<div class="list-right">
					<span  class="top" v-if="!index">互动指数 <i @click.stop="toRule" class="icon-answer"></i></span>
					<span class="bom">{{item.score}}</span>
				</div>
			</li>
			<v-loading ref="loading" :loadingFlag="true"></v-loading>
		</ul>
	</div>
</template>
<script>
import MHeader from '@/components/MHeader'
import { setStore, tongji, deafultImg } from '@/utils/common'
import { ReportApi } from '@/api/index'
import VLoading from '@/components/loading'
export default {
	name: 'detailRank',
	components: {
		MHeader,
		VLoading
	},
	data () {
		return {
			current: 0,
			type: '',
			time: '',
			userId: '',
			timeStr: '',
			list: [],
			infoInform: setStore('infoInform'),
			loading: true,
			rankImg: require('../../assets/images/icon_head.png')
		}
	},
	// 每次进入路由之前都会执行这个钩子函数 然后获取数据 赋值给下一个组件
	beforeRouteEnter (to, from, next) {
		to.meta.index = to.params.id
		to.meta.type = to.params.type
		to.meta.time = to.params.time
		to.meta.userId = to.params.userId
		to.meta.timeStr = to.params.timeStr
		next()
	},
	mounted () {
		this.current = ~~this.$route.meta.index
		this.type = ~~this.$route.meta.type
		this.time = this.$route.meta.time
		this.timeStr = this.$route.meta.timeStr
		this.userId = this.$route.meta.userId
		this.getData(this.type, this.current)
	},
	methods: {
		goBack () {
			this.$router.go(-1)
			if (this.type) {
				if (this.current) {
					tongji('07_08_back', '1')
				} else {
					tongji('07_07_back', '1')
				}
			} else {
				if (this.current) {
					tongji('07_04_back', '1')
				} else {
					tongji('07_03_back', '1')
				}
			}
		},
		getData (type, index) {
			if (type) {
				if (index) {
					tongji('07_07_history_ranking_monthly_details', '0')
					this.schoolMonthList()
				} else {
					tongji('07_07_history_ranking_monthly_details', '0')
					this.schoolWeekList()
				}
			} else {
				if (index) {
					tongji('07_04_history_ranking_weekly_details', '0')
					this.agentMonthList()
				} else {
					tongji('07_03_history_ranking_monthly_details', '0')
					this.agentWeekList()
				}
			}
		},
		// 学校维度下的周排名
		schoolWeekList () {
			let params = {}
			params.schoolId = this.userId
			params.date = this.time
			ReportApi.getTeacherRankByWeek(params, res => {
				if (res.code === '10000' && res.body.teachers.length) {
					this.list = res.body.teachers
					res.body.teachers.forEach(item => {
						item.pic = item.pic ? item.pic + '?imageView/1/w/160/h/160' : deafultImg('teacher', item.sexNew)
					})
				}
				this.$refs.loading.change()
			})
		},
		// 学校维度下的月排名
		schoolMonthList () {
			let params = {}
			params.schoolId = this.userId
			params.date = this.time
			ReportApi.getTeacherRankByMonth(params, res => {
				if (res.code === '10000' && res.body.teachers.length) {
					this.list = res.body.teachers
					res.body.teachers.forEach(item => {
						item.pic = item.pic ? item.pic + '?imageView/1/w/160/h/160' : deafultImg('teacher', item.sexNew)
					})
				}
				this.$refs.loading.change()
			})
		},
		// 代理商维度下的周排名
		agentWeekList () {
			let params = {}
			params.agentId = this.userId
			params.championDate = this.time
			ReportApi.getTeacherRankWeekDetailByAgent(params, res => {
				if (res.code === 10000 && res.body.teachers.length) {
					this.list = res.body.teachers
					res.body.teachers.forEach(item => {
						item.userPic = item.userPic ? item.userPic + '?imageView/1/w/160/h/160' : item.userPic = deafultImg('teacher', item.sexNew)
					})
				}
				this.$refs.loading.change()
			})
		},
		// 代理商维度下的月排行
		agentMonthList () {
			let params = {}
			params.agentId = this.userId
			params.championDate = this.time
			ReportApi.getTeacherRankMonthDetailByAgent(params, res => {
				if (res.code === 10000 && res.body.teachers.length) {
					this.list = res.body.teachers
					res.body.teachers.forEach(item => {
						item.userPic = item.userPic ? item.userPic + '?imageView/1/w/160/h/160' : item.userPic = deafultImg('teacher', item.sexNew)
					})
				}
				this.$refs.loading.change()
			})
		},
		// 点击排行列表跳转
		toDetailRank (userId, schoolId) {
			if (this.type) {
				if (this.current) {
					tongji('07_04_personal_list', '1')
				} else {
					tongji('07_03_personal_list', '1')
				}
			} else {
				if (this.current) {
					tongji('07_08_personal_list', '1')
				} else {
					tongji('07_07_personal_list', '1')
				}
			}
			let id = this.type ? this.userId : schoolId
			this.$router.push({path: `/personRanking/${this.type}/${this.current}/0/${userId}/${id}`})
		},
		// 跳转排行榜规则
		toRule () {
			this.$router.push({path: '/teacherRule'})
		}
	}
}
</script>
