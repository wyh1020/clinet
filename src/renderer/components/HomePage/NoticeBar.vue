<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-bottom">
    <a id="notice-bar" class="navbar-brand" href="#">系统通知：{{notice}}</a>
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
