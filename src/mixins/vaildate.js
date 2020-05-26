import { validate } from '@/utils/common'
export default {
	name: 'validate',
	mounted () {},
	methods: {
		validate () {
			let f = validate({
				form: document.forms['form'],
				rules: {
					// 新增报备园校验
					username: {
						required: true,
						rxp: /^[-@\w\u4e00-\u9fa5]+$/
					},
					password: {
						required: true,
						rxp: /^(?![0-9]+$)(?![a-zA-Z]+$)(?![a-zA-Z_\W]+$)(?![0-9_\W]+$)[0-9a-zA-Z_\W]{6,16}$/
					},
					repeatPassword: {
						required: true,
						equalTo: 'password'
					},
					region: {
						required: true
					},
					address: {
						required: true
					},
					mapAddress: {
						required: true
					},
					linkman: {
						required: true,
						blank: true
					},
					masterPhone: {
						required: true,
						telephone: true
					},
					studentNumber: {
						required: true,
						rxp: /^[1-9]([0-9])*$/
					},
					classNumber: {
						required: true,
						rxp: /^[1-9]([0-9])*$/
					},
					schPrice: {
						required: true,
						rxp: /^[1-9]([0-9])*$/
					},
					priceUnit: {
						required: true
					},
					dataNum: {
						required: true
					},
					selectClass: {
						required: true
					},
					gardenSpecial: {
						required: true
					},
					sourceBusiness: {
						required: true
					},
					agent: {
						required: true
					},
					responsePlace: {
						required: true
					},
					// 新增拜访校验
					schoolName: {
						required: true
					},
					visitedDay: {
						required: true
					},
					visitedPerson: {
						required: true
					},
					visitedWay: {
						required: true
					},
					bussinessName: {
						required: true
					},
					businessing: {
						required: true
					},
					liking: {
						required: true
					},
					summary: {
						required: true
					},
					visitedAddress: {
						required: true
					},
					role: {
						required: true
					},
					roleName: {
						required: true
					},
					rolePhone: {
						rxp: /^$|^((11[0-2])|(13[0-9])|(14[0-9])|(15[0-9])|166|(17[0-9])|(18[0-9])|(19[8-9]))\d{8}$/
					},
					returnPerson: {
						required: true
					},
					returnType: {
						required: true
					},
					returnSummary: {
						required: true
					},
					money: {
						required: true,
						// rxp: /^0(\.00)?$/,
						fn: function (v) {
							// debugger
							v = v.replace(/,/g, '')
							return /^0(\.00)?$/.test(v) ? 0 : /^[0-9]+([.]{1}[0-9]+){0,1}$/.test(v) ? 1 : 0
						}
					},
					paymoney: {
						required: true
					}
				},
				messages: {
					username: {
						required: '学校账号不能为空!',
						rxp: '请不要使用“ - ”、“ _ ”、“ @ ”这三个以外的其他特殊字符，包括空格！'
					},
					password: {
						required: '密码不能为空',
						rxp: '密码不符合要求（6~16位，至少包含数字、字母）或安全性较低,请更换！'
					},
					repeatPassword: {
						required: '重复密码不能为空',
						equalTo: '密码两次输入不一致，请重新输入！'
					},
					region: {
						required: '地区地址不能为空！'
					},
					address: {
						required: '详细地址不能为空！'
					},
					mapAddress: {
						required: '坐标不能为空！'
					},
					linkman: {
						required: '园长姓名不能为空！',
						blank: '园长姓名不能有空格！'
					},
					masterPhone: {
						required: '园长联系方式不能为空！',
						telephone: '请输入正确的手机号码！'
					},
					studentNumber: {
						required: '学生数不能为空！',
						rxp: '学生数是正整数！'
					},
					classNumber: {
						required: '班级数不能为空！',
						rxp: '班级数是正整数！'
					},
					schPrice: {
						required: '学费金额不能为空！',
						rxp: '学费金额是正整数！'
					},
					priceUnit: {
						required: '学费单位不能为空！'
					},
					dataNum: {
						required: '家长试用天数不能为空！'
					},
					selectClass: {
						required: '行业类型不能为空！'
					},
					gardenSpecial: {
						required: '园所特色不能为空！'
					},
					sourceBusiness: {
						required: '业务来源不能为空！'
					},
					agent: {
						required: '所属代理商不能为空！'
					},
					responsePlace: {
						required: '代理商管理区域不能为空！'
					},
					// 新增办法检验
					schoolName: {
						required: '学校名称不能为空！'
					},
					visitedDay: {
						required: '拜访日期不能为空！'
					},
					visitedPerson: {
						required: '拜访对象不能为空！'
					},
					visitedWay: {
						required: '拜访方式不能为空！'
					},
					bussinessName: {
						required: '商机名称不能为空！'
					},
					businessing: {
						required: '商机进展不能为空！'
					},
					liking: {
						required: '意向度不能为空！'
					},
					summary: {
						required: '拜访总结不能为空！'
					},
					visitedAddress: {
						required: '获取您当前位置失败！'
					},
					role: {
						required: '角色名称不能为空！'
					},
					roleName: {
						required: '姓名不能为空！'
					},
					rolePhone: {
						rxp: '请输入正确的手机格式！'
					},
					returnPerson: {
						required: '回访对象不能为空！'
					},
					returnType: {
						required: '回访类型不能为空！'
					},
					returnSummary: {
						required: '回访内容不能为空！'
					},
					money: {
						required: '订单金额不能为空！',
						// rxp: '您输入的金额不满足条件，请重新输入！',
						fn: '您输入的金额不规范，请重新输入！'
					},
					paymoney: {
						required: '收益池收入不能为空！'
					}

				}
			})
			return f
		}
	}
}
