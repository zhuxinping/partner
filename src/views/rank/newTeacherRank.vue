<template>
	<div class="container">
		<div class="flex">
			<MHeader @backClick="goBack" headerTitle="排行榜"></MHeader>
			<span @click="toHistoryRank" class="right-text">历史排行</span>
			<ul class="nav-status">
				<li class="status" v-for="(item, index) in titleList" :key="index" @click="selectStatus(index)"><span class="bg-color" :class="index == titleIndex ? 'change-color': ''">{{item}}</span></li>
			</ul>
		</div>
		<ul class="load-list">
			<div class="bm-champion" v-if="titleIndex == 0">
				<img class="bm-bg" :src="champion.userAvatar ? champion.userAvatar : rankImg" alt="">
				<div class="champion">
					<p>{{champion.userName}}占领了封面</p>
					<div class="tx-bg">
						<img :src="champion.userAvatar +'?imageView/1/w/126/h/126'" alt="">
					</div>
					<p class="nm-p">{{champion.userName}}</p>
					<span>互动指数<span style="margin-left: 10px">{{champion.loveTotal}}</span></span>
				</div>
			</div>
			<div class="bm-champion" v-if="titleIndex == 2">
				<img class="bm-bg" :src="champion.pic ? champion.pic : rankImg" alt="">
				<div class="champion">
					<p>{{champion.name}}占领了封面</p>
					<div class="tx-bg">
						<img :src="champion.pic +'?imageView/1/w/126/h/126'" alt="">
					</div>
					<p class="nm-p">{{champion.name}}</p>
					<span>互动指数<span style="margin-left: 10px">{{champion.score}}</span></span>
				</div>
			</div>
			<div class="tab-hd">
				<div class="left">
					<a v-for="(item,index) in tabList" :key="index" href="javascript:;" :class="current==index?'now':''" @click="ChangeTab(index)">{{item}}</a>
				</div>
				<div v-if="titleIndex !==1" class="right" @click="rankRule(titleIndex)"><i class="icon-answer"></i>{{titleIndex==2?'级别&排名说明':'排名规则'}}</div>
			</div>
			<li v-if="titleIndex == 0" class="rank-li" v-for="(item, index) in list" :key="index" @click="topersonRank(item.userId, 0, item.isActive)">
				<div class="list-left" >
					<i class="common" v-if="item.rankingIndex <=3 && item.loveTotal" :class="item.rankingIndex==1?'rank1':item.rankingIndex==2?'rank2':item.rankingIndex==3?'rank3':''"></i>
					<i class="common" v-else>{{item.loveTotal?item.rankingIndex: ''}}</i>
					<img class="avtar-img" :src="item.userAvatar1" alt="">
					<div class="user-info">
						<span style="display: flex">
							<span class="active">{{item.userName}}</span>
							<span v-show="item.isActive && item.levelInfo" :class="item.levelInfo.levelValue<4? 'bg1':item.levelInfo.levelValue<8?'bg2':'bg3'">{{item.levelInfo.levelValue}}级</span>
						</span>
						<span>
							<em v-if="!item.isActive">老师还没有激活，参与不了排行</em>
							<em v-else-if="item.isActive && !item.rankingIndex">{{current?'本月有点懒，还没参与互动':'本周有点懒，还没参与互动'}}</em>
							<em v-else-if="item.isActive && !item.rankingIndex && !item.championsCount"></em>
							<em v-else-if="item.isActive && item.rankingIndex && item.championsCount">荣获<em class="score">{{item.championsCount}}</em>{{current?'次月榜冠军':'次周榜冠军'}}</em>
						</span>
					</div>
				</div>
				<div class="list-right">
					<span class="bom">{{item.loveTotal}}</span>
				</div>
			</li>
			<li v-if="titleIndex == 1" class="rank-li" @click="topersonRank(item.userId, 1, item.active)" v-for="(item, index) in list" :key="index">
				<div class="list-left" >
					<i class="common" v-if="item.rank <=3 && item.score" :class="item.rank==1?'rank1':item.rank==2?'rank2':item.rank==3?'rank3':''"></i>
					<i class="common" v-else>{{item.score?item.rank: ''}}</i>
					<img class="avtar-img" :src="item.pic" alt="">
					<div class="user-info">
						<span class="active">{{item.name}}</span>
						<span>
							<em v-if="!item.active">老师还没有激活，参与不了排行</em>
							<em v-else-if="item.active && !item.rank">{{current?'本月有点懒，还没参与互动':'本周有点懒，还没参与互动'}}</em>
							<em v-else-if="item.active && !item.rank && !item.championTimes"></em>
							<em v-else-if="item.active && item.rank && item.championTimes">共<em class="score">{{item.championTimes}}</em>{{current?'次荣获本学年月榜冠军':'次荣获本学年周榜冠军'}}</em>
						</span>
					</div>
				</div>
				<div class="list-right">
					<span  class="top" v-if="!index">互动指数<i @click.stop="toRule" class="icon-answer"></i></span>
					<span class="bom">{{item.score}}</span>
				</div>
			</li>
			<li v-if="titleIndex == 2" class="rank-li" @click="topersonRank(item.userId, 2, 1)" v-for="(item, index) in list" :key="index">
				<div class="list-left" >
					<i class="common" v-if="item.rank <=3 && item.score" :class="item.rank==1?'rank1':item.rank==2?'rank2':item.rank==3?'rank3':''"></i>
					<i class="common" v-else>{{item.score?item.rank: ''}}</i>
					<img class="avtar-img" :src="item.pic" alt="">
					<div class="user-info">
						<span class="active">{{item.name}}</span>
						<span style="max-width: 200px;overflow: hidden;text-overflow: ellipsis; white-space: nowrap">
							<em v-if="!item.score">{{current?'本月有点懒，还没参与互动': '本周月有点懒，还没参与互动'}}</em>
							<em v-else-if="!item.championTimes">{{current?'': item.weekActiveRatioLevel}}</em>
							<em v-else>{{current?'': item.weekActiveRatioLevel}}共<em class="score">{{item.championTimes}}</em>{{current?'次荣获本学年月榜冠军':'次荣获本学年周榜冠军'}}</em>
						</span>
					</div>
				</div>
				<div class="list-right">
					<span class="bom">{{item.score}}</span>
				</div>
			</li>
			<v-loading ref="loading" :loadingFlag="true"></v-loading>
		</ul>
	</div>
