<template>
	<div class="container">
		<div class="flex">
			<m-header @backClick="handleClose" headerTitle="报备修改"></m-header>
		</div>
		<div class="main">
			<form ref="parent" action="" name="form">
				<ul class="from-table">
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">学校名称</span>
						<input class="value-content" type="text" maxlength="100" placeholder="请输入学校名称" v-model="baseInform.schoolName">
					</li>
					<li class="business">
						<div class="bussiness-top">
							<img class="required" src="../../assets/images/list-asterisk.png" alt="">
							<span class="key-content">营业执照或实景</span>
						</div>
						<v-upload class="business-bg" :headerImage="baseInform.schoolPicUrl" @change="chageHeaderImage"></v-upload>
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">学校账号</span>
						<input name="username" class="value-content" type="text" maxlength="20" v-model="baseInform.username" placeholder="请输入学校账号">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">密码</span>
						<input name='password' class="value-content" type="password" maxlength="16" v-model="baseInform.password" placeholder="请输入密码">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">重复密码</span>
						<input name='repeatPassword' class="value-content" type="password" maxlength="16" v-model="baseInform.password" placeholder="请再一次输入密码">
					</li>
					<li class="table-li" >
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">地区</span>
						<input name="region" class="value-content" type="text" readonly v-model="region" placeholder="请选择" @click="selectAddress">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">详细地址</span>
						<input name="address" class="value-content" type="text" maxlength="100" v-model="baseInform.address" placeholder="详细地址">
					</li>
					<li @click="openMap" class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">坐标</span>
						<input name="mapAddress" class="value-content" type="text" readonly v-model="baseInform.mapAddress" placeholder="">
						<img class="map" src="../../assets/images/list-location.png" alt="打开高德地图的API" >
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">所属代理商</span>
						<input name="agent" class="value-content" type="text" placeholder="掌通家园代理商" readonly v-model="baseInform.agentName">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">所属管理区域</span>
						<input name="responsePlace" class="value-content" type="text" readonly v-model="baseInform.areaName" @click="selectAllArea" >
						<img  class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">园长姓名</span>
						<input name="linkman" class="value-content" type="text" v-model="baseInform.linkman" placeholder="请输入园长姓名" maxlength="20">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">园长联系方式</span>
						<input name="masterPhone" class="value-content" type="text" v-model="baseInform.masterPhone" maxlength="11" placeholder="请输入园长联系方式">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">学生数</span>
						<input name="studentNumber" class="value-content" type="type" v-model="baseInform.studentNumber" maxlength="8" placeholder="请输入学生数">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">班级数</span>
						<input name="classNumber" class="value-content" type="type" v-model="baseInform.classNumber" maxlength="8" placeholder="请输入班级数">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span name="schPrice" class="key-content">学费金额</span>
						<input class="value-content" type="type" v-model="baseInform.schPrice" maxlength="8" placeholder="请输入学费金额">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">学费单位</span>
						<input name="priceUnit" class="value-content" type="text" readonly v-model="priceUnitText" placeholder="请选择" @click="selectDictionary('学费单位')">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">家长试用天数</span>
						<input name="dataNum" class="value-content" type="text" readonly v-model="baseInform.dataNum" placeholder="请选择" @click="selectDictionary('家长试用天数')">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">行业类型</span>
						<input name="selectClass" class="value-content" type="text" readonly v-model="selectClass" placeholder="请选择" @click="selectDictionary('行业类型')">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li  class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">园所特色</span>
						<input name="gardenSpecial" class="value-content" type="text" readonly v-model="baseInform.characteristicName" placeholder="请选择" @click="selectDictionary('园所特色')">
						<img class="back"  src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li  class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">业务来源</span>
						<input name="sourceBusiness" class="value-content" type="text" readonly v-model="baseInform.businessSourceName" placeholder="请选择" @click="selectDictionary('业务来源')">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
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
		<v-address :addressFlag = addressFlag @change="addressFlag = false" @sureAddress="sureAddress"></v-address>
		<v-dictionary :type="dictionaryType" :pickerFlag="pickerFlag" :code="code" :keyValue="description" :titleText="titleText" :keyArray="dictionaryArray" :defaultIndex = 'dictionaryIndex'
		@sureData = 'sureCommon' @changeStatus="changeStatus"></v-dictionary>
		<sameSchool ref="child" @submit="sureSubmit"></sameSchool>
	</div>
