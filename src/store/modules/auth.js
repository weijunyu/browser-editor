import firebaseApp from "../../firebase";

export default {
  state: {
    user: null,
    token: null,
    processing: false
  },
  getters: {
    isLoggedIn: state => !!state.user,
    userId: state => (state.user ? state.user.uid : null),
    user: state => state.user,
    processing: state => state.processing
  },
  actions: {
    initializeAuth({ commit, dispatch }) {
      commit("setProcessing", true);
      firebaseApp.auth().onAuthStateChanged(user => {
        if (user) {
          commit("setUser", user);
        } else {
          dispatch("resetAuth");
        }
        commit("setProcessing", false);
      });
    },
    login({ commit }) {
      const provider = new firebaseApp.auth.GoogleAuthProvider();
      commit("setProcessing", true);
      firebaseApp.auth().signInWithPopup(provider);
    },
    logout({ commit }) {
      commit("setProcessing", true);
      firebaseApp.auth().signOut();
    },
    resetAuth({ commit }) {
      commit("setUser", null);
      commit("setToken", null);
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    setProcessing(state, processing) {
      state.processing = processing;
    }
  }
};
