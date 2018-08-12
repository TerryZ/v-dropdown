!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("vDropdown",[],t):"object"==typeof exports?exports.vDropdown=t():e.vDropdown=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="dist/",t(t.s=1)}([function(e,t,n){"use strict";t.a={name:"v-dropdown",props:{position:{type:String,default:"left"},embed:{type:Boolean,default:!1},rightClick:{type:Boolean,default:!1},reOpen:{type:Boolean,default:!1},width:Number,x:Number,y:Number},data:function(){return{show:!1,styleSheet:{top:"",left:""},dropdownClass:"v-dropdown-container",dropUp:!1,callerBlur:!1,lastCaller:null}},computed:{animate:function(){var e="";return this.embed||(e=this.dropUp?"animate-up":"animate-down"),e}},methods:{visible:function(e,t){var n=this;if("boolean"==typeof e&&this.show!==e){if(this.show===e)return;if(!this.reOpen&&this.callerBlur&&e)return void(this.callerBlur=!1);this.show=e;var o=this;this.$nextTick(function(){o.show&&!o.embed&&t&&(o.adjust(t),o.lastCaller=t),n.$emit("show-change",o.show)})}},getDir:function(e){var t=e.getBoundingClientRect(),n=0,o=!1,i=this.$el.getBoundingClientRect(),r=window.pageYOffset,a=document.documentElement.clientHeight,s=this.rightClick?this.y:t.top+r;n=this.rightClick?this.y:t.top+t.height+5+r;var d=!1,u=!1;return n+i.height>r+a&&(d=!0),s-5-i.height<0&&(u=!0),!u&&d&&(n=s-5-i.height,o=!0),{top:n,up:o}},adjust:function(e){var t=e.getBoundingClientRect(),n=0,o=0,i=this.$el.getBoundingClientRect(),r=this.getDir(e);this.dropUp=r.up,n=r.top;var a=window.pageXOffset,s=document.documentElement.clientWidth,d=this.rightClick?0:t.width,u=this.rightClick?this.x:t.left+a,c=u+d/2-i.width/2,p=u+d-i.width;switch(this.position){case"left":o=u+i.width>a+s?p:u;break;case"center":o=c+i.width>a+s?p:p<a?u:c;break;case"right":o=p<a?u:p}this.styleSheet.top=n+"px",this.styleSheet.left=o+"px"},whole:function(e){var t=this;if(this.show){var n=e.path.findIndex(function(e){return e.className&&e.className.includes(t.dropdownClass)});!this.reOpen&&e.path.find(function(e){return e===t.lastCaller})&&(this.callerBlur=!0),-1===n&&this.visible(!1)}},MouseEventPolyfill:function(){"path"in Event.prototype||Object.defineProperty(Event.prototype,"path",{get:function(){for(var e=[],t=this.target;t;)e.push(t),t=t.parentElement;return-1===e.indexOf(window)&&-1===e.indexOf(document)&&e.push(document),-1===e.indexOf(window)&&e.push(window),e}})}},mounted:function(){this.MouseEventPolyfill(),this.width&&(this.styleSheet.width=this.width+"px"),this.embed?this.visible(!0):(document.body.appendChild(this.$el),this.$on("show",this.visible),this.$on("adjust",this.adjust),document.addEventListener("mousedown",this.whole))},destroyed:function(){this.embed||(this.$off("show",this.visible),this.$off("adjust",this.adjust),document.removeEventListener("mousedown",this.whole),this.$el.remove())}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(2);n.d(t,"Dropdown",function(){return o.a}),t.default=o.a},function(e,t,n){"use strict";function o(e){n(3)}var i=n(0),r=n(9),a=n(8),s=o,d=a(i.a,r.a,!1,s,"data-v-00aa88d9",null);t.a=d.exports},function(e,t,n){var o=n(4);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n(6)("de9bdf30",o,!0,{})},function(e,t,n){t=e.exports=n(5)(!1),t.push([e.i,"div.v-dropdown-container[data-v-00aa88d9]{border:1px solid #d6d7d7;margin:0;padding:0;display:inline-block;position:absolute;top:0;left:0;vertical-align:middle;box-sizing:border-box;background-color:#fff;border-radius:2px;box-shadow:0 3px 12px rgba(0,0,0,.2);-moz-box-shadow:0 3px 12px rgba(0,0,0,.2);-webkit-box-shadow:0 3px 12px rgba(0,0,0,.2);z-index:3000}div.v-dropdown-container.sm_regular[data-v-00aa88d9]{width:auto;min-width:150px}div.v-dropdown-container.sm_embed[data-v-00aa88d9]{position:relative}div.v-dropdown-container.v-dropdown-embed[data-v-00aa88d9]{position:relative;-webkit-box-shadow:0 1px 8px rgba(0,0,0,.15);box-shadow:0 1px 8px rgba(0,0,0,.15);z-index:100}.animate-down-enter-active[data-v-00aa88d9]{-webkit-animation:dropDownFadeInDown-data-v-00aa88d9 .3s cubic-bezier(.23,1,.32,1);animation:dropDownFadeInDown-data-v-00aa88d9 .3s cubic-bezier(.23,1,.32,1)}.animate-down-leave-active[data-v-00aa88d9]{-webkit-animation:dropDownFadeInDown-data-v-00aa88d9 .2s cubic-bezier(.23,1,.32,1) reverse;animation:dropDownFadeInDown-data-v-00aa88d9 .2s cubic-bezier(.23,1,.32,1) reverse}.animate-up-enter-active[data-v-00aa88d9]{-webkit-animation:dropDownFadeInUp-data-v-00aa88d9 .3s cubic-bezier(.23,1,.32,1);animation:dropDownFadeInUp-data-v-00aa88d9 .3s cubic-bezier(.23,1,.32,1)}.animate-up-leave-active[data-v-00aa88d9]{-webkit-animation:dropDownFadeInUp-data-v-00aa88d9 .15s cubic-bezier(.23,1,.32,1) reverse;animation:dropDownFadeInUp-data-v-00aa88d9 .15s cubic-bezier(.23,1,.32,1) reverse}@keyframes dropDownFadeInDown-data-v-00aa88d9{0%{opacity:0;transform:translate3d(0,-20px,0)}to{opacity:1;transform:translateZ(0)}}@keyframes dropDownFadeInUp-data-v-00aa88d9{0%{opacity:0;transform:translate3d(0,20px,0)}to{opacity:1;transform:translateZ(0)}}",""])},function(e,t){function n(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var r=o(i);return[n].concat(i.sources.map(function(e){return"/*# sourceURL="+i.sourceRoot+e+" */"})).concat([r]).join("\n")}return[n].join("\n")}function o(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var o=n(t,e);return t[2]?"@media "+t[2]+"{"+o+"}":o}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var o={},i=0;i<this.length;i++){var r=this[i][0];"number"==typeof r&&(o[r]=!0)}for(i=0;i<e.length;i++){var a=e[i];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){function o(e){for(var t=0;t<e.length;t++){var n=e[t],o=c[n.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](n.parts[i]);for(;i<n.parts.length;i++)o.parts.push(r(n.parts[i]));o.parts.length>n.parts.length&&(o.parts.length=n.parts.length)}else{for(var a=[],i=0;i<n.parts.length;i++)a.push(r(n.parts[i]));c[n.id]={id:n.id,refs:1,parts:a}}}}function i(){var e=document.createElement("style");return e.type="text/css",p.appendChild(e),e}function r(e){var t,n,o=document.querySelector("style["+w+'~="'+e.id+'"]');if(o){if(h)return v;o.parentNode.removeChild(o)}if(b){var r=f++;o=l||(l=i()),t=a.bind(null,o,r,!1),n=a.bind(null,o,r,!0)}else o=i(),t=s.bind(null,o),n=function(){o.parentNode.removeChild(o)};return t(e),function(o){if(o){if(o.css===e.css&&o.media===e.media&&o.sourceMap===e.sourceMap)return;t(e=o)}else n()}}function a(e,t,n,o){var i=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=g(t,i);else{var r=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(r,a[t]):e.appendChild(r)}}function s(e,t){var n=t.css,o=t.media,i=t.sourceMap;if(o&&e.setAttribute("media",o),m.ssrId&&e.setAttribute(w,t.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var d="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!d)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var u=n(7),c={},p=d&&(document.head||document.getElementsByTagName("head")[0]),l=null,f=0,h=!1,v=function(){},m=null,w="data-vue-ssr-id",b="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,n,i){h=n,m=i||{};var r=u(e,t);return o(r),function(t){for(var n=[],i=0;i<r.length;i++){var a=r[i],s=c[a.id];s.refs--,n.push(s)}t?(r=u(e,t),o(r)):r=[];for(var i=0;i<n.length;i++){var s=n[i];if(0===s.refs){for(var d=0;d<s.parts.length;d++)s.parts[d]();delete c[s.id]}}}};var g=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e,t){for(var n=[],o={},i=0;i<t.length;i++){var r=t[i],a=r[0],s=r[1],d=r[2],u=r[3],c={id:e+":"+i,css:s,media:d,sourceMap:u};o[a]?o[a].parts.push(c):n.push(o[a]={id:a,parts:[c]})}return n}},function(e,t){e.exports=function(e,t,n,o,i,r){var a,s=e=e||{},d=typeof e.default;"object"!==d&&"function"!==d||(a=e,s=e.default);var u="function"==typeof s?s.options:s;t&&(u.render=t.render,u.staticRenderFns=t.staticRenderFns,u._compiled=!0),n&&(u.functional=!0),i&&(u._scopeId=i);var c;if(r?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},u._ssrRegister=c):o&&(c=o),c){var p=u.functional,l=p?u.render:u.beforeCreate;p?(u._injectStyles=c,u.render=function(e,t){return c.call(t),l(e,t)}):u.beforeCreate=l?[].concat(l,c):[c]}return{esModule:a,exports:s,options:u}}},function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:e.animate}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],class:[e.dropdownClass,{"v-dropdown-embed":e.embed}],style:[e.styleSheet]},[e._t("default")],2)])},i=[],r={render:o,staticRenderFns:i};t.a=r}])});
//# sourceMappingURL=v-dropdown.js.map