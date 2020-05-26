<template>
    <div>
		<div class="grid-container">
			<table class="spr-grid">
				<thead>
					<th class="line"></th>
					<th class="active">上学期</th>
					<th>本学期</th>
				</thead>
				<tr>
					<td class="cur">ARPU值</td>
					<td class="active">{{playObject && playObject.lastSem.arpu | numFilter | numThousand}}</td>
					<td class="month_active">{{playObject && playObject.currSem.arpu | numFilter | numThousand}} <i class="icon-down" :class="playObject&&playObject.sequential.arpuSeq==1?'icon-up':'icon-down'" :style="playObject&&playObject.sequential.arpuSeq==3?'display:none':''"></i></td>
				</tr>
				<tr>
					<td class="cur">订单金额</td>
					<td class="active">{{playObject && playObject.lastSem.orderAmount | numFilter  | numThousand}}</td>
					<td class="month_active">{{playObject && playObject.currSem.orderAmount | numFilter | numThousand}} <i class="icon-down" :class="playObject&&playObject.sequential.orderAmountSeq==1?'icon-up':'icon-down'" :style="playObject&&playObject.sequential.orderAmountSeq==3?'display:none':''"></i></td>
				</tr>
				<tr>
					<td class="cur">学生付费率</td>
					<td class="active">{{ playObject && playObject.lastSem.stuPayRate * 100 | numFilter}}%</td>
					<td class="month_active">{{playObject && playObject.currSem.stuPayRate * 100 | numFilter}}% <i class="icon-down" :class="playObject&&playObject.sequential.stuPayRateSeq==1?'icon-up':'icon-down'" :style="playObject&&playObject.sequential.stuPayRateSeq==3?'display:none':''"></i></td>
				</tr>
			</table>
		</div>
		<div class="play-bar">
			<div class="play-class">
				<span>本学期各个班级的付费概况</span>
				<span v-if="!operation" @click="searchClass">查看详情<i class="icon-arrow"></i></span>
			</div>
			<div v-if="!operation" style="width: 100%; height: 270px">
				<ve-histogram :data="chartData" :settings="chartSettings" :extend="chartExtend"></ve-histogram>
			</div>
			<dl v-if="operation" class="no-number">
				<dd></dd>
				<dt>暂无数据</dt>
			</dl>
			<div class="active-link" @click="seeActiveReport">点击查看《开视频园攻略》，助您收入翻倍~<i class="icon-right"></i></div>
		</div>
	</div>
</template>

