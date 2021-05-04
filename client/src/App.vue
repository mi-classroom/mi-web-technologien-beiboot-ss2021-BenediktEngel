<template >
  <div class="h-screen overflow-y-hidden bg-cda-darkest">
    <header>
      <h1 class="py-4 text-3xl font-semibold text-center text-cda-light">
        <span class="pr-2 text-cda-accent">cda_ </span>
          Imagedata-Viewer
      </h1>
    </header>
    <main class="grid h-full grid-cols-4 px-4 mt-2 ">
      <structure class="col-span-1 overflow-y-scroll border-t border-r border-cda-darker" @file-clicked="fileClicked"></structure>
      <p v-if="clickedFile == ''" class="col-span-3 pt-32 text-2xl text-center border-t border-cda-darker text-cda-dark">
        Choose an image from the file-tree to see the data.
      </p>
      <div v-else class="col-span-3" >
        <h2 class="pt-6 pb-6 pl-6 text-2xl border-t text-cda-light border-cda-darker">
          Imagedata for
          <span class="font-mono text-lg text-cda-accent">
            {{ clickedFile }}
          </span>
        </h2>
        <div class="grid h-full grid-cols-3">
          <imageData v-if="clickedFile != ''" class="col-span-2 border-cda-darker" :path="clickedFile"></imageData>
          <previewImage v-if="clickedFile != ''" class="col-span-1 border-cda-darker" :path="clickedFile"></previewImage>
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
  data(){
    return {
      clickedFile: ""
    }
  },
  methods:{
    fileClicked(path){
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
