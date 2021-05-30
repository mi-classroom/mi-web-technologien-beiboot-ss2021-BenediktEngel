<template>
  <div class="h-screen bg-cda-darkest">
    <header class="absolute inset-x-0 top-0 z-10 h-20 border-b border-cda-darker bg-cda-darkest">
      <h1 class="py-6 text-3xl font-semibold text-center text-cda-light">
        <span class="pr-2 text-cda-accent">cda_ </span>
        Imagedata-Viewer
      </h1>
    </header>
    <main class="absolute inset-0 z-0 flex w-full h-screen px-4 overflow-hidden">
      <div class="flex-col w-2/5 pt-20 pb-10 overflow-y-scroll border-r xl:w-1/4 border-cda-darker">
        <div class="absolute w-2/5 border-r left-2 xl:w-1/4 border-cda-darker top-20 bg-cda-darkest">
          <h2 class="pl-6 mt-6 mb-2 text-2xl text-cda-light">
            Filetree
          </h2>
          <div class="relative mb-6 ml-6">
            <label for="search" class="sr-only">Search</label>
            <div class="absolute inset-y-0 left-0 flex items-center">
              <SearchIcon class="w-6 h-6 ml-2 pointer-events-none text-cda-dark"/>
            </div>
            <input type="search" v-model="search" name="search" id="search" class="block w-2/3 h-8 pl-10 rounded-sm text-cda-darker border-cda-darker bg-cda-light focus:ring-cda-accent focus:border-cda-accent sm:text-sm" placeholder="Search the tree" />
          </div>
        </div>
        <structure class="pt-28" @file-clicked="fileClicked" :search="search" />
      </div>
      <div class="flex-col w-3/5 pt-20 xl:w-3/4">
        <p v-if="clickedFile == ''" class="pt-32 text-2xl text-center text-cda-dark">
          Choose an image from the file-tree to see the data.
        </p>
        <div v-else class="grid grid-cols-3">
          <h2 class="col-span-3 py-6 pl-6 text-2xl text-cda-light">
            Imagedata for
            <span class="font-mono text-lg text-cda-accent">
              {{ clickedFile }}
            </span>
          </h2>
          <imageData v-if="clickedFile != ''" class="col-span-2" :path="clickedFile" />
          <previewImage v-if="clickedFile != ''" class="col-span-1" :path="clickedFile" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import structure from './components/structure.vue'
  import previewImage from './components/previewImage.vue'
  import imageData from './components/imageData.vue'
  import { SearchIcon } from '@heroicons/vue/outline'


  export default {
    components: {
      structure,
      previewImage,
      imageData,
      SearchIcon
    },
    data() {
      return {
        clickedFile: "",
        search: ""
      }
    },
    methods: {
      fileClicked(path) {
        this.clickedFile = path
        console.log(path)
      }
    }
  }

  // This starter template is using Vue 3 experimental <script setup> SFCs
  // Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>

</style>
