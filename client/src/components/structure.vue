<template>
  <div>
    <h2 class="mt-6 mb-4 text-2xl text-center text-cda-light">
      Files
    </h2>
    <ul v-for="item in tree">
      <li>
        <folder v-if="item.type='folder'" :key="item.path" :folderprops="item" :depth="0" @file-clicked="fileClicked"/>
        <file v-else :fileprops="item" :key="item.path" :depth="0" @file-clicked="fileClicked"></file>
      </li>
    </ul>
  </div>
</template>

<script>
  import file from './file.vue'
  import folder from './folder.vue'

  export default {
    name: "structure",
    components:
    {
      folder,
      file
    },
    data(){
      return {
        tree: ""
      }
    },
    methods:
    {
      getTree(){
        this.axios.get(import.meta.env.VITE_APP_SERVER + "/structure")
        .then((response) => {
        this.tree = response.data
        })
      },
      fileClicked(path){
        this.$emit("file-clicked", path)
      }
    },
    created(){
      this.getTree();
    }
  }
</script>

<style>

</style>
