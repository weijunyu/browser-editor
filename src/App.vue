<template>
  <div id="app">
    <BrowserEditor />
  </div>
</template>

<script>
import BrowserEditor from "./components/BrowserEditor.vue";
export default {
  name: "app",
  components: {
    BrowserEditor
  }
};
</script>

<style>
:root {
  --color-dark-primary: #3a405a;
  --color-dark-secondary: #444a61;
  --color-light-primary: #eef0f2;
  --color-light-secondary: #afafaf;
  --color-fail: #fb3640;
  --color-success: #9dbf9e;
  --color-highlight: #7afdd6;
  --color-disabled: #646464;
}
</style>