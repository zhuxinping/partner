<template>
	<div class="container" :style="dateFlag == 2?'background:#fff':''">
		<div class="flex">
			<m-header @backClick="handleClose" :headerTitle="schoolName"></m-header>
			<ul v-show='dateFlag == 1' class="class-room">
				<li class="class-room-li"  v-for="(item, index) in listDate" :key="index" @click="openSutdentReport(item, index)">
					<div class="class-room-text" :style="item.weekActiveRatio>=0.5?'color:#297391;background:#E1F2FA':'color:#614646;background:#FFE7E7'">
						<span class="grade">{{item.gradeName}}</span>
						<span  class="grade">{{item.className}}</span>
					</div>
					<i :class="selectClassIndex === index? 'select-class':''"></i>
				</li>
			</ul>
		</div>
		<div class="main">
			<div class="statics" v-show='dateFlag == 1'>
				<p>上周发布数据统计</p>
				<div class="spr-title">
					<span class="spr-left"><em>相册</em></span>
				</div>
				<ul class="ratio-list">
					<li class="line1">
						<span>相册(条)</span>
						<em>{{item.albumCount  | numThousand }}</em>
					</li>
					<li class="line1">
						<span>点赞/评论/转发(次)</span>
						<em>{{item.likeCount  | numThousand }}/{{item.commentCount  | numThousand }}/{{item.forwardCount  | numThousand }}</em>
					</li>
				</ul>
			</div>
			<div class="statics" v-show='dateFlag == 1'>
				<div class="spr-title">
					<span class="spr-left"><em>通知</em></span>
				</div>
				<ul class="ratio-list">
					<li class="line1">
						<span>通知发布(条)</span>
						<em>{{item.noticeIssuedCount  | numThousand }}</em>
					</li>
					<li class="line1">
						<span>平均阅读率</span>
						<em>{{(item.readRatio*100) | numFilter | numThousand }}%</em>
					</li>
				</ul>
			</div>
			<div class="statics" v-show='dateFlag == 1'>
				<div class="spr-title">
					<span class="spr-left"><em>IM留言</em></span>
				</div>
				<ul class="ratio-list">
					<li class="line1">
						<span>家长留言(人/次)</span>
						<em>{{item.parentCount  | numThousand }}/{{item.parentLeaveMessageCount  | numThousand }}</em>
					</li>
					<li class="line1">
						<span>老师回复次数</span>
						<em>{{item.teacherReplyCount  | numThousand }}</em>
					</li>
				</ul>
			</div>
			<div class="statics" v-show='dateFlag == 1'>
				<div class="spr-title">
					<span class="spr-left"><em>亲子任务</em></span>
				</div>
				<ul class="ratio-list">
					<li class="line1">
						<span>发布数量(个)</span>
						<em>{{item.taskReleaseCount  | numThousand }}</em>
					</li>
					<li class="line1">
						<span>完成任务的学生数量</span>
						<em>{{item.taskCompletedStudentCount  | numThousand }}</em>
					</li>
				</ul>
			</div>
		</div>
		<no-data :operation = 'dateFlag == 2?true:false'></no-data>
	</div>
</template>
<script>
import { setStore, errorMsg, tongji } from '@/utils/common'
import { ReportApi } from '@/api/index'
import NoData from '@/components/no-data'
import MHeader from '@/components/MHeader'
export default {
	name: 'activeClassRoom',
	components: {
		NoData,
		MHeader
	},
	data () {
		return {
			infoInform: setStore('infoInform') ? setStore('infoInform') : '',
			schoolName: '',
			listDate: [],
			dateFlag: 1,
			item: {},
			selectClassIndex: 0
		}
	},
	beforeRouteEnter (to, from, next) {
		to.meta.schoolName = to.params.schoolName
		to.meta.schoolId = to.params.schoolId
		to.meta.radio = to.params.radio
		next()
	},
	mounted () {
		this.schoolName = this.$route.meta.schoolName
		this.getData()
		tongji('09_02_active_ratio_class', '0')
	},
	methods: {
		handleClose () {
			this.$router.push({path: `/reportBaseInfrom/3/${this.$route.meta.schoolId}`})
		},
		openSutdentReport (item, index) {
			this.selectClassIndex = index
			this.item = item
		},
		getData () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			ReportApi.getSchoolAcive(params, res => {
				if (res.body.classActiveList.length !== 0) {
					if (res.code === 10000) {
						this.dateFlag = 1
						this.listDate = res.body.classActiveList
						this.openSutdentReport(this.listDate[0], 0)
					} else {
						this.dateFlag = 2
						errorMsg('接口错误', res, params)
					}
				} else {
					this.dateFlag = 2
				}
			})
		}
	}
}
</script>
<style lang="stylus" scoped>
	@import "./assets/weekroom.styl"
</style>
