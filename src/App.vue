<template>
  <div id="app">
    <nav class="sidebar" :style="sidebarStyle">
      <ul>
        <li>
          <a href="#" @click="showMenu('settings')" :class="{active: isMenuActive('settings')}">
            Settings
            <i class="fas fa-angle-right" v-if="!showSettings && showSidebar"></i>
            <i class="fas fa-angle-left" v-if="showSettings && showSidebar"></i>
            <i class="fas fa-cogs sidebar-collapsed-icon" v-if="!showSidebar"></i>
          </a>
        </li>
        <li>
          <a href="#" @click="showMenu('themes')" :class="{active: isMenuActive('themes')}">
            Theme
            <i class="fas fa-angle-right" v-if="!showThemes && showSidebar"></i>
            <i class="fas fa-angle-left" v-if="showThemes && showSidebar"></i>
            <i class="fas fa-palette sidebar-collapsed-icon" v-if="!showSidebar"></i>
          </a>
        </li>
      </ul>
      <button class="sidebar-button" type="button" @click="toggleSidebar">
        <i class="fas fa-angle-left" v-if="showSidebar"></i>
        <i class="fas fa-angle-right" v-if="!showSidebar"></i>
      </button>
    </nav>
    <div class="content">
      <div class="editor-wrapper" v-if="showSettings">
        <p class="editor-name" id="editor-default-settings-name">Default settings</p>
        <Editor
          editorId="editor-default-settings"
          editorName="Default settings"
          v-bind:initialValue="getDefaultSettingsString()"
          v-bind:codeMirrorOptions="cmOptionsDefaultSettings"
        ></Editor>
      </div>
      <div class="editor-wrapper" v-if="showSettings">
        <p
          class="editor-name"
          id="editor-current-settings-name"
          :style="currentSettingsStyle"
        >Current settings</p>
        <Editor
          editorId="editor-current-settings"
          editorName="Current Settings"
          v-bind:codeMirrorOptions="cmOptionsCurrentSettings"
        ></Editor>
      </div>
      <div v-if="showThemes" class="editor-wrapper menu" id="themes-menu">
        <ul>
          <li v-for="(theme, index) in allThemes" :key="index">
            <a href="#" @click="setTheme(theme)" :class="{active: isThemeActive(theme)}">
              {{theme}}
              <i class="fas fa-sun" v-if="0 <= index && index < 4"></i>
              <i class="fas fa-moon" v-if="4 <= index && index < 8"></i>
            </a>
          </li>
        </ul>
      </div>
      <div class="editor-wrapper">
        <Editor v-bind:codeMirrorOptions="cmOptionsMainEditor" editorId="editor-main"></Editor>
      </div>
    </div>
  </div>
</template>

<script>
import CodeMirror from "codemirror";
import Editor from "./components/Editor.vue";
import { EventBus, sortObject } from "./utils";
import config from "./config";

// Main Editor initial settings
let initialTheme = 'darcula';
let cmOptionsMainEditor = {
  mode: "",
  lineNumbers: true,
  styleActiveLine: true,
  extraKeys: {
    Tab: function(cm) {
      let spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
      cm.replaceSelection(spaces);
    }
  },
  theme: initialTheme
};

let allThemes = [...config.themes.light, ...config.themes.dark];

