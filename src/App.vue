<template>
  <div id="app">
    <nav class="sidebar" :style="sidebarStyle">
      <ul v-show="showSidebar">
        <li>
          <!-- outer: a element is flex with justified content -->
          <a @click="showMenu('modes')" :class="{active: isMenuActive('modes')}">
            <!-- outer: div is left-aligned in parent a -->
            <div>
              <!-- inner: div contains centerd icon -->
              <div>
                <i class="fas fa-code"></i>
              </div>
              <!-- inner: actual text -->
              &nbsp;mode
            </div>
            <i class="fas fa-angle-right" v-show="!showModes && showSidebar"></i>
            <i class="fas fa-angle-left" v-show="showModes && showSidebar"></i>
          </a>
        </li>
        <li>
          <a @click="showMenu('themes')" :class="{active: isMenuActive('themes')}">
            <div>
              <div>
                <i class="fas fa-palette"></i>
              </div>&nbsp;theme
            </div>
            <i class="fas fa-angle-right" v-show="!showThemes && showSidebar"></i>
            <i class="fas fa-angle-left" v-show="showThemes && showSidebar"></i>
          </a>
        </li>
        <li>
          <a @click="showMenu('settings')" :class="{active: isMenuActive('settings')}">
            <div>
              <div>
                <i class="fas fa-cogs"></i>
              </div>&nbsp;settings
            </div>
            <i class="fas fa-angle-right" v-show="!showSettings && showSidebar"></i>
            <i class="fas fa-angle-left" v-show="showSettings && showSidebar"></i>
          </a>
        </li>
        <li>
          <a @click="showMenu('help')" :class="{active: isMenuActive('help')}">
            <div>
              <div>
                <i class="fas fa-info"></i>
              </div>&nbsp;help
            </div>
            <i class="fas fa-angle-right" v-show="!showHelp && showSidebar"></i>
            <i class="fas fa-angle-left" v-show="showHelp && showSidebar"></i>
          </a>
        </li>
        <li>
          <input
            type="file"
            name="file-loader"
            id="file-loader"
            class="file-loader-hidden"
            @change="loadFile"
          >
          <label for="file-loader" class="file-loader-button menu-button">
            <div>
              <div>
                <i class="fas fa-file"></i>
              </div>&nbsp;open file
            </div>
          </label>
        </li>
        <li>
          <a @click="emitSaveFileEvent">
            <div>
              <div>
                <i class="fas fa-save"></i>
              </div>&nbsp;save file
            </div>
          </a>
        </li>
      </ul>
      <button class="sidebar-button" type="button" @click="toggleSidebar">
        <i class="fas fa-angle-left" v-if="showSidebar"></i>
        <i class="fas fa-angle-right" v-if="!showSidebar"></i>
      </button>
    </nav>
    <div class="content">
      <!-- Flex. Order matters! Place all menu/settings before main editor. -->
      <!-- Modes -->
      <div v-if="showModes" class="menu" id="modes-menu">
        <ul>
          <li v-for="(mode, index) in allModes" :key="index">
            <a @click="setMode(mode)" :class="{active: isModeActive(mode.name)}">
              {{mode.name}}
              <div class="menu-icon">
                <i :class="mode.icon"></i>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <!-- Themes -->
      <div v-if="showThemes" class="menu" id="themes-menu">
        <ul>
          <li v-for="(theme, index) in allThemes" :key="index">
            <a @click="setTheme(theme)" :class="{active: isThemeActive(theme)}">
              {{theme}}
              <div class="menu-icon">
                <i class="fas fa-sun" v-if="0 <= index && index < 4"></i>
                <i class="fas fa-moon" v-if="4 <= index && index < 8"></i>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <!-- Settings: default -->
      <div class="editor-wrapper" v-if="showSettings">
        <p class="editor-name" id="editor-default-settings-name">Default settings</p>
        <Editor
          editorId="editor-default-settings"
          editorName="Default settings"
          v-bind:initialValue="getDefaultSettingsString()"
          v-bind:codeMirrorOptions="cmOptionsDefaultSettings"
        ></Editor>
      </div>
      <!-- Settings: current -->
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
      <!-- Help -->
      <div class="help-content" v-if="showHelp">
        <div v-html="readmeHtmlString"></div>
        <footer>
          <a :href="packageInfo.repository.url">
            <i class="fab fa-github"></i>
            v{{packageInfo.version}}
          </a>
        </footer>
      </div>
      <!-- Main Editor -->
      <div class="editor-wrapper">
        <Editor
          v-bind:codeMirrorOptions="cmOptionsMainEditor"
          editorId="editor-main"
          v-on:saved-theme-loaded="onSavedThemeLoaded"
          v-on:saved-mode-loaded="onSavedModeLoaded"
        ></Editor>
      </div>
    </div>
  </div>
</template>

<script>
import CodeMirror from "codemirror";
import tippy from "tippy.js";
import Editor from "./components/Editor.vue";
import { EventBus, sortObject } from "./utils";
import config from "./config";
import packageInfo from "../package.json";
import readmeHtmlString from "../README.md"; // Loaded and transformed using markdown-loader and html-loader

// Main Editor initial settings
let initialTheme = "darcula";
let initialMode = config.modes[0]; // name of mode is 'text', using 'null' for codemirror mode.
let cmOptionsMainEditor = {
  mode: initialMode.mode,
  lineNumbers: true,
  styleActiveLine: true,
  matchBrackets: true,
  extraKeys: {
    Tab: function(cm) {
      let spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
      cm.replaceSelection(spaces);
    }
  },
  theme: initialTheme
};