<script>
import { ReportApi } from '@/api/index'
import { tongji, toThousand, toDecimal2, openLink } from '@/utils/common'
import Vue from 'vue'
import 'echarts/lib/component/title'
import VeHistogram from 'v-charts/lib/histogram.common'
Vue.component(VeHistogram.name, VeHistogram)
export default {
	name: 'playTable',
	props: {
		playObject: {}
	},
	data () {
		this.chartSettings = {
			axisSite: { right: ['学生付费率'] },
			yAxisType: ['', 'percent'],
			showLine: ['学生付费率'],
			stack: { '产品': ['视频产品', '签到产品'] },
			series: [
				{
					name: '视频产品',
					type: 'bar',
					stack: '产品',
					barMaxWidth: '50' // 横坐标轴的宽度
				},
				{
					name: '签到产品',
					type: 'bar',
					stack: '产品',
					barMaxWidth: '50' // 横坐标轴的宽度
				}
			]
		}
		this.chartExtend = {
			grid: {
				left: '0%',
				right: '1%',
				bottom: '40%',
				top: '5%',
				containLabel: true
			},
			tooltip: {
				textStyle: {
					align: 'left'
				},
				formatter: function (params) {
					let str = ''
					let data, marker
					params.forEach(item => {
						if (item.seriesName === '学生付费率') {
							data = item.seriesName + toDecimal2(item.value * 100) + '%'
							marker = item.marker
						} else {
							data = item.seriesName + toThousand(toDecimal2(item.value))
							marker = item.marker
						}
						str = str + marker + data + '</br>'
					})
					return str
				}
			},
			color: ['#FBB534', '#7ED321', '#00AAFF '],
			title: {
				left: 50,
				bottom: 40,
				text: '',
				textStyle: {
					fontSize: 10,
					color: '#BBBBBD'
				}
			},
			legend: {
				bottom: 130,
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
						name: '学生付费率',
						textStyle: {
							fontSize: 10,
							color: '#bbbbbd'
						},
						icon: 'roundRect'
					}
				]
			},
			xAxis: {
				type: 'category',
				axisLine: {
					show: true,
					interval: 0,
					lineStyle: {
						color: '#eee',
						width: 1,
						type: 'solid'
					}
				},
				axisLabel: {
					show: true,
					textStyle: {
						fontSize: 10,
						color: '#bbbbbd'
					}
				}
			},
			yAxis: {
				axisLine: {
					show: false,
					lineStyle: {
						color: '#bbbbbd',
						type: 'solid'
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#eee',
						type: 'dashed'
					}
				},
				splitNumber: 5
			},
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
			series: {
				barWidth: 20
			}
		}
		return {
			jumpUrl: '',
			chartData: {
				columns: ['日期', '视频产品', '签到产品', '学生付费率'],
				rows: []
			},
			operation: false
		}
	},
	mounted () {
		this.getDate()
		this.getClass()
		tongji('09_04_school_info_payment', '0')
	},
	methods: {
		getDate () {
			let params = {}
			ReportApi.getStrategy(params, res => {
				if (res.flag) {
					this.jumpUrl = res.data
				}
			})
		},
		getClass () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			ReportApi.getPayInfoBar(params, res => {
				if (res.code && res.body.flagData) {
					res.body.classPayList.forEach((item, index) => {
						if (item.gradeName && item.gradeName.length > 5) {
							item.gradeName = item.gradeName.substr(0, 4)
						}
						if (item.className && item.className.length > 5) {
							item.className = item.className.substr(0, 4)
						}
						let object = {
							'日期': item.gradeName + '\n' + item.className,
							'视频产品': item.videoOrderAmount,
							'签到产品': item.signInOrderAmount,
							'学生付费率': item.studentPaymentRate
						}
						this.$set(this.chartData.rows, index, object)
					})
				} else {
					this.operation = true
				}
			})
		},
		seeActiveReport () {
			tongji('09_04_linkto_info', '1')
			openLink(this.jumpUrl)
		},
		searchClass () {
			this.$router.push({path: `/payClass/${this.$parent.baseInfo.schoolName}/${this.$route.meta.schoolId}`})
		}
	}
}
</script>

<style lang="stylus" scoped>
	.grid-container
		background #fff
		border-collapse collapse
		padding 10px 35px 0
		.spr-grid
			width 100%
			margin 0 auto
			tr td
				width 150px
				height 80px
				line-height 80px
				border 2.1px solid #eee
				text-align right
				font-size 26px
				color #05ACFF
				padding-right 16px
				i{
					margin-top 24px
					float right
				}
			tr td.cur
				width 160px
				color #818D9D;
				text-align center
				padding-right 0
			tr td.active
				width 250px
			tr td.active_red
				color red
			tr td.month_active
				width 270px
			thead th
				width 150px
				height 80px
				border 2.1px solid #eee
				text-align right
				font-size 26px
				color #818D9D
				padding-right 16px
				font-weight 400
			thead th.active
				width 220px
			thead th.line
				position relative
			thead th.line:after
				content ""
				position absolute
				width 100%
				height 80px
				background url("../../../assets/images/icon_line.png") no-repeat
				background-size 100% 100%
				left 0
				top 0
	.active-link{
		position relative
		padding 22px 0
		text-align right
		color #FF5E68
		font-size 26px
		background #fff
		cursor pointer
	}
	.active-link i{
		margin-left 12px
		width 11px
		height 20px
		background url("../../../assets/images/icon_arrow_red.png") no-repeat
		background-size 100% 100%
		display inline-block
		margin-right 0
	}
	.play-bar
		background-color #fff
		padding 0 20px
		.play-class
			padding 30px 0
			display flex
			justify-content space-between
			span:nth-child(1)
				font-size 30px
				color #333333
			span:nth-child(2)
				font-size 26px
				color #00AAFF
			.icon-arrow{
				display inline-block
				margin-left 12px
				width 11px
				height 20px
				background url('../../../assets/images/icon-arrow_blue.png')
				background-size 100% 100%
			}
	.no-number
		width 100%
		height 470px
		margin auto
		background-color #fff
		overflow hidden
		dd
			width 250px
			height 220px
			margin-top 100px
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
