<template>
  <div class="note" v-if="!isDelete">
    <div class="note__icon-wrap">
      <i class="fa-solid fa-lock note__icon" v-if="dataNote.lock"></i>
      <i class="fa-solid fa-lock-open note__icon" v-else></i>
    </div>
    <div class="note__container">
      <div class="note__controls">
        <button class="note__btn" @click="toViewPage">View</button>
        <button class="note__btn" @click="toEditPage">Edit</button>
        <button class="note__btn" @click="handleDelete">Delete</button>
      </div>
      <div class="note__header">
        <div class="note__title">
          {{ dataNote.title }}
        </div>
        <div class="note__time">
          {{ time_create }}
        </div>
      </div>
      <div class="note__body" v-html="dataNote.body"></div>
    </div>
    <transition name="modal">
      <delete-modal
        v-if="openModal"
        :permalink="dataNote.permalink"
        @closeModal="closeModal"
        @closeModalAndReload="closeModalAndReload"
      />
    </transition>
  </div>
</template>

<script>
import DeleteModal from "./DeleteModal.vue";
export default {
  components: {
    DeleteModal,
  },
  props: {
    dataNote: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data: () => {
    return {
      openModal: false,
      isDelete: false,
    };
  },
  methods: {
    toViewPage() {
      this.$router.push({
        name: "note-content-view",
        params: {
          id: this.dataNote.permalink,
        },
      });
    },

    toEditPage() {
      this.$router.push({
        name: "note-edit-view",
        params: {
          id: this.dataNote.permalink,
        },
      });
    },

    handleDelete() {
      this.openModal = true;
    },

    closeModal(dt) {
      this.openModal = dt;
    },

    closeModalAndReload(success) {
      this.isDelete = success;
      this.openModal = false;
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
};
</script>

<style>
.note {
  font-size: 1.2rem;
  background-color: #fff;
  border-radius: 8px;
  margin: 0 16px;
  display: flex;
  justify-content: space-between;
}

.note + .note {
  margin-top: 16px;
}

.note__icon-wrap {
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.note__icon {
  font-size: 64px;
  color: #bbe6e4;
}

.note__container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.note__header,
.note__body {
  display: flex;
  justify-content: space-between;
  background-color: #bbe6e4;
  border-radius: 8px;
  padding: 4px 16px;
  margin-top: 12px;
  margin-right: 16px;
}

.note__body {
  font-size: 1rem;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4rem;
}

.note__controls {
  margin-top: 16px;
}

.note__btn {
  border: none;
  background-color: #bbe6e4;
  padding: 6px 16px;
  border-radius: 16px;
}

.note__btn + .note__btn {
  margin-left: 16px;
}

.note__btn:hover {
  background-color: tomato;
  color: #fff;
  cursor: pointer;
  transition: ease-in linear 0.5s;
}

.modal-enter-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
  transition: 0.2s ease;
}
</style>