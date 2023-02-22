<template>
  <section class="transfer-container">
    <div class="transfer-header">
      <h2>Transfer</h2>
    </div>
    <div class="transfer-body">
      <div class="card">
        <div class="card-header">
          <span>from</span>
          <span>balance</span>
        </div>
        <div class="card-body">
          <input v-model="amount" type="number" placeholder="0.00" />
          <span v-if="user">{{ getBalance }}USD</span>
        </div>
      </div>
      <div class="transfer-icon">
        <img src="@/assets/svg/transfer.svg" alt="" />
      </div>
      <div class="card">
        <div class="card-header send-money-to">
          <span>to</span>
          <form @submit.stop="onSendMoney">
            <select v-model="userTransfer">
              <option
                v-for="contact in contacts"
                :value="contact"
                :key="contact._id"
              >
                {{ contact.name }}
              </option>
            </select>
            <button>send</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { userService } from "@/services/user.service.js";

export default {
  data() {
    return {
      amount: null,
      userTransfer: null,
    };
  },
  async created() {
    this.$store.dispatch({ type: "onSetUser" });

    // this.user = await userService.getLoggedinUser();
  },
  methods: {
    onSendMoney() {
      console.log("ev: ", this.userTransfer);
      console.log("amount: ", this.amount);
      this.$store.dispatch({
        type: "sendMoney",
        user: { ...this.userTransfer },
        amount: this.amount,
      });
    },
  },
  computed: {
    getBalance() {
      return this.user.balance.toLocaleString();
    },
    contacts() {
      return this.$store.getters.contacts;
    },
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

