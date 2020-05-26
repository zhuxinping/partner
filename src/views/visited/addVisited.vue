<template>
	<div class="container">
		<div class="flex">
			<m-header @backClick="handleClose" headerTitle="新增拜访"></m-header>
			<div class="strategy" v-if="strategyFlag">
				<img class="tip" src="../../assets/images/icon_tips.png" alt="">
				<span @click="seeStrategy">点击查看《开视频园攻略》，助您收入翻倍~</span>
				<img @click="strategyFlag = false" class="tip_close" src="../../assets/images/icon_addvisited_close.png" alt="">
			</div>
		</div>
		<div class="main">
			<form ref="parent" action="" name="form">
				<ul class="from-table" :style="strategyFlag?'margin-top:0px': ''">
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">访问类型</span>
						<input name="visitedType" class="value-content" type="text" readonly v-model="productName" @click="commonOpen('访问类型')">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">学校名称</span>
						<input name="schoolName" class="value-content" type="text" readonly v-model="schoolName" placeholder="请选择学校" @click="selectSchoolName">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li class="table-li" >
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">拜访日期</span>
						<input name="visitedDay" class="value-content" type="text" readonly v-model="callDay" @click="visitedDay">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">拜访对象</span>
						<input name="visitedPerson" class="value-content" type="text" readonly v-model="visitedPerson" placeholder="请选择联系人" @click="selectPersonName">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">拜访方式</span>
						<input name="visitedWay" class="value-content" type="text" readonly v-model="callWay" @click="commonOpen('拜访方式')">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">商机名称</span>
						<input name="bussinessName" class="value-content" type="text" readonly v-model="formTab.businessName" placeholder="请选择" @click="commonOpen('商机名称')">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">商机进展</span>
						<input name="businessing" class="value-content" type="text" readonly v-model="formTab.businessing" placeholder="请选择" @click="commonOpen('商机进展')">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">意向度</span>
						<input name="liking" class="value-content" type="text" readonly v-model="formTab.likeDu"  placeholder="请选择"  @click="commonOpen('意向度')">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li class="table-li table-textarea">
						<div class="key-top">
							<img class="required" src="../../assets/images/list-asterisk.png" alt="">
							<span class="key-content key-span">拜访总结</span>
						</div>
						<div class="value-textarea">
							<textarea name="summary" v-model="formTab.summary" maxlength="500"></textarea>
							<span class="count">{{summaryLength}}/500字</span>
						</div>
					</li>
					<li class="table-li ">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<div class="value-content value-location">
							<img class="open-map" src="../../assets/images/list-location.png" alt="打开高德地图的API"  >
							<input name="visitedAddress"  class="value-content location-content" type="text" v-model="address" @click="locationAddress()" readonly placeholder="正在获取当前位置...">
						</div>
					</li>
					<li class="table-li table-camera">
						<v-upload ref="upload" :picValueList = 'picValueList' @change="changeImg"></v-upload>
					</li>
				</ul>
			</form>
			<footer>
				<ul class="table-button">
					<li @click="cancelFrom">取消</li>
					<li class="from" @click="submitFrom">提交</li>
				</ul>
			</footer>
		</div>
		<mt-datetime-picker class="time" ref="picker" type="date" v-model="pickerValue" @confirm="handleConfirm" :endDate="endDate" :startDate="startDate"></mt-datetime-picker>
		<v-dictionary type=1 :pickerFlag="pickerFlag" :code="code" :keyValue="description" :titleText="titleText" :keyArray="dictionaryArray" :defaultIndex = 'dictionaryIndex'
		@sureData = 'sureCommon' @changeStatus="changeStatus"></v-dictionary>
	</div>
