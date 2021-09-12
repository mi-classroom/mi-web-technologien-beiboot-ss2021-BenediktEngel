<template>
  <div class="absolute top-0 left-0 grid grid-cols-4 gap-2">
    <button @click.prevent="$emit('zoomIn')">
      <PlusSmIcon class="w-6 h-6 text-cda-light" />
      <span class="sr-only">Zoom in</span>
    </button>
    <button @click.prevent="$emit('zoomOut')">
      <MinusSmIcon class="w-6 h-6 text-cda-light" />
      <span class="sr-only">Zoom out</span>
    </button>
    <button class="text-cda-light text-2xl align-text-bottom" @click.prevent="$emit('zoomReset')">
      &bull;
      <span class="sr-only">Reset Zoom</span>
    </button>
    <button @click.prevent="$emit('fullscreen')">
      <ArrowsExpandIcon class="w-6 h-6 text-cda-light" />
      <span class="sr-only">Fullscreen</span>
    </button>
  </div>
</template>

<script>
import { PlusSmIcon, MinusSmIcon, ArrowsExpandIcon  } from "@heroicons/vue/outline";

export default {
  props: {},
  components: {
    PlusSmIcon,
    MinusSmIcon, 
    ArrowsExpandIcon
  },
  setup(props) {
    return {};
  },
};
</script>
