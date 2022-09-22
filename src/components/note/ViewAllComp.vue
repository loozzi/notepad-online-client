<template>
  <div class="all-note">
    <list-note-comp :listNotes="listNotes" />
    <h1 class="loading__text" v-if="isLoading">Loading...</h1>
  </div>
</template>

<script>
import ListNoteComp from "./ListNoteComp.vue";
import noteApi from "../../composables/handleNote.js";
// import { useToast } from "vue-toastification";
export default {
  components: {
    ListNoteComp,
  },
  data: () => {
    return {
      isLoading: true,
      page: 1,
      listNotes: [],
      isEnd: false,
    };
  },
  methods: {
    getData() {
      this.isLoading = true;
      const promise = noteApi.getAllNote(this.page);
      promise.then((res) => {
        this.listNotes.push(...res.data.data);
        // useToast().success('')
        if (res.data.data.length == 0) {
          this.isEnd = true;
          this.isLoading = false;
        } else {
          this.page++;
        }
      });
    },

    getNewData() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow && !this.isEnd) {
          this.getData();
        }
      };
    },
  },
  created() {
    this.getData();
    this.getNewData();
  },
};
</script>

<style>
.all-note {
  background-color: rgb(255 228 196 / 50%);
  border-radius: 8px;
  padding: 16px 0;
}

.loading__text {
  font-size: 1.5rem;
  text-align: center;
}
</style>