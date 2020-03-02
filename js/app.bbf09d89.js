(function(e){function t(t){for(var i,r,a=t[0],l=t[1],d=t[2],m=0,u=[];m<a.length;m++)r=a[m],Object.prototype.hasOwnProperty.call(n,r)&&n[r]&&u.push(n[r][0]),n[r]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);c&&c(t);while(u.length)u.shift()();return o.push.apply(o,d||[]),s()}function s(){for(var e,t=0;t<o.length;t++){for(var s=o[t],i=!0,a=1;a<s.length;a++){var l=s[a];0!==n[l]&&(i=!1)}i&&(o.splice(t--,1),e=r(r.s=s[0]))}return e}var i={},n={app:0},o=[];function r(t){if(i[t])return i[t].exports;var s=i[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=i,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(s,i,function(t){return e[t]}.bind(null,i));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/browser-editor/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],l=a.push.bind(a);a.push=t,a=a.slice();for(var d=0;d<a.length;d++)t(a[d]);var c=l;o.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},"034f":function(e,t,s){"use strict";var i=s("85ec"),n=s.n(i);n.a},"0a7e":function(e,t,s){"use strict";var i=s("9250"),n=s.n(i);n.a},"0fae":function(e,t,s){},"1ebb":function(e,t,s){"use strict";var i=s("3303"),n=s.n(i);n.a},3303:function(e,t,s){},"56d7":function(e,t,s){"use strict";s.r(t);var i=s("2b0e"),n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("BrowserEditor")],1)},o=[],r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("Sidebar"),s("div",{staticClass:"content"},[e.menus.modes?s("div",{staticClass:"menu",attrs:{id:"modes-menu"}},[s("ul",e._l(e.allModes,(function(t,i){return s("li",{key:i},[s("a",{class:{active:e.isModeActive(t.name)},on:{click:function(s){return e.setMode(t)}}},[e._v(" "+e._s(t.name)+" "),s("div",{staticClass:"menu-icon"},[s("i",{class:t.icon})])])])})),0)]):e._e(),e.menus.themes?s("div",{staticClass:"menu",attrs:{id:"themes-menu"}},[s("ul",e._l(e.allThemes,(function(t,i){return s("li",{key:i},[s("a",{class:{active:e.isThemeActive(t)},on:{click:function(s){return e.setTheme(t)}}},[e._v(" "+e._s(t)+" "),s("div",{staticClass:"menu-icon"},[0<=i&&i<4?s("i",{staticClass:"fas fa-sun"}):e._e(),4<=i&&i<8?s("i",{staticClass:"fas fa-moon"}):e._e()])])])})),0)]):e._e(),e.menus.settings?s("div",{staticClass:"editor-wrapper"},[s("p",{staticClass:"editor-name",attrs:{id:"editor-default-settings-name"}},[e._v("Default settings")]),s("Editor",{attrs:{editorId:"editor-default-settings",editorName:"Default settings",initialValue:e.getDefaultSettingsString(),codeMirrorOptions:e.cmOptionsDefaultSettings}})],1):e._e(),e.menus.settings?s("div",{staticClass:"editor-wrapper"},[s("p",{staticClass:"editor-name",style:e.currentSettingsStyle,attrs:{id:"editor-current-settings-name"}},[e._v(" Current settings "),s("button",{staticClass:"editor-button",attrs:{type:"button"},on:{click:e.resetSettings}},[e._v("Reset")])]),s("Editor",{attrs:{editorId:"editor-current-settings",editorName:"Current Settings",codeMirrorOptions:e.cmOptionsCurrentSettings}})],1):e._e(),e.menus.help?s("Help"):e._e(),s("div",{staticClass:"editor-wrapper"},[s("Editor",{attrs:{codeMirrorOptions:e.cmOptionsMainEditor,editorId:"editor-main"}})],1)],1)],1)},a=[],l=s("56b3"),d=s.n(l),c=s("d952"),m=s("7329"),u=s.n(m),p=s("2f62"),h=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:e.editorId+"-wrapper"}},[s("textarea",{attrs:{id:e.editorId}})])},f=[],g=s("21a6"),b=s.n(g),v=s("4752"),w=s.n(v);const y=new i["a"];function S(e){let t={},s=Object.keys(e).sort();for(let i of s)t[i]=e[i];return t}var x={modes:[{fileExtension:"txt",name:"text",mode:"null",icon:"fas fa-font"},{fileExtension:"html",name:"html",mode:"text/html",icon:"fab fa-html5"},{fileExtension:"xml",name:"xml",mode:"xml",icon:"fas fa-code"},{fileExtension:"js",name:"javascript",mode:"javascript",icon:"fab fa-js-square"},{fileExtension:"ts",name:"typescript",mode:"application/typescript",icon:"fab fa-js-square"},{fileExtension:"json",name:"json",mode:"application/json",icon:"fab fa-js-square"},{fileExtension:"py",name:"python",mode:"python",icon:"fab fa-python"},{fileExtension:"sh",name:"shell",mode:"shell",icon:"fas fa-terminal"},{fileExtension:"sql",name:"sql",mode:"sql",icon:"fas fa-database"},{fileExtension:"yml",name:"yaml",mode:"yaml",icon:"fas fa-bars"},{fileExtension:"dockerfile",name:"dockerfile",mode:"dockerfile",icon:"fab fa-docker"}],menus:{settings:"showSettings",themes:"showThemes",modes:"showModes",help:"showHelp"},configurables:["electricChars","indentUnit","indentWithTabs","lineNumbers","lineSeparator","lineWrapping","showCursorWhenSelecting","smartIndent","tabSize","matchBrackets","autoCloseBrackets","styleActiveLine","foldGutter"],strings:{dragAndDropTooltip:"You can directly drag and drop files into the editor",minifyXmlAndJsonTooltip:"Minify (XML & JSON modes only)",prettyFormatXmlAndJsonTooltip:"Pretty formatting (XML & JSON modes only)"},themes:{light:["duotone-light","eclipse","elegant","neo"],dark:["darcula","dracula","hopscotch","monokai"]}};const O=w.a.pd;var E={name:"cm-editor",props:["codeMirrorOptions","editorId","editorName","initialValue"],data:function(){return{}},methods:{},mounted(){this.cmEditor=d.a.fromTextArea(document.getElementById(this.editorId),this.codeMirrorOptions),this.initialValue&&this.cmEditor.setValue(this.initialValue);let e=this.cmEditor.getWrapperElement();if(e.id=`${this.editorId}-element`,y.$on("set-theme",e=>{this.cmEditor.setOption("theme",e),localStorage.setItem("theme",e)}),"editor-current-settings"===this.editorId&&(y.$on("current-settings",e=>{let t={};for(let s of Object.keys(e))x.configurables.includes(s)&&d.a.defaults[s]!==e[s]&&(t[s]=e[s]);this.cmEditor.setValue(JSON.stringify(t,null,2))}),y.$emit("current-settings-editor-mounted"),this.cmEditor.on("change",()=>{try{let e=JSON.parse(this.cmEditor.getValue());y.$emit("new-settings-available",e)}catch(e){y.$emit("current-settings-invalid")}})),"editor-main"===this.editorId){this.editorSettings={};for(let s of Object.keys(this.cmEditor.options))x.configurables.includes(s)&&(this.editorSettings[s]=this.cmEditor.getOption(s));let e=localStorage.getItem("main-editor-settings");if(e){let t=JSON.parse(e);for(let e of Object.keys(t))t[e]!==this.editorSettings[e]&&(this.cmEditor.setOption(e,t[e]),this.editorSettings[e]=t[e])}y.$on("current-settings-editor-mounted",()=>{y.$emit("current-settings",this.editorSettings)}),y.$on("new-settings-available",e=>{let t=Object.assign({},this.editorSettings,e);for(let s of Object.keys(t))t[s]!==this.editorSettings[s]&&x.configurables.includes(s)&&(this.editorSettings[s]=t[s],this.cmEditor.setOption(s,t[s]),localStorage.setItem("main-editor-settings",JSON.stringify(S(this.editorSettings))))}),y.$on("set-mode",e=>{this.cmEditor.setOption("mode",e),localStorage.setItem("mode",e)}),y.$on("save-file",e=>{let t=new Blob([this.cmEditor.getValue()],{type:"text/plain;charset=utf-8"});b.a.saveAs(t,`file.${e.mode.fileExtension}`)}),y.$on("file-loaded",e=>{this.cmEditor.setValue(e)});let t=localStorage.getItem("main-editor-content");t&&this.cmEditor.setValue(t),y.$on("compress-contents",e=>{let t,s=this.cmEditor.getValue();try{"json"===e&&(t=JSON.stringify(JSON.parse(s))),"xml"===e&&(t=O.xmlmin(s)),this.cmEditor.setValue(t)}catch(i){new u.a({text:`Error minifying ${e}, please check your syntax!`,timeout:1200,type:"error",theme:"mint"}).show()}}),y.$on("expand-contents",e=>{let t,s=this.cmEditor.getValue();try{"json"===e&&(t=JSON.stringify(JSON.parse(s),null,2)),"xml"===e&&(t=O.xml(s)),this.cmEditor.setValue(t)}catch(i){new u.a({text:`Error formatting ${e}, please check your syntax!`,timeout:1200,type:"error",theme:"mint"}).show()}}),window.onbeforeunload=()=>{localStorage.setItem("main-editor-content",this.cmEditor.getValue())}}}},C=E,_=s("2877"),j=Object(_["a"])(C,h,f,!1,null,null,null),M=j.exports,k=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"help-content"},[s("div",{domProps:{innerHTML:e._s(e.readmeHtmlString)}}),s("footer",[s("a",{attrs:{href:e.packageInfo.repository.url}},[s("i",{staticClass:"fab fa-github"}),e._v(" v"+e._s(e.packageInfo.version)+" ")])])])},$=[],T=s("82a9"),I=s.n(T),N=s("9224"),A={data(){return{readmeHtmlString:I.a,packageInfo:N}}},J=A,D=(s("b8bc"),Object(_["a"])(J,k,$,!1,null,"6750e34e",null)),V=D.exports,F=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("nav",{staticClass:"sidebar",style:e.sidebarStyle},[s("ul",{directives:[{name:"show",rawName:"v-show",value:e.sidebar,expression:"sidebar"}]},[s("li",[s("a",{class:{active:e.menus.modes},on:{click:function(t){return e.toggleMenu("modes")}}},[e._m(0),s("div",[s("small",[e._v(e._s(e.mode.name))]),s("i",{directives:[{name:"show",rawName:"v-show",value:!e.menus.modes&&e.sidebar,expression:"!menus.modes && sidebar"}],staticClass:"fas fa-angle-right"}),s("i",{directives:[{name:"show",rawName:"v-show",value:e.menus.modes&&e.sidebar,expression:"menus.modes && sidebar"}],staticClass:"fas fa-angle-left"})])])]),s("li",[s("a",{class:{active:e.menus.themes},on:{click:function(t){return e.toggleMenu("themes")}}},[e._m(1),s("div",[s("small",{style:{width:"70px",textAlign:"right"}},[e._v(" "+e._s(e.theme)+" ")]),s("i",{directives:[{name:"show",rawName:"v-show",value:!e.menus.themes&&e.sidebar,expression:"!menus.themes && sidebar"}],staticClass:"fas fa-angle-right"}),s("i",{directives:[{name:"show",rawName:"v-show",value:e.menus.themes&&e.sidebar,expression:"menus.themes && sidebar"}],staticClass:"fas fa-angle-left"})])])]),s("li",[s("a",{class:{active:e.menus.settings},on:{click:function(t){return e.toggleMenu("settings")}}},[e._m(2),s("i",{directives:[{name:"show",rawName:"v-show",value:!e.menus.settings&&e.sidebar,expression:"!menus.settings && sidebar"}],staticClass:"fas fa-angle-right"}),s("i",{directives:[{name:"show",rawName:"v-show",value:e.menus.settings&&e.sidebar,expression:"menus.settings && sidebar"}],staticClass:"fas fa-angle-left"})])]),s("li",[s("a",{class:{active:e.menus.help},on:{click:function(t){return e.toggleMenu("help")}}},[e._m(3),s("i",{directives:[{name:"show",rawName:"v-show",value:!e.menus.help&&e.sidebar,expression:"!menus.help && sidebar"}],staticClass:"fas fa-angle-right"}),s("i",{directives:[{name:"show",rawName:"v-show",value:e.menus.help&&e.sidebar,expression:"menus.help && sidebar"}],staticClass:"fas fa-angle-left"})])]),s("li",[s("input",{staticClass:"file-loader-hidden",attrs:{type:"file",name:"file-loader",id:"file-loader"},on:{change:e.loadFile}}),e._m(4)]),s("li",[s("a",{on:{click:e.emitSaveFileEvent}},[e._m(5)])])]),s("div",{staticClass:"sidebar-bottom"},[s("div",{attrs:{id:"compress-contents-button"}},[s("button",{staticClass:"sidebar-bottom-button",attrs:{type:"button",disabled:!e.isModeXmlOrJson},on:{click:e.compressContents}},[s("i",{staticClass:"fas fa-compress-arrows-alt"})])]),s("div",{attrs:{id:"expand-contents-button"}},[s("button",{staticClass:"sidebar-bottom-button",attrs:{type:"button",disabled:!e.isModeXmlOrJson},on:{click:e.expandContents}},[s("i",{staticClass:"fas fa-expand-arrows-alt"})])]),s("button",{staticClass:"sidebar-bottom-button",attrs:{type:"button"},on:{click:e.toggleSidebar}},[e.sidebar?s("i",{staticClass:"fas fa-angle-left"}):e._e(),e.sidebar?e._e():s("i",{staticClass:"fas fa-angle-right"})])])])},P=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",[s("i",{staticClass:"fas fa-code"})]),e._v(" mode ")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",[s("i",{staticClass:"fas fa-palette"})]),e._v(" theme ")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",[s("i",{staticClass:"fas fa-cogs"})]),e._v(" settings ")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",[s("i",{staticClass:"fas fa-info"})]),e._v(" help ")])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("label",{staticClass:"file-loader-button menu-button",attrs:{for:"file-loader"}},[s("div",[s("div",[s("i",{staticClass:"fas fa-file"})]),e._v(" open file ")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",[s("i",{staticClass:"fas fa-save"})]),e._v(" save file ")])}],B={methods:{...Object(p["b"])(["toggleMenu","toggleSidebar"]),...Object(p["c"])({setStoreMode:"setMode",setStoreTheme:"setTheme"}),loadFile(e){let t=e.target.files[0];if(t){let e=new FileReader;e.onload=()=>{y.$emit("file-loaded",e.result)},e.readAsText(t)}},emitSaveFileEvent(){y.$emit("save-file",{mode:this.mode})},compressContents(){"xml"!==this.mode.name&&"json"!==this.mode.name||y.$emit("compress-contents",this.mode.name)},expandContents(){"xml"!==this.mode.name&&"json"!==this.mode.name||y.$emit("expand-contents",this.mode.name)}},computed:{...Object(p["d"])({menus:e=>e.browserEditor.menus,sidebar:e=>e.browserEditor.sidebar,mode:e=>e.browserEditor.mode,theme:e=>e.browserEditor.theme}),sidebarStyle(){return this.sidebar?{"margin-left":0}:{"margin-left":"-162px","flex-direction":"column-reverse"}},isModeXmlOrJson(){return"xml"===this.mode.name||"json"===this.mode.name}}},G=B,R=(s("0a7e"),Object(_["a"])(G,F,P,!1,null,"7a3e3484",null)),X=R.exports,q={name:"browser-editor",data:function(){return{allThemes:[...x.themes.light,...x.themes.dark],allModes:x.modes,cmOptionsMainEditor:null,currentSettingsInvalid:!1}},components:{Editor:M,Help:V,Sidebar:X},methods:{...Object(p["b"])(["toggleMenu"]),...Object(p["c"])({setStoreMode:"setMode",setStoreTheme:"setTheme"}),getDefaultSettingsString(){let e={};for(let t of Object.keys(d.a.defaults))x.configurables.includes(t)&&(e[t]=d.a.defaults[t]);return JSON.stringify(S(e),null,2)},isThemeActive(e){return this.theme===e},isModeActive(e){return this.mode.name===e},setTheme(e){this.setStoreTheme(e),y.$emit("set-theme",e),this.toggleMenu("themes")},setMode(e){this.setStoreMode(e),y.$emit("set-mode",e.mode),this.toggleMenu("modes")},resetSettings(){let e=Object.keys(this.cmOptionsMainEditor).filter(e=>{return x.configurables.includes(e)}),t={};for(let s of e)t[s]=cmOptionsMainEditor[s];y.$emit("current-settings",t),y.$emit("new-settings-available",t)}},computed:{...Object(p["d"])({menus:e=>e.browserEditor.menus,sidebar:e=>e.browserEditor.sidebar,mode:e=>e.browserEditor.mode,theme:e=>e.browserEditor.theme}),currentSettingsStyle(){return this.currentSettingsInvalid?{"background-color":"var(--color-fail)",color:"var(--color-light-primary)"}:{"background-color":"var(--color-success)"}},cmOptionsDefaultSettings(){return{mode:{name:"javascript",json:!0},lineNumbers:!0,styleActiveLine:!0,readOnly:!0,theme:this.theme}},cmOptionsCurrentSettings(){return{mode:{name:"javascript",json:!0},lineNumbers:!0,styleActiveLine:!0,extraKeys:{Tab:function(e){let t=Array(e.getOption("indentUnit")+1).join(" ");e.replaceSelection(t)}},theme:this.theme}}},created(){let e=localStorage.getItem("mode"),t=localStorage.getItem("theme"),s=localStorage.getItem("main-editor-settings"),i=localStorage.getItem("main-editor-content");(e||t||s||i)&&new u.a({text:"Previous settings and content have been restored.",timeout:1200,type:"warning",theme:"mint"}).show();let n=t||"darcula",o=x.modes[0];e&&(o=x.modes.find(t=>{return t.mode===e})),this.setStoreMode(o),this.setStoreTheme(n),this.cmOptionsMainEditor={mode:o.mode,lineNumbers:!0,styleActiveLine:!0,matchBrackets:!0,extraKeys:{Tab:function(e){let t=Array(e.getOption("indentUnit")+1).join(" ");e.replaceSelection(t)}},theme:n,autoCloseBrackets:!0,foldGutter:!0,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter"]},y.$on("current-settings-invalid",()=>{this.currentSettingsInvalid=!0}),y.$on("new-settings-available",()=>{this.currentSettingsInvalid=!1})},mounted(){Object(c["a"])(".file-loader-button",{content:x.strings.dragAndDropTooltip,placement:"right"}),Object(c["a"])("#compress-contents-button",{content:x.strings.minifyXmlAndJsonTooltip,placement:"right"}),Object(c["a"])("#expand-contents-button",{content:x.strings.prettyFormatXmlAndJsonTooltip,placement:"right"})}},L=q,H=(s("1ebb"),Object(_["a"])(L,r,a,!1,null,null,null)),U=H.exports,W={name:"app",components:{BrowserEditor:U}},K=W,z=(s("034f"),Object(_["a"])(K,n,o,!1,null,null,null)),Y=z.exports,Q={state:{menus:{modes:!1,themes:!1,settings:!1,help:!1},sidebar:!0,mode:x.modes[0],theme:"darcula"},getters:{},actions:{toggleMenu({commit:e},t){e("toggleMenu",{menuSetting:t});for(let s of["modes","themes","settings","help"])s!==t&&e("toggleMenu",{menuSetting:s,showMenu:!1})},hideAllMenus({commit:e}){for(let t of["modes","themes","settings","help"])e("toggleMenu",{menuSetting:t,showMenu:!1})},toggleSidebar({commit:e,dispatch:t}){e("toggleSidebar"),t("hideAllMenus")}},mutations:{toggleMenu(e,{menuSetting:t,showMenu:s}){let i=s;null==s&&(i=!e.menus[t]),e.menus={...e.menus,[t]:i}},toggleSidebar(e){e.sidebar=!e.sidebar},setMode(e,t){e.mode=t},setTheme(e,t){e.theme=t}}};i["a"].use(p["a"]);var Z=new p["a"].Store({modules:{browserEditor:Q}});s("ce52"),s("bccd"),s("d0c5"),s("532d"),s("47ac"),s("f9d4"),s("db91"),s("02f0"),s("ffda"),s("d5e0"),s("ced0"),s("10b2"),s("31c5"),s("8c33"),s("4895"),s("cbc8"),s("697e"),s("aedd"),s("a2c1"),s("8d70"),s("164b"),s("2aed"),s("b933"),s("0b6c"),s("9c7b"),s("715d"),s("18fe"),s("d72f"),s("5936"),s("a7be"),s("b6fc"),s("01cb"),s("ac1e"),s("d5db"),s("7ba3"),s("0109"),s("0176"),s("7a7a"),s("52df"),s("e625"),s("478c");i["a"].config.productionTip=!1,new i["a"]({render:e=>e(Y),store:Z}).$mount("#app")},"82a9":function(e,t){e.exports='<h1 id="browser-editor">browser-editor</h1>\n<p><a href="https://travis-ci.org/weijunyu/browser-editor"><img src="https://travis-ci.org/weijunyu/browser-editor.svg?branch=master" alt="Build Status"></a></p>\n<p>Purely in-browser text editor, built with <a href="https://codemirror.net/">CodeMirror</a> and <a href="https://vuejs.org">Vue.js</a>.</p>\n<p>Can be packed into 1 single html file (plus corresponding fonts) and run locally on a modern browser.</p>\n<p>For air-gapped environments without easy access to a text editor and doesn&#39;t play nice with .js files.</p>\n<h2 id="usage">Usage</h2>\n<h3 id="modes">Modes</h3>\n<p>Language modes provide syntax highlighting.</p>\n<h3 id="themes">Themes</h3>\n<p>4 Dark and light themes are provided. Defaults to <code>darcula</code>.</p>\n<h3 id="settings">Settings</h3>\n<p>Edit the JSON object under &quot;Current settings&quot;. Some common settings:</p>\n<ul>\n<li>indentUnit: how many spaces an indent takes up. Also controls the number of spaces added when pressing <code>tab</code>. Defaults to <code>2</code>.</li>\n<li>lineNumbers: shows or hide line numbers. Defaults to <code>true</code>.</li>\n<li>lineWrapping: scroll or wrap for long lines. Defaults to <code>false</code> (scroll).</li>\n<li>autoCloseBrackets: add closing brackets automatically. Defaults to <code>false</code>.</li>\n<li>matchBrackets: highlights matching brackets. Defaults to <code>true</code>.</li>\n</ul>\n<h3 id="search-regex-supported">Search (regex supported)</h3>\n<p><code>Ctrl-F / Cmd-F</code>: Start searching</p>\n<p><code>Ctrl-G / Cmd-G</code>: Find next</p>\n<p><code>Shift-Ctrl-G / Shift-Cmd-G</code>: Find previous</p>\n<p><code>Shift-Ctrl-F / Cmd-Option-F</code>: Replace</p>\n<p><code>Shift-Ctrl-R / Shift-Cmd-Option-F</code>: Replace all</p>\n<h2 id="developing">Developing</h2>\n<h3 id="project-setup">Project setup</h3>\n<pre><code>$ npm install</code></pre><h3 id="compiles-and-hot-reloads-for-development">Compiles and hot-reloads for development</h3>\n<pre><code>$ npm run serve</code></pre><h3 id="compiles-and-minifies-for-production">Compiles and minifies for production</h3>\n<p>The generated production files will be located under <code>dist/</code>.</p>\n<pre><code>$ npm run build</code></pre><h3 id="build-and-run-on-docker">Build and run on Docker</h3>\n<pre><code>$ npm run build\n$ docker build --tag ${IMAGE_TAG} .\n$ docker run --name ${CONTAINER_NAME} -d [-p ${HOST_PORT}:${CONTAINER_PORT}] ${IMAGE_TAG}</code></pre>'},"85ec":function(e,t,s){},9224:function(e){e.exports=JSON.parse('{"name":"browser-editor","version":"1.4.4","description":"In-browser text editor","homepage":"https://github.com/weijunyu/browser-editor","repository":{"type":"git","url":"https://github.com/weijunyu/browser-editor.git"},"license":"MIT","scripts":{"build":"vue-cli-service build","lint":"vue-cli-service lint","serve":"vue-cli-service serve"},"browserslist":["> 1%","last 2 versions","not ie <= 8"],"eslintConfig":{"env":{"node":true},"extends":["plugin:vue/recommended"],"parserOptions":{"parser":"babel-eslint"},"root":true,"rules":{}},"devDependencies":{"@fortawesome/fontawesome-free":"^5.12.1","@vue/cli-service":"^4.1.1","babel-eslint":"^10.1.0","codemirror":"^5.52.0","eslint":"^6.7.2","eslint-plugin-vue":"^6.0.1","file-saver":"^2.0.2","html-loader":"^0.5.5","markdown-loader":"^5.1.0","noty":"^3.2.0-beta","pretty-data":"^0.40.0","tippy.js":"^5.1.2","vue":"^2.6.11","vue-template-compiler":"^2.6.11","vuex":"^3.1.2"},"postcss":{"plugins":{"autoprefixer":{}}}}')},9250:function(e,t,s){},b8bc:function(e,t,s){"use strict";var i=s("0fae"),n=s.n(i);n.a},ce52:function(e,t,s){}});
//# sourceMappingURL=app.bbf09d89.js.map