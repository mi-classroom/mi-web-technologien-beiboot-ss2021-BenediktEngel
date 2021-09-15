<template>
  <div>
    <button @click.prevent="goBack()" v-if="prevPath.length !== 1">
      <MaterialIcon classes="ml-1 text-cda-accent" name="chevron_left" />
      <span class="ml-1 text-cda-lighter align-top" aria-hidden>...</span>
      <span class="sr-only">Zurück zu vorherigem Ordner</span>
    </button>
    <ul>
      <li v-if="structure.length" v-for="index in limit" class="pt-2">
        <folder
          v-if="structure[index - 1].type === 'directory'"
          :key="structure[index - 1].path"
          :folderprops="structure[index - 1]"
          @folderSelected="selectFolder"
          @jsonSelected="$emit('jsonSelected', $event)"
        />
        <file
          v-else
          :fileprops="structure[index - 1]"
          :key="structure[index - 1].path"
          @imageSelected="$emit('imageSelected', $event)"
        ></file>
      </li>
    </ul>
    <button v-if="limit < structure.length" @click="setLimit()" class="float-right pt-2 pr-2 underline text-cda-accent">
      Show more results
    </button>
  </div>
</template>

<script>
import { getCurrentInstance } from "@vue/runtime-core";
import { ref, watch } from "vue";
import Fuse from "fuse.js";

import file from "./structure/file.vue";
import folder from "./structure/folder.vue";
import MaterialIcon from "../MaterialIcon.vue";

export default {
  props: {
    search: String,
  },
  components: {
    folder,
    file,
    MaterialIcon,
  },
  emits: ["folderSelected", "jsonSelected", "imageSelected", "results", "showSearch"],
  setup(props, { emit }) {
    const axios = getCurrentInstance().appContext.config.globalProperties.axios;
    let tree = [];
    let limit = ref(0);
    let prevPath = ref([""]);
    let structure = ref([]);

    getData("");

    async function getData(path) {
      tree = [];
      let output = await axios.post(import.meta.env.VITE_APP_SERVER + "/structure", { filepath: path });
      tree = output.data.structure;
      structure.value = tree;
      setLimit();
      emit("results", structure.value.length);
    }

    function setLimit() {
      if (structure.value.length < limit.value + 10) {
        limit.value = structure.value.length;
      } else {
        limit.value = limit.value + 10;
      }
    }

    function selectFolder(props) {
      prevPath.value.push(props);
      getData(props.path);
      emit("folderSelected", props);
    }

    function goBack() {
      prevPath.value.pop();
      let activePath = prevPath.value[prevPath.value.length - 1];
      getData(activePath !== "" ? activePath.path : "");
      if (activePath !== "") {
        emit("folderSelected", activePath);
      } else {
        emit("showSearch");
      }
    }

    watch(
      () => props.search,
      (newSearch) => {
        if (newSearch === "") {
          structure.value = tree;
          emit("results", structure.value.length);
        } else {
          let results = [];
          const fuseSearch = new Fuse(tree, { threshold: 0.6, ignoreLocation: true, keys: ["name"] });
          let temp = fuseSearch.search(newSearch);
          temp.forEach((result) => {
            results.push(result.item);
          });
          structure.value = results;
          setLimit();
          emit("results", structure.value.length);
        }
      }
    );

    return {
      limit,
      setLimit,
      selectFolder,
      goBack,
      prevPath,
      structure,
    };
  },
};
</script>
