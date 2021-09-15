<template>
  <div class="pr-2">
    <div class="flex">
      <button @click="$emit('folderSelected', folderprops)" class="flex text-left break-all text-cda-light">
        <MaterialIcon :classes="'flex-shrink-0 w-5 h-5 mx-1 mr-2 text-cda-accent'" name="folder_open" />
        <span class="sr-only">Öffne Ordner </span>
        <span>{{ folderprops.name }}</span>
      </button>
      <button v-if="folderprops.json" @click="$emit('jsonSelected', folderprops.json)">
        <span class="sr-only">Zeige Ordner Informationen</span>
        <MaterialIcon classes="flex-shrink-0 w-5 h-5 ml-1 text-cda-accent" name="description" />
      </button>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from "@vue/runtime-core";
import { ref } from "vue";

import file from "./file.vue";
import MaterialIcon from "../../MaterialIcon.vue";

export default {
  props: {
    folderprops: {
      type: Object,
      required: true,
    },
  },
  components: {
    file,
    MaterialIcon,
  },
  emits: ["jsonSelected", "folderSelected"],
  setup(props) {
    return {};
  },
};
</script>
