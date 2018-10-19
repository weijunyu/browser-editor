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

import EventBus from "../EventBus";

export default {
  name: "editor",
  props: ["codeMirrorOptions", "editorId", "initialValue"],
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

    // If current settings editor, add listener for apply-settings button
    if (this.editorId === "editor-current-settings") {
      EventBus.$on("apply-settings", () => {
        EventBus.$emit("new-settings-available", this.cmEditor.getValue());
      });
    }

    if (this.editorId === "editor-main") {
      EventBus.$on("new-settings-available", newSettings => {
        let settings = Object.assign(
          {},
          CodeMirror.defaults,
          JSON.parse(newSettings)
        );
        for (let settingName of Object.keys(settings)) {
          this.cmEditor.setOption(settingName, settings[settingName]);
        }
      });
    }
  }
};
</script>

<style>
.CodeMirror {
  border: 1px solid #333333;
}
</style>
