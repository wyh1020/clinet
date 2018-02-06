<template>
  <div>
    <right-bar></right-bar>
  </div>
</template>

<script>
  import RightBar from './RightBar';
  export default {
    components: { RightBar },
    data() {
      return {
        name: this.$route.name
      };
    },
    methods: {
      show: function () {
      },
    },
  };
</script>

<style scoped>

</style>
