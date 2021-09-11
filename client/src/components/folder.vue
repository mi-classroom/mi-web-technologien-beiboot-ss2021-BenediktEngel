<template>
  <div>
    <div class="pr-2 ml-6">
      <div class="flex">
        <button @click="toggleActive" class="flex text-left break-all text-cda-light">
          <ChevronDownIcon class="flex-shrink-0 w-5 h-5 text-cda-accent" v-show="active" />
          <ChevronUpIcon class="flex-shrink-0 w-5 h-5 text-cda-accent" v-show="!active" />
          <FolderIcon class="flex-shrink-0 w-5 h-5 mx-1 text-cda-accent" />
          <span v-if="active" class="sr-only">Close Folder </span>
          <span v-else class="sr-only">Open Folder </span>
          <span>{{ folderprops.name }}</span>
        </button>
        <button v-if="folderprops.json" @click="$emit('file-clicked', folderprops.json)">
          <span class="sr-only">Show folder information</span>
          <InformationCircleIcon class="flex-shrink-0 w-5 h-5 ml-1 flex-sh text-cda-accent" />
        </button>
        <a 
          href="#"
          @click.prevent="download(folderprops)"
          download
          :disabled="downloadLoading"
        >
          <span class="sr-only">Download folder {{folderprops.name}}</span>
          <DownloadIcon class="flex-shrink-0 w-5 h-5 ml-1 flex-sh text-cda-accent" />
        </a>
      </div>
      <ul>
        <li v-for="item in folderprops.includes" class="pt-2" v-if="active">
          <file
            v-if="item.type == 'file'"
            :fileprops="item"
            :key="item.path"
            @file-clicked="$emit('file-clicked', $event)"
          />
          <folder v-else :folderprops="item" :key="item.path" @file-clicked="$emit('file-clicked', $event)" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from "@vue/runtime-core"
import file from "./file.vue";
import { FolderIcon, InformationCircleIcon, DownloadIcon } from "@heroicons/vue/solid";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/outline";
import { ref } from "vue";

export default {
  props: {
    folderprops: {
      type: Object,
      required: true,
    },
  },
  components: {
    file,
    FolderIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    InformationCircleIcon,
    DownloadIcon
  },
  emits: ["file-clicked"],
  setup() {
    const axios = getCurrentInstance().appContext.config.globalProperties.axios;
    let active = ref(false);
    let downloadLoading = ref(false);
    function toggleActive() {
      active.value = !active.value;
    }
    async function download(prop){
      downloadLoading.value = true;
      axios.post(
        import.meta.env.VITE_APP_SERVER + "/download", 
        { filepath: prop.path }, 
        {responseType: 'arraybuffer'}
        )
        .then(response => {
          //create blob with response
          let blob = new Blob([response.data], { type: 'application/zip' }),
          url = window.URL.createObjectURL(blob)
          // create a-tag / taken from: https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link
          var a = document.createElement("a");
          a.href = url;
          a.download = `${prop.name}.zip`;
          document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
          a.click();
          a.remove();
        })
       downloadLoading.value = false;
    }
    return { active, toggleActive, download, downloadLoading };
  },
};
</script>

<style></style>
