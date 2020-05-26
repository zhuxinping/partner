<template>
	<div class="header">
		<img class="icon-back" @click="goBack" src="../assets/images/home-arrow.png" alt="">
		<div class="title">{{headerTitle}}</div>
	</div>
</template>
<script>
export default {
	name: 'mheader',
	props: {
		headerTitle: {
			type: String,
			default: ''
		}
	},
	methods: {
		goBack () {
			this.$emit('backClick')
		}
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped >
	.header{
		width 100%
		height 90px
		background-color #74A9FF
		overflow hidden
		position relative
		.icon-back{
			width 20px
			height 35px
			position absolute
			left 0
			padding 27px 60px 20px 30px
		}
		.title{
			width 74%
			color #ffffff
			line-height 90px
			margin-left 13%
			font-size 0.48rem
			display block
			background-color #74A9FF
			text-align center
			overflow hidden
			text-overflow ellipsis
			white-space nowrap
		}
	}
</style>
