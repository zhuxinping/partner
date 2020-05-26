<template>
	<li class="tree-ul">
		<div class="list-div">
			<div :class="[showFlag && model.name !== '默认区域' ? 'own-ct' : 'single-ct']">
				<p class="content" @click="toggleIcon(model)">
					<span class="checkcont">
						<input type="radio" name='checked' :disabled="showFlag && model.name !== '默认区域'? true: false" :id='"checked"+model.id' :checked="item.check"/>
						<label :for='"checked"+model.id'></label>
					</span>
					<span class="label">{{model.name}}</span>
				</p>
				<img @click='toggle' src="../../../assets/images/down.png" :class="[showFlag?'have-children':'display']">
			</div>
		</div>
		<ul v-show="open">
			<items v-for="child in model.childrens" :key='child.id' @handle=clickItem :model='child' v-if="model.childrens"></items>
		</ul>
	</li>
</template>
<script>
import { setSession, toast } from '@/utils/common'
export default {
	name: 'items',
	props: ['model'],
	data () {
		return {
			open: true,
			check: false,
			modelObject: this.model,
			showFlag: this.model.childrens && this.model.childrens.length,
			agentId: this.model.id,
			item: this.model,
			responsePlace: ''
		}
	},
	mounted () {
		this.responsePlace = this.$route.meta.id
		if (this.item) {
			this.$set(this.item, 'check', false)
		}
		if (this.agentId === ~~this.responsePlace) {
			this.item.check = true
		}
	},
	methods: {
		toggle () {
			this.open = !this.open
		},
		toggleIcon (model) {
			if (this.showFlag && this.model.name !== '默认区域') {
				this.check = false
				toast('选择的默认区域只能是叶子节点！')
			} else {
				this.item.check = !this.item.check
				setSession('agentAreaId', this.model.id)
				setSession('responsePlace', this.model.name)
				this.$emit('handle', this.model.id)
			}
		},
		clickItem (item) {
			this.$emit('handle', item)
		}
	}
}
</script>

<style lang="stylus" scoped>
		.tree-ul
			font-size 32px
			color #333333
			position relative
			padding-left 28px
			.no-childrens
				text-indent 40px
			img
				width 40px
				height 40px
				position absolute
				right 40px
				top 20px
				padding-right 60px
			.have-children
				display block
			.display
				display none
		.tree-ul:after
			content ''
			position absolute
			left -20%
			width 120%
			overflow hidden
			top 0
			height 2.1px
			background-color #eeeeee
	.list-div
		color #333333
		position relative
		text-align left
		height 85px
		line-height 85px
		background-color: #ffffff
		overflow:hidden
		.own-ct
			span.checkcont
				background rgba(0, 0, 0, .1)
		div
			position relative
			padding-left 50px
		.content
			display block
			padding-left 0
			width 70%
			height 85px
			overflow hidden
			.label
				width 90%
				display block
				float left
				overflow hidden
				text-overflow ellipsis
				white-space nowrap
	span.checkcont
		position absolute
		top 50%
		left 0
		transform translateY(-50%)
		width 36px
		height 36px
		box-sizing border-box
		border-radius 100%
		background-image url("../../../assets/images/icon_unselected.png")
		background-size 100% 100%
		padding-right 16px
		input
			display none
		input[type=radio]:checked + label
			border none
			background url(../../../assets/images/list-selected.png) no-repeat
			background-size 100% 100%
		label
			width 36px
			height 36px
			display: inline-block
			border-radius 100%
			box-sizing border-box
			position absolute
			top 0
		label.disabled
			cursor not-allowed
		label.disabled::after
			content ''
	.single-ct
		font-size 28px
		color #818D9D
</style>
