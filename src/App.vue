<template>
  <div id="app">
    <div class="container-fluid">
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
}
#editor-main-element {
  /* make height equal window height */
  height: 100vh;
}
.centered {
  text-align: center;
}
.justified {
  display: flex;
  justify-content: space-between;
}
</style>
