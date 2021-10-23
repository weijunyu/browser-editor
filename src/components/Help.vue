<template>
  <div class="help-content">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="readmeHtmlString" />
    <footer>
      <a :href="packageInfo.repository.url">
        <i class="fab fa-github" />
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
