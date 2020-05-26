const currentHost = window.location.host
let BASE_API = ''
let BASE_AMS = ''
let BASE_RANK = ''
switch (currentHost) {
case '172.16.52.127:8586': // 10.1.31.58
	// BASE_API = 'http://ams.szy.com:8080/ams'
	BASE_AMS = '//172.16.52.127:8586/ams'
	BASE_API = '//172.16.52.127:8586/api'
	BASE_RANK = '//172.16.52.127:8586/rank'
	break
case '10.1.31.58:8586': // 10.1.31.58
	BASE_API = '//a.szy.net:88/ams'
	BASE_AMS = '//a.szy.net:4080/amsserver'
	BASE_RANK = '//dev-api.szy.net/rank'
	break
case 'a.szy.net:88': // 联调环境
	BASE_API = '//a.szy.net:88/ams'
	BASE_AMS = '//a.szy.net:4080/amsserver'
	BASE_RANK = '//dev-api.szy.net/rank'
	break
case 'a.szy.com:88': // 测试环境
	BASE_AMS = '//a.szy.com:88/amsserver'
	BASE_API = '//a.szy.com:88/ams'
	BASE_RANK = '//alpha-api.szy.com'
	break
case 'rcams.ztjy61.com':
	BASE_AMS = '//rcams.ztjy61.com/amsserver'
	BASE_API = '//rcams.ztjy61.com/ams'
	BASE_RANK = '//rc-api.szy.cn'
	break
default:
	BASE_AMS = '//dls.szy.cn/amsserver'
	BASE_API = '//dls.szy.cn/ams'
	BASE_RANK = '//api.szy.cn'
	break
}
const path = _path => BASE_API + _path
const pathAms = pathAms => BASE_AMS + pathAms
const pathRank = pathRank => BASE_RANK + pathRank
export const REPORT = {
	// 钉钉获取企业id
	DINGDINGCROP: path('/dingtalk/getJsConfig.action'),
	// 钉钉获取免登
	DINGDINGLOGIN: path('/dingtalk/loginWithDingTalk.action'),
	// 获取权限
	ACTIONGROUP: path('/dingtalk/getCurrentUserRoleMenuAndButtonDing.action'),
	// 获取省市区
	GETCITY: path('/dingtalk/queryProvCityInfo.action'),
	// 登录信息
	LOGIN: path('/dingtalk/login.action'),
	// 登录权限
	GETAGENT: path('/dingtalk/getChildAreaAuthList.action'),
	// 获取首页轮播图
	GETBANNER: path('/dingtalk/getIndexOperationalLocation.action'),
	// 获取拜访页的开园攻略
	GETSTRATEGY: path('/dingtalk/getCallOnOperationalLocation.action'),
	// 获取报备园列表
	GETREPORTLIST: path('/dingtalk/getReportPage.action'),
	// 获取报备园基本信息
	GETBASEINFORM: path('/dingtalk/getReportSchoolInfo.action'),
	// 根据学校schoolId获取报备园基本信息
	GETANENTINFO: pathAms('/dingtalk/school/getSchoolInfo/v1.0'),
	// 获取报备激活情况
	GETREPORTACTIVATION: pathAms('/dingtalk/report/getreportactivation/v1.0'),
	// 获取报备活跃情况
	GETPREPORTACTION: pathAms('/dingtalk/report/getreportactive/v1.0'),
	// 学校详情-激活情况-激活比(班级)
	GETCLASSACTIVATIONRATIO: pathAms('/dingtalk/report/getclassactivationdetail/v1.0'),
	// 学校详情-激活情况-激活比(学生)
	GETSTUDENTACTIVATIONRATIO: pathAms('/dingtalk/report/getstudentactivationdetail/v1.0'),
	// 学校详情-激活报表
	GETACTIVATIONREPORTLIST: pathAms('/dingtalk/reportform/getactivationreport/v1.0'),
	// 学校详情-活跃报表
	GETACTIVEREPORTLIST: pathAms('/dingtalk/reportform/getactivereport/v1.0'),
	// 编辑报备信息
	UPDATEINFROM: path('/dingtalk/getReportSchoolInfoForEdit.action'),
	// 获取行业类型
	GETCLASS: path('/dingtalk/getIndustryType.action'),
	// 获取照片url
	GETIMGURL: path('/file/uploadFile.action'),
	// 提交报备园信息
	SUBMITREPORT: path('/dingtalk/addReportSchool.action'),
	// 退出登录
	LOGINOUT: path('/dingtalk/logout.action'),
	// 获取拜访记录
	VISITED: path('/dingtalk/getCallOnActionRecordPage.action'),
	// 获取学校名称
	GETSCHOOLNAME: path('/dingtalk/getAllSchoolDingPage.action'),
	// 获取联系人列表
	GETROLELIST: path('/dingtalk/getSchoolContactsDTOPage.action'),
	// 新增联系人
	ADDROLE: path('/dingtalk/saveSchoolContacts.action'),
	// 修改联系人
	UPDATEROLE: path('/dingtalk/updateSchoolContacts.action'),
	// 删除联系人
	DELETEROLE: path('/dingtalk/deleteSchoolContactsById.action'),
	// 获取上一次记录的商机名称
	GETHISTORYBUSINESS: path('/dingtalk/getLastOneCallOnRecordBySchoolId.action'),
	// 获取联系人的基本信息
	GETPERSONINFO: path('/dingtalk/getSchoolContactsById.action'),
	// 获取拜访参数
	GETVISITED: pathAms('/sys/getDataDictSubByParentCodeAndEnable/v1.0'),
	// 获取激活情况参数
	GETACTIVATION: pathAms('/sys/getDataDictSubByParentCodeOPR/v1.0'),
	// 提交拜访记录
	SUBMITVISITED: path('/dingtalk/addCallOnActionRecord.action'),
	// 添加报备园
	ADDREPORT: path('/dingtalk/checkDefaultProduct.action'),
	// 修改报备园
	UPDATEREPORT: path('/dingtalk/updateReportSchool.action'),
	// 获取运行情况等等等
	// 报备园运行情况
	TRUEEXAM: path('/dingtalk/getReportBusiness.action'),
	// 运行情况
	BRIEFREPORT: path('/dingtalk/getBriefReportIndex.action'),
	//  订单分析
	ORDER: path('/dingtalk/getOrderReport.action'),
	//  开园分析
	OPENSCHOOL: path('/dingtalk/getSchoolReport.action'),
	// 激活活跃
	// ACTIVERATIO: path('/dingtalk/getActiveReport.action'),
	// 错误日志
	ERRORMSG: path('/dingtalk/saveErrorMsgDingTalk.action'),
	// 获取回访列表
	GETRETURNVISITLIST: pathAms('/dingtalk/returnVisit/getreturnvisitlist/v1.0'),
	// 新增回访
	ADDRETURNVISIT: pathAms('/dingtalk/returnVisit/addreturnvisit/v1.0'),
	// 获取数据字典
	GETDATACODE: pathAms('/sys/getDataDictSubByDataDictCode/v1.0'),
	// 钉钉获取渠道人员的姓名和联系方式
	GETAGENTWAYINFO: pathAms('/dingtalk/qiyu/agentWayPeopleInfo/v1.0'),
	// 获取七鱼地址
	GETCONTACTINFO: pathAms('/dingtalk/qiyu/getContactInfo/v1.0'),
	// 经营简报-激活分析
	GETACTIVETIONANALYSIS: pathAms('/dingtalk/briefreport/getactivationanalysis/v1.0'),
	// 经营简报-活跃分析
	GETACTIVEANALYSIS: pathAms('/dingtalk/briefreport/getactiveanalysis/v1.0'),
	// 学校-获取教师个人榜单
	GETTEACHERPERSONALBYSCHOOL: pathAms('/school/rank/getTeacherPersonal/v1.0'),
	// 学生排行榜-按学校(历史)
	GETSTUDENTHISRANKBYSCHOOL: pathAms('/dingtalk/studentrank/getstudenthisrankByschool/v1.0'),
	// 学生排行榜-按学校(实时)
	GETSTUDENTRANKBYSCHOOL: pathAms('/dingtalk/studentrank/getstudentrankbyschool/v1.0'),
	// 学生排行榜-按代理商
	GETSTUDENTRANKBYAGENT: pathAms('/dingtalk/studentrank/getstudentrankbyagent/v1.0'),
	//  学校-获取周教师排行列表
	GETTEACHERRANKLISTBYWEEKWITHSCHOOL: pathAms('/school/rank/week/getTeacherRankList/v1.0'),
	// 学校-获取月教师排行列表
	GETTEACHERRANKLISTBYMONTHWITHSCHOOL: pathAms('/school/rank/month/getTeacherRankList/v1.0'),
	// 学校-获取周教师排行榜
	GETTEACHERRANKBYWEEK: pathAms('/school/rank/week/getTeacherRank/v1.0'),
	// 学校-获取月教师排行榜
	GETTEACHERRANKBYMONTH: pathAms('/school/rank/month/getTeacherRank/v1.0'),
	// 代理商-获取教师个人榜单
	GETTEACHERPERSONALBYAGENT: pathAms('/agent/rank/getTeacherPersonal/v1.0'),
	// 代理商-获取周教师排行榜列表详情
	GETTEACHERRANKWEEKDETAILBYAGENT: pathAms('/agent/rank/week/list/detail/getTeacherRank/v1.0'),
	// 代理商-获取月教师排行榜列表详情
	GETTEACHERRANKMONTHDETAILBYAGENT: pathAms('/agent/rank/month/list/detail/getTeacherRank/v1.0'),
	// 代理商-获取周教师排行榜列表
	GETTEACHERRANKLISTBYWEEKWITHAGENT: pathAms('/agent/rank/week/list/getTeacherRank/v1.0'),
	// 代理商-获取月教师排行榜列表
	GETTEACHERRANKLISTBYMONTHWITHAGENT: pathAms('/agent/rank/month/list/getTeacherRank/v1.0'),
	// 代理商-获取周教师排行榜
	GETTEACHERRANKBYWEEKWITHAGENT: pathAms('/agent/rank/week/getTeacherRank/v1.0'),
	// 代理商-获取周教师排行榜
	GETTEACHERRANKBYMONTHWITHAGENT: pathAms('/agent/rank/month/getTeacherRank/v1.0'),
	// 获取学生排行榜最早有数据的年月--代理商维度
	GETSTUDENTRANKSTARDATEBYAGENT: pathAms('/dingtalk/studentrank/getstudentrankstardatebyagent/v1.0'),
	// 获取学生排行榜最早有数据的年月--学校维度
	GETSTUDENTRANKSTARDATEBYSCHOOL: pathAms('/dingtalk/studentrank/getstudentrankstardatebyschool/v1.0'),
	// 联系客服文案
	GETINSTRUCTION: pathAms('/dingtalk/qiyu/customerexplain/v1.0'),
	// v1.0.5接口地址
	// 报备园-付费情况
	GETPAYINFO: pathAms('/school/pay/getSemesterDetail/v1.0'),
	// 付费列表
	GETPAYLIST: pathAms('/agent/pay/getSchoolPayDetail/v1.0'),
	// 获取本学期目标完成情况
	GETTARGET: pathAms('/agent/pay/genCurrGoalSitu/v1.0'),
	// 激活报表活跃信息
	GETACTIVATIONINFO: pathAms('/dingtalk/reportform/getactivationreportcount/v1.0'),
	// 获取学校月付费订单
	GETMONTHORDER: pathAms('/school/pay/getMonthOrder/v1.0'),
	// 学校激活统计
	GETREPORTACTIVATIONDETAIL: pathAms('/dingtalk/report/getreportactivationdetail/v1.0'),
	// 保存已读日志
	SAVEREADLOG: pathAms('/dingtalk/activity/saveReadLog/v1.0'),
	//  获取该代理商下参加学校列表
	GETSCHOOLLISTBYAGENT: pathAms('/dingtalk/activity/getSchoolListByAgent/v1.0'),
	//  获取该代理商下有多少学校参加活动
	GETSCHOOLCOUNTBYAGENT: pathAms('/dingtalk/activity/getSchoolCountByAgent/v1.0'),
	// 获取下载图片的地址
	GETACTIVITYPIC: pathAms('/dingtalk/activity/getActivityPic/v1.0'),
	// 付费情况柱状图接口和班级付费情况
	GETPAYINFOBAR: pathAms('/class/pay/getPayList/v1.0'),
	// 付费情况柱状图接口和班级付费情况
	GETPAYINFOCLASS: pathAms('/class/pay/getClassList/v1.0'),
	// 付费情况班级里学生信息
	CLASSPAY: pathAms('/class/pay/getPayDetailList/v1.0'),
	// 导入比table表格接口
	EXPORTTABLE: pathAms('/import/ratio/getWeekNewStudent/v1.0'),
	// 导入比基本信息接口
	EXPORTINFO: pathAms('/import/ratio/getImportRatioDetail/v1.0'),
	// 新增报备园判断是不是在相同区域
	ISSAMEAREA: path('/school/manageAreaCheck.action'),
	// 新增报备园判断是否是相似园
	ISSAMESCHOOL: path('/school/similarSchoolCount.action'),
	// 激活活动文案动态可配
	ACTIVATIONTEXT: pathAms('/dingtalk/activity/getPicAndText/v1.0'),
	// SASS订单详情列表
	GETORDREDETAILLIST: pathAms('/order/getOrdreDetailList/v1.0'),
	// 新增SASS订单详情
	ADDCAMPUSORDER: pathAms('/order/addCampusOrder/v1.0'),
	// 更新SASS订单详情
	UPDATECAMPUSORDER: pathAms('/order/updateCampusOrder/v1.0'),
	// 获取代理商相应的产品套餐
	GETAGENTPRODUCTAUTHLIST: pathAms('/order/getAgentProductAuthList/v1.0'),
	// 购买时长列表
	GETCAMPUSDURATION: pathAms('/order/getCampusDuration/v1.0'),
	// SASS订单详情列表
	GETORDREDETAIL: pathAms('/order/getOrdreDetail/v1.0'),
	// 唤起支付宝支付
	GETALIPAYINFO: pathAms('/order/getAliPayInfo/v1.0'),
	// 套餐列表
	// GETORDERPIC: pathAms('/order/getOrderPic/v1.0'),
	// 预警质量统计
	QUALITYCOUNT: pathAms('/dingtalk/faultalarm/qualityCount/v1.0'),
	// 预警质量列表
	QUALITYLIST: pathAms('/dingtalk/faultalarm/qualityList/v1.0'),
	// 预警质量详情
	QUADETAIL: pathAms('/dingtalk/faultalarm/qualityDetail/v1.0'),
	// 预警质量提交
	QUASUMMIT: pathAms('/dingtalk/faultalarm/qualityCommit/v1.0'),
	// 预警离线统计
	OFFLITYCOUNT: pathAms('/dingtalk/faultalarm/offlineCount/v1.0'),
	// 预警离线列表
	OFFLITYLIST: pathAms('/dingtalk/faultalarm/offlineList/v1.0'),
	// 预警离线详情
	OFFDETAIL: pathAms('/dingtalk/faultalarm/offlineDetail/v1.0'),
	// bannner预警数量
	MENUFAULTQUA: pathAms('/dingtalk/faultalarm/count/v1.0'),
	// 获取收益池
	GETEARNUNGSAMOUNT: pathAms('/order/getEarningsAmount/v1.0'),
	// 取消订单
	ORDERCANCEL: pathAms('/order/orderCancel/v1.0'),
	// 成长时光集-学校统计
	ALBUMSCHOOLCOUNT: pathAms('/dingtalk/album/schoolCount/v1.0'),
	// 首页成长时光集表格数据
	homeSgjTabData: pathAms('/dingtalk/album/studentList/v1.0'),
	// 首页成长时光集表格数据
	sgjFormsList: pathAms('/dingtalk/album/studentList/v1.0'),
	HOMESGJTABDATA: pathAms('/dingtalk/album/newSchoolCount/v1.0'),
	// 时光集报表学校列表数据
	FORMSSCHOOLLIST: pathAms('/dingtalk/album/newSchoolList/v1.0'),
	// 时光集报表班级列表
	FORMSCLASSLIST: pathAms('/dingtalk/album/newClassList/v1.0'),
	// 时光集报表详情
	SGJFORMSDETAIL: pathAms('/dingtalk/album/newStudentList/v1.0'),
	// 时光集报表详情老师排行
	FORMSTEACHERSORT: pathAms('/dingtalk/album/teacherList/v1.0'),
	//	班级周活比-等级
	GETCLASSACTIVEWEEKLY: pathAms('/dingtalk/classActive/getClassActiveWeely/v1.0'),
	//	班级周活比-学校活跃
	GETSCHOOLACTIVE: pathAms('/dingtalk/classActive/getSchoolAcive/v1.0'),
	//	班级周活比-列表
	GETCLASSGETLIST: pathAms('/dingtalk/classActive/getList/v1.0'),
	// 签到列表
	SCHOOLREPORTLIST: pathAms('/sign/schoolReportList/v1.0'),
	// 签到详情
	SCHOOLREPORTDETAIL: pathAms('/sign/schoolReportDetail/v1.0'),
	// 学校维度的园丁排行榜园丁榜新榜
	NEWRANKTEACHERLIST: pathRank('/ranking/current/detail/v1.0'),
	// 学校维度的新园丁历史周月排行榜
	NEWTEACHERHISTORTLIST: pathRank('/ranking/history/list/v1.0'),
	// 学校维度的新园丁历史周月排行榜详情
	NEWTEACHERHISTORTDETAIL: pathRank('/ranking/history/detail/v1.0'),
	// 学校维度的园丁新版个人榜单
	NEWPERSONRANK: pathRank('/ranking/user/teacherInfo/v1.0'),
	// 学校维度的园丁排行榜班级榜
	CLASSRANKLIST: pathAms('/school/rank/getClassRank/v1.0'),
	// 学校维度的园丁排行榜历史班级榜
	CLASSRANKHISTORYLIST: pathAms('/school/rank/getClassRankHisList/v1.0'),
	// 学校维度的园丁排行榜历史班级个人榜单
	CLASSPERSONRANK: pathAms('/school/rank/getClassPersonal/v1.0'),
	// 获取园长id
	GETTEACHERID: pathAms('/school/rank/getSchoolLeaderId/v1.0')
}
