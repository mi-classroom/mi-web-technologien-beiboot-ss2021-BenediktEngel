<template>
  <div class="flex flex-col items-center px-4 pt-4">
    <img :src="image" class="w-10/12" />
  </div>
</template>

<script>
import { getCurrentInstance } from "@vue/runtime-core";
import { ref, watch } from "vue";
export default {
  props: {
    path: {
      type: String,
    },
  },
  setup(props) {
    const axios = getCurrentInstance().appContext.config.globalProperties.axios;
    let image = ref("");
    getImage(props.path);
    watch(
      () => props.path,
      (newPath) => {
        getImage(newPath);
      }
    );
    function getImage(path) {
      axios.post(import.meta.env.VITE_APP_SERVER + "/image", { filepath: path }).then((response) => {
        image.value = "data:image/*;base64," + response.data;
      });
    }
    return { image };
  },
};
</script>

<style></style>
