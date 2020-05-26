webpackJsonp([59],{ZM2x:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("PPs4"),i=e("gyMJ"),r=e("X2Oc"),n=e("PJh5"),o=e.n(n),u={name:"arpuBar",components:{DialogModal:a.a},props:{show:{type:Boolean,default:!1}},data:function(){return{infoInform:Object(r.n)("infoInform")?Object(r.n)("infoInform"):"",playFlag:!1,index:null,arpuTarget:0,trueArpu:0,orderTarget:0,trueOrder:0,studentTarget:0,trueStudent:0,schoolTarget:0,trueSchool:0,showNum1:!1,showNum2:!1,showNum3:!1,showNum4:!1,date:""}},created:function(){this.getDate()},methods:{renderBar:function(){var t=this;this.$nextTick(function(){t.$refs.num1.style.width=t.setWidth(t.trueArpu,t.arpuTarget)+"rem",t.$refs.num2.style.width=t.setWidth(t.trueOrder,t.orderTarget)+"rem",t.$refs.num3.style.width=t.setWidth(t.trueStudent,t.studentTarget)+"rem",t.$refs.num4.style.width=t.setWidth(t.trueSchool,t.schoolTarget)+"rem"}),this.setWidth(this.trueArpu,this.arpuTarget)>=1.2&&(this.showNum1=!0),this.setWidth(this.trueOrder,this.orderTarget)>=1.2&&(this.showNum2=!0),this.setWidth(this.trueStudent,this.studentTarget)>=1.2&&(this.showNum3=!0),this.setWidth(this.trueSchool,this.schoolTarget)>=1.2&&(this.showNum4=!0)},setWidth:function(t,s){var e=t/s*400/75;return 0===t&&(e=0),e>=440/75&&(e=440/75),e},showTip:function(t){this.index=t,this.$emit("callBack",!0,this.date)},hideTip:function(t){this.index=t,this.$emit("callBack",!1,this.date)},getDate:function(){var t=this,s={};s.agentId=this.infoInform.id,i.a.getTarget(s,function(s){if(1e4===s.code)t.date=s.body.yesterdayStr,t.arpuTarget=s.body.currSemGoal.arpu,t.orderTarget=s.body.currSemGoal.orderAmount,t.studentTarget=s.body.currSemGoal.stuPayRate,t.schoolTarget=s.body.currSemGoal.paySchoolRate,t.trueArpu=s.body.currSem.arpu,t.trueOrder=s.body.currSem.orderAmount,t.trueStudent=s.body.currSem.stuPayRate,t.trueSchool=s.body.currSem.paySchoolRate,t.renderBar();else{var e=o()().subtract("days",1).format("YYYY-MM-DD").split("-");t.date=~~e[1]+"月"+~~e[2]+"日"}t.$emit("callBack",!1,t.date)})}}},l={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"arpu-bar"},[e("span",{staticClass:"spr-left"},[e("em",[t._v("本学期(截止到昨天)")]),e("i",{staticClass:"icon-answer",on:{click:function(s){t.playFlag=!0}}}),e("span",{staticClass:"spr-right"},[t._v("目标值")])]),t._v(" "),e("ul",{staticClass:"ab-content"},[e("li",{on:{click:function(s){return t.hideTip(1)}}},[e("div",{staticClass:"ab-left"},[t._v("\r\n\t\t\t\tARPU值\r\n\t\t\t")]),t._v(" "),e("div",{staticClass:"ab-mid"},[e("span",{ref:"num1",staticClass:"num",on:{click:function(s){return t.showTip(1)}}},[e("i",{directives:[{name:"show",rawName:"v-show",value:t.showNum1,expression:"showNum1"}]},[t._v(t._s(t._f("numThousand")(t._f("numFilter")(t.trueArpu))))])]),t._v(" "),e("span",{staticClass:"bg",on:{click:function(s){return t.showTip(1)}}},[e("em",{directives:[{name:"show",rawName:"v-show",value:!(!t.show||1!=t.index),expression:"show && index ==1 ? true : false"}]},[t._v("ARPU值:"+t._s(t._f("numThousand")(t._f("numFilter")(t.trueArpu))))])])]),t._v(" "),t.arpuTarget?e("div",{staticClass:"ab-right"},[t._v(t._s(t._f("numThousand")(t._f("numFilter")(t.arpuTarget))))]):e("div",{staticClass:"ab-right"},[t._v("--")])]),t._v(" "),e("li",{on:{click:function(s){return t.hideTip(2)}}},[e("div",{staticClass:"ab-left"},[t._v("\r\n\t\t\t\t订单金额\r\n\t\t\t")]),t._v(" "),e("div",{staticClass:"ab-mid"},[e("span",{ref:"num2",staticClass:"num",on:{click:function(s){return t.showTip(2)}}},[e("i",{directives:[{name:"show",rawName:"v-show",value:t.showNum2,expression:"showNum2"}]},[t._v(t._s(t._f("numThousand")(t._f("numFilter")(t.trueOrder))))])]),t._v(" "),e("span",{staticClass:"bg",on:{click:function(s){return t.showTip(2)}}},[e("em",{directives:[{name:"show",rawName:"v-show",value:!(!t.show||2!=t.index),expression:"show && index ==2 ? true : false"}]},[t._v("订单金额:"+t._s(t._f("numThousand")(t._f("numFilter")(t.trueOrder))))])])]),t._v(" "),t.orderTarget?e("div",{staticClass:"ab-right"},[t._v(t._s(t._f("numThousand")(t._f("numFilter")(t.orderTarget))))]):e("div",{staticClass:"ab-right"},[t._v("--")])]),t._v(" "),e("li",{on:{click:function(s){return t.hideTip(3)}}},[t._m(0),t._v(" "),e("div",{staticClass:"ab-mid"},[e("span",{ref:"num3",staticClass:"num",on:{click:function(s){return t.showTip(3)}}},[e("i",{directives:[{name:"show",rawName:"v-show",value:t.showNum3,expression:"showNum3"}]},[t._v(t._s(t._f("numFilter")(100*t.trueStudent))+"%")])]),t._v(" "),e("span",{staticClass:"bg",on:{click:function(s){return t.showTip(3)}}},[e("em",{directives:[{name:"show",rawName:"v-show",value:!(!t.show||3!=t.index),expression:"show && index ==3 ? true : false"}]},[t._v("学生付费率:"+t._s(t._f("numFilter")(100*t.trueStudent))+"%")])])]),t._v(" "),t.studentTarget?e("div",{staticClass:"ab-right"},[t._v(t._s(t._f("numFilter")(100*t.studentTarget))+"%")]):e("div",{staticClass:"ab-right"},[t._v("--")])]),t._v(" "),e("li",{staticClass:"last",on:{click:function(s){return t.hideTip(4)}}},[t._m(1),t._v(" "),e("div",{staticClass:"ab-mid"},[e("span",{ref:"num4",staticClass:"num",on:{click:function(s){return t.showTip(4)}}},[e("i",{directives:[{name:"show",rawName:"v-show",value:t.showNum4,expression:"showNum4"}]},[t._v(t._s(t._f("numFilter")(100*t.trueSchool))+"%")])]),t._v(" "),e("span",{staticClass:"bg",on:{click:function(s){return t.showTip(4)}}},[e("em",{directives:[{name:"show",rawName:"v-show",value:!(!t.show||4!=t.index),expression:"show && index ==4 ? true : false"}]},[t._v("收费园占比:"+t._s(t._f("numFilter")(100*t.trueSchool))+"%")])])]),t._v(" "),t.schoolTarget?e("div",{staticClass:"ab-right"},[t._v(t._s(t._f("numFilter")(100*t.schoolTarget))+"%")]):e("div",{staticClass:"ab-right"},[t._v("--")])])]),t._v(" "),e("div",{staticStyle:{width:"100%",height:"10px","background-color":"#f2f3f5"}}),t._v(" "),e("dialogModal",{attrs:{isShow:t.playFlag},on:{close:function(s){t.playFlag=!1}}},[e("ul",{staticClass:"alert_ul",attrs:{slot:"content"},slot:"content"},[e("ul",{staticClass:"alert_ul",attrs:{slot:"content"},slot:"content"},[e("li",{staticClass:"example",staticStyle:{"margin-top":"15px"}},[e("p",{staticClass:"raito"},[t._v("学期:")]),t._v(" "),e("p",{staticClass:"roito-left"},[t._v("春季:2月1日 ~ 7月31日")]),t._v(" "),e("p",{staticClass:"roito-left"},[t._v("秋季:8月1日 ~ 次年1月31日")])]),t._v(" "),e("li",{staticClass:"example"},[e("p",{staticClass:"raito"},[t._v("ARPU值:")]),t._v(" "),e("p",{staticClass:"roito-left"},[t._v("平均每个在读学生带来的收入")])]),t._v(" "),e("li",{staticClass:"example"},[e("p",{staticClass:"raito"},[t._v("订单金额:")]),t._v(" "),e("p",{staticClass:"roito-left"},[t._v("增值服务收入金额")])]),t._v(" "),e("li",{staticClass:"example"},[e("p",{staticClass:"raito"},[t._v("学生付费率:")]),t._v(" "),e("p",{staticClass:"roito-left"},[t._v("有xx%的在读激活学生购买了增值服务")])]),t._v(" "),e("li",{staticClass:"example"},[e("p",{staticClass:"raito"},[t._v("收费园占比:")]),t._v(" "),e("p",{staticClass:"roito-left"},[t._v("有xx%的正式园购买了增值服务")])])])])])],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"ab-left"},[s("span",[this._v("学生")]),s("br"),this._v(" "),s("span",[this._v("付费率")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"ab-left"},[s("span",[this._v("收费园")]),s("br"),this._v(" "),s("span",[this._v("占比")])])}]};var c=e("VU/8")(u,l,!1,function(t){e("knfB")},"data-v-1207d158",null);s.default=c.exports},knfB:function(t,s){}});