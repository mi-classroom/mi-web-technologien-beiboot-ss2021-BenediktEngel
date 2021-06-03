<template>
  <div>
    <button
      class="flex pr-2 ml-12 text-left break-all text-cda-light"
      @click="$emit('file-clicked', fileprops.path)"
      :key="fileprops.path"
    >
      <PhotographIcon class="flex-shrink-0 w-5 h-5 mr-1 text-cda-accent" />
      <span class="sr-only">Select File </span>
      <span>{{ fileprops.name }}</span>
    </button>
  </div>
</template>

<script>
import { PhotographIcon } from "@heroicons/vue/solid";

export default {
  props: {
    fileprops: {
      type: Object,
      required: true,
    },
  },
  components: {
    PhotographIcon,
  },
  emits: ["file-clicked"],
  setup() {
    return {};
  },
};
</script>

<style></style>
