<template>
  <div class="h-screen bg-cda-darkest">
    <Header />
    <main class="absolute inset-0 z-background flex w-full h-screen overflow-hidden">
      <div class="flex flex-col w-1/4 pt-24 px-8 pb-10 overflow-y-hidden bg-cda-darker">
        <Search v-if="showSearch" :searchResults="searchResults" @searchChanged="searchChanged" />
        <FolderInformation v-else :folderProps="folderProps" />
        <Structure class="overflow-y-scroll scrollbar-none" @file-clicked="clicked" :search="search" />
      </div>
      <div class="flex-col w-3/4">
        <p v-if="!showImage && !showJson" class="pt-32 text-2xl text-center text-cda-light">
          Choose an image from the file-tree to see the data.
        </p>
        <div v-if="showImage" class="relative">
          <PreviewImage v-if="showImage" class="h-screen" :path="clickedFile" />
          <ImageSettings :imageProps="imageProps" v-if="showImage" class="absolute left-0 right-0 bottom-0 " />
        </div>
        <JsonViewer v-if="showJson" :path="clickedFile" />
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from "vue";

import Header from "./components/sidebar/Header.vue";
import Search from "./components/sidebar/Search.vue";
import FolderInformation from "./components/sidebar/FolderInformation.vue";
import Structure from "./components/sidebar/Structure.vue";
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
    let clickedFile = ref("");
    let search = ref("");
    let searchResults = ref(0);
    // TODO: Anzahl der Ergebnisse
    let showSearch = ref(true);
    let folderProps = ref({
      subFolders: 5, 
      images: 1,
      name: "",
      path: ""
    });
    // TODO: Übergeben der folderdaten
    let imageProps = ref({
      width: 15,
      height: 15,
      path: "",
      clickedFile
    });
    // TODO: Übergeben der imagedaten
    let regexp = new RegExp("(.*).json$");
    let showImage = ref(false);
    let showJson = ref(false);
    function clicked(path) {
      clickedFile.value = path;
      if (clickedFile.value != "") {
        if (regexp.test(clickedFile.value)) {
          showJson.value = true;
          showImage.value = false;
        } else {
          showJson.value = false;
          showImage.value = true;
        }
      }
    }
    function searchChanged(newSearch){
      search.value = newSearch;
    }
    function toggleSearch(){
      showSearch.value = !showSearch.value;
    }
    return { clickedFile, search, clicked, showImage, showJson, searchResults, searchChanged, showSearch, folderProps, imageProps };
  },
};

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
* {
  outline: none;
}
</style>
