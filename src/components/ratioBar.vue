<template>
	<div class="active-ratio">
		<div class="grid">
			<transition name="fold-fade" appear>
				<div class="export">
					<span ref="ratio"><em ref="em">{{ratio | numFilter}}</em></span>
				</div>
			</transition>
			<i class="zero" :class="{active:targetValue === 0}">0</i>
			<i class="one" :class="{active:targetValue === 1}">1</i>
			<i class="two" :class="{active:targetValue === 2}">2</i>
			<i class="three" :class="{active:targetValue === 3}">3</i>
			<i class="four" :class="{active:targetValue === 4}">4</i>
			<i class="five" :class="{active:targetValue === 5}">5</i>
			<i class="six" :class="{active:targetValue === 6}">6</i>
			<em class="target" ref="targetRef"></em>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ratioBar',
	props: {
		ratio: null,
		targetValue: null
	},
	data () {
		return {}
	},
	mounted () {
		this.showActivationRatio()
		this.$nextTick(() => {
			if (this.targetValue > 0 && this.targetValue <= 1) {
				this.$refs.targetRef.style.left = (this.targetValue * 95 / 75) + 'rem'
			} else if (this.targetValue > 1 && this.targetValue <= 2) {
				this.$refs.targetRef.style.left = ((this.targetValue - 1) * 95 / 75 + 95 / 75) + 'rem'
			} else if (this.targetValue > 2 && this.targetValue <= 3) {
				this.$refs.targetRef.style.left = ((this.targetValue - 2) * 95 / 75 + 95 * 2 / 75) + 'rem'
			} else if (this.targetValue > 3 && this.targetValue <= 4) {
				this.$refs.targetRef.style.left = ((this.targetValue - 3) * 95 / 75 + 95 * 3 / 75) + 'rem'
			} else if (this.targetValue > 4 && this.targetValue <= 5) {
				this.$refs.targetRef.style.left = ((this.targetValue - 4) * 95 / 75 + 95 * 4 / 75) + 'rem'
			} else if (this.targetValue > 5 && this.targetValue <= 6) {
				this.$refs.targetRef.style.left = ((this.targetValue - 5) * 95 / 75 + 95 * 5 / 75) + 'rem'
			} else if (this.targetValue > 6) {
				this.$refs.targetRef.style.left = (95 * 6 / 75) + 'rem'
			}
		})
	},
	methods: {
		showActivationRatio () {
			if (this.ratio >= 0 && this.ratio < 2) {
				this.$nextTick(() => {
					this.$refs.ratio.style.background = '#F9989E'
					this.$refs.em.style.backgroundImage = 'url(' + require('../assets/images/icon_red.png') + ')'
				})
			} else if (this.ratio >= 2 && this.ratio < 4) {
				this.$nextTick(() => {
					this.$refs.ratio.style.background = '#F9CE98'
					this.$refs.em.style.backgroundImage = 'url(' + require('../assets/images/icon_yellow.png') + ')'
				})
			} else if (this.ratio >= 4) {
				this.$nextTick(() => {
					this.$refs.ratio.style.background = '#98d0f9'
					this.$refs.em.style.backgroundImage = 'url(' + require('../assets/images/icon_blue.png') + ')'
				})
			}
			this.$refs.ratio.style.width = (this.ratio * 95 / 75) + 'rem'
		}
	}
}
</script>

<style lang="stylus" scoped>
.active-ratio
	width 100%
	background #fff
	padding 80px 56px 33px 40px
	box-sizing border-box
	.grid{
		margin  0 auto
		height 80px
		width 570px
		border 2.1px solid #EEEEEE
		border-top 0
		position relative
		i{
			position absolute
			bottom -35px
			z-index 9
			font-style normal
			font-size 20px
			color #BBBBBD
		}
		i.zero{
			left 0
		}
		i.one{
			left 88px
		}
		i.two{
			left 183px
		}
		i.three{
			left 278px
		}
		i.four{
			left 373px
		}
		i.five{
			left 468px
		}
		i.six{
			right 0
		}
		i.active{
			color  #98D0F9
		}
		i:after{
			position absolute
			content ''
			height 80px
			width 0
			border-right 2.1px dashed #EEEEEE
			bottom 35px
			font-size 20px
			z-index -5
			right 3px
		}
		i.zero:after{
			border-right none
		}
		i.six:after{
			border-right none
		}
		.export{
			position absolute
			display flex
			align-items center
			z-index 99
			top 0
			width 100%
			&.fold-fade-enter-active,  &.fold-fade-leave-active{
				transition width 1.5s linear;
			}
			&.fold-fade-enter, &.fold-fade-leave-to{
				width 0
			}
			span{
				width 0
				height 32px
				line-height 32px
				position relative
			}
			span em{
				font-style normal
				color #fff
				font-size 20px
				line-height 51px
				text-align center
			}
			span em{
				position absolute
				width 52px
				height 51px
				line-height 49px
				background url('../assets/images/icon_red.png') no-repeat
				background-size 100% 100%
				top -64px
				display block
				right -26px
			}
		}
	}
	.target{
		content ''
		left -2.1px
		bottom 0
		display block
		position absolute
		height 80px
		width 0
		border-right 2.1px dashed #98D0F9
	}
</style>
