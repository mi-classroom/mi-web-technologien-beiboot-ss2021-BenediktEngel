<template>
  <div>
    <div class="relative">
      <ImageButtonGroup 
        @zoomIn="notImplemented" 
        @zoomOut="notImplemented" 
        @zoomReset="notImplemented" 
        @fullscreen="notImplemented" 
      />
    </div>
    <div class="flex flex-col items-center px-4">
      <img :src="image" class=" h-screen" />
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from "@vue/runtime-core";
import { ref, watch } from "vue";

import ImageButtonGroup from "./ImageButtonGroup.vue"

export default {
  props: {
    path: {
      type: String,
    },
  },
  components: {
    ImageButtonGroup,
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

    function notImplemented(){
      alert("Diese Funktion ist noch nicht implementiert!")
    }

    return { image, notImplemented };
  },
};
</script>
