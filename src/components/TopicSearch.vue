<template>
  <div class="topicSearch ui fluid search" v-bind:class="{loading: inPrgress}">
    <div class="ui icon huge input news-search-box">
      <input autofocus class="prompt" type="text" v-model="topic" @keydown="topicChanged" placeholder="Search for a topic...">
      <i class="search icon"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'topicSearch',
  data () {
    return {
      topic: '', // search keyword entered by user
      timer: null, // to handle delay in user input
      inPrgress: false // to indicate that user request is processed on real-time
    }
  },
  methods: {
    topicChanged: function (e) {
      let self = this
      self.inPrgress = true
      // remove the spaces before/after the search keyword
      if (e.target.value.trim()) {
        clearTimeout(self.timer)
        // wait until user stops typing and then send the topic for processing
        self.timer = setTimeout(function () {
          self.$emit('topicChanged', e.target.value.trim())
          self.inPrgress = false
        }, 1000)
      }
    }
  },
  created: function () {
    this.topic = ''
    this.inPrgress = false
  }
}
</script>
<style scoped>
.news-search-box {
  width: 300px;
}
</style>
