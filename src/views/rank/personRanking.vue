<template>
	<div class="container">
		<div class="flex">
			<MHeader @backClick="goBack" :headerTitle="typeIndex === 1 ? '班级榜单':'个人榜单'"></MHeader>
		</div>
		<div v-if="showData">
			<div class="rank-info">
				<div class="ri-top">
					<div class="ri-left">
						<span>{{list.currentRank.weekRank}}</span>
						<em>本周名次</em>
					</div>
					<div class="ri-mid">
						<img :src="list.currentRank.pic" alt="">
					</div>
					<div class="ri-right">
						<span>{{list.currentRank.monthRank}}</span>
						<em>本月名次</em>
					</div>
				</div>
				<div class="ri-bom">
					<span>{{list.currentRank.name}}</span>
					<em v-if="typeIndex === 0" v-html="rankDoc"></em>
					<em v-else>{{list.currentRank.doc}}</em>
				</div>
			</div>
			<div class="tab-box">
				<div class="tab-hd">
					<div class="tab-title">
						<a v-for="(item,index) in tabList" :key="index" href="javascript:;" :class="current==index?'line':''" @click="ChangeTab(index)">{{item}}</a>
					</div>
					<span class="score">互动指数：{{currentScore || 0}}</span>
				</div>
				<div class="tab-bd">
					<div class="tab-item" v-if="current">
						<echartRankLine :scoreList="sMonthData" @changeIndex="changeCurrentIndex" ref="lineMonth" :currentIndex="currentIndex"  id="month" :option="option" :style="style"></echartRankLine>
					</div>
					<div class="tab-item" v-else>
						<echartRankLine :scoreList="sWeekData" @changeIndex="changeCurrentIndex" ref="lineWeek" :currentIndex="currentIndex"  id="week" :option="option" :style="style"></echartRankLine>
					</div>
				</div>
			</div>
		</div>
		<no-data :operation = 'flagData'></no-data>
	</div>
