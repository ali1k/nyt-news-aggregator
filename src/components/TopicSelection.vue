<template>
  <div class="topicSelection">
    <div class="ui fluid search">
      <div class="ui icon input">
        <input class="prompt" type="text" placeholder="Search for news on a specific topic...">
        <i class="search icon"></i>
      </div>
    </div>
    <div>
      <div class="">
        <select class="form-control" v-on:change="topicChanged">
          <option v-for="topic in topics" v-bind:value="topic.name" v-bind:key="topic.id">{{topic.name}}</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'topicSelection',
  data () {
    return {
      topics: [],
      topic: ''
    }
  },
  methods: {
    topicChanged: function (e) {
      for (var i = 0; i < this.topics.length; i++) {
        if (this.topics[i].id === e.target.value) {
          this.topic = this.topic[i]
        }
      }
      this.$emit('topicChanged', e.target.value)
    }
  },
  created: function () {
    this.topics = [
      {id: 1, name: 'Netherlands'},
      {id: 2, name: 'Iran'},
      {id: 3, name: 'Amsterdam'},
      {id: 4, name: 'USA'}
    ]
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
