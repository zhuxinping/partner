<template>
	<div class="container" :style="dateFlag == 2?'background:#fff':''">
		<div class="flex">
			<m-header @backClick="handleClose" :headerTitle="schoolName"></m-header>
			<ul v-show='dateFlag == 1?true:false' class="class-room">
				<li class="class-room-li"  v-for="(item, index) in listDate" :key="index" @click="openSutdentReport(item.classId, index)">
					<div class="class-room-text" :style="item.type?item.type==1?'background: #FFE7D8;color: #8E5431':item.type==2?'background:#E1F2FA;color: #297391':'background: #E2F8E2;color: #307E30':'background:#FFE7E7;color:#614646'">
						<span class="grade">{{item.gradeName}}</span>
						<span  class="grade">{{item.className}}</span>
					</div>
					<i :class="selectClassIndex === index? 'select-class':''"></i>
				</li>
			</ul>
			<div v-show="dateFlag == 1?true:false" class="student">
				<p v-if="haveStudent==1" class="student-text">本班级还没有学生，快去学生管理添加吧</p>
				<p v-else-if="haveStudent==0 && rank==1" class="student-text">本班学生平均有<em>{{average | numFilter}}</em>个家长关注，目前全校排名第<em>{{rank | numThousand}}</em>，第2名只需要再激活<em>{{difference | numThousand}}</em>名家长就能够反超了。</p>
				<p v-else class="student-text">本班学生平均有<em>{{average | numFilter}}</em>个家长关注，目前全校排名第<em>{{rank | numThousand}}</em>，还需要<em>{{difference | numThousand}}</em>名家长激活就能够超过上一名了。</p>
				<ul class="header-student">
					<li><span></span>灰色<br/>{{zeroList.length}}人</li>
					<li><span></span>红色<br/>{{oneList.length}}人</li>
					<li><span></span>橙色<br/>{{twoList.length}}人</li>
					<li><span></span>蓝色<br/>{{threeList.length}}人</li>
					<li><span></span>绿色<br/>{{fourList.length}}人</li>
				</ul>
			</div>
		</div>
		<div class="main">
			<div class="class-list">
				<ul class="tbody-student" v-show="dateFlag == 1?true:false">
					<li> <span v-for="index in maxLength" :key="index">{{zeroList[index-1]?zeroList[index-1].studentName: ''}}</span></li>
					<li> <span v-for="index in maxLength" :key="index">{{oneList[index-1]?oneList[index-1].studentName:''}}</span></li>
					<li> <span v-for="index in maxLength" :key="index">{{twoList[index-1]?twoList[index-1].studentName:''}}</span></li>
					<li> <span v-for="index in maxLength" :key="index">{{threeList[index-1]?threeList[index-1].studentName:''}}</span></li>
					<li> <span v-for="index in maxLength" :key="index">{{fourList[index-1]?fourList[index-1].studentName: ''}}</span></li>
				</ul>
				<ul class="student-tongji header-student">
					<li><span></span>未激活的学生</li>
					<li><span></span>激活1个家长</li>
					<li><span></span>激活2个家长</li>
					<li><span></span>激活3个家长</li>
					<li><span></span>激活4个及以上家长</li>
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
			dateFlag: 0,
			selectClassIndex: 0,
			zeroList: [],
			oneList: [],
			twoList: [],
			threeList: [],
			fourList: [],
			maxLength: 0,
			average: 0,
			rank: 0,
			haveStudent: 0,
			difference: 0
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
		tongji('09_02_activation_ratio_class', '0')
	},
	methods: {
		handleClose () {
			this.$router.push({path: `/reportBaseInfrom/2/${this.$route.meta.schoolId}`})
		},
		openSutdentReport (classId, index) {
			this.selectClassIndex = index
			const that = this
			let params = {}
			params.classId = classId
			params.schoolId = this.$route.meta.schoolId
			ReportApi.getStudentActivationRatio(params, res => {
				if (res.body.length !== 0) {
					if (res.code === 10000) {
						that.dateFlag = 1
						if (res.body) {
							this.average = res.body.dataValue
							this.rank = res.body.rank
							this.haveStudent = res.body.haveStudent
							this.difference = res.body.difference
							this.zeroList = res.body.zeroList
							this.oneList = res.body.oneList
							this.twoList = res.body.twoList
							this.threeList = res.body.threeList
							this.fourList = res.body.fourList
							this.maxLength = Math.max(this.zeroList.length, this.oneList.length, this.twoList.length, this.threeList.length, this.fourList.length)
						}
					} else {
						that.dateFlag = 2
						errorMsg('接口错误', res, params)
					}
				} else {
					that.dateFlag = 2
				}
			})
		},
		getData () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			params.parentsActivationRatio = this.$route.meta.radio
			ReportApi.getClassActivationRatio(params, res => {
				if (res.body.length !== 0) {
					if (res.code === 10000) {
						this.dateFlag = 1
						this.listDate = res.body
						if (res.body) {
							this.openSutdentReport(res.body[0].classId, 0)
						}
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
	@import "./assets/classroom.styl"
</style>
