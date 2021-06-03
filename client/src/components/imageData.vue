<template>
  <div class="px-6">
    <div class="mt-5">
      <dl class="sm:divide-y sm:divide-gray-200" v-for="(item, key) in imageData.data">
        <div class="grid grid-cols-3 gap-4 py-2">
          <dt class="font-bold text-cda-dark">
            {{ key }}
          </dt>
          <dd class="col-span-2 font-medium text-cda-light">
            {{ item }}
          </dd>
        </div>
      </dl>
    </div>
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
