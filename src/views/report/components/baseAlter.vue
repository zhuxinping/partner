<template>
    <div>
		<dialogModal :isShow="exportFlag" @close="exportFlag = false">
			<ul slot="content" class="alert_ul">
				<li class="example">
					<p class="raito">导入比:</p>
					<p class="roito-left">平均一个在读学生导入了多少个家长。 </p>
					<span class="roito-left">导入家长数（每个在读学生导入的家长数的总和，不去重）÷在读学生数</span>
				</li>
				<li class="example">
					<p class="raito">导入比目标值:<span>{{this.$parent.activationRatio.targetValue|numFilter}}</span></p>
				</li>
			</ul>
		</dialogModal>
		<dialogModal :isShow="livelyFlag" @close="livelyFlag = false">
			<ul slot="content" class="alert_ul">
				<li class="example">
					<p class="raito">激活比:</p>
					<p class="roito-left">一个在读学生有多少个激活的家长。</p>
					<p class="roito-left">在读激活家长数<span>÷</span> 在读学生数</p>
				</li>
				<li class="example">
					<p class="raito">激活比目标值:<span>{{this.$parent.activationRatio.targetValue|numFilter}}</span></p>
				</li>
			</ul>
		</dialogModal>
		<dialogModal :isShow="livelyRatioFlag" @close="livelyRatioFlag = false">
			<ul slot="content" class="alert_ul">
				<li class="example">
					<p class="raito">激活率:</p>
					<p class="roito-left">导入的用户中有百分之多少激活了</p>
					<p class="roito-left">激活数<span>÷</span>在读/在职数*100%</p>
				</li>
				<li class="example">
					<p class="raito">学生激活率目标值:<span>{{this.$parent.studentActivationRateTargetValue}}%</span></p>
				</li>
			</ul>
		</dialogModal>
		<dialogModal :isShow="activeFlag" @close="activeFlag = false">
			<ul slot="content" class="alert_ul">
				<li class="example">
					<p class="raito">活跃比:</p>
					<p class="roito-left">一个学生有多少个活跃的家长</p>
					<p class="roito-left">当日活跃家长数<span>÷</span>在读学生数</p>
				</li>
				<li class="example">
					<p class="raito">家长活跃率:</p>
					<p class="roito-left">在读激活家长中，有百分之多少在活跃</p>
					<p class="roito-left">当日活跃家长数<span>÷</span> 在读激活家长数</p>
				</li>
			</ul>
		</dialogModal>
		<dialogModal :isShow="activeRatioFlag" @close="activeRatioFlag = false">
			<ul slot="content" class="alert_ul">
				<li class="example">
					<p class="raito">月度平均日活学生数:</p>
					<p class="roito-left">这个自然月平均每天有多少个活跃学生。</p>
				</li>
				<li class="example">
					<p class="raito">月度平均日活家长数:</p>
					<p class="roito-left">这个自然月平均每天有多少个活跃家长。</p>
				</li>
				<li class="example">
					<p class="raito">月度平均日活园丁数:</p>
					<p class="roito-left">这个自然月平均每天有多少个活跃教师。</p>
				</li>
				<li class="example">
					<span class="roito-left_left">* 月度平均: 自然月每一天的当日活跃数总和 ÷ 该自然月的天数</span>
				</li>
			</ul>
		</dialogModal>
		<dialogModal :isShow="playFlag" @close="playFlag = false">
			<ul slot="content" class="alert_ul">
				<li class="example">
					<p class="raito">学期:</p>
					<p class="roito-left">春季:2月1日 ~ 7月31日</p>
					<p class="roito-left">秋季:8月1日 ~ 次年1月31日</p>
				</li>
				<li class="example">
					<p class="raito">ARPU值:</p>
					<p class="roito-left">平均每个在读学生带来的收入</p>
				</li>
				<li class="example">
					<p class="raito">订单金额:</p>
					<p class="roito-left">增值服务收入金额</p>
				</li>
				<li class="example">
					<p class="raito">学生付费率:</p>
					<p class="roito-left">有xx%的在读激活学生购买了增值服务</p>
				</li>
			</ul>
		</dialogModal>
		<dialogModal :isShow="sginFlag" @close="sginFlag = false">
			<ul slot="content" class="alert_ul">
				<li class="example">
					<p class="raito">学生绑卡率:</p>
					<p class="roito-left">已绑卡学生数÷当前在读学生数</p>
				</li>
				<li class="example">
					<p class="raito">家长人脸录入率:</p>
					<p class="roito-left">已绑卡且已录人脸家长数÷当前已绑卡家长数</p>
				</li>
				<li class="example">
					<p class="raito">学生签到率:</p>
					<p class="roito-left">已签到学生数÷在读学生数</p>
				</li>
				<li class="example">
					<p class="raito">人脸签到率:</p>
					<p class="roito-left">人脸签到学生数÷在读学生数</p>
				</li>
				<li class="example">
					<p class="raito">家长签到查看率:</p>
					<p class="roito-left">查看APP签到页家长数÷在读激活家长数</p>
				</li>
				<li class="example">
					<p class="raito">近5周趋势:</p>
					<p class="roito-left">近5周，每周周一至周五的每日均值，统计不包含周六周日</p>
				</li>
			</ul>
		</dialogModal>
	</div>
</template>

<script>
import DialogModal from '@/components/dialogModal'
export default {
	name: 'baseAlter',
	components: {
		DialogModal
	},
	data () {
		return {
			exportFlag: false,
			livelyFlag: false,
			livelyRatioFlag: false,
			activeFlag: false,
			activeRatioFlag: false,
			playFlag: false,
			sginFlag: false
		}
	}
}
</script>

<style scoped>

</style>
