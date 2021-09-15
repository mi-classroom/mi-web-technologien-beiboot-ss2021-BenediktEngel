<template>
  <div class="bg-cda-dark px-4 py-6">
    <div>
      <div class="text-cda-lighter">
        <MaterialIcon classes="" name="crop_16_9" />
        <span class="ml-2 align-top">Größe: {{ imageProps.width }}x{{ imageProps.height }}</span>
      </div>
      <button @click.prevent="toggleShowData">
        <MaterialIcon classes="text-cda-accent" name="list" />
        <span class="sr-only">Zeige IPTC-Daten</span>
        <span class="text-cda-lighter ml-2 align-top" aria-hidden>IPTC: -</span>
      </button>
    </div>
    <ImageData
      v-if="showData"
      :path="imageProps.path"
      @reset="toggleShowData"
      class="overflow-scroll max-h-96 scrollbar-thin scrollbar-thumb-cda-darker mt-6"
    />
  </div>
</template>

<script>
import { ref } from "vue";

import ImageData from "./ImageData.vue";
import MaterialIcon from "../../MaterialIcon.vue";

export default {
  props: {
    imageProps: Object,
  },
  components: { ImageData, MaterialIcon },
  setup(props) {
    let showData = ref(false);

    function toggleShowData() {
      showData.value = !showData.value;
    }
    
    return { showData, toggleShowData };
  },
};
</script>
