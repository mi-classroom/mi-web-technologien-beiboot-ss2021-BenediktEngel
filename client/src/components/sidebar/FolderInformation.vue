<template>
  <div class="pb-5">
    <div class="pb-8 -pt-2 text-cda-light">
      <p v-if="folderProps.subfolders !== 0" class="pt-2">
        <MaterialIcon classes="align-bottom pr-2" name="folder_open" />
        {{ folderProps.subfolders }} {{ folderProps.subfolders >= 1 ? "Verzeichnisse" : "Verzeichnis" }} gefunden
      </p>
      <p v-if="folderProps.images !== 0" class="pt-2">
        <MaterialIcon classes="align-bottom pr-2" name="image" />
        {{ folderProps.images }} {{ folderProps.images >= 1 ? "Bilder" : "Bild" }} gefunden
      </p>
    </div>
    <p class="text-cda-lighter pb-2">
      <MaterialIcon classes="pr-2 align-bottom" name="place" />
      {{ folderProps.name }}
    </p>
    <button
      class="leading-normal text-cda-light hover:text-cda-accent"
      @click.prevent="download(folderProps)"
      :disabled="downloadLoading"
    >
      <MaterialIcon classes="pr-2 align-bottom" name="download" />
      Download folder
      <span class="sr-only">{{ folderProps.name }}</span>
    </button>
    <span v-if="error !== ''" class="text-cda-error pl-2" @click="error = ''">
      <MaterialIcon classes="align-bottom" name="error" />
      {{ error }}
    </span>
  </div>
</template>

<script>
import { getCurrentInstance } from "@vue/runtime-core";
import { ref } from "vue";

import MaterialIcon from "../MaterialIcon.vue";

export default {
  props: {
    folderProps: {
      subfolders: Number,
      images: Number,
      name: String,
      path: String,
    },
  },
  components: { MaterialIcon },
  setup(props) {
    const axios = getCurrentInstance().appContext.config.globalProperties.axios;

    let downloadLoading = ref(false);
    let error = ref("");

    async function download(prop) {
      error.value = "";
      downloadLoading.value = true;
      try {
        axios
          .post(import.meta.env.VITE_APP_SERVER + "/download", { filepath: prop.path }, { responseType: "arraybuffer" })
          .then((response) => {
            //create blob with response
            let blob = new Blob([response.data], { type: "application/zip" }),
              url = window.URL.createObjectURL(blob);
            // create a-tag / taken from: https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link
            var a = document.createElement("a");
            a.href = url;
            a.download = `${prop.name}.zip`;
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();
            a.remove();
          });
      } catch (err) {
        error.value = "Download fehlgeschlagen!";
      }
      downloadLoading.value = false;
    }
    return { download, downloadLoading, error };
  },
};
</script>
