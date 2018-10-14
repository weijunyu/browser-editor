<template>
  <div id="app">
    <button type="button" v-on:click="showSettings = !showSettings">View settings</button>
    <Editor v-if="showSettings" editorId="editor-settings" v-bind:initialValue="getInitialCmSettings()"></Editor>
    <h1>Code Editor</h1>
    <Editor v-bind:codeMirrorOptions="codeMirrorDefaultOptions" editorId="editor-main"></Editor>
  </div>
</template>

<script>
import CodeMirror from "codemirror";
import Editor from "./components/Editor.vue";
export default {
  name: "app",
  data: function() {
    return {
      showSettings: false,
      codeMirrorDefaultOptions: {
        lineNumbers: true,
        autoCloseBrackets: true,
        styleActiveLine: true
      }
    };
  },
  methods: {
    getInitialCmSettings() {
      return JSON.stringify(
        sortObject(
          Object.assign({}, CodeMirror.defaults, this.codeMirrorDefaultOptions)
        ), null, 2
      );
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
</style>
