<template>
  <div class="login login-cs" >
    <div class="form-signin">
      <form data-bitwarden-watching="1" @submit.prevent="login">
        <!-- <img
        class="mb-4"
        src="/docs/5.0/assets/brand/bootstrap-logo.svg"
        alt=""
        width="72"
        height="57"
      /> -->
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
        <p v-if="incorrectAuth">Incorrect username or password</p>
        <div class="form-floating">
          <input
            v-model="username"
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Username</label>
        </div>
        <div class="form-floating">
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>

        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Login
        </button>
        <!-- <p class="mt-5 mb-3 text-muted">© 2017–2021</p> -->
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      incorrectAuth: false,
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("userLogin", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          console.log(err);
          this.incorrectAuth = true;
        });
    },
  },
};
</script>

<style scoped>

.login-cs {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>