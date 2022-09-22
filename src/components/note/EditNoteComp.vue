<template>
  <h1
    v-if="dataNote == null && isCheck == false"
    style="text-align: center; font-size: 2rem"
  >
    Loading...
  </h1>
  <div v-else>
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
    <div class="create" v-else>
      <input
        type="text"
        class="create__title"
        placeholder="Enter title note"
        v-model="dataNote.title"
      />
      <div class="create__btn-wrap">
        <button
          class="create__btn"
          :class="{ 'create__btn-active': typeText }"
          @click="typeText = true"
        >
          Raw
        </button>
        <button
          class="create__btn"
          :class="{ 'create__btn-active': !typeText }"
          @click="typeText = false"
        >
          View
        </button>
      </div>
      <textarea
        type="text"
        class="create__content create__content-text"
        placeholder="Enter note here"
        v-if="typeText"
        v-model="dataNote.body"
      />
      <div
        type="text"
        class="create__content create__content-html"
        placeholder="Enter note here"
        v-else
        v-html="dataNote.body"
      ></div>
      <input
        type="text"
        class="create__tags"
        placeholder="Enter tags here. Split tag by `,`"
        v-model="dataNote.tags"
      />
      <div class="create__footer">
        <input
          type="password"
          class="create__password"
          placeholder="Enter password for note"
          v-model="dataNote.password"
        />
        <button class="create__btn-submit" @click.prevent="handleUpdateDate">
          Save Note
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import noteApi from "../../composables/handleNote.js";
import { useToast } from "vue-toastification";
export default {
  data: () => {
    return {
      typeText: true,
      dataNote: null,
      password: "",
      isCheck: false,
    };
  },
  methods: {
    handleGetData() {
      const promise = noteApi.getNote(this.$route.params.id, this.password);
      promise
        .then((res) => {
          this.dataNote = res.data;
          this.dataNote.password = this.password;
          useToast().info("Load note thành công.");
        })
        .catch((res) => {
          res;
          useToast().error("Sai mật khẩu.");
          this.isCheck = true;
        });
    },

    handleUpdateDate() {
      try {
        this.dataNote.tags = this.dataNote.tags.join(",");
      } catch (error) {
        error;
      }
      const promise = noteApi.updateNote(this.$route.params.id, this.dataNote);
      promise
        .then((res) => {
          res;
          useToast().success("Cập nhật note thành công.");
          setTimeout(() => {
            this.$router.push({
              name: "note-content-view",
              params: this.$route.params,
            });
          }, 1000);
        })
        .catch((res) => {
          useToast().error("Không thành công.\nLỗi: " + res.response.data.logs);
        });
      // console.log(this.dataNote);
    },
  },
  created() {
    this.handleGetData();
  },
};
</script>

<style>
.view-wrap-password {
  background-color: #bbe6e4;
  padding: 16px 0;
  border-radius: 8px;
  margin: 0;
}

.create,
.create__share-wrap {
  background-color: #bbe6e4;
  width: 100%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.create__title {
  font-size: 1.2rem;
  padding: 4px 12px;
  border-radius: 8px;
  border: none;
  margin: 16px;
}

.create__btn-wrap {
  margin-left: 16px;
}

.create__btn {
  border: none;
  padding: 4px 16px;
  font-size: 1rem;
}

.create__btn:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.create__btn:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.create__btn-active {
  background-color: #42bfdd;
  color: #fff;
}

.create__btn:hover {
  cursor: pointer;
  transition: 0.2s;
}

.create__content {
  font-size: 1.1rem;
  margin: 16px;
  border-radius: 8px;
  height: 360px;
  border: none;
  padding: 8px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -moz-user-select: none;
}

.create__tags {
  margin: 16px;
  margin-top: 0;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  padding: 4px 12px;
}

.create__footer {
  margin: 0 16px 16px 16px;
  display: flex;
  justify-content: space-between;
}

.create__password {
  font-size: 1rem;
  padding: 4px 12px;
  border: none;
  border-radius: 8px;
}

.create__btn-submit {
  padding: 4px 32px;
  border: none;
  border-radius: 16px;
  background-color: #42bfdd;
  color: #fff;
  font-size: 1.2rem;
}

.create__btn-submit:hover {
  background-color: tomato;
  cursor: pointer;
  transition: 0.2s;
}
</style>