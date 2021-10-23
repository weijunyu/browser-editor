<template>
  <nav
    class="sidebar"
    :style="sidebarStyle"
  >
    <ul v-show="sidebar">
      <li>
        <!-- outer: a element is flex with justified content -->
        <a
          :class="{ active: menus.modes }"
          @click="toggleMenu('modes')"
        >
          <!-- outer: div is left-aligned in parent a -->
          <div>
            <!-- inner: div contains centered icon -->
            <div>
              <i class="fas fa-code" />
            </div>
            <!-- inner: actual text -->
            mode
          </div>
          <div>
            <small>{{ mode.name }}</small>
            <transition name="slide-fade-left">
              <i
                v-show="!menus.modes && sidebar"
                class="fas fa-angle-right"
              />
            </transition>
            <transition name="slide-fade-right">
              <i
                v-show="menus.modes && sidebar"
                class="fas fa-angle-left"
              />
            </transition>
          </div>
        </a>
      </li>
      <li>
        <a
          :class="{ active: menus.themes }"
          @click="toggleMenu('themes')"
        >
          <div>
            <div>
              <i class="fas fa-palette" />
            </div>
            theme
          </div>
          <div>
            <small :style="{ width: '70px', textAlign: 'right' }">
              {{ theme }}
            </small>
            <i
              v-show="!menus.themes && sidebar"
              class="fas fa-angle-right"
            />
            <i
              v-show="menus.themes && sidebar"
              class="fas fa-angle-left"
            />
          </div>
        </a>
      </li>
      <li>
        <a
          :class="{ active: menus.settings }"
          @click="toggleMenu('settings')"
        >
          <div>
            <div>
              <i class="fas fa-cogs" />
            </div>
            settings
          </div>
          <i
            v-show="!menus.settings && sidebar"
            class="fas fa-angle-right"
          />
          <i
            v-show="menus.settings && sidebar"
            class="fas fa-angle-left"
          />
        </a>
      </li>
      <li>
        <a
          :class="{ active: menus.help }"
          @click="toggleMenu('help')"
        >
          <div>
            <div>
              <i class="fas fa-info" />
            </div>
            help
          </div>
          <i
            v-show="!menus.help && sidebar"
            class="fas fa-angle-right"
          />
          <i
            v-show="menus.help && sidebar"
            class="fas fa-angle-left"
          />
        </a>
      </li>
      <li>
        <input
          id="file-loader"
          type="file"
          name="file-loader"
          class="file-loader-hidden"
          @change="loadFile"
        >
        <label
          for="file-loader"
          class="file-loader-button menu-button"
        >
          <div>
            <div>
              <i class="fas fa-file" />
            </div>
            open file
          </div>
        </label>
      </li>
      <li>
        <a @click="emitSaveFileEvent">
          <div>
            <div>
              <i class="fas fa-save" />
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
          :disabled="!isModeXmlOrJson"
          @click="compressContents"
        >
          <i class="fas fa-compress-arrows-alt" />
        </button>
      </div>
      <div id="expand-contents-button">
        <button
          type="button"
          class="sidebar-bottom-button"
          :disabled="!isModeXmlOrJson"
          @click="expandContents"
        >
          <i class="fas fa-expand-arrows-alt" />
        </button>
      </div>
      <button
        class="sidebar-bottom-button"
        type="button"
        @click="toggleSidebar"
      >
        <i
          v-if="sidebar"
          class="fas fa-angle-left"
        />
        <i
          v-if="!sidebar"
          class="fas fa-angle-right"
        />
      </button>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { EventBus } from "../utils";

export default {
  computed: {
    ...mapState({
      menus: (state) => state.browserEditor.menus,
      sidebar: (state) => state.browserEditor.sidebar,
      mode: (state) => state.browserEditor.mode,
      theme: (state) => state.browserEditor.theme,
    }),
    sidebarStyle() {
      if (this.sidebar) {
        return {
          "margin-left": 0,
        };
      }
      return {
        "margin-left": "-162px",
        "flex-direction": "column-reverse",
      };
    },
    isModeXmlOrJson() {
      return this.mode.name === "xml" || this.mode.name === "json";
    },
  },
  methods: {
    ...mapActions(["toggleMenu", "toggleSidebar"]),
    ...mapMutations({
      setStoreMode: "setMode",
      setStoreTheme: "setTheme",
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
        mode: this.mode,
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
    },
  },
};
</script>

<style scoped>
.sidebar ul > li > a div > div > i.fas {
  margin-right: 0.2rem;
}
.sidebar ul > li > a div > small {
  margin-right: 0.2rem;
}

.slide-fade-left-enter, .slide-fade-left-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
.slide-fade-left-enter-active, .slide-fade-left-leave-active {
  transition: all 0.2s;
}

.slide-fade-right-enter, .slide-fade-right-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.slide-fade-right-enter-active, .slide-fade-right-leave-active {
  transition: all 0.2s;
}
</style>
