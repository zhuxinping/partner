webpackJsonp([30],{GNNq:function(e,t){},Nk77:function(e,t){},VeSC:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("TXDt"),i=s("X2Oc"),n=s("+aT9"),r=s.n(n),o=void 0,d={name:"display-map",components:{MHeader:a.a},data:function(){return{setX:"",setY:!0,setNew:!1,base:Object(i.n)("base")}},mounted:function(){this.setX=this.base.mapAddress,this.init()},methods:{handleClose:function(){this.$router.go(-1)},init:function(){if(o=new r.a.Map("container",{zoom:16,resizeEnable:!0}),this.base.longitude&&this.base.latitude){o.setZoomAndCenter(16,[this.base.longitude,this.base.latitude]);var e=new r.a.Marker({draggable:!1,cursor:"move",raiseOnDrag:!0,title:"您当前位置"});o.add(e)}}}},c={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"near"}},[t("m-header",{attrs:{headerTitle:"坐标"},on:{backClick:this.handleClose}}),this._v(" "),t("div",{attrs:{id:"container"}}),this._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:!0,expression:"true"}],staticClass:"bottom"},[t("ul",[t("li",{staticClass:"up"},[t("img",{attrs:{src:s("IEjN"),alt:""}}),t("p",[this._v(this._s(this.setX))])])])])],1)},staticRenderFns:[]};var l=s("VU/8")(d,c,!1,function(e){s("GNNq"),s("Nk77")},"data-v-56bfc080",null);t.default=l.exports}});