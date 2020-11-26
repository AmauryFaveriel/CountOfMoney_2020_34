<template>
  <div>
      <h1>Cryptocurrencies page</h1>
      <div>
        <ul>
          <li v-for="(currency, index) in currencies" :key="index">
            {{ currency.name }} : {{ currency.USD }}
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      currencies: [],
      symbol: ['BTC', 'ETH', 'ADA'],
      conversion: ['USD', 'EUR'],
    };
  },
  created() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti', {
      params: {
        fsyms: this.symbol.join(','),
        tsyms: this.conversion.join(','),
        api_key: 'c7139e931ffc980c572fa5ebfc65e3afc1cf51e57820e34ec9e092dfae8398a1',
      },
    }).then((result) => {
      this.currencies = Object.entries(result.data).map((array) => ({
        name: array[0],
        ...array[1],
      }));
    });
  },
};
</script>

<style>

</style>
