<template>
	<div class="container" :style="operation==2?'background:#fff':''">
		<div class="flex">
			<m-header @backClick="handleClose" :headerTitle="baseInfo.schoolName"></m-header>
			<p v-show='state == 2' class="right-text" @click="updateBaseInform" v-code="'REPORT_SCHOOL_EDIT'">修改</p>
			<ul class="nav-status" >
				<li class="status" v-for="(item, index) in titleTag" :key="index" @click="changeTag(index)"><span class="bg-color" :class="titleTagIndex==index?'change-color': ''">{{item}}</span></li>
			</ul>
		</div>
		<div class="main" :style="operation ==2?'background-color: #ffffff' : ''">
			<div v-show="titleTagIndex == 0">
				<ul class="from-table">
					<li class="table-li">
						<span class="key-content">学校名称</span>
						<span class="value-content">{{baseInfo.schoolName}}</span>
					</li>
					<li class="business">
						<div class="bussiness-top">
							<span class="key-content">营业执照或实景</span>
						</div>
						<div class="business-bg">
							<img class="img-bg" :src="baseInfo.schoolPicUrl ? baseInfo.schoolPicUrl : require('../../assets/images/school.png')" alt="" @click="isChoose = !isChoose">
						</div>
					</li>
					<li class="table-li">
						<span class="key-content">所属代理商</span>
						<span class="value-content">{{baseInfo.agentName}}</span>
					</li>
					<li class="table-li">
						<span class="key-content">学校账号</span>
						<span class="value-content">{{baseInfo.username}}</span>
					</li>
					<li class="table-li">
						<span class="key-content">密码</span>
						<input class="value-content" style="text-overflow: clip" type="password" readonly v-model="baseInfo.password">
					</li>
					<li class="table-li">
						<span class="key-content">重复密码</span>
						<input class="value-content" style="text-overflow: clip" type="password" readonly v-model="baseInfo.password">
					</li>
					<li class="table-li">
						<span class="key-content">地区</span>
						<span class="value-content">{{baseInfo.provName + baseInfo.cityName + baseInfo.countryName}}</span>
					</li>
					<li class="table-li">
						<span class="key-content">详细地址</span>
						<span class="value-content">{{baseInfo.address}}</span>
					</li>
					<li class="table-li" @click="openMap">
						<span class="key-content">坐标</span>
						<span class="value-content">{{baseInfo.mapAddress}}</span>
						<img class="map" src="../../assets/images/list-location.png" alt="">
					</li>
					<li class="table-li">
						<span class="key-content">所属管理区域</span>
						<span class="value-content">{{baseInfo.areaName}}</span>
					</li>
					<li class="table-li">
						<span class="key-content">园长姓名</span>
						<span class="value-content">{{baseInfo.linkman}}</span>
					</li>
					<li class="table-li">
						<span class="key-content">园长联系方式</span>
						<a class="value-content"  :href="'tel:' + baseInfo.masterPhoneDing">{{baseInfo.masterPhone}}</a>
						<img class="tel" src="../../assets/images/list-phone.png" alt="" >
					</li>
					<li class="table-li">
						<span class="key-content">学生数</span>
						<span class="value-content">{{baseInfo.studentNumber}}</span>
					</li>
					<li class="table-li">
						<span class="key-content">班级数</span>
						<span class="value-content">{{baseInfo.classNumber}}</span>
					</li>
					<li class="table-li">
						<span class="key-content">学费金额</span>
						<span class="value-content">{{baseInfo.schPrice}}</span>
					</li>
					<li class="table-li">
						<span class="key-content">学费单位</span>
						<span class="value-content">{{baseInfo.priceUnit == 1 ? '元/月' : baseInfo.priceUnit == 2 ? '元/季度' : '元/学期'}}</span>
					</li>
					<li  class="table-li">
						<span class="key-content">家长试用天数</span>
						<span class="value-content">{{baseInfo.dataNum}}</span>
					</li>
					<li  class="table-li">
						<span class="key-content">行业类型</span>
						<span class="value-content">{{baseInfo.industryTypeName + '-' + baseInfo.industryTypeStageName}}</span>
					</li>
					<li  class="table-li">
						<span class="key-content">园所特色</span>
						<span class="value-content">{{baseInfo.characteristicName}}</span>
					</li>
					<li  class="table-li">
						<span class="key-content">业务来源</span>
						<span class="value-content">{{baseInfo.businessSourceName}}</span>
					</li>
				</ul>
			</div>
			<div v-if="titleTagIndex==1">
				<div class="titleTagIndex" v-if="operation == 1">
					<em class="spr-right">昨天({{date}})</em>
					<div class="order-trend">
						<div class="spr-title">
							<span class="spr-left">
								<em>导入比</em><i @click="changeState('exportFlag')" class="icon-answer"></i>
							</span>
						</div>
						<ul class="export">
							<li>
								<span>在读学生数</span>
								<span>导入家长数(不去重)</span>
								<span>导入比</span>
							</li>
							<li>
								<span>{{listDate&&listDate.importRatioDetail.studentNumber | numThousand}}</span>
								<span>{{listDate&&listDate.importRatioDetail.parentNumber| numThousand}}</span>
								<span :style="listDate&&listDate.importRatioDetail.importRatioTrend==1?'color:#38BF7A': listDate&&listDate.importRatioDetail.importRatioTrend==2?'color: #FF5E68':''">{{listDate&&listDate.importRatioDetail.parentImportRatio | numFilter}}
									<i :class="listDate&&listDate.importRatioDetail.importRatioTrend==1?'icon-up':'icon-down'" :style="listDate&&listDate.importRatioDetail.importRatioTrend==3?'display:none':''"></i>
								</span>
							</li>
						</ul>
						<ratioBar :ratio = 'activationRatio.ratio' :targetValue="activationRatio.targetValue"></ratioBar>
						<span v-if="listDate.importRatioDetail.parentImportRatio < listDate.importRatioDetail.parentImportRatioGoal" class="ratio-text">当前学校学生平均导入<em>{{listDate&&listDate.importRatioDetail.parentImportRatio | numFilter}}</em>个家长，距离目标值<em>{{listDate&&listDate.importRatioDetail.parentImportRatioGoal|numFilter}}</em>个家长，还需要至少导入<em>{{listDate&&listDate.importRatioDetail.distanceNumber | numThousand}}</em>个家长</span>
						<span v-else class="ratio-text">当前学校学生平均导入<em>{{listDate&&listDate.importRatioDetail.parentImportRatio | numFilter}}</em>个家长，已达到目标值，继续保持！</span>
					</div>
					<exportTable :playObject="exportDate"></exportTable>
				</div>
			</div>
			<div v-if="titleTagIndex==2">
				<div class="student-parent-ratio" v-if="operation == 1">
					<em class="spr-right">昨天({{date}})</em>
					<div class="order-trend">
						<div class="spr-title">
							<span class="spr-left"><em>激活比</em> <i @click="changeState('livelyFlag')" class="icon-answer"></i></span>
							<span v-if="classNum" class="spr-class" @click="seeClassroom">查看班级详情<i class="icon-arrow"></i></span>
						</div>
						<classBar @change="classNum=false" ref="class" :schoolName="baseInfo.schoolName" :activationRatio = activationRatio></classBar>
					</div>
					<div class="order-trend active">
						<div class="spr-title">
							<span class="spr-left"><em>激活率</em><i @click="changeState('livelyRatioFlag')" class="icon-answer"></i></span>
						</div>
						<activeTable :studentRatio="studentRatio"></activeTable>
					</div>
					<activationLine :current="current" :listDate="studentRatio" textTitle="7天激活趋势" @changeCurrent="chageCurrent"></activationLine>
				</div>
			</div>
			<div v-if="titleTagIndex==3">
				<div class="titleTagIndex"  v-if="operation == 1">
					<em class="spr-right">昨天({{date}})</em>
					<div class="tab-box">
						<div class="order-trend">
							<div class="spr-title">
								<span class="spr-left"><em>活跃概况</em> <i class="icon-answer" @click="changeState(4)"></i></span>
							</div>
							<ul class="ratio-list">
								<li class="line1">
									<span>周日均活跃比<br>B级以上的班级数</span>
									<em>{{listDate.bAboveClassCount | numThousand}}<i style="top:54px"  :class="listDate.trend==1?'icon-up':'icon-down'" :style="listDate.trend==3?'display:none':''"></i></em>
								</li>
								<li class="line1">
									<span style="margin-top: 10px">活跃比</span>
									<em style="margin-top: 20px">{{listDate.parentsActiveRatio |numFilter | numThousand}}<i style="top:54px" :class="listDate.activeThanTrend==0?'icon-up':'icon-down'" :style="listDate.activeThanTrend==2?'display:none':''"></i></em>
								</li>
								<li>
									<span style="margin-top: 10px">家长活跃率</span>
									<em style="margin-top: 20px">{{listDate.parentActiveRatioStr}}<i :class="listDate.parentActivityRatioTrend==0?'icon-up':'icon-down'" :style="listDate.parentActivityRatioTrend==2?'display:none':''"></i></em>
								</li>
							</ul>
							<weekBar ref="class" :schoolName="baseInfo.schoolName" @classCount="classCount"></weekBar>
							<livelyTable @open="changeState('activeRatioFlag')" :dayActiveObject="listDate"></livelyTable>
							<activeLine :current="current" :listDate="listDate" textTitle="7天活跃趋势" @changeCurrent="chageCurrent"></activeLine>
						</div>
					</div>
				</div>
			</div>
			<div v-if="titleTagIndex==4">
				<div class="titleTagIndex"  v-if="operation == 1">
					<em class="spr-right">昨天({{date}})</em>
					<div class="tab-box">
						<div class="order-trend">
							<div class="spr-title">
								<span class="spr-left"><em>本学期付费概况</em> <i class="icon-answer" @click="changeState('playFlag')"></i></span>
							</div>
							<playTable :playObject="payDate"></playTable>
						</div>
					</div>
					<orderBar style="margin-top: 10px;background-color: #f2f3f5"></orderBar>
				</div>
			</div>
			<div v-if="titleTagIndex==5">
				<div class="titleTagIndex"  v-if="operation == 1">
					<em class="spr-right">
						<span v-if="!listDate.hasDevice" style="display: flex;align-items: center;justify-content: center">
							<img style="width: 16px;height: 16px;margin-right: 8px" src="../../assets/images/icon-warning.png" alt="">
							<span style="color: #FF9248;font-size: 14px">未安装签到设备</span>
						</span>
						<span v-else-if="listDate.hasDevice && !listDate.hasRecognition" style="display: flex;align-items: center;justify-content: center">
							<img style="width: 16px;height: 16px;margin-right: 8px" src="../../assets/images/icon-warning.png" alt="">
							<span style="color: #FF9248;font-size: 14px">未开通人脸签到</span>
						</span>
						<span v-else style="display: flex;align-items: center;justify-content: center">
							<img style="width: 16px;height: 16px;margin-right: 8px" src="../../assets/images/icon-success.png" alt="">
							<span style="color: #BBBBBD;font-size: 14px">已开通人脸签到</span>
						</span>
					</em>
					<div class="tab-box">
						<div class="order-trend">
							<div class="spr-title">
								<span class="spr-left"><em>学生绑卡情况(昨日)</em> <i class="icon-answer" @click="changeState('sginFlag')"></i></span>
							</div>
							<ul class="ratio-list">
								<li class="line1">
									<span>学生绑卡率</span>
									<em>{{listDate.bindCardRate}}</em>
								</li>
								<li class="line1">
									<span>家长人脸录入率</span>
									<em style="color:#FF5E68">{{listDate.recognitionPicUploadRate}}</em>
									<i v-show="listDate.recognitionPicUploadRateGrowth!='0.00%'" :style="parseFloat(listDate.recognitionPicUploadRateGrowth)>0?'color:#7ED321':'color:#FF5E68'">{{parseFloat(listDate.recognitionPicUploadRateGrowth)>0?'+'+listDate.recognitionPicUploadRateGrowth:listDate.recognitionPicUploadRateGrowth}}</i>
								</li>
							</ul>
							<div class="spr-title">
								<span class="spr-left"><em>学生签到情况(昨日)</em></span>
							</div>
							<ul class="sgin-info">
								<li><span>学生签到率</span><span>{{listDate.signRate}}</span></li>
								<li><span>人脸签到率</span><span style="color:#FF5E68">{{listDate.recognitionRate}}</span></li>
								<li><span>家长签到查看率</span><span>{{listDate.viewRate}}</span></li>
							</ul>
						</div>
					</div>
					<SginLine :listDate="listDate"></SginLine>
				</div>
			</div>
			<p class="spr-right" v-show="operation == 2">昨天({{date}})</p>
			<no-data :operation = 'operation == 2'></no-data>
		</div>
		<baseAlter ref="alert"></baseAlter>
		<swiperImage @change="isChoose = false" :chooseFlag="isChoose" :schoolPicUrl="baseInfo.schoolPicUrl"></swiperImage>
	</div>
