import { ReportApi } from '@/api/index'
import { errorMsg, toast, close } from '@/utils/common'
const Config = {
	namespaced: true,
	state: {
		configInfo: null,
		startTime: new Date().getTime()
	},
	getters: {
		getConfig (state) {
			return state.configInfo
		},
		startTime (state) {
			return state.startTime
		}
	},
	mutations: {
		SET_CONFIG: (state, configInfo) => {
			state.configInfo = configInfo
		}
	},
	actions: {
		dingGetCropId ({commit, state}) {
			return new Promise((resolve, reject) => {
				ReportApi.dingGetCropId({}, res => {
					if (res.flag) {
						commit('SET_CONFIG', res.data)
						resolve(res.data)
					} else {
						errorMsg('接口错误', res, {})
						reject(res.data)
						toast('服务器出小差┭┮﹏┭┮')
						setTimeout(() => {
							close()
						}, 3000)
					}
				}).catch((error) => {
					reject(error)
				})
			})
		}
	}
}
export default Config
