<template>
	<div class="container">
		<m-header @backClick="handleClose" :headerTitle="agentNumber"></m-header>
		<div class="main" >
			<div class="banner" v-show="banner?true:false">
				<mt-swipe :auto="4000" :show-indicators="banner.length>1?true:false">
					<mt-swipe-item v-for="(item,index) in banner" :key="index"><span @click="handleChange(item.type, item.jumpUrl, index)"><img :src="item.imageUrl" alt=""></span></mt-swipe-item>
				</mt-swipe>
			</div>
			<img class="default_img" v-show="banner?false:true" :src="jumpUrl" alt="">
			<div class="action-dl">
				<p class="home-p"><span>{{userName}}</span>，您好！欢迎使用掌通伙伴……</p>
				<mt-swipe class='action' :auto="0" :show-indicators="swiper&&swiper.length===1?false:true">
					<mt-swipe-item v-for="(item1,i) in swiper" :key="i">
						<dl class="home-dl" v-for="(item, index) in item1" :key="index" @click="jumpAction(item.eventTitle)" v-show='item.show'>
							<dt class="_dt"><img :src=item.imgUrl alt=""></dt>
							<dd class="_dd">{{item.title}}</dd>
							<dd class="_mark" :id='item.mark' v-if="item.mark"></dd>
						</dl>
					</mt-swipe-item>
				</mt-swipe>
			</div>
			<div class="class_week-ratio" v-show='actionCode.indexOf("\"codeId\":\"CLASS_ACTIVE_MENU\"") ==-1?false:true'>
				<span class="spr-left"><em>班级周日均活跃比</em><i class="icon-answer" @click="ratioExplain"></i></span>
				<div class="week-ratio-info" @click="jumpAction('active')">
					<div class="week-ratio-info-left">
						<span>上周新增B级及以上班级<em><i v-if="~~weekRatioStage.trend == 2" class="icon-reduce" style="margin-right: 5px"></i>{{weekRatioStage.bAboveClassCountNew |numAbs|numThousand}}</em>班；</span>
						<span>全部B级及以上 <em>{{weekRatioStage.bAboveClassCount|numThousand}}</em>班，B级以下 <em>{{weekRatioStage.bFollowClassCount|numThousand}}</em>班</span>
					</div>
					<img class="right" src="../../assets/images/list-arrow.png" alt="">
				</div>
				<div @click="jumpAction('active')">
					<classWeekRatio :weekRatioStage="weekRatioStage"></classWeekRatio>
				</div>
			</div>
			<Tsgj v-show='actionCode.indexOf("\"codeId\":\"ALBUM_COUNT_MENU\"") ==-1?false:true'></Tsgj>

			<div class="active_tab_text" v-show='actionCode.indexOf("\"codeId\":\"ACTIVATE_REPORT_COUNT_MENU\"") ==-1?false:true' @click="jumpAction('activation')">
				<span class="spr-left"><em>激活报告</em></span>
				<div class="active_text">
					<p class="_text">昨天新增激活比达标园 {{activationObject.standardsTotalYesterdayCount}} 家；</p>
					<p class="_text">本周新增激活比达标园 {{activationObject.standardsTotalWeekCount}} 家；</p>
					<p class="_text">已达标 {{activationObject.standardCount}} 家，达标率 {{activationObject.controlRatesStr}}，未达标 {{activationObject.belowStandardCount}} 家</p>
				</div>
				<img class="right" src="../../assets/images/list-arrow.png" alt="">
			</div>
			<div class="button" @click="safeLogout">退出登录</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { setStore, tongji, toast, errorMsg, close, openLink, setSession } from '@/utils/common'
