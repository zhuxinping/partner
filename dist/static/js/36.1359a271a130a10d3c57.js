webpackJsonp([36],{Dd8w:function(e,t,n){"use strict";t.__esModule=!0;var c,o=n("woOf"),r=(c=o)&&c.__esModule?c:{default:c};t.default=r.default||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var c in n)Object.prototype.hasOwnProperty.call(n,c)&&(e[c]=n[c])}return e}},LaGk:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var c=n("Dd8w"),o=n.n(c),r=n("X2Oc"),a=n("gyMJ"),d=n("NYxO"),i={name:"welcome",data:function(){return{data:{},code:"",cc_address:"",cc_component:""}},computed:o()({},Object(d.b)({dingding:"Config/getConfig"})),created:function(){Object(r.i)("使劲加载中..."),this.getDDcode(this.dingding)},methods:{getDDcode:function(e){var t=this;dd.runtime.permission.requestAuthCode({corpId:e.corpId,onSuccess:function(e){var n={};n.code=e.code,a.a.getFreeLogin(n,function(e){e.flag?(localStorage.clear(),Object(r.n)("infoInform",e.data),t.$router.push("/home")):t.$router.push("/login")}).catch(function(e){Object(r.g)("catch错误",e,{})})},onFail:function(e){Object(r.g)("dingding免等进去失败方法",e,{})}})}}},u={render:function(){var e=this.$createElement;return(this._self._c||e)("div")},staticRenderFns:[]};var s=n("VU/8")(i,u,!1,function(e){n("Zlnd")},"data-v-5a2cc0eb",null);t.default=s.exports},Zlnd:function(e,t){}});