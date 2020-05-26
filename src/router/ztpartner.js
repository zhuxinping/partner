
const _import = require('./_import_' + process.env.NODE_ENV)
export default [
	{
		path: '/',
		name: 'ZtpartnerWelcome',
		hidden: true,
		component: _import('home/welcome'),
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/login',
		name: 'ZtpartnerIndex',
		hidden: true,
		component: _import('home/Index'),
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/home',
		name: 'ZtpartnerHome',
		hidden: true,
		component: _import('home/Home'),
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/report',
		name: 'ztreportIndex',
		component: _import('report/Index'),
		meta: {
			keepAlive: true,
			isBack: false,
			route: '',
			index: 1
		}
	},
	{
		path: '/classRatioExplain/:type',
		name: 'ztClassRatioExplain',
		component: _import('home/ClassRatioExplain'),
		meta: {
			keepAlive: false,
			isBack: false,
			type: 1
		}
	},
	{
		path: '/reportAdd',
		name: 'ztreportAdd',
		component: _import('report/AddReport'),
		meta: {
			keepAlive: true,
			isBack: false,
			route: ''
		}
	},
	{
		path: '/reportMap/:type',
		name: 'ztreportMap',
		component: _import('report/openMap'),
		meta: {
			keepAlive: false,
			route: ''
		}
	},
	{
		path: '/displayMap',
		name: 'ztdisplayMap',
		component: _import('report/displayMap'),
		meta: {
			keepAlive: false,
			route: ''
		}
	},
	{
		path: '/reportBaseInfrom/:type/:schoolId',
		name: 'ztreportBaseInfrom',
		component: _import('report/baseInfrom'),
		meta: {
			keepAlive: false,
			type: 0,
			schoolId: ''
		}
	},
	{
		path: '/reportActiveClassRoom/:schoolName/:schoolId/:radio',
		name: 'ztreportActiveClassRoom',
		component: _import('report/activeClassRoom'),
		meta: {
			keepAlive: false,
			schoolName: '',
			schoolId: '',
			radio: ''
		}
	},
	{
		path: '/liveClassRoom/:schoolName/:schoolId',
		name: 'ztliveClassRoom',
		component: _import('report/liveClassRoom'),
		meta: {
			keepAlive: false,
			schoolName: '',
			schoolId: ''
		}
	},
	{
		path: '/payClass/:schoolName/:schoolId',
		name: 'ztpayClass',
		component: _import('report/payClass'),
		meta: {
			keepAlive: false,
			schoolName: '',
			schoolId: ''
		}
	},
	{
		path: '/allArea/:type/:id/:name',
		name: 'ztreportAllArea',
		component: _import('report/allArea'),
		meta: {
			keepAlive: false,
			route: '',
			id: '',
			name: ''
		}
	},
	{
		path: '/updateBaseInform/:index',
		name: 'ztUpdateBaseInform',
		component: _import('report/updateBaseInform'),
		meta: {
			keepAlive: false,
			isBack: false,
			index: 10000
		}
	},
	{
		path: '/visited',
		name: 'Ztvisited',
		component: _import('visited/Index'),
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/visitedAdd/:info',
		name: 'ZtvisitedAdd',
		component: _import('visited/addVisited'),
		meta: {
			keepAlive: true,
			isBack: false,
			info: '',
			path: 0 // 0表示从拜访进入 1表示的是从报备进入
		}
	},
	{
		path: '/selectSchool/:type',
		name: 'ZtSelectSchool',
		component: _import('visited/selectSchool'),
		meta: {
			keepAlive: false,
			type: 0
		}
	},
	{
		path: '/selectPop/:type/:info',
		name: 'ZtSelectPop',
		component: _import('visited/popList'),
		meta: {
			keepAlive: false,
			type: 0,
			info: ''
		}
	},
	{
		path: '/addPop/:type/:schoolId/:schoolTypeId/:info',
		name: 'ZtAddPop',
		component: _import('visited/addPop'),
		meta: {
			keepAlive: false,
			type: '',
			schoolId: '',
			schoolTypeId: '',
			info: {}
		}
	},
	{
		path: '/updatePop/:type/:schoolId/:schoolTypeId/:info',
		name: 'ZtUpdatePop',
		component: _import('visited/updatePop'),
		meta: {
			keepAlive: false,
			type: '',
			schoolId: '',
			schoolTypeId: '',
			info: {}
		}
	},
	{
		path: '/backvisited',
		name: 'Ztbackvisited',
		component: _import('backvisited/Index'),
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/backvisitedAdd/:info',
		name: 'ZtbackvisitedAdd',
		component: _import('backvisited/addVisited'),
		meta: {
			keepAlive: true,
			isBack: false,
			info: '',
			path: '1'
		}
	},
	{
		path: '/briefing',
		name: 'Ztbriefing',
		component: _import('briefing/Index'),
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/orderAnalyzing',
		name: 'ZtorderAnalyzing',
		component: _import('briefing/orderAnalyzing'),
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/gardenAnalyzing',
		name: 'ZtgardenAnalyzing',
		component: _import('briefing/gardenAnalyzing'),
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/activeAnalyzing',
		name: 'ZtactiveAnalyzing',
		component: _import('briefing/activeAnalyzing'),
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/livelyAnalyzing',
		name: 'ZtlivelyAnalyzing',
		component: _import('briefing/livelyAnalyzing'),
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/activation',
		name: 'Ztactivation',
		component: _import('activation/Index'),
		meta: {
			keepAlive: true,
			type: 1,
			isBack: false,
			path: 0 // 0表示是从home页面进入1表示是从经营简报进入
		}
	},
	{
		path: '/active',
		name: 'Ztactive',
		component: _import('active/Index'),
		meta: {
			keepAlive: true,
			type: 0,
			isBack: false,
			path: 0 // 0表示是从home页面进入1表示是从经营简报进入
		}
	},
	{
		path: '/studentRank/:type/:schoolId',
		name: 'ZtstudentRank',
		component: _import('rank/studentRanking'),
		meta: {
			keepAlive: false,
			route: '',
			type: 0,
			schoolId: ''
		}
	},
	{
		path: '/teacherRank',
		name: 'ZtteacherRank',
		component: _import('rank/teacherRanking'),
		meta: {
			keepAlive: false,
			type: 0,
			schoolId: '',
			path: 0 // path:0表示从home页进入path:1表示从经营简报活跃分析进入
		}
	},
	{
		path: '/newTeacherRankRule',
		name: 'ZtNewTeacherRankRule',
		component: _import('rank/newTeacherRankRule'),
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/classRankRule',
		name: 'ZtClassRankRule',
		component: _import('rank/classRankRule'),
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/newTeacherRank/:schoolId',
		name: 'ZtnewTeacherRank',
		component: _import('rank/newTeacherRank'),
		meta: {
			keepAlive: false,
			schoolId: '',
			index: 0,
			current: 1
		}
	},
	{
		path: '/newHistoryRank/:index/:schoolId',
		name: 'ZtNewHistoryRank',
		component: _import('rank/newHistoryRank'),
		meta: {
			keepAlive: false,
			schoolId: '',
			index: 0
		}
	},
	{
		path: '/historyRank/:type/:index/:schoolId',
		name: 'ZthistoryRank',
		component: _import('rank/historyRank'),
		meta: {
			keepAlive: false,
			type: '',
			schoolId: '',
			index: 0
		}
	},
	{
		path: '/newHistoryRank/:index/:schoolId/:teacherId',
		name: 'ZtnewHistoryRank',
		component: _import('rank/newHistoryRank'),
		meta: {
			keepAlive: false,
			schoolId: '',
			teacherId: '',
			index: 0
		}
	},
	{
		path: '/classDetailRank/:schoolId/:title/:type/:time',
		name: 'ZtclassDetailRank',
		component: _import('rank/classDetailRank'),
		meta: {
			keepAlive: false,
			schoolId: '',
			time: '',
			type: '',
			title: ''
		}
	},
	{
		path: '/newDetailRank/:schoolId/:rankingId/:title',
		name: 'ZtnewDetailRank',
		component: _import('rank/newDetailRank'),
		meta: {
			keepAlive: false,
			rankingId: '',
			schoolId: '',
			title: ''
		}
	},
	{
		path: '/detailRank/:id/:type/:time/:userId/:timeStr',
		name: 'ZtdetailRank',
		component: _import('rank/detailRank'),
		meta: {
			keepAlive: false,
			index: 0,
			type: '0',
			time: '',
			userId: '',
			timeStr: ''
		}
	},
	{
		path: '/newPersonRank/:index/:userId/:id',
		name: 'ZtnewPersonRank',
		component: _import('rank/newPersonRank'),
		meta: {
			keepAlive: false,
			index: 0,
			userId: '',
			id: ''
		}
	},
	{
		path: '/personRanking/:type/:index/:typeIndex/:userId/:id',
		name: 'ZtpersonRanking',
		component: _import('rank/personRanking'),
		meta: {
			keepAlive: false,
			index: '',// 0表示周榜 1表示月榜
			type: '',// 0表示代理商维度 1表示学校维度
			typeIndex: '', // 0表示个人1表示班级
			userId: '',
			id: ''
		}
	},
	{
		path: '/studentRule',
		name: 'ZtstudentRule',
		component: _import('rank/studentRule'),
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/teacherRule',
		name: 'ZtteacherRule',
		component: _import('rank/teacherRule'),
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/customService',
		name: 'ZtcustomService',
		component: _import('service/customService'),
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/businessInquiries',
		name: 'ZtbusinessInquiries',
		component: _import('service/businessInquiries'),
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/payTable',
		name: 'ZtpayTable',
		component: _import('payTable/Index'),
		meta: {
			keepAlive: false,
			index: 1
		}
	},
	{
		path: '/faultAlarm',
		name: 'FaultAlarm',
		component: _import('faultAlarm/index'),
		meta: {
			keepAlive: true,
			isBack: true
		}
	},
	{
		path: '/videoQuaDetail',
		name: 'videoQuaDetail',
		component: _import('faultAlarm/videoQuaDetail'),
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/videoOffDetail',
		name: 'videoOffDetail',
		component: _import('faultAlarm/videoOffDetail'),
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/formsSchoolList',
		name: 'formsSchoolList',
		cname: '时光集报表',
		component: _import('sgj/formsSchoolList'),
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/formsClassList',
		name: 'formsClassList',
		cname: '时光集班级年级报表',
		component: _import('sgj/formsClassList'),
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/formsDetail',
		name: 'formsDetail',
		cname: '时光集详情',
		component: _import('sgj/formsDetail'),
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/attendance',
		name: 'Ztattendance',
		component: _import('attendance/Index'),
		meta: {
			keepAlive: false
		}
	}
]
