<template>
  <div>
    <div class="row" style="margin-top: 5%">
      <div class="col"></div>
      <div class="col">
        <div id="chartPage" style="width: 1200px; height:800px;" v-on:dblclick="back"></div>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
  import chartData from '../utils/ChartData';
  import chartBar from '../utils/ChartBar';
  import chartLine from '../utils/ChartLine';
  import chartScatter from '../utils/ChartScatter';
  import chartRadar from '../utils/ChartRadar';
  import chartPie from '../utils/ChartPie';
  export default {
    mounted: function () {
      this.chart()
    },
    methods: {
      back: function () {
        this.$router.push('/stat');
      },
      chart: function () {
        let type = ''
        const id = 'chartPage'
        if (this.$store.state.Stat.chartOption === 'left') {
          type = this.$store.state.Stat.chartLeft
        } else {
          type = this.$store.state.Stat.chartRight
        }
        let table = []
        if (this.$store.state.Stat.tableType === 'local') {
          table = this.$store.state.Stat.localTable
        } else if (this.$store.state.Stat.tableType === 'server') {
          table = this.$store.state.Stat.serverTable.data
        } else {
          table = this.$store.state.Stat.compareTable
        }
        chartData(this, table, this.$store.state.Stat.selectedRow, this.$store.state.Stat.selectedCol)
        switch (type) {
          case '柱状图':
            chartBar(id, this.$store.state.Stat.chartData)
            break;
          case '折线图':
            chartLine(id, this.$store.state.Stat.chartData)
            break;
          case '雷达图':
            chartRadar(id, this.$store.state.Stat.chartData)
            break;
          case '散点图':
            chartScatter(id, this.$store.state.Stat.chartData)
            break;
          case '饼图':
            chartPie(id, this.$store.state.Stat.chartData)
            break;
          default: break;
        }
      },
    },
  };
</script>