<template>
	<div class="container" style="background-color: #fff">
		<MHeader @backClick="goBack" headerTitle="排行榜规则" ></MHeader>
		<div class="rule-bd">
			<p>互动指数为老师完成积分任务及发布班级相册后家长点赞/评论获得的积分总和，可通过以下方式快速提升互动指数：</p>
			<p>1.在园丁端我的-任务中心，完成积分任务；</p>
			<p>2.经常发布高质量的班级相册，引导家长点赞、评论、分享到微信；</p>
			<p>教师排行榜仅针对老师进行评比排名，园长不参与教师的排名；</p>
			<p>获得的周榜、月榜冠军次数将在每学年9月1日进行重新统计，周冠军次数则以9月1日当周作为新学年的第一周进行统计；</p>
			<p>周榜的数据统计为每周一0:00至周日24:00进行统计，月榜则按照自然月，即从每月1日到月底进行统计；</p>
			<p>本排行榜规则最终解释权归掌通家园所有；</p>
		</div>
	</div>
</template>
<script>
import MHeader from '@/components/MHeader'
export default {
	name: 'teacherRule',
	components: {
		MHeader
	},
	methods: {
		goBack () {
			this.$router.go(-1)
		}
	}
}
</script>
