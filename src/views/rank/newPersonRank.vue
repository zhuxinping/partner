<template>
	<div class="container">
		<div class="flex">
			<MHeader @backClick="goBack" headerTitle="个人榜单"></MHeader>
		</div>
		<div v-if="showData">
			<div class="rank-info">
				<div class="ri-top">
					<div class="ri-left">
						<span>{{teacherInfo.teacherInfo.weekRankingIndex}}</span>
						<em>本周名次</em>
					</div>
					<div class="ri-mid">
						<img :src="teacherInfo.teacherInfo.userAvatar" alt="">
					</div>
					<div class="ri-right">
						<span>{{teacherInfo.teacherInfo.monthRankingIndex}}</span>
						<em>本月名次</em>
					</div>
				</div>
				<div class="ri-bom">
					<span>{{teacherInfo.teacherInfo.userName}}</span>
					<em v-html="rankDoc"></em>
				</div>
			</div>
			<div class="tab-box">
				<div class="tab-hd">
					<div class="tab-title">
						<a v-for="(item,index) in tabList" :key="index" href="javascript:;" :class="current==index?'line':''" @click="ChangeTab(index)">{{item}}</a>
					</div>
					<span class="score">
						<i>爱心值:{{teacherInfo.teacherInfo.levelInfo.loveTotal}}</i>
						<i>发布天数:{{current ? teacherInfo.teacherInfo.weekGrowthCount : teacherInfo.teacherInfo.monthGrowthCount}}</i>
						<i>收获点赞:{{current ? teacherInfo.teacherInfo.weekLikeCount : teacherInfo.teacherInfo.monthLikeCount}}</i>
					</span>
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
import { setStore } from '@/utils/common'
import NoData from '@/components/no-data'
import moment from 'moment'
export default {
	name: 'newPersonRank',
	components: {
		MHeader,
		echartRankLine,
		NoData
	},
	data () {
		return {
			current: 0,
			userId: null,
			id: '',
			infoInform: setStore('infoInform'),
			flagData: false,
			showData: false,
			schoolId: '',
			teacherId: '',
			avtar: require('../../assets/images/teacher.png'),
			tabList: ['周榜', '月榜'],
			list: [],
			teacherInfo: {},
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
		to.meta.index = to.params.index
		to.meta.userId = to.params.userId
		to.meta.id = to.params.id
		next()
	},
	mounted () {
		this.current = ~~this.$route.meta.index
		this.userId = this.$route.meta.userId
		this.id = this.$route.meta.id
		this.newPersonRank()
		this.newTeacherHistoryList()
	},
	computed: {
		rankDoc () {
			if (this.teacherInfo.teacherInfo.championsWeekCount === 0 && this.teacherInfo.teacherInfo.championsMonthCount === 0) {
				return '距离冠军还有段距离，加油哦'
			} else if (this.teacherInfo.teacherInfo.championsMonthCount !== 0 && this.teacherInfo.teacherInfo.championsWeekCount !== 0) {
				return `本学年已获得<em style="color:#ffec00;">${this.teacherInfo.teacherInfo.championsWeekCount}</em>个周冠军，<em style="color:#ffec00;">${this.teacherInfo.teacherInfo.championsMonthCount}</em>个月冠军`
			} else if (this.teacherInfo.teacherInfo.championsMonthCount !== 0) {
				return `本学年已获得<em style="color:#ffec00;">${this.teacherInfo.teacherInfo.championsMonthCount}</em>个月冠军`
			} else {
				return `本学年已获得<em style="color:#ffec00;">${this.teacherInfo.teacherInfo.championsWeekCount}</em>个周冠军`
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
			this.newTeacherHistoryList()
		},
		changeEarch () {
			if (this.current === 0) {
				let weekRanks = this.list.rankingList.reverse()
				weekRanks.forEach((item, index) => {
					item.rankingIndex = item.rankingIndex ? item.rankingIndex : ''
					item.loveTotal = item.loveTotal ? item.loveTotal : ''
				})
				weekRanks.map((item, index) => {
					if (index !== weekRanks.length - 1) {
						this.xWeekData.push(moment(item.endDate).format('MM-DD'))
					} else {
						this.xWeekData.push('本周')
					}
					this.weekRank.push(item.rankingIndex)
					this.sWeekData.push(item.loveTotal)
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
					this.currentIndex = '-1'
				})
				this.xWeekData = []
				this.weekRank = []
			} else {
				let monthRanks = this.list.rankingList.reverse()
				// let len = monthRanks.length - 1
				monthRanks.forEach((item, index) => {
					item.rankingIndex = item.rankingIndex ? item.rankingIndex : ''
					item.loveTotal = item.loveTotal ? item.loveTotal : ''
				})
				monthRanks.map((item, index) => {
					if (index !== monthRanks.length - 1) {
						this.xMonthData.push(moment(item.endDate).format('M') + '月')
					} else {
						this.xMonthData.push('本月')
					}
					this.monthRank.push(item.rankingIndex)
					this.sMonthData.push(item.loveTotal)
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
		// 按学校维度的请求个人榜单数据
		newTeacherHistoryList () {
			let params = {}
			params.teacherId = this.userId
			params.roleType = 5
			params.schoolId = this.id
			params.termType = this.current + 1
			params.page = 0
			params.pageSize = 100
			ReportApi.newTeacherHistoryList(params, res => {
				if (res.code === 10000) {
					this.list = res.body
					this.changeEarch()
					this.showData = true
				} else {
					this.flagData = true
					this.showData = false
				}
			})
		},
		// 班级排行榜
		newPersonRank () {
			let params = {}
			params.schoolId = this.id
			params.teacherId = this.userId
			ReportApi.newPersonRank(params, res => {
				if (res.code === 10000) {
					this.teacherInfo = res.body
					this.showData = true
				} else {
					this.flagData = true
					this.showData = false
				}
			})
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
				flex 1
				font-size 24px
				color #999
				display flex
				justify-content space-around
				i{
					font-style normal
				}
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
				margin-top 20px
				max-width 600px
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			em{
				font-size 24px
				color: #fff
				margin-top: 10px
			}
		}
	}
</style>
