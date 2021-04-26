<template >
  <div class="bg-cda-darkest">
    <h1 class="py-4 text-3xl font-semibold text-center text-cda-light"><span class="pr-2 text-cda-accent">cda_</span>  Imagedata-Viewer </h1>
    <div class="grid h-screen grid-cols-12 px-4 mt-2">
      <structure class="col-span-3 border-t border-r border-cda-dark" @file-clicked="fileClicked"></structure>
      <imageData class="col-span-6 border-t border-r border-cda-dark" :path="clickedFile"></imageData>
      <previewImage class="col-span-3 border-t border-cda-dark" :path="clickedFile"></previewImage>
    </div>
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
