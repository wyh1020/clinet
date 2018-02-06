<template>
  <div>
    <right-bar></right-bar>
      <div class="row">
      <div class="col">
        <div id="chart1" style="width: 600px; height:400px;"></div>
      </div>
      <div class="col">
        <div id="chart2" style="width: 600px; height:400px;"></div>
      </div>
      <div class="col">
        <div class="alert alert-danger" role="alert">
          <h4 class="alert-heading">数据分析提示!</h4>
          <ol class="">
            <li class="">aaa</li>
            <li class="" aria-current="page">bbb</li>
          </ol>
        </div>
      </div>
    </div>

    
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
      loadPath: function () {
        this.$store.commit('GET_PATH', 'paths');
      },
      show: function () {
        this.showChart()
      },
    },
  };
</script>

<style scoped>

</style>
