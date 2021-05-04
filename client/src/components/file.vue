<template>
  <span class="inline-block ml-2 cursor-pointer text-cda-light" @click="fileClicked" :key="fileprops.path">
      <PhotographIcon class="inline-block w-5 h-5 mr-2 text-cda-accent" />
      {{ fileprops.name }}
  </span>
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
