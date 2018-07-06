<template>
  <div id="app" class="ui grid container">
    <div class="row">
      <div class="ui massive breadcrumb">
        <h1 class="header section">NYT News Aggregator </h1>
        <i class="right chevron icon divider"></i>
        <div class="section" v-if="topic"> 10 latest news items about <span class="ui big grey label">{{topic}}</span></div>
      </div>
    </div>
    <div class="row">
      <TopicSelection v-on:topicChanged="topicChanged"></TopicSelection>
    </div>
    <div class="row">
      <Newslist v-bind:topic="topic"></Newslist>
    </div>
  </div>
</template>

<script>
import Newslist from './components/Newslist'
import TopicSelection from './components/TopicSelection'

export default {
  name: 'App',
  components: {
    Newslist,
    TopicSelection
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
</style>
