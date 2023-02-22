<template>
  <section class="contact-list">
    <div class="list-header">
      <h2>Contacts</h2>
      <div class="search">
        <input
          v-model="filterBy"
          name="txt"
          placeholder="Search"
          type="text"
          @input="onFilterBy"
        />
      </div>
      <button @click="this.$router.push('/contact/edit')">Add Contact</button>
    </div>

    <div
      @click="this.$router.push(`/contact/${contact._id}`)"
      class="contact-preview"
      v-for="contact in contacts"
      :key="contact._id"
    >
      <ContactPreview :contact="contact" />
      <section class="actions">
        <!-- <RouterLink :to="`/contact/${contact._id}`">
          <button>Details</button>
        </RouterLink> -->
        <RouterLink :to="`/contact/edit/${contact._id}`">
          <button @click.stop="">Edit</button>
        </RouterLink>
        <button @click.stop="onRemoveContact(contact._id)">x</button>
      </section>
    </div>
  </section>
</template>

<script>
import ContactPreview from "@/cmps/contact-preview.vue";

export default {
  props: {
    contacts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      filterBy: "",
    };
  },
  created() {},
  methods: {
    onRemoveContact(contactId) {
      this.$emit("remove", contactId);
    },
    onFilterBy() {
      this.$emit("filterBy", this.filterBy);
    },
  },
  components: {
    ContactPreview,
  },
};
</script>

<style>
</style>