export default {
  name: "app",
  data: function() {
    return {
      allThemes: [...config.themes.light, ...config.themes.dark],
      allModes: config.modes,
      cmOptionsMainEditor,
      currentSettingsInvalid: false,
      mode: initialMode,
      readmeHtmlString,
      showHelp: false,
      showModes: false,
      showSettings: false,
      showSidebar: true,
      showThemes: false,
      packageInfo,
      theme: initialTheme
    };
  },
  components: {
    Editor
  },
  methods: {
    loadFile(event) {
      let file = event.target.files[0];
      if (file) {
        let reader = new FileReader();
        reader.onload = () => {
          // Main Editor component listens to this event and set its value to file contents
          EventBus.$emit("file-loaded", reader.result);
        };
        reader.readAsText(file);
      }
    },
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
      if (!this.showSidebar) {
        this.showModes = false;
        this.showThemes = false;
        this.showSettings = false;
        this.showHelp = false;
      }
    },
    /**
     * Opens/hides the specified menu
     * @param {string} menuType settings/themes/modes/help
     */
    showMenu(menuType) {
      let menuSettings = config.menus;
      // Toggle menuType display: this.showSettings/this.showThemes etc
      this[menuSettings[menuType]] = !this[menuSettings[menuType]];
      // Hide all other menus
      let menuSettingsKeys = Object.keys(menuSettings);
      for (let setting of menuSettingsKeys) {
        if (menuType !== setting) {
          this[menuSettings[setting]] = false;
        }
      }
    },
    isMenuActive(menuType) {
      // this.showSettings/this.showThemes etc
      return this[config.menus[menuType]];
    },
    isThemeActive(themeName) {
      return this.theme === themeName;
    },
    isModeActive(modeName) {
      return this.mode.name === modeName;
    },
    setTheme(themeName) {
      this.theme = themeName;
      // Use event for main editor to set theme on demand
      EventBus.$emit("set-theme", themeName);
    },
    setMode(mode) {
      this.mode = mode;
      EventBus.$emit("set-mode", mode.mode); // Event used by main editor to set mode
    },
    emitSaveFileEvent() {
      EventBus.$emit("save-file", {
        mode: this.mode
      });
    },
    onSavedThemeLoaded(themeName) {
      this.theme = themeName;
    },
    onSavedModeLoaded(mode) {
      this.mode = this.allModes.find(configMode => {
        return configMode.mode === mode;
      })
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
  created() {
    // If current settings is valid JSON or not; fired from current-settings editor.
    EventBus.$on("current-settings-invalid", () => {
      this.currentSettingsInvalid = true;
    });
    EventBus.$on("new-settings-available", () => {
      this.currentSettingsInvalid = false;
    });
  },
  mounted() {
    tippy(".file-loader-button", {
      content: config.strings.dragAndDropTooltip,
      placement: "right"
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
  min-height: 100vh; /* stretch out elements*/
  max-height: 100vh; /* but don't allow them to be forced out of the viewport height */
}

/* Sidebar and menus */
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
  border: 0.5px solid #3a405a;
}

/* Secondary menus with lighter backgrounds */
.menu {
  background: #444a61;
  overflow: auto; /* will spawn vertical scrollbar for long menus */
}

.sidebar ul,
.menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.sidebar ul li a,
.menu ul li a,
.file-loader-button {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar ul li a,
.menu ul li a,
.file-loader-button,
.tippy-content {
  font-family: monospace;
}

.sidebar ul li a:hover,
.sidebar ul li .file-loader-button:hover,
.sidebar ul li a.active {
  color: #3a405a;
  background: #eef0f2;
  cursor: pointer;
}

/* Menu items have lighter background */
.menu ul li a:hover,
.menu ul li a.active {
  color: #444a61;
  background: #eef0f2;
  cursor: pointer;
}

.sidebar ul li a,
.menu ul li a,
.menu-button,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

/* sidebar left div containing icon and item name */
.sidebar ul li a > div,
.file-loader-button > div {
  display: flex;
  align-items: center;
}

/* sidebar div containing icon i element */
.sidebar ul li a > div > div,
.file-loader-button > div > div {
  display: flex;
  min-width: 24px;
  justify-content: space-around;
}

/* menu right div containing icon */
div.menu-icon {
  display: flex;
  min-width: 24px;
  justify-content: space-around;
}

.help-content {
  flex: 1 1 0;
  padding: 0px 15px;
  overflow: auto;
  background: #444a61;
  color: #eef0f2;
  font-family: monospace;
}

.help-content a {
  color: #eef0f2;
}

.help-content code {
  font-size: 85%;
  color: #7afdd6;
}

/* Main content */
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
  border: 0.5px solid #888888;
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

/* Make space for headings for default/current settings editors */
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

/* Shrinking sidebar */
.sidebar-button {
  background-color: #5a5987;
  border-radius: 0.15em;
  border: 0.8px solid #eef0f2;
  color: #eef0f2;
  position: absolute;
  bottom: 10px;
  right: 8px;
  transition: all 0.2s;
}

.sidebar-button:hover {
  color: #000;
  background-color: #eef0f2;
}

.file-loader-hidden {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
</style>
