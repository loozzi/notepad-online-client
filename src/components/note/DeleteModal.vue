<template>
  <div class="modal">
    <div
      class="modal__overlay"
      @click.prevent="$emit('closeModal', false)"
    ></div>
    <div class="modal__body">
      <h4>Bạn chắc chắn muốn xóa chứ?</h4>
      <input
        type="password"
        class="modal__input"
        placeholder="Enter password note"
        v-model="password"
      />
      <div class="modal__body-wrap">
        <button
          class="modal__body-btn modal__body-btn--cancel"
          @click.prevent="$emit('closeModal', false)"
        >
          Cancel
        </button>
        <button
          class="modal__body-btn modal__body-btn--ok"
          @click="handleDeleteNote"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import noteApi from "../../composables/handleNote.js";
import { useToast } from "vue-toastification";
export default {
  props: {
    permalink: {
      type: String,
    },
    isOpen: {
      type: Boolean,
    },
  },
  data: () => {
    return {
      password: "",
    };
  },
  methods: {
    handleDeleteNote() {
      useToast().info("Tiến hành xóa note.");
      const promise = noteApi.deleteNote(this.permalink, this.password);
      promise
        .then((res) => {
          if (res.data.success) {
            useToast().success("Xóa note thành công.");
            this.$emit("closeModalAndReload", true);
          } else {
            useToast().error("Xóa note không thành công.");
            this.$emit("closeModalAndReload", false);
          }
        })
        .catch((res) => {
          useToast().error("Không thành công.");
          res;
        });
    },
  },
};
</script>

<style>
.modal {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: 0.2s;
}

.modal__overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(0 0 0/ 20%);
}

.modal__body {
  z-index: 99;
  width: 400px;
  height: 200px;
  background-color: rgb(1 167 194);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}

.modal__body h4 {
  color: #fff;
  margin-bottom: 16px;
}

.modal__body-wrap {
  width: 200px;
  display: flex;
  justify-content: space-between;
}

.modal__body-btn {
  border: none;
  height: 32px;
  width: 96px;
  border-radius: 12px;
  font-weight: 600;
}

.modal__body-btn--cancel:hover {
  background-color: tomato;
  color: #fff;
  cursor: pointer;
}

.modal__body-btn--ok:hover {
  background-color: aquamarine;
  cursor: pointer;
}

.modal__input {
  width: 250px;
  height: 28px;
  padding-left: 8px;
  border-radius: 8px;
  border: none;
  margin-bottom: 12px;
}
</style>