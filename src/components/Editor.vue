<template>
  <div v-bind:id="editorId + '-wrapper'">
    <textarea v-bind:id="editorId"></textarea>
  </div>
</template>

<script>
import CodeMirror from "codemirror";
import FileSaver from "file-saver";

import { EventBus } from "../utils";

import config from "../config";

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
    // Update id attribute of CodeMirror div node for actual editor
    let cmEditorElement = this.cmEditor.getWrapperElement();
    cmEditorElement.id = `${this.editorId}-element`;

    // When theme is changed
    EventBus.$on("set-theme", themeName => {
      this.cmEditor.setOption("theme", themeName);
    });

    if (this.editorId === "editor-current-settings") {
      // When mounted, take settings from editor-main
      EventBus.$on("current-settings", currentSettings => {
        let displayedSettings = {};
        // Only show non-default values, from configurables
        for (let settingName of Object.keys(currentSettings)) {
          if (
            config.configurables.includes(settingName) &&
            CodeMirror.defaults[settingName] !== currentSettings[settingName]
          ) {
            displayedSettings[settingName] = currentSettings[settingName];
          }
        }
        this.cmEditor.setValue(JSON.stringify(displayedSettings, null, 2));
      });
      EventBus.$emit("current-settings-editor-mounted");

      // When changing settings
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
      for (let key of Object.keys(this.cmEditor.options)) {
        if (config.configurables.includes(key)) {
          this.editorSettings[key] = this.cmEditor.getOption(key);
        }
      }

      // When opening settings editor, give it current settings
      EventBus.$on("current-settings-editor-mounted", () => {
        EventBus.$emit("current-settings", this.editorSettings);
      });

      // When current settings editor is changed
      EventBus.$on("new-settings-available", newSettings => {
        // Merge new settings with defaults
        let mergedSettings = Object.assign(
          {},
          this.editorSettings,
          newSettings
        );
        // Compare merged settings with current settings. For ones that do not equate, change the current settings
        for (let settingName of Object.keys(mergedSettings)) {
          if (
            mergedSettings[settingName] !== this.editorSettings[settingName] &&
            config.configurables.includes(settingName)
          ) {
            this.editorSettings[settingName] = mergedSettings[settingName];
            this.cmEditor.setOption(settingName, mergedSettings[settingName]);
          }
        }
      });

      EventBus.$on("set-mode", newMode => {
        this.cmEditor.setOption("mode", newMode);
      });

      EventBus.$on("save-file", (options) => {
        let blob = new Blob([this.cmEditor.getValue()], {
          type: "text/plain;charset=utf-8"
        });
        FileSaver.saveAs(blob, `file.${options.mode.fileExtension}`);
      });

      EventBus.$on('file-loaded', contents => {
        this.cmEditor.setValue(contents);
      })
    }
  }
};
</script>

<style></style>
