<template>
  <div style="height:400px; overflow-y:auto;">
    <table id="stat-left-file-table">
      <tr>
        <th id="stat-left-file-th" class="table-danger"> 数据分析文件</th>
      </tr>
      <tr v-for="(data, index) in xs" v-bind:key='index' v-on:click="loadFile(data, index)" v-bind:class="{'table-danger':flag === index}" v-bind:id="'stat-left-file-tr'+index">
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
  import { sGetWt4 } from '../../utils/Server'
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
        this.$store.commit('STAT_SET_FILE_NAME', data);
        this.$store.commit('STAT_SET_FILE_INDEX', ['first', index]);
        this.$store.commit('STAT_SET_TABLE_PAGE', 1)
        if (data === '病案数据.csv') {
          if (this.$store.state.Stat.serverMenu.type === '二级菜单') {
            this.$store.commit('STAT_SET_SERVER_MENU', ['二级菜单', []]);
            this.$store.commit('STAT_SET_SERVER_MENU', ['三级菜单', []]);
          }
          if (this.$store.state.System.connectInfo) {
            // this.$store.commit('SYSTEM_SET_TOOLBAR', 'getServerData');
            this.$store.commit('SET_NOTICE', '远程病案数据');
            // 返回默认值页码
            this.$store.commit('SYSTEM_SET_LOCAL_PAGE', 1);
            // 保存分组数据类型
            this.$store.commit('SYSTEM_SET_COMPUTE_DATA', 'getServerData');
            sGetWt4(this, [this.$store.state.System.server, this.$store.state.System.port], 1, 'stat')
            // this.$store.commit('STAT_SET_SERVER_TABLE', this.$store.state.System.wt4);
          } else {
            this.$store.commit('SET_NOTICE', '服务器连接未设置,请在系统服务内连接');
          }
          chartBar('chartLeft', null)
          chartLine('chartRight', null)
          this.$store.commit('STAT_SET_CHART_IS_SHOW', 'chart');
        } else if (this.$store.state.Stat.isServer) {
          // this.$store.commit('STAT_SET_TABLE_TYPE', 'server')
          if (data.endsWith('.csv')) {
            this.$store.commit('STAT_SET_CHART_IS_SHOW', 'chart');
            getStat(this, [this.$store.state.System.server, this.$store.state.System.port], { tableName: data, page: 1, username: this.$store.state.System.user.username, type: this.$store.state.Stat.dimensionType, value: this.$store.state.Stat.dimensionServer }, 'stat')
          } else {
            if (this.$store.state.Stat.serverMenu.type === '二级菜单') {
              this.$store.commit('STAT_SET_SERVER_MENU', ['三级菜单', []]);
            }
            this.$store.commit('STAT_SET_CHART_IS_SHOW', 'menu');
            getStatFiles(this, [this.$store.state.System.server, this.$store.state.System.port], data, this.$store.state.System.user.username, this.$store.state.Stat.tableType)
          }
        } else {
          // 图表
          chartBar('chartLeft', null)
          chartLine('chartRight', null)
          this.$store.commit('STAT_SET_CHART_IS_SHOW', 'chart');
          loadFile(this, data, 'stat')
          this.$store.commit('STAT_SET_TABLE_TYPE', 'local');
        }
      },
    },
  };
</script>

<style scoped>

</style>
