<template>
	<div class='box'>
		<ratioBar :ratio = 'activationRatio.ratio' :targetValue="activationRatio.targetValue"></ratioBar>
		<div class="tip">当前学校学生平均有<em>{{average | numFilter}}</em>个家长关注，全市最高<em>{{citytop?citytop : '-'}}</em>，还有<em>{{classNum | numThousand}}</em>个班级没有达到，快提醒老师邀请家长关注</div>
		<div v-if="!operation" @click="seeActiveReport" class="bar-data">
			<div id="main" style="width: 100%;height: 100%;"></div>
		</div>
		<dl v-if="operation" class="no-number">
			<dd></dd>
			<dt>暂无数据</dt>
		</dl>
	</div>
</template>
<script>
import { tongji, ceilMax, toDecimal2 } from '@/utils/common'
import { ReportApi } from '@/api/index'
import ratioBar from '@/components/ratioBar'
import Vue from 'vue'
let echarts = require('echarts/lib/echarts')
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/dataZoom')
require('echarts/lib/component/markArea')
require('echarts/lib/component/markLine')
Vue.prototype.$echarts = echarts
export default {
	name: 'classBar',
	props: {
		schoolName: '',
		activationRatio: {
			ratio: '',
			targetValue: ''
		}
	},
	components: {
		ratioBar
	},
	data () {
		return {
			names: [],
			values: [],
			type: [],
			list: [],
			average: 0,
			citytop: 0,
			classNum: 0,
			operation: false
		}
	},
	created () {
	},
	mounted () {
		this.getData()
	},
	methods: {
		echartsInit (names, values, average, citytop, type) {
			let that = this
			average = average || 0
			var maxN = Math.max.apply(null, values)
			maxN = ceilMax(Math.max(maxN, citytop))
			var option = {
				color: ['#3398DB'],
				grid: {
					left: '3%',
					right: '17%',
					bottom: '7%',
					containLabel: true
				},
				xAxis: [
					{
						type: 'category',
						data: names,
						axisTick: {
							show: false,
							alignWithLabel: true
						},
						axisLabel: {
							interval: 0,
							fontSize: 10,
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
				yAxis: [
					{
						type: 'value',
						axisLine: {show: false},
						axisTick: {show: false},
						axisLabel: {color: '#818D9D'},
						max: maxN,
						splitLine: {
							show: true,
							lineStyle: {
								color: '#eee',
								type: 'dashed'
							}
						},
						splitNumber: 5,
						maxInterval: Number((maxN / 5).toFixed(1))
					}
				],
				dataZoom: [// 给x轴设置滚动条
					{
						startValue: 0,
						endValue: 4,
						type: 'slider',
						show: false,
						zoomLock: true
					},
					{
						type: 'inside',
						show: true,
						zoomLock: true,
						xAxisIndex: [0],
						startValue: 0, // 默认为1
						endValue: 4,
						preventDefaultMouseMove: false
					}
				],
				series: [
					{
						name: '直接访问',
						type: 'bar',
						z: 10,
						barWidth: '20', // 横坐标轴的宽度
						data: values,
						markArea: {
							silent: true,
							itemStyle: {
								color: 'rgba(255,239,240,1)'
							},
							data: [[{
								yAxis: '0'
							}, {
								yAxis: average
							}]]
						},
						itemStyle: {
							normal: {
								color: function (params) {
									// console.log(params)
									// let colorList = ['#FF758B', '#FF91A1', '#FF8F53', '#FFB994', '#73D1FD', '#50C5FF']
									if (type[params.dataIndex] === 0) {
										return new that.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
											offset: 0,
											color: '#FF758B' // 0% 处的颜色
										}, {
											offset: 1,
											color: '#FF91A1' // 100% 处的颜色
										}], false)
									} else if (type[params.dataIndex] === 1) {
										return new that.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
											offset: 0,
											color: '#FF8F53' // 0% 处的颜色
										}, {
											offset: 1,
											color: '#FFB994' // 100% 处的颜色
										}], false)
									} else if (type[params.dataIndex] === 2) {
										return new that.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
											offset: 0,
											color: '#50C5FF' // 0% 处的颜色
										}, {
											offset: 1,
											color: '#73D1FD' // 100% 处的颜色
										}], false)
									} else if (type[params.dataIndex] === 3) {
										return new that.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
											offset: 0,
											color: '#C7DD29' // 0% 处的颜色
										}, {
											offset: 1,
											color: '#D3E45F' // 100% 处的颜色
										}], false)
									}
								},
								barBorderRadius: [4, 4, 0, 0]
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
							},
							data: [
								{
									name: '平均线', // 支持 'average', 'min', 'max'
									yAxis: citytop, // citytop
									label: {
										position: 'end',
										color: '#00AAFF',
										formatter: function () {
											return '全市最高'
										}
									}
								},
								{
									name: '987987',
									label: {
										position: 'end',
										color: '#818D9D',
										formatter: function () {
											if (citytop - average < 1) {
												return '\n\n\n当前'
											}
											return '当前'
										}
									},
									yAxis: average
								}
							]
						}
					}
				]
			}
			let myChart = this.$echarts.init(document.getElementById('main'))
			myChart.setOption(option)
		},
		seeActiveReport () {
			if (this.list.length !== 0) {
				tongji('09_02_linkto_activation_ratio_class', '1')
				this.$router.push({path: `/reportActiveClassRoom/${this.schoolName}/${this.$route.meta.schoolId}/${this.activationRatio.ratio}`})
			}
		},
		getData () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			ReportApi.getSchoolActive(params, res => {
				if (res.code === 10000) {
					this.citytop = res.body.topValue ? toDecimal2(res.body.topValue) : 0
					this.average = res.body.dataValue
					this.classNum = res.body.difference
					if (res.body.list.length !== 0) {
						this.list = res.body.list
						this.list.map((item, index) => {
							if (item.gradeName.length > 5) {
								item.gradeName = item.gradeName.substr(0, 4)
							}
							if (item.className.length > 5) {
								item.className = item.className.substr(0, 4)
							}
							this.names.push(item.gradeName + '\n' + item.className)
							this.values.push(item.dataValue)
							this.type.push(item.type)
						})
						this.echartsInit(this.names, this.values, this.average, this.citytop, this.type)
					} else {
						this.operation = true
						this.$emit('change')
					}
				}
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
	.box
		position relative
		.tip
			position absolute
			top: 200px;
			background: #fff
			font-family: PingFangSC-Regular;
			font-size: 26px;
			color: #818D9D;
			padding: 20px
			text-align:left
			em
				color: #ff5e68
		.bar-data
			width: 100%
			padding-top 40px
			height: 9rem
			background-color #fff
		.day-add
			height: 40px
			background #fff
			line-height: 40px
			font-size 28px
			display flex
			align-items center
			padding-left: 20px
			span
				color: 333
			i
				width: 18px
				height: 18px
				background url("../../../assets/images/icon_add.png") no-repeat center
				background-size 100% 100%
				display inline-block
				vertical-align baseline
			i.active
				width: 18px
				height: 3px
				background url("../../../assets/images/icon_reduce.png") no-repeat center
				background-size 100% 100%
				display inline-block
				vertical-align middle
			em
				color: #05ACFF;
		.no-number
			width 100%
			height 470px
			margin auto
			background-color #fff
			overflow hidden
			dd
				width 250px
				height 220px
				margin-top 150px
				display inline-block
				background-size 100% 100%
				background-image url("../../../assets/images/icon_nodata.png")
			dt
				font-size 28px
				color:#818D9D
				margin-left -30px
				margin-top 10px
				/*white-space nowrap*/
</style>
