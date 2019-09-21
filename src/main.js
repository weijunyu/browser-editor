import Vue from 'vue';
import App from './App.vue';
import store from "./store";

import './styles/normalize.css';

import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css';
import '@fortawesome/fontawesome-free/css/brands.min.css';

// Main import + modes
import "codemirror/mode/dockerfile/dockerfile";
import "codemirror/mode/javascript/javascript"; // also for json & typescript
import "codemirror/mode/python/python";
import "codemirror/mode/shell/shell";
import "codemirror/mode/sql/sql";
import "codemirror/mode/xml/xml"; // also for html mode
import "codemirror/mode/yaml/yaml";
// Addons
import "codemirror/addon/edit/closebrackets"; // For auto close brackets
import "codemirror/addon/selection/active-line"; // For active line styling
import 'codemirror/addon/edit/matchbrackets';
// Addons for code folding
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter"; // For gutter markers
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold"; // For folding brace-styled languages like js
import "codemirror/addon/fold/xml-fold"; // For folding xml languages
import "codemirror/addon/fold/indent-fold"; // For folding indent-based languages like python
import "codemirror/addon/fold/comment-fold"; // For folding comments
// Addons for search
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.js";
import "codemirror/addon/search/jump-to-line.js";
// Addons CSS for search
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/matchesonscrollbar.css";
// Main CSS
import "codemirror/lib/codemirror.css";
// Themes; see config.js
import "codemirror/theme/duotone-light.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/elegant.css";
import "codemirror/theme/neo.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/hopscotch.css";
import "codemirror/theme/monokai.css";

import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store
}).$mount('#app');
