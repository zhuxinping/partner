webpackJsonp([54],{a3TG:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("X2Oc"),i=a("gyMJ"),n=a("36oi"),l=a("TXDt"),o={name:"activeClassRoom",components:{NoData:n.a,MHeader:l.a},data:function(){return{infoInform:Object(e.n)("infoInform")?Object(e.n)("infoInform"):"",schoolName:"",listDate:[],dateFlag:1,item:{},selectClassIndex:0}},beforeRouteEnter:function(t,s,a){t.meta.schoolName=t.params.schoolName,t.meta.schoolId=t.params.schoolId,t.meta.radio=t.params.radio,a()},mounted:function(){this.schoolName=this.$route.meta.schoolName,this.getData(),Object(e.r)("09_02_active_ratio_class","0")},methods:{handleClose:function(){this.$router.push({path:"/reportBaseInfrom/3/"+this.$route.meta.schoolId})},openSutdentReport:function(t,s){this.selectClassIndex=s,this.item=t},getData:function(){var t=this,s={};s.schoolId=this.$route.meta.schoolId,i.a.getSchoolAcive(s,function(a){0!==a.body.classActiveList.length?1e4===a.code?(t.dateFlag=1,t.listDate=a.body.classActiveList,t.openSutdentReport(t.listDate[0],0)):(t.dateFlag=2,Object(e.g)("接口错误",a,s)):t.dateFlag=2})}}},c={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"container",style:2==t.dateFlag?"background:#fff":""},[a("div",{staticClass:"flex"},[a("m-header",{attrs:{headerTitle:t.schoolName},on:{backClick:t.handleClose}}),t._v(" "),a("ul",{directives:[{name:"show",rawName:"v-show",value:1==t.dateFlag,expression:"dateFlag == 1"}],staticClass:"class-room"},t._l(t.listDate,function(s,e){return a("li",{key:e,staticClass:"class-room-li",on:{click:function(a){return t.openSutdentReport(s,e)}}},[a("div",{staticClass:"class-room-text",style:s.weekActiveRatio>=.5?"color:#297391;background:#E1F2FA":"color:#614646;background:#FFE7E7"},[a("span",{staticClass:"grade"},[t._v(t._s(s.gradeName))]),t._v(" "),a("span",{staticClass:"grade"},[t._v(t._s(s.className))])]),t._v(" "),a("i",{class:t.selectClassIndex===e?"select-class":""})])}),0)],1),t._v(" "),a("div",{staticClass:"main"},[a("div",{directives:[{name:"show",rawName:"v-show",value:1==t.dateFlag,expression:"dateFlag == 1"}],staticClass:"statics"},[a("p",[t._v("上周发布数据统计")]),t._v(" "),t._m(0),t._v(" "),a("ul",{staticClass:"ratio-list"},[a("li",{staticClass:"line1"},[a("span",[t._v("相册(条)")]),t._v(" "),a("em",[t._v(t._s(t._f("numThousand")(t.item.albumCount)))])]),t._v(" "),a("li",{staticClass:"line1"},[a("span",[t._v("点赞/评论/转发(次)")]),t._v(" "),a("em",[t._v(t._s(t._f("numThousand")(t.item.likeCount))+"/"+t._s(t._f("numThousand")(t.item.commentCount))+"/"+t._s(t._f("numThousand")(t.item.forwardCount)))])])])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:1==t.dateFlag,expression:"dateFlag == 1"}],staticClass:"statics"},[t._m(1),t._v(" "),a("ul",{staticClass:"ratio-list"},[a("li",{staticClass:"line1"},[a("span",[t._v("通知发布(条)")]),t._v(" "),a("em",[t._v(t._s(t._f("numThousand")(t.item.noticeIssuedCount)))])]),t._v(" "),a("li",{staticClass:"line1"},[a("span",[t._v("平均阅读率")]),t._v(" "),a("em",[t._v(t._s(t._f("numThousand")(t._f("numFilter")(100*t.item.readRatio)))+"%")])])])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:1==t.dateFlag,expression:"dateFlag == 1"}],staticClass:"statics"},[t._m(2),t._v(" "),a("ul",{staticClass:"ratio-list"},[a("li",{staticClass:"line1"},[a("span",[t._v("家长留言(人/次)")]),t._v(" "),a("em",[t._v(t._s(t._f("numThousand")(t.item.parentCount))+"/"+t._s(t._f("numThousand")(t.item.parentLeaveMessageCount)))])]),t._v(" "),a("li",{staticClass:"line1"},[a("span",[t._v("老师回复次数")]),t._v(" "),a("em",[t._v(t._s(t._f("numThousand")(t.item.teacherReplyCount)))])])])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:1==t.dateFlag,expression:"dateFlag == 1"}],staticClass:"statics"},[t._m(3),t._v(" "),a("ul",{staticClass:"ratio-list"},[a("li",{staticClass:"line1"},[a("span",[t._v("发布数量(个)")]),t._v(" "),a("em",[t._v(t._s(t._f("numThousand")(t.item.taskReleaseCount)))])]),t._v(" "),a("li",{staticClass:"line1"},[a("span",[t._v("完成任务的学生数量")]),t._v(" "),a("em",[t._v(t._s(t._f("numThousand")(t.item.taskCompletedStudentCount)))])])])])]),t._v(" "),a("no-data",{attrs:{operation:2==t.dateFlag}})],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"spr-title"},[s("span",{staticClass:"spr-left"},[s("em",[this._v("相册")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"spr-title"},[s("span",{staticClass:"spr-left"},[s("em",[this._v("通知")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"spr-title"},[s("span",{staticClass:"spr-left"},[s("em",[this._v("IM留言")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"spr-title"},[s("span",{staticClass:"spr-left"},[s("em",[this._v("亲子任务")])])])}]};var r=a("VU/8")(o,c,!1,function(t){a("ay1h")},"data-v-3192e814",null);s.default=r.exports},ay1h:function(t,s){}});