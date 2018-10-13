<template>
  <div id="app">
    <Editor></Editor>
  </div>
</template>

<script>
import Editor from "./components/Editor.vue";
export default {
  name: "app",
  components: {
    Editor
  }
};
</script>

<style>
#app {
  font-family: sans-serif;
}
</style>
