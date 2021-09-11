<template>
  <div class="pb-4">
    <input
      v-if="type !== 'textarea'"
      v-model="newDataDe"
      :maxlength="maxChars"
      :disabled="!write"
      :id="label.de"
      :type="type"
      class="w-full p-2"
      @change="$emit('valueChanged', {field: props.field, lang: 'de', value: $event.target.value})"
    />
    <textarea
      v-else
      v-model="newDataDe"
      :maxlength="maxChars"
      :disabled="!write"
      :id="label.de"
      class="w-full p-2"
      @change="$emit('valueChanged', {field: props.field, lang: 'de', value: $event.target.value})"
    />
    <label
      :for="label.de"
      class="block text-cda-light"
    >
      {{label.de}}
    </label>
  </div>
  <div class="pb-4">
    <input 
      v-if="type !== 'textarea'" 
      v-model="newDataEn" 
      :maxlength="maxChars" 
      :disabled="(!write) || (!multilang)" 
      :id="label.en" 
      :type="type" 
      class="w-full p-2" 
      @change="$emit('valueChanged', {field: props.field, lang: 'en', value: $event.target.value})" 
    />
    <textarea 
      v-else 
      v-model="newDataEn" 
      :maxlength="maxChars" 
      :disabled="(!write) || (!multilang)" 
      :id="label.en" 
      class="w-full p-2" 
      @change="$emit('valueChanged', {field: props.field, lang: 'en', value: $event.target.value})" 
    />
    <label 
      :for="label.en" 
      class="block text-cda-light"
    >
      {{label.en}}
    </label>
  </div>  
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: {
    type: String,
    dataDe: String,
    dataEn: String,
    maxChars: Number,
    write: Boolean,
    multilang: Boolean,
    label: Object,
    field: String
  },
  components: {}, 
  emits: ["valueChanged"],
  setup(props) {
    let newDataDe = ref(props.dataDe);
    let newDataEn = ref(props.dataEn);
    watch(
      () => newDataDe.value,
      (newData, oldData) => {
        // If english value is empty or the same set english = german
        if(newDataEn.value === "" || oldData === newDataEn.value){
          newDataEn.value = newDataDe.value
        }
      },
    );
    return {newDataDe, newDataEn, props};
  },
};
</script>
