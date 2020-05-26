<template>
    <div  class="container">
		<div class="flex">
			<MHeader @backClick="goBack"  headerTitle="开园分析"></MHeader>
			<ul class="nav-status" >
				<li class="status" v-for="(item, index) in tabList" :key="index" @click="ChangeTab(index)"><span class="bg-color" :class="current==index?'change-color': ''">{{item}}</span></li>
			</ul>
		</div>
		<div class="main">
			<div class="order-trend">
				<div class="spr-title">
					<span class="spr-left">
						<em>开园动态</em>
						<i @click="parentRatio" class="icon-answer"></i>
					</span>
				</div>
				<div class="day-add">
					<span>{{openGardenText}}</span>
					<em>{{listData.schoolTotal | numThousand}}</em>
					<span>家</span>
				</div>
				<div class="v-ring">
					<div class="vr-left">
						<ve-ring   ref="ring0"  :grid="grid1" :judge-width="true" style="background: #fff;"  :width="width" :height="height"  :data="dayRingData" :extend="chartExtend1" :settings="chartSettings1"></ve-ring>
					</div>
					<div class="vr-right">
						<ul>
							<li>
								<span>
									<i :class="listData.formalSchoolTendency?'icon-reduce':'icon-add'"></i>
									<em>{{listData.formalschoolchangetotal | numAbs | numThousand}}</em>
								</span>
								<span>共{{listData.formalSchoolTotal | numThousand}}家</span>
							</li>
							<li>
								<span>
									<i :class="listData.reportSchoolTendency?'icon-reduce':'icon-add'"></i>
									<em>{{listData.reportschoolchangetotal | numAbs | numThousand}}</em>
								</span>
								<span>共{{listData.reportSchoolTotal | numThousand}}家</span>
							</li>
							<li>
								<span>
									<i :class="listData.registerSchoolTendency?'icon-reduce':'icon-add'"></i>
									<em>{{listData.registerschoolchangetotal | numAbs | numThousand}}</em>
								</span>
								<span>共{{listData.registerSchoolTotal | numThousand}}家</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="order-trend">
				<div class="spr-title">
					<span class="spr-left"><em>{{current==0?'7天开园趋势':current==1?'周开园趋势':'月开园趋势'}}</em> </span>
				</div>
				<div class="day-add">
					<span>{{openGardenTrend}}</span>
					<i :class="listData.contrastSchoolTendency?'icon-reduce':'icon-add'"></i>
					<em>{{listData.contrastSchool |numAbs | numThousand}}</em>
					<span>家</span>
				</div>
				<div class="chart-line">
					<ve-line :data="dayLineData" :judge-width="true" style="background: #fff;" :grid="grid" :width="width" :height="height" :extend="chartExtend" :settings="chartSettings"  :colors="colors" ></ve-line>
				</div>
			</div>
		</div>
		<div class="alert" v-show="showAlertFlag">
			<ul>
				<li>学校总数:</li>
				<li>启用的正式园</li>
				<li>+审批已通过的报备园</li>
				<li>+有用的自注册园(已提交报备的不统计)</li>
			</ul>
		</div>
	</div>
