webpackJsonp([32],{"39ar":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});i("ehhp");var s=i("NVmV"),a=i.n(s),n=i("7+uW"),o=i("X2Oc"),l=i("gyMJ"),c=i("TXDt"),r=i("PPs4"),h=i("TBT8"),m=i("uL0T"),d=i("KgXo");n.default.component(a.a.name,a.a);var p={name:"index",components:{MHeader:c.a,DialogModal:r.a,OpenModal:h.a,SwiperImage:m.default,VLoading:d.a},data:function(){return{popupVisible:!1,searchSchoolName:"",list:[],infoInform:Object(o.n)("infoInform"),page:1,pageSize:10,delayLoad:!1,switch:!0,alertFlag:!1,imgFlag:!1,summary:"",imgIndex:0,previewImg:[],defaultImg:i("et/q"),templateStartTime:"",templateEndTime:"",listInfo:[{code:"RETURN_VISIT_WAY",title:"回访方式"},{code:"RETURN_VISIT_TYPE",title:"回访类型"}],visitWayCode:"",visitTypeCode:""}},filters:{capitalize:function(t){return t.substring(5,11)},capitalizetime:function(t){return t.substring(11,16)}},mounted:function(){this.getData(),Object(o.r)("03_01_return_visit","0"),document.getElementById("searchSchool").addEventListener("input",Object(o.e)(this.searchSchool,300),!1)},methods:{handleClose:function(){this.$router.push("/home")},handleTouchmove:function(t){t.preventDefault()},openSelect:function(){Object(o.r)("03_01_return_visit_filter","1"),this.popupVisible=!0},selectSuccess:function(t,e,i){this.visitWayCode=t[0]?t[0]:"",this.visitTypeCode=t[1]?t[1]:"",this.templateStartTime=e,this.templateEndTime=i,this.search()},search:function(){document.documentElement.scrollTop=0,this.page=1,this.getData(1),this.popupVisible=!1,this.$refs.loading.onchange()},showAlert:function(t){this.switch&&(this.alertFlag=!0,this.summary=t)},showSwiper:function(t,e){this.switch&&(this.imgIndex=e,this.previewImg=t,this.imgFlag=!0)},loadMore:function(){if(this.delayLoad)return!1;this.delayLoad=!0,this.getData(),this.$refs.loading.onchange()},loadTop:function(){this.page=1,this.getData(1),this.$refs.loading.onchange()},handleTopChange:function(t){var e=this;this.switch=!1,setTimeout(function(){e.$refs.loadmore&&e.$refs.loadmore.onTopLoaded()},3e3)},addVisited:function(){Object(o.r)("03_01_return_visit_add","1"),this.$router.push({path:"/backvisitedAdd/null"})},searchSchool:function(){document.getElementsByClassName("main")[0].scrollTop=0,this.templateStartTime="",this.templateEndTime="",this.visitWayCode="",this.visitWayCode="",this.visitTypeCode="",this.listInfo=[{code:"RETURN_VISIT_WAY",title:"回访方式"},{code:"RETURN_VISIT_TYPE",title:"回访类型"}],this.search()},getData:function(t){var e=this,s={};s.agentId=this.infoInform.id,s.pageNo=this.page,s.pageSize=this.pageSize,s.schoolName=this.searchSchoolName,s.startTime=this.templateStartTime,s.endTime=this.templateEndTime,s.visitWayMultiSelect=this.visitWayCode,s.visitTypeMultiSelect=this.visitTypeCode,s.userType=this.infoInform.userType,s.roleId=this.infoInform.roleId,s.agentChildAccount=this.infoInform.agentChildAccount,s.agentChildAuthArea=this.infoInform.agentChildAuthArea,s.userCenterIdDing=this.infoInform.userCenterId,l.a.getReturnVisitList(s,function(s){1e4===s.code&&s.body?(s.body.list&&s.body.list.forEach(function(t){t.url?t.url.indexOf("?")>-1?t.url=t.url:t.url=t.url+"?imageView/1/w/160/h/160":t.url=i("et/q")}),e.list=t?s.body.list:e.list.concat(s.body.list),e.delayLoad=!1,e.page++,s.body.list.length<=e.pageSize-1&&(e.delayLoad=!0,e.$refs.loading.change())):e.$refs.loading.change(),e.switch=!0})}}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("div",{staticClass:"flex"},[s("m-header",{attrs:{headerTitle:"客户回访(售后)"},on:{backClick:t.handleClose}}),t._v(" "),s("img",{directives:[{name:"code",rawName:"v-code",value:"RETURN_VISIT_ADD",expression:'"RETURN_VISIT_ADD"'}],staticClass:"right-img",attrs:{src:i("eIs4")},on:{click:t.addVisited}}),t._v(" "),s("div",{staticClass:"search"},[s("div",{staticClass:"search_school search-input"},[s("img",{attrs:{src:i("4Fmw"),alt:""}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.searchSchoolName,expression:"searchSchoolName"}],attrs:{id:"searchSchool",type:"text",placeholder:"输入学校名称关键字搜索"},domProps:{value:t.searchSchoolName},on:{input:function(e){e.target.composing||(t.searchSchoolName=e.target.value)}}})]),t._v(" "),s("img",{staticClass:"screen",attrs:{src:i("JSM+"),alt:""},on:{click:t.openSelect}})])],1),t._v(" "),s("mt-loadmore",{directives:[{name:"code",rawName:"v-code",value:"RETURN_VISIT_LIST",expression:'"RETURN_VISIT_LIST"'}],ref:"loadmore",staticClass:"main",attrs:{"top-method":t.loadTop,topLoadingText:"正在刷新..."},on:{"top-status-change":t.handleTopChange}},[s("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],attrs:{"infinite-scroll-distance":"100","infinite-scroll-immediate-check":!0}},t._l(t.list,function(e,i){return s("ul",{key:i,staticClass:"main-list"},[s("li",{staticClass:"first"},[s("img",{staticClass:"logo",attrs:{src:e.url,alt:""}}),t._v(" "),s("div",{staticClass:"right-content"},[s("div",{staticClass:"content-top"},[s("p",{staticClass:"schoolName"},[t._v(t._s(e.schoolName))]),t._v(" "),s("div",[s("p",{staticClass:"stand"},[t._v(t._s(e.visitTypeName))])])]),t._v(" "),s("div",{staticClass:"content-bottom"},[s("span",[t._v(t._s(t._f("capitalize")(e.visitTime)))]),t._v(" "),s("span",[t._v(t._s(t._f("capitalizetime")(e.visitTime)))]),t._v(" "),s("span",[t._v(t._s(e.visitorName))]),t._v(" "),s("span",[t._v(t._s(e.visitWayName))])])])]),t._v(" "),s("li",{staticClass:"thrid",on:{click:function(i){return t.showAlert(e.visitContent)}}},[t._v(t._s(e.visitContent))]),t._v(" "),s("li",{directives:[{name:"show",rawName:"v-show",value:e.returnVisitPicList&&e.returnVisitPicList.length,expression:"item.returnVisitPicList && item.returnVisitPicList.length"}],staticClass:"fourth"},t._l(e.returnVisitPicList,function(i,a){return i.picUrl.length?s("img",{key:a,staticClass:"select-img",attrs:{src:i.picUrl+"?imageView/1/w/160/h/160",alt:""},on:{click:function(i){return t.showSwiper(e.returnVisitPicList,a)}}}):t._e()}),0)])}),0),t._v(" "),s("v-loading",{ref:"loading",attrs:{loadingFlag:!0}})],1),t._v(" "),s("openModal",{attrs:{show:t.popupVisible,listInfo:t.listInfo},on:{change:function(e){t.popupVisible=!1},success:t.selectSuccess}}),t._v(" "),s("dialogModal",{attrs:{isShow:t.alertFlag,sureShow:!1}},[s("ul",{staticClass:"visited-text",attrs:{slot:"content"},slot:"content"},[s("li",{staticClass:"alert-logo",on:{click:function(e){t.alertFlag=!1}}},[t._v("回访内容 "),s("img",{attrs:{src:i("ShLw"),alt:""}})]),t._v(" "),s("li",{staticClass:"alert-content"},[t._v(t._s(t.summary))])])]),t._v(" "),s("swiperImage",{attrs:{imgFlag:t.imgFlag,previewImg:t.previewImg,imgIndex:t.imgIndex},on:{change:function(e){t.imgFlag=!1}}})],1)},staticRenderFns:[]},f=i("VU/8")(p,u,!1,null,null,null);e.default=f.exports},IYB3:function(t,e){},TBT8:function(t,e,i){"use strict";i("2EZA");var s=i("W/os"),a=i.n(s),n=(i("q/am"),i("4VPn")),o=i.n(n),l=i("7+uW"),c=i("PJh5"),r=i.n(c),h=i("X2Oc");l.default.component(o.a.name,o.a),l.default.component(a.a.name,a.a);var m={name:"selectModal",props:{show:!1,listInfo:{type:Array}},data:function(){return{popupVisible:!1,startTime:"请选择",endTime:"请选择",templateStartTime:"",templateEndTime:"",startDate:new Date("2010/01/01"),endDate:new Date("2030/12/31"),pickerValue:new Date,selectDateIndex:null,selectLikeDuIndex:null,date:[{name:"昨天"},{name:"今天"},{name:"上周"},{name:"本周"}],arrCode:[],ref:"",list:[],type:""}},created:function(){var t=this;this.$nextTick(function(){t.endDate=new Date(r()().add(10,"years").format("YYYY/MM/DD"))}),this.getInformation()},methods:{getInformation:function(){var t=this;Object(h.j)("SCH_CATEGORY").then(function(e){t.schoolType=e.body}),this.list=[],this.listInfo&&this.listInfo.forEach(function(e,i){Object(h.f)(e.code,null).then(function(s){var a={};a.type=e.title,a.item=s,t.$set(t.list,i,a)})})},handleConfirm:function(t){null!==this.selectDateIndex&&(this.selectDateIndex=null,this.startTime="请选择",this.templateStartTime="",this.endTime="请选择",this.templateEndTime="");var e=r()(t).format("YYYY-MM-DD"),i=void 0,s=void 0;"start"===this.type?(i=e.replace(/-/g,"/"),s=this.templateEndTime.replace(/-/g,"/"),i&&s&&r()(s).isBefore(i)?(Object(h.q)("开始日期不能大于结束日期"),this.$refs.picker.open()):(this.startTime=e,this.templateStartTime=e)):(i=this.templateStartTime.replace(/-/g,"/"),s=e.replace(/-/g,"/"),i&&s&&r()(s).isBefore(i)?(Object(h.q)("开始日期不能大于结束日期"),this.$refs.picker.open()):(this.endTime=e,this.templateEndTime=e))},selectDate:function(t){if(this.selectDateIndex===t)this.selectDateIndex=null,this.templateStartTime="",this.templateEndTime="";else if(this.selectDateIndex=t,this.startTime="请选择",this.endTime="请选择",0===t)this.templateStartTime=r()().subtract("days",1).format("YYYY-MM-DD"),this.templateEndTime=r()().subtract("days",1).format("YYYY-MM-DD");else if(1===t)this.templateStartTime=r()().format("YYYY-MM-DD"),this.templateEndTime=r()().format("YYYY-MM-DD");else if(2===t){var e=parseInt(r()().format("d"));this.templateStartTime=r()().subtract(e+6,"days").format("YYYY-MM-DD"),this.templateEndTime=r()().subtract(e,"days").format("YYYY-MM-DD")}else{var i=parseInt(r()().format("d"));this.templateStartTime=r()().subtract(i-1,"days").format("YYYY-MM-DD"),this.templateEndTime=r()().format("YYYY-MM-DD")}},selectInfo:function(t){t.check=!t.check},reset:function(){this.selectDateIndex=null,this.startDate=new Date("2010/01/01"),this.endDate=new Date(r()().add(10,"years").format("YYYY/MM/DD")),this.startTime="请选择",this.endTime="请选择",this.templateStartTime="",this.templateEndTime="",this.arrCode=[],this.list.forEach(function(t){t.item.forEach(function(t){t.check=!1})})},selectSuccess:function(){var t=this;this.arrCode=[],this.list.forEach(function(e){Object(h.h)(e.item,"code")?t.arrCode.push(Object(h.h)(e.item,"code")):t.arrCode.push("")});var e,i;e=this.templateStartTime.replace(/-/g,"/"),i=this.templateEndTime.replace(/-/g,"/"),e&&i&&r()(i).isBefore(e)?Object(h.q)("开始日期不能大于结束日期"):this.$emit("success",this.arrCode,this.templateStartTime,this.templateEndTime)},openPicker:function(t){this.type=t,this.popupVisible=!1,this.ref=this.$refs.picker,this.$refs.picker.open()},cancelTime:function(){"start"===this.type?(this.startTime="请选择",this.templateStartTime=""):(this.templateEndTime="",this.endTime="请选择"),this.popupVisible=!0}},watch:{ref:function(t,e){t&&(this.popupVisible=!0,this.ref="")},popupVisible:function(t,e){t||this.$emit("change",!1)},show:function(t,e){this.popupVisible=!!t},listInfo:function(t,e){t&&this.reset()}}},d={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.show?i("div",[i("mt-popup",{staticClass:"sharePopup",attrs:{position:"bottom"},model:{value:t.popupVisible,callback:function(e){t.popupVisible=e},expression:"popupVisible"}},[i("ul",{staticClass:"picker"},[i("li",{staticClass:"date"},[i("div",{staticClass:"title"},[i("span",[t._v("拜访日期")])]),t._v(" "),i("div",{staticClass:"date_select"},[i("span",[t._v("自定义周期")]),t._v(" "),i("div",{on:{click:function(e){return t.openPicker("start")}}},[t._v(t._s(t.startTime))]),t._v(" "),i("span",{staticClass:"solt"}),t._v(" "),i("div",{on:{click:function(e){return t.openPicker("end")}}},[t._v(t._s(t.endTime))])]),t._v(" "),i("div",{staticClass:"label"},t._l(t.date,function(e,s){return i("span",{key:s,class:t.selectDateIndex===s?"click_span":"",on:{click:function(e){return t.selectDate(s)}}},[t._v(t._s(e.name))])}),0)]),t._v(" "),t._l(t.list,function(e,s){return i("li",{key:s,staticClass:"date"},[i("div",{staticClass:"title"},[i("span",[t._v(t._s(e.type))])]),t._v(" "),i("div",{staticClass:"label"},t._l(e.item,function(s,a){return i("span",{key:a,class:s.check?"click_span":"",on:{click:function(e){return t.selectInfo(s)}}},[t._v(t._s("商机名称"==e.type?s.description:s.name))])}),0)])}),t._v(" "),i("li",{staticClass:"button"},[i("div",{on:{click:t.reset}},[t._v("重置")]),t._v(" "),i("div",{staticClass:"success",on:{click:t.selectSuccess}},[t._v("完成")])])],2)]),t._v(" "),i("mt-datetime-picker",{ref:"picker",staticClass:"time",attrs:{type:"date",endDate:t.endDate,startDate:t.startDate},on:{confirm:t.handleConfirm,cancel:t.cancelTime},model:{value:t.pickerValue,callback:function(e){t.pickerValue=e},expression:"pickerValue"}})],1):t._e()},staticRenderFns:[]};var p=i("VU/8")(m,d,!1,function(t){i("IYB3")},"data-v-32152c34",null);e.a=p.exports}});