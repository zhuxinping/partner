<template>
    <div v-show="loadingFlag">
		<div class="tab-down-loading" v-show="loading">
			<mt-spinner type="triple-bounce" color="#26a2ff"></mt-spinner>
			<span style="margin-left:10px;">加载中...</span>
		</div>
		<div class="tab-down-loading" v-show="allLoaded">没有更多内容了~</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { Spinner } from 'mint-ui'
Vue.component(Spinner.name, Spinner)
export default {
	name: 'loading',
	props: {
		loadingFlag: true
	},
	data () {
		return {
			loading: true,
			allLoaded: false
		}
	},
	methods: {
		change () {
			this.loading = false
			this.allLoaded = true
		},
		onchange () {
			this.loading = true
			this.allLoaded = false
		}
	}
}
</script>

<style scoped lang="stylus">
.tab-down-loading
	width 100%
	padding-top 100px
	line-height 100px
	height 100px
	display flex
	font-size 28px
	color #BBBBBD
	background-color #f2f3f5
	align-items center
	justify-content center
</style>
