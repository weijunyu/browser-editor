<template>
  <div v-bind:id="editorId + '-wrapper'">
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

    if (this.editorId === "editor-main") {
      // Initialization for main editor
      this.editorSettings = {};
      for (let key of Object.keys(CodeMirror.defaults)) {
        this.editorSettings[key] = this.cmEditor.getOption(key);
      }
      this.cmEditor.setValue(JSON.stringify(this.editorSettings, null, 2));

      const defaultSettingNames = Object.keys(CodeMirror.defaults);
      EventBus.$on("new-settings-available", newSettings => {
        // Merge new settings with defaults
        let mergedSettings = Object.assign(
          {},
          CodeMirror.defaults,
          newSettings
        );
        // Compare merged settings with current settings. For ones that do not equate, change the current settings
        for (let settingName of Object.keys(mergedSettings)) {
          if (
            mergedSettings[settingName] !== this.editorSettings[settingName]
          ) {
            this.editorSettings[settingName] = mergedSettings[settingName];
            this.cmEditor.setOption(settingName, mergedSettings[settingName]);
          }
        }
      });
    }
  }
};
</script>

<style>
</style>
