<template>
  <span class="inline-block ml-2 text-cda-light">
    <ChevronDownIcon class="inline-block w-5 h-5 text-cda-accent" @click="active = !active" :class="{ hidden : !active }" />
    <ChevronUpIcon class="inline-block w-5 h-5 text-cda-accent" @click="active = !active" :class="{ hidden : active }" />
    <FolderIcon class="inline-block w-5 h-5 mx-2 text-cda-accent"/>
    {{ folderprops.name }}
    <ul>
      <li  v-for="item in folderprops.includes"  class="pt-2" :class="{ hidden : !active }">
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
