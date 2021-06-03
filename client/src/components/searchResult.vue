<template>
  <div class="pl-2 mb-2">
    <h3 class="pt-1 text-lg font-bold text-cda-lightest">
      {{ searchType }}
      <span class="text-xs text-cda-dark"> ({{ resultLimit }} of {{ results.length }}) </span>
    </h3>
    <p v-if="results.length == 0" class="pl-4 text-cda-light">No matches found.</p>
    <ul v-if="results.length != 0">
      <li v-for="index in resultLimit" class="pt-2">
        <folder
          v-if="results[index - 1].item.type == 'directory'"
          :key="results[index - 1].item.path"
          :folderprops="results[index - 1].item"
          @file-clicked="$emit('file-clicked', $event)"
          class="-ml-6"
        />
        <file
          v-else
          :fileprops="results[index - 1].item"
          :key="results[index - 1].item.path"
          @file-clicked="$emit('file-clicked', $event)"
          class="-ml-12"
        ></file>
      </li>
    </ul>
    <button
      v-if="resultLimit < results.length"
      @click="setResultLimit()"
      class="float-right pt-2 pr-2 underline text-cda-accent"
    >
      Show more results
    </button>
  </div>
</template>

<script>
import file from "./file.vue";
import folder from "./folder.vue";
import Fuse from "fuse.js";
import { ref, watch } from "vue";

export default {
  props: {
    search: String,
    searchArray: Array,
    searchType: String,
  },
  components: {
    file,
    folder,
  },
  emits: ["file-clicked"],
  setup(props) {
    const resultLimit = ref(0);
    let results = [];
    watch(
      () => props.search,
      (newSearch) => {
        if (results.length > 0) {
          results.splice(0, results.length);
        }
        const fuseSearch = new Fuse(props.searchArray, { threshold: 0.6, ignoreLocation: true, keys: ["name"] });
        let temp = fuseSearch.search(newSearch);
        temp.forEach((result) => {
          results.push(result);
        });
        setResultLimit();
      }
    );
    function setResultLimit() {
      if (results.length < resultLimit.value + 10) {
        resultLimit.value = results.length;
      } else {
        resultLimit.value = resultLimit.value + 10;
      }
    }
    return { resultLimit, setResultLimit, results };
  },
};
</script>
