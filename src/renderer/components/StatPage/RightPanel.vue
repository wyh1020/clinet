<template>
  <div>
    <right-bar></right-bar>
    <div v-on:click="show">show echarts</div>
    <div id="chart" style="width: 600px; height:400px;"></div>
  </div>
</template>

<script>
  import RightBar from './RightBar';
  const echarts = require('echarts');
  export default {
    components: { RightBar },
    data() {
      return {
        name: this.$route.name
      };
    },
    methods: {
      show: function () {
        this.showChart()
      },
      showChart() {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.getElementById('chart'));
        // 指定图表的配置项和数据
        const option = {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
            data: ['销量']
          },
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    },
  };
</script>

<style scoped>

</style>
