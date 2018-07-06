<template>
  <div class="newsItem card animated zoomIn" @mouseover="onFocus = !onFocus" @mouseout="onFocus = !onFocus"  v-bind:class="{blue: onFocus, raised: onFocus}">
    <a class="image" v-on:click="visibleSummary = !visibleSummary">
      <img class="media" v-if="article.thumbnail" v-bind:src="article.thumbnail" />
      <img class="media" v-else src="../assets/placeholder.jpg" />
    </a>
    <div class="content">
      <div class="header">
        <a v-on:click="visibleSummary = !visibleSummary">{{article.title}}</a>
      </div>
      <div class="meta">
        <span class="date">{{article.date}}</span>
      </div>
      <div class="description animated fadeInDown" v-if="visibleSummary">
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
      visibleSummary: false,
      onFocus: false
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
