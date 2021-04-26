<template>
  <span :class="indent" class="inline-block text-cda-light">
    <FolderIcon class="inline-block w-5 h-5 text-cda-accent"/>
    {{ folderprops.name }}
    <ul>
      <li  v-for="item in folderprops.includes"  class="pt-2">
        <file v-if="item.type == 'file'"  :fileprops="item" :key="item.path" :depth="depth+1" @file-clicked="fileClicked" />
        <folder v-else :folderprops="item" :key="item.path" :depth="depth+1" @file-clicked="fileClicked"/>
      </li>
    </ul>
  </span>
</template>

<script>
  import file from "./file.vue";
  import { FolderIcon } from '@heroicons/vue/solid'

  export default {
    name: "folder",
    components:
    {
      file,
      FolderIcon
    },
    props:
    {
      folderprops:
      {
        type: Object,
        required: true
      },
      depth:
      {
        type: Number,
        required: true
      }
    },
    methods:
    {
      fileClicked(path){
        this.$emit("file-clicked", path)
      }
    },
    computed:{
      indent() {
        return "pl-"+ (this.depth*2)
        }
    }
  }
</script>

<style>
</style>
