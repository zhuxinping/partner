<template>
	<div class="container">
		<MHeader @backClick="goBack" headerTitle="教师爱心榜说明" ></MHeader>
		<div class="main main-bg">
			<div class='sd-title'>什么是教师爱心榜?</div>
			<p>教师爱心榜专为老师打造，根据全校老师爱心值进行排名的榜单。（园长不参与教师排名）</p>
			<p>爱心值=20*发布照片（或视频）数+ 2*收获相册（或视频）点赞数 + 20*发亲子任务数 + 20*发通知、活动 + 20*IM互动</p>
			<p>爱心值获取方式如下</p>
			<ul class="sd-table">
				<li class="sd-thead">
					<span>类型</span>
					<span>分值</span>
					<span>奖励次数</span>
				</li>
				<li class="sd-tbody">
					<span>发布印记(相册、视频）</span>
					<span>每发布1次照片（或视频）+20</span>
					<span>按天奖励，每天3次</span>
				</li>
				<li class="sd-tbody">
					<span>收获相册（或视频）点赞</span>
					<span>每收获1个赞 +2</span>
					<span>按天奖励，每天100次</span>
				</li>
				<li class="sd-tbody">
					<span>发亲子任务</span>
					<span>每发布一条亲子任务 +20</span>
					<span>按周奖励，每周1次</span>
				</li>
				<li class="sd-tbody">
					<span>发通知、活动</span>
					<span>每发布一个通知、活动 +20</span>
					<span>按周奖励，每周1次</span>
				</li>
				<li class="sd-tbody">
					<span>IM互动</span>
					<span>每进行一次IM互动 +20</span>
					<span>按周奖励，每周3次</span>
				</li>
			</ul>
			<div class='sd-title'>如何提升排名?</div>
			<p>1. 坚持每天给家长们发布班级学生的照片或视频。</p>
			<p>2. 发布清晰、高质量的照片，吸引更多的家长给您点赞。</p>
			<div class='sd-title'>具体统计时间如何划分?</div>
			<p>周榜统计时间为：每周一00:00 — 每周日24:00</p>
			<p>月榜统计时间为：每月一日00:00 — 每月最后一天24:00</p>
			<p>获得冠军次数根据学年来统计；每年9月1日至次年8月31日为1学年</p>
			<div class='sd-title'>如何查看历史排行?</div>
			<p>点击排行页面右上角“历史排行”按钮，即可查看之前每个月的排行情况。</p>
			<p style="padding-bottom: 15px">您可查询最近1年的排行信息。</p>
			<div class="sd-text">本排行榜规则最终解释权归掌通家园所有</div>
		</div>
	</div>
</template>
<script>
import MHeader from '@/components/MHeader'
export default {
	name: 'newTeacherRan',
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
