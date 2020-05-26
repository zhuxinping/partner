<template>
	<div class="container qua-det" :class="statusHd1 ? '' : 'hddel'">
		<m-header @backClick="handleClose" headerTitle="故障预警"></m-header>
		<div class="main">
			<div class="fault-det-top">
				<ul class="det-info-list fault-det-list">
					<li>
						<div class="td-key">幼儿园名称:</div>
						<div class="td-value text-over">{{quaDetailData.schoolName}}</div>
					</li>
					<li>
						<div class="td-key">幼儿园编号:</div>
						<div class="td-value text-over">{{quaDetailData.schoolNumber}}</div>
					</li>
					<li>
						<div class="td-key">班级名称:</div>
						<div class="td-value">{{quaDetailData.className}}</div>
					</li>
					<li>
						<div class="td-key">设备名称:</div>
						<div class="td-value">{{quaDetailData.cameraName}}</div>
					</li>
					<li>
						<div class="td-key">家长:</div>
						<div class="td-value">{{quaDetailData.userName}} {{quaDetailData.mobile}}</div>
					</li>
					<li>
						<div class="td-key">反馈时间:</div>
						<div v-if="quaDetailData.historyLsit && quaDetailData.historyLsit.length" class="td-value">{{quaDetailData.historyLsit[0].createTime}}</div>
					</li>
					<li>
						<div class="td-key">问题描述:</div>
						<div class="td-value">
							<div class="det-feedback-content">{{quaDetailData.content}}</div>
							<img v-if="quaDetailData.image" class="det-feedback-img" :src="quaDetailData.image" alt="" @click="isChoose = !isChoose" />
						</div>
					</li>
				</ul>
				<span  class='status-ndeal' :class="statusNdeal"></span>
			</div>
			<ul class="detail-status fault-det-list">
				<li>
					<template v-if="statusHd1 || statusHd2">
						<img class="required" src="../../assets/images/list-asterisk.png" alt=""><span class="td-name">处理状态:</span>
						<span class="detail-status-sel layer-sel" @click="selectStatus">{{statusQua.curName}}<i></i></span>
					</template>
					<template v-else>
						<span class="td-name">处理状态:</span>
						<span class="detail-status-sel layer-sel npd">{{statusQua.curName}}</span>
					</template>
				</li>
				<li>
					<img class="required" src="../../assets/images/list-asterisk.png" v-if="statusHd1" alt=""><span class="td-name">回复内容:</span>
					<div class="qua-content"><textarea name="content" v-model="quaContent" placeholder="请输入回复家长的话" maxlength="1000" :disabled="!statusHd1"></textarea> <span class="limit-count">{{summaryLength}}/1000字</span></div>
				</li>
				<li>
					<span class="td-name">图片:</span>
					<upload ref="upload" :imgMaxlength="4" :picValueList = 'picValueList' @change="changeImg"></upload>
				</li>
			</ul>
			<div v-show="statusQua.flag">
				<div class="layer-status">
					<ul>
						<li :key="item.value" v-for="(item,index) in statusQua.option"><div class="form-chk-ct"><input type="radio" :value="item.value" v-model="statusQua.value" @click="statusChange(item.value,item.name)" :id="'layer-ipt' + index" name="layer-ipt"><label :for="'layer-ipt' + index"></label></div><label :for="'layer-ipt' + index">{{item.name}}</label></li>
					</ul>
				</div>
				<div class="layer-shade" @click="statusQua.flag = 0"></div>
			</div>
			<swiperImage @change="isChoose = false" :chooseFlag="isChoose" :schoolPicUrl="quaDetailData.image"></swiperImage>
		</div>
		<button @click="formSubmit" class="btn submit-btn" v-code = '"VEDIO_ALARM_SUBMIT"' v-if="statusHd1 || statusHd2">提交</button>
		<v-dictionary ref="dictionary" type="1" :pickerFlag="pickerFlag" code="value" keyValue="name" titleText="故障预警"
		:keyArray="dictionaryArray" :defaultIndex = 'dictionaryIndex' @sureData = 'sureCommon' @changeStatus="changeStatus"></v-dictionary>
	</div>
