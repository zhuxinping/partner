<template>
	<div class='box'>
		<div v-if="!operation" class="tip" @click="seeActiveReport">班级周日均活跃比 B级(荣耀黄金)以上的班级有 <em>{{item.bAboveClassCount | numThousand}}</em> 个；还有 <em>{{item.bFollowClassCount |numThousand}}</em> 个班级活跃没有达到，<a style="text-decoration: underline;">点击查看班级详情</a>去<span>提升活<span style="white-space: nowrap">跃<img class="right" src="../../../assets/images/list-arrow.png" alt=""></span></span></div>
		<div class="explore-ct">
			<div class="explore" v-if="isButton">
				<span v-if="isButtonShow" @click="loadMore(len)">展开更多</span>
				<span v-if="isButtonCancel" @click="cancelMore(len)">收起</span>
			</div>
		</div>
		<div v-if="!operation" class="bar-data">
			<div id="main" :style="style"></div>
		</div>
		<dl v-if="operation" class="no-number">
			<dd></dd>
			<dt>暂无数据</dt>
		</dl>
	</div>
</template>
<script>
import { toDecimal2 } from '@/utils/common'
import { ReportApi } from '@/api/index'
import Vue from 'vue'
import VeBar from 'v-charts/lib/bar.common'
Vue.component(VeBar.name, VeBar)
let echarts = require('echarts/lib/echarts')
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/dataZoom')
require('echarts/lib/component/markArea')
require('echarts/lib/component/markLine')
Vue.prototype.$echarts = echarts
export default {
	name: 'weekBar',
	props: {
		schoolName: ''
	},
	data () {
		return {
			names: [],
			values: [],
			list: [],
			trend: [],
			operation: false,
			item: {},
			option: {},
			icon: {},
			len: 0,
			style: {
				width: '100%',
				height: '300px'
			},
			myChart: {},
			isButton: false,
			isButtonShow: true,
			isButtonCancel: false
		}
	},
	mounted () {
		this.getData()
	},
	methods: {
		echartsInit (names, values, average, trend, len) {
			let that = this
			this.icon = {
				'up': require('../../../assets/images/icon_up.png'),
				'down': require('../../../assets/images/icon_down.png'),
				'null': ''
			}
			average = average || 0
			that.option = {
				color: ['#3398DB'],
				grid: {
					top: '0%',
					left: '3%',
					right: '12%',
					bottom: '20px',
					containLabel: true
				},
				xAxis: [
					{
						type: 'value',
						axisLine: {show: false},
						axisTick: {show: false},
						axisLabel: {color: '#818D9D'},
						splitLine: {
							show: true,
							lineStyle: {
								color: '#eee',
								type: 'dashed'
							}
						},
						splitNumber: 6,
						minInterval: 0.5
					}
				],
				yAxis: [
					{
						type: 'category',
						data: names,
						axisTick: {
							show: false,
							alignWithLabel: true
						},
						axisLabel: {
							interval: 0,
							fontSize: 11,
							color: '#818D9D',
							padding: [2, 0, 0, 0]
						},
						axisLine: {
							lineStyle: {
								color: '#eee',
								type: 'dashed'
							}
						}
					}
				],
				dataZoom: [// 给x轴设置滚动条
					{
						startValue: len - 6,
						endValue: len - 1,
						type: 'slider',
						show: false,
						zoomLock: true
					},
					{
						type: 'inside',
						show: true,
						zoomLock: true,
						yAxisIndex: [0],
						startValue: len - 6, // 默认为1
						endValue: len - 1
					}
				],
				series: [
					{
						name: trend,
						type: 'bar',
						z: 6,
						barWidth: '15', // 横坐标轴的宽度
						data: values,
						markArea: {
							silent: true,
							itemStyle: {
								color: 'rgba(255,239,240,1)'
							},
							data: [[{
								xAxis: '0'
							}, {
								xAxis: average
							}]]
						},
						itemStyle: {
							normal: {
								color: function (params) {
									if (params.data < 0.5) {
										return new that.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
											offset: 0,
											color: '#FF758B' // 0% 处的颜色
										}, {
											offset: 1,
											color: '#FF91A1' // 100% 处的颜色
										}], false)
									} else {
										return new that.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
											offset: 0,
											color: '#50C5FF' // 0% 处的颜色
										}, {
											offset: 1,
											color: '#73D1FD' // 100% 处的颜色
										}], false)
									}
								},
								barBorderRadius: [0, 4, 4, 0]
							},
							emphasis: {
								barBorderRadius: 1
							}
						},
						markLine: {
							symbolSize: [0, 0],
							lineStyle: {
								normal: {
									type: 'dashed',
									color: '#FFB0B5'
								}
							}
						},
						barCategoryGap: '40%',
						label: {
							show: true,
							position: 'right',
							formatter (params) {
								let text = ''
								if (~~that.trend[params.dataIndex] === 1) {
									text = '{a|' + toDecimal2(params.data) + '}{up|}'
								} else if (~~that.trend[params.dataIndex] === 2) {
									text = '{a|' + toDecimal2(params.data) + '}{down|}'
								} else {
									text = '{a|' + toDecimal2(params.data) + '}{s|}'
								}
								return text
							},
							rich: {
								a: {
									color: '#818D9D',
									align: 'left',
									fontSize: 11,
									padding: [0, 3, 3, 0]
								},
								up: {
									height: 12,
									align: 'right',
									backgroundColor: {
										image: that.icon.up
									}
								},
								down: {
									height: 12,
									align: 'center',
									backgroundColor: {
										image: that.icon.down
									}
								},
								s: {
									height: 12,
									align: 'left',
									backgroundColor: {
										image: that.icon.null
									}
								}
							}
						}
					}
				]
			}
			this.myChart = this.$echarts.init(document.getElementById('main'))
			this.myChart.setOption(this.option)
		},
		seeActiveReport () {
			if (this.list.length !== 0) {
				this.$router.push({path: `/liveClassRoom/${this.schoolName}/${this.$route.meta.schoolId}`})
			}
		},
		getData () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			ReportApi.getSchoolAcive(params, res => {
				if (res.code === 10000) {
					this.item = res.body
					this.$emit('classCount', this.item.bAboveClassCount, this.item.trend)
					if (res.body.classActiveList.length !== 0) {
						this.list = res.body.classActiveList.reverse()
						this.len = res.body.classActiveList.length
						if (this.len > 7) {
							this.isButton = true
						}
						this.list.map((item, index) => {
							if (item.gradeName.length > 5) {
								item.gradeName = item.gradeName.substr(0, 4)
							}
							if (item.className.length > 5) {
								item.className = item.className.substr(0, 4)
							}
							this.names.push(item.gradeName + '\n' + item.className)
							this.values.push(item.weekActiveRatio)
							this.trend.push(item.weekActiveTrend)
						})
						this.echartsInit(this.names, this.values, 0.5, this.trend, this.len)
					} else {
						this.operation = true
					}
				}
			})
		},
		loadMore (len) {
			this.isButtonShow = false
			this.isButtonCancel = true
			this.$set(this.option.dataZoom[0], 'startValue', 0)
			this.$set(this.option.dataZoom[0], 'endValue', this.len)
			this.$set(this.option.dataZoom[1], 'startValue', 0)
			this.$set(this.option.dataZoom[1], 'endValue', this.len)
			this.$set(this.option.dataZoom[1], 'preventDefaultMouseMove', false)
			let ele = document.getElementById('main')
			ele.style.height = (len * 35) + 'px'
			ele.removeAttribute('_echarts_instance_')
			this.myChart = this.$echarts.init(ele)
			this.myChart.setOption(this.option)
		},
		cancelMore (len) {
			this.isButtonShow = true
			this.isButtonCancel = false
			this.$set(this.option.dataZoom[0], 'startValue', len - 6)
			this.$set(this.option.dataZoom[0], 'endValue', len - 1)
			this.$set(this.option.dataZoom[1], 'startValue', len - 6)
			this.$set(this.option.dataZoom[1], 'endValue', len - 1)
			this.$set(this.option.dataZoom[1], 'preventDefaultMouseMove', true)
			let ele = document.getElementById('main')
			ele.style.height = '300px'
			ele.removeAttribute('_echarts_instance_')
			this.myChart = this.$echarts.init(ele)
			this.myChart.setOption(this.option)
		}
	}
}
</script>
<style lang="stylus" scoped>
	.box
		position relative
		background #fff
		.tip
			/*position absolute
			top -24px
			z-index 9999*/
			background #fff
			font-family PingFangSC-Regular
			font-size 26px
			color #818D9D
			padding 20px 24px 20px
			text-align left
			em
				color: #ff5e68
				font-weight bold
			span
				color #05ACFF
				position relative
				img
					width 11px
					height 20px
					margin-left 12px
		.explore-ct
			position relative
		.explore
			margin-left 24px
			color #05acff
			text-align left
			span
				display block
				padding 5px 0
		.bar-data
			width 100%
			padding-top 40px
			position relative
			/*margin-top 120px*/
			background-color #fff
		.day-add
			height 40px
			background #fff
			line-height 40px
			font-size 28px
			display flex
			align-items center
			padding-left 20px
			span
				color 333
			i
				width 18px
				height 18px
				background url("../../../assets/images/icon_add.png") no-repeat center
				background-size 100% 100%
				display inline-block
				vertical-align baseline
			i.active
				width 18px
				height 3px
				background url("../../../assets/images/icon_reduce.png") no-repeat center
				background-size 100% 100%
				display inline-block
				vertical-align middle
			em
				color #00002C
		.no-number
			width 100%
			height 320px
			margin auto
			background-color #fff
			overflow hidden
			dd
				width 250px
				height 220px
				display inline-block
				background-size 100% 100%
				background-image url("../../../assets/images/icon_nodata.png")
			dt
				font-size 28px
				color:#818D9D
				margin-left -30px
				margin-top 10px
</style>
