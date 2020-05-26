<template>
	<div>
		<dialogModal :isShow="sameAreaFlag" :sureShow="false">
			<div slot="content" class="alert_ul">
				<p class="title">温馨提示</p>
				<div class="message">
					<p>该学校不在您的代理区域，确定提交后可能导致以下后果：</p>
					<p>1、该学校无法转正，造成学校投入设备的损失，将由您独自承担；</p>
					<p>2、跨区报备扰乱市场情节严重者，将会处罚一定金额。</p>
					<ul class="foot">
						<li @click="sameAreaFlag = false">取消</li>
						<li @click="sureSameArea">确定</li>
					</ul>
				</div>
			</div>
		</dialogModal>
		<dialogModal :isShow="sameSchoolFlag" :sureShow="false">
			<div slot="content" class="alert_ul">
				<p class="title">温馨提示</p>
				<div class="message">
					<p>{{content}}</p>
					<ul class="foot">
						<li @click="sameSchoolFlag = false">取消</li>
						<li @click="sureSameSchool">确定</li>
					</ul>
				</div>
			</div>
		</dialogModal>
	</div>
</template>

<script>
import DialogModal from '@/components/dialogModal'
import { setSession, loading } from '@/utils/common'
import { ReportApi } from '@/api/index'
export default {
	name: 'sameSchool',
	components: {
		DialogModal
	},
	data () {
		return {
			sameAreaFlag: false,
			sameSchoolFlag: false,
			content: '',
			type: null
		}
	},
	mounted () {
		this.type = this.$route.meta.index
	},
	methods: {
		isSameArea () {
			let formData = new FormData()
			let areaCountyCode
			areaCountyCode = this.type ? this.$parent.baseInform.areaCountyCode : ''
			formData.append('areaCountyCode', setSession('areaCountyCode') ? setSession('areaCountyCode') : areaCountyCode)
			formData.append('agentId', this.$parent.infoInform.id)
			ReportApi.isSameArea(formData, res => {
				if (res.flag) {
					this.isSameSchool()
				} else {
					this.sameAreaFlag = true
				}
			})
		},
		sureSameArea () {
			this.sameAreaFlag = false
			this.isSameSchool()
		},
		sureSameSchool () {
			this.sameSchoolFlag = false
			loading('数据提交中...')
			this.$emit('submit')
		},
		isSameSchool () {
			let longitude = setSession('longitude') ? setSession('longitude') : this.$parent.baseInform.longitude
			let latitude = setSession('latitude') ? setSession('latitude') : this.$parent.baseInform.latitude
			let formData = new FormData()
			if (this.type) {
				formData.append('schoolId', this.$parent.baseInform.schoolId)
			}
			let schoolName, masterPhone, address
			schoolName = this.type ? this.$parent.baseInform.schoolName : this.$parent.formTab.schoolName
			masterPhone = this.type ? this.$parent.baseInform.masterPhone : this.$parent.formTab.masterPhone
			address = this.type ? this.$parent.baseInform.address : this.$parent.formTab.address
			formData.append('schoolName', schoolName)
			formData.append('areaProvCode', setSession('areaProvCode') ? setSession('areaProvCode') : this.$parent.baseInform.areaProvCode)
			formData.append('areaCityCode', setSession('areaCityCode') ? setSession('areaCityCode') : this.$parent.baseInform.areaCityCode)
			formData.append('areaCountyCode', setSession('areaCountyCode') ? setSession('areaCountyCode') : this.$parent.baseInform.areaCountyCode)
			formData.append('phone', masterPhone)
			formData.append('address', address)
			formData.append('longitude', longitude)
			formData.append('latitude', latitude)
			formData.append('coordinate', [longitude, latitude])
			ReportApi.isSameSchool(formData, res => {
				if (res.flag) {
					this.$emit('submit')
				} else {
					this.sameSchoolFlag = true
					this.content = res.msg
				}
			})
		}
	}
}
</script>

<style scoped>

</style>
