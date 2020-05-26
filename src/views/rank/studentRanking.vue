<template>
	<div class="container">
		<div class="flex">
			<MHeader @backClick="goBack" :headerTitle="type?'学生排行榜-按学校':topStr" ></MHeader>
			<div class="time-nav">
				<span @click="openTime">{{month}}月排行 <i :class="timeFlag?'icon-select': ''"></i></span>
				<em v-if="type && timeFalg">实时数据</em>
				<em v-if="!type && timeFalg">昨天({{yesterdayStr}})</em>
			</div>
		</div>
		<ul class="load-list">
			<li class="rank-li" v-for="(item, index) in list" :key="index">
				<div class="list-left">
					<i class="common" v-if="item.score && item.rank <=3" :class="item.rank==1?'rank1':item.rank==2?'rank2':item.rank==3?'rank3':''"></i>
					<i class="common" v-else>{{item.score?item.rank: ''}}</i>
					<img class="avtar-img" :src="type?item.studentPic:item.userPic" alt="">
					<div class="user-info">
						<span class="active">{{type?item.studentName : item.name}}</span>
						<span>{{item.className}}</span>
						<span class="agent-school" v-if="!type">
							<em>{{item.schoolNumber}}</em>
							<em class="name-str">{{item.schoolName}}</em>
						</span>
					</div>
				</div>
				<div class="list-right">
					<span  class="top" v-if="!index">关爱值<i @click.stop="toRule" class="icon-answer"></i></span>
					<span class="bom">{{item.score}}</span>
					<span class="last">{{item.familyNum}}位家长关注</span>
				</div>
			</li>
			<v-loading ref="loading" :loadingFlag="true"></v-loading>
		</ul>
		<mt-datetime-picker class="time no-date" ref="picker" type="date" v-model="pickerValue" @confirm="handleConfirm" :endDate="endDate" :startDate="startDate"></mt-datetime-picker>
	</div>
</template>
<script>
import Vue from 'vue'
import MHeader from '@/components/MHeader'
import { ReportApi } from '@/api/index'
import { DatetimePicker } from 'mint-ui'
import { setStore, tongji, toast, deafultImg } from '@/utils/common'
import VLoading from '@/components/loading'
import moment from 'moment'
Vue.component(DatetimePicker.name, DatetimePicker)
export default {
	name: 'studentRanking',
	components: {
		MHeader,
		VLoading
	},
	data () {
		return {
			popupVisible: false,
			callDay: '',
			month: '本',
			list: [],
			infoInform: setStore('infoInform'),
			rankImg: require('../../assets/images/icon_head.png'),
			startTime: '请选择',
			endTime: '请选择',
			startDate: new Date('2018-01-01'),
			timeFalg: true,
			endDate: new Date(),
			pickerValue: new Date(),
			type: null,
			topStr: '',
			yesterdayStr: '',
			timeFlag: 0
		}
	},
	mounted () {
		this.type = ~~this.$route.meta.type
		// 获取学生排行榜有数据的开始年月时间
		if (this.type) {
			tongji('08_02_students_monthly_list', '0')
			this.getSchoolTime()
		} else {
			tongji('08_01_students_monthly_list', '0')
			this.getAgentTime()
		}
	},
	// 每次进入路由之前都会执行这个钩子函数 然后获取数据 赋值给下一个组件
	beforeRouteEnter (to, from, next) {
		to.meta.type = to.params.type
		to.meta.schoolId = to.params.schoolId
		next()
	},
	methods: {
		goBack () {
			if (this.type) {
				tongji('08_02_back', '1')
				this.$router.push({path: `/reportBaseInfrom/3/${this.$route.meta.schoolId}`})
			} else {
				tongji('08_01_back', '1')
				this.$router.go(-1)
			}
		},
		// 打开时间弹窗
		openTime () {
			if (this.timeFlag) {
				this.$refs.picker.open()
			}
		},
		handleConfirm (data) {
			document.getElementsByClassName('load-list')[0].scrollTop = 0
			let date = moment(data).format('YYYY-MM')
			let time = moment().format('YYYY-MM')
			this.month = (date === time) ? '本' : date.replace(/-/g, '年')
			if (date === time) {
				this.timeFalg = true // 判断右边展示的是昨天的数据还是实时数据
				this.getData()
			} else {
				this.timeFalg = false
				this.getData(date)
			}
			if (this.type) {
				tongji('08_01_history__monthly_list', '1')
			} else {
				tongji('08_02_history__monthly_list', '1')
			}
		},
		// 获取学生排行榜最早有数据的年月 -- 学校维度
		getSchoolTime () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			ReportApi.getStudentRankStarDateBySchool(params, res => {
				if (res.code === 10000) {
					let time = res.body.substr(0, 10)
					this.startDate = new Date(time)
					this.timeFlag = res.body ? 1 : 0
					this.getData()
				} else {
					toast(res.message)
				}
			})
		},
		// 获取学生排行榜最早有数据的年月 -- 代理商维度
		getAgentTime () {
			let params = {}
			params.agentId = this.infoInform.id
			ReportApi.getStudentRankStarDateByAgent(params, res => {
				if (res.code === 10000) {
					let time = res.body.substr(0, 10)
					this.startDate = new Date(time)
					this.timeFlag = res.body ? 1 : 0
					this.getData()
				} else {
					toast(res.message)
				}
			})
		},
		getData (time) {
			if (this.type) {
				if (time) {
					this.historyDate(time)
				} else {
					this.nowDate()
				}
			} else {
				this.agentDate(time)
			}
		},
		// 按学校维度的实时接口
		nowDate () {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			ReportApi.getstudentrankbyschool(params, res => {
				if (res.code === 10000 && res.body.length) {
					this.list = res.body
					res.body.forEach(item => {
						item.studentPic = item.studentPic ? item.studentPic + '?imageView/1/w/160/h/160' : deafultImg('student', item.sexNew)
					})
				}
				this.$refs.loading.change()
			})
		},
		// 按照学校维度的历史接口
		historyDate (time) {
			let params = {}
			params.schoolId = this.$route.meta.schoolId
			params.date = time
			ReportApi.getstudenthisrankByschool(params, res => {
				if (res.code === 10000 && res.body.length) {
					this.list = res.body
					res.body.forEach(item => {
						item.studentPic = item.studentPic ? item.studentPic + '?imageView/1/w/160/h/160' : deafultImg('student', item.sexNew)
					})
				}
				this.$refs.loading.change()
			})
		},
		// 代理商维度接口
		agentDate (time) {
			let params = {}
			params.agentId = this.infoInform.id
			if (time) {
				params.date = time
			}
			ReportApi.getstudentrankbyagent(params, res => {
				// 判断code码状态
				if (res.code === 10000 && res.body.list) {
					this.list = res.body.list
					let time = res.body.yesterdayStr ? res.body.yesterdayStr : moment().subtract(1, 'days').format('YYYY-MM-DD')
					let arr = time.split('-')
					this.yesterdayStr = arr[1] + '月' + arr[2] + '日'
					this.topStr = res.body.top ? '学生排行榜TOP' + res.body.top : ''
					if (res.body.list.length) {
						res.body.list.forEach(item => {
							item.userPic = item.userPic ? item.userPic + '?imageView/1/w/160/h/160' : deafultImg('student', item.sexNew)
						})
					}
				}
				this.$refs.loading.change()
			})
		},
		// 跳转排行榜规则
		toRule () {
			this.$router.push({path: '/studentRule'})
		}

	}
}
</script>
