<template>
  <nav class="sidebar" :style="sidebarStyle">
    <ul v-show="sidebar">
      <li>
        <!-- outer: a element is flex with justified content -->
        <a @click="toggleMenu('modes')" :class="{ active: menus.modes }">
          <!-- outer: div is left-aligned in parent a -->
          <div>
            <!-- inner: div contains centered icon -->
            <div>
              <i class="fas fa-code"></i>
            </div>
            <!-- inner: actual text -->
            mode
          </div>
          <div>
            <small>{{ mode.name }}</small
            >
            <i class="fas fa-angle-right" v-show="!menus.modes && sidebar"></i>
            <i class="fas fa-angle-left" v-show="menus.modes && sidebar"></i>
          </div>
        </a>
      </li>
      <li>
        <a @click="toggleMenu('themes')" :class="{ active: menus.themes }">
          <div>
            <div>
              <i class="fas fa-palette"></i>
            </div>
            theme
          </div>
          <div>
            <small :style="{ width: '70px', textAlign: 'right' }">
              {{ theme }} </small
            >
            <i class="fas fa-angle-right" v-show="!menus.themes && sidebar"></i>
            <i class="fas fa-angle-left" v-show="menus.themes && sidebar"></i>
          </div>
        </a>
      </li>
      <li>
        <a @click="toggleMenu('settings')" :class="{ active: menus.settings }">
          <div>
            <div>
              <i class="fas fa-cogs"></i>
            </div>
            settings
          </div>
          <i class="fas fa-angle-right" v-show="!menus.settings && sidebar"></i>
          <i class="fas fa-angle-left" v-show="menus.settings && sidebar"></i>
        </a>
      </li>
      <li>
        <a @click="toggleMenu('help')" :class="{ active: menus.help }">
          <div>
            <div>
              <i class="fas fa-info"></i>
            </div>
            help
          </div>
          <i class="fas fa-angle-right" v-show="!menus.help && sidebar"></i>
          <i class="fas fa-angle-left" v-show="menus.help && sidebar"></i>
        </a>
      </li>
      <li>
        <input
          type="file"
          name="file-loader"
          id="file-loader"
          class="file-loader-hidden"
          @change="loadFile"
        />
        <label for="file-loader" class="file-loader-button menu-button">
          <div>
            <div>
              <i class="fas fa-file"></i>
            </div>
            open file
          </div>
        </label>
      </li>
      <li>
        <a @click="emitSaveFileEvent">
          <div>
            <div>
              <i class="fas fa-save"></i>
            </div>
            save file
          </div>
        </a>
      </li>
    </ul>
    <div class="sidebar-bottom">
      <div id="compress-contents-button">
        <button
          type="button"
          class="sidebar-bottom-button"
          @click="compressContents"
          :disabled="!isModeXmlOrJson"
        >
          <i class="fas fa-compress-arrows-alt"></i>
        </button>
      </div>
      <div id="expand-contents-button">
        <button
          type="button"
          class="sidebar-bottom-button"
          @click="expandContents"
          :disabled="!isModeXmlOrJson"
        >
          <i class="fas fa-expand-arrows-alt"></i>
        </button>
      </div>
      <button
        class="sidebar-bottom-button"
        type="button"
        @click="toggleSidebar"
      >
        <i class="fas fa-angle-left" v-if="sidebar"></i>
        <i class="fas fa-angle-right" v-if="!sidebar"></i>
      </button>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { EventBus } from "../utils";

export default {
  methods: {
    ...mapActions(["toggleMenu", "toggleSidebar"]),
    ...mapMutations({
      setStoreMode: "setMode",
      setStoreTheme: "setTheme"
    }),
    loadFile(event) {
      let file = event.target.files[0];
      if (file) {
        let reader = new FileReader();
        reader.onload = () => {
          // Main Editor component listens to this event and set its value to file contents
          EventBus.$emit("file-loaded", reader.result);
        };
        reader.readAsText(file);
      }
    },
    emitSaveFileEvent() {
      EventBus.$emit("save-file", {
        mode: this.mode
      });
    },
    compressContents() {
      if (this.mode.name === "xml" || this.mode.name === "json") {
        EventBus.$emit("compress-contents", this.mode.name);
      }
    },
    expandContents() {
      if (this.mode.name === "xml" || this.mode.name === "json") {
        EventBus.$emit("expand-contents", this.mode.name);
      }
    }
  },
  computed: {
    ...mapState({
      menus: state => state.browserEditor.menus,
      sidebar: state => state.browserEditor.sidebar,
      mode: state => state.browserEditor.mode,
      theme: state => state.browserEditor.theme
    }),
    sidebarStyle() {
      if (this.sidebar) {
        return {
          "margin-left": 0
        };
      }
      return {
        "margin-left": "-162px",
        "flex-direction": "column-reverse"
      };
    },
    isModeXmlOrJson() {
      return this.mode.name === "xml" || this.mode.name === "json";
    }
  }
};
</script>

<style scoped>
.sidebar ul > li > a div > div > i.fas {
  margin-right: 0.2rem;
}
.sidebar ul > li > a div > small {
  margin-right: 0.2rem;
}
</style>
