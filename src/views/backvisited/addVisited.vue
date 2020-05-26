<template>
	<div class="container">
		<div class="flex">
			<m-header @backClick="handleClose" headerTitle="新增客户回访"></m-header>
		</div>
		<div class="main">
			<form ref="parent" action="" name="form">
				<ul class="from-table">
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span  class="key-content">回访类型</span>
						<input class="value-content" type="text" readonly v-model="productName" @click="commonOpen('回访类型')">
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
						<span  class="key-content">回访日期</span>
						<input class="value-content" type="text" readonly v-model="callDay" @click="openTime">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
						<mt-datetime-picker class="time" ref="picker" type="date" v-model="pickerValue" @confirm="handleConfirm" :endDate="endDate" :startDate="startDate"></mt-datetime-picker>
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span  class="key-content">回访对象</span>
						<input name="returnPerson" class="value-content" type="text" readonly v-model="visitedPerson" placeholder="请选择联系人" @click="selectPersonName">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span  class="key-content">回访方式</span>
						<input class="value-content" type="text" readonly v-model="returnWay" @click="commonOpen('回访方式')">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li class="back-type">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">回访类型</span>
						<input type="hidden" name="returnType" v-model="returnTypeIndex">
						<p @click="selectType(index, item.code, item.description)" class="value-type" :class="returnTypeCode==index?'click-span':''" v-for="(item, index) in typeValue" :key="index">{{item.name}}</p>
					</li>
					<ul class="children-select" v-if="returnTypeIndex==8?true:false">
						<li class="children-li" v-for="(item, index) in children_select" :key="index" >
							<span class="checkcont" >
								<input type="checkbox" :id='"checked"+index' v-model="item.check"/>
								<label :for='"checked"+index'></label>
							</span>
							<span class="span" @click="selectChild(index, item.code, item.check)">{{item.name}}</span>
						</li>
					</ul>
					<li class="table-li table-textarea">
						<div class="key-top">
							<img class="required" src="../../assets/images/list-asterisk.png" alt="">
							<span  class="key-content key-span">回访内容</span>
						</div>
						<div class="value-textarea">
							<textarea name="returnSummary" v-model="summary" maxlength="500"></textarea>
							<span class="count">{{summaryLength}}/500字</span>
						</div>
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<div class="value-content value-location">
							<img class="open-map" src="../../assets/images/list-location.png" alt="打开高德地图的API"  >
							<input class="value-content location-content" type="text" v-model="address" @click="locationAddress()" readonly placeholder="正在获取当前位置...">
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
		<v-dictionary type=1 :pickerFlag="pickerFlag" code="code" keyValue="name" :titleText="titleText" :keyArray="dictionaryArray" :defaultIndex = 'dictionaryIndex'
		@sureData = 'sureCommon' @changeStatus="changeStatus"></v-dictionary>
	</div>
