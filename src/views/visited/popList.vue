<template>
	<div class="container">
		<div class="flex">
			<m-header @backClick="handleClose" headerTitle="选择联系人"></m-header>
			<span class="right-text" v-if = 'addPersonNull' @click="addPerson" >添加联系人</span>
		</div>
		<mt-loadmore class="main" :top-method="loadTop" @top-status-change="handleTopChange" topLoadingText="正在刷新..." ref="loadmore">
			<div v-infinite-scroll="loadMore" infinite-scroll-distance="100" :infinite-scroll-immediate-check="true">
				<mt-cell-swipe v-for="(item,index) in list" :key="index"
							:right='item.fixedFlag == 0? [
							{	content: "修改",
								style: { background: "#74A9FF", color: "#fff", width: "60px", height: "100%", display: updatePersonNull === false? "none !important":  "show"},
								handler: () => updatePerson(item)
							},
							{
								content: "删除",
								style: { background: "#ef7980", color:"#fff", width:"60px", height: "100%", display: deletePersonNull === false? "none !important":  "show"},
								handler: () => deletePerson(item)
							}
						] : []'>
					<ul class="main-list" style="border: 0"  @click.prevent="selectRole(item.userName, item.id, item.userNameBack)" @touchend="touchend($event)">
						<li class="first">
							<img  class="logo" src='../../assets/images/icon_head.png' alt="">
							<div class="right-content">
								<div class="person-content">
									<span>{{item.userName}}</span>
								</div>
								<div class="person-content person-content-bottom">
									<span>{{item.roleTypeName}}</span>
									<span>{{item.phone}}</span>
									<span>{{item.wechat}}</span>
								</div>
							</div>
						</li>
						<li class="person-remark">{{item.fixedFlag ==1?'客户填写的信息':item.remark}}</li>
					</ul>
				</mt-cell-swipe>
			</div>
			<v-loading ref="loading" :loadingFlag = 'loadingFlag'></v-loading>
		</mt-loadmore>
	</div>
</template>

