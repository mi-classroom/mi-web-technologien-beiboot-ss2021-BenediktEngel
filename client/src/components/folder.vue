<template>
  <span class="inline-block pr-2 ml-2 break-all text-cda-light">
    <button @click="active = !active">
      <ChevronDownIcon class="inline-block w-5 h-5 text-cda-accent" v-show="active" />
      <ChevronUpIcon class="inline-block w-5 h-5 text-cda-accent"  v-show="!active" />
      <FolderIcon class="inline-block w-5 h-5 mx-2 text-cda-accent"/>
      <span v-show="active" class="sr-only">Close Folder </span>
      <span v-show="!active" class="sr-only">Open Folder </span>
      {{ folderprops.name }}
    </button>
    <ul>
      <li  v-for="item in folderprops.includes"  class="pt-2" v-if="active">
        <file v-if="item.type == 'file'"  :fileprops="item" :key="item.path" @file-clicked="fileClicked" />
        <folder v-else :folderprops="item" :key="item.path" @file-clicked="fileClicked"/>
      </li>
    </ul>
  </span>
</template>

<script>
  import file from "./file.vue";
  import { FolderIcon } from '@heroicons/vue/solid'
  import { ChevronDownIcon } from '@heroicons/vue/outline'
  import { ChevronUpIcon } from '@heroicons/vue/outline'

  export default {
    name: "folder",
    components:
    {
      file,
      FolderIcon,
      ChevronDownIcon,
      ChevronUpIcon
    },
    data(){
      return {
        active: false
      }
    },
    props:
    {
      folderprops:
      {
        type: Object,
        required: true
      },
    },
    methods:
    {
      fileClicked(path){
        this.$emit("file-clicked", path)
      }
    }
  }
</script>

<style>
</style>
