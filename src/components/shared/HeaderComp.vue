<template>
  <div class="header">
    <div class="header-wrap">
      <ul class="header__list">
        <router-link :to="{ name: 'home-view' }" class="header__item"
          >Home</router-link
        >
        <router-link :to="{ name: 'create-view' }" class="header__item"
          >Create</router-link
        >
        <router-link :to="{ name: 'search-view' }" class="header__item"
          >Search</router-link
        >
      </ul>
    </div>
    <div class="header-wrap">
      <router-link
        v-if="userInfomation == null"
        :to="{ name: 'login-view' }"
        class="header__item header__item-user"
      >
        Login
      </router-link>
      <div class="header__item-user" v-else>
        <router-link class="header__item" :to="{ name: 'edit-view' }">
          {{ userInfomation.username }}
        </router-link>
        <div class="header__item-btn header__item" @click="logout">Logout</div>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from "../../composables/handleUser.js";
import { useToast } from "vue-toastification";
export default {
  data: () => {
    return {
      userInfomation: null,
    };
  },
  methods: {
    logout() {
      document.cookie = `token=undefinded;path=/`;
      useToast().success("Đăng xuất thành công.");
      this.userInfomation = null;
      location.href = "/";
    },
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
.header {
  display: flex;
  justify-content: space-between;
  background-color: #bbe6e4;
  height: 48px;
  border-radius: 8px;
  font-size: 1.4rem;
  box-shadow: 0 0 12px rgb(0 0 0 / 15%);
  margin: 16px 0;
  z-index: 99;
}

.header__item {
  text-decoration: none;
  line-height: 48px;
  display: block;
  min-width: 128px;
  text-align: center;
  color: rgb(8 75 131 / 70%);
}

.header__list {
  display: flex;
  flex: 1;
}

.header-wrap:first-child .header__item:first-child {
  border-start-start-radius: 8px;
  border-end-start-radius: 8px;
}

.header__item-user {
  border-radius: 8px;
}

.header__item-user .header__item {
  border-start-end-radius: 8px;
  border-end-end-radius: 8px;
}

.header__item:hover {
  box-shadow: 0 0 15px rgb(0 0 0 / 10%);
}

.header__item-btn {
  background-color: #bbe6e4;
  border-end-start-radius: 8px;
  border-end-end-radius: 8px;
  display: none;
  font-size: 1rem;
  height: 32px;
  line-height: 32px;
}

.header__item-user:hover {
  background-color: #bbe6e4;
  border-radius: 8px;
}

.header__item-user:hover .header__item-btn {
  display: block;
  cursor: pointer;
}

.router-link-exact-active {
  color: rgb(8 75 131);
}
</style>