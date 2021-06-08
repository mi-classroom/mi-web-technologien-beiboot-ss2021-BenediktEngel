<template>
  <div class="h-screen pb-32 overflow-y-scroll">
    <ul v-if="imageData.data" class="px-8">
      <li v-for="(item, key) in imageData.data">
        <dataList :element="item" :name="key" open="true" />
      </li>
    </ul>
  </div>
</template>

<script>
import { getCurrentInstance } from "@vue/runtime-core";
import dataList from "./dataList.vue";
import { ref, watch } from "vue";
export default {
  props: {
    path: {
      type: String,
    },
  },
  components: {
    dataList,
  },
  setup(props) {
    const axios = getCurrentInstance().appContext.config.globalProperties.axios;
    let imageData = ref([]);
    getData(props.path);
    watch(
      () => props.path,
      (newPath) => {
        getData(newPath);
      }
    );
    function getData(path) {
      axios.post(import.meta.env.VITE_APP_SERVER + "/data", { filepath: path }).then((response) => {
        imageData.value = response.data;
      });
    }
    return { imageData };
  },
};
</script>

<style></style>
