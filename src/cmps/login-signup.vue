<template>
  <button @click="toggleSignup">{{ isSignup ? "Signup" : "Login" }}</button>

  <form v-if="isSignup" @submit="onLogin" class="login-form">
    <select v-model="credentials" :name="user">
      <option v-for="user in users" v-bind:value="user" :key="user._id">
        {{ user.name }}
      </option>
    </select>
    <button>Login!</button>
  </form>

  <form v-if="!isSignup" class="signup-form" @submit="onSignup">
    <input v-model="credentials.fullname" placeholder="fullname" required />
    <input v-model="credentials.username" placeholder="name" required />
    <input v-model="credentials.password" placeholder="password" required />

    <button>Signup!</button>
  </form>
</template>

<script>
import { userService } from "@/services/user.service.js";
export default {
  props: ["user"],
  emits: ["signup", "login"],
  data() {
    return {
      users: [],
      credentials: {},
      isSignup: false,
      userSelected: null,
    };
  },
  async created() {
    this.users = await userService.getUsers();
    this.credentials = { username: "", password: "", fullname: "" };
    this.isSignup = this.user ? true : false;
  },

  methods: {
    clearState() {
      this.credentials = { username: "", password: "", fullname: "" };
      this.isSignup = false;
    },
    onLogin(ev = null) {
      if (ev) ev.preventDefault();
      if (!this.credentials.username) return;
      this.$emit("login", this.credentials);
      this.clearState();
    },
    onSignup(ev = null) {
      if (ev) ev.preventDefault();
      if (
        !this.credentials.username ||
        !this.credentials.password ||
        !this.credentials.fullname
      )
        return;
      this.$emit("signup", this.credentials);
      this.clearState();
    },
    toggleSignup() {
      console.log("is:");
      this.isSignup = !this.isSignup;
    },
  },
  components: {},
};
</script>

