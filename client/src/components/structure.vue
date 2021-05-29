<template>
  <div>
    <ul>
      <li v-for="item in tree" class="pt-2">
        <folder v-if="item.type == 'directory'" :key="item.path" :folderprops="item" @file-clicked="fileClicked" />
        <file v-else :fileprops="item" :key="item.path" @file-clicked="fileClicked"></file>
      </li>
    </ul>
  </div>
</template>

<script>
  import file from './file.vue'
  import folder from './folder.vue'

  export default {
    name: "structure",
    components: {
      folder,
      file
    },
    data() {
      return {
        tree: ""
      }
    },
    methods: {
      getTree() {
        this.axios.get(
            import.meta.env.VITE_APP_SERVER + "/structure")
          .then((response) => {
            this.tree = response.data
          })
      },
      fileClicked(path) {
        this.$emit("file-clicked", path)
      }
    },
    created() {
      this.getTree();
    }
  }
</script>

<style>

</style>
