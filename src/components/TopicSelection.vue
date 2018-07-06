<template>
  <div class="topicSelection ui fluid search" v-bind:class="{loading: inPrgress}">
    <div class="ui icon huge input news-search-box">
      <input class="prompt" type="text" v-model="topic" @keydown="topicChanged" placeholder="Search for a topic...">
      <i class="search icon"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'topicSelection',
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
      let userInput = e.target.value.trim()
      if (userInput) {
        clearTimeout(self.timer)
        // wait until user stops typing and then send the topic for processing
        self.timer = setTimeout(function () {
          self.$emit('topicChanged', userInput)
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
