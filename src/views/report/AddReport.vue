<template>
	<div class="container">
		<div class="flex">
			<m-header @backClick="handleClose" headerTitle="报备申请"></m-header>
		</div>
		<div  class="main">
			<form ref="parent" action="" name="form">
				<ul class="from-table">
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">学校名称</span>
						<input class="value-content" type="text" maxlength="100" placeholder="请输入学校名称" v-model="formTab.schoolName">
					</li>
					<li class="business">
						<div class="bussiness-top">
							<img class="required" src="../../assets/images/list-asterisk.png" alt="">
							<span class="key-content">营业执照或实景</span>
						</div>
						<v-upload ref='upload' class="business-bg"  :headerImage="formTab.schoolPicUrl" @change="chageHeaderImage"></v-upload>
					</li>
					<li  class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">学校账号</span>
						<input name="username" class="value-content" type="text" maxlength="20" v-model="formTab.username" placeholder="请输入学校账号">
					</li>
					<li  class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">密码</span>
						<input name='password' class="value-content" type="password" maxlength="16" v-model="formTab.password" placeholder="请输入密码">
					</li>
					<li  class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">重复密码</span>
						<input name='repeatPassword' class="value-content" type="password" maxlength="16" v-model="formTab.repeatPassword" placeholder="请再一次输入密码">
					</li>
					<li class="table-li" >
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">地区</span>
						<input name="region" class="value-content" type="text" readonly v-model="formTab.region" placeholder="请选择" @click="addressFlag=true">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li  class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">详细地址</span>
						<input name="address" class="value-content" type="text" maxlength="100" v-model="formTab.address" placeholder="详细地址" >
					</li>
					<li @click="openMap" class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">坐标</span>
						<input name="mapAddress" class="value-content" type="text" readonly v-model="formTab.mapAddress" placeholder="">
						<img class="map" src="../../assets/images/list-location.png" alt="打开高德地图的API" >
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">所属代理商</span>
						<input name="agent" class="value-content" type="text" placeholder="掌通家园代理商" readonly v-model="agent">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">所属管理区域</span>
						<input name="responsePlace" class="value-content" type="text" readonly v-model="responsePlace" @click="selectAllArea">
						<img  class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li  class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">园长姓名</span>
						<input name="linkman" class="value-content" type="text" v-model="formTab.linkman" placeholder="请输入园长姓名" maxlength="20">
					</li>
					<li  class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">园长联系方式</span>
						<input name="masterPhone" class="value-content" type="text" v-model="formTab.masterPhone" maxlength="11" placeholder="请输入园长联系方式">
					</li>
					<li  class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">学生数</span>
						<input name="studentNumber" class="value-content" type="text" v-model="formTab.studentNumber" maxlength="8" placeholder="请输入学生数">
					</li>
					<li  class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">班级数</span>
						<input name="classNumber" class="value-content" ref="content9" type="text" v-model="formTab.classNumber" maxlength="8" placeholder="请输入班级数">
					</li>
					<li  class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">学费金额</span>
						<input name="schPrice" class="value-content" ref="content10" type="text" v-model="formTab.schPrice" maxlength="8" placeholder="请输入学费金额">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">学费单位</span>
						<input name="priceUnit" class="value-content" type="text" readonly v-model="formTab.priceunit" placeholder="请选择" @click="selectDictionary('学费单位')">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">家长试用天数</span>
						<input name="dataNum" class="value-content" type="text" readonly v-model="formTab.dataNum" placeholder="请选择" @click="selectDictionary('家长试用天数')">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">行业类型</span>
						<input name="selectClass" class="value-content" type="text" readonly v-model="formTab.selectClass" placeholder="请选择" @click="selectDictionary('行业类型')">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li  class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">园所特色</span>
						<input name="gardenSpecial" class="value-content" type="text" readonly v-model="formTab.gardenSpecial" placeholder="请选择" @click="selectDictionary('园所特色')">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li  class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">业务来源</span>
						<input name="sourceBusiness" class="value-content" type="text" readonly v-model="formTab.sourceBusiness" placeholder="请选择" @click="selectDictionary('业务来源')">
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
		<v-dictionary ref="dictionary" :type="dictionaryType" :pickerFlag="pickerFlag" :code="code" :keyValue="description" :titleText="titleText" :keyArray="dictionaryArray" :defaultIndex = 'dictionaryIndex'
			@sureData = 'sureCommon' @changeStatus="changeStatus"></v-dictionary>
		<sameSchool ref="child" @submit="submitFlag = true"></sameSchool>
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
	name: 'add-report',
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
			formTab: {
				schoolName: '', // 学校名称
				schoolPicUrl: '', // 营业执照
				username: '', // 学校账号
				password: '', // 密码
				repeatPassword: '', // 重复密码
				region: '', // 区域
				address: '', // 详细地址
				mapAddress: '', // 坐标
				linkman: '', // 园长姓名
				masterPhone: '', // 园长联系方式
				studentNumber: '', // 学生数
				classNumber: '', // 班级数
				schPrice: '', // 学费金额
				priceunit: '', // 学费单位
				dataNum: '', // 试用天数
				selectClass: '', // 行业类型
				gardenSpecial: '', // 园所特色
				sourceBusiness: '' // 业务来源
			},
			agent: '',
			responsePlace: '默认区域',
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
			submitFlag: false
		}
	},
	beforeRouteEnter (to, from, next) {
		if (from.name === 'ztreportIndex') {
			to.meta.isBack = true
		}
		next()
	},
	activated () {
		this.submitFlag = false
		this.$refs.child.sameAreaFlag = false
        this.$refs.child.sameSchoolFlag = false
		if (this.$route.meta.isBack) {
			// 清理已有商品列表的数据，重新请求数据，如果不清除的话就会有之前的商品缓存，延迟显示最新的商品
			for (let key in this.formTab) {
				this.formTab[key] = ''
			}
			this.$refs.dictionary.getBig()
			this.$refs.upload.photoFlag = false
		}
		this.infoInform = setStore('infoInform')
		this.formTab = setSession('formTab') ? setSession('formTab') : this.formTab
		this.agent = this.infoInform.agentName
		this.formTab.mapAddress = setSession('mapAddress') ? setSession('mapAddress') : this.formTab.mapAddress
		this.responsePlace = setSession('responsePlace') ? setSession('responsePlace') : '默认区域'
		this.$route.meta.isBack = false
	},
	mounted () {
		this.agent = this.infoInform.agentName
		this.responsePlace = '默认区域'
		this.getInformation()
		sessionStorage.clear()
	},
	methods: {
		handleClose () {
			sessionStorage.clear()
			this.$router.push('/report')
		},
		getInformation () {
			dictionary('SCHOOL_FEATURE', 1).then(res => {
				this.garden = res
			})
			dictionary('BUSINESS_SOURCE', 1).then(res => {
				this.moenySource = res
			})
		},
		chageHeaderImage (url) {
			this.formTab.schoolPicUrl = url
		},
		sureAddress (dirAddress) {
			this.formTab.region = dirAddress
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
				this.dictionaryIndex = setSession('freeModelDefaultIndex') ? ~~setSession('freeModelDefaultIndex') : 0
			} else if (titleText === '家长试用天数') {
				this.dictionaryArray = this.tryDay
				this.dictionaryIndex = setSession('tryDayDefaultIndex') ? ~~setSession('tryDayDefaultIndex') : 0
			} else if (titleText === '园所特色') {
				this.dictionaryArray = this.garden
				this.dictionaryIndex = setSession('specialDefaultIndex') ? ~~setSession('specialDefaultIndex') : 0
			} else if (titleText === '业务来源') {
				this.dictionaryArray = this.moenySource
				this.dictionaryIndex = setSession('selectFromDefaultIndex') ? ~~setSession('selectFromDefaultIndex') : 0
			} else if (titleText === '行业类型') {
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
				this.formTab.priceunit = value[index].name
				setSession('freeModelDefaultIndex', index.toString())
				setSession('priceUnit', value[index].code)
			} else if (titleText === '家长试用天数') {
				this.formTab.dataNum = value[index].name
				setSession('tryDayDefaultIndex', index.toString())
				setSession('tryDayIndex', value[index].code)
			} else if (titleText === '园所特色') {
				this.formTab.gardenSpecial = value[index].name
				setSession('specialDefaultIndex', index.toString())
				setSession('characteristic', value[index].code)
			} else if (titleText === '业务来源') {
				this.formTab.sourceBusiness = value[index].name
				setSession('selectFromDefaultIndex', index.toString())
				setSession('businessSource', value[index].code)
			} else if (titleText === '行业类型') {
				this.dictionaryType = 2
				this.formTab.selectClass = value[index].description + value1[index1].description
				setSession('industryType', value[index].name)
				setSession('industryTypeStage', value1[index1].name)
			}
			this.pickerFlag = false
			this.dictionaryIndex = ''
		},
		openMap () {
			setSession('formTab', this.formTab)
			this.$router.push('/reportMap/1')
		},
		selectAllArea () {
			setSession('formTab', this.formTab)
			let id = setSession('agentAreaId') ? setSession('agentAreaId') : 1
			this.$router.push({path: `/allArea/1/${id}/${this.responsePlace}`})
		},
		submitFrom () {
			if (this.formTab.schoolName === '') {
				toast('学校名称不能为空！')
			} else if (this.formTab.schoolPicUrl === '') {
				toast('营业执照或实景不能为空！')
			} else {
				if (this.validate()) {
					this.$refs.child.isSameArea()
				}
			}
		},
		submit () {
			let formData = new FormData()
			for (let key in this.formTab) {
				this.formTab[key] = this.formTab[key].trim()
				formData.append('reportSchoolEntityVO.' + key, this.formTab[key])
			}
			formData.append('reportSchoolEntityVO.agentId', this.infoInform.id)
			formData.append('reportSchoolEntityVO.mobilePay', 0)
			formData.append('reportSchoolEntityVO.invite', 1)
			formData.append('reportSchoolEntityVO.chargeType', 2)
			let array = ['areaProvCode', 'areaCityCode', 'areaCountyCode', 'priceUnit', 'industryType', 'industryTypeStage', 'characteristic', 'businessSource', 'longitude', 'latitude', 'mapAddress']
			array.forEach(item => {
				formData.append('reportSchoolEntityVO.' + item, setSession(item))
			})
			formData.append('reportSchoolEntityVO.coordinate', [setSession('longitude'), setSession('latitude')])
			formData.append('reportSchoolEntityVO.areaId', setSession('agentAreaId') ? setSession('agentAreaId') : 1)
			for (let key in this.infoInform) {
				formData.append('agentUser.' + key, this.infoInform[key] === null ? '' : this.infoInform[key])
			}
			// formData.append('agentUser.agentChildId', this.infoInform.agentChildId === null ? '' : this.infoInform.agentChildId)
			formData.append('agentUser.userCenterIdDing', this.infoInform.userCenterId)
			ReportApi.submitReport(formData, res => {
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
			sessionStorage.clear()
			this.$router.push('/report')
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
