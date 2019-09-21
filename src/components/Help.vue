<template>
  <div class="help-content">
    <div v-html="readmeHtmlString"></div>
    <footer>
      <a :href="packageInfo.repository.url">
        <i class="fab fa-github"></i>
        v{{packageInfo.version}}
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
      packageInfo
    }
  }
}
</script>