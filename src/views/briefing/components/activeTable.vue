<template>
	<div class="grid-container">
		<table class="spr-grid">
			<thead>
				<th class="line"></th>
				<th class="active">在读数/在职数</th>
				<th>在读/在职<br>激活数</th>
				<th>在读/在职<br>激活率</th>
			</thead>
			<tr>
				<td class="cur">学生</td>
				<td class="active">{{tableData.onReadStudentTotal | numThousand}}</td>
				<td>{{tableData.activeStudentTotal | numThousand}}</td>
				<td :class="tableData.isStandard === 2 ? 'active_red' : ''">{{tableData.onReadStudentActivationRatio}}</td>
			</tr>
			<tr>
				<td class="cur">家长</td>
				<td class="active">{{tableData.onReadParentTotal | numThousand}}</td>
				<td>{{tableData.activeParentTotal |numThousand}}</td>
				<td>{{tableData.onReadParentActivationRatio}}</td>
			</tr>
			<tr>
				<td class="cur">园丁</td>
				<td class="active">{{tableData.onReadTeacherTotal | numThousand}}</td>
				<td>{{tableData.activeTeacherTotal | numThousand}}</td>
				<td>{{tableData.onReadTeacherActivationRatio}}</td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	name: 'activeTable',
	props: {
		tableData: {
			type: Object
		}
	}
}
</script>
<style lang="stylus" scoped>
	.grid-container
		background #fff
		padding 10px 35px 65px 35px
		.spr-grid
			margin 0 auto
			color #818D9D
			font-size 26px
			thead th
				width 150px
				height 80px
				border 2.1px solid #eee
				text-align right
				padding-right 16px
				font-weight 400
			thead th.active
				width 220px
			thead th.line
				position relative
			thead th.line:after
				content ""
				position absolute
				width 100%
				height 80px
				background url("../../../assets/images/icon_line.png") no-repeat
				background-size 100% 100%
				left 0
				top 0
			tr td
				width 150px
				height 80px
				line-height 80px
				border 2.1px solid #eee
				text-align right
				font-size 28px
				color #05ACFF
				padding-right 16px
			tr td.cur
				color #818D9D
				text-align center
				padding-right 0
			tr td.active_red
				color red
</style>
