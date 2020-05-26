<template>
	<div class="container sgj-ct">
		<div class="hg" id="hg">
			<div class="forms-detail-top bgf">
				<m-header @backClick="handleClose" :headerTitle="jdata.sgrade ? jdata.sgrade + '-' + jdata.sclass : jdata.sclass"></m-header>
				<Sheader @tfd="tabData" chosenFlag="0" stitle="班级时光集情况"  ref="picker">
					<ul class="sgj-ct-layer" slot="sgjDialog">
						<li class="sgj-ct-title">以下为对应班级及学生的相关数据</li>
						<li>
							<p class="raito">老师页面完成占比:</p>
							已完成老师编辑的页面数/需要老师编辑的页面总数
						</li>
						<li>
							<p class="raito">老师完成率:</p>
							已完成老师编辑的页面数/需要老师编辑的页面总数*100%
						</li>
						<li>
							<p class="raito">园长进度:</p>
							每个学生中已完成园长编辑的页面数/需要园长编辑的页面数
						</li>
						<li>
							<p class="raito">老师进度:</p>
							每个学生中已完成老师编辑的页面数/需要老师编辑的页面数
						</li>
						<li>
							<p class="raito">家长进度:</p>
							每个学生中已完成家长编辑的页面数/需要家长编辑的页面数
						</li>
						<li>
							<p class="raito">购买数:</p>
							截止当前购买的时光集数
						</li>
					</ul>
				</Sheader>
				<div class="forms-detail-infos">
					<ul>
						<li>
							<span class="det-name">老师完成页面占比</span>
							<span class="det-value">{{jdata.teacherRatio}}</span>
						</li>
						<li>
							<span class="det-name">老师完成率</span>
							<span class="det-value td-svalue">
								<em>{{jdata.teacherRate}}</em>
								<i v-if="parseFloat(jdata.teacherChangeRate)" :class="parseFloat(jdata.teacherChangeRate) > 0 ? '' : 'sgj-red'">{{parseFloat(jdata.teacherChangeRate) > 0 ? '+' : ''}}{{jdata.teacherChangeRate}}</i>
							</span>
						</li>
					</ul>
					<div v-if="jdata.maxTeacherName" class="detail-fin">完成最多的老师:<span class="teacher-name">{{jdata.maxTeacherName}}</span> <span @click="teacherView" class="det-view">查看详情<img src="../../assets/images/icon_arrow.png" alt=""></span></div>
				</div>
			</div>

			<dialogModal :isShow="layerFlag" btnText="关闭" @close="layerFlag = false">
				<div class="teacher-sort sgj-ct-layer" slot="content">
					<div class="sgj-ct-title">参与编辑的老师</div>
					<div class="sgj-ct-join">
						参与时光集编辑的老师如下：
						<div class="sgj-ct-layer" v-html="listTeacherData"></div>
					</div>
				</div>
			</dialogModal>

			<div class="forms-detail-list bgf">
				<table class="forms-tab">
					<tr>
						<th>学生姓名</th>
						<th>园长进度</th>
						<th>老师进度</th>
						<th>家长进度</th>
						<th>购买数</th>
					</tr>
					<tr v-for="(item, index) in listData" :key="index">
						<td>
							<div class="over-text">{{item.studentName}}</div>
						</td>
						<td>{{item.leaderCompletedProgress}}</td>
						<td>{{item.teacherCompletedProgress}}</td>
						<td>{{item.parentCompletedProgress}}</td>
						<td>{{item.purchasedNum}}</td>
					</tr>
				</table>
				<v-loading v-show='loadFlag' ref="loadModel" :loadingFlag="1"></v-loading>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import { setSession, tongji } from '@/utils/common'
import MHeader from '@/components/MHeader'
import { ReportApi } from '@/api/index'
import { Loadmore, Toast } from 'mint-ui'
import Sheader from './sheader'
import DialogModal from '@/components/dialogModal'
import VLoading from '@/components/loading'
Vue.component(Loadmore.name, Loadmore)

export default {
	name: 'FormsDetail',
	components: {
		MHeader,
		Sheader,
		DialogModal,
		VLoading
	},
	data () {
		return {
			// teacherJoin: '',
			loadFlag: 1,
			layerFlag: false,
			delayLoad: false,
			listData: [],
			listTeacherData: [],
			stime: '',
			jdata: {},
			pageNo: 1,
			pageSize: 20
		}
	},
	methods: {
		teacherView () {
			tongji('11_01_click_other_teacher', '1')
			let _this = this
			ReportApi.formsTeacherSort({
				'classId': this.jdata.cid,
				'endDate': this.stime.replace(/\//g, '-')
			}, res => {
				if (res.code === 10000) {
					if (res.body && res.body.length) {
						_this.layerFlag = true
						let arr = []
						res.body.forEach(function (d) {
							arr.push('<span>' + d.teacherName + '</span>')
						})
						_this.listTeacherData = arr.join('、')
						// _this.listTeacherData = res.body
					} else {
						Toast('暂无数据')
					}
				}
			})
		},
		handleClose () {
			this.$router.push({name: 'formsClassList'})
		},
		tabData (t) {
			this.stime = t
			this.pageNo = 1
			this.loadData()
		},
		loadData (flag) {
			if (!this.jdata.cid) {
				Toast('班级id错误')
				return !1
			}
			let _this = this
			let params = {
				'classId': this.jdata.cid,
				'endDate': this.stime.replace(/\//g, '-'),
				'pageNo': this.pageNo,
				'pageSize': this.pageSize
			}
			_this.loadFlag = 1
			_this.$refs.loadModel.onchange()
			if (!flag) this.listData = []
			ReportApi.sgjFormsDetail(params, res => {
				if (res.code === 10000) {
					if (res.body && res.body.result && res.body.result.length) {
						_this.listData = flag ? _this.listData.concat(res.body.result) : res.body.result
						if (res.body.result.length < _this.pageSize) {
							_this.loadFlag = 1
							_this.$refs.loadModel.change()
							_this.delayLoad = true
						} else {
							_this.loadFlag = 0
							setTimeout(function () {
								_this.delayLoad = false
							}, 500)
						}
					} else {
						_this.loadFlag = 1
						_this.$refs.loadModel.change()
						_this.delayLoad = true
					}
				}
			})
		},
		loadMore () { // 上拉翻頁
			// if ($(document).height() == $(window).height()) return; //一屏 没有滚动
			let _this = this
			let ele = document.getElementById('hg')
			window.addEventListener('scroll', function () {
				if (_this.delayLoad) return !1
				let domH = ele.offsetHeight - 70
				let	viewH = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 70
				let	scrollH = window.scrollY
				if ((scrollH + viewH) >= domH) {
					_this.delayLoad = true
					++_this.pageNo
					_this.loadData(1)
				}
			}, false)
		}
	},
	created () {
		let sdata = setSession('sFormsData')
		this.jdata = typeof (sdata) === 'string' ? JSON.parse(sdata) : sdata
		tongji('11_01_student_time_list', '0')
	},
	mounted () {
		this.loadMore()
	}
}
</script>

<style scoped lang="stylus">
	@import "./index.styl"
</style>
<style scoped lang="stylus">
.forms-tab
	th
		font-size 28px
		color #818D9D
.teacher-sort
	text-align left
	padding 0 38px
	.sgj-ct-join
		font-size 28px
		color #818D9D
		line-height 46px
		padding-bottom 30px
	.sgj-ct-layer
		max-height 600px
		overflow auto
		/*min-height 300px*/
		li
			display  inline-block
			padding 0
			margin: 0
</style>
<style lang="stylus">
.mint-toast-text
	font-size 26px
</style>
