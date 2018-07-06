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
      topic: '',
      timer: null,
      inPrgress: false
    }
  },
  methods: {
    topicChanged: function (e) {
      let self = this
      self.inPrgress = true
      if (e.target.value.trim()) {
        clearTimeout(self.timer)
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
