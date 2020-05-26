import Vue from 'vue'
import Router from 'vue-router'
import Ztpartner from './ztpartner'
const routes = [...Ztpartner]

Vue.use(Router)

export default new Router({
	// mode: 'history',
	base: '/ding/',
	routes: [
		...routes
	]
})
