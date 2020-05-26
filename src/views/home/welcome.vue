<template>
   <div></div>
</template>

<script>
import { setStore, loading, errorMsg } from '@/utils/common'
import { ReportApi } from '@/api/index'
import { mapGetters } from 'vuex'
export default {
	name: 'welcome',
	data () {
		return {
			data: {},
			code: '',
			cc_address: '',
			cc_component: ''
		}
	},
	computed: {
		...mapGetters({
			dingding: 'Config/getConfig'
		})
	},
	created () {
		loading('使劲加载中...')
		this.getDDcode(this.dingding)
	},
	methods: {
		getDDcode (e) {
			const that = this
			/* global dd */
			// that.$router.push('/login')
			dd.runtime.permission.requestAuthCode({
				corpId: e.corpId, // 企业id
				onSuccess: function (info) {
					let params = {}
					params.code = info.code
					ReportApi.getFreeLogin(params, res => {
						if (res.flag) {
							localStorage.clear()
							setStore('infoInform', res.data)
							that.$router.push('/home')
						} else {
							that.$router.push('/login')
						}
					}).catch((error) => {
						errorMsg('catch错误', error, {})
					})
				},
				onFail: function (error) {
					errorMsg('dingding免等进去失败方法', error, {})
				}
			})
		}
	}
}
</script>

<style scoped>

</style>
