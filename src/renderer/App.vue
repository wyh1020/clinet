<template>
  <div id="app" v-bind:style="{ height: height + 'px', overflow: 'hidden' }">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'clinet',
    data() {
      return {
        height: window.innerHeight
      };
    },
  };
</script>

<style>
  * {
    font-size: medium;
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
