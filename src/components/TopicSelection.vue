<template>
  <div class="topicSelection">
    <div class="ui fluid search">
      <div class="ui icon input">
        <input class="prompt" type="text" v-model="topic" @keydown="topicChanged" placeholder="Search for news on a specific topic...">
        <i class="search icon"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'topicSelection',
  data () {
    return {
      topic: '',
      timer: null
    }
  },
  methods: {
    topicChanged: function (e) {
      let self = this
      if (e.target.value.trim()) {
        clearTimeout(self.timer)
        self.timer = setTimeout(function () {
          self.$emit('topicChanged', e.target.value.trim())
        }, 1000)
      }
    }
  },
  created: function () {
    this.topic = ''
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
