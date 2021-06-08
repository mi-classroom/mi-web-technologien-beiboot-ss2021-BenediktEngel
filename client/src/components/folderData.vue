<template>
  <div>
    <h2 class="absolute w-full py-6 pl-6 text-2xl text-cda-light bg-cda-darkest">
      Folderdata for
      <span class="font-mono text-lg text-cda-accent">
        {{ folderData.folder }}
      </span>
    </h2>
    <div class="h-screen pt-20 pb-32 overflow-y-scroll">
      <ul v-if="folderData.data" class="px-8">
        <li v-for="(item, key) in folderData.data.imageStack">
          <dataList :element="item" :name="key" open="true" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from "@vue/runtime-core";
import { ref, watch } from "vue";
import dataList from "./dataList.vue";

export default {
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  components: { dataList },
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
