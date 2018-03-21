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
        if (this.$store.state.Stat.tableType === 'server') {
          let server = []
          if (this.$store.state.System.server === '') {
            const key = Object.keys(global.hitbdata.server)
            server = global.hitbdata.server[key][0];
          } else {
            server = [this.$store.state.System.server, this.$store.state.System.port]
          }
          if (data.endsWith('.csv')) {
            this.$store.commit('STAT_TABLE_PAGE', 0)
            getStat(this, [server[0], server[1], data, 0, this.$store.state.System.user.username, this.$store.state.Stat.dimensionType, this.$store.state.Stat.dimensionServer])
            this.$store.commit('STAT_TABLE_NAME', data);
          } else {
            getStatFiles(this, [server[0], server[1], data, this.$store.state.System.user.username])
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
