<template>
  <div>
    <div class="pr-2 ml-6">
      <button @click="toggleActive" class="flex text-left break-all text-cda-light">
        <ChevronDownIcon class="flex-shrink-0 w-5 h-5 text-cda-accent" v-show="active" />
        <ChevronUpIcon class="flex-shrink-0 w-5 h-5 text-cda-accent" v-show="!active" />
        <FolderIcon class="flex-shrink-0 w-5 h-5 mx-1 text-cda-accent" />
        <span v-if="active" class="sr-only">Close Folder </span>
        <span v-else class="sr-only">Open Folder </span>
        <span>{{ folderprops.name }}</span>
      </button>
      <ul>
        <li v-for="item in folderprops.includes" class="pt-2" v-if="active">
          <file
            v-if="item.type == 'file'"
            :fileprops="item"
            :key="item.path"
            @file-clicked="$emit('file-clicked', $event)"
          />
          <folder v-else :folderprops="item" :key="item.path" @file-clicked="$emit('file-clicked', $event)" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import file from "./file.vue";
import { FolderIcon } from "@heroicons/vue/solid";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/outline";
import { ref } from "vue";

export default {
  props: {
    folderprops: {
      type: Object,
      required: true,
    },
  },
  components: {
    file,
    FolderIcon,
    ChevronDownIcon,
    ChevronUpIcon,
  },
  emits: ["file-clicked"],
  setup() {
    let active = ref(false);
    function toggleActive() {
      active.value = !active.value;
    }
    return { active, toggleActive };
  },
};
</script>

<style></style>
