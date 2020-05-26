<template>
	<div class="container">
		<div class="flex">
			<MHeader @backClick="goBack" :headerTitle="topStr"></MHeader>
			<span @click="toHistoryRank" class="right-text">历史排行</span>
			<div class="tab-hd">
				<div class="left">
					<a v-for="(item,index) in tabList" :key="index" href="javascript:;" :class="current==index?'now':''" @click="ChangeTab(index)">{{item}}</a>
				</div>
				<div class="right">{{yesterdayStr}}</div>
			</div>
		</div>
		<ul class="load-list">
			<li class="rank-li" @click="topersonRank(item.schoolId, item.userId)" v-for="(item, index) in list" :key="index">
				<div class="list-left" >
					<i class="common" v-if="item.rank <=3 && item.score" :class="item.rank==1?'rank1':item.rank==2?'rank2':item.rank==3?'rank3':''"></i>
					<i class="common" v-else>{{item.score?item.rank: ''}}</i>
					<img class="avtar-img" :src="item.userPic" alt="">
					<div class="user-info">
						<span class="active">{{item.name}}</span>
						<span class="agent-school">
							<em >{{item.schoolNumber}}</em>
							<em class="name-str">{{item.schoolName}}</em>
						</span>
					</div>
				</div>
				<div class="list-right">
					<span  class="top" v-if="!index">互动指数<i @click.stop="toRule" class="icon-answer"></i></span>
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
	name: 'teacherRanking',
	components: {
		MHeader,
		VLoading
	},
	data () {
		return {
			current: 0,
			tabList: ['本周排名', '本月排名'],
			yesterdayStr: '',
			list: [],
			infoInform: setStore('infoInform'),
			rankImg: require('../../assets/images/icon_head.png'),
			topStr: ''
		}
	},
	beforeRouteEnter (to, from, next) {
		if (from.name === 'ZtlivelyAnalyzing') {
			to.meta.path = 1
		}
		if (from.name === 'ZtpartnerHome') {
			to.meta.path = 0
		}
		next()
	},
	mounted () {
		this.current = ~~this.$route.meta.index
		this.ChangeTab(this.current)
		tongji('07_01_teachers_weekly_list', '0')
	},
	methods: {
		goBack () {
			~~this.$route.meta.path === 1 ? this.$router.push('/activeAnalyzing') : this.$router.push('/home')
			tongji('07_01_back', '1')
		},
		ChangeTab (index) {
			this.current = index
			this.$route.meta.index = index
			document.getElementsByClassName('load-list')[0].scrollTop = 0
			this.getData(index)
			if (index) {
				tongji('07_01_teachers_monthly_list', '1')
			}
		},
		// 按代理商维度周排行榜
		agentWeekDate () {
			let params = {}
			params.agentId = this.infoInform.id
			ReportApi.getTeacherRankByWeekWithAgent(params, res => {
				if (res.code === 10000) {
					this.yesterdayStr = `昨天(${res.body.yesterdayStr})`
					this.topStr = '园丁排行榜TOP' + res.body.top
					if (res.body.teachers.length) {
						this.list = res.body.teachers
						res.body.teachers.forEach(item => {
							item.userPic = item.userPic ? item.userPic + '?imageView/1/w/160/h/160' : deafultImg('teacher', item.sexNew)
						})
					}
				}
				this.$refs.loading.change()
			})
		},
		// 按照代理商维度月榜
		agentMonthDate () {
			let params = {}
			params.agentId = this.infoInform.id
			ReportApi.getTeacherRankByMonthWithAgent(params, res => {
				// 判断code状态
				if (res.code === 10000) {
					this.yesterdayStr = `昨天(${res.body.yesterdayStr})`
					this.topStr = '园丁排行榜TOP' + res.body.top
					if (res.body.teachers.length) {
						this.list = res.body.teachers
						res.body.teachers.forEach(item => {
							item.userPic = item.userPic ? item.userPic + '?imageView/1/w/160/h/160' : deafultImg('teacher', item.sexNew)
						})
					}
				}
				this.$refs.loading.change()
			})
		},
		getData (index) {
			if (index === 0) {
				this.agentWeekDate()
			} else {
				this.agentMonthDate()
			}
		},
		// 点击跳转规则
		toRule () {
			this.$router.push({path: '/teacherRule'})
		},
		// 点击排行列表跳转
		topersonRank (schoolId, userId) {
			tongji('07_01_personal_list', '1')
			this.$router.push({path: `/personRanking/0/${this.current}/0/${userId}/${schoolId}`})
		},
		toHistoryRank () {
			tongji('07_01_history_ranking', '1')
			this.$router.push({path: `/historyRank/0/${this.current}/''`})
		}
	}
}
</script>
