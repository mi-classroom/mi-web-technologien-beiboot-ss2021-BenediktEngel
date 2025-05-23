<template>
  <div class="p-1">
    <div v-if="isObject(element) || (isArray(element) && element.length)">
      <button class="flex items-center font-code text-cda-accent" @click="toggleActive">
        <MaterialIcon
          classes="flex-shrink-0 text-cda-lightest align-middle"
          name="arrow_right"
          :class="[active ? 'transform rotate-90' : '']"
        />
        <span class="sr-only">Klappe alle Elemente von</span>
        {{ name }}:&nbsp
        <span class="sr-only">{{ active ? "ein" : "aus" }} </span>
        <Bracket :element="element" :opening="true" color="text-cda-accent" aria-hidden />
        <span v-if="!active" class="text-cda-light">
          {{ Object.keys(element).length > 0 ? `&nbsp${Object.keys(element).length} items` : "&nbsp" }}
          <Bracket :element="element" :opening="false" color="text-cda-accent" aria-hidden />
        </span>
      </button>
      <ul v-if="active" class="pl-1 ml-7 border-l border-dotted border-cda-lighten_strong">
        <li v-for="(item, key) in element">
          <ViewerItem :element="item" :depth="new Number(depth) + 1" :name="key" open="false" />
        </li>
      </ul>
    </div>
    <div v-else class="ml-7">
      <span class="font-code text-cda-light">{{ name }}: {{ element }},</span>
    </div>
    <Bracket
      :element="element"
      :opening="false"
      color="text-cda-light"
      aria-hidden
      :class="[active && ((isArray(element) && element.length) || isObject(element)) ? 'ml-7' : 'hidden']"
    />
  </div>
</template>

<script>
import { ref } from "vue";

import Bracket from "./Bracket.vue";
import MaterialIcon from "../../MaterialIcon.vue";

export default {
  props: {
    element: [String, Number, Object],
    name: [String, Number],
    open: String,
    depth: Number,
  },
  components: {
    Bracket,
    MaterialIcon,
  },
  setup(props) {
    let active = ref(new Number(props.depth) <= 3);

    function toggleActive() {
      active.value = !active.value;
    }

    function isObject(el) {
      return typeof el === "object" && !Array.isArray(el);
    }

    function isArray(el) {
      return Array.isArray(el);
    }

    return { props, active, toggleActive, isArray, isObject };
  },
};
</script>
