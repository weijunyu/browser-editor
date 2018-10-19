<template>
  <div id="app">
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <a class="btn btn-link" data-toggle="collapse" href="#editor-settings-container">
            <h3>View settings</h3>
          </a>
        </div>
        <div class="collapse show" id="editor-settings-container">
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <h2>Default settings</h2>
                <Editor
                  editorId="editor-default-settings"
                  v-bind:initialValue="getDefaultSettingsString()"
                  v-bind:codeMirrorOptions="cmOptionsSettingsDefault"
                ></Editor>
              </div>
              <div class="col-6">
                <div class="justified">
                  <h2>Current settings</h2>
                  <button type="button" class="btn btn-primary" @click="applySettings">Apply</button>
                </div>
                <Editor
                  editorId="editor-current-settings"
                  v-bind:initialValue="getMainEditorDefaultSettings()"
                  v-bind:codeMirrorOptions="cmOptionsSettingsCurrent"
                ></Editor>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col">
          <h2>Code Editor</h2>
          <Editor v-bind:codeMirrorOptions="cmOptionsEditorDefault" editorId="editor-main"></Editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CodeMirror from "codemirror";
import Editor from "./components/Editor.vue";
import EventBus from "./EventBus";

let cmOptionsEditorDefault = {
  mode: "",
  lineNumbers: true,
  styleActiveLine: true
};

let cmOptionsSettingsDefault = Object.assign({}, cmOptionsEditorDefault, {
  mode: {
    name: "javascript",
    json: true
  },
  readOnly: true
});

let cmOptionsSettingsCurrent = Object.assign({}, cmOptionsEditorDefault, {
  mode: {
    name: "javascript",
    json: true
  }
});

export default {
  name: "app",
  data: function() {
    return {
      cmOptionsEditorDefault,
      cmOptionsSettingsDefault,
      cmOptionsSettingsCurrent
    };
  },
  methods: {
    getDefaultSettingsString() {
      return JSON.stringify(sortObject(CodeMirror.defaults), null, 2);
    },
    getMainEditorDefaultSettings() {
      return JSON.stringify(this.cmOptionsEditorDefault, null, 2);
    },
    applySettings() {
      EventBus.$emit("apply-settings");
    }
  },
  components: {
    Editor
  }
};

function sortObject(obj) {
  let sortedObj = {};
  let sortedKeys = Object.keys(obj).sort();
  for (let key of sortedKeys) {
    sortedObj[key] = obj[key];
  }
  return sortedObj;
}
</script>

<style>
#app {
  font-family: sans-serif;
}
#editor-main-element {
  height: auto;
}
.justified {
  display: flex;
  justify-content: space-between;
}
</style>
