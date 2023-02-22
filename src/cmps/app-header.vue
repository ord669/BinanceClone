<template>
  <header class="app-header header-container full">
    <img src="@/assets/svg/logo.svg" alt="" />
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/dashboard">exchange</RouterLink>
      <RouterLink to="/transfer">transfer</RouterLink>
      <RouterLink to="/contact">contacts</RouterLink>
    </nav>
    <LoginSignup
      v-if="!user"
      :user="user"
      @login="onLogin"
      @signup="onSignup"
    />
    <button v-else @click="onLogout">Logout</button>
  </header>
</template>

<script>
import LoginSignup from "@/cmps/login-signup.vue";
import { userService } from "@/services/user.service.js";

export default {
  data() {
    return {
      // user: this.$store.getters.user,
    };
  },
  async created() {
    this.$store.dispatch({ type: "onSetUser" });
  },
  methods: {
    async onLogin(credentials) {
      this.$store.dispatch({ type: "onLogin", credentials });
    },
    async onSignup(credentials) {
      this.$store.dispatch({ type: "onSignup", credentials });
    },
    async onLogout() {
      this.$store.dispatch({ type: "onLogout" });
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },

  components: {
    LoginSignup,
  },
};
</script>
