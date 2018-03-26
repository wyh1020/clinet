<template>
  <div style="height:400px; overflow-y:auto;">
    <table id="stat-left-file-table">
      <tr>
        <th id="stat-left-file-th" class="table-danger"> 数据分析文件</th>
      </tr>
      <tr class="stat-left-file-tr" v-for="(data, index) in xs" v-bind:key='index' v-on:click="loadFile(data, index)" v-bind:class="{'table-danger':flag == index}">
        <td>{{data}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import loadFile from '../../utils/LoadFile';
  import chartLine from '../../utils/ChartLine';
  import chartScatter from '../../utils/ChartScatter';
  import chartRadar from '../../utils/ChartRadar';
  import chartBar from '../../utils/ChartBar';
  import chartPie from '../../utils/ChartPie';
  import { getStatFiles, getStat } from '../../utils/StatServerFile'
  export default {
    data() {
      return {
        flag: null
      };
    },
    computed: {
      xs: {
        get() {
          return this.$store.state.Stat.files
        }
      }
    },
    methods: {
      loadFile: function (data, index) {
        this.$store.commit('STAT_SET_FILE_FLAG');
        this.flag = index
        this.$store.commit('STAT_SET_FILE_INDEX', index);
        // 图表
        switch (this.$store.state.Stat.chartLeft) {
          case '柱状图':
            chartBar('chartLeft', null)
            break;
          case '折线图':
            chartLine('chartLeft', null)
            break;
          case '雷达图':
            chartRadar('chartLeft', null)
            break;
          case '散点图':
            chartScatter('chartLeft', null)
            break;
          case '饼图':
            chartPie('chartLeft', null)
            break;
          default: break;
        }
        switch (this.$store.state.Stat.chartRight) {
          case '柱状图':
            chartBar('chartRight', null)
            break;
          case '折线图':
            chartLine('chartRight', null)
            break;
          case '雷达图':
            chartRadar('chartRight', null)
            break;
          case '散点图':
            chartScatter('chartRight', null)
            break;
          case '饼图':
            chartPie('chartRight', null)
            break;
          default: break;
        }
        this.$store.commit('STAT_SET_TABLE_PAGE', 1)
        if (this.$store.state.Stat.isServer) {
          this.$store.commit('STAT_SET_TABLE_TYPE', 'server')
          if (data.endsWith('.csv')) {
            getStat(this, [this.$store.state.System.server, this.$store.state.System.port], { tableName: data, page: 1, username: this.$store.state.System.user.username, type: this.$store.state.Stat.dimensionType, value: this.$store.state.Stat.dimensionServer })
          } else {
            getStatFiles(this, [this.$store.state.System.server, this.$store.state.System.port], data, this.$store.state.System.user.username)
          }
        } else {
          loadFile(this, data, 'stat')
          this.$store.commit('STAT_SET_TABLE_TYPE', 'local');
        }
      },
    },
  };
</script>

<style scoped>

</style>
