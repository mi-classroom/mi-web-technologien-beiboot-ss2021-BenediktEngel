<template>
  <div class="pb-4">
    <div v-if="type !== 'textarea'" class="relative">
      <input
        v-model="newDataDe"
        :maxlength="maxChars"
        :disabled="!write"
        :id="label.de"
        :type="type"
        class="w-full p-2 text-cda-lightest"
        :class="[!write ? 'bg-cda-darken_strong cursor-not-allowed' : 'bg-cda-lighten']"
      />
      <span class="absolute bottom-0 left-0 h-0.5" :style="styles.left.de"></span>
      <span class="absolute bottom-0 right-0 h-0.5 bg-cda-light" :style="styles.right.de"></span>
    </div>
    <div v-else class="relative">
      <textarea
        v-model="newDataDe"
        :maxlength="maxChars"
        :disabled="!write"
        :id="label.de"
        rows="6"
        class="w-full p-2 text-cda-lightest -mb-1"
        :class="[!write ? 'bg-cda-darken_strong cursor-not-allowed' : 'bg-cda-lighten']"
      />
      <span class="absolute bottom-0 left-0 h-0.5" :style="styles.left.de"></span>
      <span class="absolute bottom-0 right-0 h-0.5 bg-cda-light" :style="styles.right.de"></span>
    </div>
    <label :for="label.de" class="block text-cda-light">
      {{ label.de }}
    </label>
  </div>
  <div class="pb-4">
    <div v-if="type !== 'textarea'" class="relative">
      <input
        v-model="newDataEn"
        :maxlength="maxChars"
        :disabled="!write || !multilang"
        :id="label.en"
        :type="type"
        class="w-full p-2 text-cda-lightest"
        :class="[!write || !multilang ? 'bg-cda-darken_strong cursor-not-allowed' : 'bg-cda-lighten']"
      />
      <span class="absolute bottom-0 left-0 h-0.5" :style="styles.left.en"></span>
      <span class="absolute bottom-0 right-0 h-0.5 bg-cda-light" :style="styles.right.en"></span>
    </div>
    <div v-else class="relative">
      <textarea
        v-model="newDataEn"
        :maxlength="maxChars"
        :disabled="!write || !multilang"
        :id="label.en"
        rows="6"
        class="w-full p-2 text-cda-lightest -mb-1"
        :class="[!write || !multilang ? 'bg-cda-darken_strong cursor-not-allowed' : 'bg-cda-lighten']"
      />
      <span class="absolute bottom-0 left-0 h-0.5" :style="styles.left.en"></span>
      <span class="absolute bottom-0 right-0 h-0.5 bg-cda-light" :style="styles.right.en"></span>
    </div>
    <label :for="label.en" class="block text-cda-light">
      {{ label.en }}
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
    field: String,
  },
  components: {},
  emits: ["valueChanged"],
  setup(props, { emit }) {
    let newDataDe = ref(props.dataDe);
    let newDataEn = ref(props.dataEn);
    let styles = ref({
      left: {},
      right: {},
    });

    calcLimit(props.dataDe == undefined ? "" : props.dataDe, "de");
    calcLimit(props.dataEn == undefined ? "" : props.dataEn, "en");

    watch(
      () => newDataDe.value,
      (newData, oldData) => {
        // If english value is empty or the same set english = german
        calcLimit(newData, "de");
        if (newDataEn.value === "" || oldData === newDataEn.value) {
          newDataEn.value = newDataDe.value;
          emit("valueChanged", { field: props.field, lang: "en", value: newData });
        }
        emit("valueChanged", { field: props.field, lang: "de", value: newData });
      }
    );
    watch(
      () => newDataEn.value,
      (newDatae) => {
        calcLimit(newDatae, "en");
        emit("valueChanged", { field: props.field, lang: "en", value: newDatae });
      }
    );

    function calcLimit(value, lang) {
      let percent = Number.parseInt((100 / props.maxChars) * value.length);
      styles.value.left[lang] = `width: ${percent}%; ${
        percent >= 90 ? "background-color: #CC0000;" : "background-color: #FFCC00;"
      }`;
      styles.value.right[lang] = `width: ${100 - percent}%;`;
    }

    return { newDataDe, newDataEn, props, styles };
  },
};
</script>
