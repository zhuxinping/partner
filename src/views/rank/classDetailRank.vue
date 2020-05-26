<template>
	<div class="container">
		<div class="flex">
			<m-header @backClick="goBack" :headerTitle="title"></m-header>
		</div>
		<ul class="load-list">
			<li class="rank-li detail-li" @click="topersonRank(item.userId)" v-for="(item, index) in list" :key="index">
				<div class="list-left">
					<i class="common" v-if="item.rank <=3 && item.score" :class="item.rank==1?'rank1':item.rank==2?'rank2':item.rank==3?'rank3':''"></i>
					<i class="common" v-else>{{item.score?item.rank: ''}}</i>
					<img class="avtar-img" :src="item.pic" alt="">
					<div class="user-info">
						<span class="active">{{item.name}}</span>
						<span>{{type==1?item.weekActiveRatioLevel:''}}</span>
					</div>
				</div>
				<div class="list-right">
					<span class="bom">{{item.score}}</span>
				</div>
			</li>
			<v-loading ref="loading" :loadingFlag="true"></v-loading>
		</ul>
	</div>
</template>
<script>
import MHeader from '@/components/MHeader'
import { setStore, deafultImg } from '@/utils/common'
import { ReportApi } from '@/api/index'
import VLoading from '@/components/loading'
export default {
	name: 'classDetailRank',
	components: {
		MHeader,
		VLoading
	},
	data () {
		return {
			type: '',
			time: '',
			schoolId: '',
			title: '',
			list: [],
			infoInform: setStore('infoInform'),
			loading: true,
			rankImg: require('../../assets/images/icon_head.png')
		}
	},
	// 每次进入路由之前都会执行这个钩子函数 然后获取数据 赋值给下一个组件
	beforeRouteEnter (to, from, next) {
		to.meta.schoolId = to.params.schoolId
		to.meta.type = to.params.type
		to.meta.time = to.params.time
		to.meta.title = to.params.title
		next()
	},
	mounted () {
		this.type = ~~this.$route.meta.type
		this.time = this.$route.meta.time
		this.title = this.$route.meta.title
		this.schoolId = this.$route.meta.schoolId
		this.getData()
	},
	methods: {
		goBack () {
			this.$router.go(-1)
		},
		getData () {
			let params = {}
			params.schoolId = this.schoolId
			params.type = this.type
			params.date = this.time
			ReportApi.classRankList(params, res => {
				if (res.code === 10000) {
					this.list = res.body.classes
					res.body.classes.forEach(item => {
						item.pic = item.pic ? item.pic + '?imageView/1/w/160/h/160' : deafultImg('teacher', item.sexNew)
					})
				}
				this.$refs.loading.change()
			})
		},
		// 点击排行列表跳转
		topersonRank (userId) {
			let id = this.$route.meta.schoolId
			this.$router.push({path: `/personRanking/1/${this.type - 1}/1/${userId}/${id}`})
		}
	}
}
</script>
