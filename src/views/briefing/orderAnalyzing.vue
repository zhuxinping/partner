<template>
	<div class="container">
		<div class="flex">
			<MHeader @backClick="goBack"  headerTitle="订单分析"></MHeader>
			<ul class="nav-status" >
				<li class="status" v-for="(item, index) in tabList" :key="index" @click="ChangeTab(index)"><span class="bg-color" :class="current==index?'change-color': ''">{{item}}</span></li>
			</ul>
		</div>
		<div class="main" v-if="operation">
			<div class="tab-bd">
				<div class="tab-item">
					<div class="spr-title">
						<span class="spr-left"><em>订单动态</em></span>
					</div>
					<div class="today-sum-title">{{orderText}}订单金额合计</div>
					<div class="today-sum"><i class="icon-rmb">￥</i> <em>{{allOrderData.totalOrderAmonut ? allOrderData.totalOrderAmonut : 0 | numFilter | numThousand }}</em></div>
					<ul class="pay-tab">
						<li>
							<span>付费学校数</span>
							<em>{{allOrderData.paidSchoolTotal ? allOrderData.paidSchoolTotal : 0 | numThousand}}</em>
						</li>
						<li>
							<span>付费学生数</span>
							<em>{{allOrderData.paidStudentTotal ? allOrderData.paidStudentTotal : 0 | numThousand}}</em>
						</li>
						<li class="active">
							<span>付费家长数</span>
							<em>{{allOrderData.paidParentTotal ? allOrderData.paidParentTotal : 0 | numThousand}}</em>
						</li>
					</ul>
					<div class="spr-title">
						<span class="spr-left"><em>各类订单汇总</em></span>
					</div>
					<OrderSum :allOrderData="allOrderData"></OrderSum>
					<div class="order-trend">
						<div class="spr-title">
							<span class="spr-left"><em>{{current==0?'7天订单趋势':current==1?'周订单趋势':'月订单趋势'}}</em></span>
						</div>
						<div class="day-add">
							<span>{{orderTrend}}</span>
							<i class="icon-add" :class="allOrderData.contrastOrderTendency?'icon-reduce':''"></i>
							<em>{{allOrderData.contrastOrder |numAbs| numFilter | numThousand}}</em>
							<span>元</span>
						</div>
						<div class="bar-data">
							<ve-bar :settings="chartSettings"  :data="barData"  :judge-width="true" style="background: #fff;"  :grid="grid" :colors="colors" :width="width" :height="height" :extend="chartExtend"></ve-bar>
						</div>
					</div>
				</div>
			</div>
		</div>
		<no-data :operation = '!operation'></no-data>
	</div>
</template>
<script>
import Vue from 'vue'
import MHeader from '@/components/MHeader'
import NoData from '@/components/no-data'
import OrderSum from './components/OrderSum'
import { ReportApi } from '@/api/index'
import { setStore, tongji, toThousand, toDecimal2, toast } from '@/utils/common'
import 'echarts/lib/component/title'
import VeBar from 'v-charts/lib/bar.common'
Vue.component(VeBar.name, VeBar)
export default {
	name: 'orderAnalyzing',
	components: {
		MHeader,
		NoData,
		OrderSum
	},
	data () {
		this.chartSettings = {
			metrics: ['订单金额'],
			dimension: ['日期']
		}
		this.grid = {
			left: 10,
			right: '28%',
			top: 15,
			containLabel: true,
			x: '15%',
			y: '15%'
		}
		this.width = '100%'
		this.height = '100%'
		this.chartExtend = {
			tooltip: {
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'line', // 默认为直线，可选为：'line' | 'shadow'
					lineStyle: { // 直线指示器样式设置
						color: 'rgba(255,255,255,0)'
					}
				},
				confine: true,
				formatter: function (params, ticket, callback) {
					// console.log(params)
					let data = toThousand(toDecimal2(params[0].value))
					let date = params[0].axisValue
					let name = params[0].seriesName
					let marker = params[0].marker
					let str = date + '<br>' + marker + name + '&nbsp;:&nbsp;' + data
					return str
				}
			},
			title: {
				left: 20,
				bottom: 23,
				text: '单位/元',
				textStyle: {
					fontSize: 10,
					color: '#BBBBBD'
				}
			},
			legend: {
				bottom: 23,
				left: 80,
				itemWidth: 12,
				itemHeight: 12,
				data: [
					{
						name: '订单金额',
						textStyle: {
							fontSize: 10,
							color: '#818d9d'
						},
						icon: 'roundRect'
					}]
			},
			xAxis: {
				axisLine: {
					show: false
				},
				splitLine: {
					show: false
				},
				axisLabel: {
					show: false
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
						textAlign: 'center'
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
		this.width = '100%'
		this.height = '100%'
		this.colors = ['#05ACFF']
		return {
			barData: {
				columns: ['日期', '订单金额'],
				rows: []
			},
			current: 0,
			tabList: ['日报', '周报', '月报'],
			infoInform: setStore('infoInform'),
			operation: true,
			allOrderData: {},
			orderText: '',
			orderTrend: ''
		}
	},
	mounted () {
		this.ChangeTab(this.current)
	},
	methods: {
		ChangeTab (index) {
			this.current = index
			this.getData(index)
			if (index === 0) {
				tongji('04_02_order_dayly', '0')
			} else if (index === 1) {
				tongji('04_02_order_weekly', '0')
			} else {
				tongji('04_02_order_monthly', '0')
			}
		},
		goBack () {
			tongji('04_02_back', '1')
			this.$router.go(-1)
		},
		getData (index) {
			let params = {}
			params.id = this.infoInform.id
			params.type = index + 1
			params.userCenterIdDing = this.infoInform.userCenterId
			ReportApi.orderAnalyse(params, res => {
				if (res.flag && res.data) {
					this.operation = true
					this.allOrderData = res.data
					this.barData.rows = []
					if (index === 0) {
						this.orderText = '昨日(' + res.data.dateYesterday + ')'
						this.orderTrend = '昨天订单金额比前天'
						res.data.tendencyList.forEach((item, i) => {
							let object = {
								'日期': item.dateNum + '日',
								'订单金额': item.totalOrderAmonut
							}
							this.$set(this.barData.rows, this.barData.rows.length, object)
						})
					} else if (index === 1) {
						this.orderText = '上周(第' + res.data.weekofYear + '周(' + res.data.weekInterval + '))'
						this.orderTrend = '上周订单金额比第' + res.data.tendencyList[1].dateNum + '周'
						res.data.tendencyList.forEach((item, i) => {
							let object = {
								'日期': '第' + item.dateNum + '周' + '\n(' + item.weekInterval + ')',
								'订单金额': item.totalOrderAmonut
							}
							this.$set(this.barData.rows, this.barData.rows.length, object)
						})
					} else {
						this.orderText = '上月(' + res.data.monthofYear + '月)'
						this.orderTrend = res.data.monthofYear + '月订单金额比' + res.data.tendencyList[1].dateNum + '月'
						res.data.tendencyList.forEach((item, i) => {
							let object = {
								'日期': item.dateNum + '月',
								'订单金额': item.totalOrderAmonut
							}
							this.$set(this.barData.rows, i, object)
						})
					}
				} else {
					this.operation = false
					toast(res.msg)
				}
			})
		}
	}
}
</script>
<style lang="stylus" scoped >
@import "./assest/orderAnalyze.styl"
</style>
