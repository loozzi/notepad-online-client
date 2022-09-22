<template>
  <h1 v-if="isLoading" style="text-align: center; font-size: 2rem">
    Loading...
  </h1>
  <div v-else class="view">
    <div class="view-wrap view-wrap-password" v-if="dataNote == null">
      <h1 class="view__noti-text">{{ wrongPasswordNoti }}</h1>
      <input
        type="password"
        class="view__input"
        placeholder="Enter password"
        v-model="password"
      />
      <button class="view__btn" @click.prevent="handleGetData">Submit</button>
    </div>
    <div class="view-wrap" v-else>
      <div class="view__header">
        <div class="view__header-wrap">
          <button class="view__btn" @click="copyLink">Copy Link</button>
          <button class="view__btn" @click="viewRaw">View Raw</button>
        </div>
        <div class="view__header-wrap">
          Create at: {{ time_create }} - View: {{ dataNote.view }}
        </div>
      </div>
      <div class="view__content" v-html="dataNote.body"></div>
    </div>
  </div>
</template>

<script>
import noteApi from "../../composables/handleNote.js";
export default {
  data: () => {
    return {
      password: "",
      dataNote: null,
      wrongPasswordNoti: "",
      isLoading: true,
    };
  },
  methods: {
    getData(noti) {
      const promise = noteApi.getNote(this.$route.params.id, this.password);
      promise
        .then((res) => {
          this.dataNote = res.data;
          document.title = `${this.dataNote.author} - ${this.dataNote.title}`;
          this.isLoading = false;
        })
        .catch((res) => {
          this.isLoading = false;
          res;
          this.wrongPasswordNoti = noti;
        });
    },

    handleGetData() {
      this.getData("Sai mật khẩu hoặc note không tồn tại. Vui lòng thử lại.");
    },

    copyLink() {
      this.$copyText(location.href)
        .then(() => {
          alert("Copy thành công!");
        })
        .catch(() => {
          alert("Copy không thành công!");
        });
    },

    viewRaw() {
      this.$router.push({
        name: "note-raw-view",
        params: this.$route.params,
        query: {
          password: this.password,
        },
      });
    },
  },
  computed: {
    time_create() {
      const dt = this.dataNote.time_create.split("T");
      const dates = dt[0].split("-");
      const date = dates.reverse().join("/");
      const time = dt[1].split(".")[0];
      return `${time} - ${date}`;
    },
  },

  created() {
    this.getData("*Note được bảo vệ bằng mật khẩu!");
  },
};
</script>

<style>
.view {
  display: flex;
  align-items: center;
  background: rgb(163 186 195/40%);
  min-height: 120px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgb(0 0 0 / 15%);
}

.view__input {
  height: 28px;
  padding-left: 12px;
  width: 256px;
  font-size: 1rem;
  margin-right: 16px;
  border: none;
  border-radius: 8px;
}

.view__btn {
  height: 32px;
  min-width: 128px;
  border: none;
  border-radius: 16px;
  color: #fff;
  font-weight: 600;
  background-color: #01a7c2;
}

.view__btn + .view__btn {
  margin-left: 16px;
}

.view__btn:hover {
  background-color: tomato;
  cursor: pointer;
  transition: 0.2s;
}

.view__noti-text {
  color: rgb(166, 13, 13);
  margin-bottom: 16px;
  margin-top: 8px;
}

.view-wrap {
  width: 100%;
  margin: 16px;
}

.view-wrap-password:first-child {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.view-wrap-password .view__btn {
  margin-top: 16px;
}

.view__header {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
}

.view__content {
  font-size: 1.2rem;
  background-color: #fff;
  padding: 4px 12px;
  border-radius: 8px;
  margin-top: 16px;
}
</style>