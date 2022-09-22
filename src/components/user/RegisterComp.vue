<template>
  <div class="login-container">
    <div class="login">
      <div class="login-wrap"></div>
      <div class="login-wrap">
        <div class="login__heading">
          Sign up
          <div class="login__heading-text">
            Sign up if you don't have an account in here.
          </div>
        </div>
        <div class="login__container">
          <div class="login__container-wrap">
            <label class="login__container-label">Your email</label>
            <input
              type="email"
              class="login__input"
              placeholder="Enter your email"
              v-model="email"
            />
          </div>
          <div class="login__container-wrap">
            <label class="login__container-label">Your username</label>
            <input
              type="text"
              class="login__input"
              placeholder="Enter your username"
              v-model="username"
            />
          </div>
          <div class="login__container-wrap">
            <label class="login__container-label">Your password</label>
            <input
              type="password"
              class="login__input"
              placeholder="Enter your password"
              v-model="password"
            />
          </div>
          <div class="login__container-wrap">
            <label class="login__container-label">Re-Password</label>
            <input
              type="password"
              class="login__input"
              placeholder="Repeat Password"
              v-model="re_password"
            />
          </div>
        </div>
        <div class="login__footer">
          <button class="login__btn" @click.prevent="register">Sign up</button>
          <div class="login__footer-text">
            Have an account.
            <router-link :to="{ name: 'login-view' }">Sign in</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import userApi from "../../composables/handleUser.js";
export default {
  data: () => {
    return {
      username: "",
      password: "",
      re_password: "",
      email: "",
    };
  },
  methods: {
    register() {
      const toast = useToast();
      let check = true;
      if (
        !(
          this.username.length &&
          this.email.length &&
          this.password.length &&
          this.re_password.length
        )
      ) {
        check = false;
        toast.warning("Vui lòng nhập đầy đủ thông tin.");
      } else if (this.password != this.re_password) {
        check = false;
        toast.warning("Mật khẩu không trùng khớp.");
      }

      if (check) {
        toast.info("Đang đăng ký...");
        const promise = userApi.registerApi(
          this.username.trim(),
          this.email.trim(),
          this.password.trim()
        );

        setTimeout(() => {
          promise
            .then((res) => {
              res;
              toast.success("Đăng ký tài khoản thành công.");
              setTimeout(() => {
                this.$router.push({ name: "login-view" });
              }, 500);
            })
            .catch((res) => {
              toast.error(
                "Đăng ký không thành công.\nLỗi: " + res.response.data.logs
              );
            });
        }, 1000);
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    to;
    if (from.name) {
      next();
    } else {
      useToast().warning("Vui lòng bấm đăng ký từ trang chủ.");
      next({ name: "home-view" });
    }
  },
};
</script>
<style scoped>
</style>