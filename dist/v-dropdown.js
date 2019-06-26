!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("vDropdown",[],t):"object"==typeof exports?exports.vDropdown=t():e.vDropdown=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="dist/",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1);n.d(t,"Dropdown",function(){return o.a}),t.default=o.a},function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var i=n(2);n.n(i);t.a={name:"v-dropdown",props:{align:{type:String,default:"left"},embed:{type:Boolean,default:!1},rightClick:{type:Boolean,default:!1},toggle:{type:Boolean,default:!0},manual:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},animated:{type:[String,Boolean],default:!0},width:Number,fullWidth:{type:Boolean,default:!1}},data:function(){return{show:!1,styleSheet:{top:"",left:""},dropdownClass:"v-dropdown-container",dropUp:!1,x:null,y:null}},computed:{animate:function(){return"string"==typeof this.animated?this.animated:!this.embed&&this.animated?this.dropUp?"animate-up":"animate-down":""}},render:function(e){var t,n=this,i=[];return this.$slots.caller&&Object.keys(this.$slots.caller).length&&!this.embed&&i.push(this.$slots.caller),i.push(e("transition",{props:{name:this.animate}},[e("div",{class:(t={},o(t,this.dropdownClass,!0),o(t,"v-dropdown-embed",this.embed),t),style:this.styleSheet,directives:[{name:"show",value:this.show}],ref:"dropdown",on:{mousedown:function(e){e.stopPropagation()}}},this.$slots.default)])),e("div",{class:{"v-dropdown-caller":!0,"v-dropdown-caller--full-width":this.fullWidth},on:{click:function(e){n.embed||n.rightClick||n.manual||(e.stopPropagation(),n.visible())},contextmenu:function(e){if(!n.embed&&!n.manual&&n.rightClick){e.stopPropagation(),e.preventDefault();var t=n.scrollInfo();n.x=e.pageX||e.clientX+t.x,n.y=e.pageY||e.clientY+t.y,n.visible()}}}},i)},methods:{visible:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.disabled||(!this.show||this.toggle||e)&&(this.show||this.embed||!this.$slots.caller||this.adjust(),this.show=!this.show,this.$emit("show",this.show))},whole:function(e){var t=this;if(this.show){var n=-1!==this.eventPath(e).findIndex(function(e){return e===t.$el});if(n&&!this.toggle&&!this.rightClick)return;(!n||n&&this.rightClick)&&this.visible(!0)}},adjust:function(){var e=this.$el.getBoundingClientRect(),t=null;this.show?t=this.$refs.dropdown.getBoundingClientRect():(this.$refs.dropdown.style.visibility="hidden",this.$refs.dropdown.style.display="inline-block",t=this.$refs.dropdown.getBoundingClientRect(),this.$refs.dropdown.style.visibility="visible",this.$refs.dropdown.style.display="none"),this.adjustTop(e,t),this.styleSheet.left=this.adjustLeft(e,t)+"px"},adjustTop:function(e,t){var n=window.pageYOffset,o=document.documentElement.clientHeight,i=this.rightClick?this.y:e.top+n,r=this.rightClick?this.y:e.top+e.height+5+n,s=!1,a=!1;r+t.height>n+o&&(s=!0),i-5-t.height<0&&(a=!0),!a&&s&&(r=i-5-t.height,this.dropUp=!0),this.styleSheet.top=r+"px"},adjustLeft:function(e,t){var n=window.pageXOffset,o=document.documentElement.clientWidth,i=this.rightClick?0:e.width,r=this.rightClick?this.x:e.left+n,s=r+i/2-t.width/2,a=r+i-t.width;switch(this.align){case"left":return r+t.width>n+o?a:r;case"center":return s+t.width>n+o?a:a<n?r:s;case"right":return a<n?r:a}},scrollInfo:function(){var e=void 0!==window.pageXOffset,t="CSS1Compat"===(document.compatMode||"");return{x:e?window.pageXOffset:t?document.documentElement.scrollLeft:document.body.scrollLeft,y:e?window.pageYOffset:t?document.documentElement.scrollTop:document.body.scrollTop}},eventPath:function(e){if("composedPath"in e)return e.composedPath();if("path"in e)return e.path;for(var t=[],n=e.target;n;)t.push(n),n=n.parentElement;return-1===t.indexOf(window)&&-1===t.indexOf(document)&&t.push(document),-1===t.indexOf(window)&&t.push(window),t}},mounted:function(){this.width&&(this.styleSheet.width=this.width+"px"),this.embed?this.visible():(document.body.appendChild(this.$refs.dropdown),document.body.addEventListener("mousedown",this.whole))},beforeDestroy:function(){this.embed||(document.body.removeEventListener("mousedown",this.whole),this.$refs.dropdown.remove())},destroyed:function(){this.embed||this.$el.remove()}}},function(e,t,n){var o=n(3);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n(5)("3410ea6a",o,!0,{})},function(e,t,n){t=e.exports=n(4)(!1),t.push([e.i,"div.v-dropdown-caller{display:inline-block}div.v-dropdown-caller.v-dropdown-caller--full-width{display:block}div.v-dropdown-container{border:1px solid #d6d7d7;margin:0;padding:0;display:inline-block;position:absolute;top:0;left:0;box-sizing:border-box;background-color:#fff;-webkit-border-radius:2px;border-radius:2px;-webkit-box-shadow:0 3px 12px rgba(0,0,0,.2);-moz-box-shadow:0 3px 12px rgba(0,0,0,.2);box-shadow:0 3px 12px rgba(0,0,0,.2);z-index:3000}div.v-dropdown-container.v-dropdown-embed{position:relative;-webkit-box-shadow:0 1px 6px rgba(0,0,0,.12);-moz-box-shadow:0 1px 6px rgba(0,0,0,.12);box-shadow:0 1px 6px rgba(0,0,0,.12);z-index:100}.animate-down-enter,.animate-down-leave-to{opacity:0;-webkit-transform:translateY(-5px);transform:translateY(-5px)}.animate-up-enter,.animate-up-leave-to{opacity:0;-webkit-transform:translateY(5px);transform:translateY(5px)}.animate-down-enter-active,.animate-down-leave-active,.animate-up-enter-active,.animate-up-leave-active{-webkit-transition:opacity .1s,-webkit-transform .1s;transition:opacity .1s,transform .1s}.animate-down-enter-to,.animate-down-leave,.animate-up-enter-to,.animate-up-leave{opacity:1;transform:none;-webkit-transform:none}",""])},function(e,t){function n(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var r=o(i);return[n].concat(i.sources.map(function(e){return"/*# sourceURL="+i.sourceRoot+e+" */"})).concat([r]).join("\n")}return[n].join("\n")}function o(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var o=n(t,e);return t[2]?"@media "+t[2]+"{"+o+"}":o}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var o={},i=0;i<this.length;i++){var r=this[i][0];"number"==typeof r&&(o[r]=!0)}for(i=0;i<e.length;i++){var s=e[i];"number"==typeof s[0]&&o[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),t.push(s))}},t}},function(e,t,n){function o(e){for(var t=0;t<e.length;t++){var n=e[t],o=u[n.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](n.parts[i]);for(;i<n.parts.length;i++)o.parts.push(r(n.parts[i]));o.parts.length>n.parts.length&&(o.parts.length=n.parts.length)}else{for(var s=[],i=0;i<n.parts.length;i++)s.push(r(n.parts[i]));u[n.id]={id:n.id,refs:1,parts:s}}}}function i(){var e=document.createElement("style");return e.type="text/css",p.appendChild(e),e}function r(e){var t,n,o=document.querySelector("style["+w+'~="'+e.id+'"]');if(o){if(h)return m;o.parentNode.removeChild(o)}if(b){var r=f++;o=c||(c=i()),t=s.bind(null,o,r,!1),n=s.bind(null,o,r,!0)}else o=i(),t=a.bind(null,o),n=function(){o.parentNode.removeChild(o)};return t(e),function(o){if(o){if(o.css===e.css&&o.media===e.media&&o.sourceMap===e.sourceMap)return;t(e=o)}else n()}}function s(e,t,n,o){var i=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=g(t,i);else{var r=document.createTextNode(i),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(r,s[t]):e.appendChild(r)}}function a(e,t){var n=t.css,o=t.media,i=t.sourceMap;if(o&&e.setAttribute("media",o),v.ssrId&&e.setAttribute(w,t.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var d="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!d)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var l=n(6),u={},p=d&&(document.head||document.getElementsByTagName("head")[0]),c=null,f=0,h=!1,m=function(){},v=null,w="data-vue-ssr-id",b="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,n,i){h=n,v=i||{};var r=l(e,t);return o(r),function(t){for(var n=[],i=0;i<r.length;i++){var s=r[i],a=u[s.id];a.refs--,n.push(a)}t?(r=l(e,t),o(r)):r=[];for(var i=0;i<n.length;i++){var a=n[i];if(0===a.refs){for(var d=0;d<a.parts.length;d++)a.parts[d]();delete u[a.id]}}}};var g=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e,t){for(var n=[],o={},i=0;i<t.length;i++){var r=t[i],s=r[0],a=r[1],d=r[2],l=r[3],u={id:e+":"+i,css:a,media:d,sourceMap:l};o[s]?o[s].parts.push(u):n.push(o[s]={id:s,parts:[u]})}return n}}])});
//# sourceMappingURL=v-dropdown.js.map