<template>
  <div>
    <button
      class="flex pr-2 text-left break-all text-cda-light"
      @click="$emit('imageSelected', fileprops.path)"
      :key="fileprops.path"
    >
      <MaterialIcon
        v-if="new RegExp('origin').test(fileprops.name)"
        classes="w-5 h-5 mr-2 text-cda-accent"
        name="aspect_ratio"
      />
      <MaterialIcon v-else classes="w-5 h-5 mr-2 text-cda-accent" name="image" />
      <span class="sr-only">Wähle Datei </span>
      <span>{{ fileprops.name }}</span>
    </button>
  </div>
</template>

<script>
import MaterialIcon from "../../MaterialIcon.vue";
export default {
  props: {
    fileprops: {
      type: Object,
      required: true,
    },
  },
  components: { MaterialIcon },
  emits: ["imageSelected"],
  setup() {
    return {};
  },
};
</script>
