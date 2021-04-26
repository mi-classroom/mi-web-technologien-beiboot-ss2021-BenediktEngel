<template>
  <span :class="indent" class="inline-block text-cda-light" @click="fileClicked" :key="fileprops.path">
      <PhotographIcon class="inline-block w-5 h-5 text-cda-accent" />
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
      depth:
      {
        type: Number,
        required: true
      },
    },
    methods:
    {
      fileClicked(){
        this.$emit("file-clicked", this.fileprops.path)
      }
    },
    computed:
    {
      indent(){
      return "pl-" + (this.depth*2)
      }
    }
  }
</script>

<style>
</style>
