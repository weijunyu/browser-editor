<template>
  <div>
    <form>
    <textarea id='editor'></textarea>
    </form>
  </div>
</template>

<script>
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";

import "codemirror/mode/javascript/javascript"; // For javascript mode
import "codemirror/addon/edit/closebrackets"; // For auto close brackets
import "codemirror/addon/selection/active-line"; // For active line styling

export default {
  name: "editor",
  data: function() {
    return {
      showCm: false
    };
  },
  methods: {},
  mounted() {
    let cmOptions = {
      lineNumbers: true,
      autoCloseBrackets: true,
      styleActiveLine: true
    };
    this.cm = CodeMirror.fromTextArea(
      document.getElementById("editor"),
      cmOptions
    );
    let configDisplayed = sortObject(Object.assign({}, CodeMirror.defaults));
    this.cm.setValue(JSON.stringify(configDisplayed, null, 2));
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
.CodeMirror {
  border: 1px solid #333333;
  height: auto;
}
</style>
