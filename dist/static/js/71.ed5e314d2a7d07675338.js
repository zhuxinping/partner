webpackJsonp([71],{UuLJ:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("TXDt"),i=a("X2Oc"),n=a("gyMJ"),r=a("KgXo"),o={name:"teacherRanking",components:{MHeader:s.a,VLoading:r.a},data:function(){return{current:0,tabList:["本周排名","本月排名"],type:null,yesterdayStr:"",list:[],infoInform:Object(i.n)("infoInform"),rankImg:a("m3Z4"),topStr:""}},beforeRouteEnter:function(t,e,a){"ztreportBaseInfrom"!==e.name&&"ZtpartnerHome"!==e.name&&"ZtlivelyAnalyzing"!==e.name||(t.meta.index=0),t.meta.type=t.params.type,t.meta.schoolId=t.params.schoolId,a()},mounted:function(){this.type=~~this.$route.meta.type,this.current=~~this.$route.meta.index,this.ChangeTab(this.current),this.type?Object(i.r)("07_05_teachers_weekly_list","0"):Object(i.r)("07_01_teachers_weekly_list","0")},methods:{goBack:function(){this.type&&4!=~~Object(i.m)("activeAnaly")?this.$router.push({path:"/reportBaseInfrom/3/"+this.$route.meta.schoolId}):0===this.type&&4!=~~Object(i.m)("activeAnaly")?this.$router.push("/livelyAnalyzing"):4==~~Object(i.m)("activeAnaly")&&(this.$router.push("/home"),Object(i.l)("activeAnaly")),this.type?Object(i.r)("07_05_back","1"):Object(i.r)("07_01_back","1")},ChangeTab:function(t){this.current=t,this.$route.meta.index=t,document.getElementsByClassName("load-list")[0].scrollTop=0,this.getData(t),this.type&&t?Object(i.r)("07_05_teachers_monthly_list","1"):!this.type&&t&&Object(i.r)("07_01_teachers_monthly_list","1")},agentWeekDate:function(){var t=this,e={};e.agentId=this.infoInform.id,n.a.getTeacherRankByWeekWithAgent(e,function(e){1e4===e.code&&(t.yesterdayStr="昨天("+e.body.yesterdayStr+")",t.topStr="园丁排行榜TOP"+e.body.top,e.body.teachers.length&&(t.list=e.body.teachers,e.body.teachers.forEach(function(t){t.userPic=t.userPic?t.userPic+"?imageView/1/w/160/h/160":Object(i.d)("teacher",t.sexNew)}))),t.$refs.loading.change()})},agentMonthDate:function(){var t=this,e={};e.agentId=this.infoInform.id,n.a.getTeacherRankByMonthWithAgent(e,function(e){1e4===e.code&&(t.yesterdayStr="昨天("+e.body.yesterdayStr+")",t.topStr="园丁排行榜TOP"+e.body.top,e.body.teachers.length&&(t.list=e.body.teachers,e.body.teachers.forEach(function(t){t.userPic=t.userPic?t.userPic+"?imageView/1/w/160/h/160":Object(i.d)("teacher",t.sexNew)}))),t.$refs.loading.change()})},schoolWeekDate:function(){var t=this,e={};e.schoolId=this.$route.meta.schoolId,n.a.getTeacherRankByWeek(e,function(e){"10000"===e.code&&e.body.teachers.length&&(t.list=e.body.teachers,e.body.teachers.forEach(function(t){t.pic=t.pic?t.pic+"?imageView/1/w/160/h/160":Object(i.d)("teacher",t.sexNew)})),t.$refs.loading.change()})},schoolMonthDate:function(){var t=this,e={};e.schoolId=this.$route.meta.schoolId,n.a.getTeacherRankByMonth(e,function(e){"10000"===e.code&&e.body.teachers.length&&(t.list=e.body.teachers,e.body.teachers.forEach(function(t){t.pic=t.pic?t.pic+"?imageView/1/w/160/h/160":Object(i.d)("teacher",t.sexNew)})),t.$refs.loading.change()})},getData:function(t){this.type?0===t?this.schoolWeekDate():this.schoolMonthDate():0===t?this.agentWeekDate():this.agentMonthDate()},toRule:function(){this.$router.push({path:"/teacherRule"})},topersonRank:function(t,e){var a=void 0;this.type?(a=this.$route.meta.schoolId,Object(i.r)("07_05_personal_list","1")):(a=t,Object(i.r)("07_01_personal_list","1")),this.$router.push({path:"/personRanking/"+this.type+"/"+this.current+"/"+e+"/"+a})},toHistoryRank:function(){this.type?Object(i.r)("07_05_history_ranking","1"):Object(i.r)("07_01_history_ranking","1"),this.$router.push({path:"/historyRank/"+this.type+"/"+this.current+"/"+this.$route.meta.schoolId})}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"flex"},[a("MHeader",{attrs:{headerTitle:t.type?"园丁排行榜-按学校":t.topStr},on:{backClick:t.goBack}}),t._v(" "),a("span",{staticClass:"right-text",on:{click:t.toHistoryRank}},[t._v("历史排行")]),t._v(" "),a("div",{staticClass:"tab-hd"},[a("div",{staticClass:"left"},t._l(t.tabList,function(e,s){return a("a",{key:s,class:t.current==s?"now":"",attrs:{href:"javascript:;"},on:{click:function(e){return t.ChangeTab(s)}}},[t._v(t._s(e))])}),0),t._v(" "),a("div",{staticClass:"right"},[t._v(t._s(t.type?"实时数据":t.yesterdayStr))])])],1),t._v(" "),a("ul",{staticClass:"load-list"},[t._l(t.list,function(e,s){return a("li",{key:s,staticClass:"rank-li",on:{click:function(a){return t.topersonRank(e.schoolId,e.userId)}}},[a("div",{staticClass:"list-left"},[e.rank<=3&&e.score?a("i",{staticClass:"common",class:1==e.rank?"rank1":2==e.rank?"rank2":3==e.rank?"rank3":""}):a("i",{staticClass:"common"},[t._v(t._s(e.score?e.rank:""))]),t._v(" "),a("img",{staticClass:"avtar-img",attrs:{src:t.type?e.pic:e.userPic,alt:""}}),t._v(" "),a("div",{staticClass:"user-info"},[a("span",{staticClass:"active"},[t._v(t._s(e.name))]),t._v(" "),t.type?a("span",[e.active?e.active&&!e.rank?a("em",[t._v(t._s(t.current?"本月有点懒，还没参与互动":"本周有点懒，还没参与互动"))]):!e.active||e.rank||e.championTimes?e.active&&e.rank&&e.championTimes?a("em",[t._v("共"),a("em",{staticClass:"score"},[t._v(t._s(e.championTimes))]),t._v(t._s(t.current?"次荣获本学年月榜冠军":"次荣获本学年周榜冠军"))]):t._e():a("em"):a("em",[t._v("老师还没有激活，参与不了排行")])]):a("span",{staticClass:"agent-school"},[a("em",[t._v(t._s(e.schoolNumber))]),t._v(" "),a("em",{staticClass:"name-str"},[t._v(t._s(e.schoolName))])])])]),t._v(" "),a("div",{staticClass:"list-right"},[s?t._e():a("span",{staticClass:"top"},[t._v("互动指数"),a("i",{staticClass:"icon-answer",on:{click:function(e){return e.stopPropagation(),t.toRule(e)}}})]),t._v(" "),a("span",{staticClass:"bom"},[t._v(t._s(e.score))])])])}),t._v(" "),a("v-loading",{ref:"loading",attrs:{loadingFlag:!0}})],2)])},staticRenderFns:[]},h=a("VU/8")(o,c,!1,null,null,null);e.default=h.exports}});