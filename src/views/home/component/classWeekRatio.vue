<template>
<ul class="class-ratio" @click="jump">
	<li>
		<div class="class-ratio-thead">最强<br>王者<br>SSS</div>
		<div class="class-ratio-tr">{{weekRatioStage.sssLevelCount|numThousand}}</div>
	</li>
	<li>
		<div class="class-ratio-thead">至尊<br>星耀<br>SS</div>
		<div class="class-ratio-tr">{{weekRatioStage.ssLevelCount|numThousand}}</div>
	</li>
	<li>
		<div class="class-ratio-thead">永恒<br>钻石<br>S</div>
		<div class="class-ratio-tr">{{weekRatioStage.sLevelCount|numThousand}}</div>
	</li>
	<li>
		<div class="class-ratio-thead">尊贵<br>铂金<br>A</div>
		<div class="class-ratio-tr">{{weekRatioStage.aLevelCount|numThousand}}</div>
	</li>
	<li>
		<div class="class-ratio-thead">荣耀<br>黄金<br>B</div>
		<div class="class-ratio-tr">{{weekRatioStage.bLevelCount|numThousand}}</div>
	</li>
	<li>
		<div class="class-ratio-thead">秩序<br>白银<br>C</div>
		<div class="class-ratio-tr">{{weekRatioStage.cLevelCount|numThousand}}</div>
	</li>
	<li>
		<div class="class-ratio-thead">倔强<br>青铜<br>D</div>
		<div class="class-ratio-tr">{{weekRatioStage.dLevelCount|numThousand}}</div>
	</li>
	<li>
		<div class="class-ratio-thead">储备<br>黑铁<br>E</div>
		<div class="class-ratio-tr">{{weekRatioStage.eLevelCount|numThousand}}</div>
	</li>
</ul>
</template>

<script>
export default {
	name: 'classWeekRatio',
	props: {
		weekRatioStage: ''
	},
	methods: {
		jump () {
			this.$emit('jump')
		}
	}
}
</script>
<style scoped lang="stylus">
.class-ratio
	display flex
	margin  30px 20px
	margin-bottom 0
	border 2.1px solid #eee
	border-right 0
	li
		flex 1
		flex-direction row
		border-right 2.1px solid #eee
		.class-ratio-thead
			height 138px
			color #818D9D
			justify-content center
			display flex
			background #f3fbff
			align-items center
		.class-ratio-tr
			height 110px
			border-top 1px solid #eee
			justify-content center
			display flex
			font-size 32px
			color #00AAFF
			align-items center
			font-weight bold
</style>
