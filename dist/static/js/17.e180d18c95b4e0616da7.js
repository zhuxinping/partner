webpackJsonp([17,35],{AEtI:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("table",{staticClass:"class-ratio-explain"},[s("thead",{staticClass:"class-ratio-explain-thead"},[s("th",[t._v("级别名称")]),t._v(" "),s("th",[t._v("级别")]),t._v(" "),s("th",[t._v("班级周活比")])]),t._v(" "),s("tr",{staticClass:"class-ratio-explain-tr"},[s("td",[t._v("最强王者")]),t._v(" "),s("td",[t._v("SSS")]),t._v(" "),s("td",[t._v("[2.5~")])]),t._v(" "),s("tr",{staticClass:"class-ratio-explain-tr"},[s("td",[t._v("至尊星耀")]),t._v(" "),s("td",[t._v("SS")]),t._v(" "),s("td",[t._v("[2~2.5)")])]),t._v(" "),s("tr",{staticClass:"class-ratio-explain-tr"},[s("td",[t._v("永恒钻石")]),t._v(" "),s("td",[t._v("S")]),t._v(" "),s("td",[t._v("[1.5~2)")])]),t._v(" "),s("tr",{staticClass:"class-ratio-explain-tr"},[s("td",[t._v("尊贵铂金")]),t._v(" "),s("td",[t._v("A")]),t._v(" "),s("td",[t._v("[1~1.5)")])]),t._v(" "),s("tr",{staticClass:"class-ratio-explain-tr"},[s("td",[t._v("荣耀黄金")]),t._v(" "),s("td",[t._v("B")]),t._v(" "),s("td",[t._v("[0.5~1)")])]),t._v(" "),s("tr",{staticClass:"class-ratio-explain-tr"},[s("td",[t._v("秩序白银")]),t._v(" "),s("td",[t._v("C")]),t._v(" "),s("td",[t._v("[0.3~0.5)")])]),t._v(" "),s("tr",{staticClass:"class-ratio-explain-tr"},[s("td",[t._v("倔强青铜")]),t._v(" "),s("td",[t._v("D")]),t._v(" "),s("td",[t._v("（0~0.3)")])]),t._v(" "),s("tr",{staticClass:"class-ratio-explain-tr"},[s("td",[t._v("储备黑铁")]),t._v(" "),s("td",[t._v("E")]),t._v(" "),s("td",[t._v("0")])])])}]};var i=s("VU/8")({name:"classRatioExplain"},e,!1,function(t){s("ZbrL"),s("Wj6+")},"data-v-01e8d210",null);a.default=i.exports},SxL0:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("AEtI"),i=s("PPs4"),n=s("TXDt"),l={name:"ClassRatioExplain",components:{classRatioExplain:e.default,DialogModal:i.a,MHeader:n.a},data:function(){return{type:0}},beforeRouteEnter:function(t,a,s){t.meta.type=t.params.type,s()},mounted:function(){this.type=~~this.$route.meta.type},methods:{handleClose:function(){this.$router.go(-1)}}},_={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"container"},[s("m-header",{attrs:{headerTitle:"说明"},on:{backClick:t.handleClose}}),t._v(" "),s("div",{staticClass:"main",staticStyle:{"background-color":"#fff","padding-top":"20px"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.type,expression:"type"}]},[s("span",{staticClass:"explain-title"},[t._v("活跃比：")]),t._v(" "),t._m(0),t._v(" "),s("span",{staticClass:"explain-title"},[t._v("家长活跃率：")]),t._v(" "),t._m(1)]),t._v(" "),s("span",{staticClass:"explain-title"},[t._v("班级周日均活跃比：")]),t._v(" "),s("span",{staticClass:"explain-info explain-info1"},[t._v("一个班级在一个自然周内，平均一个学生有多少个活跃的家长")]),t._v(" "),t._m(2),t._v(" "),s("span",{staticClass:"explain-title"},[t._v("班级周日均活跃比级别：")]),t._v(" "),s("classRatioExplain")],1)],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("span",{staticClass:"explain-info explain-info2"},[this._v("一个在读学生有多少个活跃的家长"),a("br"),this._v("当日活跃家长数 ÷ 在读学生数")])},function(){var t=this.$createElement,a=this._self._c||t;return a("span",{staticClass:"explain-info explain-info2"},[this._v("在读激活家长中，有百分之多少在活跃"),a("br"),this._v("当日活跃家长数 ÷ 在读激活家长数")])},function(){var t=this.$createElement,a=this._self._c||t;return a("span",{staticClass:"explain-info"},[this._v("一周平均每天活跃家长数 ÷ 一周平均每天在读学生数"),a("br"),this._v("每个自然周计算一次，统计上周的班级周活比。")])}]};var v=s("VU/8")(l,_,!1,function(t){s("hfR0")},"data-v-d2c5bf54",null);a.default=v.exports},"Wj6+":function(t,a){},ZbrL:function(t,a){},hfR0:function(t,a){}});