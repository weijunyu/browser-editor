<template>
  <div id="app">
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <button
            type="button"
            class="btn btn-link"
            data-toggle="collapse"
            data-target="#editor-settings-container"
          >View settings</button>
        </div>
        <div class="card-body collapse show" id="editor-settings-container">
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
              <h2>Current settings</h2>
              <Editor editorId="editor-current-settings" v-bind:initialValue="'{}'"></Editor>
            </div>
          </div>
        </div>
      </div>
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
export default {
  name: "app",
  data: function() {
    return {
      showDefaultSettings: false,
      cmOptionsDefaultSettings: {
        mode: {
          name: "javascript",
          json: true
        },
        lineNumbers: true,
        styleActiveLine: true,
        readOnly: true
      },
      cmOptionsMainEditor: {
        mode: "",
        lineNumbers: true,
        styleActiveLine: true
      }
    };
  },
  methods: {
    getDefaultSettingsString() {
      return JSON.stringify(sortObject(CodeMirror.defaults), null, 2);
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
</style>
