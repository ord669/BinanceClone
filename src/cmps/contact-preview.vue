<template>
  <h4>{{ contact.name }}</h4>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  created() {},
};
</script>

<style>
</style>