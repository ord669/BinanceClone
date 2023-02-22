<template>
  <ContactList
    v-if="contacts"
    @filterBy="loadNewContacts"
    :contacts="contacts"
    @remove="removeContact"
  />
</template>

<script>
import ContactList from "@/cmps/contact-list.vue";

export default {
  data() {
    return {
      filterBy: {
        name: "s",
      },
    };
  },
  async created() {
    // this.$store.dispatch({ type: "loadContacts" });
    this.loadNewContacts();
  },
  methods: {
    async removeContact(contactId) {
      this.$store.dispatch({ type: "removeContact", contactId });
    },
    loadNewContacts(filterBy) {
      this.$store.dispatch({ type: "loadContacts", filterBy });
    },
  },
  computed: {
    contacts() {
      return this.$store.getters.contacts;
    },
  },

  components: {
    ContactList,
  },
};
</script>

