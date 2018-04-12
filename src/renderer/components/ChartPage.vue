<template>
  <div>
    <div class="row">
      <div class="col">
        adfadf
        <div id="chartPage" style="width: 600px; height:400px;" v-on:click="back"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      back: function () {
        this.$router.push('/stat');
      }
    },
  };
</script>