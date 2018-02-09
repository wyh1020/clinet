<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-bottom">
    <a class="navbar-brand" href="#" v-on:click="load(0)">系统通知：{{notice}}</a>
  </nav>
</template>

<script>

  export default {
    computed: {
      notice: {
        get() {
          return this.$store.state.Home.notice
        }
      }
    }
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
</style>
