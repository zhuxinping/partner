<template>
	<div class="no-data" v-show="operation">
		<dl class="no-data-img">
			<dt><img src="@/assets/images/icon_nodata.png" alt=""></dt>
			<dd>暂无数据</dd>
		</dl>
	</div>
</template>

<script>
export default {
	name: 'no-data',
	props: {
		operation: ''
	}
}
</script>

<style scoped lang='stylus'>
	.no-data
		width 100%
		display flex
		justify-content center
		flex-direction column
		background #fff
		.no-data-img
			margin-top 130px
			display flex
			flex-direction column
		dt
			img
				width 270px
				height 236px
		dd
			width 270px
			font-size 32px
			margin-left 220px
			color #818D9D
</style>
