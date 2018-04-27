<template>
  <div style="height:400px; overflow-y:auto;">
    <table id="stat-left-dimension-table">
      <tr>
        <th id="stat-left-dimension-th" class="table-danger"> 维度选择</th>
      </tr>
      <tr class="stat-left-dimension-tr" v-for="(data, index) in xs" v-bind:key='index' v-on:click="setDimension(data, index)" v-bind:class="{'table-danger':flag == index}">
        <td>{{data}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { getStat } from '../../utils/StatServerFile';
  import chartLine from '../../utils/ChartLine';
  import chartScatter from '../../utils/ChartScatter';
  import chartRadar from '../../utils/ChartRadar';
  import chartBar from '../../utils/ChartBar';
  import chartPie from '../../utils/ChartPie';
  import chartData from '../../utils/ChartData';
  export default {
    data() {
      return {
        flag: null
      };
    },
    computed: {
      xs: {
        get() {
          let a = null
          a = this.$store.state.Stat.dimension
          return a
        }
      }
    },
    methods: {
      setDimension: function (data, index) {
        let table = []
        if (this.$store.state.Stat.tableType === 'server') {
          this.flag = index
          this.$store.commit('STAT_SET_DIMENSION', [this.$store.state.Stat.dimensionType, data]);
          this.$store.commit('STAT_SET_SERVER_DIMENSION', data)
          this.$store.commit('STAT_TABLE_PAGE', 0)
          getStat(this, [this.$store.state.System.server, this.$store.state.System.port], { tableName: this.$store.state.Stat.serverTable.tableName, page: 1, username: this.$store.state.System.user.username, type: this.$store.state.Stat.dimensionType, value: this.$store.state.Stat.dimensionServer }, 'stat')
          table = this.$store.state.Stat.serverTable.data
        } else {
          this.$store.commit('STAT_TABLE_PAGE', 0)
          this.$store.commit('SET_NOTICE', `当前页数${this.$store.state.Stat.tablePage},共${this.$store.state.Stat.countPage}页`)
          this.flag = index
          this.$store.commit('STAT_SET_DIMENSION', [this.$store.state.Stat.dimensionType, data]);
          table = this.$store.state.Stat.localTable
        }
        chartData(this, table, this.$store.state.Stat.selectedRow, this.$store.state.Stat.selectedCold)
        switch (this.$store.state.Stat.chartLeft) {
          case '柱状图':
            chartBar('chartLeft', this.$store.state.Stat.chartData)
            break;
          case '折线图':
            chartLine('chartLeft', this.$store.state.Stat.chartData)
            break;
          case '雷达图':
            chartRadar('chartLeft', this.$store.state.Stat.chartData)
            break;
          case '散点图':
            chartScatter('chartLeft', this.$store.state.Stat.chartData)
            break;
          case '饼图':
            chartPie('chartLeft', this.$store.state.Stat.chartData)
            break;
          default: break;
        }
        switch (this.$store.state.Stat.chartRight) {
          case '柱状图':
            chartBar('chartRight', this.$store.state.Stat.chartData)
            break;
          case '折线图':
            chartLine('chartRight', this.$store.state.Stat.chartData)
            break;
          case '雷达图':
            chartRadar('chartRight', this.$store.state.Stat.chartData)
            break;
          case '散点图':
            chartScatter('chartRight', this.$store.state.Stat.chartData)
            break;
          case '饼图':
            chartPie('chartRight', this.$store.state.Stat.chartData)
            break;
          default: break;
        }
      },
    },
  };
</script>

<style scoped>

</style>