</template>
<script>
import { setSession, setStore, toast, errorMsg, dictionary, remove } from '@/utils/common'
import { ReportApi } from '@/api/index'
import MHeader from '@/components/MHeader'
import VAddress from '@/components/v-address'
import VDictionary from '@/components/dictionary'
import Vaildate from '@/mixins/vaildate'
import VUpload from './components/upload'
import SameSchool from './components/sameSchool'
export default {
	name: 'update-base-inform',
	components: {
		MHeader,
		VUpload,
		VAddress,
		VDictionary,
		SameSchool
	},
	mixins: [Vaildate],
	data () {
		return {
			infoInform: setSession('infoInform'),
			titleText: '',
			tryDay: [{name: '0', code: 0}, {name: '1', code: 1}, {name: '2', code: 2}, {name: '3', code: 3}, {name: '4', code: 4}, {name: '5', code: 5}, {name: '6', code: 6}, {name: '7', code: 7}],
			priceUnit: [{name: '元/月', code: 1}, {name: '元/季度', code: 2}, {name: '元/学期', code: 3}],
			garden: [],
			moenySource: [],
			addressFlag: false,
			pickerFlag: false,
			dictionaryArray: [],
			dictionaryIndex: '',
			description: '',
			dictionaryType: 1,
			code: '',
			region: '',
			priceUnitText: '',
			selectClass: '',
			baseInform: '', // 修改信息的信息流
			submitFlag: false
		}
	},
	beforeRouteEnter (to, from, next) {
		if (from.name === 'ztreportIndex') {
			to.meta.isBack = true
		}
		if (from.name === 'ztreportBaseInfrom' || from.name === 'ztreportIndex') {
			to.meta.index = to.params.index
		}
		next()
	},
	mounted () {
		this.setFirst()
		this.getInformation()
		// this.baseInform = setStore('base')
	},
	methods: {
		handleClose () {
			sessionStorage.clear()
			if (~~this.$route.meta.index === 10000) {
				this.$router.push('/report')
			} else {
				this.$router.push(`/reportBaseInfrom/${this.$route.meta.index}/${this.baseInform.schoolId}`)
			}
		},
		setFirst () {
			this.infoInform = setStore('infoInform')
			this.baseInform = setSession('base') ? setSession('base') : setStore('base')
			let region = this.baseInform.provName + this.baseInform.cityName + this.baseInform.countryName
			this.region = setSession('region') ? setSession('region') : region
			this.priceUnitText = setSession('priceUnitText') ? setSession('priceUnitText') : this.baseInform.priceUnit === 1 ? '元/月' : this.baseInform.priceUnit === 2 ? '元/季度' : '元/学期'
			this.selectClass = setSession('selectClass') ? setSession('selectClass') : this.baseInform.industryTypeName + this.baseInform.industryTypeStageName
		},
		getInformation () {
			dictionary('SCHOOL_FEATURE', 1).then(res => {
				this.garden = res
			})
			dictionary('BUSINESS_SOURCE', 1).then(res => {
				this.moenySource = res
			})
		},
		sureAddress (dirAddress, areaProvCode, areaCityCode, areaCountyCode) {
			this.baseInform.areaProvCode = areaProvCode
			this.baseInform.areaCityCode = areaCityCode
			this.baseInform.areaCountyCode = areaCountyCode
			this.region = dirAddress
		},
		openMap () {
			this.setKey()
			this.$router.push('/reportMap/0')
		},
		setKey () {
			setSession('priceUnitText', this.priceUnitText)
			setSession('region', this.region)
			setSession('selectClass', this.selectClass)
			setSession('areaProvCode', this.baseInform.areaProvCode)
			setSession('areaCityCode', this.baseInform.areaCityCode)
			setSession('areaCountyCode', this.baseInform.areaCountyCode)
			setSession('industryType', this.baseInform.industryType)
			setSession('industryTypeStage', this.baseInform.industryTypeStage)
			setSession('base', this.baseInform)
		},
		selectAllArea () {
			this.setKey()
			this.$router.push({path: `/allArea/0/${this.baseInform.areaId}/${this.baseInform.areaName}`})
		},
		selectAddress () {
			this.setKey()
			this.addressFlag = true
		},
		changeStatus () {
			this.dictionaryIndex = null
			this.pickerFlag = false
		},
		selectDictionary (titleText) {
			this.titleText = titleText
			this.code = 'code'
			this.dictionaryType = 1
			this.description = 'name'
			this.dictionaryIndex = null
			if (titleText === '学费单位') {
				this.dictionaryArray = this.priceUnit
				this.dictionaryIndex = this.baseInform.priceUnit - 1
			} else if (titleText === '家长试用天数') {
				this.dictionaryArray = this.tryDay
				this.dictionaryIndex = setSession('specialIndex') ? setSession('specialIndex') : this.baseInform.dataNum
			} else if (titleText === '园所特色') {
				this.dictionaryArray = this.garden
				let code = this.baseInform.characteristic
				this.garden.forEach((item, i) => {
					if (item.code === code) {
						this.dictionaryIndex = i
					}
				})
			} else if (titleText === '业务来源') {
				let code = this.baseInform.businessSource
				this.dictionaryArray = this.moenySource
				this.moenySource.forEach((item, i) => {
					if (item.code === code) {
						this.dictionaryIndex = i
					}
				})
			} else if (titleText === '行业类型') {
				this.setKey()
				this.description = 'description'
				this.dictionaryType = 2
				this.code = 'name'
			}
			this.pickerFlag = true
		},
		sureCommon (titleText, value, index, value1, index1) {
			this.dictionaryIndex = index
			this.dictionaryArray = []
			if (titleText === '学费单位') {
				this.priceUnitText = value[index].name
				setSession('freeModelDefaultIndex', index.toString())
				this.baseInform.priceUnit = value[index].code
			} else if (titleText === '家长试用天数') {
				this.baseInform.dataNum = value[index].name
				setSession('tryDayDefaultIndex', index.toString())
			} else if (titleText === '园所特色') {
				this.baseInform.characteristicName = value[index].name
				this.baseInform.characteristic = value[index].code
			} else if (titleText === '业务来源') {
				this.baseInform.businessSourceName = value[index].name
				this.baseInform.businessSource = value[index].code
			} else if (titleText === '行业类型') {
				this.dictionaryType = 2
				this.selectClass = value[index].description + value1[index1].description
				this.baseInform.industryType = value[index].name
				this.baseInform.industryTypeStage = value1[index1].name
			}
			this.pickerFlag = false
			this.dictionaryIndex = ''
		},
		chageHeaderImage (url) {
			this.baseInform.schoolPicUrl = url
		},
		submitFrom () {
			if (this.baseInform.schoolName === '') {
				toast('学校名称不能为空！')
			} else if (this.baseInform.schoolPicUrl === '') {
				toast('营业执照或实景不能为空！')
			} else {
				if (this.validate()) {
					this.$refs.child.isSameArea()
				}
			}
		},
		sureSubmit () {
			this.submitFlag = true
		},
		submit () {
			let formData = new FormData()
			for (let key in this.baseInform) {
				if (key !== 'coordinate') {
					formData.append('reportSchoolEntityVO.' + key, this.baseInform[key])
				}
			}
			formData.append('reportSchoolEntityVO.coordinate', [this.baseInform.longitude, this.baseInform.latitude])
			formData.append('userCenterIdDing', this.infoInform.userCenterId)
			ReportApi.updateReport(formData, res => {
				if (res.flag) {
					sessionStorage.clear()
					setStore('firstComeIn', '1')
					remove('jumpPath', 1)
					this.$router.push('/report')
				} else {
					/* global dd */
					dd.device.notification.hidePreloader({})
					toast(res.msg)
					this.submitFlag = false
					errorMsg('接口错误', res, formData)
				}
			}).catch((error) => {
				dd.device.notification.hidePreloader({})
				this.submitFlag = false
				toast('提交异常，请检查网络或者联系管理员！')
				errorMsg('catch错误', error, {})
			})
		},
		cancelFrom () {
			this.handleClose()
		}
	},
	watch: {
		submitFlag (newV, oldV) {
			if (newV) {
				this.submit()
			}
		}
	}
}
</script>
