<template>
  <div id="app">
    <!-- <div class="container-fluid">
      <div class="card">
        <div class="card-header centered">
          <button class="btn btn-link" type="button" @click="showSettings = !showSettings">
            <h3>View settings</h3>
          </button>
        </div>
        <div class="card-body" v-if="showSettings">
          <div class="row">
            <div class="col-6">
              <h2>Default settings</h2>
              <Editor
                editorId="editor-default-settings"
                v-bind:initialValue="getDefaultSettingsString()"
                v-bind:codeMirrorOptions="cmOptionsDefaultSettings"
              ></Editor>
            </div>
            <div class="col-6">
              <h2 style="display:inline-block">Current settings&nbsp;</h2>
              <i v-if="currentSettingsInvalid" class="fas fa-times-circle" style="color:darkred"></i>
              <Editor
                editorId="editor-current-settings"
                v-bind:initialValue="getMainEditorDefaultSettingsString()"
                v-bind:codeMirrorOptions="cmOptionsCurrentSettings"
              ></Editor>
            </div>
          </div>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col">
          <h2>Code Editor</h2>
          <Editor v-bind:codeMirrorOptions="cmOptionsMainEditor" editorId="editor-main"></Editor>
        </div>
      </div>
    </div>-->

    <nav id="sidebar" :style="sidebarStyle">
      <ul>
        <li>
          <a href="#" @click="showSettings = !showSettings">
            Options
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
      <Editor
        v-if="showSettings"
        editorId="editor-default-settings"
        editorName="Default settings"
        v-bind:initialValue="getDefaultSettingsString()"
        v-bind:codeMirrorOptions="cmOptionsDefaultSettings"
      ></Editor>
      <Editor
        v-if="showSettings"
        editorId="editor-current-settings"
        editorName="Current Settings"
        v-bind:initialValue="getMainEditorDefaultSettingsString()"
        v-bind:codeMirrorOptions="cmOptionsCurrentSettings"
      ></Editor>
      <Editor v-bind:codeMirrorOptions="cmOptionsMainEditor" editorId="editor-main"></Editor>
    </div>
  </div>
</template>

<script>
import CodeMirror from "codemirror";
import Editor from "./components/Editor.vue";
import { EventBus, sortObject } from "./utils";

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
      return JSON.stringify(sortObject(CodeMirror.defaults), null, 2);
    },
    getMainEditorDefaultSettingsString() {
      return JSON.stringify(this.cmOptionsMainEditor, null, 2);
    },
    applySettings() {
      EventBus.$emit("apply-settings");
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
  color: #99B2DD;
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
}

.CodeMirror {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
}

#editor-default-settings-wrapper > .CodeMirror,
#editor-current-settings-wrapper > .CodeMirror {
  top: 19px;
}

.centered {
  text-align: center;
}
.justified {
  display: flex;
  justify-content: space-between;
}
</style>
