<template>
	<div class="container">
		<div class="flex">
			<MHeader  @backClick="goBack" headerTitle="政策咨询"></MHeader>
		</div>
		<div class="con" v-if="operation">
			<div class="show-bd">
				<div class="service-title">
					这位小伙伴将为您服务，您可以联系TA
				</div>
				<ul class="service-list">
					<li>
						<a :href="'tel:' +userInfo.szyWayPeoplePhone">
							<div class="left">
								<img :src="avtar" alt="">
							</div>
							<div class="mid">
								<span>{{userInfo.szyWayPeople}}</span>
								<em>{{userInfo.szyWayPeoplePhone}}</em>
							</div>
							<div class="right">
								<i class="icon-tel"></i>
							</div>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<no-data v-else></no-data>
	</div>
</template>
<script>
import MHeader from '@/components/MHeader'
import NoData from '@/components/no-data'
import { ReportApi } from '@/api/index'
import { setStore } from '@/utils/common'
export default {
	name: 'business-inquiries',
	components: {
		MHeader,
		NoData
	},
	data () {
		return {
			infoInform: '',
			userInfo: '',
			avtar: require('../../assets/images/icon_head.png'),
			operation: true
		}
	},
	created () {
		this.infoInform = setStore('infoInform')
	},
	mounted () {
		this.getData()
	},
	methods: {
		// 返回首页
		goBack () {
			setTimeout(() => {
				this.$router.go(-1)
			}, 400)
		},
		// 获取渠道人员姓名和电话
		getData () {
			let params = {}
			params.agentId = this.infoInform.id
			ReportApi.getAgentWayInfo(params, res => {
				// console.log(res)
				if (res.code === 10000) {
					// console.log(params.type)
					// console.log(res.body)
					if (res.body) {
						// console.log(res.body)
						this.userInfo = res.body
						this.operation = true
					} else {
						this.operation = false
						// console.log(res.data)
					}
				} else {
					/* global dd */
					dd.device.notification.toast({
						text: res.msg, // 提示信息
						duration: 1, // 显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
						delay: 0
					})
					return false
				}
			})
		}
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped >
.service-title{
	padding 16px 30px;
	font-size: 26px;
	color: #818D9D;
	text-align:left
}
.service-list{
	li{
		height: 120px
		background #fff
		a{
			display flex
			align-items center
			padding 0 30px
			.mid{
				flex 1;
				display flex
				flex-direction column
				align-items flex-start
				span{
					font-size: 32px;
					color: #333333;
				}
				em{
					font-size: 26px;
					color: #818D9D;
				}
			}
			.left{
				height: 120px
				display flex
				justify-content center
				align-items center
				margin-right: 20px
				img{
					width: 80px
					height: 80px
				}
			}
			.right{
				.icon-tel{
					width: 48px
					height: 48px
					background url("../../assets/images/icon_iphone.png") no-repeat
					background-size 100% 100%
					display inline-block
					vertical-align middle
				}
			}
		}
	}
}
</style>
