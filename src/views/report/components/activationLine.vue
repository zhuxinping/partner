<template>
	<div class="order-trend">
		<div class="spr-title">
			<span class="spr-left"><em>{{textTitle}}</em></span>
			<ul class="tab">
				<li v-for="(item, index) in tabs" :key="index"  @click="ChangeTab(index)" :class="current == index?'active':''">{{item}}</li>
			</ul>
		</div>
		<div class="tab-db">
			<div class="chart-line" v-if="current == 1">
				<ve-line :data="chartData" :judge-width="true" style="background: #fff;" :grid="grid" :width="width" :height="height" :extend="chartExtend" :settings="chartSettings1" ></ve-line>
			</div>
			<div class="chart-line" v-if="current == 0">
				<ve-line :data="chartData" :judge-width="true" style="background: #fff;" :grid="grid" :width="width" :height="height" :extend="chartExtend" :settings="chartSettings" ></ve-line>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import 'echarts/lib/component/title'
import VeLine from 'v-charts/lib/line.common'
Vue.component(VeLine.name, VeLine)
export default {
	name: 'activationLine',
	props: {
		current: {
			type: Number,
			default: 0
		},
		listDate: {
			type: Object
		},
		textTitle: ''
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
			tabs: ['激活数', '激活率'],
			chartData: {
				columns: ['日期', '在读激活学生数', '在读激活学生家长数', '在职激活园丁数'],
				rows: []
			},
			chartSettings: {
				metrics: ['在读激活学生数', '在读激活学生家长数', '在职激活园丁数'],
				dimension: ['日期']
			},
			chartSettings1: {
				metrics: ['在读激活学生率', '在读激活学生家长率', '在职激活园丁率'],
				dimension: ['日期'],
				yAxisType: ['percent']
			},
			chartExtend: {
				series: {
					symbol: 'circle'
				},
				color: ['#F5A623 ', '#00AAFF ', '#7ED321'],
				title: {
					left: '3%',
					bottom: 23,
					text: '单位/人',
					textStyle: {
						fontSize: 10,
						color: '#BBBBBD'
					}
				},
				tooltip: {
					textStyle: {
						align: 'left'
					}
				},
				legend: {
					bottom: 23,
					right: '2%',
					itemWidth: 12,
					itemHeight: 12,
					itemGap: 8,
					tooltip: {
						show: true
					},
					data: [
						{
							name: '在读激活学生数',
							textStyle: {
								fontSize: 10,
								color: '#818d9d'
							},
							icon: 'roundRect'
						},
						{
							name: '在读激活学生家长数',
							textStyle: {
								fontSize: 10,
								color: '#818d9d'
							},
							icon: 'roundRect'
						},
						{
							name: '在职激活园丁数',
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
							fontSize: '12'
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
					minInterval: 1,
					axisTick: {
						show: false
					},
					axisLabel: {
						show: true,
						textStyle: {
							color: '#BBBBBD',
							fontSize: '12'
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
		this.setClass()
		this.ChangeTab(this.current)
	},
	methods: {
		setClass () {
			if (document.body.scrollWidth <= 320) {
				this.chartExtend = {
					series: {
						type: 'line',
						symbol: 'circle'
					},
					color: ['#F5A623 ', '#00AAFF ', '#7ED321'],
					title: {
						left: '8%',
						bottom: 40,
						text: '单位/人',
						textStyle: {
							fontSize: 9,
							color: '#BBBBBD'
						}
					},
					tooltip: {
						textStyle: {
							align: 'left'
						}
					},
					legend: {
						bottom: 20,
						right: '3%',
						itemWidth: 12,
						itemHeight: 12,
						itemGap: 8,
						tooltip: {
							show: true
						},
						data: [
							{
								name: '在读激活学生数',
								textStyle: {
									fontSize: 9,
									color: '#818d9d'
								},
								icon: 'roundRect'
							},
							{
								name: '在读激活学生家长数',
								textStyle: {
									fontSize: 9,
									color: '#818d9d'
								},
								icon: 'roundRect'
							},
							{
								name: '在职激活园丁数',
								textStyle: {
									fontSize: 9,
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
								fontSize: '12'
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
						minInterval: 1,
						axisTick: {
							show: false
						},
						axisLabel: {
							show: true,
							textStyle: {
								color: '#BBBBBD',
								fontSize: '12'
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
		ChangeTab (index) {
			this.getData(index)
			if (index === 1) {
				this.chartExtend.title.text = '单位/%'
				this.chartData.columns = ['日期', '在读激活学生率', '在读激活学生家长率', '在职激活园丁率']
				this.chartSettings.metrics = ['在读激活学生率', '在读激活学生家长率', '在职激活园丁率']
				this.chartExtend.legend.data = [
					{
						name: '在读激活学生率',
						textStyle: {
							fontSize: 10,
							color: '#818d9d'
						},
						icon: 'roundRect'
					},
					{
						name: '在读激活学生家长率',
						textStyle: {
							fontSize: 10,
							color: '#818d9d'
						},
						icon: 'roundRect'
					},
					{
						name: '在职激活园丁率',
						textStyle: {
							fontSize: 10,
							color: '#818d9d'
						},
						icon: 'roundRect'
					}
				]
			} else {
				this.chartExtend.title.text = '单位/人'
				this.chartSettings.metrics = ['在读激活学生数', '在读激活学生家长数', '在职激活园丁数']
				this.chartExtend.legend.data = [
					{
						name: '在读激活学生数',
						textStyle: {
							fontSize: 10,
							color: '#818d9d'
						},
						icon: 'roundRect'
					},
					{
						name: '在读激活学生家长数',
						textStyle: {
							fontSize: 10,
							color: '#818d9d'
						},
						icon: 'roundRect'
					},
					{
						name: '在职激活园丁数',
						textStyle: {
							fontSize: 10,
							color: '#818d9d'
						},
						icon: 'roundRect'
					}
				]
			}
			this.$emit('changeCurrent', index)
		},
		getData (index) {
			if (this.listDate.list) {
				this.listDate.list.forEach((item, i) => {
					let object
					if (index === 1) {
						object = {
							'日期': item.day + '日',
							'在读激活学生率': parseFloat(item.onReadActivationStudentRatioStr) / 100,
							'在读激活学生家长率': parseFloat(item.onReadActivationParentsRatioStr) / 100,
							'在职激活园丁率': parseFloat(item.onReadActivationTeacherRatioStr) / 100
						}
					} else {
						object = {
							'日期': item.day + '日',
							'在读激活学生数': item.onReadActiveBabys,
							'在读激活学生家长数': item.onReadActiveParents,
							'在职激活园丁数': item.onReadActiveTeachers
						}
					}
					this.$set(this.chartData.rows, i, object)
				})
			}
		}
	}
}
</script>
