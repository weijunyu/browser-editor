<template>
  <div id="app">
    <nav class="sidebar" :style="sidebarStyle">
      <ul v-show="showSidebar">
        <li>
          <!-- outer: a element is flex with justified content -->
          <a @click="showMenu('modes')" :class="{active: isMenuActive('modes')}">
            <!-- outer: div is left-aligned in parent a -->
            <div>
              <!-- inner: div contains centered icon -->
              <div>
                <i class="fas fa-code"></i>
              </div>
              <!-- inner: actual text -->
              &nbsp;mode
            </div>
            <div>
              <small>{{ mode.name }}</small>&nbsp;
              <i class="fas fa-angle-right" v-show="!showModes && showSidebar"></i>
              <i class="fas fa-angle-left" v-show="showModes && showSidebar"></i>
            </div>
          </a>
        </li>
        <li>
          <a @click="showMenu('themes')" :class="{active: isMenuActive('themes')}">
            <div>
              <div>
                <i class="fas fa-palette"></i>
              </div>&nbsp;theme
            </div>
            <div>
              <small style="width: 70px">{{ theme }}</small>&nbsp;
              <i class="fas fa-angle-right" v-show="!showThemes && showSidebar"></i>
              <i class="fas fa-angle-left" v-show="showThemes && showSidebar"></i>
            </div>
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
          />
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
        <li v-if="!isLoggedIn">
          <a @click="login">Log In With Google</a>
        </li>
        <li v-else>
          <a @click="logout">Log out</a>
        </li>
      </ul>
      <div class="sidebar-bottom">
        <div id="compress-contents-button">
          <button
            type="button"
            class="sidebar-bottom-button"
            @click="compressContents"
            v-if="isModeXmlOrJson"
          >
            <i class="fas fa-compress-arrows-alt"></i>
          </button>
        </div>
        <div id="expand-contents-button">
          <button
            type="button"
            class="sidebar-bottom-button"
            @click="expandContents"
            v-if="isModeXmlOrJson"
          >
            <i class="fas fa-expand-arrows-alt"></i>
          </button>
        </div>
        <button class="sidebar-bottom-button" type="button" @click="toggleSidebar">
          <i class="fas fa-angle-left" v-if="showSidebar"></i>
          <i class="fas fa-angle-right" v-if="!showSidebar"></i>
        </button>
      </div>
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
        <p class="editor-name" id="editor-current-settings-name" :style="currentSettingsStyle">
          Current settings
          <button type="button" class="editor-button" @click="resetSettings">Reset</button>
        </p>
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
        <Editor v-bind:codeMirrorOptions="cmOptionsMainEditor" editorId="editor-main"></Editor>
      </div>
    </div>
  </div>
</template>

<script>
import CodeMirror from "codemirror";
import tippy from "tippy.js";
import Noty from "noty";
import { mapActions, mapGetters } from "vuex";
import Editor from "./Editor.vue";
import { EventBus, sortObject } from "../utils";
import config from "../config";
import packageInfo from "../../package.json";
import readmeHtmlString from "../../README.md"; // Loaded and transformed using markdown-loader and html-loader

let savedMode = localStorage.getItem("mode");
let savedTheme = localStorage.getItem("theme");
let savedSettings = localStorage.getItem("main-editor-settings");
let savedContent = localStorage.getItem("main-editor-content");

if (savedMode || savedTheme || savedSettings || savedContent) {
  new Noty({
    text: "Previous settings and content have been restored.",
    timeout: 1200,
    type: "warning",
    theme: "mint"
  }).show();
}

// Main Editor initial settings
let initialTheme = savedTheme || "darcula";

let initialMode = config.modes[0]; // name of mode is 'text', using 'null' for codemirror mode.
if (savedMode) {
  initialMode = config.modes.find(configMode => {
    return configMode.mode === savedMode;
  });
}

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
  theme: initialTheme,
  autoCloseBrackets: true,
  foldGutter: true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
};

