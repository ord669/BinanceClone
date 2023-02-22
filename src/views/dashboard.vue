<template >
  <section class="dashboard">
    <h2>{{currency}}/USDT</h2>
  <select v-model="currency" @change="reLoad" >
              <option
                v-for="currency in currencies"
                :value="currency"
                :key="currency"
              >
                {{ currency }}
              </option>
            </select>
    <p style="font-size: 12px">
      <img src="@/assets/svg/miniP.svg" alt="" />
      Bitcoin Price
    </p>
    <div id="simple_chart" style="height: 600px" />
  </section>
</template>

<script>
import { bitcoinService } from "../services/bitcoin.service";
import { dispose, init } from "klinecharts";

export default {
  data() {
    return {
      data: null,
      currencies:null,
      currency:'BTC'
    };
  },
  async created() {
      // this.data = await bitcoinService.getMarketPriceHistory(currency);
      // this.runChart(this.data);
      this.loadChart();
      this.getCurrencies()
    },

  name: "SimpleChart",
  methods: {
    runChart(data) {
      const chart = init("simple_chart");
      chart.createIndicator("MA", false, { id: "candle_pane" });
      chart.createIndicator("VOL");
      chart.applyNewData(data);
    },
   async loadChart(){
      this.data = await bitcoinService.getMarketPriceHistory(this.currency);
      this.runChart(this.data);
    },
    async getCurrencies(){
      this.currencies = await bitcoinService.getCurrencies();
      console.log('this.currencies: ', this.currencies);
    },
    reLoad(){
      this.loadChart()
    }

  },
  destroyed: function () {
    dispose("simple_chart");
  },
};
</script>

<style>
</style>