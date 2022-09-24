<template>
  <div class="login-container">
    <div class="login">
      <div class="login-wrap"></div>
      <div class="login-wrap">
        <div class="login__heading">
          Sign in
          <div class="login__heading-text">
            Sign in if you have an account in here.
          </div>
        </div>
        <div class="login__container">
          <div class="login__container-wrap">
            <label class="login__container-label">Your email/username</label>
            <input
              type="text"
              class="login__input"
              required
              placeholder="Enter your email or username"
              v-model="username"
            />
          </div>
          <div class="login__container-wrap">
            <label class="login__container-label">Password</label>
            <input
              type="password"
              class="login__input"
              placeholder="Enter your password"
              v-model="password"
            />
          </div>
        </div>
        <div class="login__footer">
          <button class="login__btn" @click.prevent="login">Sign in</button>
          <p class="login__footer-text">
            Not a member?
            <router-link :to="{ name: 'register-view' }">Sign up</router-link>
          </p>
        </div>
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
      username: "",
      password: "",
      remember: true,
    };
  },
  methods: {
    login() {
      const toast = useToast();
      if (this.username.length && this.password.length) {
        toast.info("Đang đăng nhập...");
        const promise = userApi.loginApi(
          this.username.trim(),
          this.password.trim(),
          this.remember
        );
        setTimeout(() => {
          promise
            .then((res) => {
              document.cookie = `token=${res.data.token};path=/`;
              toast.success(
                "Đăng nhập thành công.\nChuyển về trang chủ sau 3 giây."
              );
              setTimeout(() => {
                // this.$router.push({ name: "home-view" });
                location.href = "/";
              }, 3000);
            })
            .catch((res) => {
              toast.error(
                "Đăng nhập thất bại.\nLỗi: " + res.response.data.logs
              );
            });
        }, 1000);
      } else {
        toast.warning("Vui lòng nhập đầy đủ thông tin.");
      }
    },
  },

  beforeRouteEnter(to, from, next) {
    to;
    if (from.name) {
      next();
    } else {
      useToast().warning("Vui lòng bấm đăng nhập từ trang chủ.");
      next({ name: "home-view" });
    }
  },
};
</script>

<style>
.login-container {
  height: 100vh;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login {
  width: 80%;
  height: 70%;
  background-color: rgb(51 51 51 / 15%);
  display: flex;
  border-radius: 16px;
  box-shadow: 0 0 16px rgb(0 0 0 / 30%);
}

.login-wrap:first-child {
  width: 50%;
  display: block;
  background-color: rgb(1 167 194 / 40%);
  border-top-left-radius: 16px;
  border-end-start-radius: 16px;
}

.login-wrap:last-child {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 5%;
}

.login__heading {
  width: 100%;
  font-size: 2rem;
  margin-bottom: 24px;
  margin-top: 16px;
  font-weight: 600;
}

.login__heading-text {
  font-size: 1rem;
  font-weight: 300;
  margin-top: 8px;
  color: rgb(0 0 0 / 60%);
}

.login__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.login__container-wrap {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 80%;
}

.login__container-label {
  font-size: 1rem;
  color: rgb(0 0 0 / 80%);
}

.login__input {
  font-size: 1rem;
  padding: 8px 16px;
  border-radius: 24px;
  outline: none;
  border: none;
  width: 100%;
  margin-top: 8px;
}

.login__footer {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: -48px;
  align-items: center;
}

.login__btn {
  width: 128px;
  height: 36px;
  text-transform: uppercase;
  font-size: 1rem;
  border: none;
  border-radius: 24px;
  background-color: #01a7c2;
  color: #fff;
  font-weight: 600;
}

.login__btn:hover {
  box-shadow: 0 0 12px rgb(1 167 194 / 40%);
  cursor: pointer;
}

.login__footer-text {
  font-size: 0.8rem;
  margin-top: 16px;
}

@media screen and (max-width: 739px) {
  .login-wrap:first-child {
    display: none;
  }
}
</style>