<template>
    <div style="padding-top: 10px; background: #fff">
		<div class="grid-container">
			<table class="spr-grid">
				<thead>
				<th class="line"></th>
				<th>当日活跃</th>
				<th class="active">
					<i class="icon-answer" @click="openModal"></i>
					<span class="text">月均日活</span>
				</th>
				<th class="line"></th>
				</thead>
				<tr>
					<td class="cur">学生</td>
					<td class="active">
						<i :class="dayActiveObject.activeStudentTrend?'icon-down':'icon-up'" :style="dayActiveObject.activeStudentTrend==2?'display:none':''"></i>
						<span class="text">{{dayActiveObject.activeStudent | numThousand}}</span>
					</td>
					<td>{{dayActiveObject.monthAverageDailyStudentNum | numFilter | numThousand}}</td>
					<td class="to-link"><i class="icon-right"></i><span @click="studentRank('student')">查看排行榜</span></td>
				</tr>
				<tr>
					<td class="cur">家长</td>
					<td class="active">
						<i :class="dayActiveObject.activeParentTrend?'icon-down':'icon-up'" :style="dayActiveObject.activeParentTrend==2?'display:none':''"></i>
						<span class="text">{{dayActiveObject.activeParent | numThousand}}</span>
					</td>
					<td>{{dayActiveObject.monthAverageDailyParentNum| numFilter | numThousand}}</td>
					<td class="line"></td>
				</tr>
				<tr>
					<td class="cur">园丁</td>
					<td class="active">
						<i :class="dayActiveObject.activeTeacherTrend?'icon-down':'icon-up'" :style="dayActiveObject.activeTeacherTrend==2?'display:none':''"></i>
						<span class="text">{{dayActiveObject.activeTeacher| numThousand}}</span>
					</td>
					<td>{{dayActiveObject.monthAverageDailyTeacherNum| numFilter | numThousand}}</td>
					<td class="to-link"><i class="icon-right"></i><span @click="studentRank('teacher')">查看排行榜</span></td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
import { setStore, toast, tongji } from '@/utils/common'
export default {
	name: 'livelyTable',
	props: {
		dayActiveObject: {}
	},
	data () {
		return {
			actionCode: JSON.stringify(setStore('actionCode'))
		}
	},
	methods: {
		openModal () {
			this.$emit('open')
		},
		studentRank (type) {
			if (type === 'student') {
				tongji('09_03_linkto_student_rankinglist', '1')
				if (this.actionCode.indexOf('"codeId":"STUDENT_RANK_MENU"') !== -1) {
					this.$router.push({path: `/studentRank/1/${this.$route.meta.schoolId}`})
				} else {
					toast('您没有查看学生排行榜的权限！')
				}
			} else {
				tongji('09_03_linkto_teacher_rankinglist', '1')
				if (this.actionCode.indexOf('"codeId":"TEACHER_RANK_MENU"') !== -1) {
					this.$router.push({path: `/newTeacherRank/${this.$route.meta.schoolId}`})
				} else {
					toast('您没有查看园丁排行榜的权限！')
				}
			}
		}
	}
}
</script>

<style lang="stylus" scoped >
	.grid-container
		background #fff
		border-collapse collapse
		padding 0 35px 60px 35px
		.spr-grid
			margin 0 auto
			thead th
				width 150px
				height 80px
				line-height 80px
				border 2.1px solid #eee
				text-align right
				padding-right 16px
				font-size 28px
				font-weight normal
				color #818D9D
			.active
				width 200px
				padding-right 16px
				.text
					float right
				.icon-answer, .icon-up, .icon-down
					float right
					margin-top 25px
				.icon-up, .icon-down
					margin-top 5px
			thead th.line
				position relative
			thead th.line:after
				content ""
				position absolute
				width 100%
				height 80px
				background url("../../../assets/images/icon_line.png") no-repeat
				background-size 100% 100%
				left 0
				top 0
			.to-link
				width 175px
				span
					font-size 22px
					color #a6a6a6
					float right
				.icon-right
					float right
					margin 5px 0 0 10px
			tr td
				width 150px
				height 80px
				border 2.1px solid #eee
				text-align right
				font-size 26px
				color #05ACFF
				padding-right 16px
			tr td.cur
				color #818D9D
				text-align center
				width 120px
				padding-right 0
</style>
