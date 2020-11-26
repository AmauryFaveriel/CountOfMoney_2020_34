<template>
  <div>
    <section class="newsfeed-container">
      <ul>
        <li v-for="(article, index) in newsfeed" :key="index">
          <a :href="article.url">
            <article class="article-container">
              <img :src="article.imageurl" alt="">
              <h4>{{ article.title }}</h4>
              <p>{{ article.body }}</p>
            </article>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: [
    'symbol',
  ],
  data() {
    return {
      newsfeed: null,
    };
  },
  mounted() {
    axios.get('https://min-api.cryptocompare.com/data/v2/news/', {
      params: {
        lang: 'EN',
        categories: this.symbol,
      },
    }).then((result) => { this.newsfeed = result.data.Data; });
  },
  methods: {
    getNewsfeed() {
      axios.get('https://min-api.cryptocompare.com/data/v2/news/', {
        params: {
          lang: 'EN',
          categories: this.symbol,
        },
      });
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
.article-container{
  color: black;
}
</style>
