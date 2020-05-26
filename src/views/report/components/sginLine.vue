<template>
	<div class="active">
		<div class="spr-title">
			<span class="spr-left"><em>近5周学生签到趋势</em></span>
		</div>
		<div class="tab-db">
			<div class="chart-line">
				<ve-line :data="chartData" :judge-width="true" style="background: #fff;" :grid="grid" :width="width" :height="height" :extend="chartExtend" :settings="chartSettings" ></ve-line>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { toDecimal2 } from '@/utils/common'
import 'echarts/lib/component/title'
import VeLine from 'v-charts/lib/line.common'
Vue.component(VeLine.name, VeLine)
export default {
	name: 'activeLine',
	props: {
		listDate: {}
	},
	data () {
		this.grid = {
			left: 20,
			right: 20,
			top: 20
		}
		this.width = '100%'
		this.height = '100%'
		return {
			chartData: {
				columns: ['日期', '学生签到率', '人脸签到率', '家长签到查看率'],
				rows: []
			},
			chartSettings: {
				metrics: ['学生签到率', '人脸签到率', '家长签到查看率'],
				dimension: ['日期'],
				yAxisType: ['percent']
			},
			chartExtend: {
				color: ['#7ED321 ', '#00AAFF ', '#F5A623'],
				title: {
					left: '5%',
					bottom: 23,
					text: '单位/%',
					textStyle: {
						fontSize: 10,
						color: '#BBBBBD'
					}
				},
				tooltip: {
					textStyle: {
						align: 'left'
					},
					formatter: function (params) {
						let str1 = ''
						let str = ''
						let data, marker
						params.forEach(item => {
							str1 = item.name.replace(/\n/g, '')
							data = item.seriesName + ':' + toDecimal2(item.value[1] * 100) + '%'
							marker = item.marker
							str = str + marker + data + '</br>'
						})
						str = str1 + '</br>' + str
						return str
					}
				},
				legend: {
					bottom: 23,
					right: '5%',
					itemWidth: 12,
					itemHeight: 12,
					itemGap: 8,
					tooltip: {
						show: true
					},
					data: [
						{
							name: '学生签到率',
							textStyle: {
								fontSize: 10,
								color: '#818d9d'
							},
							icon: 'roundRect'
						},
						{
							name: '人脸签到率',
							textStyle: {
								fontSize: 10,
								color: '#818d9d'
							},
							icon: 'roundRect'
						},
						{
							name: '家长签到查看率',
							textStyle: {
								fontSize: 10,
								color: '#818d9d'
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
					axisTick: {
						show: false
					},
					axisLabel: {
						show: true,
						textStyle: {
							color: '#BBBBBD',
							fontSize: '12',
							textAlign: 'left'
						}
					},
					splitLine: {
						show: true,
						lineStyle: {
							width: 1,
							type: 'dashed',
							color: ['#eee']
						}
					}
				},
				yAxis: {
					axisLine: {
						show: true,
						lineStyle: {
							color: '#eee',
							width: 1,
							type: 'solid'
						}
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						show: true,
						textStyle: {
							color: '#BBBBBD',
							fontSize: '12'
						},
						formatter: function (p) {
							return toDecimal2(p * 100) + '%'
						}
					},
					splitLine: { // grid 分割线设置
						show: true,
						lineStyle: {
							width: 1,
							type: 'solid',
							color: ['#eeeeee']
						}
					}
				}
			}
		}
	},
	mounted () {
		this.listDate.weekDatas.signRate.forEach((item, i) => {
			let object = {
				'日期': item.week.substr(0, 6) + '\n' + item.week.substr(6, 11),
				'学生签到率': parseFloat(item.value) / 100,
				'人脸签到率': parseFloat(this.listDate.weekDatas.recognitionRate[i].value) / 100,
				'家长签到查看率': parseFloat(this.listDate.weekDatas.viewRate[i].value) / 100
			}
			this.$set(this.chartData.rows, i, object)
		})
	}
}
</script>
