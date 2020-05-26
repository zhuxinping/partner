<template>
	<div class="container" style="background-color: #fff">
		<div class="flex">
			<MHeader @backClick="goBack" headerTitle="排行榜规则" ></MHeader>
		</div>
		<div class="rule-bd">
			<p>1.孩子的所有家人，在本月完成积分任务所得的总关爱值总和；</p>
			<p>2.消耗积分不会降低关爱值；</p>
			<p>3.本月关爱值在每月第一天重新计算，历史记录可查询；</p>
			<p>4.家人离开家庭组后，TA曾经贡献的关爱值不会扣除；</p>
			<p>5.只有孩子加入学校后所得的关爱值才会计入排行榜中；</p>
		</div>
	</div>
</template>
<script>
import MHeader from '@/components/MHeader'
export default {
	name: 'studentRule',
	components: {
		MHeader
	},
	data () {
		return {
		}
	},
	methods: {
		goBack () {
			this.$router.go(-1)
		}
	}
}
</script>
