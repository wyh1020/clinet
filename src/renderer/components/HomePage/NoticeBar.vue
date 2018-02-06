<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-bottom">
    <a class="navbar-brand" href="#" v-on:click="load(0)">系统通知：{{notice}}</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  </nav>
</template>

<script>

  export default {
    data() {
      return {
        notice: this.$store.state.Home.notice
      };
    },
    methods: {
    },
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
</style>
