<template>
	<div class="container" :style="!showData?'background-color:#fff':''">
		<div class="flex">
			<MHeader @backClick="goBack" headerTitle="激活分析"></MHeader>
			<span class="right-text">昨天({{dateYesterday}})</span>
		</div>
		<div class="main" v-if="showData">
			<div class="order-trend">
				<div class="spr-title">
					<span class="spr-left"><em>激活比</em> <i @click="activeFlag=true" class="icon-answer"></i></span>
				</div>
				<activeBar :targetValue="targetValue" :activationRatio="activationRatio" :exportRatio="exportRatio"></activeBar>
				<div class="active-link" :class="showColor?'active':''" @click="toActiveLink"><span>{{targetStr}}</span><i :class="showColor ? 'icon-right-red':'icon-right'"></i></div>
			</div>
			<div class="order-trend">
				<div class="spr-title">
					<span class="spr-left"><em>激活率</em><i @click="activeRatio=true" class="icon-answer"></i></span>
				</div>
				<activeTable :tableData="tableData"></activeTable>
			</div>
			<div class="order-trend">
				<div class="spr-title">
					<span class="spr-left"><em>转化漏斗</em></span>
				</div>
				<div class="chart-box">
					<div class="chart-line">
						<activeFunnel :Title="studentTitle" :funnelDataLabel="studentDataLabel" :studentActivationRatioView="studentActivationRatioView" :studentActiveRatioView="studentActiveRatioView" :funnelData="studentData" :option="option" :style="style" id="funnel1"></activeFunnel>
					</div>
				</div>
				<div class="chart-box">
					<div class="chart-line">
						<activeFunnel :Title="teacherTitle" :funnelDataLabel="teacherDataLabel" :teacherActivationRatioView="teacherActivationRatioView" :teacherActiveRatioView="teacherActiveRatioView"  :funnelData="teacherData" :option="option" :style="style" id="funnel2"></activeFunnel>
					</div>
				</div>
			</div>
		</div>
		<no-data :operation = 'flagData'></no-data>
		<dialogModal  :isShow="activeRatio" v-on:close="activeRatio=false">
			<ul slot="content" class="alert_ul">
				<li class="example">
					<p class="raito">激活率:</p>
					<p class="roito-left">导入的用户中有百分之多少激活了。</p>
					<p class="roito-left">激活数<span>÷</span>在读<span>/</span>在职数<span>*</span>100%</p>
				</li>
				<li class="example">
					<p class="raito">学生激活率目标值: <span>{{studentActivationRatioTargetValue}}%</span></p>
				</li>
			</ul>
		</dialogModal>
		<dialogModal  :isShow="activeFlag" v-on:close="activeFlag=false">
			<ul slot="content" class="alert_ul">
				<li class="example">
					<p class="raito">导入比:</p>
					<p class="roito-left">一个在读学生导入多少个家长。</p>
					<p class="roito-left">在读学生家长数<span>÷</span>在读学生数</p>
				</li>
				<li class="example">
					<p class="raito">激活比:</p>
					<p class="roito-left">一个在读激活学生有多少个激活的家长。</p>
					<p class="roito-left">在读激活家长数<span>÷</span>在读学生数</p>
				</li>
				<li class="example">
					<p class="raito">激活比目标值: <span>{{targetValue |numFilter}}</span></p>
				</li>
			</ul>
		</dialogModal>
	</div>
