<template>
  <div>
    <div v-show="search != ''">
      <searchResult
        :search="search"
        :searchArray="tree"
        searchType="Folders"
        @file-clicked="$emit('file-clicked', $event)"
      />
      <searchResult
        :search="search"
        :searchArray="files"
        searchType="Files"
        @file-clicked="$emit('file-clicked', $event)"
      />
    </div>
    <ul>
      <li v-if="search == ''" v-for="index in limit" class="pt-2 -ml-6">
        <folder
          v-if="tree[index - 1].type == 'directory'"
          :key="tree[index - 1].path"
          :folderprops="tree[index - 1]"
          @file-clicked="$emit('file-clicked', $event)"
        />
        <file
          v-else
          :fileprops="tree[index - 1]"
          :key="tree[index - 1].path"
          @file-clicked="$emit('file-clicked', $event)"
        ></file>
      </li>
    </ul>
    <button v-if="limit < tree.length" @click="setLimit()" class="float-right pt-2 pr-2 underline text-cda-accent">
      Show more results
    </button>
  </div>
</template>

<script>
import { getCurrentInstance } from "@vue/runtime-core";
import file from "../file.vue";
import folder from "../folder.vue";
import searchResult from "../searchResult.vue";
import { ref } from "vue";

export default {
  props: {
    search: String,
  },
  components: {
    folder,
    file,
    searchResult,
  },
  emits: ["file-clicked"],
  setup() {
    let tree = ref([]);
    let files = [];
    let limit = ref(0);
    const axios = getCurrentInstance().appContext.config.globalProperties.axios;

    axios.get(import.meta.env.VITE_APP_SERVER + "/structure").then((response) => {
      tree.value = response.data;
      setLimit();
      getFiles(tree.value);
    });
    function getFiles(folderstruct) {
      folderstruct.forEach((element) => {
        if (element.type == "directory") {
          getFiles(element.includes);
        } else {
          files.push(element);
        }
      });
    }
    function setLimit() {
      if (tree.value.length < limit.value + 10) {
        limit.value = tree.value.length;
      } else {
        limit.value = limit.value + 10;
      }
    }
    return { tree, files, limit, setLimit };
  },
};
</script>

<style></style>