</template>
<script>
import swiperImage from '@/components/swiperImage'
import { ReportApi } from '@/api/index'
import Upload from '@/components/upload'
import MHeader from '@/components/MHeader'
import VDictionary from '@/components/dictionary'
import { setStore, toast, tongji } from '@/utils/common'
export default {
	data () {
		return {
			isChoose: false,
			infoInform: setStore('infoInform'),
			quaContent: '',
			quaDetailData: {},
			summaryLength: 0,
			statusQua: {
				flag: 0,
				value: '',
				curName: '请选择',
				option: [
					{name: '处理中', value: '2'},
					{name: '延期处理', value: '3'},
					{name: '已解决', value: '1'}]
			},
			dictionaryIndex: '',
			currentStatus: '',
			pickerFlag: false,
			dictionaryArray: [],
			statusNdeal: '',
			statusHd1: 0, // 1代表未处理的状态
			statusHd2: 0, // 2代表处理中的状态
			cachData: {},
			picValueList: []
		}
	},
	components: {
		MHeader,
		Upload,
		swiperImage,
		VDictionary
	},
	created () {
		this.id = this.$route.query.id
		tongji('11_01_quality_alert_info', 0)
		this.quaDetail() // 详情数据
	},
	methods: {
		quaDetail () {
			let params = {
				'id': this.id,
				'userCenterIdDing': this.infoInform.userCenterId,
				'roleId': this.infoInform.roleId,
				'userType': this.infoInform.userType
			}
			ReportApi.quaDetail(params, res => {
				if (res.code === 10000) {
					let data = res.body
					this.quaDetailData = data
					let c = data.replyInfo
					if (c.content) {
						this.quaContent = c.content
						this.summaryLength = c.content.length
					}
					if (c.images && c.images.length) {
						let arr = []
						c.images.forEach(item => {
							arr.push({
								isFlag: 0,
								picType: 0,
								picUrl: item,
								picUrl1: item
							})
						})
						this.picValueList = arr
					}
					/*
					* 0 未处理 可填写内容 可选择 可上传 可提交
					* 2 处理中 不可填写 可选择 可提交 图片不可上传/删除
					* 1、3 都不可
					* */
					this.statusNdeal = 'status-ndeal' + data.status
					switch (data.status) {
					case '0': // 未处理
						this.statusHd1 = 1
						break
					case '2': // 处理中
						this.statusQua.option.shift()
						this.statusHd2 = 1
						break
					default: // 延期处理 已解决
						this.statusHd1 = 0
						this.statusHd2 = 0
						// this.statusNdeal = 'status-ndeal' + data.status
						this.statusQua.value = data.status
						// let _this = this
						this.statusQua.option.forEach((item, index) => {
							if (item.value === data.status) {
								this.statusQua.curName = item.name
							}
						})
					}
				} else {
					toast('获取数据失败')
				}
			})
		},
		handleClose () {
			this.$router.push('/faultAlarm')
		},
		// statusChange (value, name) {
		// 	if (value !== this.statusValue) {
		// 		this.statusQua.curName = name
		// 		this.statusQua.flag = 0
		// 	} else {
		// 		this.statusQua.flag = 0
		// 	}
		// },
		formSubmit () {
			let v = this.statusQua.value
			if (!v) {
				toast('请选择处理状态')
				return 0
			}
			let content = this.quaContent.trim()
			if (!content) {
				toast('请输入回复内容')
				return 0
			}
			if (content.length < 10) {
				toast('回复内容长度不能小于10')
				return 0
			}
			let imgArr = []
			if (this.picValueList && this.picValueList.length) {
				this.picValueList.forEach(item => {
					imgArr.push(item.picUrl1)
				})
			}
			let params = {
				id: this.id,
				status: v,
				feedbackCont: content,
				replyPicUrl: imgArr.join(','),
				agentId: this.infoInform.id,
				agentName: this.infoInform.agentName
			}
			ReportApi.quaSummit(params, res => {
				if (res.code === 10000) {
					tongji('11_01_quality_alert_commit', 1)
					setStore('quaSubmitFlag', 1)
					this.$router.push('/faultAlarm')
				} else {
					toast(res.message)
				}
			})
		},
		changeImg (arrImg) {
			this.picValueList = arrImg
		},
		// 弹窗
		selectStatus () {
			this.dictionaryArray = this.statusQua.option
			this.dictionaryIndex = this.currentStatus || 0
			this.pickerFlag = true
		},
		sureCommon (titleText, value, index) {
			this.dictionaryIndex = index
			this.statusQua.curName = value[index].name
			this.pickerFlag = false
			// this.dictionaryIndex = index
			this.currentStatus = index
			this.statusQua.value = this.statusQua.option[index].value
		},
		changeStatus () {
			this.pickerFlag = false
			this.dictionaryIndex = null
		}
	},
	watch: {
		quaContent (newValue, oldValue) {
			this.summaryLength = newValue.length
		}
	}
}
</script>
<style>
.qua-det .businessspan{
	position: absolute;
	margin: 0;
	top: 26px;
	left: 100px;
	display: inline;
	line-height: normal;
}
.hddel .uploadImgDelete,.hddel .uploadCamera,.hddel .businessspan{display: none} /* 延期处理 已解决 处理中 图片不能修改上传/删除 */
</style>
<style lang="stylus" scoped>
	@import "assets/index.styl"
</style>
