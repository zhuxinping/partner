<template>
	<div class="container">
		<div class="flex">
			<MHeader  @backClick="goBack" headerTitle="选择咨询内容"></MHeader>
		</div>
		<ul class="service-list">
			<li @click="toQuestion(index, item.code)" v-for="(item,index) in serviceList" :key ="index">
				<span>{{item.name}}</span>
				<i class="icon-right"></i>
			</li>
		</ul>
		<div class="last-list" @click="toBusiness">
			<span>政策咨询</span>
			<i class="icon-right"></i>
		</div>
		<div class="introduce">
			<p v-html="content"></p>
		</div>
	</div>
</template>
<script>
import MHeader from '@/components/MHeader'
import { ReportApi } from '@/api/index'
import { setStore, tongji, createScript, toast } from '@/utils/common'
export default {
	name: 'custom-service',
	components: {
		MHeader
	},
	data () {
		return {
			serviceList: [],
			flag: true,
			content: []
		}
	},
	created () {
		this.infoInform = setStore('infoInform')
		// alert(this.flag)
	},
	mounted () {
		this.getData()
		// 获取联系客服文案
		this.getInstruction()
		// 联系客服埋点
		tongji('00_Customer Services', '0')
	},
	methods: {
		// 返回首页
		goBack () {
			this.$router.go(-1)
		},
		// 获取数据字典
		getData () {
			let params = {code: 'CUSTOMER_SERVER_TYPE'}
			ReportApi.getDataCode(params, res => {
				if (res.code === 10000) {
					if (res.body.list.length > 0) {
						// console.log(res.body)
						this.serviceList = res.body.list
						this.operation = true
					} else {
						this.operation = false
					}
				} else {
					toast(res.msg)
				}
			})
		},
		openUrl (url) {
			let self = this
			/* global dd */
			dd.biz.util.openLink({
				url: url, // 要打开链接的地址
				onSuccess: function (result) {
					console.log(result)
					self.flag = true
				},
				onFail: function (error) {
					console.log(error)
					self.flag = true
				}
			})
		},
		// 跳转到对应的客服问题
		toQuestion (index, code) {
			if (!this.flag) {
				return
			}
			let params = {}
			let self = this
			params.currAgentUserId = this.infoInform.id
			params.customerServerType = code
			params.currentAccountIsChild = this.infoInform.agentChildAccount
			if (this.infoInform.agentChildAccount) {
				params.currentAgentChildId = this.infoInform.agentChildId
			} else {
				params.currAgentUserId = this.infoInform.id
			}
			ReportApi.getConcatInfo(params, res => {
				if (res.code === 10000) {
					this.flag = false
					if (res.body) {
						let src = res.body.domainUrl
						src = `${src}&hidden=1`
						createScript(src, function () {
							window.ysf.on({
								'onload': function () {
									window.ysf('config', {
										uid: res.body.imId, // 用户Id
										groupid: res.body.groupId, // 用户名称
										success: function () { // 成功回调
											self.openUrl(window.ysf('url'))
										},
										error: function () { // 错误回调
											toast('打开联系客服失败!')
										}
									})
								}
							})
						})
						this.operation = true
					} else {
						this.operation = false
					}
				} else {
					toast(res.msg)
				}
			})
		},
		// 获取联系客服的文案
		getInstruction () {
			let params = {}
			ReportApi.getInstruction(params, res => {
				if (res.code === 10000) {
					if (res.body) {
						this.content = res.body.replace(/(\r)*\n/g, '<br/>').replace(/\s/g, '&nbsp;')
					}
				} else {
					toast(res.msg)
				}
			})
		},
		toBusiness () {
			this.$router.push({path: '/businessInquiries'})
		},
		toZhengCe () {
			this.$router.push({path: '/policy'})
		}
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped >
	.service-list{
		margin-top: 18px
		li{
			height: 88px
			display flex
			justify-content space-between
			align-items center
			padding 0 30px
			background #fff
			border-bottom: 2.1px solid #eee;
			span{
				font-size: 32px;
				color: #333333;
			}
			.icon-right{
				width: 12px
				height: 20px
				background url("../../assets/images/icon_arrow.png") no-repeat
				background-size 100% 100%
			}
		}
	}
	.last-list{
		height: 88px
		display flex
		justify-content space-between
		align-items center
		padding 0 30px
		background #fff
		border-bottom: 2.1px solid #eee;
		span{
			font-size: 32px;
			color: #333333;
		}
		.icon-right{
			width: 12px
			height: 20px
			background url("../../assets/images/icon_arrow.png") no-repeat
			background-size 100% 100%
		}
	}
	.introduce-title{
		text-align left
		padding 26px 30px 0 30px
		color:#818D9D
		font-size 26px
	}
	.introduce{
		padding-top: 30px
	}
	.introduce p {
		line-height: 26px
		text-align left
		padding 0 30px
		font-size: 24px !important;
		color:#5179a2
	}
</style>
