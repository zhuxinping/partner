// 千分位过滤器
export const numThousand = value => {
	if (value === null || value === '' || value === 0 || value === undefined) {
		return '0'
	}
	value = '' + value
	value = value.split('.')
	let a
	if (value[1]) {
		a = '.' + value[1]
	} else {
		a = ''
	}
	return value[0].toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + a// 将整数部分逢三一断
}
// 千分位过滤器
export const zore = value => {
	if (value === null || value === '' || value === 0 || value === undefined) {
		return '0'
	}
	return value // 将整数部分逢三一断
}
// export const numThousand = num => {
// 	if (num === null || num === '' || num === 0) {
// 		return '0'
// 	}
// 	let re = /\d{1,3}(?=(\d{3})+$)/g
// 	num = num.toString().replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
// 		return s1.replace(re, '$&,') + s2
// 	})
// 	return num
// }
// 两个小数的四舍五入过滤器
export const numFilter = value => {
	if (value === null || value === '' || value === 0 || value === undefined) {
		return '0.00'
	}
	let toFixedNum = Number(value).toFixed(2)
	let realVal = toFixedNum.substring(0, toFixedNum.toString().length)
	return realVal
}
// export const numFilter = x => {
// 	let f = parseFloat(x)
// 	if (f === null || f === '' || f === 0) {
// 		return '0.00'
// 	}
// 	f = Math.round(x * 100) / 100
// 	let s = f.toString()
// 	let rs = s.indexOf('.')
// 	if (rs < 0) {
// 		rs = s.length
// 		s += '.'
// 	}
// 	while (s.length <= rs + 2) {
// 		s += '0'
// 	}
// 	return s
// }
// 绝对值过滤器
export const numAbs = value => {
	if (value === null || value === '' || value === 0 || value === undefined) {
		return 0
	}
	return Math.abs(value)
}
