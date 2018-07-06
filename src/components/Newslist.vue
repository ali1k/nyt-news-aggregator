<template>
  <div class="newsList">
    <div class="ui special cards">
      <NewsItem v-for="article in articles" v-bind:key="article.id" :article="article"></NewsItem>
    </div>
  </div>
</template>
<script>
import NewsItem from './NewsItem'

export default {
  name: 'newsList',
  components: {
    NewsItem
  },
  props: ['topic'],
  data () {
    return {
      articles: []
    }
  },
  methods: {
    updateTopic: function (topic) {
      // todo: store API key in a config file
      this.$http.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + encodeURIComponent(topic) + '&sort=newest&api-key=ba59dbb698fb4dd39c3574b67942513c')
        .then(response => {
          // todo: handle the empty result set
          this.prepareArticles(response.body.response.docs)
        })
    },
    prepareArticles: function (docs) {
      /* desired structure of an article to be rendered by UI
      {
        id: 0
        url: '',
        title: '',
        summary: '',
        thumbnail: ''
        date: ''
      }
      */
      let articles = []
      docs.forEach((doc) => {
        articles.push({
          id: doc._id,
          url: doc.web_url,
          title: doc.headline.main,
          summary: doc.snippet,
          thumbnail: this.getArticleThumbnail(doc.multimedia),
          date: doc.pub_date.split('T')[0]
        })
      })
      this.articles = articles
    },
    getArticleThumbnail: function (multimedia) {
      let thumbnail = ''
      multimedia.forEach((obj) => {
        if (obj.subtype === 'mediumThreeByTwo378') {
          // todo: add domain name
          thumbnail = 'https://static01.nyt.com/' + obj.url
        }
      })
      return thumbnail
    }
  },
  created: function () {
    this.updateTopic(this.topic)
  },
  watch: {
    topic: function (val) {
      this.updateTopic(val)
    }
  }
}
</script>
<style scoped>
  .media {
    max-width: 290px;
  }
  .hidden {
    display: none;
  }
</style>
