<template>
  <div>
    <left-bar></left-bar>
    <left-doc></left-doc>

  </div>
</template>

<script>
  import LeftBar from './LeftBar';
  import LeftDoc from './LeftDoc';
  export default {
    components: { LeftBar, LeftDoc },
  };
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

</style>
