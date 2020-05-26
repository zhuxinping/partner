<template>
	<div>
		<div class="spr-title">
			<span class="spr-left"><em>订单动态</em></span>
		</div>
		<div class="day-add">
			<span>{{firstMonth}}月订单金额比{{secondMonth}}月</span>
			<i :class="targetNum>0?'icon-add':'icon-reduce'"></i>
			<em>{{targetNum | numAbs | numFilter | numThousand}}</em>
			<span>元</span>
		</div>
		<div class="bar-data">
			<ve-bar class="order" :data="chartData1" :extend="option"  :judge-width="true" style="background: #fff;"  :grid="grid" :colors="colors1" :width="width" :height="height" :settings="chartSettings1"></ve-bar>
			<ve-bar class="order" :data="chartData" :extend="chartExtend"  :judge-width="true" style="background:none"  :grid="grid" :colors="colors" :width="width" :height="height" :settings="chartSettings"></ve-bar>
		</div>
	</div>
</template>
<script>
import { toast, toDecimal2, toThousand } from '@/utils/common'
import { ReportApi } from '@/api/index'
import Vue from 'vue'
import 'echarts/lib/component/title'
import VeBar from 'v-charts/lib/bar.common'
Vue.component(VeBar.name, VeBar)
export default {
	name: 'orderBar',
	components: {
	},
	data () {
		this.chartSettings = {
			xAxisType: ['KMB'],
			stack: {
				'xxx': ['视频产品', '签到产品', '优惠券']
			}
		}
		this.chartSettings1 = {
			xAxisType: ['KMB'],
			metrics: ['订单金额'],
			dimension: ['日期']
		}
		this.grid = {
			left: 10,
			right: '15%',
			top: 15,
			containLabel: true,
			x: '15%',
			y: '15%'
		}
		this.width = '100%'
		this.height = '100%'
		this.colors1 = ['#fff']
		this.colors = ['#FBB534', '#7ED321', '#00AAFF']
		this.option = {
			tooltip: {
				show: false
			},
			legend: {
				bottom: 36,
				left: 80,
				itemWidth: 12,
				itemHeight: 12,
				data: []
			},
			xAxis: {
				axisLine: {
					show: true,
					lineStyle: {
						color: '#fff',
						width: 1,
						type: 'solid'
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#fff',
						width: 1,
						type: 'dotted'
					}
				},
				axisLabel: {
					show: true,
					textStyle: {
						fontSize: 10,
						color: '#bbbbbd'
					},
					formatter: function (p) {
						if (p >= 1000) {
							p = p / 1000 + 'k'
						}
						return p
					}
				}
			},
			yAxis: {
				axisLine: {
					show: false
				},
				splitLine: {
					show: false
				},
				axisLabel: {
					show: true,
					textStyle: {
						color: '#BBBBBD',
						fontSize: '10',
						textAlign: 'center',
						fontFamily: 'Avenir'
					}
				}
			},
			series: {
				barCategoryGap: '40%',
				label: {
					show: true,
					position: 'right',
					textStyle: {
						color: '#818D9D'
					},
					formatter: function (p) {
						return toThousand(toDecimal2(p.data))
					}
				}
			}
		}
		this.chartExtend = {
			tooltip: {
				textStyle: {
					align: 'left'
				},
				formatter: function (params) {
					let str = ''
					let data, marker
					params.forEach(item => {
						data = item.seriesName + toThousand(toDecimal2(item.value))
						marker = item.marker
						str = str + marker + data + '</br>'
					})
					return str
				},
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'line', // 默认为直线，可选为：'line' | 'shadow'
					lineStyle: { // 直线指示器样式设置
						color: 'rgba(255,255,255,0)'
					}
				},
				confine: true
			},
			title: {
				left: 20,
				bottom: 23,
				text: '',
				textStyle: {
					fontSize: 10,
					color: '#BBBBBD'
				}
			},
			legend: {
				bottom: 36,
				left: 80,
				itemWidth: 12,
				itemHeight: 12,
				selectedMode: false,
				data: [
					{
						name: '视频产品',
						textStyle: {
							fontSize: 10,
							color: '#bbbbbd'
						},
						icon: 'roundRect'
					},
					{
						name: '签到产品',
						textStyle: {
							fontSize: 10,
							color: '#bbbbbd'
						},
						icon: 'roundRect'
					},
					{
						name: '优惠券',
						textStyle: {
							fontSize: 10,
							color: '#bbbbbd'
						},
						icon: 'roundRect'
					}
				]
			},
			xAxis: {
				axisLine: {
					show: true,
					lineStyle: {
						color: '#eee',
						width: 1,
						type: 'solid'
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#eee',
						width: 1,
						type: 'dotted'
					}
				},
				axisLabel: {
					show: true,
					textStyle: {
						fontSize: 10,
						color: '#bbbbbd'
					},
					formatter: function (p) {
						if (p >= 1000) {
							p = p / 1000 + 'k'
						}
						return p
					}
				}
			},
			yAxis: {
				axisLine: {
					show: false
				},
				splitLine: {
					show: false
				},
				axisLabel: {
					show: true,
					textStyle: {
						color: '#BBBBBD',
						fontSize: '10',
						textAlign: 'center',
						fontFamily: 'Avenir'
					}
				}
			},
			series: {
				barCategoryGap: '40%',
				label: {
					show: true,
					position: 'right',
					textStyle: {
						color: 'rgba(255,255,255,0)'
					},
					formatter: function (p) {
						return toThousand(toDecimal2(p.data))
					}
				}
			}
		}
		return {
			chartData: {
				columns: ['日期', '视频产品', '签到产品', '优惠券'],
				rows: []
			},
			chartData1: {
				rows: []
			},
			detailList: [],
			// list: [],
			targetNum: '',
			secondMonth: '',
			firstMonth: ''

		}
	},
	created () {
		this.getData()
	},
	mounted () {
	},
	methods: {
		getData () {
			let params = {}
			// params.schoolId = 123
			params.schoolId = this.$route.meta.schoolId
			ReportApi.getMonthOrder(params, res => {
				if (res.code === 10000) {
					this.detailList = res.body.schoolMonthPayList
					this.targetNum = res.body.limitDiff
					this.firstMonth = res.body.firstMonth
					this.secondMonth = res.body.secondMonth
					this.detailList.forEach((item, i) => {
						if (item.dateMonth) {
							let time = item.dateMonth.split('-')
							item.dateMonth = ~~time[1]
						}
						let object = {
							'日期': item.dateMonth + '月',
							'视频产品': toDecimal2(item.videoOrderLimit),
							'签到产品': toDecimal2(item.signOrderLimit),
							'优惠券': toDecimal2(item.couponsLimit)
						}
						let aa = item.videoOrderLimit + item.signOrderLimit + item.couponsLimit
						if (aa >= 1) {
							this.grid = {
								left: 10,
								top: 15,
								containLabel: true,
								x: '15%',
								y: '15%',
								right: '20%'
							}
						}
						let object1 = {
							'日期': item.dateMonth + '月',
							'订单金额': toDecimal2(aa)
						}
						this.$set(this.chartData1.rows, i, object1)
						this.$set(this.chartData.rows, i, object)
					})
				} else {
					toast(res.message)
				}
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
	.bar-data
		position relative
		width 100%
		height 438px
	.day-add
		height 40px
		background #fff
		line-height 40px
		font-size 28px
		display flex
		align-items center
		padding-left 20px
		span
			color #333
		em
			color: #05ACFF
</style>
<style>
	.order{
		position: absolute !important
	}
</style>
