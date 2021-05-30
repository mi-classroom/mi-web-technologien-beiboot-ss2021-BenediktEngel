<template>
  <div>
    <div v-show="search != ''">
      <div class="pl-2 mb-2 ">
        <h3 class="pt-1 text-lg font-bold text-cda-lightest">Folders <span class="text-xs text-cda-dark">({{ folderLimit }} of {{ folderResults.length }})</span></h3>
        <p v-if="folderResults.length == 0" class="pl-4 text-cda-light">No matching folders found on the first layer.</p>
        <ul v-if="folderResults.length != 0">
          <li v-for="index in folderLimit" class="pt-2">
            <folder v-if="folderResults[index-1].item.type == 'directory'" :key="folderResults[index-1].item.path" :folderprops="folderResults[index-1].item" @file-clicked="fileClicked" />
            <file v-else :fileprops="folderResults[index-1].item" :key="folderResults[index-1].item.path" @file-clicked="fileClicked"></file>
          </li>
        </ul>
        <button v-if="folderLimit < folderResults.length" @click="setFolderLimit(folderResults)" class="float-right pr-2 underline text-cda-accent">Show more results</button>
      </div>
     <div class="pl-2 mb-2 ">
      <h3 class="pt-1 text-lg font-bold text-cda-lightest">Files <span class="text-xs text-cda-dark">({{ fileLimit }} of {{ fileResults.length }})</span></h3>
        <p v-if="fileResults.length == 0" class="pl-4 text-cda-light">No matching files found.</p>
      <ul v-if="fileResults.length != 0">
        <li v-for="index in fileLimit" class="pt-2">
          <file :fileprops="fileResults[index-1].item" :key="fileResults[index-1].item.path" @file-clicked="fileClicked"></file>
        </li>
      </ul>
        <button v-if="fileLimit < fileResults.length" @click="setFileLimit(fileResults)" class="float-right pr-2 underline text-cda-accent">Show more results</button>
      </div>
    </div>
    <ul>
      <li v-if="search == ''" v-for="item in tree" class="pt-2">
        <folder v-if="item.type == 'directory'" :key="item.path" :folderprops="item" @file-clicked="fileClicked" />
        <file v-else :fileprops="item" :key="item.path" @file-clicked="fileClicked"></file>
      </li>
    </ul>
  </div>
</template>

<script>
  import file from './file.vue'
  import folder from './folder.vue'
  import Fuse from 'fuse.js'
  import { ref } from 'vue'
  const fileLimit = ref(0)
  const folderLimit = ref(0)

  export default {
    name: "structure",
    components: {
      folder,
      file
    },
    props: {
      search: String
    },
    watch: {
        search(newSearch, oldSearch){
        this.folderResults = this.folderSearch.search(newSearch)
        this.setLimit(folderLimit, this.folderResults)
        this.fileResults = this.fileSearch.search(newSearch)
        this.setLimit(fileLimit, this.fileResults)
      }
    },
    data() {
      return {
        tree: [],
        folderSearch: "",
        folderResults: "",
        fileSearch: "",
        fileResults: "",
        fileArray: [],
        fileLimit,
        folderLimit,
      }
    },
    methods: {
      getTree() {
        this.axios.get(
            import.meta.env.VITE_APP_SERVER + "/structure")
          .then((response) => {
            this.tree = response.data
            this.folderSearch = new Fuse(this.tree, { threshold: 0.6, ignoreLocation: true, keys: ["name"]})
            this.getFiles(this.tree)
            this.fileSearch = new Fuse(this.fileArray, { threshold: 0.4, ignoreLocation: true, keys: ["name"]})
          })
      },
      fileClicked(path) {
        this.$emit("file-clicked", path)
      },
      getFiles(tree){
        tree.forEach(element => {
          if(element.type == "directory"){
            this.getFiles(element.includes)
          }
          else{
            this.fileArray.push(element)
          }
        });
      },
      setLimit(limit, array){
        if(array.length < 10) {
          limit.value = array.length
        }else{
          limit.value = 10
        }
      },
      setFileLimit(array){
        if(array.length < fileLimit.value + 10) {
          fileLimit.value = array.length
        }else{
          fileLimit.value =fileLimit.value + 10
        }
      },
      setFolderLimit(array){
        if(array.length < folderLimit.value + 10) {
          folderLimit.value = array.length
        }else{
          folderLimit.value = folderLimit.value + 10
        }
      }
    },
    created() {
      this.getTree();
    }
  }
</script>

<style>

</style>
