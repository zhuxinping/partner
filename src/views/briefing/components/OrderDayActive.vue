<template>
	<div>
		<div class="grid-container">
			<table class="spr-grid">
				<thead>
				<th class="line">
				</th>
				<th class="active">当日活跃</th>
				<th class="active">月均日活 <i class="icon-answer" @click="parentRatio"></i></th>
				</thead>
				<tr>
					<td class="cur">学生</td>
					<td>{{dataList.activeThatDayStudent | numThousand}} <i class="icon-down" :class="dataList.activeThatDayStudentTendency==0?'icon-up':''" :style="dataList.activeThatDayStudentTendency==2?'display:none':''"></i></td>
					<td>{{dataList.activeThatMonthStudent | numFilter | numThousand}}</td>
				</tr>
				<tr>
					<td class="cur">家长</td>
					<td>{{dataList.activeThatDayParent | numThousand}} <i class="icon-down" :class="dataList.activeThatDayParentTendency==0?'icon-up':''" :style="dataList.activeThatDayParentTendency==2?'display:none':''"></i></td>
					<td>{{dataList.activeThatMonthParent | numFilter | numThousand}}</td>
				</tr>
				<tr>
					<td class="cur">园丁</td>
					<td>{{dataList.activeThatDayTeacher | numThousand}} <i class="icon-down" :class="dataList.activeThatDayTeacherTendency == 0?'icon-up':''" :style="dataList.activeThatDayTeacherTendency==2?'display:none':''"></i></td>
					<td>{{dataList.activeThatMonthTeacher | numFilter | numThousand}}</td>
				</tr>
			</table>
		</div>
		<div class="alert" v-show="showAlertFlag">
			<div class="alert-index">
				<ul>
					<li class="title">月均日活</li>
					<li class="example">
						<p class="raito">月度平均日活学生数:</p>
						<p class="roito-left">这个自然月平均每天有多少个活跃学生。</p>
					</li>
					<li class="example">
						<p class="raito">月度平均日活家长数:</p>
						<p class="roito-left">这个自然月平均每天有多少个活跃家长。</p>
					</li>
					<li class="example">
						<p class="roito-left">*月度平均：自然月每一天的当日活跃数</p>
						<p class="roito-left">总和<span>÷</span>该自然月的天数</p>
					</li>
				</ul>
				<p @click="closeAlert" class="last-alert">我知道了</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'OrderDayActive',
	props: {
		tabData: {
			type: Object,
			default () {
				return {}
			}
		}
	},
	data () {
		return {
			showAlertFlag: false,
			dataList: {}
		}
	},
	methods: {
		parentRatio () {
			this.showAlertFlag = true
		},
		closeAlert () {
			this.showAlertFlag = false
		}
	},
	watch: {
		// tabData (newV, oldV) {
		// 	this.dataList = newV
		// }
		tabData: {
			handler: function (newVal, oldVal) {
				// console.info(newVal)
				this.dataList = newVal
			},
			immediate: true
		}
	}
}
</script>

<style lang="stylus" scoped >
	.alert
		width:100%;
		height: 100%;
		position:fixed;
		z-index:99
		text-align: center;
		-webkit-transform: translateZ(0)
		left:0px;
		top:0px;
		background-color:rgba(0, 0, 0, 0.5)
		&after
			content:'';
			display: inline-block;
			width:0px;
			vertical-align:middle;
		.alert-index
			display: inline-block;
			position: absolute;
			border-radius:8px;
			top:50%;
			left:105px;
			width: 520px;
			background-color :#ffffff;
			-moz-transform :translateX(-50%);
			-o-transform :translateX(-50%);
			-ms-transform :translateX(-50%);
			-webkit-transform :translateX(-50%)
			-moz-transform :translateY(-50%);
			-o-transform :translateY(-50%);
			-ms-transform :translateY(-50%);
			-webkit-transform :translateY(-50%)
			ul
				.title
					font-size: 34px;
					color:#333333;
					margin: auto;
					font-weight:bold;
					margin-top: 30px
					margin-bottom: 40px;
				.example
					margin-bottom: 20px;
					margin-left: 35px
					.raito
						text-align:left;
						font-size: 26px;
						color: #74A9FF
						margin-bottom:10px;
					.roito-left
						text-align:left;
						color:#151515;
						font-size: 26px;
						height: 37px;
						line-height: 37px;
						span
							font-size: 26px;
							padding-left: 8px
							padding-right: 8px
		.last-alert
			color: #74A9FF
			font-size:30px;
			height: 88px;
			line-height: 88px;
			text-align: center;
			border-top:1px solid #eeeeee
	.grid-container
		background #fff
		border-collapse collapse
		padding 0 35px 65px 35px
		.spr-grid
			width: 100%
			margin 0 auto
			tr td
				width: 150px
				height: 80px
				line-height: 80px
				border 2.1px solid #eee
				text-align: right
				font-size: 26px;
				color: #05ACFF;
				padding-right: 20px
				font-family: 'sans-serif'
				i.icon-down
					width: 17px
					height: 30px
					display inline-block
					background url("../../../assets/images/icon_down.png") no-repeat center
					background-size 100% 100%
					vertical-align middle
					margin-left: 16px
				i.icon-up
					width: 17px
					height: 30px
					display inline-block
					background url("../../../assets/images/icon_up.png") no-repeat center
					background-size 100% 100%
					vertical-align middle
					margin-left: 16px
				i.icon-add
					width: 18px
					height: 18px
					background url("../../../assets/images/icon_add.png") no-repeat center
					background-size 100% 100%
					display inline-block
					vertical-align baseline
				i.active
					width: 18px
					height: 3px
					background url("../../../assets/images/icon_reduce.png") no-repeat center
					background-size 100% 100%
					display inline-block
					vertical-align middle
			tr td.cur
				color: #818D9D;
				text-align: center
				padding-right: 0
				padding 0 20px
				box-sizing border-box
			thead th
				width: 150px
				height: 80px
				line-height: 80px
				border 2.1px solid #eee
				text-align: center
				font-size: 28px;
				font-weight normal
				color: #818D9D;
			thead th.active
				width: 260px
				text-align right
				padding-right: 20px
				i.icon-answer
					width: 32px
					height: 32px
					background url("../../../assets/images/operate-explain.png") no-repeat center
					background-size 100% 100%
					margin-left: 20px
					display inline-block
					vertical-align: sub;
			thead th.line
				position: relative
			thead th.line:after
				content: "";
				position: absolute;
				width: 100%
				height: 80px
				background url("../../../assets/images/icon_line.png") no-repeat
				background-size 100% 100%
				left: 0
				top: 0
</style>