</template>
<script>
import Vue from 'vue'
import { setSession, setStore, toast, errorMsg, dictionary } from '@/utils/common'
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
			schoolName: '',
			visitedPerson: '',
			schoolTypeId: '',
			callDay: '',
			returnWay: '上门回访',
			infoInform: setStore('infoInform'),
			returnType: '',
			wayValue: [],
			typeValue: [],
			popupVisible: false,
			summaryLength: 0,
			submitFlag: true,
			timeTamp: '',
			pickerValue: new Date(),
			startDate: new Date('2010-01-01'),
			endDate: new Date('2030-12-31'),
			returnTypeIndex: '',
			returnTypeCode: null,
			summary: '',
			children_select: [],
			pickerFlag: false,
			dictionaryArray: [],
			dictionaryIndex: null,
			picValueList: [],
			info: '',
			titleText: '',
			productName: '智慧校园',
			visitedType: [{name: '智慧校园', code: 1}, {name: '时光集', code: 2}],
			productType: 1
		}
	},
	mixins: [Location, Validate],
	beforeRouteEnter (to, from, next) {
		if (from.name === 'Ztbackvisited') {
			to.meta.isBack = true
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
		this.schoolTypeId = this.info.schoolType
		this.dictionaryIndex = null
		this.locationAddress()
		if (this.$route.meta.isBack) {
			// 清理已有商品列表的数据，重新请求数据，如果不清除的话就会有之前的商品缓存，延迟显示最新的商品
			this.picValueList = []
			this.returnTypeIndex = ''
			this.returnTypeCode = null
			this.summary = ''
			this.children_select = []
			this.returnWay = ~~setSession('returnWayIndex') === 1 ? '电话回访' : ~~setSession('returnWayIndex') === 2 ? '远程服务' : '上门回访'
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
		handleClose () {
			sessionStorage.clear()
			this.$router.push('/backvisited')
		},
		changeImg (arrImg) {
			this.picValueList = arrImg
		},
		getInformation () {
			dictionary('RETURN_VISIT_WAY', 1).then(res => {
				this.wayValue = res
			})
			dictionary('RETURN_VISIT_TYPE', 1).then(res => {
				this.typeValue = res
			})
		},
		// 获取学校名称
		selectSchoolName () {
			if (this.photoIng()) {
				this.$router.push({path: '/selectSchool/0'})
			}
		},
		selectPersonName () {
			if (this.photoIng()) {
				if (this.info) {
					this.$router.push({path: `/selectPop/0/${JSON.stringify(this.info)}`})
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
		openTime () {
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
		commonOpen (title) {
			let index = 0
			this.titleText = title
			if (this.titleText === '回访方式') {
				this.wayValue.forEach((item, i) => {
					if (item.code === 3) {
						index = i
					}
				})
				this.dictionaryArray = this.wayValue
				this.dictionaryIndex = setSession('returnWayDefault') ? parseInt(setSession('returnWayDefault')) : index
			} else {
				this.dictionaryArray = this.visitedType
				this.dictionaryIndex = setSession('productTypeDefault') ? ~~setSession('productTypeDefault') : 0
			}
			this.pickerFlag = true
		},
		changeStatus () {
			this.dictionaryIndex = null
			this.pickerFlag = false
		},
		sureCommon (titleText, value, index) {
			if (titleText === '回访方式') {
				this.returnWay = value[index].name
				setSession('returnWayIndex', value[index].code)
				setSession('returnWayDefault', index.toString())
			} else {
				this.productName = value[index].name
				setSession('productTypeIndex', value[index].code)
				setSession('productTypeDefault', index.toString())
				if (this.productType !== value[index].code) {
					this.schoolName = ''
					this.visitedPerson = ''
					this.productType = value[index].code
				}
			}
			this.pickerFlag = false
		},
		selectType (index, code, description) {
			this.returnTypeCode = index
			this.returnTypeIndex = code
			dictionary(description, 1).then(res => {
				this.children_select = res.reverse()
			})
		},
		onCommonSlots (picker, values) {
			if (values[0]) {
				let index = 0
				this.commonSlots[0].values.forEach((v, i) => {
					if (v.code === values[0].code) {
						index = i
					}
				})
				this.commonSlots[0].defaultIndex = index
			}
		},
		selectChild (index, code, flag) {
			flag = !flag
			this.$set(this.children_select[index], 'check', flag)
		},
		removeSession () {
			sessionStorage.clear()
		},
		getvisitSubType () {
			let getType = ''
			let arr = []
			this.children_select.forEach(item => {
				if (item.check) {
					arr.push(item.code)
				}
			})
			getType = arr.join(',')
			return getType
		},
		submitFrom () {
			if (this.submitFlag && this.validate()) {
				let params = {}
				params.schoolId = this.info.schoolId
				params.createId = 2
				params.visitTime = this.timeTamp
				params.returnVisitContacts = this.info.userNameBack
				params.schoolContactsId = setSession('schoolContactsId')
				params.creatorId = this.infoInform.id
				params.visitPersonId = this.infoInform.id
				params.visitorName = this.infoInform.trueName
				params.creatorName = this.infoInform.trueName
				params.updaterName = this.infoInform.trueName
				params.agentId = this.infoInform.id
				params.visitorUserCenterId = this.infoInform.userCenterId
				params.creatorUserCenterId = this.infoInform.userCenterId
				params.updaterUserCenterId = this.infoInform.userCenterId
				params.visitContent = this.summary
				params.visitWay = setSession('returnWayIndex') ? setSession('returnWayIndex') : 3
				params.productType = this.productType
				params.visitType = this.returnTypeIndex
				params.schoolType = this.schoolTypeId
				params.createMethod = 2
				params.visitSubType = this.getvisitSubType()
				let aa
				if (this.address === '获取当前位置超时，请点击这一行,重新获取！') {
					aa = '获取当前定位超时！'
				} else {
					aa = this.address
				}
				params.location = aa
				params.userCenterIdDing = this.infoInform.userCenterId
				if (this.picValueList.length) {
					let flag = false
					this.picValueList.forEach((item, i) => {
						if (item.picUrl1.length === 0) {
							flag = true
						}
					})
					if (flag) {
						toast('图片正在上传,请稍后再提交！')
						return false
					}
				}
				if (this.picValueList.length) {
					this.picValueList.forEach((item, i) => {
						if (item.picUrl) {
							item.picUrl = item.picUrl1
						}
					})
				}
				params.returnVisitPicList = this.picValueList
				params.longitude = setSession('longitude')
				params.latitude = setSession('latitude')
				this.submitFlag = false
				ReportApi.addReturnVisit(params, res => {
					if (res.code === 10000) {
						sessionStorage.clear()
						this.$router.push({name: 'Ztbackvisited', query: { status: this.productType }})
						// this.$router.push('/backvisited')
					} else {
						this.submitFlag = true
						toast(res.msg)
						errorMsg('接口错误', res, params)
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
			this.$router.push('/backvisited')
		}
	},
	watch: {
		summary (newV, oldV) {
			this.summaryLength = newV.length
		}
	}
}
</script>
