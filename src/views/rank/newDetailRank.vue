<template>
	<div class="container">
		<div class="flex">
			<m-header @backClick="goBack" :headerTitle="title"></m-header>
		</div>
		<ul class="load-list">
			<li class="rank-li detail-li" v-for="(item, index) in list" :key="index">
				<div class="list-left">
					<i class="common" v-if="item.rankingIndex <=3 && item.loveTotal" :class="item.rankingIndex==1?'rank1':item.rankingIndex==2?'rank2':item.rankingIndex==3?'rank3':''"></i>
					<i class="common" v-else>{{item.loveTotal?item.rankingIndex: ''}}</i>
					<img class="avtar-img" :src="item.userAvatar" alt="">
					<div class="user-info">
						<span class="active">{{item.userName}}</span>
					</div>
				</div>
				<div class="list-right">
					<span class="bom">{{item.loveTotal}}</span>
				</div>
			</li>
			<v-loading ref="loading" :loadingFlag="true"></v-loading>
		</ul>
	</div>
</template>
<script>
import MHeader from '@/components/MHeader'
import { setStore } from '@/utils/common'
import { ReportApi } from '@/api/index'
import VLoading from '@/components/loading'
export default {
	name: 'detailRank',
	components: {
		MHeader,
		VLoading
	},
	data () {
		return {
			current: 0,
			title: '',
			schoolId: '',
			rankingId: '',
			list: [],
			infoInform: setStore('infoInform'),
			loading: true,
			rankImg: require('../../assets/images/icon_head.png')
		}
	},
	// 每次进入路由之前都会执行这个钩子函数 然后获取数据 赋值给下一个组件
	beforeRouteEnter (to, from, next) {
		to.meta.schoolId = to.params.schoolId
		to.meta.rankingId = to.params.rankingId
		to.meta.title = to.params.title
		next()
	},
	mounted () {
		this.schoolId = this.$route.meta.schoolId
		this.rankingId = this.$route.meta.rankingId
		this.title = this.$route.meta.title
		this.getData()
	},
	methods: {
		goBack () {
			this.$router.go(-1)
		},
		getData () {
			let params = {}
			params.schoolId = this.schoolId
			params.rankingId = this.rankingId
			ReportApi.newTeacherHistoryDetail(params, res => {
				if (res.code === 10000 && res.body.rankingList.length) {
					this.list = res.body.rankingList
					res.body.rankingList.forEach(item => {
						item.userAvatar = item.userAvatar ? item.userAvatar + '?imageView/1/w/126/h/126' : this.rankImg
					})
				}
				this.$refs.loading.change()
			})
		}
	}
}
</script>
