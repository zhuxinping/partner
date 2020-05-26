import Mock from 'mockjs'
import * as ApiMaps from '@/api/apiMaps'

// 钉钉获取企业id
export const dingGetCropId = () => {
	Mock.mock(ApiMaps.REPORT.DINGDINGCROP, {
		'flag': true,
		'message': '成功',
		'body': {}
	})
}

// 钉钉获取免登
export const getFreeLogin = () => {
	Mock.mock(ApiMaps.REPORT.DINGDINGLOGIN, {
		'flag': true,
		'message': '成功',
		'body': {}
	})
}

// 获取权限
export const getActionCode = () => {
	Mock.mock(ApiMaps.REPORT.ACTIONGROUP, {
		'flag': true,
		'message': '成功',
		'body': {}
	})
}

// 获取省市区
export const getCity = () => {
	Mock.mock(ApiMaps.REPORT.GETCITY, {
		'flag': true,
		'message': '成功',
		'body': {}
	})
}

// 登录信息
export const login = () => {
	Mock.mock(ApiMaps.REPORT.LOGIN, {
		'flag': true,
		'message': '成功',
		'body': {}
	})
}

// 获取代理商区域
export const getAgent = () => {
	Mock.mock(ApiMaps.REPORT.GETAGENT, {
		'flag': true,
		'message': '成功',
		'body': {}
	})
}

// 获取报备园列表
export const getList = () => {
	Mock.mock(ApiMaps.REPORT.GETREPORTLIST, {
		'flag': true,
		'message': '成功',
		'body': {}
	})
}

// 获取报备园基本信息
export const getBaseInform = () => {
	Mock.mock(ApiMaps.REPORT.GETBASEINFORM, {
		'flag': true,
		'message': '成功',
		'body': {}
	})
}

// 获取行业类型
export const getClass = () => {
	Mock.mock(ApiMaps.REPORT.GETCLASS, {
		'flag': true,
		'message': '成功',
		'body': {}
	})
}

// 获取园所特点
export const getSpecial = () => {
	Mock.mock(ApiMaps.REPORT.GETSPECIAL, {
		'flag': true,
		'message': '成功',
		'body': {}
	})
}

// 获取业务来源
export const getSource = () => {
	Mock.mock(ApiMaps.REPORT.GETSOURCE, {
		'flag': true,
		'message': '成功',
		'body': {}
	})
}

// 获取照片url
export const getImgUrl = () => {
	Mock.mock(ApiMaps.REPORT.GETIMGURL, {
		'flag': true,
		'message': '成功',
		'body': {}
	})
}

// 提交报备园信息
export const submitRepor = () => {
	Mock.mock(ApiMaps.REPORT.SUBMITREPORT, {
		'flag': true,
		'message': '成功',
		'body': {}
	})
}
// 联系人列表
export const getRoleList = () => {
	Mock.mock(ApiMaps.REPORT.GETROLELIST, {
		'flag': true,
		'message': '成功',
		'body': {
			'currPage': 1,
			'totalPages': 10,
			'totalCount': 30,
			'list|30': [{
				'fixedFlag|0-1': true,
				'id': '@id',
				'phone': /^((11[0-2])|(13[0-9])|(14[0-9])|(15[0-9])|166|(17[0-9])|(18[0-9])|(19[8-9]))\d{8}$/,
				'remark': '@string(0,50)',
				'roleType': '@string(0,50)',
				'roleTypeName|1-3': '角色名称',
				'schoolId': '@string(7, 10)',
				'userName|1-3': '用户名称',
				'wechat': '@string(7, 40)'
			}]
		}
	})
}
// 新增联系人
export const AddRole = () => {
	Mock.mock(ApiMaps.REPORT.ADDROLE, {
		'flag': true,
		'message': '成功',
		'body': {}
	})
}
// 编辑联系人
export const updateRole = () => {
	Mock.mock(ApiMaps.REPORT.UPDATEROLE, {
		'flag': true,
		'message': '成功',
		'body': {}
	})
}
// 删除联系人
export const deleteRole = () => {
	Mock.mock(ApiMaps.REPORT.DELETEROLE, {
		'flag': true,
		'message': '成功',
		'body': {}
	})
}