</template>
<script>
import MHeader from '@/components/MHeader'
import ActiveBar from '@/components/activeBar'
import activeTable from './components/activeTable'
import activeFunnel from './components/activeFunnel'
import dialogModal from '@/components/dialogModal'
import { ReportApi } from '../../api/index'
import NoData from '@/components/no-data'
import { setStore, tongji, toast, setSession } from '../../utils/common'
import 'echarts/lib/component/title'
export default {
	name: 'activeAnalyzing',
	components: {
		MHeader,
		ActiveBar,
		activeTable,
		activeFunnel,
		dialogModal,
		NoData
	},
	data () {
		return {
			actionCode: JSON.stringify(setStore('actionCode')),
			activationRatio: null,
			exportRatio: null,
			flagData: false,
			showData: false,
			loading: true,
			targetValue: 4,
			targetStr: '',
			showColor: false,
			infoInform: setStore('infoInform') ? setStore('infoInform') : '',
			showAlertFlag: false,
			activeRatio: false,
			activeFlag: false,
			dateYesterday: '',
			tableData: {
				onReadStudentTotal: 0,
				activeStudentTotal: 0,
				onReadStudentActivationRatio: 0,
				onReadParentTotal: 0,
				activeParentTotal: 0,
				onReadParentActivationRatio: 0,
				onReadTeacherTotal: 0,
				activeTeacherTotal: 0,
				onReadTeacherActivationRatio: 0,
				isStandard: 0
			},
			studentActivationRatioTargetValue: 0,
			style: {
				width: '100%',
				height: '100%'
			},
			studentData: [
				{
					value: '0',
					name: '注册在读学生数'
				},
				{
					value: '0',
					name: '在读激活学生数'
				},
				{
					value: '0',
					name: '当日活跃学生数'
				}
			],
			studentDataLabel: [
				{
					value: '0',
					name: '注册在读学生数'
				},
				{
					value: '0',
					name: '在读激活学生数'
				},
				{
					value: '0',
					name: '当日活跃学生数'
				}
			],
			studentActivationRatioView: '0',
			studentActiveRatioView: '0',
			teacherData: [
				{
					value: '0',
					name: '在读家长数'
				},
				{
					value: '0',
					name: '在读激活家长数'
				},
				{
					value: '0',
					name: '当日活跃家长数'
				}
			],
			teacherDataLabel: [
				{
					value: '0',
					name: '在读家长数'
				},
				{
					value: '0',
					name: '在读激活家长数'
				},
				{
					value: '0',
					name: '当日活跃家长数'
				}
			],
			teacherActivationRatioView: '0',
			teacherActiveRatioView: '0',
			studentTitle: '学生转化漏斗',
			teacherTitle: '家长转化漏斗',
			option: {
				grid: {
					left: '8%',
					right: '8%',
					bottom: '12%',
					top: '15%',
					containLabel: true
				},
				backgroundColor: '#fff',
				color: ['#63D0B0', '#70AFEA', '#F4BC89'],
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
						height: '60%',
						min: 0,
						max: 100,
						minSize: '30%',
						maxSize: '100%',
						sort: 'descending',
						gap: 2,
						label: {
							normal: {
								position: 'insideRight',
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
	},
	mounted () {
		tongji('04_04_activate_dayly', '0')
		this.getData()
	},
	computed: {
	},
	methods: {
		getData () {
			let params = {}
			params.agentId = this.infoInform.id
			this.flagData = false
			this.loading = true
			ReportApi.getActivationAnalysis(params, res => {
				if (res.code === 10000 && res.body) {
					// 设置tableData数据
					this.tableData = {
						onReadStudentTotal: res.body.inReadStudentTotal,
						activeStudentTotal: res.body.activeStudentAllTotal,
						onReadStudentActivationRatio: res.body.onReadStudentActivationRatioStr,
						onReadParentTotal: res.body.inReadParentTotal,
						activeParentTotal: res.body.activeParentAllTotal,
						onReadParentActivationRatio: res.body.onReadParentActivationRatioStr,
						onReadTeacherTotal: res.body.onJobTeacherTotal,
						activeTeacherTotal: res.body.activeTeacherAllTotal,
						onReadTeacherActivationRatio: res.body.onReadTeacherActivationRatioStr,
						isStandard: res.body.isStandard
					}
					// 设置日期
					this.dateYesterday = res.body.dateYesterday
					// 设置学生激活率目标值
					this.studentActivationRatioTargetValue = res.body.studentActivationRatioTargetValue
					// 学生
					// 漏斗图形的data
					this.studentData[0].value = res.body.inReadStudentTotal ? 100 : 0
					this.studentData[1].value = res.body.inReadStudentTotal ? res.body.activeStudentAllTotal / res.body.inReadStudentTotal * 100 : 0
					this.studentData[2].value = res.body.inReadStudentTotal ? res.body.activeThatDayStudent / res.body.inReadStudentTotal * 100 : 0
					// 漏斗标签label的数据展示
					this.studentDataLabel[0].value = res.body.inReadStudentTotal
					this.studentDataLabel[1].value = res.body.activeStudentAllTotal
					this.studentDataLabel[2].value = res.body.activeThatDayStudent
					// 学生转化率
					this.studentActivationRatioView = res.body.onReadStudentActivationChangeRatioStr
					this.studentActiveRatioView = res.body.currentStudentActiveChangeRatioStr
					// 老师
					// 漏斗图形的data
					this.teacherData[0].value = res.body.inReadParentTotal ? 100 : 0
					this.teacherData[1].value = res.body.inReadParentTotal ? res.body.activeParentAllTotal / res.body.inReadParentTotal * 100 : 0
					this.teacherData[2].value = res.body.inReadParentTotal ? res.body.activeThatDayParent / res.body.inReadParentTotal * 100 : 0
					// 漏斗标签label的数据展示
					this.teacherDataLabel[0].value = res.body.inReadParentTotal
					this.teacherDataLabel[1].value = res.body.activeParentAllTotal
					this.teacherDataLabel[2].value = res.body.activeThatDayParent
					// 老师转化率
					this.teacherActivationRatioView = res.body.onReadParentActivationRatioStr
					this.teacherActiveRatioView = res.body.currentParentActiveChangeRatioStr
					// 坐标刻度的目标值
					this.targetValue = res.body.targetValue ? res.body.targetValue : 4
					// 激活导入比
					this.activationRatio = res.body.activeThan ? res.body.activeThan : 0.00
					this.exportRatio = res.body.importThan ? res.body.importThan : 0.00
					// 判断激活比是否达标
					if (this.activationRatio < res.body.targetValue) {
						this.showColor = true
						this.targetStr = '激活比未达标，查看激活报表，去提升激活'
					} else {
						this.targetStr = '去看看每个学校的激活表现吧'
						this.showColor = false
					}
					this.showData = true
				} else {
					// 上报错误日志
					this.flagData = true
					this.showData = false
				}
				this.loading = false
			})
		},
		goBack () {
			tongji('04_04_back', '1')
			this.$router.push('/briefing')
		},
		parentRatio () {
			this.showAlertFlag = true
		},
		toActiveLink () {
			if (this.actionCode.indexOf('"codeId":"ACTIVATE_REPORT_MENU"') !== -1) {
				tongji('04_04_linkto_activation_report', '1')
				this.$router.push('/activation')
			} else {
				toast('您没有查看激活报表的权限！')
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
	@import "./assest/active.styl"
</style>
