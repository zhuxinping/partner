import { API } from './api'
import { REPORT } from './apiMaps'
export default {
	// 钉钉获取企业id
	dingGetCropId (params, callback) {
		return API.get(REPORT.DINGDINGCROP, params, callback)
	},
	// 钉钉获取免登
	getFreeLogin (params, callback) {
		return API.get(REPORT.DINGDINGLOGIN, params, callback)
	},
	// 获取权限
	getActionCode (params, callback) {
		return API.get(REPORT.ACTIONGROUP, params, callback)
	},
	getBanner (params, callback) {
		return API.get(REPORT.GETBANNER, params, callback)
	},
	getStrategy (params, callback) {
		return API.get(REPORT.GETSTRATEGY, params, callback)
	},
	// 获取省市区
	getCity (params, callback) {
		return API.get(REPORT.GETCITY, params, callback)
	},
	// 登录信息
	login (params, callback) {
		return API.post(REPORT.LOGIN, params, callback)
	},
	// 获取代理商区域
	getAgent (params, callback) {
		return API.get(REPORT.GETAGENT, params, callback)
	},
	// 获取报备园列表
	getList (params, callback) {
		return API.get(REPORT.GETREPORTLIST, params, callback)
	},
	// 获取报备园基本信息
	getBaseInform (params, callback) {
		return API.get(REPORT.GETBASEINFORM, params, callback)
	},
	// 根据学校schoolId获取学校基本信息
	getAgentInfo (params, callback) {
		return API.get(REPORT.GETANENTINFO, params, callback)
	},
	// 获取报备园激活情况数据
	getReportActivation (params, callback) {
		return API.get(REPORT.GETREPORTACTIVATION, params, callback)
	},
	// 获取报备园活跃情况数据
	getReportAction (params, callback) {
		return API.get(REPORT.GETPREPORTACTION, params, callback)
	},
	// 学校详情-激活情况-激活比(班级)
	getClassActivationRatio (params, callback) {
		return API.get(REPORT.GETCLASSACTIVATIONRATIO, params, callback)
	},
	// 学校详情-激活情况-激活比(学生)
	getStudentActivationRatio (params, callback) {
		return API.get(REPORT.GETSTUDENTACTIVATIONRATIO, params, callback)
	},
	// 学校详情-激活报表
	getActivationReportList (params, callback) {
		return API.get(REPORT.GETACTIVATIONREPORTLIST, params, callback)
	},
	// 学校详情-活跃报表
	getActiveReportList (params, callback) {
		return API.get(REPORT.GETACTIVEREPORTLIST, params, callback)
	},
	// 编辑报备园基本信息
	updateBaseInform (params, callback) {
		return API.get(REPORT.UPDATEINFROM, params, callback)
	},
	// 获取行业类型
	getClass (params, callback) {
		return API.get(REPORT.GETCLASS, params, callback)
	},
	// 获取照片url
	getImgUrl (params, callback) {
		return API.postImg(REPORT.GETIMGURL, params, callback)
	},
	// 提交报备园信息
	submitReport (params, callback) {
		return API.post(REPORT.SUBMITREPORT, params, callback)
	},
	// 退出登录
	loginout (params, callback) {
		return API.get(REPORT.LOGINOUT, params, callback)
	},
	// 获取拜访记录
	visited (params, callback) {
		return API.get(REPORT.VISITED, params, callback)
	},
	// 获取学校名称
	getschoolName (params, callback) {
		return API.get(REPORT.GETSCHOOLNAME, params, callback)
	},
	// 获取拜访参数
	getVisited (params, callback) {
		return API.get(REPORT.GETVISITED, params, callback)
	},
	gttActivation (params, callback) {
		return API.get(REPORT.GETACTIVATION, params, callback)
	},
	// 获取联系人列表
	getRoleList (params, callback) {
		return API.get(REPORT.GETROLELIST, params, callback)
	},
	// 新增联系人
	addRole (params, callback) {
		return API.post(REPORT.ADDROLE, params, callback)
	},
	// 修改联系人
	updateRole (params, callback) {
		return API.post(REPORT.UPDATEROLE, params, callback)
	},
	// 删除联系人
	deleteRole (params, callback) {
		return API.post(REPORT.DELETEROLE, params, callback)
	},
	getHistoryBusiness (params, callback) {
		return API.get(REPORT.GETHISTORYBUSINESS, params, callback)
	},
	// 获取联系人的基本信息
	getPersonBase (params, callback) {
		return API.get(REPORT.GETPERSONINFO, params, callback)
	},
	// 提交拜访记录
	submitVisited (params, callback) {
		return API.post(REPORT.SUBMITVISITED, params, callback)
	},
	// 提交报备园
	addReport (params, callback) {
		return API.get(REPORT.ADDREPORT, params, callback)
	},
	// 修改报备园
	updateReport (params, callback) {
		return API.post(REPORT.UPDATEREPORT, params, callback)
	},
	// 运行情况
	trueExam (params, callback) {
		return API.get(REPORT.TRUEEXAM, params, callback)
	},
	// 经营简报首页
	BriefReport (params, callback) {
		return API.get(REPORT.BRIEFREPORT, params, callback)
	},
	// 订单分析
	orderAnalyse (params, callback) {
		return API.get(REPORT.ORDER, params, callback)
	},
	// 开园分析
	openSchool (params, callback) {
		return API.get(REPORT.OPENSCHOOL, params, callback)
	},
	// 激活活跃
	// activeRatio (params, callback) {
	// 	return API.get(REPORT.ACTIVERATIO, params, callback)
	// },
	// 错误日志
	errorMsg (params, callback) {
		return API.post(REPORT.ERRORMSG, params, callback)
	},
	// 获取回访列表
	getReturnVisitList (params, callback) {
		return API.get(REPORT.GETRETURNVISITLIST, params, callback)
	},
	// 新增回访
	addReturnVisit (params, callback) {
		return API.post2json(REPORT.ADDRETURNVISIT, params, callback)
	},
	// 获取渠道人员的姓名和联系方式
	getAgentWayInfo (params, callback) {
		return API.get(REPORT.GETAGENTWAYINFO, params, callback)
	},
	// 获取数据字典
	getDataCode (params, callback) {
		return API.get(REPORT.GETDATACODE, params, callback)
	},
	// 获取七鱼地址
	getConcatInfo (params, callback) {
		return API.get(REPORT.GETCONTACTINFO, params, callback)
	},
	// 获取激活分析数据
	getActivationAnalysis (params, callback) {
		return API.get(REPORT.GETACTIVETIONANALYSIS, params, callback)
	},
	// 获取活跃分析数据
	getActiveAnalysis (params, callback) {
		return API.get(REPORT.GETACTIVEANALYSIS, params, callback)
	},
	// 学校-获取教师个人榜单
	getTeacherPersonalBySchool (params, callback) {
		return API.post2json(REPORT.GETTEACHERPERSONALBYSCHOOL, params, callback)
	},
	// 学生排行榜-按学校(历史)
	getstudenthisrankByschool (params, callback) {
		return API.get(REPORT.GETSTUDENTHISRANKBYSCHOOL, params, callback)
	},
	// 学生排行榜-按学校(实时)
	getstudentrankbyschool (params, callback) {
		return API.get(REPORT.GETSTUDENTRANKBYSCHOOL, params, callback)
	},
	// 学生排行榜-按代理商
	getstudentrankbyagent (params, callback) {
		return API.get(REPORT.GETSTUDENTRANKBYAGENT, params, callback)
	},
	//  学校-获取周教师排行列表
	getTeacherRankListByWeekWithSchool (params, callback) {
		return API.post2json(REPORT.GETTEACHERRANKLISTBYWEEKWITHSCHOOL, params, callback)
	},
	// 学校-获取月教师排行列表
	getTeacherRankListByMonthWithSchool (params, callback) {
		return API.post2json(REPORT.GETTEACHERRANKLISTBYMONTHWITHSCHOOL, params, callback)
	},
	// 学校-获取周教师排行榜
	getTeacherRankByWeek (params, callback) {
		return API.post2json(REPORT.GETTEACHERRANKBYWEEK, params, callback)
	},
	// 学校-获取月教师排行榜
	getTeacherRankByMonth (params, callback) {
		return API.post2json(REPORT.GETTEACHERRANKBYMONTH, params, callback)
	},
	// 代理商-获取教师个人榜单
	getTeacherPersonalByAgent (params, callback) {
		return API.post2json(REPORT.GETTEACHERPERSONALBYAGENT, params, callback)
	},
	// 代理商-获取周教师排行榜列表详情
	getTeacherRankWeekDetailByAgent (params, callback) {
		return API.post2json(REPORT.GETTEACHERRANKWEEKDETAILBYAGENT, params, callback)
	},
	// 代理商-获取月教师排行榜列表详情
	getTeacherRankMonthDetailByAgent (params, callback) {
		return API.post2json(REPORT.GETTEACHERRANKMONTHDETAILBYAGENT, params, callback)
	},
	// 代理商-获取周教师排行榜列表
	getTeacherRankListByWeekWithAgent (params, callback) {
		return API.post2json(REPORT.GETTEACHERRANKLISTBYWEEKWITHAGENT, params, callback)
	},
	// 代理商-获取月教师排行榜列表
	getTeacherRankListByMonthWithAgent (params, callback) {
		return API.post2json(REPORT.GETTEACHERRANKLISTBYMONTHWITHAGENT, params, callback)
	},
	// 代理商-获取周教师排行榜
	getTeacherRankByWeekWithAgent (params, callback) {
		return API.post2json(REPORT.GETTEACHERRANKBYWEEKWITHAGENT, params, callback)
	},
	// 代理商-获取月教师排行榜
	getTeacherRankByMonthWithAgent (params, callback) {
		return API.post2json(REPORT.GETTEACHERRANKBYMONTHWITHAGENT, params, callback)
	},
	// 获取学生排行榜最早有数据的年月 -- 代理商维度
	getStudentRankStarDateByAgent (params, callback) {
		return API.get(REPORT.GETSTUDENTRANKSTARDATEBYAGENT, params, callback)
	},
	// 获取学生排行榜最早有数据的年月 -- 学校维度
	getStudentRankStarDateBySchool (params, callback) {
		return API.get(REPORT.GETSTUDENTRANKSTARDATEBYSCHOOL, params, callback)
	},
	// 获取联系客服文案说明
	getInstruction (params, callback) {
		return API.get(REPORT.GETINSTRUCTION, params, callback)
	},
	// 获取学校详情-付费情况
	getPayInfo (params, callback) {
		return API.post2json(REPORT.GETPAYINFO, params, callback)
	},
	// 获取付费列表
	getPaylist (params, callback) {
		return API.post2json(REPORT.GETPAYLIST, params, callback)
	},
	// 获取本学期目标完成情况
	getTarget (params, callback) {
		return API.post2json(REPORT.GETTARGET, params, callback)
	},
	// 激活报表报告信息
	getActivationInfo (params, callback) {
		return API.get(REPORT.GETACTIVATIONINFO, params, callback)
	},
	// 获取学校月付费订单
	getMonthOrder (params, callback) {
		return API.post2json(REPORT.GETMONTHORDER, params, callback)
	},
	// 激活情况班级
	getSchoolActive (params, callback) {
		return API.get(REPORT.GETREPORTACTIVATIONDETAIL, params, callback)
	},
	// 保存已读日志
	saveReadLog (params, callback) {
		return API.post2json(REPORT.SAVEREADLOG, params, callback)
	},
	//  获取该代理商下参加学校列表
	getSchoolListByAgent (params, callback) {
		return API.get(REPORT.GETSCHOOLLISTBYAGENT, params, callback)
	},
	//  获取该代理商下有多少学校参加活动
	getSchoolCountByAgent (params, callback) {
		return API.get(REPORT.GETSCHOOLCOUNTBYAGENT, params, callback)
	},
	// 获取下载图片的地址
	getActivityPic (params, callback) {
		return API.get(REPORT.GETACTIVITYPIC, params, callback)
	},
	// 付费情况柱状图接口和班级付费情况
	getPayInfoBar (params, callback) {
		return API.post2json(REPORT.GETPAYINFOBAR, params, callback)
	},
	// 付费情况柱状图接口和班级付费情况
	getPayInfoClass (params, callback) {
		return API.post2json(REPORT.GETPAYINFOCLASS, params, callback)
	},
	// 付费情况班级里学生信息
	classPay (params, callback) {
		return API.post2json(REPORT.CLASSPAY, params, callback)
	},
	// 导入比table表格接口
	exportTable (params, callback) {
		return API.post2json(REPORT.EXPORTTABLE, params, callback)
	},
	// 导入比基本信息接口
	exportInfo (params, callback) {
		return API.post2json(REPORT.EXPORTINFO, params, callback)
	},
	// 新增报备园判断是否是相似园
	isSameSchool (params, callback) {
		return API.post(REPORT.ISSAMESCHOOL, params, callback)
	},
	// 新增报备园判断是不是在相同区域
	isSameArea (params, callback) {
		return API.post(REPORT.ISSAMEAREA, params, callback)
	},
	// 预警质量统计
	qualityCount (params, callback) {
		return API.get(REPORT.QUALITYCOUNT, params, callback)
	},
	// 预警质量列表
	qualityList (params, callback) {
		return API.get(REPORT.QUALITYLIST, params, callback)
	},
	// 预警质量详情
	quaDetail (params, callback) {
		return API.get(REPORT.QUADETAIL, params, callback)
	},
	// 预警质量提交
	quaSummit (params, callback) {
		return API.post2json(REPORT.QUASUMMIT, params, callback)
	},
	// 预警离线统计
	offlityCount (params, callback) {
		return API.get(REPORT.OFFLITYCOUNT, params, callback)
	},
	// 预警离线列表
	offlityList (params, callback) {
		return API.get(REPORT.OFFLITYLIST, params, callback)
	},
	// 预警离线详情
	offDetail (params, callback) {
		return API.get(REPORT.OFFDETAIL, params, callback)
	},
	// banner预警数量
	menuFaultQua (params, callback) {
		return API.get(REPORT.MENUFAULTQUA, params, callback)
	},
	// 获取收益池
	getEarningsAmount (params, callback) {
		return API.get(REPORT.GETEARNUNGSAMOUNT, params, callback)
	},
	// 取消订单
	orderCancel (params, callback) {
		return API.post2json(REPORT.ORDERCANCEL, params, callback)
	},
	// 成长时光集-学校统计
	albumSchoolCount (params, callback) {
		return API.get(REPORT.ALBUMSCHOOLCOUNT, params, callback)
	},
	// 成长时光集-学校列表
	albumSchoolList (params, callback) {
		return API.get(REPORT.ALBUMSCHOOLLIST, params, callback)
	},
	// 成长时光集-班级列表
	albumClassList (params, callback) {
		return API.get(REPORT.ALBUMCLASSLIST, params, callback)
	},
	// 成长时光集-学生列表
	albumStudentList (params, callback) {
		return API.get(REPORT.ALBUMSTUDENTLIST, params, callback)
	},
	// 首页 时光集tab数据
	homeSgjTabData (params, callback) {
		return API.get(REPORT.HOMESGJTABDATA, params, callback)
	},
	// 报表列表数据
	sgjFormsList (params, callback) {
		return API.get(REPORT.ALBUMSTUDENTLIST, params, callback)
	},
	// 学校报表列表数据
	formsSchoolList (params, callback) {
		return API.get(REPORT.FORMSSCHOOLLIST, params, callback)
	},
	// 班级报表列表数据
	formsClassList (params, callback) {
		return API.get(REPORT.FORMSCLASSLIST, params, callback)
	},
	// 时光集报表详情
	sgjFormsDetail (params, callback) {
		return API.get(REPORT.SGJFORMSDETAIL, params, callback)
	},
	// 时光集报表详情老师排行
	formsTeacherSort (params, callback) {
		return API.get(REPORT.FORMSTEACHERSORT, params, callback)
	},
	//	班级周活比-等级
	getClassActiveWeely (params, callback) {
		return API.post2json(REPORT.GETCLASSACTIVEWEEKLY, params, callback)
	},
	//	班级周活比-学校活跃
	getSchoolAcive (params, callback) {
		return API.post2json(REPORT.GETSCHOOLACTIVE, params, callback)
	},
	//	班级周活比-列表
	getClassGetList (params, callback) {
		return API.post2json(REPORT.GETCLASSGETLIST, params, callback)
	},
	// 签到列表
	schoolReportList (params, callback) {
		return API.post2json(REPORT.SCHOOLREPORTLIST, params, callback)
	},
	// 签到详情
	schoolReportDetail (params, callback) {
		return API.post2json(REPORT.SCHOOLREPORTDETAIL, params, callback)
	},
	// 学校维度的园丁排行榜园丁榜新榜
	newRankTeacherList (params, callback) {
		return API.post2json(REPORT.NEWRANKTEACHERLIST, params, callback)
	},
	// 学校维度的新园丁历史周月排行榜
	newTeacherHistoryList (params, callback) {
		return API.post2json(REPORT.NEWTEACHERHISTORTLIST, params, callback)
	},
	// 学校维度的新园丁历史周月排行榜详情
	newTeacherHistoryDetail (params, callback) {
		return API.post2json(REPORT.NEWTEACHERHISTORTDETAIL, params, callback)
	},
	// 教师新的个人榜单
	newPersonRank (params, callback) {
		return API.post2json(REPORT.NEWPERSONRANK, params, callback)
	},
	// 学校维度的园丁排行榜班级榜
	classRankList (params, callback) {
		return API.get(REPORT.CLASSRANKLIST, params, callback)
	},
	// 学校维度的园丁排行榜历史班级榜
	classRankHistoryList (params, callback) {
		return API.get(REPORT.CLASSRANKHISTORYLIST, params, callback)
	},
	// 学校维度的园丁排行榜历史班级个人榜单
	classPersonRank (params, callback) {
		return API.get(REPORT.CLASSPERSONRANK, params, callback)
	},
	// 获取园长id
	getTeacherId (params, callback) {
		return API.get(REPORT.GETTEACHERID, params, callback)
	}
}
