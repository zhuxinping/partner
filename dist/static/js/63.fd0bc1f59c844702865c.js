webpackJsonp([63],{Jadc:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=t("woOf"),s=t.n(i),o=(t("ehhp"),t("NVmV")),n=t.n(o),l=t("7+uW"),d=t("gyMJ"),c=t("TXDt"),r=t("KgXo"),f=t("X2Oc");l.default.component(n.a.name,n.a);var v={data:function(){return{offDetailData:{},delayLoad:!1,switch:!0,pageNo:1,pageSize:10,infoInform:Object(f.n)("infoInform"),items:[]}},components:{MHeader:c.a,VLoading:r.a},mounted:function(){var e=Object(f.n)("offDetail");this.offDetailData=e||{},this.params={deviceId:this.offDetailData.deviceId,userCenterIdDing:this.infoInform.userCenterId,roleId:this.infoInform.roleId,userType:this.infoInform.userType},Object(f.r)("11_02_offline_alert_info",0),this.loadMore()},methods:{quaDetail:function(){},handleClose:function(){this.$router.go(-1)},loadData:function(e){var a=this;this.$refs.loading.onchange();var t=s()({},this.params,{pageNo:this.pageNo,pageSize:this.pageSize});d.a.offDetail(t,function(t){1e4===t.code?(a.items=e?t.body:a.items.concat(t.body),a.delayLoad=!1,a.pageNo++,t.body.length<=a.pageSize-1&&(a.delayLoad=!0,a.$refs.loading.change())):a.$refs.loading.change(),a.switch=!0})},loadTop:function(){this.pageNo=1,this.loadData(1),this.$refs.loading.onchange()},loadMore:function(){this.delayLoad||(this.delayLoad=!0,this.loadData())},handleTopChange:function(){var e=this;this.switch=!1,setTimeout(function(){e.$refs.loadmore&&e.$refs.loadmore.onTopLoaded()},1e3)}}},u={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"container"},[t("m-header",{attrs:{headerTitle:"故障预警"},on:{backClick:e.handleClose}}),e._v(" "),t("ul",{staticClass:"det-info-list fault-det-list"},[t("li",[t("div",{staticClass:"td-key"},[e._v("幼儿园名称:")]),e._v(" "),t("div",{staticClass:"td-value text-over"},[e._v(e._s(e.offDetailData.schoolName))])]),e._v(" "),t("li",[t("div",{staticClass:"td-key"},[e._v("幼儿园编号:")]),e._v(" "),t("div",{staticClass:"td-value text-over"},[e._v(e._s(e.offDetailData.schoolNo))])]),e._v(" "),t("li",[t("div",{staticClass:"td-key"},[e._v("班级名称:")]),e._v(" "),t("div",{staticClass:"td-value"},[e._v(e._s(e.offDetailData.className))])]),e._v(" "),t("li",[t("div",{staticClass:"td-key"},[e._v("设备名称:")]),e._v(" "),t("div",{staticClass:"td-value"},[e._v(e._s(e.offDetailData.deviceName))])])]),e._v(" "),t("mt-loadmore",{directives:[{name:"code",rawName:"v-code",value:"REPORT_MANAGE_LIST",expression:'"REPORT_MANAGE_LIST"'}],ref:"loadmore",staticClass:"main",attrs:{"top-method":e.loadTop,topLoadingText:"正在刷新..."},on:{"top-status-change":e.handleTopChange}},[t("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:e.loadMore,expression:"loadMore"}],staticClass:"feedback-list fault-det-list",attrs:{"infinite-scroll-distance":"100","infinite-scroll-immediate-check":!0}},[t("li",[t("span",{staticClass:"feedback-tit"},[e._v("反馈人")]),e._v(" "),t("span",{staticClass:"feedback-tit"},[e._v("反馈时间")])]),e._v(" "),e._l(e.items,function(a,i){return t("li",{key:i},[t("span",{staticClass:"feedback-name"},[e._v(e._s(a.userName)+" "+e._s(a.userAccount))]),e._v(" "),t("span",{staticClass:"feedback-time"},[e._v(e._s(a.createTime))])])})],2),e._v(" "),t("v-loading",{ref:"loading",attrs:{loadingFlag:!0}})],1)],1)},staticRenderFns:[]};var h=t("VU/8")(v,u,!1,function(e){t("ZT8y")},"data-v-004e36ef",null);a.default=h.exports},ZT8y:function(e,a){}});