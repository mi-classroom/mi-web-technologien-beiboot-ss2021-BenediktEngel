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
          <h2 class="pl-6 my-6 text-2xl text-cda-light">
            Filetree
          </h2>
        </div>
        <structure class="pt-20" @file-clicked="fileClicked" />
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

  export default {
    components: {
      structure,
      previewImage,
      imageData
    },
    data() {
      return {
        clickedFile: ""
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
