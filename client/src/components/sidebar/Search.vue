<template>
  <div class="mb-6">
    <h2 class="sr-only">Ordner und Dateien</h2>
    <div class="relative mb-1">
      <label for="search" class="sr-only">Suche</label>
      <div class="absolute inset-y-0 left-0 flex items-center">
        <MaterialIcon classes="ml-2 mb-1 pointer-events-none text-cda-accent" name="search" />
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
    <p class="leading-normal text-cda-light pt-4">
      <MaterialIcon classes="align-bottom" name="folder_open" />
      <span class="pl-2">
        <span v-if="folderCount > 1 || folderCount === 0"> {{ folderCount }} Verzeichnisse </span>
        <span v-else> {{ folderCount }} Verzeichnis </span>
        gefunden
      </span>
    </p>
  </div>
</template>

<script>
import { ref } from "vue";

import MaterialIcon from "../MaterialIcon.vue";

export default {
  props: {
    folderCount: Number,
  },
  components: {
    MaterialIcon,
  },
  setup(props) {
    let search = ref("");

    return { search };
  },
};
</script>
