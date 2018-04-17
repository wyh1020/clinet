<template>
  <div style="height:400px; overflow-y:auto;">
    <table id="stat-left-file-table">
      <tr>
        <th id="stat-left-file-th" class="table-danger"> 数据分析文件</th>
      </tr>
      <tr class="stat-left-file-tr" v-for="(data, index) in xs" v-bind:key='index' v-on:click="loadFile(data, index)" v-bind:class="{'table-danger':flag === index}">
        <td>{{data}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import loadFile from '../../utils/LoadFile';
  import chartLine from '../../utils/ChartLine';
  import chartBar from '../../utils/ChartBar';
  import { getStatFiles, getStat } from '../../utils/StatServerFile'
  export default {
    data() {
      return {
        // flag: null
      };
    },
    computed: {
      flag: {
        get() {
          let flag = []
          flag = this.$store.state.Stat.fileIndex.first
          return flag
        }
      },
      xs: {
        get() {
          let xs = []
          if (this.$store.state.Stat.isServer) {
            xs = this.$store.state.Stat.serverMenu.first
          } else {
            xs = this.$store.state.Stat.files
          }
          return xs
        }
      },
    },
    methods: {
      loadFile: function (data, index) {
        this.$store.commit('STAT_SET_FILE_FLAG');
        // this.flag = index
        // this.$store.commit('STAT_SET_FILE_NAME', data);
        this.$store.commit('STAT_SET_FILE_INDEX', ['first', index]);
        this.$store.commit('STAT_SET_TABLE_PAGE', 1)
        if (this.$store.state.Stat.isServer) {
          this.$store.commit('STAT_SET_TABLE_TYPE', 'server')
          if (data.endsWith('.csv')) {
            this.$store.commit('STAT_SET_CHART_IS_SHOW', true);
            getStat(this, [this.$store.state.System.server, this.$store.state.System.port], { tableName: data, page: 1, username: this.$store.state.System.user.username, type: this.$store.state.Stat.dimensionType, value: this.$store.state.Stat.dimensionServer })
          } else {
            this.$store.commit('STAT_SET_CHART_IS_SHOW', false);
            getStatFiles(this, [this.$store.state.System.server, this.$store.state.System.port], data, this.$store.state.System.user.username)
          }
        } else {
          // 图表
          chartBar('chartLeft', null)
          chartLine('chartRight', null)
          this.$store.commit('STAT_SET_CHART_IS_SHOW', true);
          loadFile(this, data, 'stat')
          this.$store.commit('STAT_SET_TABLE_TYPE', 'local');
        }
      },
    },
  };
</script>

<style scoped>

</style>
