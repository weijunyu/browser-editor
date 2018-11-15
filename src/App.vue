<template>
  <div id="app">
    <nav id="sidebar" :style="sidebarStyle">
      <ul>
        <li>
          <a href="#" @click="showSettings = !showSettings" :class="sidebarSettingsClass">
            Settings
            <i class="fas fa-angle-right" v-if="!showSettings"></i>
            <i class="fas fa-angle-left" v-if="showSettings"></i>
          </a>
        </li>
        <li>
          <a href="#">Themes</a>
        </li>
      </ul>
      <button class="btn btn-sidebar btn-dark" type="button" @click="toggleSidebar">
        <i class="fas fa-angle-left" v-if="showSidebar"></i>
        <i class="fas fa-angle-right" v-if="!showSidebar"></i>
      </button>
    </nav>
    <div id="content">
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

import "codemirror/lib/codemirror.css";

import "codemirror/mode/javascript/javascript"; // For javascript mode
import "codemirror/mode/python/python";
import "codemirror/addon/edit/closebrackets"; // For auto close brackets
import "codemirror/addon/selection/active-line"; // For active line styling

// Main Editor
let cmOptionsMainEditor = {
  mode: "",
  lineNumbers: true,
  styleActiveLine: true,
  extraKeys: {
    Tab: function(cm) {
      let spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
      cm.replaceSelection(spaces);
    }
  }
};

// Default settings editor (read-only)
let cmOptionsDefaultSettings = {
  mode: {
    name: "javascript",
    json: true
  },
  lineNumbers: true,
  styleActiveLine: true,
  readOnly: true
};

// Current settings editor
let cmOptionsCurrentSettings = {
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
  }
};

export default {
  name: "app",
  data: function() {
    return {
      cmOptionsMainEditor,
      cmOptionsDefaultSettings,
      cmOptionsCurrentSettings,
      showSettings: false,
      showSidebar: true,
      currentSettingsInvalid: false
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
          "margin-left": "-200px"
        };
      }
    },
    sidebarSettingsClass() {
      if (this.showSettings) {
        return {
          active: true
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

#sidebar {
  min-width: 250px;
  max-width: 250px;
  background: #3a405a;
  color: #99b2dd;
  transition: all 0.3s;
  font-family: sans-serif;
  font-size: 1.2em;
  position: relative;
}

#sidebar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

#sidebar ul li a {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#sidebar ul li a:hover,
#sidebar ul li a.active {
  color: #3a405a;
  background: #eef0f2;
}

#sidebar ul li a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-sidebar {
  float: right;
  position: absolute;
  bottom: 10px;
  right: 10px;
}

#content {
  flex: 1 1 auto;
  position: relative;
  display: flex;
}

#content > .editor-wrapper {
  flex: 1 1 auto;
  position: relative;
  display: flex;
  flex-direction: column;
}

.editor-wrapper > p,
.editor-wrapper > div {
  flex: 1 1 auto;
}

.editor-wrapper > p {
  max-height: 19px;
}

.CodeMirror {
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

#editor-default-settings-name {
  background-color: #3a405a;
  color: #eef0f2;
}
</style>
