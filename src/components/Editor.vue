<template>
  <div v-bind:id="editorId + '-wrapper'">
    <textarea v-bind:id="editorId"></textarea>
  </div>
</template>

<script>
import CodeMirror from "codemirror";
import FileSaver from "file-saver";
import PrettyData from "pretty-data"; // For XML minification/expansion
import Noty from "noty";
const pd = PrettyData.pd;

import { EventBus, sortObject } from "../utils";

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

    // When theme is changed from sidebar
    EventBus.$on("set-theme", themeName => {
      this.cmEditor.setOption("theme", themeName);
      localStorage.setItem("theme", themeName);
    });

    /**
     * Logic specific to current settings editor
     */
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
      // Tell editor-main to send its current settings
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

    /**
     * Logic specific to main editor
     */
    if (this.editorId === "editor-main") {
      // Initialization for main editor
      this.editorSettings = {};
      // Populate editorSettings from cmEditor.options
      for (let key of Object.keys(this.cmEditor.options)) {
        if (config.configurables.includes(key)) {
          this.editorSettings[key] = this.cmEditor.getOption(key);
        }
      }
      // If settings exist in localStorage, apply them
      let savedSettings = localStorage.getItem("main-editor-settings");
      if (savedSettings) {
        let storedSettings = JSON.parse(savedSettings);
        for (let settingName of Object.keys(storedSettings)) {
          if (
            storedSettings[settingName] !== this.editorSettings[settingName]
          ) {
            this.cmEditor.setOption(settingName, storedSettings[settingName]);
            this.editorSettings[settingName] = storedSettings[settingName];
          }
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
            localStorage.setItem(
              "main-editor-settings",
              JSON.stringify(sortObject(this.editorSettings))
            );
          }
        }
      });

      EventBus.$on("set-mode", newMode => {
        this.cmEditor.setOption("mode", newMode);
        localStorage.setItem("mode", newMode);
      });

      EventBus.$on("save-file", options => {
        let blob = new Blob([this.cmEditor.getValue()], {
          type: "text/plain;charset=utf-8"
        });
        FileSaver.saveAs(blob, `file.${options.mode.fileExtension}`);
      });

      EventBus.$on("file-loaded", contents => {
        this.cmEditor.setValue(contents);
      });

      let savedContent = localStorage.getItem("main-editor-content");
      if (savedContent) {
        this.cmEditor.setValue(savedContent);
      }

      EventBus.$on("compress-contents", modeName => {
        let contents = this.cmEditor.getValue();
        let minifiedContents;
        try {
          if (modeName === "json") {
            minifiedContents = JSON.stringify(JSON.parse(contents));
          }
          if (modeName === "xml") {
            minifiedContents = pd.xmlmin(contents);
          }
          this.cmEditor.setValue(minifiedContents);
        } catch (exception) {
          new Noty({
            text: `Error minifying ${modeName}, please check your syntax!`,
            timeout: 1200,
            type: "error",
            theme: "mint"
          }).show();
        }
      });

      EventBus.$on("expand-contents", modeName => {
        let contents = this.cmEditor.getValue();
        let prettyContents;
        try {
          if (modeName === "json") {
            prettyContents = JSON.stringify(JSON.parse(contents), null, 2);
          }
          if (modeName === "xml") {
            prettyContents = pd.xml(contents);
          }
          this.cmEditor.setValue(prettyContents);
        } catch (exception) {
          new Noty({
            text: `Error formatting ${modeName}, please check your syntax!`,
            timeout: 1200,
            type: "error",
            theme: "mint"
          }).show();
        }
      });

      window.onbeforeunload = () => {
        localStorage.setItem("main-editor-content", this.cmEditor.getValue());
      };
    }
  }
};
</script>

<style></style>
