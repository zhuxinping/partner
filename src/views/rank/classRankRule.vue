<template>
	<div class="container">
		<MHeader @backClick="goBack" headerTitle="班级排行榜说明" ></MHeader>
		<div class="main main-bg">
			<div class='sd-title'>班级活跃度</div>
			<p>班级活跃度为本班级所有学生家长使用掌通家园完成积分任务获得的积分总和，可通过以下方式快速提升活跃度；</p>
			<p>1. 引导家长邀请更多家人关注孩子，登录使用掌通家园；</p>
			<p>2. 经常发布高质量的班级相册，引导家长查看、点赞、评论；</p>
			<p>3. 通知发布后，定期提醒未读家长阅读；</p>
			<p>4. 经常使用掌通家园与家长进行留言沟通；</p>
			<p>5. 每天通过掌通家园发布班级亲子任务。</p>
			<p>获得的班级周榜、月榜冠军次数将在每学年9月1日进行重新统计，周冠军次数则以9月1日当周作为新学年的第一周进行统计；</p>
			<p>周榜单数据统计为每周一00:00至周日24:00进行统计，<br>月榜则按照自然月，即从每月1日到月底进行统计；</p>
			<div class='sd-title'>班级周日均活跃比</div>
			<p>一个班级在一个自然周内，平均一个学生有多少个活跃的家长；</p>
			<p>一周平均每天活跃家长数 ÷ 一周平均每天在读学生数每个自然周计算一次，统计上周的班级周活比。</p>
			<div class='sd-title'>班级周日均活跃比级别</div>
			<classRatioExplain></classRatioExplain>
			<div class="sd-text">本排行榜规则最终解释权归掌通家园所有</div>
		</div>
	</div>
</template>
<script>
import MHeader from '@/components/MHeader'
import classRatioExplain from '../home/component/classRatioExplain'
export default {
	name: 'classRankRule',
	components: {
		MHeader,
		classRatioExplain
	},
	methods: {
		goBack () {
			this.$router.go(-1)
		}
	}
}
</script>
