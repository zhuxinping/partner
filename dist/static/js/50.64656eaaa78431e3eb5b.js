webpackJsonp([50],{"8FZz":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("mvHQ"),s=e.n(i),n=e("woOf"),o=e.n(n),u=(e("ehhp"),e("NVmV")),l=e.n(u),r=e("7+uW"),c=e("TXDt"),d=e("gyMJ"),h=e("KgXo"),f=e("j1Tj"),v=e("X2Oc");r.default.component(l.a.name,l.a);var m={name:"FaultAlarm",components:{swiperImage:function(){return e.e(78).then(e.bind(null,"uL0T"))},MHeader:c.a,VLoading:h.a,VDictionary:f.a},data:function(){return{imgEnlargeSrc:"",tabData:["视频质量","视频离线"],infoInform:Object(v.n)("infoInform"),currentTab:0,countData:{addCount:"",undealCount:""},statusQua:{flag:0,value:0,curName:"未处理",option:[{name:"未处理",value:0},{name:"处理中",value:2},{name:"延期处理",value:3},{name:"已解决",value:1}]},dictionaryIndex:"",pickerFlag:!1,currentStatus:"",dictionaryArray:[],items:[],delayLoad:!1,switch:!0,pageSize:10,pageNo:1}},created:function(){this.quaParams={agentId:this.infoInform.id,agentChildAuthArea:this.infoInform.agentChildAuthArea,agentChildAccount:this.infoInform.agentChildAccount,roleId:this.infoInform.roleId,userType:this.infoInform.userType,userCenterIdDing:this.infoInform.userCenterId},this.offParams={agentId:this.infoInform.id,agentChildAuthArea:this.infoInform.agentChildAuthArea,agentChildAccount:this.infoInform.agentChildAccount},Object(v.r)("11_01_quality_alert",0)},beforeRouteEnter:function(t,a,e){"ZtpartnerHome"===a.name&&(t.meta.isBack=!0),e()},activated:function(){this.delayLoad=!1,this.currentStatus=0;var t=Object(v.n)("quaSubmitFlag");(this.$route.meta.isBack||t)&&(this.pageNo=1,this.currentTab=0,this.items=[],this.infoInform=Object(v.n)("infoInform"),this.countData={addCount:"",undealCount:""},t||(this.statusQua.value=0,this.statusQua.curName="未处理"),this.loadData(),this.qualityCount(),this.delayLoad=!0,t&&Object(v.l)("quaSubmitFlag",1)),this.$route.meta.isBack=!1},methods:{imgEnlarge:function(t){Object(v.r)("11_01_quality_alert_pic",1);var a=t.indexOf("?");this.imgEnlargeSrc=-1!==a?t.substring(0,a):t},tabSwitch:function(t){Object(v.r)(1===t?"11_02_offline_alert":"11_01_quality_alert",0),this.currentTab=t,this.pageNo=1,this.statusQua.value=0,this.statusQua.curName="未处理",this.currentStatus=0,this.items=[],this.qualityCount(),this.loadData(1)},handleClose:function(){this.$router.push("/home")},statusChange:function(t,a){},qualityCount:function(){var t=this;if(this.currentTab)d.a.offlityCount(this.offParams,function(a){1e4===a.code&&t.dealCount(a.body)});else{var a=o()({},this.quaParams,{status:0,pageSize:10,pageNo:1});d.a.qualityCount(a,function(a){1e4===a.code&&t.dealCount(a.body)})}},dealCount:function(t){this.countData.undealCount=t.undealCount||t.count,this.countData.addCount=t.addCount},quaDetail:function(t){this.$router.push({path:"/videoQuaDetail",query:{id:t}})},loadData:function(t){var a=this;if(this.$refs.loading.onchange(),this.currentTab){var e=o()({},this.offParams,{pageNo:this.pageNo,pageSize:this.pageSize});d.a.offlityList(e,function(e){a.dealListData(e,t)})}else{var i=o()({},this.quaParams,{pageNo:this.pageNo,pageSize:this.pageSize,status:this.statusQua.value});d.a.qualityList(i,function(e){a.dealListData(e,t)})}},dealListData:function(t,a){1e4===t.code?(this.items=a?t.body:this.items.concat(t.body),this.delayLoad=!1,this.pageNo++,t.body.length<=this.pageSize-1&&(this.delayLoad=!0,this.$refs.loading.change())):this.$refs.loading.change(),this.switch=!0},loadTop:function(){this.pageNo=1,this.loadData(1),this.$refs.loading.onchange()},loadMore:function(){if(this.delayLoad)return!1;this.delayLoad=!0,this.loadData()},handleTopChange:function(){var t=this;this.switch=!1,setTimeout(function(){t.$refs.loadmore&&t.$refs.loadmore.onTopLoaded()},1e3)},offDetail:function(t){this.currentTab?(Object(v.n)("offDetail",s()(t)),this.$router.push({path:"/videoOffDetail"})):this.$router.push({path:"/videoQuaDetail?id="+t.id})},selectStatus:function(){this.dictionaryArray=this.statusQua.option,this.dictionaryIndex=this.currentStatus||0,this.pickerFlag=!0},sureCommon:function(t,a,e){this.dictionaryIndex=e,this.statusQua.curName=a[e].name,this.pickerFlag=!1,this.currentStatus=e,this.statusQua.value=this.statusQua.option[e].value,this.pageNo=1,this.loadData(1)},changeStatus:function(){this.pickerFlag=!1,this.dictionaryIndex=null}}},g={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container"},[e("m-header",{attrs:{headerTitle:"故障预警"},on:{backClick:t.handleClose}}),t._v(" "),e("ul",{staticClass:"fault-tab"},t._l(t.tabData,function(a,i){return e("li",{key:i,class:i===t.currentTab?"current":"",on:{click:function(a){return t.tabSwitch(i)}}},[e("span",[t._v(t._s(a))])])}),0),t._v(" "),e("div",{directives:[{name:"code",rawName:"v-code",value:"VEDIO_ALARM_LIST",expression:'"VEDIO_ALARM_LIST"'}]},[e("ul",{staticClass:"fault-caption"},[e("li",[e("div",{staticClass:"fault-caption-info"},[t._v("今日新增")]),t._v(" "),e("span",{staticClass:"add-total"},[t._v(t._s(t.countData.addCount))]),t._v(" "+t._s(t.currentTab?"台":"条")+"\n\t\t\t")]),t._v(" "),e("li",[e("div",{staticClass:"fault-caption-info"},[t._v("累计"+t._s(t.currentTab?"":"未处理"))]),t._v(" "),e("span",{staticClass:"ndeal"},[t._v(t._s(t.countData.undealCount))]),t._v(t._s(t.currentTab?"台":"条")+"\n\t\t\t")])]),t._v(" "),e("div",{staticClass:"fault-list-status"},[t.currentTab?[e("strong",[t._v("离线信息")])]:[e("strong",[t._v("故障内容")]),t._v(" "),e("span",{staticClass:"status-btn layer-sel",on:{click:t.selectStatus}},[t._v(t._s(t.statusQua.curName)),e("i")])]],2),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.statusQua.flag,expression:"statusQua.flag"}]},[e("div",{staticClass:"layer-status"},[e("ul",t._l(t.statusQua.option,function(a,i){return e("li",{key:a.value},[e("div",{staticClass:"form-chk-ct"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.statusQua.value,expression:"statusQua.value"}],attrs:{type:"radio",id:"layer-ipt"+i,name:"layer-ipt"},domProps:{value:a.value,checked:t._q(t.statusQua.value,a.value)},on:{click:function(e){return t.statusChange(a.value,a.name)},change:function(e){return t.$set(t.statusQua,"value",a.value)}}}),e("label",{attrs:{for:"layer-ipt"+i}})]),e("label",{attrs:{for:"layer-ipt"+i}},[t._v(t._s(a.name))])])}),0)]),t._v(" "),e("div",{staticClass:"layer-shade",on:{click:function(a){t.statusQua.flag=0}}})])]),t._v(" "),e("mt-loadmore",{directives:[{name:"code",rawName:"v-code",value:"VEDIO_ALARM_LIST",expression:'"VEDIO_ALARM_LIST"'}],ref:"loadmore",staticClass:"main",attrs:{"top-method":t.loadTop,topLoadingText:"正在刷新..."},on:{"top-status-change":t.handleTopChange}},[e("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],ref:"quaParent",staticClass:"fault-list",attrs:{"infinite-scroll-distance":"100","infinite-scroll-immediate-check":!0}},[t.currentTab?t._l(t.items,function(a,i){return e("li",{key:i,on:{click:function(e){return t.offDetail(a)}}},[e("span",{directives:[{name:"show",rawName:"v-show",value:a.newFlag,expression:"item.newFlag"}],staticClass:"fault-list-new"}),t._v(" "),e("div",{staticClass:"line-list-l"},[e("div",{staticClass:"fault-list-title text-over"},[t._v(t._s(a.schoolName)+" ["+t._s(a.className)+" "+t._s(a.deviceName)+"]")]),t._v(" "),e("div",{staticClass:"fault-list-time off-list-time"},[t._v(t._s(a.createTime))])]),t._v(" "),e("div",{staticClass:"line-list-r"},[e("span",{staticClass:"line-list-feedback"},[t._v(t._s(a.feedbackNum))]),t._v("次反馈\n\t\t\t\t\t")])])}):t._l(t.items,function(a,i){return e("li",{key:i},[e("div",{staticClass:"qua-list-l",on:{click:function(e){return t.offDetail(a)}}},[e("span",{directives:[{name:"show",rawName:"v-show",value:a.newFlag,expression:"item.newFlag"}],staticClass:"fault-list-new"}),t._v(" "),e("div",{staticClass:"fault-list-title text-over"},[t._v(t._s(a.schoolName)+" ["+t._s(a.className)+" "+t._s(a.cameraName)+"]")]),t._v(" "),e("div",{staticClass:"fault-list-time"},[t._v(t._s(a.mobile)),e("span",[t._v(t._s(a.createTime))])]),t._v(" "),e("div",{staticClass:"qua-list-content text-over"},[t._v(t._s(a.feedbackCont))])]),t._v(" "),a.picUrl?e("img",{attrs:{src:a.picUrl,alt:""},on:{click:function(e){return t.imgEnlarge(a.picUrl)}}}):t._e()])})],2),t._v(" "),e("v-loading",{ref:"loading",attrs:{loadingFlag:!0}})],1),t._v(" "),e("swiperImage",{attrs:{chooseFlag:t.imgEnlargeSrc,schoolPicUrl:t.imgEnlargeSrc},on:{change:function(a){t.imgEnlargeSrc=""}}}),t._v(" "),e("v-dictionary",{ref:"dictionary",attrs:{type:"1",pickerFlag:t.pickerFlag,code:"value",keyValue:"name",titleText:"故障预警",keyArray:t.dictionaryArray,defaultIndex:t.dictionaryIndex},on:{sureData:t.sureCommon,changeStatus:t.changeStatus}})],1)},staticRenderFns:[]};var _=e("VU/8")(m,g,!1,function(t){e("kafx")},"data-v-5e51b926",null);a.default=_.exports},kafx:function(t,a){}});