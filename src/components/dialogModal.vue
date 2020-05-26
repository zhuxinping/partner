<template>
		<div class="dialog-wrap" v-if="isShow">
			<transition name="drop">
				<div class="dialog-content">
					<slot name="content"></slot>
					<p class="dialog-close" @click="closeModal" v-if="sureShow">{{btnText}}</p>
				</div>
			</transition>
		</div>
</template>

<script>
export default {
	name: 'dialogModal',
	props: {
		isShow: {
			type: Boolean,
			default: false
		},
		sureShow: {
			type: Boolean,
			default: true
		},
		btnText: {
			type: String,
			default: '我知道了'
		}
	},
	data () {
		return {
		}
	},

	methods: {
		closeModal () {
			this.$emit('close')
		}
	}
}
</script>

<style lang="stylus" scoped >
	.dialog-wrap
		width: 100%
		height: 100%
		position: fixed
		left: 0
		top: 0
		right: 0
		bottom: 0
		margin auto
		background rgba(0, 0, 0, .3)
		z-index 9999
		.dialog-content{
			position: absolute
			top: 50%
			left: 50%
			width: 520px
			transform translate(-50%, -50%)
			z-index 9999
			background #fff
			border-radius 8px
		}
	.dialog-close
		color: #74A9FF
		font-size:30px;
		height: 88px;
		line-height: 88px;
		text-align: center;
		border-top:1px solid #eeeeee
	.drop-enter-active {
		transition: all .5s ease;
	}
	.drop-leave-active {
		transition: all .3s ease;
	}
	.drop-enter {
		transform: translateY(-500px);
	}
	.drop-leave-active {
		transform: translateY(-500px);
	}
</style>
