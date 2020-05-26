import Vue from 'vue'
import Vuex from 'vuex'
import Config from './modules/config'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		Config
	},
	getters
})
