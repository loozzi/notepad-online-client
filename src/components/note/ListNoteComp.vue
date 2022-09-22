<template>
  <div class="list-note">
    <note-comp
      v-for="(item, index) in listNotes"
      :key="index"
      :dataNote="item"
    />
  </div>
</template>

<script>
import NoteComp from "./NoteComp.vue";
export default {
  components: {
    NoteComp,
  },
  props: {
    listNotes: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
</style>