<template>
  <div class="bg-cda-dark px-4 py-6">
    <div>
      <div class="text-cda-lighter ">
        <PhotographIcon class="h-4 w-4 inline-block" />
        <span class="pl-2">Größe: {{imageProps.width}}x{{imageProps.height}}</span>
      </div>
      <button @click.prevent="toggleShowData">
        <AdjustmentsIcon class="h-4 w-4 text-cda-accent rotate-90 transform inline-block" />
        <span class="sr-only">Zeige </span>
        <span class="text-cda-lighter pl-2">IPTC: -</span>
        <span class="sr-only">-Daten</span>
      </button>
    </div>
    <ImageData v-if="showData" :path="imageProps.clickedFile" @reset="toggleShowData" class="overflow-scroll max-h-96 scrollbar-thin scrollbar-thumb-cda-darker mt-6" />
  </div>
</template>

<script>
import { ref } from "vue";

import { AdjustmentsIcon } from "@heroicons/vue/solid";
import { PhotographIcon } from "@heroicons/vue/outline";
import ImageData from "./ImageData.vue";

export default {
  props: {
    imageProps: Object
  },
  components: {
    AdjustmentsIcon,
    PhotographIcon,
    ImageData
  },
  setup(props) {
    let showData = ref(false);
    function toggleShowData() {
      showData.value = !showData.value;
    }
    return { showData, toggleShowData };
  },
};
</script>
