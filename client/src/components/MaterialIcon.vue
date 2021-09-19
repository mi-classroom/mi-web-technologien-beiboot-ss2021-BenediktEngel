<template>
  <span class="material-icons" :class="classes" aria-hidden>{{ name }}</span>
</template>

<script>
export default {
  props: {
    classes: String,
    name: {
      type: String,
      required: true,
    },
  },
  components: {},
  setup(props) {
    return {};
  },
};
</script>
