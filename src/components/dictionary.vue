<template>
	<div class="share-popup" v-if="pickerFlag">
		<mt-popup v-model="popupVisible" position="bottom">
			<div class="popup-top">
				<span @click="popupVisible=false">取消</span>
				<span class="popup-title">{{titleText}}</span>
				<span @click="sureCommon()">确定</span>
			</div>
			<mt-picker v-if="type == 1"  :slots="commonSlots" :value-key="keyValue" @change="onCommonSlots" class="addressx" ></mt-picker>
			<mt-picker v-else :slots="twoSlots" :value-key="keyValue" @change="onTwoSlots" class="addressx" ></mt-picker>
		</mt-popup>
	</div>
</template>

<script>
import Vue from 'vue'
import { Popup, Picker } from 'mint-ui'
import { ReportApi } from '@/api/index'
import { setStore, errorMsg, toast, setSession } from '@/utils/common'
Vue.component(Popup.name, Popup)
Vue.component(Picker.name, Picker)
export default {
	name: 'dictionary',
	props: {
		type: null,
		pickerFlag: false,
		keyValue: '',
		code: '',
		defaultIndex: '',
		titleText: '',
		keyArray: {
			type: Array
		}
	},
	data () {
		return {
			commonSlots: [
				{
					flex: 1,
					values: [], // 省份数组
					className: 'slot1',
					textAlign: 'center'
				}
			],
			twoSlots: [
				{
					flex: 1,
					values: [], // 省份数组
					defaultIndex: 0,
					className: 'slot1',
					textAlign: 'center'
				},
				{
					divider: true,
					content: '-',
					className: 'slot2'
				},
				{
					flex: 1,
					values: [],
					defaultIndex: 0,
					className: 'slot3',
					textAlign: 'center'
				}
			],
			popupVisible: false
		}
	},
	mounted () {
		this.getBig()
	},
	methods: {
		onCommonSlots (picker, values) {
			if (values[0]) {
				let index = 0
				let code = this.code
				this.commonSlots[0].values.forEach((v, i) => {
					if (v[code] === values[0][code]) {
						index = i
					}
				})
				this.commonSlots[0].defaultIndex = index
			}
		},
		onTwoSlots (picker, values) {
			if (values[0] !== undefined) {
				picker.setSlotValues(1, values[0].childrens)
			}
			if (values[0]) {
				let index = -1
				let index1 = 0
				let code = this.code
				this.twoSlots[0].values.forEach((v, i) => {
					if (v[code] === values[0][code]) {
						index = i
					}
				})
				if (values[1] !== undefined) {
					values[0].childrens.forEach((v, i) => {
						if (v[code] === values[1][code]) {
							index1 = i
						}
					})
				}
				this.twoSlots[0].defaultIndex = index
				this.twoSlots[2].defaultIndex = index1
				this.twoSlots[2].values = values[0].childrens
			}
		},
		sureCommon () {
			if (~~this.type === 1) {
				this.$emit('sureData', this.titleText, this.commonSlots[0].values, this.commonSlots[0].defaultIndex)
			} else {
				this.$emit('sureData', this.titleText, this.twoSlots[0].values, this.twoSlots[0].defaultIndex, this.twoSlots[2].values, this.twoSlots[2].defaultIndex)
			}
		},
		getBig () {
			ReportApi.getClass({}, res => {
				if (res.flag) {
					let aa = res.data.parentList
					aa.forEach(item => {
						item.childrens = []
						res.data.childList.forEach(items => {
							if (item.name === items.mainCode) {
								item.childrens.push(items)
							}
						})
					})
					setStore('big', aa)
				} else {
					errorMsg('接口错误', res, {})
					toast(res.msg)
				}
			})
		},
		// 设置默认行业类型
		setClass () {
			let big = this.$route.meta.index ? this.$parent.baseInform.industryType : 'A'
			let small = this.$route.meta.index ? this.$parent.baseInform.industryTypeStage : 'A'
			let bigId = setSession('industryType') ? setSession('industryType') : big
			let smallId = setSession('industryTypeStage') ? setSession('industryTypeStage') : small
			let smallList
			this.twoSlots[0].values = setStore('big')
			this.twoSlots[0].values.forEach((item, i) => {
				if (bigId === item.name) {
					this.twoSlots[0].defaultIndex = i
					this.twoSlots[2].values = item.childrens
					smallList = item.childrens
				}
			})
			smallList.forEach((item, i) => {
				if (smallId === item.name) {
					// setSession('smallIndex', i)
					this.twoSlots[2].defaultIndex = i
				}
			})
		}
	},
	watch: {
		pickerFlag (newV, oldV) {
			if (newV) {
				if (this.type === 2) {
					this.setClass()
				}
				this.popupVisible = true
			}
		},
		popupVisible (newV, oldV) {
			if (!newV) {
				this.$emit('changeStatus')
			}
		},
		titleText (newV, oldV) {
			this.titleText = newV
		},
		keyArray (newV, oldV) {
			if (~~this.type === 1) {
				this.commonSlots[0].values = newV
			}
		},
		defaultIndex (newV, oldV) {
			if (~~this.type === 1) {
				this.commonSlots[0].defaultIndex = newV
			}
		}
	}
}
</script>
