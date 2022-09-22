<template>
  <div class="raw" style="font-size: 1rem" v-if="dataNote != null">
    {{ dataNote.body }}
  </div>
</template>

<script>
import noteApi from "../../composables/handleNote.js";
import { useToast } from "vue-toastification";
export default {
  data: () => {
    return {
      dataNote: null,
    };
  },
  created() {
    const promise = noteApi.getNote(
      this.$route.params.id,
      this.$route.query.password
    );
    promise
      .then((res) => {
        this.dataNote = res.data;
        document.title = `${this.dataNote.author} - ${this.dataNote.title}`;
        this.isLoading = false;
      })
      .catch((res) => {
        res;
        useToast().error("Nhập mật khẩu để tiếp tục.");
        this.$router.push({
          name: "note-content-view",
          params: this.$route.params,
        });
      });
  },
};
</script>

<style>
</style>