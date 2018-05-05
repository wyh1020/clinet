<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'clinet',
  };
</script>

<style>
  * {
    font-size: medium
  }

  body {
  background:
    radial-gradient(
      ellipse at top left,
      rgb(151, 221, 224) 40%,
      rgba(130, 224, 224, 0.9) 100%
    );
  }
</style>
