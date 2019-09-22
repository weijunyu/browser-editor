import Vuex from "vuex";
import Vue from "vue";
import auth from "./modules/auth";
import browserEditor from "./modules/browserEditor";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    browserEditor
  }
});
