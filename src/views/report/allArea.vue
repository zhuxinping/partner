<template>
	<div class="container">
		<div class="flex">
			<m-header @backClick="handleClose" headerTitle="所属管理区域"></m-header>
		</div>
		<div class="main" style="background-color: #fff">
			<ul class="tree-ul">
				<three class="tree-ul" v-for="model in treeData" :key='model.id' :model="model" @handle=clickItem></three>
			</ul>
		</div>
		<footer>
			<ul class="table-button">
				<li @click="cancelFrom">取消</li>
				<li class="from" @click="submitFrom">提交</li>
			</ul>
		</footer>
	</div>
</template>
<script>
import Three from './components/v-three'
import { ReportApi } from '@/api/index'
import { setStore, setSession, toast, errorMsg } from '@/utils/common'
import MHeader from '@/components/MHeader'
export default {
	name: 'items',
	components: {
		Three,
		MHeader
	},
	data () {
		return {
			infoInform: setStore('infoInform'),
			treeData: [],
			data: '',
			key: '',
			parentKe: '',
			treeParentKey: '', // parentKey要转换成什么属性名称
			treeKey: '', // key要转换成什么属性名称
			map: '',
			baseInform: setStore('base'),
			jumpFlag: 1
		}
	},
	beforeRouteEnter (to, from, next) {
		to.meta.route = to.params.type
		to.meta.id = to.params.id
		to.meta.name = to.params.name
		next()
	},
	mounted () {
		this.jumpFlag = ~~this.$route.meta.route
		function TreeUtil (data, key, parentKey, map) {
			this.data = data
			this.key = key
			this.parentKey = parentKey
			this.treeParentKey = parentKey
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
					if (data[i][this.parentKey] === 0) {
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
		let params = {}
		params.username = this.infoInform.userName
		params.agentChildAccount = this.infoInform.agentChildAccount
		params.id = this.infoInform.id
		params.userCenterIdDing = this.infoInform.userCenterId
		ReportApi.getAgent(params, res => {
			let _tree
			if (res.flag) {
				setStore('agentTree', res.data)
				_tree = new TreeUtil(res.data, 'id', 'parentId')
				this.treeData = _tree.toTree()
				let that = this
				this.headFor(that.treeData, function (o) {
					o.display = false
				})
			} else {
				toast(res.msg)
				errorMsg('接口错误', res, params)
			}
		})
	},
	methods: {
		handleClose () {
			setSession('agentAreaId', this.$route.meta.id)
			setSession('responsePlace', this.$route.meta.name)
			if (this.jumpFlag) {
				this.$router.push('/reportAdd')
			} else {
				this.$router.push('/updateBaseInform/10000')
			}
		},
		headFor (o, cb) {
			if (!o) return
			o.forEach(child => {
				cb(child)
				if (child.childrens) {
					this.headFor(child.childrens, cb)
				}
			})
		},
		submitFrom () {
			if (this.jumpFlag) {
				this.$router.push('/reportAdd')
			} else {
				this.baseInform.areaId = setSession('agentAreaId')
				this.baseInform.areaName = setSession('responsePlace')
				setStore('base', this.baseInform)
				this.$router.push('/updateBaseInform/10000')
			}
		},
		cancelFrom () {
			setSession('agentAreaId', this.$route.meta.id)
			setSession('responsePlace', this.$route.meta.name)
			if (this.jumpFlag) {
				this.$router.push('/reportAdd')
			} else {
				this.$router.push('/updateBaseInform/10000')
			}
		},
		clickItem (a) {
			const that = this
			this.headFor(that.treeData, function (o) {
				if (a === o.id) {
					o.check = true
				} else {
					o.check = false
				}
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.content
	background-color #fff
</style>
