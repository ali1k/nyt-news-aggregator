<template>
  <div id="app" class="ui grid container">
    <div class="row">
      <sui-header size="huge">NYT News Aggregator</sui-header>
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
