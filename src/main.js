import Vue from 'vue';
import App from './App.vue';

// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/reset.css';

import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
