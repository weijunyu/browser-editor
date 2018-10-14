<template>
  <div>
    <form>
      <textarea v-bind:id="editorId"></textarea>  
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
  props: [
    'codeMirrorOptions',
    'editorId',
    'initialValue'
  ],
  data: function() {
    return {
    };
  },
  methods: {},
  mounted() {
    let cmOptions = this.codeMirrorOptions;
    this.cmEditor = CodeMirror.fromTextArea(
      document.getElementById(this.editorId),
      cmOptions
    );
    
    if (this.initialValue) {
      this.cmEditor.setValue(this.initialValue);
    } 
  }
};

</script>

<style>
.CodeMirror {
  border: 1px solid #333333;
  height: auto;
}
</style>