</template>
<script>
import MHeader from '@/components/MHeader'
import echartRankLine from './components/echartRankLine'
import imgUrl from '../../assets/images/dot@2x.png'
import { ReportApi } from '@/api/index'
import { setStore, deafultImg } from '@/utils/common'
import NoData from '@/components/no-data'
import moment from 'moment'
export default {
	name: 'teacherRanking',
	components: {
		MHeader,
		echartRankLine,
		NoData
	},
	data () {
		return {
			type: null,
			current: 0,
			userId: null,
			id: '',
			typeIndex: null,
			infoInform: setStore('infoInform'),
			flagData: false,
			showData: false,
			schoolId: '',
			teacherId: '',
			avtar: require('../../assets/images/teacher.png'),
			tabList: ['周榜', '月榜'],
			list: [],
			style: {width: '100%', height: '75%'},
			currentScore: '0',
			currentIndex: '-1',
			xWeekData: [],
			sWeekData: [],
			weekRank: [],
			xMonthData: [],
			sMonthData: [],
			monthRank: [],
			option: {
				grid: {
					left: '8%',
					right: '8%',
					bottom: '12%',
					top: '15%',
					containLabel: true
				},
				tooltip: { // 鼠标悬浮弹窗提示
					trigger: 'none',
					show: true,
					showDelay: 0,
					hideDelay: 0,
					transitionDuration: 0,
					backgroundColor: 'rgba(255,255,255,0)',
					borderColor: 'rgba(255,255,255,0)',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'line', // 默认为直线，可选为：'line' | 'shadow'
						lineStyle: { // 直线指示器样式设置
							color: 'rgba(255,255,255,0)'

						}

					},
					textStyle: {
						color: 'rgba(255,151,0,1)',
						fontSize: 14
					}
				},
				title: {
					left: 'left',
					text: ''
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					triggerEvent: true,
					axisLine: {
						show: false
					},
					axisLabel: {
						show: true,
						interval: 0,
						textStyle: {
							color: '#BBBBBD',
							fontSize: '12'
						}
					},
					axisTick: {
						show: false
					},
					splitLine: { // grid 分割线设置
						show: true,
						lineStyle: {
							width: 1,
							type: 'dashed',
							color: ['rgba(238,238,238,1)']
						}
					},
					data: []
				},
				yAxis: {
					type: 'value',
					inverse: true,
					scale: false,
					offset: 15,
					minInterval: 1,
					interval: 1,
					triggerEvent: true,
					axisLine: {
						show: false
					},
					axisLabel: {
						show: true,
						textStyle: {
							color: '#BBBBBD',
							fontSize: '12'
						}
					},
					axisTick: {
						show: false
					},
					splitLine: { // grid 分割线设置
						show: true,
						lineStyle: {
							width: 1,
							type: 'dashed',
							color: ['rgba(238,238,238,1)']
						}
					}
				},
				series: [{
					silent: true,
					name: '排名',
					type: 'line',
					showSymbol: true,
					smooth: true,
					symbol: `image://${imgUrl}`, // 设定为实心点
					symbolSize: [10, 10], // 设定实心点的大小
					sampling: 'average',
					itemStyle: {
						normal: {
							color: 'rgba(0,170,255,1)'
						},
						emphasis: {
							color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: 'rgba(255,151,0,1)'
							},
							{
								offset: 0.5,
								color: 'rgba(255,151,0,0.8)'
							},
							{
								offset: 1,
								color: 'rgba(255,151,0,0.5)'
							}
							]),

							label: {
								show: true,
								formatter: [
									' {ranStyle|}第{c}名'
								].join('\n'),
								rich: {
									ranStyle: {
										color: 'rgba(255,151,0,1)',
										align: 'center',
										height: 20
									}

								},
								textStyle: {
									color: 'rgba(255,151,0,1)'
								}
							}
						}

					},
					areaStyle: {
						color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: '#bfeeff'
						}, {
							offset: 1,
							color: '#fff'
						}]),
						origin: 'end'
					},
					data: []
				}]
			}
		}
	},
	// 每次进入路由之前都会执行这个钩子函数 然后获取数据 赋值给下一个组件
	beforeRouteEnter (to, from, next) {
		to.meta.type = to.params.type
		to.meta.index = to.params.index
		to.meta.userId = to.params.userId
		to.meta.id = to.params.id
		to.meta.typeIndex = to.params.typeIndex
		next()
	},
	mounted () {
		this.type = ~~this.$route.meta.type
		this.current = ~~this.$route.meta.index
		this.userId = this.$route.meta.userId
		this.id = this.$route.meta.id
		this.typeIndex = ~~this.$route.meta.typeIndex
		this.refreshData()
	},
	computed: {
		rankDoc () {
			if (this.list.currentRank.monthChampionTimes === 0 && this.list.currentRank.weekChampionTimes === 0) {
				return '距离冠军还有段距离，加油哦'
			} else if (this.list.currentRank.monthChampionTimes !== 0 && this.list.currentRank.weekChampionTimes !== 0) {
				return `本学年已获得<em style="color:#ffec00;">${this.list.currentRank.weekChampionTimes}</em>个周冠军，<em style="color:#ffec00;">${this.list.currentRank.monthChampionTimes}</em>个月冠军`
			} else if (this.list.currentRank.monthChampionTimes !== 0) {
				return `本学年已获得<em style="color:#ffec00;">${this.list.currentRank.monthChampionTimes}</em>个月冠军`
			} else {
				return `本学年已获得<em style="color:#ffec00;">${this.list.currentRank.weekChampionTimes}</em>个周冠军`
			}
		}
	},
	methods: {
		goBack () {
			this.$router.go(-1)
		},
		ChangeTab (key) {
			this.current = key
			this.currentIndex = '-1'
			if (this.current === 0) {
				let weekRanks = this.list.weekRanks
				weekRanks.forEach((item, index) => {
					item.rank = item.rank ? item.rank : ''
					item.score = item.score ? item.score : ''
				})
				weekRanks.map((item, index) => {
					if (item.date === '本周') {
						this.xWeekData.push('本周')
					} else {
						this.xWeekData.push(moment(item.date).format('MM-DD'))
					}
					this.weekRank.push(item.rank)
					this.sWeekData.push(item.score)
				})
				this.option.xAxis.data = this.xWeekData
				this.option.yAxis.interval = Math.round(Math.max(...this.weekRank) / 6)
				this.option.series[0].data = this.weekRank
				this.option.dataZoom = [{
					type: 'inside',
					zoomLock: true,
					startValue: this.xWeekData.length - 6,
					endValue: this.xWeekData.length - 1
				}]
				this.currentScore = this.sWeekData[this.sWeekData.length - 1]
				this.$nextTick(() => {
					if (this.$refs.lineWeek) {
						this.$refs.lineWeek.setLight()
					}
					// console.log('重绘1')
					this.currentIndex = '-1'
				})
				this.xWeekData = []
				this.weekRank = []
			} else {
				let monthRanks = this.list.monthRanks
				// let len = monthRanks.length - 1
				monthRanks.forEach((item, index) => {
					item.rank = item.rank ? item.rank : ''
					item.score = item.score ? item.score : ''
				})
				monthRanks.map((item, index) => {
					this.xMonthData.push(item.date)
					this.monthRank.push(item.rank)
					this.sMonthData.push(item.score)
				})
				this.option.xAxis.data = this.xMonthData
				this.option.yAxis.interval = Math.round(Math.max(...this.monthRank) / 6)
				this.option.series[0].data = this.monthRank
				this.option.dataZoom = [{
					type: 'inside',
					zoomLock: true,
					startValue: this.xMonthData.length - 6,
					endValue: this.xMonthData.length - 1
				}]
				this.currentScore = this.sMonthData[this.sMonthData.length - 1]
				this.$nextTick(() => {
					if (this.$refs.lineMonth) {
						this.$refs.lineMonth.setLight()
					}
					// console.log('重绘2')
					this.currentIndex = '-1'
				})
				this.xMonthData = []
				this.monthRank = []
			}
		},
		// 更改currentIndex
		changeCurrentIndex (index) {
			this.currentIndex = index.toString()
			if (this.current === 0) {
				this.currentScore = this.sWeekData[index]
			} else {
				this.currentScore = this.sMonthData[index]
			}
		},
		// 按代理商维度请求个人榜单数据
		agentPersonDate () {
			let params = {}
			params.agentId = this.infoInform.id
			params.schoolId = this.id
			params.teacherId = this.userId
			this.flagData = false
			ReportApi.getTeacherPersonalByAgent(params, res => {
				if (res.code === '10000') {
					if (res.body) {
						this.list = res.body
						if (!this.list.currentRank.pic) {
							this.list.currentRank.pic = deafultImg('teacher', res.body.currentRank.sexNew)
						} else {
							this.list.currentRank.pic = this.list.currentRank.pic + '?imageView/1/w/160/h/160'
						}
						this.ChangeTab(this.current)
						this.showData = true
					} else {
						this.flagData = true
						this.showData = false
					}
				} else {
					// 其他提醒
					this.flagData = true
					this.showData = false
				}
			})
		},
		// 按学校维度的请求个人榜单数据
		schoolPersonDate () {
			let params = {}
			params.schoolId = this.id
			params.teacherId = this.userId
			this.flagData = false
			ReportApi.getTeacherPersonalBySchool(params, res => {
				if (res.body) {
					if (res.code === '10000') {
						// errorMsg('结束调用个人榜单按学校接口', getStore('timestr'), new Date().getTime())
						if (res.body) {
							this.list = res.body
							if (!this.list.currentRank.pic) {
								this.list.currentRank.pic = deafultImg('teacher', res.body.currentRank.sexNew)
							} else {
								this.list.currentRank.pic = this.list.currentRank.pic + '?imageView/1/w/160/h/160'
							}
							this.ChangeTab(this.current)
							this.showData = true
						} else {
							this.flagData = true
							this.showData = false
						}
					}
				} else {
					this.flagData = true
					this.showData = false
				}
			})
		},
		// 班级排行榜
		getClassPersonal () {
			let params = {}
			params.schoolId = this.id
			params.classId = this.userId
			ReportApi.classPersonRank(params, res => {
				if (res.code === 10000) {
					this.list = res.body
					this.ChangeTab(this.current)
					this.showData = true
				} else {
					this.flagData = true
					this.showData = false
				}
			})
		},
		refreshData () {
			if (this.typeIndex === 1) {
				this.getClassPersonal()
			} else {
				if (this.type) {
					this.schoolPersonDate()
				} else {
					this.agentPersonDate()
				}
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
.tab-box{
	margin-top 20px
	background #fff
	.tab-hd{
		padding 0 30px
		display flex
		justify-content space-between
		a{
			height 88px
			line-height 88px
			font-size 36px
			color #333
			padding 0 15px
			margin-right 0
			opacity 1
		}
		a.line{
			color #74A9FF
		}
		a:nth-child(1){
			position relative
		}
		a:nth-child(1):after{
			position absolute
			content '/'
			color #333
			right -3px
		}
		span{
			height 88px
			line-height 88px
			font-size 36px
			color #333
		}
	}
	.tab-item{
		width 100%
		height 600px
	}
}
	.rank-info{
		display flex
		height 416px
		align-items center
		justify-content center
		flex-direction column
		background url("../../assets/images/bg_tbbj@2x.png") no-repeat
		background-size 100% 100%
		.ri-top{
			display flex
			align-items center
			justify-content space-around
			.ri-left, .ri-right{
				display flex
				flex-direction column
				color #fff
				span{
					font-size 72px
				}
				em{
					font-size 28px
				}
			}
			.ri-mid{
				width 182px
				height: 182px
				margin 0 113px
				img{
					width: 100%
					height: 100%
					border-radius 50%
				}
			}
		}
		.ri-bom{
			display flex
			flex-direction column
			align-items center
			justify-content center
			span{
				font-size 36px
				color: #fff
				margin-top: 20px
			}
			em{
				font-size 24px
				color: #fff
				margin-top: 10px
			}
		}
	}
</style>
