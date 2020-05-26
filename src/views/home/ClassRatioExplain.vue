<template>
    <div class="container">
		<m-header @backClick="handleClose" headerTitle="说明"></m-header>
		<div class="main" style="background-color: #fff;padding-top: 20px">
			<div v-show="type">
				<span class="explain-title">活跃比：</span>
				<span class="explain-info explain-info2">一个在读学生有多少个活跃的家长<br>当日活跃家长数 ÷ 在读学生数</span>
				<span class="explain-title">家长活跃率：</span>
				<span class="explain-info explain-info2">在读激活家长中，有百分之多少在活跃<br>当日活跃家长数 ÷ 在读激活家长数</span>
			</div>
			<span class="explain-title">班级周日均活跃比：</span>
			<span class="explain-info explain-info1">一个班级在一个自然周内，平均一个学生有多少个活跃的家长</span>
			<span class="explain-info">一周平均每天活跃家长数 ÷ 一周平均每天在读学生数<br>每个自然周计算一次，统计上周的班级周活比。</span>
			<span class="explain-title">班级周日均活跃比级别：</span>
			<classRatioExplain></classRatioExplain>
		</div>
	</div>
</template>

<script>
import classRatioExplain from './component/classRatioExplain'
import DialogModal from '@/components/dialogModal'
import MHeader from '@/components/MHeader'
export default {
	name: 'ClassRatioExplain',
	components: {
		classRatioExplain,
		DialogModal,
		MHeader
	},
	data () {
		return {
			type: 0
		}
	},
	beforeRouteEnter (to, from, next) {
		to.meta.type = to.params.type
		next()
	},
	mounted () {
		this.type = ~~this.$route.meta.type
		console.log(this.type)
	},
	methods: {
		handleClose () {
			this.$router.go(-1)
		}
	}
}
</script>

<style scoped lang="stylus">
.explain-title
	margin 0 0 20px 30px
	color #74A9FF
	font-size 28px
	display block
	text-align left
.explain-info
	margin 0 30px
	margin-bottom 60px
	font-size 28px
	display block
	color #818D9D
	text-align left
.explain-info1
	margin-top -5px
	margin-bottom 10px
.explain-info2
	margin-top -5px
</style>
