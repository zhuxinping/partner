<template>
	<div class="container" :style="!showData?'background-color:#fff':''">
		<div class="flex">
			<MHeader  @backClick="goBack" headerTitle="活跃分析"></MHeader>
			<span class="right-text">昨天({{dateYesterday}})</span>
		</div>
		<div class="main" v-if="showData">
			<div class="order-trend">
				<div class="spr-title">
					<span class="spr-left"><em>活跃概况</em> <i @click='activeShow' class="icon-answer"></i></span>
				</div>
				<ul class="ratio-list" @click="toActive">
					<li class="line1">
						<span>周日均活跃比<br>B级以上的班级数</span>
						<em style="margin-top: 10px">{{weekRatioStage.bAboveClassCount | numThousand}}<i :class="weekRatioStage.trend==1?'icon-up':'icon-down'" :style="weekRatioStage.trend==3?'display:none':''"></i></em>
					</li>
					<li class="line1">
						<span style="margin-top: 12px">活跃比</span>
						<em style="margin-top: 20px">{{tableData.liveThan |numFilter | numThousand}}<i  :class="tableData.liveThanTendency?'icon-down':'icon-up'" :style="tableData.liveThanTendency==2?'display:none':''"></i></em>
					</li>
					<li>
						<span style="margin-top: 12px">家长活跃率</span>
						<em style="margin-top: 20px">{{tableData.CurrentParentActiveRatioStr}}<i  :class="tableData.activeRatioParentTrend?'icon-down':'icon-up'" :style="tableData.activeRatioParentTrend==2?'display:none':''"></i></em>
					</li>
				</ul>
				<p class="live-title">周日均活跃比  各级别班级数分布</p>
				<classWeekRatio :weekRatioStage="weekRatioStage" @jump="toActive"></classWeekRatio>
				<div class="active-link" @click="toActive"><span>查看活跃报表，去提升活跃</span><i class="icon-right"></i></div>
				<livelyTable :tableData="tableData"  v-on:open="activeDay=true"></livelyTable>
			</div>
			<livelyLine :current="current" :listDate="studentRatio" textTitle="7天活跃趋势" @changeCurrent="chageCurrent"></livelyLine>
		</div>
		<no-data :operation = 'flagData'></no-data>
		<dialogModal  :isShow="activeDay" @close="activeDay=false">
			<ul slot="content" class="alert_ul">
				<li class="example">
					<p class="raito">月度平均日活学生数:</p>
					<p class="roito-left">这个自然月平均每天有多少个活跃学生。</p>
				</li>
				<li class="example">
					<p class="raito">月度平均日活家长数:</p>
					<p class="roito-left">这个自然月平均每天有多少个活跃家长。</p>
				</li>
				<li class="example">
					<p class="raito">月度平均日活园丁数:</p>
					<p class="roito-left">这个自然月平均每天有多少个活跃教师。</p>
				</li>
				<li class="example">
					<p class="roito-left">*月度平均：自然月每一天的当日活跃数</p>
					<p class="roito-left">总和<span>÷</span>该自然月的天数</p>
				</li>
			</ul>
		</dialogModal>
	</div>
</template>
<script>
import MHeader from '@/components/MHeader'
import livelyTable from './components/livelyTable'
import livelyLine from './components/livelyLine'
import dialogModal from '@/components/dialogModal'
import { ReportApi } from '@/api/index'
import NoData from '@/components/no-data'
import classWeekRatio from '../home/component/classWeekRatio'
import { setStore, tongji, toast } from '@/utils/common'
export default {
	name: 'livelyAnalyzing',
	components: {
		MHeader,
		livelyTable,
		livelyLine,
		dialogModal,
		NoData,
		classWeekRatio
	},
	data () {
		return {
			current: 0,
			activeDay: false,
			flagData: false,
			showData: false,
			loading: true,
			dateYesterday: '',
			studentRatio: {},
			actionCode: JSON.stringify(setStore('actionCode')),
			infoInform: setStore('infoInform'),
			showAlertFlag: false,
			tableData: {
				activeThatDayStudent: 0,
				activeThatMonthStudent: 0,
				activeThatDayParent: 0,
				activeThatMonthParent: 0,
				activeThatDayTeacher: 0,
				activeThatMonthTeacher: 0,
				currentParentActiveRatio: 0,
				liveThanTendency: 0,
				activeThatDayParentTendency: 0,
				activeThatDayStudentTendency: 0,
				activeThatDayTeacherTendency: 0,
				liveThan: 0,
				activeRatioParentTrend: 0
			},
			detailList: [],
			weekRatioStage: {}
		}
	},
	mounted () {
		tongji('04_05_active_dayly', '0')
		this.getData()
		this.getLevel()
	},
	methods: {
		goBack () {
			tongji('04_04_back', '1')
			this.$router.push('/briefing')
		},
		getData () {
			let params = {}
			params.agentId = this.infoInform.id
			this.flagData = false
			this.loading = true
			ReportApi.getActiveAnalysis(params, res => {
				if (res.code === 10000) {
					if (res.body) {
						// 添加表格数据
						this.studentRatio = res.body
						this.tableData = {
							activeThatDayStudent: res.body.activeThatDayStudent,
							activeThatMonthStudent: res.body.activeThatMonthStudent,
							activeThatDayParent: res.body.activeThatDayParent,
							activeThatMonthParent: res.body.activeThatMonthParent,
							activeThatDayTeacher: res.body.activeThatDayTeacher,
							activeThatMonthTeacher: res.body.activeThatMonthTeacher,
							CurrentParentActiveRatioStr: res.body.currentParentActiveRatioStr,
							liveThanTendency: res.body.liveThanTendency,
							activeThatDayParentTendency: res.body.activeThatDayParentTendency,
							activeThatDayStudentTendency: res.body.activeThatDayStudentTendency,
							activeThatDayTeacherTendency: res.body.activeThatDayTeacherTendency,
							liveThan: res.body.liveThan,
							activeRatioParentTrend: res.body.activeRatioParentTrend
						}
						// 日期设置
						this.dateYesterday = res.body.dateYesterday
						// 获取选项卡 图表数据
						this.detailList = res.body.detailList
						// 默认加载活跃数的选项卡
						this.current = 0
						this.showData = true
					} else {
						this.flagData = true
						this.showData = false
					}
				} else {
					// 上报错误日志
					this.flagData = true
					this.showData = false
				}
				this.loading = false
			})
		},
		getLevel () {
			let params = {}
			params.agentId = this.infoInform.id
			ReportApi.getClassActiveWeely(params, res => {
				if (res.code === 10000) {
					this.weekRatioStage = res.body
				} else {
					toast(res.message)
				}
			})
		},
		chageCurrent (index) {
			this.current = index
		},
		toActive () {
			if (this.actionCode.indexOf('"codeId":"ACTIVE_REPORT_MENU"') !== -1) {
				tongji('04_05_linkto_active_report', '1')
				this.$router.push('/active')
			} else {
				toast('您没有查看活跃报表的权限！')
			}
		},
		activeShow () {
			this.$router.push('/classRatioExplain/1')
		}
	}
}
</script>

<style lang="stylus" scoped>
@import "./assest/lively.styl"
</style>
