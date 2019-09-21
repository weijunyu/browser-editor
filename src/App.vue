<template>
  <div id="app">
    <BrowserEditor />
  </div>
</template>

<script>
import BrowserEditor from "./components/BrowserEditor.vue";
import { mapActions } from "vuex";
export default {
  name: "app",
  components: {
    BrowserEditor
  },
  methods: {
    ...mapActions(["initializeAuth"])
  },
  created() {
    this.initializeAuth();
  }
};
</script>