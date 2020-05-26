<template>
	<div class="container" :style="dateFlag == 2?'background:#fff':''">
		<div class="flex">
			<m-header @backClick="handleClose" :headerTitle="schoolName"></m-header>
			<span class="right-text">实时数据</span>
			<ul v-show='dateFlag == 1?true:false' class="class-room">
				<li class="class-room-li"  v-for="(item, index) in listDate" :key="index" @click="openSutdentReport(item.classId, index)">
					<div class="class-room-text" :class="selectClassIndex === index? 'select-class':''">
						<span class="grade">{{item.gradeName}}</span>
						<span  class="grade">{{item.className}}</span>
					</div>
				</li>
			</ul>
			<div v-show="dateFlag == 1?true:false" class="student">
				<p class="student-text">这学期本班订单金额<em>{{totalOrderAmount | numFilter  | numThousand}}</em>元，学生付费率<em>{{studentPaymentRate * 100 | numFilter }}%</em>，有<em>{{studentNumber | numThousand}}</em>个学生的<em>{{parentNumber | numThousand}}</em>个家长已付费</p>
				<span class="eg">* 数据示例：贝贝(2/5)  贝贝有5个家长，其中2个家长已付费</span>
				<ul class="header_student">
					<li><span>已付费</span><span>{{zeroList.length}}人</span></li>
					<li><span>未付费 已激活</span><span>{{oneList.length}}人</span></li>
					<li><span>未付费 未激活</span><span>{{twoList.length}}人</span></li>
				</ul>
			</div>
		</div>
		<div class="main" :style="dateFlag == 2?'background:#fff':''">
			<div v-show="dateFlag == 1?true:false" class="student_data">
				<div class="student_outer">
					<ul class="tbody_student">
						<li v-if="maxLength!==0"> <div v-for="index in maxLength" :key="index"><span>{{zeroList[index-1]?zeroList[index-1].name: ''}}</span><em v-if="zeroList.length&&zeroList[index-1]">({{zeroList[index-1].parentPaidNumber?zeroList[index-1].parentPaidNumber:0}}/{{zeroList[index-1].parentNumber?zeroList[index-1].parentNumber:0}})</em></div></li>
						<li v-if="maxLength!==0"> <div v-for="index in maxLength" :key="index"><span>{{oneList.length&&oneList[index-1]?oneList[index-1].name: ''}}</span><em v-if="oneList.length&&oneList[index-1]">({{oneList.length&&oneList[index-1].parentPaidNumber?oneList.length&&oneList[index-1].parentPaidNumber:0}}/{{oneList.length&&oneList[index-1].parentNumber?oneList.length&&oneList[index-1].parentNumber:0}})</em></div></li>
						<li v-if="maxLength!==0"> <div v-for="index in maxLength" :key="index"><span>{{twoList.length&&twoList[index-1]?twoList[index-1].name: ''}}</span><em v-if="twoList.length&&twoList[index-1]">({{twoList.length&&twoList[index-1].parentPaidNumber?twoList[index-1].parentPaidNumber:0}}/{{twoList.length&&twoList[index-1].parentNumber?twoList[index-1].parentNumber:0}})</em></div></li>
					</ul>
				</div>
			</div>
			<no-data :operation = 'dateFlag == 2?true:false'></no-data>
		</div>
	</div>
</template>
<script>
import { setStore, errorMsg, tongji } from '@/utils/common'
import { ReportApi } from '@/api/index'
import NoData from '@/components/no-data'
import MHeader from '@/components/MHeader'
export default {
	name: 'payClass',
	components: {
		NoData,
		MHeader
	},
	data () {
		return {
			infoInform: setStore('infoInform'),
			schoolName: '',
			listDate: [],
			dateFlag: 0,
			selectClassIndex: 0,
			zeroList: [],
			oneList: [],
			twoList: [],
			maxLength: 0,
			totalOrderAmount: 0,
			studentNumber: 1,
			studentPaymentRate: 0,
			parentNumber: 0
		}
	},
	beforeRouteEnter (to, from, next) {
		to.meta.schoolName = to.params.schoolName
		to.meta.schoolId = to.params.schoolId
		next()
	},
	mounted () {
		this.schoolName = this.$route.meta.schoolName
		this.getData()
		tongji('09_04_school_info_payment_class', '0')
	},
	methods: {
		handleClose () {
			this.$router.push({path: `/reportBaseInfrom/4/${this.$route.meta.schoolId}`})
		},
		openSutdentReport (classId, index) {
			this.selectClassIndex = index
			let params = {}
			params.classId = classId
			ReportApi.classPay(params, res => {
				if (res.code === 10000) {
					this.dateFlag = 1
					this.parentNumber = res.body.parentNumber
					this.studentNumber = res.body.studentNumber
					this.studentPaymentRate = res.body.studentPaymentRate
					this.totalOrderAmount = res.body.totalOrderAmount
					this.zeroList = res.body.payList.studentNameList
					this.oneList = res.body.noPayActList.studentNameList
					this.twoList = res.body.noPayNoActList.studentNameList
					this.maxLength = Math.max(this.zeroList.length, this.oneList.length, this.twoList.length)
				} else {
					this.dateFlag = 2
					errorMsg('接口错误', res, params)
				}
			})
		},
		getData () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			ReportApi.getPayInfoClass(params, res => {
				if (res.code === 10000) {
					this.dateFlag = 1
					this.listDate = res.body.classPayList
					if (res.body && res.body.classPayList) {
						this.openSutdentReport(res.body.classPayList[0].classId, 0)
					}
				} else {
					this.dateFlag = 2
					errorMsg('接口错误', res, params)
				}
			}).catch((error) => {
				this.dateFlag = 2
				errorMsg('catch错误', error, {})
			})
		}
	}
}
</script>
<style lang="stylus" scoped>
	@import "./assets/classroom.styl"
	.class-room
		.class-room-li
			.class-room-text
				color #818D9D
				background #f2f3f5
			.select-class
				background-color #E1F2FA
				color #297391
			.select-class:after
				content ''
				width 0
				height 0
	.student
		padding 0 20px
		.student-text
			padding 20px 0 8px
		.eg
			font-size 24px
			color #BBBBBD
			display block
			text-align left
			padding-bottom 23px
			background-color #fff
	.header_student
		height 88px
		display flex
		background #f3fbff
		border 2.1px solid #eee
		border-right 0
		li
			font-size 24px
			color #818D9D
			flex 1
			display flex
			border-right 2.1px solid #eee
			flex-direction column
			align-items center
			padding-top 10px
	.student_data
		background #f2f3f5
		height 100%
		position relative
		flex 1
		overflow-y auto
		.student_outer
			padding 0 20px
			background #fff
			padding-bottom 30px
			.tbody_student
				border-right 2.1px solid #eee
				display flex
				li
					flex 1
					font-size 0
					display flex
					flex-direction column
					align-items center
					color #818D9D
					border-left 2.1px solid #eee
					div
						flex 1
						width 100%
						height 80px
						line-height 80px
						border-bottom 2.1px solid #eee
						display flex
						align-items center
						justify-content center
						span
							display inline-block
							font-size 24px
							max-width 150px
							text-align right
							overflow hidden
							text-overflow ellipsis
							white-space nowrap
						em
							font-size 24px
							margin-left 10px

</style>
