<template>
<div class="arpu-bar">
	<span class="spr-left"><em>本学期(截止到昨天)</em><i class="icon-answer" @click="playFlag = true"></i><span class="spr-right">目标值</span></span>
	<ul class="ab-content">
		<li @click="hideTip(1)">
			<div class="ab-left">
				ARPU值
			</div>
			<div class="ab-mid">
				<span class="num" ref="num1" @click="showTip(1)">
					<i v-show="showNum1">{{trueArpu | numFilter | numThousand}}</i>
				</span>
				<span class="bg"  @click="showTip(1)">
					<em v-show="show && index ==1 ? true : false">ARPU值:{{trueArpu | numFilter | numThousand}}</em>
				</span>
			</div>
			<div v-if="arpuTarget" class="ab-right">{{arpuTarget | numFilter | numThousand}}</div>
			<div v-else class="ab-right">--</div>
		</li>
		<li @click="hideTip(2)">
			<div class="ab-left">
				订单金额
			</div>
			<div class="ab-mid">
				<span class="num" ref="num2" @click="showTip(2)">
					<i v-show="showNum2">{{trueOrder | numFilter | numThousand}}</i>
				</span>
				<span class="bg" @click="showTip(2)">
					<em v-show="show && index ==2 ? true : false">订单金额:{{trueOrder | numFilter | numThousand}}</em>
				</span>
			</div>
			<div v-if="orderTarget" class="ab-right">{{orderTarget | numFilter | numThousand}}</div>
			<div v-else class="ab-right">--</div>
		</li>
		<li @click="hideTip(3)">
			<div class="ab-left">
				<span>学生</span><br>
				<span>付费率</span>
			</div>
			<div class="ab-mid">
				<span class="num" ref="num3"  @click="showTip(3)">
					<i v-show="showNum3">{{trueStudent * 100 | numFilter}}%</i>
				</span>
				<span class="bg"  @click="showTip(3)">
					<em v-show="show && index ==3 ? true : false">学生付费率:{{trueStudent * 100 | numFilter}}%</em>
				</span>
			</div>
			<div v-if="studentTarget" class="ab-right">{{studentTarget * 100 | numFilter}}%</div>
			<div v-else class="ab-right">--</div>
		</li>
		<li class="last" @click="hideTip(4)">
			<div class="ab-left">
				<span>收费园</span><br>
				<span>占比</span>
			</div>
			<div class="ab-mid">
				<span class="num" ref="num4" @click="showTip(4)">
					<i v-show="showNum4">{{trueSchool * 100 | numFilter}}%</i>
				</span>
				<span class="bg"  @click="showTip(4)">
					<em v-show="show && index ==4 ? true : false">收费园占比:{{trueSchool * 100 | numFilter}}%</em>
				</span>
			</div>
			<div v-if="schoolTarget" class="ab-right">{{schoolTarget * 100 | numFilter}}%</div>
			<div v-else class="ab-right">--</div>
		</li>
	</ul>
	<div style="width:100%;height: 10px;background-color: #f2f3f5"></div>
	<dialogModal :isShow="playFlag" @close="playFlag = false">
		<ul slot="content" class="alert_ul">
			<ul slot="content" class="alert_ul">
				<li class="example">
					<p class="raito">学期:</p>
					<p class="roito-left">春季:2月1日 ~ 7月31日</p>
					<p class="roito-left">秋季:8月1日 ~ 次年1月31日</p>
				</li>
				<li class="example">
					<p class="raito">ARPU值:</p>
					<p class="roito-left">平均每个在读学生带来的收入</p>
				</li>
				<li class="example">
					<p class="raito">订单金额:</p>
					<p class="roito-left">增值服务收入金额</p>
				</li>
				<li class="example">
					<p class="raito">学生付费率:</p>
					<p class="roito-left">有xx%的在读激活学生购买了增值服务</p>
				</li>
				<li class="example">
					<p class="raito">收费园占比:</p>
					<p class="roito-left">有xx%的正式园购买了增值服务</p>
				</li>
			</ul>
		</ul>
	</dialogModal>
