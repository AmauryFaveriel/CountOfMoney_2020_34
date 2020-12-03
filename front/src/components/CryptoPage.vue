<template>
  <div class="cryptopage-container">
    <section class="newsfeed-container">
      <ul class="card-container">
        <li v-for="(article, index) in newsfeed" :key="index" class="card">
          <a :href="article.url">
            <img :src="article.imageurl" alt="" class="card-img" />
            <div class="card-info">
              <div class="card-about">
                <a class="card-tag">{{ article.categories }}</a>
                <div class="card-time">
                  {{ timestampToDate(article.published_on) }}
                </div>
              </div>
              <h1 class="card-title">{{ article.title }}</h1>
              <div class="card-creator">
                by <a href="">{{ article.source }}</a>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </section>
    <section class="chart-container">
      <div id="chart">
        <chart
          type="line"
          height="350"
          :options="chartOptions"
          :series="series"
        ></chart>
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
  props: ['symbol'],
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
    this.getNewsfeed().then((result) => {
      this.newsfeed = result.data.Data;
    });
    this.getCharts()
      .then((result) => result.data.Data.Data)
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
          limit: 20,
        },
      });
    },
    timestampToDate(timestamp) {
      return new Date(timestamp * 1000).toLocaleDateString('en-US');
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #ebecf0;
  font-family: "Open Sans", sans-serif;
  min-height: 100vh;

  ul {
  list-style: none;
  }

  a {
    text-decoration: none;
    color: #172b4d;
  }

  h1 {
    font-family: "Song Myung", serif;
  }
}

.cryptopage-container {
  display: flex;
  justify-content: space-between;
}

.newsfeed-container {
  width: 45%;
}

.chart-container {
  width: 55%;
}

:root {
  font-size: 16px;
  --card-img-height: 200px;
}
.card-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  transition: all 200ms ease-in-out;
}

.card {
  align-self: flex-start;
  position: relative;
  width: 375px;
  min-width: 275px;
  margin: 1.25rem 0.75rem;
  background: white;
  transition: all 300ms ease-in-out;

  .card-img {
    width: 100%;
  }

  .card-info {
    position: relative;
    padding: 0.75rem 1.25rem;
    transition: all 200ms ease-in-out;

    .card-about {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 0;
      transition: all 200ms ease-in-out;

      .card-tag {
        width: auto;
        padding: 0.2rem 0.5rem;
        font-size: 12px;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 1px;
        background: #36b37e;
        color: #fff;
      }
    }

    .card-title {
      z-index: 10;
      font-size: 1.5rem;
      padding-bottom: 0.75rem;
      transition: all 350ms ease-in-out;
    }

    .card-creator {
      padding-bottom: 0.75rem;
      transition: all 250ms ease-in-out;
    }
  }
}
</style>
