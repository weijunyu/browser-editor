<template>
  <div class="help-content">
    <div v-html="readmeHtmlString"></div>
    <footer>
      <a :href="packageInfo.repository.url">
        <i class="fab fa-github"></i>
        v{{ packageInfo.version }}
      </a>
    </footer>
  </div>
</template>

<script>
import readmeHtmlString from "../../README.md"; // markdown-loader + html-loader
import packageInfo from "../../package.json";

export default {
  data() {
    return {
      readmeHtmlString,
      packageInfo,
    };
  },
};
</script>

<style scoped>
footer {
  min-height: 32px;
  display: flex;
  margin-bottom: 4px;
}
footer > a {
  margin-right: 10px;
}
</style>
