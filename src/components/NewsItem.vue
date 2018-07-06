<template>
  <div class="newsItem card">
    <div class="image">
      <img class="media" v-if="article.thumbnail" v-bind:src="article.thumbnail" />
      <img class="media" v-else src="../assets/placeholder.jpg" />
    </div>
    <div class="content">
      <div class="header">
        <a v-on:click="visibleSummary = !visibleSummary">{{article.title}}</a>
      </div>
      <div class="meta">
        <span class="date">{{article.date}}</span>
      </div>
      <div class="description" v-if="visibleSummary">
        <p v-html="article.summary"></p>
         <a v-bind:href="article.url" target="_blank">Read More...</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'newsItem',
  props: ['article'],
  data () {
    return {
      visibleSummary: false
    }
  },
  methods: {
    showSummary: function () {

    }
  },
  created: function () {

  }
}
</script>

<style scoped>
</style>