export default {
  name: "browser-editor",
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
    ...mapActions(["login", "logout"]),
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
      this.showThemes = false;
    },
    setMode(mode) {
      this.mode = mode;
      EventBus.$emit("set-mode", mode.mode); // Event used by main editor to set mode
      this.showModes = false;
    },
    emitSaveFileEvent() {
      EventBus.$emit("save-file", {
        mode: this.mode
      });
    },
    compressContents() {
      if (this.mode.name === "xml" || this.mode.name === "json") {
        EventBus.$emit("compress-contents", this.mode.name);
      }
    },
    expandContents() {
      if (this.mode.name === "xml" || this.mode.name === "json") {
        EventBus.$emit("expand-contents", this.mode.name);
      }
    },
    resetSettings() {
      let originalSettingsNames = Object.keys(cmOptionsMainEditor).filter(
        settingName => {
          return config.configurables.includes(settingName);
        }
      );
      let originalSettings = {};
      for (let settingName of originalSettingsNames) {
        originalSettings[settingName] = cmOptionsMainEditor[settingName];
      }
      EventBus.$emit("current-settings", originalSettings); // Update current-settings editor
      EventBus.$emit("new-settings-available", originalSettings); // Update main-editor
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", "user"]),
    sidebarStyle() {
      if (this.showSidebar) {
        return {
          "margin-left": 0
        };
      } else {
        return {
          "margin-left": "-162px",
          "flex-direction": "column-reverse"
        };
      }
    },
    currentSettingsStyle() {
      if (!this.currentSettingsInvalid) {
        return {
          "background-color": "var(--color-success)"
        };
      } else {
        return {
          "background-color": "var(--color-fail)",
          color: "var(--color-light-primary)"
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
    },
    isModeXmlOrJson() {
      return this.mode.name === "xml" || this.mode.name === "json";
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
    tippy("#compress-contents-button", {
      content: config.strings.minifyXmlAndJsonTooltip,
      placement: "right"
    });
    tippy("#expand-contents-button", {
      content: config.strings.prettyFormatXmlAndJsonTooltip,
      placement: "right"
    });
  }
};
</script>

<style>
:root {
  --color-dark-primary: #3a405a;
  --color-dark-secondary: #444a61;
  --color-light-primary: #eef0f2;
  --color-light-secondary: #afafaf;
  --color-fail: #fb3640;
  --color-success: #9dbf9e;
  --color-highlight: #7afdd6;
  --color-disabled: #646464;
}

#app {
  font-family: sans-serif;
  display: flex;
  align-items: stretch;
  width: 100%;
  min-height: 100vh; /* stretch out elements*/
  max-height: 100vh; /* but don't allow them to be forced out of the viewport height */
}

.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Sidebar and menus */
.sidebar,
.menu {
  min-width: 200px;
  max-width: 200px;
  background: var(--color-dark-primary);
  color: var(--color-light-primary);
  transition: all 0.3s;
  font-family: sans-serif;
  font-size: 1.2em;
  position: relative;
  border: 0.5px solid var(--color-dark-primary);
}

/* Secondary menus with lighter backgrounds */
.menu {
  background: var(--color-dark-secondary);
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
  font-family: monospace;
}

.tippy-content {
  font-family: monospace;
}

.sidebar ul li a:hover,
.sidebar ul li .file-loader-button:hover,
.sidebar ul li a.active {
  color: var(--color-dark-primary);
  background: var(--color-light-primary);
  cursor: pointer;
}

/* Menu items have lighter background */
.menu ul li a:hover,
.menu ul li a.active {
  color: var(--color-dark-secondary);
  background: var(--color-light-primary);
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

/* sidebar div containg current mode/theme */
.sidebar ul li a > div > small {
  color: var(--color-light-secondary);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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
  background: var(--color-dark-secondary);
  color: var(--color-light-primary);
  font-family: monospace;
}

.help-content a {
  color: var(--color-light-primary);
}

.help-content code {
  font-size: 85%;
  color: var(--color-highlight);
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
  display: flex;
  justify-content: space-between;
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
  background-color: var(--color-dark-primary);
  color: var(--color-light-primary);
}

/* Sidebar bottom buttons */
.sidebar-bottom {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.sidebar-bottom-button {
  background-color: var(--color-dark-secondary);
  border-radius: 0.15em;
  border: 0px solid var(--color-light-primary);
  color: var(--color-light-primary);
  transition: all 0.2s;
  min-width: 36px;
  margin: 1px;
}

.sidebar-bottom-button:hover {
  color: var(--color-dark-primary);
  background-color: var(--color-light-primary);
  cursor: pointer;
}

.sidebar-bottom-button:disabled {
  color: var(--color-disabled);
  background-color: var(--color-dark-secondary);
  cursor: auto;
}

.file-loader-hidden {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.editor-button {
  box-sizing: border-box;
  background-color: var(--color-dark-secondary);
  border-radius: 0.15em;
  border: 0;
  color: var(--color-light-primary);
  transition: all 0.2s;
  margin: 1px 0;
}

.editor-button:hover {
  color: var(--color-dark-primary);
  background-color: var(--color-light-primary);
  cursor: pointer;
}

.noty_body {
  font-family: monospace;
}
</style>