</template>
<script>
import MHeader from '@/components/MHeader'
import { setStore, tongji, deafultImg, toast } from '@/utils/common'
import { ReportApi } from '@/api/index'
import VLoading from '@/components/loading'
export default {
	name: 'newTeacherRank',
	components: {
		MHeader,
		VLoading
	},
	data () {
		return {
			titleIndex: 0,
			current: 1,
			titleList: ['教师新榜', '教师旧榜', '班级活跃榜'],
			tabList: ['周排行', '月排行'],
			list: [],
			infoInform: setStore('infoInform'),
			rankImg: require('../../assets/images/icon_head.png'),
			teacherId: '',
			champion: {}
		}
	},
	// 每次进入路由之前都会执行这个钩子函数 然后获取数据 赋值给下一个组件
	beforeRouteEnter (to, from, next) {
		to.meta.schoolId = to.params.schoolId
		// to.meta.schoolId = 'vE7Z48ptN75viDCtAKX'
		if (from.name === 'ztreportBaseInfrom') {
			to.meta.index = 0
			to.meta.current = 1
		}
		next()
	},
	mounted () {
		this.titleIndex = ~~this.$route.meta.index
		this.current = ~~this.$route.meta.current
		this.getTeacherId()
		this.ChangeTab(this.current)
	},
	methods: {
		goBack () {
			this.$router.push({path: `/reportBaseInfrom/3/${this.$route.meta.schoolId}`})
			tongji('07_05_new_back', '1')
		},
		rankRule (index) {
			if (index === 2) {
				this.$router.push('/classRankRule')
			} else {
				this.$router.push('/newTeacherRankRule')
			}
		},
		selectStatus (index) {
			this.titleIndex = index
			this.$route.meta.index = index
			switch (index) {
			case 0:
				this.current = 1
				this.newRankTeacherList()
				break
			case 1:
				this.ChangeTab(0)
				break
			case 2:
				this.current = 0
				this.classRankList()
				break
			}
		},

		ChangeTab (index) {
			this.current = index
			this.$route.meta.current = index
			document.getElementsByClassName('load-list')[0].scrollTop = 0
			switch (this.titleIndex) {
			case 0:
				if (!this.current) {
					tongji('07_05_new_teachers_weekly_list', '1')
				} else {
					tongji('07_05_new_teachers_monthly_list', '0')
				}
				this.newRankTeacherList()
				break
			case 1:
				if (this.current) {
					tongji('07_05_teachers_monthly_list', '1')
				} else {
					tongji('07_05_teachers_weekly_list', '0')
				}
				this.getData(index)
				break
			case 2:
				if (this.current) {
					tongji('07_06_class_monthly_list', '1')
				} else {
					tongji('07_06_class_weekly_list', '0')
				}
				this.classRankList()
				break
			}
			tongji('07_05_teachers_monthly_list', '1')
		},
		// 按学校维度新园丁排行榜
		newRankTeacherList () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			params.termType = this.current + 1
			ReportApi.newRankTeacherList(params, res => {
				if (res.code === 10000 && res.body.rankingList.length) {
					this.list = res.body.rankingList
					res.body.rankingList.forEach(item => {
						item.userAvatar1 = item.userAvatar ? item.userAvatar + '?imageView/1/w/126/h/126' : this.rankImg
					})
					this.champion = res.body.rankingList[0]
				}
				this.$refs.loading.change()
			})
		},
		// 按学校维度新班级排行榜
		classRankList () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			params.type = this.current + 1
			ReportApi.classRankList(params, res => {
				if (res.code === 10000 && res.body.classes.length) {
					this.list = res.body.classes
					this.champion = res.body.champion
					res.body.classes.forEach(item => {
						item.pic = item.pic ? item.pic + '?imageView/1/w/160/h/160' : this.rankImg
					})
				}
				this.$refs.loading.change()
			})
		},
		// 按学校维度旧周排行榜
		schoolWeekDate () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
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
		// 按照学校维度获取月排行榜
		schoolMonthDate () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
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
		getData (index) {
			if (index === 0) {
				this.schoolWeekDate()
			} else {
				this.schoolMonthDate()
			}
		},
		// 获取园长id
		getTeacherId () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			ReportApi.getTeacherId(params, res => {
				if (res.code === 10000) {
					// this.teacherId = res.body
					this.teacherId = 'c96a295c7a64100a3c06'
				}
			})
		},
		// 点击跳转规则
		toRule () {
			this.$router.push({path: '/teacherRule'})
		},
		// 点击排行列表跳转
		topersonRank (userId, index, flag) {
			let id = this.$route.meta.schoolId
			if (flag) {
				if (!index) {
					tongji('07_05_new_personal_list', '1')
					this.$router.push({path: `/newPersonRank/${this.current}/${this.teacherId}/${id}`})
				} else {
					tongji('07_05_personal_list', '1')
					this.$router.push({path: `/personRanking/1/${this.current}/${index - 1}/${userId}/${id}`})
				}
			} else {
				toast('老师还没有激活，没有榜单数据')
			}
		},
		toHistoryRank () {
			tongji('07_05_history_ranking', '1')
			let index = ''
			if (this.titleIndex === 2) {
				this.current ? index = 3 : index = 2
			} else {
				this.current ? index = 1 : index = 0
			}
			this.$router.push({path: `/newHistoryRank/${index}/${this.$route.meta.schoolId}/${this.teacherId}`})
		}
	}
}
</script>
<style lang="stylus" scoped>
	@import "./assets/newTeacherRank.styl"
</style>
