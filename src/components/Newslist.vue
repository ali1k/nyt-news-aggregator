<template>
  <div class="newsList">
    <div class="ui special cards">
      <div class="card" v-for="article in articles" v-bind:key="article.id">
        <div class="image">
          <img class="media" v-if="article.thumbnail" v-bind:src="article.thumbnail" />
          <img class="media" v-else src="../assets/placeholder.jpg" />
        </div>
        <div class="content">
          <div class="header">
            <a v-bind:href="article.url" target="_blank">{{article.title}}</a>
          </div>
          <div class="description" v-html="article.summary"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'newslist',
  props: ['topic'],
  data () {
    return {
      articles: []
    }
  },
  methods: {
    updateTopic: function (topic) {
      // todo: store API key in a config file
      this.$http.get('http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + encodeURIComponent(topic) + '&api-key=ba59dbb698fb4dd39c3574b67942513c')
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
      }
      */
      let articles = []
      docs.forEach((doc) => {
        articles.push({id: doc._id, url: doc.web_url, title: doc.headline.main, summary: doc.snippet, thumbnail: this.getArticleThumbnail(doc.multimedia)})
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .media {
    max-width: 290px;
  }
  .hidden {
    display: none;
  }
</style>
