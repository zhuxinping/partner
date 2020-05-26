<template>
	<div class="home-bg">
		<m-header @backClick="handleClose" headerTitle="掌通伙伴"></m-header>
		<img class="home-banner" src="../../assets/images/loading-photo.png" alt="">
		<ul class="home-operation">
			<li class="home-login"><i class="icon"></i><input type="text" maxlength="20" v-model="userName" placeholder="请输入代理商后台的主账号或子账号" ></li>
			<li class="home-login"><i class="icon pass"></i><input type="password" maxlength="16" v-model="password" placeholder="请输入密码"></li>
			<li class="radio-input"><span class="checkcont" ><input type="checkbox" v-model='selectPasswordFlag' id='checked' /><label  for='checked'></label></span><span @click="selectPasswordFlag = !selectPasswordFlag">记住我的登录信息</span></li>
			<li @click="sure" class="button">登录</li>
		</ul>
	</div>
</template>
<script>
import { setStore, tongji, toast, errorMsg, close } from '@/utils/common'
import { ReportApi } from '@/api/index'
import { mapGetters } from 'vuex'
import MHeader from '@/components/MHeader'
export default {
	name: 'index',
	components: {
		MHeader
	},
	data () {
		return {
			userName: '',
			password: '',
			selectPasswordFlag: false,
			submitFlag: true
		}
	},
	computed: {
		...mapGetters({
			dingding: 'Config/getConfig',
			startTime: 'Config/startTime'
		})
	},
	mounted () {
		sessionStorage.clear()
		localStorage.clear()
	},
	methods: {
		handleClose () {
			close()
		},
		sure () {
			const that = this
			if (this.userName === '') {
				toast('账号不能为空！')
			} else if (this.password === '') {
				toast('密码不能为空！')
			} else {
				if (this.submitFlag) {
					this.submitFlag = false
					/* global dd */
					dd.runtime.permission.requestAuthCode({
						corpId: that.dingding.corpId, // 企业id
						onSuccess: function (info) {
							let formData = new FormData()
							formData.append('logNo', that.userName)
							formData.append('logPass', that.password)
							formData.append('isRememberAccount', that.selectPasswordFlag ? 'true' : 'false')
							formData.append('code', info.code)
							ReportApi.login(formData, res => {
								sessionStorage.clear()
								if (res.flag) {
									setStore('infoInform', res.data)
									tongji('00_Login', '1')
									that.$router.push('/home')
								} else {
									that.submitFlag = true
									toast(res.msg)
									errorMsg('接口错误', res, formData)
								}
							}).catch((error) => {
								that.submitFlag = true
								errorMsg('catch错误', error, {})
							})
						},
						onFail: function (error) {
							errorMsg('钉钉免等进入失败方法', error, {})
						}
					})
				}
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
	@import "./assets/index.styl"
</style>