</template>
<script>
import MHeader from '@/components/MHeader'
import NoData from '@/components/no-data'
import { ReportApi } from '@/api/index'
import { setStore, tongji, toThousand, toast } from '@/utils/common'
import Vue from 'vue'
import 'echarts/lib/component/title'
import VeRing from 'v-charts/lib/ring.common'
import VeLine from 'v-charts/lib/line.common'
Vue.component(VeLine.name, VeLine)
Vue.component(VeRing.name, VeRing)
export default {
	name: 'gardenAnalyzing',
	components: {
		MHeader,
		NoData
	},
	data () {
		this.grid1 = {
			left: 20,
			right: 20,
			top: 20,
			bottom: 30
		}
		this.chartSettings1 = {
			metrics: '园所数量',
			dimension: ['园所']
		}
		this.chartExtend1 = {
			tooltip: {
				textStyle: {
					align: 'left'
				},
				trigger: 'item',
				formatter: function (params, ticket, callback) {
					let data = toThousand(params.value)
					let name = params.name
					let marker = params.marker
					let percent = params.percent
					let str = marker + name + '&nbsp;:&nbsp;' + '<br>' + data + '(' + percent + '%' + ')'
					return str
				},
				confine: true
			},
			color: ['#F5A623 ', '#00AAFF ', '#7ED321'],
			legend: {
				orient: 'vertical',
				x: 'right',
				y: 'center',
				align: 'left',
				itemGap: 20,
				height: 200,
				itemWidth: 12,
				itemHeight: 12,
				data: [
					{
						name: '正式园',
						textStyle: {
							fontSize: 12,
							color: '#818d9d'
						},
						icon: 'roundRect'
					},
					{
						name: '报备园',
						textStyle: {
							fontSize: 12,
							color: '#818d9d'
						},
						icon: 'roundRect'
					},
					{
						name: '自主注册园',
						textStyle: {
							fontSize: 12,
							color: '#818d9d'
						},
						icon: 'roundRect'
					}
				]
			},
			series: {
				type: 'pie',
				label: {
					show: false
				},
				hoverOffset: 3,
				radius: ['45%', '65%'],
				center: ['30%', '50%']
			}
		}
		this.chartSettings = {
			metrics: ['正式园', '报备园', '自主注册园'],
			dimension: ['日期']
		}
		this.grid = {
			left: 20,
			right: 20,
			top: 20,
			bottom: 30,
			x: '15%',
			y: '15%',
			containLabel: true
		}
		this.width = '100%'
		this.height = '100%'
		this.colors = ['#F5A623 ', '#00AAFF ', '#7ED321']
		this.chartExtend = {
			series: {
				symbol: 'circle'
			},
			title: {
				left: 20,
				bottom: 5,
				text: '单位/家',
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
				bottom: 5,
				right: 24,
				itemWidth: 12,
				itemHeight: 12,
				itemGap: 8,
				data: [
					{
						name: '正式园',
						textStyle: {
							fontSize: 10,
							color: '#818d9d'
						},
						icon: 'roundRect'
					},
					{
						name: '报备园',
						textStyle: {
							fontSize: 10,
							color: '#818d9d'
						},
						icon: 'roundRect'
					},
					{
						name: '自主注册园',
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
					scale: false,
					minInterval: 1,
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
					interval: 0,
					textStyle: {
						color: '#BBBBBD',
						fontSize: '10'
					},
					formatter: function (params) {
						let newParamsName = ''// 最终拼接成的字符串
						let paramsNameNumber = params.length// 实际标签的个数
						let provideNumber = 4// 每行能显示的字的个数
						let rowNumber = 2// 换行的话，需要显示几行，向上取整
						if (paramsNameNumber > provideNumber) {
							/** 循环每一行,p表示行 */
							for (let p = 0; p < rowNumber; p++) {
								let tempStr = ''// 表示每一次截取的字符串
								let start = p * provideNumber// 开始截取的位置
								let end = start + provideNumber// 结束截取的位置
								// 此处特殊处理最后一行的索引值
								if (p === rowNumber - 1) {
									// 最后一次不换行
									tempStr = params.substring(start, paramsNameNumber)
								} else {
									// 每一次拼接字符串并换行
									tempStr = params.substring(start, end) + '\n'
								}
								newParamsName += tempStr// 最终拼成的字符串
							}
						} else {
							newParamsName = params
						}
						return newParamsName
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
		return {
			current: 0,
			tabList: ['日报', '周报', '月报'],
			/* 折线图数据设定 */
			dayLineData: {
				columns: ['日期', '正式园', '报备园', '自主注册园'],
				rows: []
			},
			/* 环形图数据设定 */
			dayRingData: {
				columns: ['园所', '园所数量'],
				rows: []
			},
			infoInform: setStore('infoInform'),
			showAlertFlag: false,
			listData: {
				schoolTotal: '',
				formalschoolchangetotal: '',
				reportschoolchangetotal: '',
				reportSchoolTotal: '',
				formalSchoolTotal: '',
				registerschoolchangetotal: '',
				registerSchoolTotal: '',
				contrastSchool: ''
			},
			openGardenText: '',
			openGardenTrend: ''
		}
	},
	mounted () {
		tongji('04_03_customer_dayly', '0')
		this.ChangeTab(this.current)
	},
	methods: {
		ChangeTab (index) {
			this.current = index
			if (index === 0) {
				tongji('04_03_customer_dayly', '0')
			} else if (index === 1) {
				tongji('04_03_customer_weekly', '0')
			} else {
				tongji('04_03_customer_monthly', '0')
			}
			this.getData(index)
		},
		parentRatio () {
			this.showAlertFlag = true
			setTimeout(() => {
				this.showAlertFlag = false
			}, 4000)
		},
		goBack () {
			tongji('04_03_back', '1')
			this.$router.go(-1)
		},
		getData (index) {
			let params = {}
			params.id = this.infoInform.id
			params.userCenterIdDing = this.infoInform.userCenterId
			params.type = index + 1
			ReportApi.openSchool(params, res => {
				if (res.flag && res.data) {
					this.listData = res.data
					this.dayLineData.rows = []
					this.dayRingData.rows = [
						{ '园所': '正式园', '园所数量': res.data.formalSchoolTotal },
						{ '园所': '报备园', '园所数量': res.data.reportSchoolTotal },
						{ '园所': '自主注册园', '园所数量': res.data.registerSchoolTotal }
					]
					res.data.tendencyList.forEach((item, i) => {
						let data
						if (index === 0) {
							this.openGardenText = '昨日学校总数'
							this.openGardenTrend = '昨天学校总数比前天'
							data = item.dateNum + '日'
						} else if (index === 1) {
							this.openGardenText = '上周学校总数'
							this.openGardenTrend = '上周学校总数比第' + res.data.tendencyList[1].dateNum + '周'
							data = '第' + item.dateNum + '周\n(' + item.weekInterval + ')'
						} else {
							this.openGardenText = res.data.monthofYear + '月学校总数'
							this.openGardenTrend = res.data.monthofYear + '月学校总数比' + res.data.tendencyList[1].dateNum + '月'
							data = item.dateNum + '月'
						}
						let object = {
							'日期': data,
							'正式园': item.formalSchoolTotal,
							'报备园': item.reportSchoolTotal,
							'自主注册园': item.registerSchoolTotal
						}
						this.$set(this.dayLineData.rows, res.data.tendencyList.length - i - 1, object)
					})
				} else {
					toast(res.msg)
				}
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
@import "./assest/gardenAnalyze.styl"
</style>
