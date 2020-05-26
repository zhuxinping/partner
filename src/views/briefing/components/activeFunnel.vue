<template>
	<div :id="id" :style="style"></div>
</template>
<script>
import	{ toThousand } from '../../../utils/common'
import Vue from 'vue'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/chart/funnel')

// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/legendScroll')
Vue.prototype.$echarts = echarts
export default {
	name: 'activeFunnel',
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
			default: '100%'
		},
		Title: {
			type: String
		},
		funnelData: {
			type: Array
		},
		funnelDataLabel: {
			type: Array
		},
		studentActivationRatioView: {
			type: String
		},
		studentActiveRatioView: {
			type: String
		},
		teacherActivationRatioView: {
			type: String
		},
		teacherActiveRatioView: {
			type: String
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
					backgroundColor: '#fff',
					color: ['#30abdf', '#0ec3a9', '#fbb534'],
					title: {
						left: 'center',
						top: 20,
						backgroundColor: '#fff',
						text: '',
						textStyle: {
							color: '#333',
							fontSize: 15
						}
					},
					tooltip: {
						trigger: 'item',
						show: true,
						textStyle: {
							fontSize: 14
						},
						confine: true
					},

					calculable: true,
					series: [
						{
							name: '漏斗图',
							type: 'funnel',
							left: 10,
							top: 60,
							width: '60%',
							min: 0,
							max: 100,
							minSize: '5%',
							maxSize: '100%',
							sort: 'descending',
							gap: 2,
							label: {
								normal: {
									position: 'right',
									verticalAlignment: true,
									textStyle: {
										fontSize: 14
									}
								}
							},
							labelLine: {
								normal: {
									length: 30,
									lineStyle: {
										width: 1,
										type: 'solid'
									}
								}
							},
							itemStyle: {
								normal: {
									borderColor: '#fff',
									borderWidth: 1
								}
							},
							data: []
						}
					]
				}
			}
		}
	},
	mounted () {
		this.init()
	},
	computed: {
		style () {
			return {
				height: this.height,
				width: this.width
			}
		}
	},
	methods: {
		// 初始化图表
		init () {
			let that = this
			this.chart = this.$echarts.init(document.getElementById(this.id))
			this.chart.setOption(this.option)
			this.option.series[0].data = this.funnelData
			this.option.series[0].name = this.Title
			this.option.title.text = this.Title
			this.option.tooltip = {
				trigger: 'item',
				show: true,
				textStyle: {
					fontSize: 14
				},
				confine: true,
				formatter (params) {
					let res = ''
					switch (params.data.name) {
					case '注册在读学生数':
						res = params.data.name + '&nbsp;:&nbsp;' + toThousand(that.funnelDataLabel[params.dataIndex].value)
						break
					case '在读激活学生数':
						res = params.data.name + '&nbsp;:&nbsp;' + toThousand(that.funnelDataLabel[params.dataIndex].value) + '&nbsp;:&nbsp;' + '转化率' + ' : ' + (that.studentActivationRatioView)
						break
					case '当日活跃学生数':
						res = params.data.name + '&nbsp;:&nbsp;' + toThousand(that.funnelDataLabel[params.dataIndex].value) + '&nbsp;:&nbsp;' + '转化率' + ' : ' + (that.studentActiveRatioView)
						break
					case '在读家长数':
						res = params.data.name + '&nbsp;:&nbsp;' + toThousand(that.funnelDataLabel[params.dataIndex].value)
						break
					case '在读激活家长数':
						res = params.data.name + '&nbsp;:&nbsp;' + toThousand(that.funnelDataLabel[params.dataIndex].value) + '&nbsp;:&nbsp;' + '转化率' + ' : ' + (that.teacherActivationRatioView)
						break
					case '当日活跃家长数':
						res = params.data.name + '&nbsp;:&nbsp;' + toThousand(that.funnelDataLabel[params.dataIndex].value) + '&nbsp;:&nbsp;' + '转化率' + ' : ' + (that.teacherActiveRatioView)
						break
					}
					return res
				}
			}
			this.option.series[0].label = {
				normal: {
					position: 'right',
					textStyle: {
						fontSize: 14
					},
					formatter (params) {
						let res = ''
						switch (params.data.name) {
						case '注册在读学生数':
							res = params.data.name + ' :\n ' + toThousand(that.funnelDataLabel[params.dataIndex].value)
							break
						case '在读激活学生数':
							res = params.data.name + ' :\n ' + toThousand(that.funnelDataLabel[params.dataIndex].value) + '\n' + '转化率' + ' : ' + (that.studentActivationRatioView)
							break
						case '当日活跃学生数':
							res = params.data.name + ' : \n' + toThousand(that.funnelDataLabel[params.dataIndex].value) + '\n' + '转化率' + ' : ' + (that.studentActiveRatioView)
							break
						case '在读家长数':
							res = params.data.name + ' : \n' + toThousand(that.funnelDataLabel[params.dataIndex].value)
							break
						case '在读激活家长数':
							res = params.data.name + ' : \n' + toThousand(that.funnelDataLabel[params.dataIndex].value) + '\n' + '转化率' + ' : ' + (that.teacherActivationRatioView)
							break
						case '当日活跃家长数':
							res = params.data.name + ' : \n' + toThousand(that.funnelDataLabel[params.dataIndex].value) + '\n' + '转化率' + ' : ' + (that.teacherActiveRatioView)
							break
						}
						return '{center|' + res + '}'
					},
					rich: {
						center: {
							align: 'center',
							fontSize: '11'
						}
					}
				}
			}
			this.chart.setOption(this.option)
			window.addEventListener('resize', this.chart.resize)
		}
	},
	watch: {
		// 观察option的变化
		funnelData: {
			handler (newVal, oldVal) {
				if (this.chart) {
					this.chart.clear()
					if (newVal) {
						let that = this
						this.$set(this.option.series[0], 'data', newVal)
						this.$set(this.option.title, 'text', this.Title)
						this.$set(this.option.series[0], 'name', this.Title)
						this.option.tooltip = {
							trigger: 'item',
							show: true,
							textStyle: {
								fontSize: 14
							},
							confine: true,
							formatter (params) {
								let res = ''
								switch (params.data.name) {
								case '注册在读学生数':
									res = params.data.name + '&nbsp;:&nbsp;' + toThousand(that.funnelDataLabel[params.dataIndex].value)
									break
								case '在读激活学生数':
									res = params.data.name + '&nbsp;:&nbsp;' + toThousand(that.funnelDataLabel[params.dataIndex].value) + '&nbsp;:&nbsp;' + '转化率' + ' : ' + (that.studentActivationRatioView)
									break
								case '当日活跃学生数':
									res = params.data.name + '&nbsp;:&nbsp;' + toThousand(that.funnelDataLabel[params.dataIndex].value) + '&nbsp;:&nbsp;' + '转化率' + ' : ' + (that.studentActiveRatioView)
									break
								case '在读家长数':
									res = params.data.name + '&nbsp;:&nbsp;' + toThousand(that.funnelDataLabel[params.dataIndex].value)
									break
								case '在读激活家长数':
									res = params.data.name + '&nbsp;:&nbsp;' + toThousand(that.funnelDataLabel[params.dataIndex].value) + '&nbsp;:&nbsp;' + '转化率' + ' : ' + (that.teacherActivationRatioView)
									break
								case '当日活跃家长数':
									res = params.data.name + '&nbsp;:&nbsp;' + toThousand(that.funnelDataLabel[params.dataIndex].value) + '&nbsp;:&nbsp;' + '转化率' + ' : ' + (that.teacherActiveRatioView)
									break
								}
								return res
							}
						}
						this.option.series[0].label = {
							normal: {
								position: 'insideRight',
								textStyle: {
									fontSize: 14
								},
								formatter (params) {
									let res = ''
									switch (params.data.name) {
									case '注册在读学生数':
										res = params.data.name + ' :\n ' + toThousand(that.funnelDataLabel[params.dataIndex].value)
										break
									case '在读激活学生数':
										res = params.data.name + ' :\n ' + toThousand(that.funnelDataLabel[params.dataIndex].value) + '\n' + '转化率' + ' : ' + (that.studentActivationRatioView)
										break
									case '当日活跃学生数':
										res = params.data.name + ' : \n' + toThousand(that.funnelDataLabel[params.dataIndex].value) + '\n' + '转化率' + ' : ' + (that.studentActiveRatioView)
										break
									case '在读家长数':
										res = params.data.name + ' : \n' + toThousand(that.funnelDataLabel[params.dataIndex].value)
										break
									case '在读激活家长数':
										res = params.data.name + ' : \n' + toThousand(that.funnelDataLabel[params.dataIndex].value) + '\n' + '转化率' + ' : ' + (that.teacherActivationRatioView)
										break
									case '当日活跃家长数':
										res = params.data.name + ' : \n' + toThousand(that.funnelDataLabel[params.dataIndex].value) + '\n' + '转化率' + ' : ' + (that.teacherActiveRatioView)
										break
									}
									return '{center|' + res + '}'
								},
								rich: {
									center: {
										align: 'center',
										fontSize: '11'
									}
								}
							}
						}
						this.chart.setOption(this.option)
					} else {
						this.$set(this.option.series[0], 'data', oldVal)
						this.$set(this.option.series[0], 'name', this.Title)
						this.chart.setOption(this.option)
					}
				} else {
					this.init()
				}
			},
			deep: true // 对象内部属性的监听，关键。
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
