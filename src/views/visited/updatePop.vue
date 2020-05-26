<template>
	<div class="container">
		<div class="flex">
			<m-header @backClick="handleClose" headerTitle="修改联系人"></m-header>
		</div>
		<div class="main">
			<form ref="parent" action="" name="form">
				<ul class="from-table">
					<li class="table-li" >
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span  class="key-content">角色</span>
						<input name="role" class="value-content" type="text" readonly v-model="roleInfo.roleTypeName" @click="selectRole" placeholder="请选择">
						<img class="back" src="../../assets/images/list-arrow.png" alt="">
					</li>
					<li class="table-li">
						<img class="required" src="../../assets/images/list-asterisk.png" alt="">
						<span class="key-content">姓名</span>
						<input name="roleName" class="value-content" type="text" maxlength="20" v-model="roleInfo.userName" placeholder="请输入">
					</li>
					<li class="table-li">
						<span class="key-content no-require">手机号码</span>
						<input name="rolePhone" class="value-content" type="text" maxlength="11" v-model="roleInfo.phone" placeholder="请输入">
					</li>
					<li class="table-li">
						<span class="key-content no-require">微信</span>
						<input class="value-content" type="text" maxlength="20" v-model="roleInfo.wechat" placeholder="请输入">
					</li>
					<li class="table-li table-textarea">
						<div class="key-top">
							<span  class="key-content key-span no-require">备注</span>
						</div>
						<div class="value-textarea">
							<textarea v-model="roleInfo.remark" maxlength="50"></textarea>
							<span class="count">{{remarkLength}}/50字</span>
						</div>
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
		<v-dictionary type="1" :pickerFlag="pickerFlag" code="code" keyValue="description" titleText="选择角色" :keyArray="dictionaryArray" :defaultIndex = 'dictionaryIndex'
			@sureData = 'sureRole' @changeStatus="changeStatus"></v-dictionary>
	</div>
</template>
<script>
import { setStore, setSession, toast, errorMsg, dictionary } from '@/utils/common'
import { ReportApi } from '@/api/index'
import MHeader from '@/components/MHeader'
import VDictionary from '@/components/dictionary'
import Validate from '@/mixins/vaildate'
export default {
	name: 'update-pop',
	components: {
		MHeader,
		VDictionary
	},
	mixins: [Validate],
	data () {
		return {
			remarkLength: 0,
			pickerFlag: false,
			dictionaryArray: [],
			dictionaryIndex: null,
			submitFlag: true,
			infoInform: setStore('infoInform'),
			roleInfo: setSession('roleInfo')
		}
	},
	beforeRouteEnter (to, from, next) {
		to.meta.type = to.params.type
		to.meta.schoolId = to.params.schoolId
		to.meta.schoolTypeId = to.params.schoolTypeId
		to.meta.info = to.params.info
		next()
	},
	mounted () {
		dictionary('CONTACTS_ROLE_TYPE', 1).then(res => {
			this.roleValue = res
		})
		this.remarkLength = this.roleInfo.remark.length
	},
	methods: {
		handleClose () {
			this.$router.push({path: `/selectPop/${this.$route.meta.type}/${this.$route.meta.info}`})
		},
		selectRole () {
			this.roleValue.forEach((item, index) => {
				if (item.code === this.roleInfo.roleType) {
					setSession('roleDefault', index)
					setSession('roleCode', item.code)
				}
			})
			this.dictionaryArray = this.roleValue
			this.dictionaryIndex = setSession('roleDefault') ? ~~setSession('roleDefault') : 0
			this.pickerFlag = true
		},
		changeStatus () {
			this.dictionaryIndex = null
			this.pickerFlag = false
		},
		sureRole (titleText, value, index) {
			this.roleInfo.roleTypeName = value[index].description
			setSession('roleDefault', index)
			setSession('roleCode', value[index].code)
			this.pickerFlag = false
		},
		submitFrom () {
			if (this.submitFlag && this.validate()) {
				let formData = new FormData()
				formData.append('contactsDTO.id', this.roleInfo.id)
				formData.append('contactsDTO.schoolId', this.$route.meta.schoolId)
				formData.append('contactsDTO.schoolType', this.$route.meta.schoolTypeId)
				formData.append('contactsDTO.roleType', setSession('roleCode') ? setSession('roleCode') : 1)
				formData.append('contactsDTO.userName', this.roleInfo.userName)
				formData.append('contactsDTO.phone', this.roleInfo.phone)
				formData.append('contactsDTO.wechat', this.roleInfo.wechat.trim())
				formData.append('contactsDTO.remark', this.roleInfo.remark)
				formData.append('contactsDTO.updatePersonId', this.infoInform.id)
				formData.append('userCenterIdDing', this.infoInform.userCenterId)
				this.submitFlag = false
				ReportApi.addRole(formData, res => {
					if (res.flag) {
						this.$router.push({path: `/selectPop/${this.$route.meta.type}/${this.$route.meta.info}`})
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
		cancelFrom: function () {
			this.$router.push({path: `/selectPop/${this.$route.meta.type}/${this.$route.meta.info}`})
		}
	},
	watch: {
		'roleInfo.remark' (newV, oldV) {
			this.remarkLength = newV.length
		}
	}
}
</script>
