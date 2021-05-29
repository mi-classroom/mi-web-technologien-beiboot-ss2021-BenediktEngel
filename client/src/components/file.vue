<template>
  <button class="inline-block pr-2 ml-2 text-left break-all text-cda-light" @click="fileClicked" :key="fileprops.path">
      <PhotographIcon class="inline-block w-5 h-5 mr-2 text-cda-accent" />
      <span class="sr-only">Select File </span>
      {{ fileprops.name }}
  </button>
</template>

<script>
  import { PhotographIcon } from '@heroicons/vue/solid'

  export default {
    name: "file",
    components:
    {
      PhotographIcon
    },
    props:
    {
      fileprops:
      {
        type: Object,
        required: true
      },
    },
    methods:
    {
      fileClicked(){
        this.$emit("file-clicked", this.fileprops.path)
      }
    }
  }
</script>

<style>
</style>