import { Swipe, SwipeItem } from 'mint-ui'
import { ReportApi } from '@/api/index'
import MHeader from '@/components/MHeader'
import Tsgj from '../sgj/homeSgj'
import classWeekRatio from './component/classWeekRatio'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
export default {
	name: 'home',
	components: {
		MHeader,
		Tsgj,
		classWeekRatio
	},
	data () {
		return {
			faultcount: 0,
			userName: '',
			infoInform: setStore('infoInform'),
			actionCode: JSON.stringify(setStore('actionCode')),
			actionCodeObject: '',
			agentNumber: '',
			banner: setStore('banner'),
			jumpUrl: require('../../assets/images/icon_default.png'),
			activationObject: {},
			swiper: [],
			action: [
				{
					eventTitle: 'report',
					codeId: 'REPORT_MANAGE',
					imgUrl: require('../../assets/images/icon_bby.png'),
					title: '报备园',
					show: false
				},
				{
					eventTitle: 'visited',
					codeId: 'CALL_ON_ACTION_RECORD_MENU',
					imgUrl: require('../../assets/images/icon_bf.png'),
					title: '拜访记录',
					show: false
				},
				{
					eventTitle: 'backvisited',
					codeId: 'RETURN_VISIT_MANAGE',
					imgUrl: require('../../assets/images/icon_fh.png'),
					title: '客户回访(售后)',
					show: false
				},
				{
					eventTitle: 'customService',
					codeId: 'CONTACT_CUSTOMER_MENU',
					imgUrl: require('../../assets/images/icon_kefu.png'),
					title: '联系客服',
					show: false
				},
				{
					eventTitle: 'formsSchoolList',
					codeId: 'ALBUM_COUNT_MENU',
					imgUrl: require('../../assets/images/icon_shiguangji.png'),
					title: '时光集报表',
					show: false
				},
				{
					eventTitle: 'briefing',
					codeId: 'OPERATION_BRIEF_MENU',
					imgUrl: require('../../assets/images/icon_jy.png'),
					title: '经营简报',
					show: false
				},
				{
					eventTitle: 'faultAlarm',
					codeId: 'VEDIO_ALARM_MENU',
					imgUrl: require('../../assets/images/icon_faultalarm.png'),
					title: '故障预警',
					mark: 'markFault',
					show: false
				},
				{
					eventTitle: 'activation',
					codeId: 'ACTIVATE_REPORT_MENU',
					imgUrl: require('../../assets/images/icon_jh.png'),
					title: '激活报表',
					show: false
				},
				{
					eventTitle: 'active',
					codeId: 'ACTIVE_REPORT_MENU',
					imgUrl: require('../../assets/images/icon_hy.png'),
					title: '活跃报表',
					show: false
				},
				{
					eventTitle: 'payTable',
					codeId: 'PAY_REPORT_MENU',
					imgUrl: require('../../assets/images/icon_pay.png'),
					title: '付费报表',
					show: false
				},
				{
					eventTitle: 'attendance',
					codeId: 'SIGN_ACTIVE_MENU',
					imgUrl: require('../../assets/images/icon-qiandao.png'),
					title: '签到报表',
					show: false
				},
				{
					eventTitle: 'teacherRank',
					codeId: 'TEACHER_RANK_MENU',
					imgUrl: require('../../assets/images/icon_yd.png'),
					title: '园丁排行榜',
					show: false
				},
				{
					eventTitle: 'studentRank',
					codeId: 'STUDENT_RANK_MENU',
					imgUrl: require('../../assets/images/icon_xs.png'),
					title: '学生排行榜',
					show: false
				}
			],
			weekRatioStage: {}
		}
	},
	mounted () {
		this.userName = this.infoInform.trueName
		this.getActivationInfo()
		this.getLevel()
		if (this.infoInform.agentLevel) {
			let agentLevel = this.infoInform.agentLevel + '级'
			this.agentNumber = agentLevel + ' ' + this.infoInform.agentNumber + ' ' + this.infoInform.agentName
		} else {
			this.agentNumber = this.infoInform.agentNumber + ' ' + this.infoInform.agentName
		}
		if (this.infoInform) {
			this.getActionCode()
			this.getBanner()
		} else {
			toast('您已退出掌通伙伴，请返回或者关闭，然后重新登录！')
		}
		tongji('00_homepage', '0')
	},
	methods: {
		faultQua () { // 预警数量
			let params = {
				'agentId': this.infoInform.id,
				'agentChildAuthArea': this.infoInform.agentChildAuthArea,
				'agentChildAccount': this.infoInform.agentChildAccount
			}
			ReportApi.menuFaultQua(params, res => {
				if (res.code === 10000 && res.body) {
					let ele = document.querySelector('#markFault')
					if (ele) {
						ele.innerHTML = res.body + ''
						// ele.style = 'display: block' // ios 部分不兼容
						ele.setAttribute('class', '_mark menu-block')
					}
				}
			})
		},
		getActivationInfo () {
			let params = {}
			params.agentId = this.infoInform.id
			params.type = 2
			if (this.infoInform.agentChildAccount) {
				params.areaIds = this.infoInform.agentChildAuthArea
			}
			ReportApi.getActivationInfo(params, res => {
				if (res.code === 10000) {
					this.activationObject = res.body
				} else {
					toast(res.message)
				}
			})
		},
		getActionCode () {
			if (!setStore('actionCode')) {
				let params1 = {}
				params1.roleId = this.infoInform.roleId
				params1.userCenterIdDing = this.infoInform.userCenterId
				ReportApi.getActionCode(params1, reg => {
					if (reg.flag) {
						setStore('actionCode', reg.data)
						this.actionCodeObject = reg.data
						this.actionCodeObject[0].menuList.forEach(item => {
							this.action.forEach(key => {
								if (item.codeId === key.codeId) {
									key.show = true
								}
							})
						})
						this.action.forEach((item, index) => {
							if (!item.show) {
								this.action.splice(index, 1, 'aa')
							}
						})
						this.action = this.uniq(this.action)
						this.action.forEach((item, index) => {
							if (item === 'aa') {
								this.action.splice(index, 1)
							}
						})
						let length = Math.ceil(this.action.length / 8)
						if (length === 1) {
							this.swiper.push(this.action)
						} else {
							this.swiper.push(this.action.slice(0, 8))
							this.swiper.push(this.action.slice(8, this.action.length))
						}
						this.actionCode = JSON.stringify(reg.data)
						this.faultQua()
					} else {
						errorMsg('接口错误', reg, params1)
						toast(reg.msg)
					}
				})
			} else {
				this.actionCodeObject = setStore('actionCode')
				this.actionCodeObject[0].menuList.forEach(item => {
					this.action.forEach(key => {
						if (item.codeId === key.codeId) {
							key.show = true
						}
					})
				})
				this.action.forEach((item, index) => {
					if (!item.show) {
						this.action.splice(index, 1, 'aa')
					}
				})
				this.action = this.uniq(this.action)
				this.action.forEach((item, index) => {
					if (item === 'aa') {
						this.action.splice(index, 1)
					}
				})
				let length = Math.ceil(this.action.length / 8)
				// console.log(length)
				if (length === 1) {
					this.swiper.push(this.action)
				} else {
					this.swiper.push(this.action.slice(0, 8))
					this.swiper.push(this.action.slice(8, this.action.length))
					// console.log(this.swiper)
				}
				this.faultQua()
			}
		},
		getBanner () {
			if (!setStore('banner')) {
				let params10 = {}
				params10.userCenterIdDing = this.infoInform.userCenterId
				ReportApi.getBanner(params10, res => {
					if (res.flag) {
						if (res.data) {
							this.banner = res.data
							setStore('banner', res.data)
						}
					} else {
						toast(res.msg)
						errorMsg('接口错误', res, params10)
					}
				})
			}
		},
		uniq (arr) {
			let newArr = [arr[0]]
			for (let i = 1; i < arr.length; i++) {
				if (newArr.indexOf(arr[i]) === -1) {
					newArr.push(arr[i])
				}
			}
			return newArr
		},
		handleClose () {
			close()
		},
		handleChange (type, url, index) {
			if (type) {
				tongji('00_homepage_banner', '1', (index + 1))
				url = url + (url.indexOf('?') === -1 ? '?' : '&') + 'num=' + this.infoInform.agentNumber
				openLink(url)
			}
		},
		jumpAction (title) {
			if (title === 'activation') {
				this.actionCode.indexOf('"codeId":"ACTIVATE_REPORT_MENU"') !== -1 ? tongji('00_activation_report', '1') : toast('您没有查看激活报表的权限！')
			} else if (title === 'active') {
				tongji('00_active_ratio_report', '1')
				this.actionCode.indexOf('"codeId":"ACTIVE_REPORT_MENU"') !== -1 ? tongji('00_active_ratio_report', '1') : toast('您没有查看活跃报表的权限！')
			} else if (title === 'studentRank') {
				this.$router.push({path: `/studentRank/0/''`})
				return false
			}
			this.$router.push('/' + title)
		},
		safeLogout () {
			if (this.infoInform) {
				let params = {}
				params.userCenterIdDing = this.infoInform.userCenterId
				ReportApi.loginout(params, res => {
					if (res.flag) {
						sessionStorage.clear()
						localStorage.clear()
						this.$router.push('/login')
					} else {
						errorMsg('接口错误', res, params)
					}
				})
			} else {
				toast('您已退出掌通伙伴，请返回或者关闭，然后重新登录！')
			}
		},
		ratioExplain () {
			this.$router.push('/classRatioExplain/0')
		},
		getLevel () {
			let params = {}
			params.agentId = this.infoInform.id
			params.areaIds = this.infoInform.agentChildAuthArea
			ReportApi.getClassActiveWeely(params, res => {
				if (res.code === 10000) {
					this.weekRatioStage = res.body
				} else {
					toast(res.message)
				}
			})
		}
	}
}
</script>

<style lang="stylus">
	/*@import "../../assets/stylus/common.styl"*/
	@import "./assets/home.styl"
</style>
