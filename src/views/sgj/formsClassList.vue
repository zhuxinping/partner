<template>
	<div class="container sgj-ct forms-class-list">
		<m-header @backClick="handleClose" :headerTitle="sname"></m-header>
		<span class="right-text" @click="visitRecord" >拜访记录</span>
		<Sheader @tfd="tabData" chosenFlag="0"  stitle="学校时光集情况"  ref="picker">
			<div class="sgj-ct-layer" slot="sgjDialog">
				<div class="sgj-ct-title">以下数据为对应班级的相关数据</div>
				<ul>
					<li>
						<p class="raito">活跃时光集占比:</p>
						当天至少完成1个页面的时光集/已发布的时光集册数
					</li>
					<li>
						<p class="raito">页面完成占比:</p>
						已完成的总页面数/需要完成的总页面数
					</li>
					<li>
						<p class="raito">页面完成率:</p>
						已完成的总页面数/需要完成的总页面数*100%
					</li>
					<li>
						<p class="raito">园长页面完成占比:</p>
						完成需要园长编辑的页面数/需要园长编辑的页面总数
					</li>
					<li>
						<p class="raito">老师页面完成占比:</p>
						完成需要老师编辑的页面数/需要老师编辑的页面总数
					</li>
					<li>
						<p class="raito">家长页面完成占比:</p>
						完成需要家长编辑的页面数/需要家长编辑的页面总数
					</li>
					<li>
						<p class="raito">完本占比:</p>
						已完本的时光集/已发布的时光集册数
					</li>
					<li>
						<p class="raito">购买数:</p>
						截止当前购买的时光集数
					</li>
				</ul>
			</div>
		</Sheader>
		<div ref="mescroll" class="mescroll">
			<div class="forms-list">
				<div class="forms-list-sel">
					<span class="sel-icon" @click="menuFlag = true">
						<img src="../../assets/images/icon_more.png" alt="">
					</span>
					<div class="sel-toggle" v-show="menuFlag">
						<ul>
							<li @click="selMenu(item)"  v-for="(item, index) in toption" :key="index">
								<template v-if="item.chk">
									<img src="../../assets/images/icon-square-elected.png" alt="" >{{item.name}}
								</template>
								<template v-else>
									<img src="../../assets/images/icon-square-unselected.png" alt="" >{{item.name}}
								</template>
							</li>
						</ul>
						<div class="sel-shade" @click="menuFlag = false"></div>
					</div>
				</div>
				<div class="forms-list-left">
					<table class="forms-tab">
						<tr>
							<th>年级班级</th>
						</tr>
						<tr @click="formsDetail(item)" v-for="(item, index) in listData" :key="index">
							<td class="forms-list-content">
								<div class="forms-list-t"><div class="over-text">{{item.gradeName ? item.gradeName + '-' : '' }}{{item.className}}</div></div>
								<span class="forms-list-b ratio-day">对比前一天</span>
							</td>
						</tr>
					</table>
				</div>
				<div class="forms-list-right">
					<div class="forms-list-tab">
						<table class="forms-tab">
							<tr class="forms-list-title">
								<th v-for="(item, index) in filterMenu(toption)"  @click="fsortfn(item)" :key="index">
									<template>
										<div class='layer-ct-sort over-text' :class="item.sort ? 'sort-pd' : ''" :style="{'min-width': item.width}">
											{{item.name}}
											<span class="sort-icon" v-if="item.sort">
												<img  v-if="fsort === 'DESC'" src="../../assets/images/icon_sort_up.png" alt="">
												<img v-else src="../../assets/images/icon_sort_down.png" alt="">
											</span>
										</div>
									</template>
								</th>
							</tr>
							<tr @click="formsDetail(item)" v-for="(item, index) in listData" :key="index">
								<template v-if="toption[0].chk">
									<td>
										<div class="forms-list-t">{{item.activeAlbumRatio}}</div>
										<span :style="{visibility: setAttr(item.activeAlbumChangeNum) ? '' : 'hidden'}" class="forms-list-b" :class="parseFloat(item.activeAlbumChangeNum) > 0  ? '' : 'forms-list-red'">活跃班级{{parseFloat(item.activeAlbumChangeNum) > 0 ? '+' : ''}}{{item.activeAlbumChangeNum}}</span>
									</td>
								</template>
								<template v-if="toption[1].chk">
									<td>
										<div class="forms-list-t">{{item.pageCompletedRatio}}</div>
										<span :style="{visibility: setAttr(item.pageCompletedChangeNum) ? '' : 'hidden'}" class="forms-list-b" :class="parseFloat(item.pageCompletedChangeNum) > 0  ? '' : 'forms-list-red'">完成页{{parseFloat(item.pageCompletedChangeNum) > 0 ? '+' : ''}}{{item.pageCompletedChangeNum}}</span>
									</td>
								</template>
								<template v-if="toption[2].chk">
									<td>
										<div class="forms-list-t">{{item.pageCompletedRate}}</div>
										<span :style="{visibility: setAttr(item.pageCompletedChangeRate) ? '' : 'hidden'}" class="forms-list-b" :class="parseFloat(item.pageCompletedChangeRate) > 0  ? '' : 'forms-list-red'">完成率{{parseFloat(item.pageCompletedChangeRate) > 0 ? '+' : ''}}{{item.pageCompletedChangeRate}}</span>
									</td>
								</template>
								<template v-if="toption[3].chk">
									<td>
										<div class="forms-list-t">{{item.leaderCompletedRatio}}</div>
										<span :style="{visibility: setAttr(item.leaderCompletedChangeNum) ? '' : 'hidden'}" class="forms-list-b" :class="parseFloat(item.leaderCompletedChangeNum) > 0  ? '' : 'forms-list-red'">完成页{{parseFloat(item.leaderCompletedChangeNum) > 0 ? '+' : ''}}{{item.leaderCompletedChangeNum}}</span>
									</td>
								</template>
								<template v-if="toption[4].chk">
									<td>
										<div class="forms-list-t">{{item.teacherCompletedRatio}}</div>
										<span :style="{visibility: setAttr(item.teacherCompletedChangeNum) ? '' : 'hidden'}" class="forms-list-b" :class="parseFloat(item.teacherCompletedChangeNum) > 0  ? '' : 'forms-list-red'">完成页{{parseFloat(item.teacherCompletedChangeNum) > 0 ? '+' : ''}}{{item.teacherCompletedChangeNum}}</span>
									</td>
								</template>
								<template v-if="toption[5].chk">
									<td>
										<div class="forms-list-t">{{item.parentCompletedRatio}}</div>
										<span :style="{visibility: setAttr(item.parentCompletedChangeNum) ? '' : 'hidden'}" class="forms-list-b" :class="parseFloat(item.parentCompletedChangeNum) > 0  ? '' : 'forms-list-red'">完成页{{parseFloat(item.parentCompletedChangeNum) > 0 ? '+' : ''}}{{item.parentCompletedChangeNum}}</span>
									</td>
								</template>
								<template v-if="toption[6].chk">
									<td>
										<div class="forms-list-t">{{item.completedAlbumRatio}}</div>
										<span :style="{visibility: setAttr(item.completedAlbumChangeNum) ? '' : 'hidden'}" class="forms-list-b" :class="parseFloat(item.completedAlbumChangeNum) > 0  ? '' : 'forms-list-red'">完本数{{parseFloat(item.completedAlbumChangeNum) > 0 ? '+' : ''}}{{item.completedAlbumChangeNum}}</span>
									</td>
								</template>
								<template v-if="toption[7].chk">
									<td>
										<div class="forms-list-t">{{item.purchasedNum}}</div>
										<span :style="{visibility: setAttr(item.purchasedChangeNum) ? '' : 'hidden'}" class="forms-list-b" :class="parseFloat(item.purchasedChangeNum) > 0  ? '' : 'forms-list-red'">购买数{{parseFloat(item.purchasedChangeNum) > 0 ? '+' : ''}}{{item.purchasedChangeNum}}</span>
									</td>
								</template>
							</tr>
						</table>
					</div>
				</div>
				<div class="forms-list-arrow"><!-- 样式涉及到适配问题 特殊处理列表箭头问题  -->
					<table class="forms-tab">
						<tr>
							<th></th>
						</tr>
						<tr @click="formsDetail(item)"  v-for="(item, index) in listData" :key="index">
							<td class="forms-list-content">
								<div class="forms-list-t"></div>
								<span class="forms-list-b" style="visibility: hidden;">时</span>
								<img src="../../assets/images/icon_arrow.png" alt="">
							</td>
						</tr>
					</table>
				</div>
				<v-loading v-show='loadFlag' ref="loadModel" :loadingFlag="1"></v-loading>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import { setSession, setStore, tongji } from '@/utils/common'
