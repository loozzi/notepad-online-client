<template>
  <div class="home-view">
    <div class="home__btn-wrap">
      <router-link :to="{ name: 'create-view' }" class="home__btn">
        Create note
      </router-link>
      <router-link :to="{ name: 'all-note-view' }" class="home__btn">
        All note
      </router-link>
    </div>

    <list-note-comp :listNotes="listNotes" v-if="listNotes != null" />
    <h1 class="home__noti" v-else>{{ noti }}</h1>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import ListNoteComp from "./ListNoteComp.vue";
import noteApi from "../../composables/handleNote.js";
export default {
  components: {
    ListNoteComp,
  },
  data: () => {
    return {
      listNotes: null,
      noti: "Loading...",
    };
  },
  methods: {
    getListNote() {
      const promise = noteApi.getPostInHome(4);
      promise
        .then((res) => {
          if (res.data.data.length > 0) this.listNotes = res.data.data;
          else this.noti = "Không có dữ liệu.";
        })
        .then((res) => {
          this.noti = "Không có dữ liệu.";
          useToast().warning(res.response.data.logs);
        });
    },
  },
  created() {
    const promise = noteApi.getPostInHome(4);
    promise
      .then((res) => {
        if (res.data.data.length > 0) this.listNotes = res.data.data;
        else this.noti = "Không có dữ liệu.";
      })
      .catch((res) => {
        this.noti = "Không có dữ liệu.";
        res;
      });
  },
};
</script>

<style scoped>
.home-view {
  background-color: rgb(187 230 228 / 50%);
  border-radius: 8px;
  padding: 16px 0;
  box-shadow: 0 0 15px rgb(0 0 0 / 15%);
}

.home__btn-wrap {
  margin-bottom: 24px;
}

.home__btn {
  font-size: 1.2rem;
  margin-left: 16px;
  padding: 6px 16px;
  border-radius: 16px;
  background-color: #42bfdd;
  color: #fff;
  text-decoration: none;
}

.home__btn:hover {
  background-color: tomato;
  transition: 0.2s;
}

.home__noti {
  text-align: center;
  font-size: 2rem;
}
</style>