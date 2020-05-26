<template>
	<div class="share-popup" v-if="addressFlag">
		<mt-popup v-model="popupVisible" position="bottom">
			<div class="popup-top">
				<span @click="popupVisible=false">取消</span>
				<span class="popup-title">选择地址</span>
				<span @click="sureAddress()">确定</span>
			</div>
			<mt-picker :slots="commonSlots" value-key="name" @change="onCommonSlots" class="addressx" ></mt-picker>
		</mt-popup>
	</div>
</template>

<script>
import Vue from 'vue'
import { Popup, Picker } from 'mint-ui'
import { ReportApi } from '@/api/index'
import { setStore, toast, setSession } from '@/utils/common'
Vue.component(Popup.name, Popup)
Vue.component(Picker.name, Picker)
export default {
	name: 'v-address',
	props: {
		addressFlag: false
	},
	data () {
		return {
			addressData: [],
			popupVisible: false,
			commonSlots: [
				{
					flex: 1,
					defaultIndex: 0,
					values: [], // 省份数组
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
					defaultIndex: 0,
					values: ['请选择'],
					className: 'slot3',
					textAlign: 'center'
				},
				{
					divider: true,
					content: '-',
					className: 'slot4'
				},
				{
					flex: 1,
					defaultIndex: 0,
					values: ['请选择'],
					className: 'slot5',
					textAlign: 'center'
				}
			],
			dirAddress: ''
		}
	},
	mounted () {
		this.getData()
	},
	components: {
		Popup,
		Picker
	},
	methods: {
		getData () {
			if (!setStore('addressData')) {
				ReportApi.getCity({}, res => {
					let _tree
					if (res.flag) {
						_tree = new TreeUtil(res.data, 'id', 'parentId')
						this.addressData = _tree.toTree()
						setStore('addressData', this.addressData)
					} else {
						toast(res.msg)
					}
				})
			} else {
				this.addressData = setStore('addressData')
				this.commonSlots[0].values = setStore('addressData')
			}
			function TreeUtil (data, key, parentKey, map) {
				this.data = data
				this.key = key
				this.parentKey = parentKey
				this.treeKey = key
				this.map = map
				if (map) {
					if (map[key]) this.treeKey = map[key]
				}
				this.toTree = function () {
					let data = this.data
					let pos = {}
					let tree = []
					let i = 0
					while (data.length !== 0) {
						if (data[i][this.parentKey] === '') {
							let _temp = this.copy(data[i])
							tree.push(_temp)
							pos[data[i][this.key]] = [tree.length - 1]
							data.splice(i, 1)
							i--
						} else {
							let posArr = pos[data[i][this.parentKey]]
							if (posArr !== undefined) {
								let obj = tree[posArr[0]]
								for (let j = 1; j < posArr.length; j++) {
									obj = obj.childrens[posArr[j]]
								}
								let _temp = this.copy(data[i])
								obj.childrens.push(_temp)
								pos[data[i][this.key]] = posArr.concat([obj.childrens.length - 1])
								data.splice(i, 1)
								i--
							}
						}
						i++
						if (i > data.length - 1) {
							i = 0
						}
					}
					return tree
				}
				this.copy = function (item) {
					let _temp = {
						childrens: []
					}
					_temp[this.treeKey] = item[this.key]
					for (let _index in item) {
						if (_index !== this.key && _index !== this.parentKey) {
							let _property = item[_index]
							if ((!!this.map) && this.map[_index]) {
								_temp[this.map[_index]] = _property
							} else {
								_temp[_index] = _property
							}
						}
					}
					return _temp
				}
			}
		},
		setData () {
			let provinceId = setSession('areaProvCode') ? setSession('areaProvCode') : '1000000'
			let cityId = setSession('areaCityCode') ? setSession('areaCityCode') : '1000050'
			let countyId = setSession('areaCountyCode') ? setSession('areaCountyCode') : '1000051'
			let cityList, countryList
			this.commonSlots[0].values = this.addressData
			this.addressData.forEach((item, i) => {
				if (provinceId === item.id) {
					// setSession('provinceIndex', i)
					this.commonSlots[0].defaultIndex = i
					this.commonSlots[2].values = item.childrens
					cityList = item.childrens
				}
			})
			cityList.forEach((item, i) => {
				if (cityId === item.id) {
					// setSession('cityIndex', i)
					this.commonSlots[2].defaultIndex = i
					countryList = item.childrens
					this.commonSlots[4].values = item.childrens
				}
			})
			countryList.forEach((item, i) => {
				if (countyId === item.id) {
					// setSession('countyIndex', i)
					this.commonSlots[4].defaultIndex = i
				}
			})
		},
		onCommonSlots (picker, values) {
			if (values[0] !== undefined) {
				picker.setSlotValues(1, values[0].childrens)
				if (values[1] !== undefined) {
					picker.setSlotValues(2, values[1].childrens)
				}
			}
			if (values[0]) {
				let index = -1
				let index1 = 0
				let index2 = 0
				this.commonSlots[0].values.forEach((v, i) => {
					if (v.id === values[0].id) {
						index = i
					}
				})
				if (values[1] !== undefined && values[0] !== '请选择') {
					values[0].childrens.forEach((v, i) => {
						if (v.id === values[1].id) {
							index1 = i
						}
					})
					this.commonSlots[2].defaultIndex = index1
					this.commonSlots[2].values = values[0].childrens
				}
				if (values[2] !== undefined && values[1] !== '请选择' && values[1] !== undefined && values[0] !== '请选择') {
					values[1].childrens.forEach((v, i) => {
						if (v.id === values[2].id) {
							index2 = i
						}
					})
					this.commonSlots[4].defaultIndex = index2
					this.commonSlots[4].values = values[1].childrens
				}
				this.commonSlots[0].defaultIndex = index
			}
		},
		sureAddress () {
			const values = this.commonSlots[0].values
			const index = this.commonSlots[0].defaultIndex
			this.dirAddress = values[index].name
			let values1, index1, values2, index2
			if (this.commonSlots[2].values && this.commonSlots[2].values.length) {
				values1 = this.commonSlots[2].values
				index1 = this.commonSlots[2].defaultIndex
				this.dirAddress = values[index].name + values1[index1].name
				setSession('areaCityCode', values1[index1].id)
			} else {
				setSession('areaCityCode', '不存在')
			}
			if (this.commonSlots[4].values && this.commonSlots[4].values.length && this.commonSlots[2].values && this.commonSlots[2].values.length) {
				values2 = this.commonSlots[4].values
				index2 = this.commonSlots[4].defaultIndex
				this.dirAddress = values[index].name + values1[index1].name + values2[index2].name
				setSession('areaCountyCode', values2[index2].id)
			} else {
				setSession('areaCountyCode', '不存在')
			}
			setSession('dirAddress', this.dirAddress)
			setSession('areaProvCode', values[index].id)
			this.popupVisible = false
			this.$emit('sureAddress', this.dirAddress, values[index].id, values1[index1].id, values2[index2].id)
		}
	},
	watch: {
		addressFlag (newV, oldV) {
			if (newV) {
				this.setData()
				this.popupVisible = true
			}
		},
		popupVisible (newV, oldV) {
			if (!newV) {
				this.$emit('change')
			}
		}
	}
}
</script>