</div>
</template>
<script>
import DialogModal from '@/components/dialogModal'
import { ReportApi } from '@/api/index'
import { setStore } from '@/utils/common'
import moment from 'moment'
export default {
	name: 'arpuBar',
	components: {
		DialogModal
	},
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			infoInform: setStore('infoInform') ? setStore('infoInform') : '',
			playFlag: false,
			index: null,
			arpuTarget: 0,
			trueArpu: 0,
			orderTarget: 0,
			trueOrder: 0,
			studentTarget: 0,
			trueStudent: 0,
			schoolTarget: 0,
			trueSchool: 0,
			showNum1: false,
			showNum2: false,
			showNum3: false,
			showNum4: false,
			date: ''
		}
	},
	created () {
		this.getDate()
	},
	methods: {
		renderBar () {
			this.$nextTick(() => {
				this.$refs.num1.style.width = this.setWidth(this.trueArpu, this.arpuTarget) + 'rem'
				this.$refs.num2.style.width = this.setWidth(this.trueOrder, this.orderTarget) + 'rem'
				this.$refs.num3.style.width = this.setWidth(this.trueStudent, this.studentTarget) + 'rem'
				this.$refs.num4.style.width = this.setWidth(this.trueSchool, this.schoolTarget) + 'rem'
			})
			if (this.setWidth(this.trueArpu, this.arpuTarget) >= 90 / 75) {
				this.showNum1 = true
			}
			if (this.setWidth(this.trueOrder, this.orderTarget) >= 90 / 75) {
				this.showNum2 = true
			}
			if (this.setWidth(this.trueStudent, this.studentTarget) >= 90 / 75) {
				this.showNum3 = true
			}
			if (this.setWidth(this.trueSchool, this.schoolTarget) >= 90 / 75) {
				this.showNum4 = true
			}
		},
		setWidth (trueNum, targert) {
			let school = (trueNum / targert) * 400 / 75
			if (trueNum === 0) {
				school = 0
			}
			if (school >= 440 / 75) {
				school = 440 / 75
			}
			return school
		},
		showTip (i) {
			this.index = i
			this.$emit('callBack', true, this.date)
		},
		hideTip (i) {
			this.index = i
			this.$emit('callBack', false, this.date)
		},
		getDate () {
			let params = {}
			// params.agentId = 12
			params.agentId = this.infoInform.id
			ReportApi.getTarget(params, res => {
				if (res.code === 10000) {
					this.date = res.body.yesterdayStr
					this.arpuTarget = res.body.currSemGoal.arpu
					this.orderTarget = res.body.currSemGoal.orderAmount
					this.studentTarget = res.body.currSemGoal.stuPayRate
					this.schoolTarget = res.body.currSemGoal.paySchoolRate
					this.trueArpu = res.body.currSem.arpu
					this.trueOrder = res.body.currSem.orderAmount
					this.trueStudent = res.body.currSem.stuPayRate
					this.trueSchool = res.body.currSem.paySchoolRate
					this.renderBar()
				} else {
					let arr = moment().subtract('days', 1).format('YYYY-MM-DD').split('-')
					this.date = ~~arr[1] + '月' + ~~arr[2] + '日'
				}
				this.$emit('callBack', false, this.date)
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
	.arpu-bar
		width: 100%
		height: 490px
		background-color #fff
		position: relative
		.spr-left
			width: 95%
			height: 82px
			line-height: 82px
			display: inline-block
			margin-left: 20px
			font-size: 30px
			text-align: left
			color: #333333
			em
				position: relative
				float: left
				padding-left: 20px
			em:after
				position: absolute
				background: #74A9FF
				content ''
				height: 34px
				width: 6px
				top: 49%
				left: 0
				margin-top: -17px
			.spr-right
				float:right
				margin-right: 20px
				font-size: 28px;
				color: #818D9D;
				text-align: right;
			.icon-answer {
				width: 32px
				height: 32px
				background url("../../../assets/images/operate-explain.png") no-repeat center
				background-size 100% 100%
				margin-left: 10px
				margin-top: 24px;
				float: left
				display inline-block
			}
	.ab-content{
		padding-bottom: 20px
		position: relative
		.last:after{
			content ''
			display inline-block
			position: absolute
			width: 399px
			border-bottom 2.1px solid #eee
			left: 116px
			bottom: 32px
		}
	}
	.ab-content:before{
		position: absolute
		content ''
		width: 2.1px
		height: 334px
		background #eee
		display block
		left: 116px
		top: 11px
	}
	.ab-content:after{
		position: absolute
		content ''
		width:0
		height: 334px
		border-right 2.1px dashed  #74A9FF
		background #eee
		display block
		left: 516px
		top: 11px
	}
	.ab-content li{
		display flex
		height: 66px
		justify-items center
		align-items center
		margin-bottom: 24px
		.ab-left{
			width: 96px
			font-size: 24px;
			color: #333333;
			text-align: right;
			margin:0 10px 0 12px
			white-space nowrap
			span{
				display inline-block
				width 100%
			}
		}
		.ab-left.active{
			width: 72px
			font-size: 24px;
			color: #333333;
			text-align: right;
			line-height: 33px
			text-indent 1em
			margin:0 10px 0 36px
		}
		.ab-mid{
			position: relative
			width: 400px
			height: 40px
			line-height: 40px
			span{
				position: absolute
				left: 0
				bottom: 0
				font-size: 26px;
			}
			span.bg{
				width: 400px
				height: 40px
				display inline-block
				background #eee
				em{
					position: absolute
					left:10px
					right: auto
					top: -90px
					display block
					padding 20px
					background rgba(0,0,0,0.5)
					border-radius 10px
					text-align left
					color:#fff;
					z-index 999
				}
			}
			.num{
				width: 0px
				height: 40px
				background-image: linear-gradient(90deg,#91BBFF 4%, #AFCEFF 100%);
				z-index 99
				/*transition: width 1s linear;*/
			}
			span.num i{
				position: absolute
				left: auto
				right: 10px
				bottom: 0
				font-style normal
				color:#fff;
				font-size: 26px;
			}
		}
		.ab-right{
			width: 160px
			font-size: 26px;
			color: #818D9D;
			text-align: right;
			margin-left 40px
			/*border 1px solid #f0f0f0*/
		}
	}
</style>
