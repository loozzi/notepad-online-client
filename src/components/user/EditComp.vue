<template>
  <h1 style="font-size: 2rem; text-align: center" v-if="userInfomation == null">
    Loading...
  </h1>
  <div class="edit-user" v-else>
    <h1 class="edit__heading">USER EDIT</h1>
    <div class="edit-wrap">
      <label for="">Username</label>
      <input
        type="text"
        class="edit__input"
        v-model="userInfomation.username"
        disabled
      />
    </div>
    <div class="edit-wrap">
      <label for="">Email</label>
      <input
        type="text"
        class="edit__input"
        v-model="userInfomation.email"
        disabled
      />
    </div>
    <div class="edit-wrap">
      <label for="">New password</label>
      <input
        type="password"
        class="edit__input"
        placeholder="Enter password"
        v-model="password"
      />
    </div>
    <div class="edit-wrap">
      <label for="">New password again</label>
      <input
        type="password"
        class="edit__input"
        placeholder="Enter password again"
        v-model="rePassword"
      />
    </div>
    <button class="edit__btn" @click.prevent="openModal">Save & change</button>
  </div>
  <transition name="modal">
    <div class="modal" v-if="isOpenModal">
      <div class="modal__overlay" @click="closeModal"></div>
      <div class="modal__body">
        <h4 style="font-size: 1rem">Nhập mật khẩu để xác nhận thay đổi.</h4>
        <input
          type="password"
          class="modal__input"
          placeholder="Enter old password"
          v-model="oldPassword"
        />
        <div class="modal__body-wrap">
          <button
            class="modal__body-btn modal__body-btn--cancel"
            @click.prevent="closeModal"
          >
            Cancel
          </button>
          <button
            class="modal__body-btn modal__body-btn--ok"
            @click="handleEditUser"
          >
            Change
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { useToast } from "vue-toastification";
import userApi from "../../composables/handleUser.js";
export default {
  methods: {
    openModal() {
      if (
        this.password.trim() == this.rePassword.trim() &&
        this.password.trim().length > 0
      )
        this.isOpenModal = true;
      else useToast().warning("Mật khẩu không khớp.");
    },

    closeModal() {
      this.isOpenModal = false;
    },

    handleEditUser() {
      useToast().info("Tiến hành đổi mật khẩu.");
      const promise = userApi.editAccount({
        password: this.oldPassword.trim(),
        new_password: this.password.trim(),
      });
      promise
        .then((res) => {
          useToast().success("Thay đổi mật khẩu thành công!");
          res;
          this.isOpenModal = false;
          this.password = "";
          this.rePassword = "";
          this.oldPassword = "";
        })
        .catch((res) => {
          useToast().error("Lỗi: " + res.response.data.logs);
        });
    },
  },
  data: () => {
    return {
      userInfomation: null,
      password: "",
      rePassword: "",
      oldPassword: "",
      isOpenModal: false,
    };
  },
  beforeCreate() {
    const promise = userApi.getMyAccount();
    promise
      .then((res) => {
        this.userInfomation = res.data.data;
      })
      .catch((res) => {
        res;
        useToast().warning("Token expired");
      });
  },
};
</script>

<style>
.edit-user {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.edit__heading {
  font-size: 2rem;
  margin-bottom: 32px;
}

.edit-wrap {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.edit-wrap label {
  width: 20%;
  font-size: 1rem;
}

.edit__input {
  flex: 1;
  font-size: 1rem;
  padding: 4px 12px;
}

.edit__btn {
  margin-top: 16px;
  padding: 8px 24px;
  max-width: 256px;
  border: none;
  border-radius: 16px;
  background-color: aquamarine;
  font-size: 1rem;
  align-self: center;
}

.edit__btn:hover {
  background-color: tomato;
  color: #fff;
  transition: 0.2s;
  cursor: pointer;
}

.modal-enter-from {
  opacity: 0;
}

.modal-enter-active {
  transition: opacity 0.3s ease;
}
</style>