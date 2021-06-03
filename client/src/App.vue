<template>
  <div class="h-screen bg-cda-darkest">
    <header class="absolute inset-x-0 top-0 z-10 h-20 border-b border-cda-darker bg-cda-darkest">
      <h1 class="py-6 text-3xl font-semibold text-center text-cda-light">
        <span class="pr-2 text-cda-accent">cda_ </span>
        Imagedata-Viewer
      </h1>
    </header>
    <main class="absolute inset-0 z-0 flex w-full h-screen px-4 overflow-hidden">
      <div class="flex flex-col w-1/4 pt-20 pb-10 overflow-y-scroll border-r border-cda-darker">
        <div class="flex-row top-20">
          <h2 class="mt-6 mb-2 text-2xl text-cda-light">Filetree</h2>
          <div class="relative mb-6">
            <label for="search" class="sr-only">Search</label>
            <div class="absolute inset-y-0 left-0 flex items-center">
              <SearchIcon class="w-6 h-6 ml-2 pointer-events-none text-cda-dark" />
            </div>
            <input
              type="search"
              v-model="search"
              name="search"
              id="search"
              class="block w-5/6 h-8 pl-10 rounded-sm text-cda-darker border-cda-darker bg-cda-light focus:ring-cda-accent focus:border-cda-accent sm:text-sm"
              placeholder="Search the tree"
            />
          </div>
        </div>
        <structure class="" @file-clicked="clicked" :search="search" />
      </div>
      <div class="flex-col w-3/4 pt-20">
        <p v-if="!showImage && !showJson" class="pt-32 text-2xl text-center text-cda-dark">
          Choose an image from the file-tree to see the data.
        </p>
        <div v-if="showImage" class="grid grid-cols-3">
          <h2 class="absolute w-full py-6 pl-6 text-2xl text-cda-light bg-cda-darkest">
            Imagedata for
            <span class="font-mono text-lg text-cda-accent">
              {{ clickedFile }}
            </span>
          </h2>
          <imageData v-if="showImage" class="col-span-2 pt-20" :path="clickedFile" />
          <previewImage v-if="showImage" class="col-span-1 pt-20" :path="clickedFile" />
        </div>
        <folderData v-if="showJson" :path="clickedFile" />
      </div>
    </main>
  </div>
</template>

<script>
import structure from "./components/structure.vue";
import previewImage from "./components/previewImage.vue";
import imageData from "./components/imageData.vue";
import folderData from "./components/folderData.vue";
import { SearchIcon } from "@heroicons/vue/outline";
import { ref } from "vue";

export default {
  components: {
    structure,
    previewImage,
    imageData,
    folderData,
    SearchIcon,
  },
  setup() {
    let clickedFile = ref("");
    let search = ref("");
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
    return { clickedFile, search, clicked, showImage, showJson };
  },
};

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style></style>
