<template>
  <div>
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
p{
  margin: 0;
}

.newsfeed-container{
  width: 30%;
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
