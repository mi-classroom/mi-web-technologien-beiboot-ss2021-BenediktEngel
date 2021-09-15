<template>
  <div class="absolute top-2 left-2 grid grid-cols-4 gap-2 text-cda-light">
    <button @click.prevent="$emit('zoomIn')">
      <MaterialIcon classes="" name="add" />
      <span class="sr-only"> Zoom in </span>
    </button>
    <button @click.prevent="$emit('zoomOut')">
      <MaterialIcon classes="" name="remove" />
      <span class="sr-only">Zoom out</span>
    </button>
    <button @click.prevent="$emit('zoomReset')">
      <MaterialIcon classes="" name="fiber_manual_record" />
      <span class="sr-only">Reset Zoom</span>
    </button>
    <button @click.prevent="$emit('fullscreen')">
      <MaterialIcon classes="" name="fullscreen" />
      <span class="sr-only">Fullscreen</span>
    </button>
  </div>
</template>

<script>
import MaterialIcon from "../../MaterialIcon.vue";

export default {
  props: {},
  components: { MaterialIcon },
  setup(props) {
    return {};
  },
};
</script>
