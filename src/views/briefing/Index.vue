<template>
	<div class="container" :style="operation?'':'background-color:#fff'">
		<div v-if="operation">
			<div class="container-in">
				<div class="header"><i class="icon-back" @click="goBack"></i><span>经营简报</span></div>
				<div class="brief-info">
					<div class="today-sum-title" v-if="indexData.dateToday">今天({{indexData.dateToday}})订单金额合计</div>
					<div class="today-sum"><i class="icon-rmb">￥</i> <span>{{indexData.totalOrderAmonut| numFilter | numThousand }}</span></div>
					<ul class="pay-tab" v-if="indexData">
						<li>
							<span>付费学校数</span>
							<em>{{indexData.paidSchoolTotal | numThousand}}</em>
						</li>
						<li>
							<span>付费学生数</span>
							<em>{{indexData.paidStudentTotal | numThousand}}</em>
						</li>
						<li class="active">
							<span>付费家长数</span>
							<em>{{indexData.paidParentTotal | numThousand}}</em>
						</li>
					</ul>
				</div>
			</div>
			<ul class="list" v-code="'OPERATION_BRIEF_MENU_LIST'">
				<li @click="toLink(1)">
					<span>
						<i class="icon-order"></i>订单分析
					</span>
					<span>昨天订单
						<em>{{indexData.yesterdayOrderAmonut|numFilter | numThousand}}</em>元
						<i class="icon-right"></i>
					</span>
				</li>
				<li @click="toLink(2)">
					<span>
						<i class="icon-garden"></i>开园分析
					</span>
					<span> 昨天正式园
							<i class="icon-add" :class="schoolTend? 'icon-reduce': ''"></i>
							<em :class="schoolTend? 'active': ''">{{indexData.formalSchoolChangeTotal |numAbs | numThousand }}</em>家
							<i class="icon-right"></i>
					</span>
				</li>
				<li @click="toLink(3)">
					<span>
						<i class="icon-active"></i>激活分析
					</span>
					<span> 昨天激活比
							<em>{{indexData.activeThan |numAbs | numFilter | numThousand }}</em>
							<i class="icon-right"></i>
					</span>
				</li>
				<li @click="toLink(4)">
					<span>
						<i class="icon-lively"></i>活跃分析
					</span>
					<span>昨天月均日活家长
						<em>{{indexData.activeThatMonthParent | numFilter | numThousand }}</em>人
						<i class="icon-right"></i>
					</span>
				</li>
			</ul>
		</div>
		<div v-else>
			<MHeader @backClick="goBack" headerTitle="经营简报"></MHeader>
			<no-data :operation = '!operation'></no-data>
		</div>
	</div>
</template>
<script>
import MHeader from '@/components/MHeader'
import NoData from '@/components/no-data'
import { ReportApi } from '@/api/index'
import { setStore, tongji, toast } from '../../utils/common'
export default {
	name: 'index',
	components: {
		MHeader,
		NoData
	},
	data () {
		return {
			infoInform: setStore('infoInform'),
			operation: true,
			indexData: {
				dateToday: '',
				totalOrderAmonut: '',
				paidSchoolTotal: '',
				paidStudentTotal: '',
				paidParentTotal: '',
				yesterdayOrderAmonut: '',
				formalSchoolChangeTotal: '',
				activeThatMonthParent: '',
				activeThan: ''
			},
			schoolTend: 0
		}
	},
	mounted () {
		this.getData()
		tongji('04_01_managementreport ', '0')
	},
	methods: {
		goBack () {
			tongji('04_01_back', '1')
			this.$router.push('/home')
		},
		// 跳转
		toLink (index) {
			if (index === 1) {
				tongji('04_01_order', '1')
				this.$router.push('/orderAnalyzing')
			} else if (index === 2) {
				tongji('04_01_customer', '1')
				this.$router.push('/gardenAnalyzing')
			} else if (index === 3) {
				tongji('04_01_customer', '1')
				this.$router.push('/activeAnalyzing')
			} else {
				tongji('04_01_activate', '1')
				this.$router.push('/livelyAnalyzing')
			}
		},
		getData () {
			let params = {}
			params.id = this.infoInform.id
			params.userCenterIdDing = this.infoInform.userCenterId
			ReportApi.BriefReport(params, res => {
				if (res.flag) {
					this.operation = true
					this.indexData = res.data
					this.schoolTend = this.indexData.formalSchoolTendency
				} else {
					toast(res.msg)
					this.operation = false
				}
			})
		}
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped >
	@import "./assest/index.styl"
</style>
