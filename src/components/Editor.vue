<template>
  <div v-bind:id="editorId + '-wrapper'" class="editor-wrapper">
    <textarea v-bind:id="editorId"></textarea>
  </div>
</template>

<script>
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";

import "codemirror/mode/javascript/javascript"; // For javascript mode
import "codemirror/addon/edit/closebrackets"; // For auto close brackets
import "codemirror/addon/selection/active-line"; // For active line styling

import { EventBus, sortObject } from "../utils";

export default {
  name: "editor",
  props: ["codeMirrorOptions", "editorId", "editorName", "initialValue"],
  data: function() {
    return {};
  },
  methods: {},
  mounted() {
    this.cmEditor = CodeMirror.fromTextArea(
      document.getElementById(this.editorId),
      this.codeMirrorOptions
    );
    if (this.initialValue) {
      this.cmEditor.setValue(this.initialValue);
    }
    // update id attribute of CodeMirror div node for actual editor
    let cmEditorElement = this.cmEditor.getWrapperElement();
    cmEditorElement.id = `${this.editorId}-element`;

    // Initialization for current settings editor
    if (this.editorId === "editor-current-settings") {
      this.cmEditor.on("change", () => {
        try {
          let newSettings = JSON.parse(this.cmEditor.getValue());
          EventBus.$emit("new-settings-available", newSettings);
        } catch (error) {
          EventBus.$emit("current-settings-invalid");
        }
      });
    }

    // Initialization for main editor
    if (this.editorId === "editor-main") {
      const SettingsOptions = Object.keys(CodeMirror.defaults);
      EventBus.$on("new-settings-available", newSettings => {
        try {
          let finalSettings = Object.assign(
            {},
            CodeMirror.defaults,
            newSettings
          );
          for (let key of Object.keys(finalSettings)) {
            if (SettingsOptions.indexOf(key) !== -1) {
              this.cmEditor.setOption(key, finalSettings[key]);
            }
          }
        } catch (error) {}
      });
    }
  }
};
</script>

<style>
</style>
