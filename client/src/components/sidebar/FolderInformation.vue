<template>
  <div class="pb-5">
    <div class="pb-8 -pt-2">
      <p v-if="folderProps.subFolders !== 0" class="leading-normal text-cda-light pt-2">
        <FolderIcon class="w-4 h-4 pointer-events-none inline" />
        <span class="align-middle pl-2">
          <span v-if="folderProps.subFolders > 1">
            {{ folderProps.subFolders }} Verzeichnisse
          </span>
          <span v-else>
            {{ folderProps.subFolders }} Verzeichnis
          </span>
          gefunden
        </span>
      </p>
      <p v-if="folderProps.images !== 0" class="leading-normal text-cda-light pt-2">
        <PhotographIcon class="w-4 h-4 pointer-events-none inline" />
        <span class="align-middle pl-2">
          <span v-if="folderProps.images > 1">
            {{ folderProps.images }} Bilder
          </span>
          <span v-else>
            {{ folderProps.images }} Bild
          </span>
          gefunden
        </span>
      </p>
    </div>
    <p class="leading-normal text-cda-lighter pb-2">
      <LocationMarkerIcon class="w-4 h-4 pointer-events-none inline" />
      <span class="align-middle pl-2">
        {{folderProps.name}}
      </span>
    </p>
    <button 
      class="leading-normal text-cda-light" 
      @click.prevent="download(folderprops)"
      :disabled="downloadLoading"
    >
      <DownloadIcon class="w-4 h-4 pointer-events-none inline focus:ring-offset-cda-medium focus:ring-2" />
      <span class="align-middle pl-2">
        Download folder
        <span class="sr-only">{{folderProps.name}}</span>
      </span>
    </button>
    <span v-if="error !== ''" class="text-cda-error pl-2" @click="error = ''">
      <ExclamationIcon class="w-4 h-4 pointer-events-none inline" />
      {{ error }}
    </span>
  </div>
</template>

<script>
import { getCurrentInstance } from "@vue/runtime-core"
import { ref } from "vue";

import { LocationMarkerIcon, PhotographIcon, DownloadIcon, ExclamationIcon } from "@heroicons/vue/solid";
import { FolderIcon } from "@heroicons/vue/outline";

export default {
  props: {
    folderProps: Object
  },
  components: {
    LocationMarkerIcon,
    PhotographIcon,
    DownloadIcon,
    ExclamationIcon,
    FolderIcon
  },
  setup(props) {
    const axios = getCurrentInstance().appContext.config.globalProperties.axios;
    let downloadLoading = ref(false);
    let error = ref("");
    async function download(prop) {
      error.value = "";
      downloadLoading.value = true;
      try {
        axios.post(
          import.meta.env.VITE_APP_SERVER + "/download", 
          { filepath: prop.path }, 
          {responseType: 'arraybuffer'})
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
      } catch (err){
        error.value = "Download fehlgeschlagen!"
      }
       downloadLoading.value = false;
    }
    return {download, downloadLoading, error};
  },
};
</script>
