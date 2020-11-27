<template>
  <div class="cryptopage-container">
    <section class="newsfeed-container">
      <ul>
        <li v-for="(article, index) in newsfeed" :key="index">
          <a :href="article.url">
            <article class="article-container">
              <p class="article-categories">{{ article.categories }}</p>
              <img class="article-image" :src="article.imageurl" alt="">
              <h4 class="article-title">{{ article.title }}</h4>
              <p class="article-body">{{ article.body }}</p>
              <p class="article-source">{{ article.source }}</p>
            </article>
          </a>
        </li>
      </ul>
    </section>
    <section class="chart-container">
      <div id="chart">
        <chart type="line" height="350" :options="chartOptions" :series="series"></chart>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import chart from 'vue-apexcharts';

export default {
  components: {
    chart,
  },
  props: [
    'symbol',
  ],
  data() {
    return {
      newsfeed: null,
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: false,
          },
        },
        stroke: {
          curve: 'smooth',
        },
        markers: {
          size: 1,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
      },
      series: [],
    };
  },
  mounted() {
    this.getNewsfeed().then((result) => { this.newsfeed = result.data.Data; });
    this.getCharts().then((result) => result.data.Data.Data)
      .then((data) => {
        this.series = [
          {
            name: 'High',
            data: data.map((result) => result.high),
          },
          {
            name: 'Low',
            data: data.map((result) => result.low),
          },
          {
            name: 'Open',
            data: data.map((result) => result.open),
          },
          {
            name: 'Close',
            data: data.map((result) => result.close),
          },
        ];
        this.chartOptions = {
          ...this.chartOptions,
          xaxis: {
            categories: data.map((result) => this.timestampToDate(result.time)),
          },
        };
        console.log(this.chartOptions);
      });
  },
  methods: {
    getNewsfeed() {
      return axios.get('https://min-api.cryptocompare.com/data/v2/news/', {
        params: {
          lang: 'EN',
          categories: this.symbol,
        },
      });
    },
    getCharts() {
      return axios.get('https://min-api.cryptocompare.com/data/v2/histoday', {
        params: {
          fsym: this.symbol,
          tsym: 'USD',
          limit: 10,
        },
      });
    },
    timestampToDate(timestamp) {
      return new Date(timestamp * 1000).toLocaleDateString('en-US');
    },
  },
};
</script>

<style>
ul{
  list-style: none;
}
a{
  text-decoration: none;
}
p{
  margin: 0;
}

.cryptopage-container{
  display: flex;
  justify-content: space-between;
}

.newsfeed-container{
  width: 30%;
}

.chart-container{
  width: 70%;
}
.article-container{
  color: black;
  text-align: left;
  margin-bottom: 20px;
}
.article-categories {
  color: grey;
}
.article-image {
  width: 100%;
}
.article-title {
  margin: 0;
}
.article-body {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.article-source {
  color: grey;
}
</style>