</template>
<script>
import { setStore, toast, errorMsg, tongji, remove } from '@/utils/common'
import { ReportApi } from '@/api/index'
import NoData from '@/components/no-data'
import MHeader from '@/components/MHeader'
import ActiveBar from '@/components/activeBar'
import ratioBar from '@/components/ratioBar'
import swiperImage from '@/components/swiperImage'
import ActiveTable from './components/activeTable'
import LivelyTable from './components/livelyTable'
import ActiveLine from './components/activeLine'
import SginLine from './components/sginLine'
import PlayTable from './components/playTable'
import activationLine from './components/activationLine'
import orderBar from './components/orderBar'
import classBar from './components/classBar'
import weekBar from './components/weekBar'
import exportTable from './components/exportTable'
import baseAlter from './components/baseAlter'
import moment from 'moment'
export default {
	name: 'base-infrom',
	components: {
		NoData,
		MHeader,
		swiperImage,
		ratioBar,
		ActiveBar,
		ActiveTable,
		LivelyTable,
		baseAlter,
		ActiveLine,
		SginLine,
		PlayTable,
		activationLine,
		orderBar,
		classBar,
		weekBar,
		exportTable
	},
	data () {
		return {
			isChoose: false,
			operation: 0,
			titleTag: ['基础信息', '导入', '激活', '活跃', '付费', '签到'],
			titleTagIndex: 0,
			classNum: true,
			baseInfo: setStore('base') ? setStore('base') : '',
			infoInform: setStore('infoInform') ? setStore('infoInform') : '',
			state: ~~setStore('state') ? setStore('state') : 0,
			studentRatio: '',
			listDate: {},
			activationRatio: {
				ratio: null,
				targetValue: 4
			},
			studentActivationRateTargetValue: '',
			date: '',
			current: 0,
			activeDay: false,
			exportDate: '',
			payDate: ''
		}
	},
	beforeRouteEnter (to, from, next) {
		to.meta.type = to.params.type
		to.meta.schoolId = to.params.schoolId
		next()
	},
	mounted () {
		this.titleTagIndex = ~~this.$route.meta.type
		this.changeTab(this.titleTagIndex)
	},
	methods: {
		handleClose () {
			switch (~~this.$route.meta.type) {
			case 1:
				setStore('jumpPath') === 'report' ? this.$router.push({path: '/report'}) : this.$router.push({path: '/activation'})
				remove('jumpPath', 1)
				break
			case 2:
				setStore('jumpPath') === 'report' ? this.$router.push({path: '/report'}) : this.$router.push({path: '/activation'})
				remove('jumpPath', 1)
				break
			case 3:
				setStore('jumpPath') === 'report' ? this.$router.push({path: '/report'}) : this.$router.push({path: '/active'})
				remove('jumpPath', 1)
				break
			case 4:
				setStore('jumpPath') === 'report' ? this.$router.push({path: '/report'}) : this.$router.push({path: '/payTable'})
				remove('jumpPath', 1)
				break
			case 5:
				setStore('jumpPath') === 'report' ? this.$router.push({path: '/report'}) : this.$router.push({path: '/attendance'})
				remove('jumpPath', 1)
				break
			default:
				remove('jumpPath', 1)
				this.$router.push({path: '/report'})
			}
		},
		changeState (index) {
			if (index === 4) {
				this.$router.push('/classRatioExplain/1')
				return false
			}
			this.$refs.alert[index] = true
		},
		changeTab (index) {
			switch (this.titleTagIndex) {
			case 1:
				tongji('09_05_school_info_Import', '0')
				this.getExport()
				break
			case 2:
				tongji('09_02_school_info_activation', '0')
				this.current = 0
				this.selectPlay()
				break
			case 3:
				tongji('09_03_school_info_active', '0')
				this.current = 1
				this.selectRadio()
				break
			case 4:
				tongji('09_04_school_info_active', '0')
				this.getPayInfo()
				break
			case 5:
				tongji('09_06_school_info_attend', '0')
				this.schoolReportDetail()
				break
			default:
				tongji('09_01_school_info_basic', '0')
				if (!setStore('jumpPath')) {
					this.getBaseIfo()
				}
			}
		},
		chageCurrent (index) {
			this.current = index
		},
		changeTag (index) {
			this.titleTagIndex = index
			this.operation = 0
			this.changeTab(this.titleTagIndex)
		},
		getBaseIfo () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			params.userCenterIdDing = this.infoInform.userCenterId
			params.userType = this.infoInform.userType
			params.roleId = this.infoInform.roleId
			ReportApi.getAgentInfo(params, res => {
				if (res.code === 10000) {
					setStore('base', res.body)
					this.baseInfo = res.body
				} else {
					toast(res.msg)
					errorMsg('接口错误', res, params)
				}
			})
		},
		getExport () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			ReportApi.exportInfo(params, res => {
				if (res.code === 10000 && res.body.flagData) {
					this.listDate = Object.assign(res.body, this.listDate)
					this.operation = 1
					this.date = res.body.yesterdayStr
					this.activationRatio.ratio = res.body.importRatioDetail.parentImportRatio ? res.body.importRatioDetail.parentImportRatio : 0
					this.activationRatio.targetValue = res.body.importRatioDetail.parentImportRatioGoal
				} else {
					let date = moment().subtract('days', 1).format('M月D日')
					this.operation = 2
					this.date = date
					errorMsg('接口错误', res, params)
				}
			})
		},
		classCount (bAboveClassCount, trend) {
			this.$set(this.listDate, 'bAboveClassCount', bAboveClassCount)
			this.$set(this.listDate, 'trend', trend)
		},
		selectPlay () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			params.userCenterIdDing = this.infoInform.userCenterId
			ReportApi.getReportActivation(params, res => {
				if (res.code === 10000 && res.body.haveData) {
					this.date = res.body.date
					this.studentActivationRateTargetValue = res.body.studentActivationRateTargetValue
					this.activationRatio.ratio = res.body.parentsActivationRatio ? res.body.parentsActivationRatio : 0
					this.activationRatio.targetValue = res.body.activateTheRatioTargetValue
					this.operation = 1
					this.studentRatio = res.body
				} else {
					let date = moment().subtract('days', 1).format('M月D日')
					this.operation = 2
					this.date = res.body.date ? res.body.date : date
					errorMsg('接口错误', res, params)
				}
			})
		},
		selectRadio () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			params.userCenterIdDing = this.infoInform.userCenterId
			ReportApi.getReportAction(params, res => {
				if (res.code === 10000 && res.body.haveData) {
					this.listDate = res.body
					this.current = 0
					this.operation = 1
					this.date = res.body.date
				} else {
					this.date = moment().subtract('days', 1).format('M月D日')
					this.operation = 2
					errorMsg('接口错误', res, params)
				}
			})
		},
		getPayInfo () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			ReportApi.getPayInfo(params, res => {
				if (res.code === 10000 && res.body.flagData) {
					this.payDate = res.body
					this.operation = 1
					this.date = res.body.yesterdayStr
				} else {
					this.date = moment().subtract('days', 1).format('M月D日')
					this.operation = 2
					errorMsg('接口错误', res, params)
				}
			})
		},
		schoolReportDetail () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			ReportApi.schoolReportDetail(params, res => {
				if (res.code === 10000) {
					this.listDate = res.body
					this.operation = 1
				} else {
					this.date = moment().subtract('days', 1).format('M月D日')
					this.operation = 2
					errorMsg('接口错误', res, params)
				}
			})
		},
		schoolReportDetail () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			ReportApi.schoolReportDetail(params, res => {
				if (res.code === 10000) {
					this.listDate = res.body
					this.operation = 1
				} else {
					let time = moment().subtract('days', 1).format('YYYY-MM-DD').split('-')
					this.date = ~~time[1] + '月' + ~~time[2] + '日'
					this.operation = 2
					errorMsg('接口错误', res, params)
				}
			})
		},
		seeClassroom () {
			this.$refs.class.seeActiveReport()
		},
		openMap () {
			this.$router.push('/displayMap')
		},
		updateBaseInform () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			params.agentId = this.infoInform.id
			params.reportId = setStore('reportId')
			params.userCenterIdDing = this.infoInform.userCenterId
			ReportApi.updateBaseInform(params, res => {
				if (res.flag) {
					setStore('base', res.data)
					this.$router.push({path: `/updateBaseInform/${this.titleTagIndex}`})
				} else {
					toast(res.msg)
					errorMsg('接口错误', res, params)
				}
			})
		}
	}
}
</script>
<style lang="stylus" scoped>
	@import "./assets/base.styl"
</style>
