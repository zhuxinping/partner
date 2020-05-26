<template>
	<div>
		<div class="spr-title" style="margin-top: 10px">
			<span class="spr-left"><em>{{title}}</em><i class="icon-answer" @click="activeFlag = true"></i></span>
		</div>
		<div class="grid-container">
			<table class="spr-grid">
				<thead>
					<th class="line"></th>
					<th>新增学生数</th>
					<th>导入家长数<br>(不去重)</th>
					<th class="export">导入比</th>
				</thead>
				<tr>
					<td class="cur">全校</td>
					<td class="active">{{listData&&listData.wholeSchool.studentNumber | numThousand}}</td>
					<td class="active">{{listData&&listData.wholeSchool.parentNumber | numThousand}}</td>
					<td class="month_active">{{listData&&listData.wholeSchool.parentImportRatio | numFilter}}</td>
				</tr>
				<tr>
					<td class="cur">入园登记表</td>
					<td class="active">{{listData&&listData.registration.studentNumber | numThousand}}</td>
					<td class="active">{{listData&&listData.registration.parentNumber | numThousand}}</td>
					<td class="month_active" style="color: #38BF7A;">{{listData&&listData.registration.parentImportRatio | numFilter}}</td>
				</tr>
				<tr>
					<td class="cur">学校添加导入</td>
					<td class="active">{{listData&&listData.schoolAddImport.studentNumber | numThousand}}</td>
					<td class="active">{{listData&&listData.schoolAddImport.parentNumber | numThousand}}</td>
					<td class="month_active" style="color: #FF5E68;">{{listData&&listData.schoolAddImport.parentImportRatio | numFilter}}</td>
				</tr>
				<tr>
					<td class="cur">其他</td>
					<td class="active">{{listData&&listData.other.studentNumber | numThousand}}</td>
					<td class="active">{{listData&&listData.other.parentNumber | numThousand}}</td>
					<td class="month_active">{{listData&&listData.other.parentImportRatio | numFilter}}</td>
				</tr>
			</table>
			<span class="remark">注：使用入园登记表添加学生，能够快速提高家长导入比，提高家长付费意愿</span>
		</div>
		<dialogModal :isShow="activeFlag" @close="activeFlag = false">
			<ul slot="content" class="toast">
				<li class="text">本周新增学生仅统计当周新增学生导入的家长情况，统计时间为本周一截止到昨日24:00的数据</li>
				<li class="text">若当前为周一则显示上周一至上周日24：00的数据</li>
				<li class="text">
					<p class="raito">入园登记表:</p>
					<p>通过园丁端→学生管理→分享到微信或打印学生管理的入校邀请码，家长打开页面，提交新增的学生。</p>
					</li>
				<li class="text">
					<p class="raito">学校添加导入:</p>
					<p>通过幼教后台或园丁端导入、单独录入添加的学生</p>
				</li>
				<li class="text">
					<span class="raito">其他:</span>
					<p>通过家长端申请加入学校添加的学生</p>
				</li>
			</ul>
		</dialogModal>
	</div>
</template>

<script>
import DialogModal from '@/components/dialogModal'
import { ReportApi } from '@/api/index'
import { toast, errorMsg } from '@/utils/common'
import moment from 'moment'
export default {
	name: 'exportTable',
	components: {
		DialogModal
	},
	data () {
		return {
			activeFlag: false,
			listData: '',
			title: ''
		}
	},
	mounted () {
		this.getData()
	},
	methods: {
		getData () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			ReportApi.exportTable(params, res => {
				if (res.code === 10000) {
					this.listData = res.body
					if (res.body.flagMonday) {
						this.title = '上周新增学生'
					} else {
						this.title = '本周新增学生'
					}
				} else {
					if (moment().day() === 1) {
						this.title = '上周新增学生'
					} else {
						this.title = '本周新增学生'
					}
					toast(res.msg)
					errorMsg('接口错误', res, params)
				}
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
	.grid-container
		background #fff
		border-collapse collapse
		padding 10px 35px 0
		.spr-grid
			margin auto
			thead th
				width 170px
				height 80px
				border 2.1px solid #eee
				text-align right
				font-size 26px
				color #818D9D
				padding-right 20px
				font-weight 400
			thead th.line
				position relative
				width 200px
			thead th.line:after
				content ""
				position absolute
				width 100%
				height 80px
				background url("../../../assets/images/icon_line.png") no-repeat
				background-size 100% 100%
				left 0
				top 0
			thead th.export
				width 140px
			tr td
				height 80px
				line-height 80px
				border 2.1px solid #eee
				text-align right
				font-size 26px
				color #05ACFF
				padding-right 20px
				font-family 'sans-serif'
			tr td.cur
				width 200px
				color #818D9D;
				text-align center
				padding-right 0px
			tr td.active
				width 170px
			tr td.month_active
				width 140px
		.remark
			display inline-block
			text-align left
			margin 30px 0
			font-size 26px
			color #FF5E68
	.toast
		font-size 26px
		color #333
		padding 30px 44px 38px 34px
		display flex
		flex-direction column
		.text
			text-align left
			margin-top 20px
			.raito
				color #74A9FF
</style>
