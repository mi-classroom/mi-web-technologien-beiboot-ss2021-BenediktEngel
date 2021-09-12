<template>
  <span>
    <span v-if="isObject(element) && opening" :class="color" class="font-code">{</span>
    <span v-if="isArray(element) && opening" :class="color" class="font-code">[</span>
    <span v-if="isObject(element) && !opening" :class="color" class="font-code">},</span>
    <span v-if="isArray(element) && !opening" :class="color" class="font-code">],</span>
  </span>
</template>

<script>
export default {
  props: {
    active: Boolean,
    element: [String, Number, Object],
    opening: Boolean, 
    color: String
  },
  components: {},
  setup(props) {
     function isObject(el) {
      return typeof el === "object" && !Array.isArray(el);
    }
    function isArray(el) {
      return Array.isArray(el);
    }
    return {isObject, isArray};
  },
};
</script>
