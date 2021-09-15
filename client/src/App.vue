<template>
  <div class="h-screen bg-cda-darkest">
    <Header />
    <main class="absolute inset-0 z-background flex w-full h-screen overflow-hidden">
      <div class="flex flex-col w-1/4 pt-24 px-8 pb-10 overflow-y-hidden bg-cda-darker">
        <Search v-if="showSearch" :folderCount="folderCount" @searchChanged="searchChanged" />
        <FolderInformation v-else :folderProps="folderProps" />
        <Structure
          class="overflow-y-scroll scrollbar-none"
          @folderSelected="folderSelected"
          @results="setResults"
          @showSearch="showSearch = true"
          @jsonSelected="jsonSelected"
          @imageSelected="imageSelected"
          :search="search"
        />
      </div>
      <div class="flex-col w-3/4">
        <p v-if="!showImage && !showJson" class="pt-32 text-2xl text-center text-cda-light">
          Wähle einen Ordner oder eine Datei aus der Liste!
        </p>
        <div v-if="showImage" class="relative">
          <PreviewImage class="h-screen" :path="imageProps.path" />
          <ImageSettings :imageProps="imageProps" class="absolute left-0 right-0 bottom-0" />
        </div>
        <JsonViewer v-if="showJson" :path="jsonPath" />
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from "vue";

import Header from "./components/sidebar/Header.vue";
import Search from "./components/sidebar/Search.vue";
import Structure from "./components/sidebar/Structure.vue";
import FolderInformation from "./components/sidebar/FolderInformation.vue";
import PreviewImage from "./components/content/image/PreviewImage.vue";
import ImageSettings from "./components/content/image/ImageSettings.vue";
import JsonViewer from "./components/content/json/JsonViewer.vue";

export default {
  components: {
    Header,
    Search,
    FolderInformation,
    Structure,
    ImageSettings,
    PreviewImage,
    JsonViewer,
  },
  setup() {
    let search = ref("");
    let folderCount = ref(0);
    let showSearch = ref(true);
    let folderProps = ref({
      subfolders: 0,
      images: 0,
      name: "",
      path: "",
    });
    let imageProps = ref({});
    let showImage = ref(false);
    let showJson = ref(false);
    let jsonPath = ref("");

    function searchChanged(newSearch) {
      search.value = newSearch;
    }
    function folderSelected(props) {
      search.value = "";
      let folderCount = 0;
      let imageCount = 0;
      props.includes.forEach((el) => {
        if (el.type == "file") {
          imageCount++;
        } else {
          folderCount++;
        }
      });
      folderProps.value = {
        subfolders: folderCount,
        images: imageCount,
        name: props.name,
        path: props.path,
      };
      showSearch.value = false;
    }
    function setResults(resultLength) {
      folderCount.value = resultLength;
    }

    function jsonSelected(path) {
      showJson.value = true;
      showImage.value = false;
      jsonPath.value = path;
    }
    function imageSelected(path) {
      showJson.value = false;
      showImage.value = true;
      imageProps.value = {
        width: 15,
        height: 15,
        path,
      };
    }
    return {
      search,
      showImage,
      showJson,
      folderCount,
      searchChanged,
      showSearch,
      folderProps,
      imageProps,
      folderSelected,
      setResults,
      jsonSelected,
      jsonPath,
      imageSelected,
    };
  },
};
</script>
