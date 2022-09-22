<template>
  <div class="create-wrap">
    <div class="create" v-if="permalink == null">
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
        <button class="create__btn-submit" @click.prevent="createNewNote">
          Save Note
        </button>
      </div>
    </div>
    <div class="create__share-wrap" v-else>
      <h1 class="create__share-link">
        Link:
        <router-link
          :to="{ name: 'note-content-view', params: { id: permalink } }"
          >{{ linkShare }}</router-link
        >
      </h1>
      <h1 class="create__share-link">
        Raw:
        <router-link
          :to="{ name: 'note-raw-view', params: { id: permalink } }"
          >{{ linkShareRaw }}</router-link
        >
      </h1>
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
      dataNote: {
        title: "",
        body: "",
        tags: "",
        password: "",
      },
      permalink: null,
    };
  },
  methods: {
    createNewNote() {
      useToast().info("Đang tiến hành lưu note.");
      const payload = this.dataNote;
      payload.time_create = Date.now();
      const promise = noteApi.createNewNote(payload);
      promise
        .then((res) => {
          useToast().success("Lưu note thành công.");
          this.permalink = res.data.data.permalink;
        })
        .catch((res) => {
          if (res.response.data.logs.includes("expiried")) {
            useToast().warning("Vui lòng đăng nhập để sử dụng chức năng.");
            this.$router.push({
              name: "login-view",
            });
          } else useToast().error("Lỗi: " + res.response.data.logs);
        });
    },
  },
  computed: {
    linkShare() {
      return `https://${window.location.host}/${this.permalink}`;
    },
    linkShareRaw() {
      return `https://${window.location.host}/${this.permalink}/raw`;
    },
  },
};
</script>

<style scoped>
.create,
.create__share-wrap {
  background-color: rgb(255 228 196 / 50%);
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
.create__share-link {
  font-size: 1.4rem;
  text-align: center;
  padding: 36px 0;
}
</style>