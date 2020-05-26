<template>
    <table class="class-ratio-explain">
		<thead class="class-ratio-explain-thead">
			<th>级别名称</th>
			<th>级别</th>
			<th>班级周活比</th>
		</thead>
		<tr class="class-ratio-explain-tr">
			<td>最强王者</td>
			<td>SSS</td>
			<td>[2.5~</td>
		</tr>
		<tr class="class-ratio-explain-tr">
			<td>至尊星耀</td>
			<td>SS</td>
			<td>[2~2.5)</td>
		</tr>
		<tr class="class-ratio-explain-tr">
			<td>永恒钻石</td>
			<td>S</td>
			<td>[1.5~2)</td>
		</tr>
		<tr class="class-ratio-explain-tr">
			<td>尊贵铂金</td>
			<td>A</td>
			<td>[1~1.5)</td>
		</tr>
		<tr class="class-ratio-explain-tr">
			<td>荣耀黄金</td>
			<td>B</td>
			<td>[0.5~1)</td>
		</tr>
		<tr class="class-ratio-explain-tr">
			<td>秩序白银</td>
			<td>C</td>
			<td>[0.3~0.5)</td>
		</tr>
		<tr class="class-ratio-explain-tr">
			<td>倔强青铜</td>
			<td>D</td>
			<td>(0~0.3)</td>
		</tr>
		<tr class="class-ratio-explain-tr">
			<td>储备黑铁</td>
			<td>E</td>
			<td>0</td>
		</tr>
	</table>
</template>

<script>
export default {
	name: 'classRatioExplain'
}
</script>
<style lang="stylus">
	.class-ratio-explain th
		font-weight 400
</style>
<style scoped lang="stylus">
.class-ratio-explain
	margin 30px 20px
	font-size 24px
	color #818D9D
	display flex
	flex-direction column
	border 2.1px solid #eee
	border-right 0
	.class-ratio-explain-thead
		display flex
		justify-content space-between
		background #f3fbff
		height 88px
		line-height 88px
		th
			flex 1
			text-align center
			border-right 2.1px solid #eee
	.class-ratio-explain-tr
		display flex
		justify-content space-between
		height 80px
		line-height 80px
		border-top 2.1px solid #eee
		td
			flex 1
			text-align center
			border-right 2.1px solid #eee
</style>
