import { setStore } from '@/utils/common'
import Vue from 'vue'
function code (value) {
	const buttonList = JSON.stringify(setStore('actionCode'))
	if ((!buttonList && !Array.isArray(buttonList)) || (Array.isArray(buttonList) && buttonList.length === 0)) {
		return false
	} else {
		return buttonList.indexOf(value) > -1
	}
}

Vue.directive('code', {
	inserted: function (el, binding, vnode) {
		if (!code(binding.value)) {
			el.parentNode.removeChild(el)
		}
	}
})
