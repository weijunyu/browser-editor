(function(e){function t(t){for(var i,a,r=t[0],l=t[1],d=t[2],u=0,m=[];u<r.length;u++)a=r[u],s[a]&&m.push(s[a][0]),s[a]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);c&&c(t);while(m.length)m.shift()();return o.push.apply(o,d||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],i=!0,r=1;r<n.length;r++){var l=n[r];0!==s[l]&&(i=!1)}i&&(o.splice(t--,1),e=a(a.s=n[0]))}return e}var i={},s={app:0},o=[];function a(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=i,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=t,r=r.slice();for(var d=0;d<r.length;d++)t(r[d]);var c=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var i=n("64a9"),s=n.n(i);s.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var i=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("nav",{staticClass:"sidebar",style:e.sidebarStyle},[n("ul",{directives:[{name:"show",rawName:"v-show",value:e.showSidebar,expression:"showSidebar"}]},[n("li",[n("a",{class:{active:e.isMenuActive("modes")},on:{click:function(t){e.showMenu("modes")}}},[e._m(0),n("div",[n("small",[e._v(e._s(e.mode.name))]),e._v(" \n            "),n("i",{directives:[{name:"show",rawName:"v-show",value:!e.showModes&&e.showSidebar,expression:"!showModes && showSidebar"}],staticClass:"fas fa-angle-right"}),n("i",{directives:[{name:"show",rawName:"v-show",value:e.showModes&&e.showSidebar,expression:"showModes && showSidebar"}],staticClass:"fas fa-angle-left"})])])]),n("li",[n("a",{class:{active:e.isMenuActive("themes")},on:{click:function(t){e.showMenu("themes")}}},[e._m(1),n("div",[n("small",[e._v(e._s(e.theme))]),e._v(" \n            "),n("i",{directives:[{name:"show",rawName:"v-show",value:!e.showThemes&&e.showSidebar,expression:"!showThemes && showSidebar"}],staticClass:"fas fa-angle-right"}),n("i",{directives:[{name:"show",rawName:"v-show",value:e.showThemes&&e.showSidebar,expression:"showThemes && showSidebar"}],staticClass:"fas fa-angle-left"})])])]),n("li",[n("a",{class:{active:e.isMenuActive("settings")},on:{click:function(t){e.showMenu("settings")}}},[e._m(2),n("i",{directives:[{name:"show",rawName:"v-show",value:!e.showSettings&&e.showSidebar,expression:"!showSettings && showSidebar"}],staticClass:"fas fa-angle-right"}),n("i",{directives:[{name:"show",rawName:"v-show",value:e.showSettings&&e.showSidebar,expression:"showSettings && showSidebar"}],staticClass:"fas fa-angle-left"})])]),n("li",[n("a",{class:{active:e.isMenuActive("help")},on:{click:function(t){e.showMenu("help")}}},[e._m(3),n("i",{directives:[{name:"show",rawName:"v-show",value:!e.showHelp&&e.showSidebar,expression:"!showHelp && showSidebar"}],staticClass:"fas fa-angle-right"}),n("i",{directives:[{name:"show",rawName:"v-show",value:e.showHelp&&e.showSidebar,expression:"showHelp && showSidebar"}],staticClass:"fas fa-angle-left"})])]),n("li",[n("input",{staticClass:"file-loader-hidden",attrs:{type:"file",name:"file-loader",id:"file-loader"},on:{change:e.loadFile}}),e._m(4)]),n("li",[n("a",{on:{click:e.emitSaveFileEvent}},[e._m(5)])])]),n("div",{staticClass:"sidebar-bottom"},[n("div",{attrs:{id:"compress-contents-button"}},[n("button",{staticClass:"sidebar-bottom-button",attrs:{type:"button",disabled:!e.isModeXmlOrJson},on:{click:e.compressContents}},[n("i",{staticClass:"fas fa-compress-arrows-alt"})])]),n("div",{attrs:{id:"expand-contents-button"}},[n("button",{staticClass:"sidebar-bottom-button",attrs:{type:"button",disabled:!e.isModeXmlOrJson},on:{click:e.expandContents}},[n("i",{staticClass:"fas fa-expand-arrows-alt"})])]),n("button",{staticClass:"sidebar-bottom-button",attrs:{type:"button"},on:{click:e.toggleSidebar}},[e.showSidebar?n("i",{staticClass:"fas fa-angle-left"}):e._e(),e.showSidebar?e._e():n("i",{staticClass:"fas fa-angle-right"})])])]),n("div",{staticClass:"content"},[e.showModes?n("div",{staticClass:"menu",attrs:{id:"modes-menu"}},[n("ul",e._l(e.allModes,function(t,i){return n("li",{key:i},[n("a",{class:{active:e.isModeActive(t.name)},on:{click:function(n){e.setMode(t)}}},[e._v("\n            "+e._s(t.name)+"\n            "),n("div",{staticClass:"menu-icon"},[n("i",{class:t.icon})])])])}),0)]):e._e(),e.showThemes?n("div",{staticClass:"menu",attrs:{id:"themes-menu"}},[n("ul",e._l(e.allThemes,function(t,i){return n("li",{key:i},[n("a",{class:{active:e.isThemeActive(t)},on:{click:function(n){e.setTheme(t)}}},[e._v("\n            "+e._s(t)+"\n            "),n("div",{staticClass:"menu-icon"},[0<=i&&i<4?n("i",{staticClass:"fas fa-sun"}):e._e(),4<=i&&i<8?n("i",{staticClass:"fas fa-moon"}):e._e()])])])}),0)]):e._e(),e.showSettings?n("div",{staticClass:"editor-wrapper"},[n("p",{staticClass:"editor-name",attrs:{id:"editor-default-settings-name"}},[e._v("Default settings")]),n("Editor",{attrs:{editorId:"editor-default-settings",editorName:"Default settings",initialValue:e.getDefaultSettingsString(),codeMirrorOptions:e.cmOptionsDefaultSettings}})],1):e._e(),e.showSettings?n("div",{staticClass:"editor-wrapper"},[n("p",{staticClass:"editor-name",style:e.currentSettingsStyle,attrs:{id:"editor-current-settings-name"}},[e._v("Current settings")]),n("Editor",{attrs:{editorId:"editor-current-settings",editorName:"Current Settings",codeMirrorOptions:e.cmOptionsCurrentSettings}})],1):e._e(),e.showHelp?n("div",{staticClass:"help-content"},[n("div",{domProps:{innerHTML:e._s(e.readmeHtmlString)}}),n("footer",[n("a",{attrs:{href:e.packageInfo.repository.url}},[n("i",{staticClass:"fab fa-github"}),e._v("\n          v"+e._s(e.packageInfo.version)+"\n        ")])])]):e._e(),n("div",{staticClass:"editor-wrapper"},[n("Editor",{attrs:{codeMirrorOptions:e.cmOptionsMainEditor,editorId:"editor-main"}})],1)])])},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",[n("i",{staticClass:"fas fa-code"})]),e._v("\n             mode\n          ")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",[n("i",{staticClass:"fas fa-palette"})]),e._v(" theme\n          ")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",[n("i",{staticClass:"fas fa-cogs"})]),e._v(" settings\n          ")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",[n("i",{staticClass:"fas fa-info"})]),e._v(" help\n          ")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",{staticClass:"file-loader-button menu-button",attrs:{for:"file-loader"}},[n("div",[n("div",[n("i",{staticClass:"fas fa-file"})]),e._v(" open file\n          ")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",[n("i",{staticClass:"fas fa-save"})]),e._v(" save file\n          ")])}],a=(n("7f7f"),n("5d73")),r=n.n(a),l=(n("6762"),n("2fdb"),n("a4bb")),d=n.n(l),c=n("f499"),u=n.n(c),m=n("75fc"),h=(n("7514"),n("56b3")),f=n.n(h),p=n("432d"),v=n("7329"),g=n.n(v),b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:e.editorId+"-wrapper"}},[n("textarea",{attrs:{id:e.editorId}})])},w=[],S=n("5176"),y=n.n(S),x=n("21a6"),C=n.n(x),_=n("4752"),E=n.n(_),O=(n("55dd"),new i["a"]);function M(e){var t={},n=d()(e).sort(),i=!0,s=!1,o=void 0;try{for(var a,l=r()(n);!(i=(a=l.next()).done);i=!0){var c=a.value;t[c]=e[c]}}catch(u){s=!0,o=u}finally{try{i||null==l.return||l.return()}finally{if(s)throw o}}return t}var k={modes:[{fileExtension:"txt",name:"text",mode:"null",icon:"fas fa-font"},{fileExtension:"html",name:"html",mode:"text/html",icon:"fab fa-html5"},{fileExtension:"xml",name:"xml",mode:"xml",icon:"fas fa-code"},{fileExtension:"js",name:"javascript",mode:"javascript",icon:"fab fa-js-square"},{fileExtension:"ts",name:"typescript",mode:"application/typescript",icon:"fab fa-js-square"},{fileExtension:"json",name:"json",mode:"application/json",icon:"fab fa-js-square"},{fileExtension:"py",name:"python",mode:"python",icon:"fab fa-python"},{fileExtension:"sh",name:"shell",mode:"shell",icon:"fas fa-terminal"},{fileExtension:"sql",name:"sql",mode:"sql",icon:"fas fa-database"},{fileExtension:"yml",name:"yaml",mode:"yaml",icon:"fas fa-bars"},{fileExtension:"dockerfile",name:"dockerfile",mode:"dockerfile",icon:"fab fa-docker"}],menus:{settings:"showSettings",themes:"showThemes",modes:"showModes",help:"showHelp"},configurables:["electricChars","indentUnit","indentWithTabs","lineNumbers","lineSeparator","lineWrapping","showCursorWhenSelecting","smartIndent","tabSize","matchBrackets","autoCloseBrackets","styleActiveLine","foldGutter"],strings:{dragAndDropTooltip:"You can directly drag and drop files into the editor",minifyXmlAndJsonTooltip:"Minify (XML & JSON modes only)",prettyFormatXmlAndJsonTooltip:"Pretty formatting (XML & JSON modes only)"},themes:{light:["duotone-light","eclipse","elegant","neo"],dark:["darcula","dracula","hopscotch","monokai"]}},j=E.a.pd,$={name:"editor",props:["codeMirrorOptions","editorId","editorName","initialValue"],data:function(){return{}},methods:{},mounted:function(){var e=this;this.cmEditor=f.a.fromTextArea(document.getElementById(this.editorId),this.codeMirrorOptions),this.initialValue&&this.cmEditor.setValue(this.initialValue);var t=this.cmEditor.getWrapperElement();if(t.id="".concat(this.editorId,"-element"),O.$on("set-theme",function(t){e.cmEditor.setOption("theme",t),localStorage.setItem("theme",t)}),"editor-current-settings"===this.editorId&&(O.$on("current-settings",function(t){for(var n={},i=d()(t),s=0;s<i.length;s++){var o=i[s];k.configurables.includes(o)&&f.a.defaults[o]!==t[o]&&(n[o]=t[o])}e.cmEditor.setValue(u()(n,null,2))}),O.$emit("current-settings-editor-mounted"),this.cmEditor.on("change",function(){try{var t=JSON.parse(e.cmEditor.getValue());O.$emit("new-settings-available",t)}catch(n){O.$emit("current-settings-invalid")}})),"editor-main"===this.editorId){this.editorSettings={};for(var n=d()(this.cmEditor.options),i=0;i<n.length;i++){var s=n[i];k.configurables.includes(s)&&(this.editorSettings[s]=this.cmEditor.getOption(s))}var o=localStorage.getItem("main-editor-settings");if(o)for(var a=JSON.parse(o),r=d()(a),l=0;l<r.length;l++){var c=r[l];a[c]!==this.editorSettings[c]&&(this.cmEditor.setOption(c,a[c]),this.editorSettings[c]=a[c])}O.$on("current-settings-editor-mounted",function(){O.$emit("current-settings",e.editorSettings)}),O.$on("new-settings-available",function(t){for(var n=y()({},e.editorSettings,t),i=d()(n),s=0;s<i.length;s++){var o=i[s];n[o]!==e.editorSettings[o]&&k.configurables.includes(o)&&(e.editorSettings[o]=n[o],e.cmEditor.setOption(o,n[o]),localStorage.setItem("main-editor-settings",u()(M(e.editorSettings))))}}),O.$on("set-mode",function(t){e.cmEditor.setOption("mode",t),localStorage.setItem("mode",t)}),O.$on("save-file",function(t){var n=new Blob([e.cmEditor.getValue()],{type:"text/plain;charset=utf-8"});C.a.saveAs(n,"file.".concat(t.mode.fileExtension))}),O.$on("file-loaded",function(t){e.cmEditor.setValue(t)});var m=localStorage.getItem("main-editor-content");m&&this.cmEditor.setValue(m),O.$on("compress-contents",function(t){var n,i=e.cmEditor.getValue();try{"json"===t&&(n=u()(JSON.parse(i))),"xml"===t&&(n=j.xmlmin(i)),e.cmEditor.setValue(n)}catch(s){new g.a({text:"Error minifying ".concat(t,", please check your syntax!"),timeout:1200,type:"error",theme:"mint"}).show()}}),O.$on("expand-contents",function(t){var n,i=e.cmEditor.getValue();try{"json"===t&&(n=u()(JSON.parse(i),null,2)),"xml"===t&&(n=j.xml(i)),e.cmEditor.setValue(n)}catch(s){new g.a({text:"Error formatting ".concat(t,", please check your syntax!"),timeout:1200,type:"error",theme:"mint"}).show()}}),window.onbeforeunload=function(){localStorage.setItem("main-editor-content",e.cmEditor.getValue())}}}},T=$,I=n("2877"),A=Object(I["a"])(T,b,w,!1,null,null,null);A.options.__file="Editor.vue";var N=A.exports,D=n("9224"),J=n("82a9"),V=n.n(J),F=localStorage.getItem("mode"),P=localStorage.getItem("theme"),H=localStorage.getItem("main-editor-settings"),G=localStorage.getItem("main-editor-content");(F||P||H||G)&&new g.a({text:"Previous settings and content have been restored.",timeout:1200,type:"warning",theme:"mint"}).show();var B=P||"darcula",X=k.modes[0];F&&(X=k.modes.find(function(e){return e.mode===F}));var q={mode:X.mode,lineNumbers:!0,styleActiveLine:!0,matchBrackets:!0,extraKeys:{Tab:function(e){var t=Array(e.getOption("indentUnit")+1).join(" ");e.replaceSelection(t)}},theme:B,autoCloseBrackets:!0,foldGutter:!0,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter"]},L={name:"app",data:function(){return{allThemes:[].concat(Object(m["a"])(k.themes.light),Object(m["a"])(k.themes.dark)),allModes:k.modes,cmOptionsMainEditor:q,currentSettingsInvalid:!1,mode:X,readmeHtmlString:V.a,showHelp:!1,showModes:!1,showSettings:!1,showSidebar:!0,showThemes:!1,packageInfo:D,theme:B}},components:{Editor:N},methods:{loadFile:function(e){var t=e.target.files[0];if(t){var n=new FileReader;n.onload=function(){O.$emit("file-loaded",n.result)},n.readAsText(t)}},getDefaultSettingsString:function(){for(var e={},t=d()(f.a.defaults),n=0;n<t.length;n++){var i=t[n];k.configurables.includes(i)&&(e[i]=f.a.defaults[i])}return u()(M(e),null,2)},toggleSidebar:function(){this.showSidebar=!this.showSidebar,this.showSidebar||(this.showModes=!1,this.showThemes=!1,this.showSettings=!1,this.showHelp=!1)},showMenu:function(e){var t=k.menus;this[t[e]]=!this[t[e]];var n=d()(t),i=!0,s=!1,o=void 0;try{for(var a,l=r()(n);!(i=(a=l.next()).done);i=!0){var c=a.value;e!==c&&(this[t[c]]=!1)}}catch(u){s=!0,o=u}finally{try{i||null==l.return||l.return()}finally{if(s)throw o}}},isMenuActive:function(e){return this[k.menus[e]]},isThemeActive:function(e){return this.theme===e},isModeActive:function(e){return this.mode.name===e},setTheme:function(e){this.theme=e,O.$emit("set-theme",e),this.showThemes=!1},setMode:function(e){this.mode=e,O.$emit("set-mode",e.mode),this.showModes=!1},emitSaveFileEvent:function(){O.$emit("save-file",{mode:this.mode})},compressContents:function(){"xml"!==this.mode.name&&"json"!==this.mode.name||O.$emit("compress-contents",this.mode.name)},expandContents:function(){"xml"!==this.mode.name&&"json"!==this.mode.name||O.$emit("expand-contents",this.mode.name)}},computed:{sidebarStyle:function(){return this.showSidebar?{"margin-left":0}:{"margin-left":"-162px","flex-direction":"column-reverse"}},currentSettingsStyle:function(){return this.currentSettingsInvalid?{"background-color":"var(--color-fail)",color:"var(--color-light-primary)"}:{"background-color":"var(--color-success)"}},cmOptionsDefaultSettings:function(){return{mode:{name:"javascript",json:!0},lineNumbers:!0,styleActiveLine:!0,readOnly:!0,theme:this.theme}},cmOptionsCurrentSettings:function(){return{mode:{name:"javascript",json:!0},lineNumbers:!0,styleActiveLine:!0,extraKeys:{Tab:function(e){var t=Array(e.getOption("indentUnit")+1).join(" ");e.replaceSelection(t)}},theme:this.theme}},isModeXmlOrJson:function(){return"xml"===this.mode.name||"json"===this.mode.name}},created:function(){var e=this;O.$on("current-settings-invalid",function(){e.currentSettingsInvalid=!0}),O.$on("new-settings-available",function(){e.currentSettingsInvalid=!1})},mounted:function(){Object(p["a"])(".file-loader-button",{content:k.strings.dragAndDropTooltip,placement:"right"}),Object(p["a"])("#compress-contents-button",{content:k.strings.minifyXmlAndJsonTooltip,placement:"right"}),Object(p["a"])("#expand-contents-button",{content:k.strings.prettyFormatXmlAndJsonTooltip,placement:"right"})}},R=L,U=(n("034f"),Object(I["a"])(R,s,o,!1,null,null,null));U.options.__file="App.vue";var W=U.exports;n("ce52"),n("bccd"),n("d0c5"),n("532d"),n("52df"),n("47ac"),n("f9d4"),n("db91"),n("02f0"),n("ffda"),n("d5e0"),n("ced0"),n("10b2"),n("31c5"),n("8c33"),n("4895"),n("cbc8"),n("697e"),n("aedd"),n("a2c1"),n("8d70"),n("164b"),n("2aed"),n("b933"),n("0b6c"),n("9c7b"),n("715d"),n("18fe"),n("d72f"),n("5936"),n("a7be"),n("b6fc"),n("01cb"),n("ac1e"),n("d5db"),n("7ba3"),n("0109"),n("0176"),n("7a7a"),n("e625"),n("478c");i["a"].config.productionTip=!1,new i["a"]({render:function(e){return e(W)}}).$mount("#app")},"64a9":function(e,t,n){},"82a9":function(e,t){e.exports='<h1 id="browser-editor">browser-editor</h1>\n<p>Purely in-browser text editor, built with <a href="https://codemirror.net/">CodeMirror</a> and <a href="https://vuejs.org">Vue.js</a>.</p>\n<p>Can be packed into 1 single html file (plus corresponding fonts) and run locally on a modern browser.</p>\n<p>For air-gapped environments without easy access to a text editor and doesn&#39;t play nice with .js files.</p>\n<h2 id="usage">Usage</h2>\n<h3 id="modes">Modes</h3>\n<p>Language modes provide syntax highlighting.</p>\n<h3 id="themes">Themes</h3>\n<p>4 Dark and light themes are provided. Defaults to <code>darcula</code>.</p>\n<h3 id="settings">Settings</h3>\n<p>Edit the JSON object under &quot;Current settings&quot;. Some common settings:</p>\n<ul>\n<li>indentUnit: how many spaces an indent takes up. Also controls the number of spaces added when pressing <code>tab</code>. Defaults to <code>2</code>.</li>\n<li>lineNumbers: shows or hide line numbers. Defaults to <code>true</code>.</li>\n<li>lineWrapping: scroll or wrap for long lines. Defaults to <code>false</code> (scroll).</li>\n<li>autoCloseBrackets: add closing brackets automatically. Defaults to <code>false</code>.</li>\n<li>matchBrackets: highlights matching brackets. Defaults to <code>true</code>.</li>\n</ul>\n<h3 id="search-regex-supported">Search (regex supported)</h3>\n<p><code>Ctrl-F / Cmd-F</code>: Start searching</p>\n<p><code>Ctrl-G / Cmd-G</code>: Find next</p>\n<p><code>Shift-Ctrl-G / Shift-Cmd-G</code>: Find previous</p>\n<p><code>Shift-Ctrl-F / Cmd-Option-F</code>: Replace</p>\n<p><code>Shift-Ctrl-R / Shift-Cmd-Option-F</code>: Replace all</p>\n<h2 id="developing">Developing</h2>\n<h3 id="project-setup">Project setup</h3>\n<pre><code>$ npm install</code></pre><h3 id="compiles-and-hot-reloads-for-development">Compiles and hot-reloads for development</h3>\n<pre><code>$ npm run serve</code></pre><h3 id="compiles-and-minifies-for-production">Compiles and minifies for production</h3>\n<p>The generated production files will be located under <code>dist/</code>.</p>\n<pre><code>$ npm run build</code></pre><h3 id="build-and-run-on-docker">Build and run on Docker</h3>\n<pre><code>$ npm run build\n$ docker build --tag ${IMAGE_TAG} .\n$ docker run --name ${CONTAINER_NAME} -d [-p ${HOST_PORT}:${CONTAINER_PORT}] ${IMAGE_TAG}</code></pre>'},9224:function(e){e.exports={name:"browser-editor",version:"1.4.0",description:"In-browser text editor",homepage:"https://github.com/weijunyu/browser-editor",license:"MIT",repository:{type:"git",url:"https://github.com/weijunyu/browser-editor.git"},scripts:{serve:"vue-cli-service serve",build:"vue-cli-service build",builddocs:"npm run build && rm -rf docs/* && cp -r dist/* docs/",lint:"vue-cli-service lint"},dependencies:{codemirror:"^5.42.2","file-saver":"^2.0.0",noty:"^3.2.0-beta","pretty-data":"^0.40.0","tippy.js":"^3.4.1",vue:"^2.5.22"},devDependencies:{"@fortawesome/fontawesome-free":"^5.6.3","@vue/cli-plugin-babel":"^3.3.0","@vue/cli-plugin-eslint":"^3.3.0","@vue/cli-service":"^3.3.0","html-loader":"^0.5.5","html-webpack-inline-source-plugin":"0.0.10","markdown-loader":"^5.0.0","vue-template-compiler":"^2.5.22"},eslintConfig:{root:!0,env:{node:!0},extends:["plugin:vue/essential","eslint:recommended"],rules:{},parserOptions:{parser:"babel-eslint"}},postcss:{plugins:{autoprefixer:{}}},browserslist:["> 1%","last 2 versions","not ie <= 8"]}},ce52:function(e,t,n){}});
//# sourceMappingURL=app.c1776afd.js.map