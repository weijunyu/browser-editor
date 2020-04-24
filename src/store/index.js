import Vuex from "vuex";
import Vue from "vue";
import browserEditor from "./modules/browserEditor";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    browserEditor,
  },
});