</template>
<script>
import Vue from 'vue'
import { setSession, toast, errorMsg, tongji, setStore, dictionary, openLink } from '@/utils/common'
import { ReportApi } from '@/api/index'
import { DatetimePicker } from 'mint-ui'
import MHeader from '@/components/MHeader'
import VUpload from '@/components/v-upload'
import VDictionary from '@/components/dictionary'
import Location from '@/mixins/location'
import Validate from '@/mixins/vaildate'
import moment from 'moment'
Vue.component(DatetimePicker.name, DatetimePicker)
export default {
	name: 'add-visited',
	components: {
		MHeader,
		VUpload,
		VDictionary
	},
	data () {
		return {
			jumpUrl: '',
			strategyFlag: true,
			formTab: {
				businessName: '',
				businessing: '',
				likeDu: '',
				summary: ''
			},
			schoolName: '',
			visitedPerson: '',
			callWay: '上门拜访',
			callDay: '',
			summaryLength: 0,
			schoolTypeId: '',
			wayValue: [],
			businessingValue: [],
			likeDuValue: [],
			businessNameValue: [],
			infoInform: setStore('infoInform') ? setStore('infoInform') : {},
			submitFlag: true,
			timeTamp: '',
			pickerValue: new Date(),
			startDate: new Date('2010-01-01'),
			endDate: new Date('2030-12-31'),
			popupVisible: false,
			description: '', // 数据字典展示的字段
			code: '', // 数据字段判断的字段
			titleText: '',
			dictionaryArray: [],
			visitedType: [{name: '智慧校园', code: 1}, {name: '时光集', code: 2}],
			dictionaryIndex: '',
			pickerFlag: false,
			picValueList: [],
			info: '',
			productType: 1,
			productName: '智慧校园'
		}
	},
	mixins: [Location, Validate],
	beforeRouteEnter (to, from, next) {
		if (from.name === 'Ztvisited' || from.name === 'ztreportIndex') {
			to.meta.isBack = true
		}
		if (from.name === 'ztreportIndex') {
			to.meta.path = 1
		}
		if (from.name === 'Ztvisited') {
			to.meta.path = 0
		}
		if (from.name) {
			to.meta.info = to.params.info
		} else {
			to.meta.info = 'null'
		}
		next()
	},
	activated () {
		this.infoInform = setStore('infoInform')
		this.info = this.$route.meta.info === 'null' ? '' : JSON.parse(this.$route.meta.info)
		this.schoolName = this.info.schoolName
		this.visitedPerson = this.info.userName
		this.submitFlag = true
		this.strategyFlag = true
		this.formTab.businessName = setSession('businessName') ? setSession('businessName') : ''
		this.schoolTypeId = this.info.schoolType
		this.locationAddress()
		if (this.$route.meta.isBack) {
			// 清理已有商品列表的数据，重新请求数据，如果不清除的话就会有之前的商品缓存，延迟显示最新的商品
			for (let key in this.formTab) {
				this.formTab[key] = ''
			}
			this.picValueList = []
			this.callWay = ~~setSession('callWayIndex') === 2 ? '电话拜访' : '上门拜访'
			this.productName = ~~setSession('productTypeIndex') === 2 ? '时光集' : '智慧校园'
			this.productType = ~~setSession('productTypeIndex') === 2 ? 2 : 1
			this.$refs.upload.photoLength = 0
			this.callDay = moment().format('MM-DD') + '  ' + moment().format('HH:mm')
			this.timeTamp = moment().format('YYYY-MM-DD') + ' ' + moment().format('HH:mm:ss')
		}
		this.$route.meta.isBack = false
	},
	mounted () {
		this.getInformation()
		this.getUrl()
		this.callDay = moment().format('MM-DD') + '  ' + moment().format('HH:mm')
		this.timeTamp = moment().format('YYYY-MM-DD') + ' ' + moment().format('HH:mm:ss')
		this.$nextTick(() => {
			this.endDate = new Date(moment().add(10, 'years').format('YYYY/MM/DD'))
		})
		sessionStorage.clear()
	},
	methods: {
		timeFilters (value) {
			if (value < 10) {
				value = '0' + value
			} else {
				value = '' + value
			}
			return value
		},
		getUrl () {
			let params = {}
			params.userCenterIdDing = this.infoInform.userCenterId
			ReportApi.getStrategy(params, res => {
				if (res.flag) {
					this.jumpUrl = res.data
				}
			})
		},
		handleClose () {
			sessionStorage.clear()
			~~this.$route.meta.path === 0 ? this.$router.push('/visited') : this.$router.push('/report')
		},
		changeImg (arrImg) {
			this.picValueList = arrImg
		},
		seeStrategy () {
			if (this.jumpUrl) {
				tongji('02_01_call_no_noticebar', '1')
				openLink(this.jumpUrl)
			} else {
				this.strategyFlag = false
			}
		},
		// 获取学校名称
		selectSchoolName () {
			if (this.photoIng()) {
				this.$router.push({path: '/selectSchool/1'})
			}
		},
		selectPersonName () {
			if (this.photoIng()) {
				if (this.info) {
					this.$router.push({path: `/selectPop/1/${JSON.stringify(this.info)}`})
				} else {
					toast('请先选择学校！')
					return false
				}
			}
		},
		photoIng () {
			let flag = false
			if (this.picValueList.length) {
				this.picValueList.forEach((item, i) => {
					if (item.picUrl1.length === 0) {
						flag = true
					}
				})
				if (flag) {
					toast('图片正在上传,请稍后再选择联系人！')
				}
			}
			return flag ? 0 : 1
		},
		visitedDay () {
			this.$refs.picker.open()
		},
		handleConfirm (data) {
			let date = moment(data).format('MM-DD')
			let now = moment(new Date()).format('YYYY-MM-DD')
			let yearDate = moment(data).format('YYYY-MM-DD')
			if (now === yearDate) {
				this.callDay = date + ' ' + this.timeFilters(new Date().getHours()) + ':' + this.timeFilters(new Date().getMinutes())
				this.timeTamp = yearDate + ' ' + this.timeFilters(new Date().getHours()) + ':' + this.timeFilters(new Date().getMinutes()) + ':00'
			} else {
				this.callDay = date + ' ' + '00:00'
				this.timeTamp = yearDate + ' ' + '00:00:00'
			}
		},
		getInformation () {
			dictionary('VISIT_THE_WAY', 1).then(res => {
				this.wayValue = res
			})
			dictionary('BUSINESS_INFO_TYPE', 1).then(res => {
				this.businessingValue = res
			})
			dictionary('INTENTIONALITY', 1).then(res => {
				this.likeDuValue = res
			})
			dictionary('OPPORTUNITY_NAME', 1).then(res => {
				this.businessNameValue = res
			})
		},
		commonOpen (title) {
			this.titleText = title
			this.code = 'code'
			this.dictionaryIndex = null
			if (this.titleText === '拜访方式') {
				this.description = 'name'
				this.dictionaryArray = this.wayValue
				let index = 0
				this.wayValue.forEach((item, i) => {
					if (item.code === 1) {
						index = i
					}
				})
				this.dictionaryIndex = setSession('callWayDefault') ? ~~setSession('callWayDefault') : index
			} else if (this.titleText === '商机名称') {
				this.description = 'description'
				this.dictionaryArray = this.businessNameValue
				this.dictionaryIndex = setSession('businessingNameDefault') ? ~~setSession('businessingNameDefault') : 0
			} else if (this.titleText === '商机进展') {
				this.description = 'name'
				this.dictionaryArray = this.businessingValue
				this.dictionaryIndex = setSession('businessingDefault') ? ~~setSession('businessingDefault') : 0
			} else if (this.titleText === '访问类型') {
				this.description = 'name'
				this.dictionaryArray = this.visitedType
				this.dictionaryIndex = setSession('productTypeDefault') ? ~~setSession('productTypeDefault') : 0
			} else {
				this.description = 'name'
				this.dictionaryArray = this.likeDuValue
				this.dictionaryIndex = setSession('likeDuDefault') ? ~~setSession('likeDuDefault') : 0
			}
			this.pickerFlag = true
		},
		changeStatus () {
			this.dictionaryIndex = null
			this.pickerFlag = false
		},
		sureCommon (titleText, value, index) {
			this.dictionaryIndex = index
			if (titleText === '拜访方式') {
				this.callWay = value[index].name
				setSession('callWayIndex', value[index].code)
				setSession('callWayDefault', index.toString())
			} else if (titleText === '商机名称') {
				this.formTab.businessName = value[index].description
				setSession('businessingNameIndex', value[index].code)
				setSession('businessingNameDefault', index.toString())
			} else if (titleText === '商机进展') {
				this.formTab.businessing = value[index].name
				setSession('businessingIndex', value[index].code)
				setSession('businessingDefault', index.toString())
			} else if (titleText === '访问类型') {
				this.productName = value[index].name
				setSession('productTypeIndex', value[index].code)
				setSession('productTypeDefault', index.toString())
				if (this.productType !== value[index].code) {
					this.schoolName = ''
					this.visitedPerson = ''
					this.productType = value[index].code
				}
			} else {
				this.formTab.likeDu = value[index].name
				setSession('likeDuIndex', value[index].code)
				setSession('likeDuDefault', index.toString())
			}
			this.pickerFlag = false
		},
		submitFrom () {
			if (this.submitFlag && this.validate()) {
				let formData = new FormData()
				formData.append('callOnVo.schoolId', this.info.schoolId)
				formData.append('callOnVo.schoolType', this.schoolTypeId)
				formData.append('callOnVo.callOnTime', this.timeTamp)
				formData.append('callOnVo.callOnPersonnel', this.infoInform.agentChildAccount ? this.infoInform.agentChildName : this.infoInform.agentName)
				formData.append('callOnVo.processResult', this.formTab.summary)
				let aa
				if (this.address === '获取当前位置超时，请点击这一行,重新获取！') {
					aa = '获取当前定位超时！'
				} else if (this.address === '获取当前位置失败，请点击这一行,重新获取！') {
					aa = '获取当前位置失败!'
				} else {
					aa = this.address
				}
				formData.append('callOnVo.location', aa)
				if (this.picValueList.length) {
					let flag = false
					this.picValueList.forEach((item, i) => {
						if (item.picUrl1.length === 0) {
							flag = true
						}
						formData.append('callOnVo.callOnActionPicList[' + i + '].picUrl', item.picUrl1)
						formData.append('callOnVo.callOnActionPicList[' + i + '].isFlag', item.isFlag)
						formData.append('callOnVo.callOnActionPicList[' + i + '].picType', item.picType)
					})
					if (flag) {
						toast('图片正在上传,请稍后再提交！')
						return
					}
				}
				formData.append('callOnVo.businessId', setSession('businessingIndex'))
				formData.append('callOnVo.intentionality', setSession('likeDuIndex'))
				formData.append('callOnVo.visitWayId', setSession('callWayIndex') ? setSession('callWayIndex') : 1)
				formData.append('callOnVo.productType', this.productType)
				formData.append('callOnVo.businessOpportunity', setSession('businessingNameIndex'))
				formData.append('callOnVo.createId', 2)
				formData.append('callOnVo.agentId', this.infoInform.id)
				formData.append('callOnVo.callOnContacts', this.info.userNameBack)
				formData.append('callOnVo.schoolContactsId', this.info.id)
				formData.append('userCenterIdDing', this.infoInform.userCenterId)
				formData.append('callOnVo.longitude', setSession('longitude'))
				formData.append('callOnVo.latitude', setSession('latitude'))
				this.submitFlag = false
				ReportApi.submitVisited(formData, res => {
					if (res.flag) {
						sessionStorage.clear()
						this.$router.push({name: 'Ztvisited', query: { status: this.productType }})
					} else {
						this.submitFlag = true
						toast(res.msg)
						errorMsg('接口错误', res, formData)
					}
				}).catch((error) => {
					this.submitFlag = true
					toast('提交异常，请检查网络或者联系管理员！')
					errorMsg('catch错误', error, {})
				})
			}
		},
		cancelFrom () {
			sessionStorage.clear()
			~~this.$route.meta.path === 0 ? this.$router.push('/visited') : this.$router.push('/report')
		}
	},
	watch: {
		'formTab.summary' (newV, oldV) {
			this.summaryLength = newV.length
		}
	}
}
</script>
