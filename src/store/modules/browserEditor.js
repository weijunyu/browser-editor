import config from "../../config";
export default {
  state: {
    menus: {
      modes: false,
      themes: false,
      settings: false,
      help: false
    },
    sidebar: true,
    mode: config.modes[0],
    theme: "darcula"
  },
  getters: {},
  actions: {
    toggleMenu({ commit }, menuSetting) {
      commit("toggleMenu", { menuSetting });
      for (let setting of ["modes", "themes", "settings", "help"]) {
        if (setting !== menuSetting) {
          commit("toggleMenu", { menuSetting: setting, showMenu: false });
        }
      }
    },
    hideAllMenus({ commit }) {
      for (let setting of ["modes", "themes", "settings", "help"]) {
        commit("toggleMenu", { menuSetting: setting, showMenu: false });
      }
    },
    toggleSidebar({ commit, dispatch }) {
      commit("toggleSidebar");
      dispatch("hideAllMenus");
    }
  },
  mutations: {
    toggleMenu(state, { menuSetting, showMenu }) {
      let newSetting = showMenu;
      if (showMenu == null) {
        newSetting = !state.menus[menuSetting];
      }
      state.menus = {
        ...state.menus,
        [menuSetting]: newSetting
      };
    },
    toggleSidebar(state) {
      state.sidebar = !state.sidebar;
    },
    setMode(state, mode) {
      state.mode = mode;
    },
    setTheme(state, theme) {
      state.theme = theme;
    }
  }
};
