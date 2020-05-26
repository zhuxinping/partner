<template>
	<div class="active-ratio">
		<div class="grid">
			<transition name="fold-fade" appear>
				<div class="export">
					<span class="red" ref="exportRed" v-if="rangeExportOne"><em v-if="showExportLabelOne">{{exportRatio | numFilter}}</em></span>
					<span class="yellow" ref="exportYellow" v-if="rangeExportTwo"><em v-if="showExportLabelTwo">{{exportRatio | numFilter}}</em></span>
					<span class="blue" ref="exportBlue" v-if="rangeExportThree"><em v-if="showExportLabelThree">{{exportRatio | numFilter}}</em></span>
				</div>
			</transition>
			<transition name="fold-faded" appear>
				<div class="activate">
					<span class="red" ref="activateRed" v-if="rangeActivationOne"><em v-if="showActivationLabelOne">{{activationRatio | numFilter}}</em></span>
					<span class="yellow" ref="activateYellow" v-if="rangeActivationTwo"><em v-if="showActivationLabelTwo">{{activationRatio | numFilter}}</em></span>
					<span class="blue" ref="activateBlue" v-if="rangeActivationThree"><em v-if="showActivationLabelThree">{{activationRatio | numFilter}}</em></span>
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
	name: 'activeBar',
	props: {
		exportRatio: null,
		activationRatio: null,
		targetValue: null
	},
	data () {
		return {
			//  导入比在 0.00-2.00返回的控制开关
			rangeExportOne: false,
			//  导入比在 2.00-4.00返回的控制开关
			rangeExportTwo: false,
			//  导入比在 4.00-6.00返回的控制开关
			rangeExportThree: false,
			showExportLabelOne: false,
			showExportLabelTwo: false,
			showExportLabelThree: false,
			rangeActivationOne: false,
			rangeActivationTwo: false,
			rangeActivationThree: false,
			showActivationLabelOne: false,
			showActivationLabelTwo: false,
			showActivationLabelThree: false
		}
	},
	watch: {
		exportRatio: {
			handler (newV, oldV) {
				this.exportRatio = newV
				this.showExportRatio()
			},
			immediate: true
		},
		activationRatio: {
			handler (newV, oldV) {
				this.activationRatio = newV
				this.showActivationRatio()
			},
			immediate: true
		},
		targetValue: {
			handler (newV, oldV) {
				this.targetValue = newV
				this.showExportRatio()
				this.showActivationRatio()
				this.$nextTick(() => {
					if (newV > 0 && newV <= 1) {
						this.$refs.targetRef.style.left = (newV * 95 / 75) + 'rem'
					} else if (newV > 1 && newV <= 2) {
						this.$refs.targetRef.style.left = ((newV - 1) * 95 / 75 + 95 / 75) + 'rem'
					} else if (newV > 2 && newV <= 3) {
						this.$refs.targetRef.style.left = ((newV - 2) * 95 / 75 + 95 * 2 / 75) + 'rem'
					} else if (newV > 3 && newV <= 4) {
						this.$refs.targetRef.style.left = ((newV - 3) * 95 / 75 + 95 * 3 / 75) + 'rem'
					} else if (newV > 4 && newV <= 5) {
						this.$refs.targetRef.style.left = ((newV - 4) * 95 / 75 + 95 * 4 / 75) + 'rem'
					} else if (newV > 5 && newV <= 6) {
						this.$refs.targetRef.style.left = ((newV - 5) * 95 / 75 + 95 * 5 / 75) + 'rem'
					} else if (newV > 6) {
						this.$refs.targetRef.style.left = (95 * 6 / 75) + 'rem'
					}
				})
			},
			immediate: true
		}
	},
	methods: {
		showExportRatio () {
			if (this.exportRatio >= 0 && this.exportRatio < 2 && this.exportRatio !== null) {
				this.rangeExportOne = true
				this.showExportLabelOne = true
				this.$nextTick(() => {
					this.$refs.exportRed.style.width = (this.exportRatio * 95 / 75) + 'rem'
				})
			} else if (this.exportRatio >= 2 && this.exportRatio < 4) {
				this.rangeExportOne = true
				this.rangeExportTwo = true
				this.showExportLabelTwo = true
				this.$nextTick(() => {
					this.$refs.exportRed.style.background = '#F9CE98'
					this.$refs.exportYellow.style.width = ((this.exportRatio - 2) * 95 / 75) + 'rem'
				})
			} else if (this.exportRatio >= 4 && this.exportRatio <= 6) {
				this.rangeExportOne = true
				this.rangeExportTwo = true
				this.rangeExportThree = true
				this.showExportLabelOne = false
				this.showExportLabelTwo = false
				this.showExportLabelThree = true
				this.$nextTick(() => {
					this.$refs.exportRed.style.background = '#98d0f9'
					this.$refs.exportYellow.style.background = '#98d0f9'
					this.$refs.exportBlue.style.width = ((this.exportRatio - 4) * 95 / 75) + 'rem'
				})
			} else if (this.exportRatio > 6) {
				this.rangeExportOne = true
				this.rangeExportTwo = true
				this.rangeExportThree = true
				this.showExportLabelOne = false
				this.showExportLabelTwo = false
				this.showExportLabelThree = true
				this.$nextTick(() => {
					this.$refs.exportRed.style.background = '#98d0f9'
					this.$refs.exportYellow.style.background = '#98d0f9'
					this.$refs.exportBlue.style.width = ((this.exportRatio - 4) * 95 / 75) + 'rem'
				})
			}
		},
		showActivationRatio () {
			if (this.activationRatio >= 0 && this.activationRatio < 2 && this.exportRatio !== null) {
				this.rangeActivationOne = true
				this.showActivationLabelOne = true
				this.showActivationLabelTwo = false
				this.showActivationLabelThree = false
				this.$nextTick(() => {
					this.$refs.activateRed.style.width = (this.activationRatio * 95 / 75) + 'rem'
				})
			} else if (this.activationRatio >= 2 && this.activationRatio < 4) {
				this.rangeActivationOne = true
				this.rangeActivationTwo = true
				this.showActivationLabelOne = false
				this.showActivationLabelTwo = true
				this.showActivationLabelThree = false
				this.$nextTick(() => {
					this.$refs.activateRed.style.background = '#F9CE98'
					this.$refs.activateYellow.style.width = ((this.activationRatio - 2) * 95 / 75) + 'rem'
				})
			} else if (this.activationRatio >= 4 && this.activationRatio <= 6) {
				this.rangeActivationOne = true
				this.rangeActivationTwo = true
				this.rangeActivationThree = true
				this.showActivationLabelOne = false
				this.showActivationLabelTwo = false
				this.showActivationLabelThree = true
				this.$nextTick(() => {
					this.$refs.activateRed.style.background = '#98d0f9'
					this.$refs.activateYellow.style.background = '#98d0f9'
					this.$refs.activateBlue.style.width = ((this.activationRatio - 4) * 95 / 75) + 'rem'
				})
			} else if (this.activationRatio > 6) {
				this.rangeActivationOne = true
				this.rangeActivationTwo = true
				this.rangeActivationThree = true
				this.showActivationLabelOne = false
				this.showActivationLabelTwo = false
				this.showActivationLabelThree = true
				this.$nextTick(() => {
					this.$refs.activateRed.style.background = '#98d0f9'
					this.$refs.activateYellow.style.background = '#98d0f9'
					this.$refs.activateBlue.style.width = ((this.activationRatio - 4) * 95 / 75) + 'rem'
				})
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
	.active-ratio{
		width: 100%
		background #fff
		padding: 60px 56px 33px 120px
		box-sizing border-box
	}
	.grid{
		margin  0 auto
		height: 188px
		width: 570px
		border-bottom 2.1px solid #EEEEEE
		border-left 2.1px solid #EEEEEE
		border-right 2.1px solid #EEEEEE
		position: relative
		i{
			position: absolute
			bottom: -35px
			z-index 9
			font-style normal
			font-size 20px
			color: #BBBBBD
		}
		i.zero{
			left: 0
		}
		i.one{
			left: 88px
		}
		i.two{
			left: 183px
		}
		i.three{
			left: 278px
		}
		i.four{
			left: 373px
		}
		i.five{
			left: 468px
		}
		i.six{
			right: 0
		}
		i.active{
			color:  #98D0F9
		}
		i:after{
			position: absolute
			content ''
			height 188px
			width: 0
			border-right 2.1px dashed #EEEEEE
			bottom: 35px
			font-size 20px
			z-index -5
			right: 3px
		}
		i.zero:after{
			border-right none
		}
		i.six:after{
			border-right none
		}
		.export{
			position: absolute
			display flex
			align-items center
			z-index 99
			top: 0
			width: 100%
			&.fold-fade-enter-active,  &.fold-fade-leave-active{
				transition: width 1.5s linear;
			}
			&.fold-fade-enter, &.fold-fade-leave-to{
				width: 0;
			}
			span{
				height: 32px
				position: relative
			}
			span:nth-child(1){
				width: 190px
				background: #F9989E
			}
			span:nth-child(2){
				width: 190px
				background: #F9CE98
			}
			span:nth-child(3){
				width: 190px
				background: #98D0F9
			}
			span em{
				font-style normal
				color:#fff
				font-size 20px
				line-height: 51px
				text-align: center
			}
			span.red em{
				position: absolute
				width: 52px
				height: 51px
				background url('../assets/images/icon_red.png') no-repeat
				background-size 100% 100%
				top: -64px
				display block
				right: -26px
			}
			span.yellow em{
				position: absolute
				width: 52px
				height: 51px
				background url('../assets/images/icon_yellow.png') no-repeat
				background-size 100% 100%
				top: -64px
				display block
				right: -26px
			}
			span.blue em{
				position: absolute
				width: 52px
				height: 51px
				background url('../assets/images/icon_blue.png') no-repeat
				background-size 100% 100%
				top: -64px
				display block
				right: -26px
			}
		}
		.export:before{
			position: absolute
			content '导入比'
			left: -92px
			font-size 28px
			color:#333
		}
		.activate{
			position: absolute
			display flex
			align-items center
			z-index 99
			bottom: 20px
			width: 100%
			&.fold-faded-enter-active,  &.fold-faded-leave-active{
				transition: width 1.5s linear;
			}
			&.fold-faded-enter, &.fold-faded-leave-to{
				width: 0;
			}
			span{
				height: 32px
				position: relative
			}
			span:nth-child(1){
				width: 190px
				background: #F9989E
			}
			span:nth-child(2){
				width: 190px
				background: #F9CE98
			}
			span:nth-child(3){
				width: 190px
				background: #98D0F9
			}
			span em{
				font-style normal
				color:#fff
				font-size 20px
				line-height: 51px
				text-align: center
			}
			span.red em{
				position: absolute
				width: 52px
				height: 51px
				background url('../assets/images/icon_red.png') no-repeat
				background-size 100% 100%
				top: -64px
				display block
				right: -26px
			}
			span.yellow em{
				position: absolute
				width: 52px
				height: 51px
				background url('../assets/images/icon_yellow.png') no-repeat
				background-size 100% 100%
				top: -64px
				display block
				right: -26px
			}
			span.blue em{
				position: absolute
				width: 52px
				height: 51px
				background url('../assets/images/icon_blue.png') no-repeat
				background-size 100% 100%
				top: -64px
				display block
				right: -26px
			}
		}
		.activate:before{
			position: absolute
			content '激活比'
			left: -92px
			font-size 28px
			color:#333
		}
	}
	.target{
		content ''
		left: -2.1px
		bottom: 0
		display block
		position: absolute
		content ''
		height 188px
		width: 0
		border-right 2.1px dashed #98D0F9
	}
</style>
