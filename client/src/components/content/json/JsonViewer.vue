<template>
  <div>
    <h2 class="sr-only">Ordnerdaten für {{ folderData.folder }}</h2>
    <div class="h-screen pt-10 pb-32 mr-2 overflow-y-scroll scrollbar-thumb-cda-light scrollbar-thin">
      <ul v-if="folderData.data" class="px-8">
        <MaterialIcon classes="text-cda-lightest transform rotate-90 align-top" name="arrow_right" />
        <span class="text-cda-accent font-code" aria-hidden>{</span>
        <li v-for="(item, key) in folderData.data" class="flex">
          <ViewerItem
            :element="item"
            :name="key"
            :depth="0"
            class="ml-7 border-l border-dotted border-cda-lighten_strong"
          />
        </li>
        <span class="text-cda-light pl-6 font-code" aria-hidden>}</span>
      </ul>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from "@vue/runtime-core";
import { ref, watch } from "vue";

import ViewerItem from "./ViewerItem.vue";
import MaterialIcon from "../../MaterialIcon.vue";

export default {
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  components: { ViewerItem, MaterialIcon },
  setup(props) {
    const axios = getCurrentInstance().appContext.config.globalProperties.axios;
    let folderData = ref([]);

    getData(props.path);

    watch(
      () => props.path,
      (newPath) => {
        getData(newPath);
      }
    );

    function getData(path) {
      axios.post(import.meta.env.VITE_APP_SERVER + "/json", { filepath: path }).then((response) => {
        folderData.value = response.data;
      });
    }

    return { folderData };
  },
};
</script>
