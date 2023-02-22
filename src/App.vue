
<template>
  <main class="main-container">
    <AppHeader />
    <RouterView />
  </main>
</template>

<script >
import AppHeader from "./cmps/app-header.vue";

export default {
  components: {
    AppHeader,
  },
};
</script>