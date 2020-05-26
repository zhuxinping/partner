<template>
	<div class="sgj-ct sgj-home">
		<Sheader @tfd="tabData" chosenFlag="1" stitle="成长时光集" ref="picker">
			<ul class="sgj-ct-layer" slot="sgjDialog">
				<li class="sgj-ct-title">以下数据仅包含您负责的学校</li>
				<li>
					<p class="raito">日活跃时光集班级占比:</p>
					当天至少完成1个时光集页面的班级/创建时光集的班级数
				</li>
				<li>
					<p class="raito">日活跃时光集占比:</p>
					当天至少完成1个页面的时光集/已发布的时光集册数
				</li>
				<li>
					<p class="raito">累计页面完成占比:</p>
					已完成的总页面数/需要完成的总页面数
				</li>
				<li>
					<p class="raito">累计页面完成率:</p>
					已完成的总页面数/需要完成的总页面数*100%
				</li>
				<li>
					<p class="raito">累计完成占比:</p>
					已完本的时光集/已发布的时光集册数
				</li>
				<li>
					<p class="raito">累计购买数:</p>
					截止当前购买且支付成功的时光集数量
				</li>
			</ul>
		</Sheader>

		<div class="sgj-ct-tips">
			您负责的园所共{{jdata.classNum || 0}}个班级，其中{{jdata.publishedClassNum || 0}}个班级已发布了时光集，班级创建率为<span>{{jdata.createClassRate || '0%'}}</span>
		</div>
		<a class="sgj-ct-bd" @click="sgjDetail">
			<ul class="sgj-ct-list">
				<li class="lbd1">
					<span class="td-key">日活跃时光集班级占比</span>
					<span class="td-svalue">{{jdata.dayActiveAlbumClassRatio}}</span>
				</li>
				<li class="lbd2">
					<span class="td-key">日活跃时光集占比</span>
					<span class="td-svalue">{{jdata.dayActiveAlbumRatio}}</span>
				</li>
				<li class="lbd1 lbd3">
					<span class="td-key">累计页面完成占比</span>
					<span class="td-svalue">{{jdata.pageCompletedRatio}}</span>
				</li>
				<li class="lbd2">
					<span class="td-key">累计页面完成率</span>
					<span class="td-svalue">
						{{jdata.pageCompletedRate}}
						<template v-if="pageRateFlag">
							<i :class="pageRateState ? '' : 'sgj-red' ">{{pageRateState ? '+' : ''}}{{jdata.pageCompletedChangeRate}}</i>
						</template>
					</span>
				</li>
				<li class="lbd5">
					<span class="td-key">累计完本占比</span>
					<span class="td-svalue">{{jdata.completedAlbumRatio}}</span>
				</li>
				<li class="lbd6">
					<span class="td-key">累计购买数</span>
					<span class="td-svalue">
						{{purchasedNum}}
						<i  v-if="parseFloat(jdata.purchasedChangeNum)" :class="parseFloat(jdata.purchasedChangeNum) > 0 ? '' : 'sgj-red'">{{parseFloat(jdata.purchasedChangeNum) > 0 ? '+' : ''}}{{jdata.purchasedChangeNum}}</i>
					</span>
				</li>
			</ul>
		</a>
	</div>
</template>
<script>
import { ReportApi } from '@/api/index'
import { setSession, setStore, tongji } from '@/utils/common'
import Sheader from './sheader'
export default {
	name: 'HomeSgj',
	components: {
		Sheader
	},
	data () {
		return {
			stime: '',
			infoInform: setStore('infoInform'),
			jdata: {},
			purchasedNum: '',
			pageRateFlag: 0,
			pageRateState: 0
		}
	},
	methods: {
		chosenPicker () {
			this.$refs.picker.chosenPicker()
		},
		sgjDetail () {
			tongji('00_time_set_report', '1')
			let sdata = {
				sdate: this.stime
				// ,type: 1
			}
			setSession('sFormsData', JSON.stringify(sdata))
			this.$router.push({name: 'formsSchoolList'})
		},
		tabData (t, fn) {
			if (t) { this.stime = t }

			let _this = this
			ReportApi.homeSgjTabData({
				'agentId': this.infoInform.id,
				'endDate': t.replace(/\//g, '-'),
				'agentChildAccount': this.infoInform.agentChildAccount
			}, res => {
				if (res.code === 10000) {
					_this.jdata = Object.assign({
						dayActiveAlbumClassRatio: '0/0',
						dayActiveAlbumRatio: '0/0',
						pageCompletedRatio: '0/0',
						pageCompletedRate: '0.00%',
						completedAlbumRatio: '0/0',
						purchasedNum: '0'
					}, res.body || {})
					let r = _this.jdata.pageCompletedChangeRate
					_this.pageRateFlag = r && r !== '0.00%' ? 1 : 0
					_this.pageRateState = (_this.pageRateFlag && parseFloat(r)) > 0 ? 1 : 0
					_this.purchasedNum = _this.jdata.purchasedNum
					// fn && fn()
				}
			})
		}
	}
}
</script>
<style scoped lang="stylus">
	@import "./index.styl"
</style>
