<template>
  <div class="newsList">
    <div class="ui special cards">
      <div class="ui active inverted dimmer" v-if="inPrgress">
        <div class="ui large active centered inline text loader">Loading</div>
      </div>
      <NewsItem v-for="article in articles" v-bind:key="article.id" :article="article"></NewsItem>
    </div>

    <div class="ui icon warning message" v-if="emptyResults">
      <i class="ban icon"></i>
      No results was found! Please try another topic, maybe you are luckier there!
    </div>
  </div>
</template>
<script>
// to handle each individual news item
import NewsItem from './NewsItem'

export default {
  name: 'newsList',
  components: {
    NewsItem
  },
  props: ['topic'],
  data () {
    return {
      // list of news items
      articles: [],
      // to indicate the case where no results we found
      emptyResults: false,
      // to show a loader indicator while the request is handled by NYT API
      inPrgress: false
    }
  },
  methods: {
    // adapts the API query based on the topic searched by user
    updateTopic: function (topic) {
      this.inPrgress = true
      // todo: store API key in a config file
      const apiKey = 'ba59dbb698fb4dd39c3574b67942513c'
      this.$http.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + encodeURIComponent(topic) + '&sort=newest&api-key=' + apiKey)
        .then(response => {
          // checks the resutls of NYT APIs
          if (!response.body.response.docs.length) {
            this.emptyResults = true
          } else {
            this.emptyResults = false
          }
          // parses the output of NYT API to only extract the properties of interest
          this.prepareArticles(response.body.response.docs)
          this.inPrgress = false
        })
    },
    // parse the JSON result returned by the NYT API
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
          date: doc.pub_date.split('T')[0] // only get the date and not the time
        })
      })
      this.articles = articles
    },
    // retrieves the best image size for showing as thumbnail
    getArticleThumbnail: function (multimedia) {
      let thumbnail = ''
      multimedia.forEach((obj) => {
        if (obj.subtype === 'mediumThreeByTwo378') {
          // adds base domain name to the relative path returned by API for images
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