<script>
import Vue from 'vue'
import { setStore, setSession, toast, errorMsg } from '@/utils/common'
import { ReportApi } from '@/api/index'
import MHeader from '@/components/MHeader'
import { Loadmore, CellSwipe } from 'mint-ui'
// import FastClick from 'fastclick'
import VLoading from '@/components/loading'
// const deviceIsWindowsPhone = navigator.userAgent.indexOf('Windows Phone') >= 0
// const deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone
Vue.component(Loadmore.name, Loadmore)
Vue.component(CellSwipe.name, CellSwipe)
export default {
	name: 'pop-list',
	components: {
		MHeader,
		Loadmore,
		CellSwipe,
		VLoading
	},
	data () {
		return {
			actionCode: JSON.stringify(setStore('actionCode')),
			list: [],
			infoInform: setStore('infoInform'),
			page: 1,
			pageSize: 10,
			loadingFlag: true,
			delayLoad: false,
			switch: true,
			addPersonNull: false,
			updatePersonNull: false,
			deletePersonNull: false,
			info: JSON.parse(this.$route.meta.info),
			schoolTypeId: ''
		}
	},
	beforeRouteEnter (to, from, next) {
		to.meta.type = to.params.type
		to.meta.info = to.params.info
		next()
	},
	mounted () {
		this.schoolTypeId = this.info.schoolType
		this.keepAction()
		this.getData()
	},
	methods: {
		touchend (e) {
			e.stopPropagation()
			e.cancelBubble = true
			// FastClick.prototype.onTouchStart = function (event) {
			// 	let e = event || window.event
			// 	if (deviceIsIOS) {
			// 		e.stopPropagation() // 阻止事件的进一步传播，包括（冒泡，捕获），无参数
			// 		e.cancelBubble = true
			// 	}
			// }
			// FastClick.prototype.onTouchMove = function (event) {
			// 	let e = event || window.event
			// 	if (deviceIsIOS) {
			// 		e.stopPropagation() // 阻止事件的进一步传播，包括（冒泡，捕获），无参数
			// 		e.cancelBubble = true
			// 	}
			// }
			// FastClick.prototype.onTouchEnd = function (event) {
			// 	let e = event || window.event
			// 	if (deviceIsIOS) {
			// 		e.stopPropagation() // 阻止事件的进一步传播，包括（冒泡，捕获），无参数
			// 		e.cancelBubble = true
			// 	}
			// }
			// FastClick.attach(document.body)
		},
		setSwitch () {
			this.switch = false
		},
		handleClose () {
			toast('请选择联系人！')
		},
		keepAction () {
			if (~~this.$route.meta.type) {
				if (this.actionCode.indexOf('CALL_ON_CONTACT_ADD') !== -1) {
					this.addPersonNull = true
				}
				if (this.actionCode.indexOf('CALL_ON_CONTACT_EDIT') !== -1) {
					this.updatePersonNull = true
				}
				if (this.actionCode.indexOf('CALL_ON_CONTACT_DELETE') !== -1) {
					this.deletePersonNull = true
				}
			} else {
				if (this.actionCode.indexOf('RETURN_VISIT_CONTACT_ADD') !== -1) {
					this.addPersonNull = true
				}
				if (this.actionCode.indexOf('RETURN_VISIT_CONTACT_EDIT') !== -1) {
					this.updatePersonNull = true
				}
				if (this.actionCode.indexOf('RETURN_VISIT_CONTACT_DELETE') !== -1) {
					this.deletePersonNull = true
				}
			}
		},
		addPerson () {
			this.$router.push({path: `/addPop/${this.$route.meta.type}/${this.info.schoolId}/${this.schoolTypeId}/${JSON.stringify(this.info)}`})
		},
		updatePerson (item) {
			let params = {}
			params.id = item.id
			params.userCenterIdDing = this.infoInform.userCenterId
			ReportApi.getPersonBase(params, res => {
				if (res.flag) {
					setSession('roleInfo', res.data)
					this.$router.push({path: `/updatePop/${this.$route.meta.type}/${this.info.schoolId}/${this.schoolTypeId}/${JSON.stringify(this.info)}`})
				} else {
					toast(res.msg)
					errorMsg('接口错误', res, params)
				}
			}).catch((error) => {
				errorMsg('catch错误', error, {})
			})
		},
		deletePerson (item) {
			const that = this
			/* global dd */
			dd.device.notification.confirm({
				title: '温馨提示',
				message: '确定要删除联系人吗？',
				buttonLabels: ['取消', '确定'],
				onSuccess: function (result) {
					if (result.buttonIndex) {
						let formData = new FormData()
						formData.append('id', item.id)
						formData.append('userCenterIdDing', that.infoInform.userCenterId)
						ReportApi.deleteRole(formData, res => {
							if (res.flag) {
								that.page = 1
								that.getData(1)
							} else {
								toast(res.msg)
								errorMsg('接口错误', res, formData)
							}
						})
					}
				},
				onFail: function (error) {
					errorMsg('钉钉删除联系人回调', error, {})
				}
			})
		},
		loadMore () {
			// 加载完毕不在上拉请求数据
			if (this.delayLoad) {
				return false
			}
			this.delayLoad = true
			this.getData()
			this.$refs.loading.onchange()
		},
		// 获取首页列表数据(下拉刷新)
		loadTop () {
			this.page = 1
			this.getData(1)
			this.$refs.loading.onchange()
		},
		handleTopChange (status) {
			this.switch = false
			setTimeout(() => {
				if (this.$refs.loadmore) {
					this.$refs.loadmore.onTopLoaded()
				}
				this.switch = true
			}, 3000)
		},
		selectRole (userName, id, userNameBack) {
			if (!this.switch) {
				return
			}
			this.info.userName = userName
			this.info.id = id
			this.info.userNameBack = userNameBack
			setSession('schoolContactsId', id)
			if (~~this.$route.meta.type) {
				this.$router.push({path: `/visitedAdd/${JSON.stringify(this.info)}`})
			} else {
				this.$router.push({path: `/backvisitedAdd/${JSON.stringify(this.info)}`})
			}
		},
		getData (pullDown) {
			let params = {
				'contactsDTO.schoolId': this.info.schoolId,
				'contactsDTO.schoolType': this.schoolTypeId,
				'page.pageNo': this.page,
				'page.pageSize': this.pageSize
			}
			params.userCenterIdDing = this.infoInform.userCenterId
			ReportApi.getRoleList(params, res => {
				if (res.flag && res.data) {
					if (pullDown) {
						this.list = res.data.list
					} else {
						this.list = this.list.concat(res.data.list)
					}
					// setTimeout(() => {
					// 	let box = document.querySelectorAll('.main-list')
					// 	box.forEach((item) => {
					// 		item.addEventListener('click', this.setSwitch(), false)
					// 	})
					// }, 100)
					this.delayLoad = false
					this.page++
					if (res.data.list.length <= this.pageSize - 1) {
						this.delayLoad = true
						this.$refs.loading.change()
					}
				} else {
					this.$refs.loading.change()
				}
				this.switch = true
			})
		}
	}
}
</script>