import MHeader from '@/components/MHeader'
import { ReportApi } from '@/api/index'
import { Loadmore, Toast } from 'mint-ui'
import VLoading from '@/components/loading'
import Sheader from './sheader'
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
Vue.component(Loadmore.name, Loadmore)
export default {
	name: 'FormsClassList',
	components: {
		MHeader,
		Sheader,
		VLoading
	},
	data () {
		return {
			mescroll: null,
			menuFlag: false,
			delayLoad: false,
			loadFlag: 1,
			sname: '',
			schoolId: '',
			listData: [],
			stime: '',
			pageNo: 1,
			pageSize: 20,
			fsort: 'DESC', // 1降序 2升序
			infoInform: setStore('infoInform'),
			toption: [{
				name: '活跃时光集占比',
				sname: 's1',
				width: '70px',
				chk: 0
			}, {
				name: '页面完成占比',
				sname: 's2',
				width: '70px',
				chk: 1
			}, {
				name: '页面完成率',
				sname: 's3',
				width: '70px',
				sort: 1,
				chk: 1
			}, {
				name: '园长完成占比',
				sname: 's4',
				width: '70px',
				chk: 1
			}, {
				name: '老师完成占比',
				sname: 's5',
				width: '70px',
				chk: 0
			}, {
				name: '家长完成占比',
				sname: 's6',
				width: '70px',
				chk: 0
			}, {
				name: '完本占比',
				sname: 's7',
				width: '70px',
				chk: 0
			}, {
				name: '购买数',
				sname: 's8',
				width: '70px',
				chk: 0
			}]
		}
	},
	methods: {
		setAttr (value) {
			return parseFloat(value.replace(/,/g, ''))
		},
		visitRecord () {
			tongji('11_01_click_visit_record', '1')
			setSession('formsSchoolName', this.sname)
			this.$router.push({name: 'Ztvisited'})
		},
		fsortfn (item) {
			if (!item.sort) return !1
			this.pageNo = 1
			this.fsort = this.fsort === 'DESC' ? 'ASC' : 'DESC'
			this.loadData()
		},
		handleClose () {
			this.$router.push({name: 'formsSchoolList', params: {index: 1}})
		},
		tabData (t) {
			this.stime = t
			this.pageNo = 1
			this.loadData()
		},
		/* loadMore () { // 上拉翻頁
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
		}, */
		loadData (flag) {
			let _this = this
			let params = {
				'schoolId': this.schoolId,
				'endDate': this.stime.replace(/\//g, '-'),
				'pageNo': this.pageNo,
				'pageSize': this.pageSize,
				'sortField': 'page_completed_rate',
				'sortOrder': this.fsort
			}
			_this.loadFlag = 1
			_this.$refs.loadModel.onchange()
			if (!flag) this.listData = []
			ReportApi.formsClassList(params, res => {
				if (res.code === 10000) {
					_this.mescroll.endErr()
					if (res.body && res.body.result && res.body.result.length) {
						_this.listData = flag ? _this.listData.concat(res.body.result) : res.body.result
						if (res.body.result.length < _this.pageSize) {
							_this.loadFlag = 1
							_this.$refs.loadModel.change()
							_this.mescroll.lockUpScroll(true)
							// _this.delayLoad = true
						} else {
							_this.loadFlag = 0
							_this.mescroll.lockUpScroll(false)
							// _this.delayLoad = false
						}
					} else {
						_this.loadFlag = 1
						_this.$refs.loadModel.change()
						// _this.delayLoad = true
						_this.mescroll.lockUpScroll(true)
					}
				}
			})
		},
		filterMenu (menu) {
			return menu.filter((item) => {
				return item.chk ? 1 : 0
			})
		},
		selMenu (item) {
			let obj = {}
			let count = 0
			this.toption.forEach(function (value) {
				obj[value.sname] = value.sname === item.sname ? (value.chk ? 0 : 1) : value.chk
				count = value.chk ? ++count : count
			})

			if (count <= 1 && item.chk) {
				Toast('至少选择一项')
				return !1
			}
			item.chk = item.chk ? 0 : 1 // !item.chk
			this.$cookies.set('formsClassMenu', JSON.stringify(obj), 365 * 24 * 60 * 60)
		},
		formsDetail (item) {
			if (!item.classId) {
				Toast('班级id错误 跳转失败')
				return !1
			}
			let sdata = setSession('sFormsData')
			sdata = typeof (sdata) === 'string' ? JSON.parse(sdata) : sdata
			sdata = Object.assign(sdata, {
				'sgrade': item.gradeName,
				'sclass': item.className,
				'cid': item.classId,
				'classSort': this.fsort,
				'teacherRate': item.teacherCompletedRate,
				'teacherChangeRate': item.teacherCompletedChangeRate,
				'teacherRatio': item.teacherCompletedRatio,
				'maxTeacherName': item.maxTeacherName
			})
			setSession('sFormsData', JSON.stringify(sdata))
			this.$router.push({name: 'formsDetail'})
		}
	},
	created () {
		let formsMenu = this.$cookies.get('formsClassMenu')
		if (formsMenu) {
			formsMenu = typeof (formsMenu) === 'string' ? JSON.parse(formsMenu) : formsMenu
			for (let i in formsMenu) {
				for (let j in this.toption) {
					if (i === this.toption[j]['sname']) {
						this.toption[j].chk = ~~formsMenu[i]
					}
				}
			}
		}
		let sdata = setSession('sFormsData')
		sdata = typeof (sdata) === 'string' ? JSON.parse(sdata) : sdata
		this.fsort = sdata.classSort || this.fsort
		this.sname = sdata.sname || ''
		this.schoolId = sdata.sid || ''
		tongji('11_01_class_time_list', '0')
	},
	mounted () {
		// this.loadMore()
		let _this = this
		this.mescroll = new MeScroll(this.$refs.mescroll, {
			down: {
				auto: false,
				callback: function () {
					_this.pageNo = 1
					_this.loadData()
				}
			},
			up: {
				auto: false,
				offset: 70,
				callback: function () {
					// _this.delayLoad = true
					++_this.pageNo
					_this.loadData(1)
				}
			}
		})
	}
}
</script>

<style scoped lang="stylus">
	@import "./index.styl"
</style>
<style scoped lang="stylus">
.container
	background  #fff
	display block !important
/*.forms-list
	min-height 750px*/
</style>

<style lang="stylus">
.mint-toast-text
		font-size 26px
.forms-class-list
	.title
		padding-right 60px
		box-sizing border-box
	/*通过fixed固定mescroll的高度*/
	.mescroll
		position fixed
		bottom 0
		top 174px
		height auto
		z-index 3
	.forms-list ~ .mescroll-upwarp
		display none !important
</style>
