<template>
  <form
    @submit.prevent="save(this.contact)"
    v-if="contact"
    class="contact-edit"
  >
    <input type="text" v-model="contact.name" />

    <button>Save</button>
  </form>
</template>

<script>
import { contactService } from "@/services/contact.service.js";
export default {
  data() {
    return {
      contact: null,
    };
  },
  async created() {
    const contactId = this.$route.params._id;
    if (contactId) {
      this.contact = await contactService.get(contactId);
    } else {
      this.contact = contactService.getEmptyContact();
    }
  },
  methods: {
    save(contact) {
      this.$store.dispatch({ type: "save", contact });
      this.$router.push("/contact");
    },
  },
};
</script>

