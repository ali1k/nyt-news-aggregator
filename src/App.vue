<template>
  <div id="app" class="ui grid container">
    <div class="row">
      <div class="ui massive breadcrumb">
        <h1 class="header section brand"> NYT News Aggregator </h1>
        <i class="right chevron icon divider"></i>
        <div class="section" v-if="topic"> 10 latest news items about <span class="ui big label">{{topic}}</span></div>
      </div>
    </div>
    <div class="row">
      <TopicSearch v-on:topicChanged="topicChanged"></TopicSearch>
    </div>
    <div class="row">
      <NewsList v-bind:topic="topic"></NewsList>
    </div>
    <div class="ui grey vertical footer segment form-page">
      The source code is available on <a href="https://github.com/ali1k/nyt-news-aggregator" target="_blank">Github</a>.
    </div>
  </div>
</template>

<script>
// to display list of news items
import NewsList from './components/NewsList'
// to enable real-time search on news items
import TopicSearch from './components/TopicSearch'

export default {
  name: 'App',
  components: {
    NewsList,
    TopicSearch
  },
  data () {
    return {
      topic: ''
    }
  },
  methods: {
    topicChanged: function (topic) {
      this.topic = topic
    }
  }
}
</script>

<style>
#app {
  padding-top: 10px;
  margin-top: 10px;
}
.ui.footer.form-page {
    bottom: 0;
    width: 100%;
    padding-top: 20px;
    text-align: center;
  }
</style>