export default {
  name: "app",
  data: function() {
    return {
      allThemes,
      cmOptionsMainEditor,
      currentSettingsInvalid: false,
      showSettings: false,
      showThemes: false,
      showSidebar: true,
      theme: initialTheme
    };
  },
  methods: {
    getDefaultSettingsString() {
      let defaultConfigurables = {};
      // Only configurable settings
      for (let settingName of Object.keys(CodeMirror.defaults)) {
        if (config.configurables.includes(settingName)) {
          defaultConfigurables[settingName] = CodeMirror.defaults[settingName];
        }
      }
      return JSON.stringify(sortObject(defaultConfigurables), null, 2);
    },
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    showMenu(menuType) {
      if (menuType === "settings") {
        this.showSettings = !this.showSettings;
        this.showThemes = false;
      } else if (menuType === "themes") {
        this.showThemes = !this.showThemes;
        this.showSettings = false;
      }
    },
    isMenuActive(menuType) {
      switch (menuType) {
        case "settings": {
          return this.showSettings;
        }
        case "themes": {
          return this.showThemes;
        }
        default: {
          return false;
        }
      }
    },
    isThemeActive(themeName) {
      return this.theme === themeName;
    },
    getThemeOptionStyle(index) {
      if (0 <= index && index < 4) {
        return {
          "background-color": "#eef0f2",
          color: "#3a405a"
        };
      } else {
        return {
          "background-color": "#3a405a",
          color: "#eef0f2"
        };
      }
    },
    setTheme(themeName) {
      // Use event for main editor to set theme on demand
      EventBus.$emit("set-theme", themeName);
    }
  },
  computed: {
    sidebarStyle() {
      if (this.showSidebar) {
        return {
          "margin-left": 0
        };
      } else {
        return {
          "margin-left": "-160px"
        };
      }
    },
    currentSettingsStyle() {
      if (!this.currentSettingsInvalid) {
        return {
          "background-color": "#9dbf9e"
        };
      } else {
        return {
          "background-color": "#FB3640",
          color: "#eef0f2"
        };
      }
    },
    cmOptionsDefaultSettings() {
      return {
        mode: {
          name: "javascript",
          json: true
        },
        lineNumbers: true,
        styleActiveLine: true,
        readOnly: true,
        theme: this.theme
      };
    },
    cmOptionsCurrentSettings() {
      return {
        mode: {
          name: "javascript",
          json: true
        },
        lineNumbers: true,
        styleActiveLine: true,
        extraKeys: {
          Tab: function(cm) {
            let spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
            cm.replaceSelection(spaces);
          }
        },
        theme: this.theme
      };
    }
  },
  components: {
    Editor
  },
  created() {
    // If current settings is valid JSON or not; fired from current-settings editor.
    EventBus.$on("current-settings-invalid", () => {
      this.currentSettingsInvalid = true;
    });
    EventBus.$on("new-settings-available", () => {
      this.currentSettingsInvalid = false;
    });
    EventBus.$on("set-theme", themeName => {
      this.theme = themeName;
    });
  }
};
</script>

<style>
#app {
  font-family: sans-serif;
  display: flex;
  align-items: stretch;
  width: 100%;
  min-height: 100vh;
}

/* Sidebar */
.sidebar,
.menu {
  min-width: 200px;
  max-width: 200px;
  background: #3a405a;
  color: #eef0f2;
  transition: all 0.3s;
  font-family: sans-serif;
  font-size: 1.2em;
  position: relative;
}

.sidebar ul,
.menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.sidebar ul li a,
.menu ul li a {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar ul li a:hover,
.sidebar ul li a.active {
  color: #3a405a;
  background: #eef0f2;
}

.sidebar ul li a,
.menu a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

/* Main content*/
.content {
  flex: 1 1 auto;
  position: relative;
  display: flex;
}

.editor-wrapper {
  flex: 1 1 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  border: 0.5px solid #3a405a;
}

.editor-wrapper > p,
.editor-wrapper > div {
  flex: 1 1 auto;
}

.editor-wrapper > p {
  max-height: 19px;
}

/* For actual .CodeMirror elements. Use absolute positioning so they resize properly. */
#editor-main-element,
#editor-default-settings-element,
#editor-current-settings-element {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: auto;
}

#editor-default-settings-wrapper > .CodeMirror,
#editor-current-settings-wrapper > .CodeMirror {
  top: 19px;
}

.editor-name {
  padding: 0 15px;
  font-family: monospace;
  margin: 0 0;
}

/* Settings menu */
#editor-default-settings-name {
  background-color: #3a405a;
  color: #eef0f2;
}

/* Themes menu */
#themes-menu {
  flex: 0 1 auto;
  background: #444a61;
}

#themes-menu ul li a:hover,
#themes-menu ul li a.active {
  color: #444a61;
  background: #eef0f2;
}

/* Shrinking sidebar */
.sidebar-button {
  background-color: #5a59877d;
  border-radius: 0.15em;
  border: 0.8px solid #eef0f2;
  bottom: 10px;
  color: #eef0f2;
  float: right;
  position: absolute;
  right: 8px;
  transition: all 0.2s;
}
.sidebar-button:hover {
  color: #000;
  background-color: #eef0f2;
}
</style>
