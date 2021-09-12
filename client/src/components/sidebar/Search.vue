<template>
  <div class=" mb-6">
    <h2 class="sr-only">
      Files and folders
    </h2>
    <div class="relative mb-1">
      <label for="search" class="sr-only">Search</label>
      <div class="absolute inset-y-0 left-0 flex items-center">
        <SearchIcon class="w-6 h-6 ml-2 mb-1 pointer-events-none text-cda-accent" />
      </div>
      <input
        type="search"
        v-model="search"        
        @input="$emit('searchChanged', $event.target.value)"
        name="search"
        id="search"
        class="block w-5/6 h-10 pl-10 text-cda-lighter border-cda-accent border-b-s bg-cda-darker sm:text-sm"
      />
    </div>
    <p class="leading-normal text-cda-light inline">
      <FolderIcon class="w-4 h-4 pointer-events-none inline" />
      <span class="align-middle pl-2">
        <span v-if="searchResults > 1 || searchResults === 0">
          {{ searchResults }} Verzeichnisse
        </span>
        <span v-else>
          {{ searchResults }} Verzeichnis
        </span>
        gefunden
      </span>
    </p>
  </div> 
</template>

<script>
import { ref } from "vue";

import { SearchIcon, FolderIcon } from "@heroicons/vue/outline";

export default {
  props: {
    searchResults: Number
  },
  components: {
    SearchIcon,
    FolderIcon
  },
  setup(props) {
    let search = ref("");
    let searchResults = ref(props.searchResults);

    return { search, searchResults };
  },
};
</script>
