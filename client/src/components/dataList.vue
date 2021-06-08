<template>
  <div>
    <div class="p-1">
      <div v-if="typeof element === 'object'">
        <button class="flex items-center font-bold text-cda-dark" @click="toggleActive">
          <ChevronDownIcon class="flex-shrink-0 w-5 h-5 text-cda-accent" v-show="active" />
          <ChevronUpIcon class="flex-shrink-0 w-5 h-5 text-cda-accent" v-show="!active" />
          <span v-if="active" class="sr-only">Hide </span>
          <span v-else class="sr-only">Show </span>
          {{ name }}<span v-if="active">:</span>
        </button>
        <ul v-if="active" class="pl-1" :class="{ 'ml-2.5 border-l border-dotted border-cda-darker': active }">
          <li v-for="(item, key) in element">
            <dataList :element="item" :name="key" open="false" />
          </li>
        </ul>
      </div>
      <div v-else class="flex justify-between ml-4 border-b border-dotted border-cda-darker">
        <span class="font-bold text-cda-dark">{{ name }}:</span>
        <span class="text-right text-cda-light">{{ element }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/outline";
import { ref } from "vue";

export default {
  props: {
    element: [String, Number, Object],
    name: [String, Number],
    open: String,
  },
  components: {
    ChevronDownIcon,
    ChevronUpIcon,
  },
  setup(props) {
    let active = ref(props.open == "true");
    function toggleActive() {
      active.value = !active.value;
    }
    return {
      props,
      active,
      toggleActive,
    };
  },
};
</script>
