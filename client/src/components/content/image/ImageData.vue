<template>
  <div class="pr-4">
    <form 
      v-if="imageData.length" 
    >
      <div 
        v-for="(item) in imageData" 
        class="grid grid-cols-2 gap-4"
      >
        <InputImageData 
          :type="item.type" 
          :label="item.label" 
          :dataDe="item.data.de" 
          :dataEn="item.data.en" 
          :write="item.write" 
          :multilang="item.multilang" 
          :maxChars="item.maxChars" 
          :field="item.field" 
          @valueChanged="setNewValue" 
        />
      </div> 
      <button 
        class="bg-cda-accent text-cda-darkest px-4 py-2 rounded-s" 
        type="submit" 
        @click.prevent="saveData()"
      >
        <FloppyDiscIcon class="inline mr-2" />
        <span class="align-middle">Speichern</span>
      </button>
      <button 
        class="ml-4 bg-cda-accent text-cda-darkest px-4 py-2 rounded-s" 
        type="reset" 
        @click.prevent="$emit('reset')"
      >
        <XIcon class=" h-4 w-4 inline mr-2" />
        <span class="align-middle">Abbrechen</span>
      </button>
      <div 
        v-if="message.text != ''" 
        class="ml-4 inline"
      > 
        <span :class="[message.type === 'success' ? 'text-cda-accent' : 'text-red-500']">
          {{message.text}}
        </span>
      </div>
    </form>
    <div v-else>
      <p class="text-2xl text-cda-light text-center mt-20">
        Data is loading...
      </p>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from "@vue/runtime-core";
import { ref, watch } from "vue";
import InputImageData from "./InputImageData.vue";
import { FloppyDiscIcon } from '@iconicicons/vue3'
import { XIcon } from '@heroicons/vue/outline'


export default {
  props: {
    path: {
      type: String,
    },
  },
  components: { 
    InputImageData, 
    FloppyDiscIcon,
    XIcon
  },
  setup(props) {
    const axios = getCurrentInstance().appContext.config.globalProperties.axios;
    let imageData = ref([]);
    let newValues = ref([]);
    let message = ref({text: "", type: ""});
    getData(props.path);
    watch(
      () => props.path,
      (newPath) => {
        getData(newPath);
      }
    );
    async function getData(path) {
      // clear old values
      imageData.value = [];
      message.value = {text: "", type: ""};

      let output = await axios.post(import.meta.env.VITE_APP_SERVER + "/data", { filepath: path });
      output.data.imageData.forEach((el) => {
        // Check if data is stringified json, if true parse it else take the string as value for both
        if (new RegExp('^{.*}$').test(el.data)){
          el.data = JSON.parse(el.data);
        }else {
          el.data = {de: el.data, en: el.data}
        }
        imageData.value.push(el);
      })
    }

    async function saveData() {
      let newData = {}
      imageData.value.forEach(el => {
        // Check if there are new values for the field
        let indexDe = newValues.value.findIndex(elem => elem.field === el.field && elem.lang === 'de');
        let indexEn = newValues.value.findIndex(elem => elem.field === el.field && elem.lang === 'en');
        if(el.multilang){
          // multilang, so safe everything as json
          let temp = {}
          temp.de = indexDe !== -1 ? newValues.value[indexDe].value : el.data.de;
          temp.en = indexEn !== -1 ? newValues.value[indexEn].value : el.data.en;
          newData[el.field] = JSON.stringify(temp);
        } else{
          // not multilang only safe german one
          newData[el.field] = indexDe !== -1 ? newValues.value[indexDe].value : el.data.de;
        }
      });
      let result = await axios.put(import.meta.env.VITE_APP_SERVER + "/data", { filepath: props.path, data: newData });
      if(result.status === 200){
        message.value.text = "Änderungen gespeichert!";
        message.value.type = "success";
      } else {
        message.value.text = "Speichern fehlgeschlagen!";
        message.value.type = "error";
      }
    }

    function setNewValue(prop){
      // Check if field value exists
      let index = newValues.value.findIndex(el => el.field === prop.field && el.lang === prop.lang);
      if (index !== -1){
        // Yes: Update value
        newValues.value[index] = prop;
      } else {
        // No: Save new Value
        newValues.value.push(prop);
      }
    }
    return { imageData, saveData, message, setNewValue };
  },
};
</script>
