<template>
	<div :id="id" :style="style"></div>
</template>
<script>
import Vue from 'vue'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')

// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/dataZoom')
require('echarts/lib/component/markArea')
require('echarts/lib/component/markLine')
Vue.prototype.$echarts = echarts
// import OrderDayActive from './components/OrderDayActive'
// import { ReportApi } from '@/api/index'
// import { getStore1, tongji } from '../../assets/js/mUtils'
export default {
	name: 'echartRankLine',
	components: {
	},
	data () {
		return {
			chart: {} // echarts实例
		}
	},
	props: {
		// 父组件需要传递的参数
		id: {
			type: String
		},
		width: {
			type: String,
			default: '100%'
		},
		height: {
			type: String,
			default: '600px'
		},
		currentIndex: {
			type: String,
			default: '-1'
		}, // 记录点击的索引点
		scoreList: {
			type: Array
		},
		option: {
			type: Object,
			default () {
				return {
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
						// adding: 10, // [5, 10, 15, 20]
						// formatter: function (params, index, callback) {
						// 	// console.log(params);
						// 	let rankNum = (params[0].data)
						// 	if (rankNum) {
						// 		console.log(this.scoreList[params[0].dataIndex])
						// 	}
						// }

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
						symbol: 'image://../../../assets/images/dot@2x.png', // 设定为实心点
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
		}
	},
	created () {

	},
	computed: {
		style () {
			return {
				height: this.height,
				width: this.width
			}
		}
	},
	mounted () {
		this.init()
		this.setLight()
	},
	watch: {
		// 观察option的变化
		option: {
			handler (newVal, oldVal) {
				if (this.chart) {
					this.chart.clear()
					if (newVal) {
						this.chart.setOption(newVal)
					} else {
						this.chart.setOption(oldVal)
					}
				} else {
					this.init()
				}
			},
			deep: true // 对象内部属性的监听，关键。
		}
	},
	methods: {
		// 初始化图表
		init () {
			this.chart = this.$echarts.init(document.getElementById(this.id))
			this.chart.setOption(this.option)
			window.addEventListener('resize', this.chart.resize)
		},
		setLight () {
			// 高亮事件
			if (this.currentIndex >= 0) {
				return
			}
			// 派发默认的高亮点事件
			this.chart.dispatchAction({
				type: 'highlight',
				seriesIndex: 0,
				dataIndex: this.option.series[0].data.length - 1
			})
			this.$emit('changeIndex', this.option.series[0].data.length - 1)
			this.chart.on('mouseover', (params) => {
				if (params.dataIndex === this.currentIndex) {
					return
				}
				this.chart.dispatchAction({
					type: 'downplay',
					seriesIndex: params.seriesIndex,
					dataIndex: params.dataIndex
				})
			})
			this.chart.getZr().on('click', (params) => {
				this.chart.dispatchAction({
					type: 'downplay',
					seriesIndex: params.seriesIndex
				})
				let xIndex = this.chart.convertFromPixel({
					seriesIndex: 0
				}, [params.offsetX, params.offsetY])[0]
				this.chart.dispatchAction({
					type: 'highlight',
					seriesIndex: params.seriesIndex,
					dataIndex: xIndex
				})
				this.$emit('changeIndex', xIndex)
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
	html, body
		width: 100%
		height: 100%
		.container
			padding-top: 92px
			width: 100%
			height: 100%
			position: relative
			left: 0
			top: 0
			background #f2f3f5
	.tab-box{
		margin-top: 20px
		background #fff;
		.tab-hd{
			padding 0 30px
			display flex
			justify-content space-between
			a{
				height: 88px
				line-height: 88px
				font-size 36px
				color: #333;
				padding 0 15px
			}
			a.now{
				color: #74A9FF;
			}
			a:nth-child(1){
				position: relative
			}
			a:nth-child(1):after{
				position: absolute
				content: '/'
				color:#333
				right: 0
			}
			span{
				height: 88px
				line-height: 88px
				font-size 36px
				color: #333;
			}
		}
	}
</style>
