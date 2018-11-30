import Vue from 'vue';
import App from './App.vue';

import './styles/normalize.css';

import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css';
import '@fortawesome/fontawesome-free/css/brands.min.css';

import 'tippy.js/dist/tippy.css';

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
import "codemirror/theme/3024-day.css";
import "codemirror/theme/duotone-light.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/neo.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/hopscotch.css";
import "codemirror/theme/monokai.css";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
