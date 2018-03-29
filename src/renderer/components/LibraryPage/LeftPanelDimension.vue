<template>
  <div style="height:400px; overflow-y:auto;">
    <table>
      <tr>
        <th class="table-danger"> 维度选择</th>
      </tr>
      <tr v-for="(data, index) in xs" v-bind:key='index' v-on:click="setDimension(data, index)" v-bind:class="{'table-danger':flag == index}">
        <td>{{data}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { getLibrary } from '../../utils/LibraryServerFile';
  export default {
    data() {
      return {
        flag: null
      };
    },
    computed: {
      xs: {
        get() {
          return this.$store.state.Library.dimension
        }
      }
    },
    methods: {
      setDimension: function (data, index) {
        if (this.$store.state.Library.tableType === 'server') {
          this.flag = index
          this.$store.commit('LIBRARY_SET_DIMENSION', [this.$store.state.Stat.dimensionType, data]);
          this.$store.commit('LIBRARY_SET_SERVER_DIMENSION', data)
          this.$store.commit('LIBRARY_TABLE_PAGE', 0)
          getLibrary(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.Library.serverTable.tableName, 1, this.$store.state.Library.dimensionType, data])
          // getStat(this, [this.$store.state.System.server, this.$store.state.System.port], { tableName: this.$store.state.Stat.tableName, page: 0, username: this.$store.state.System.user.username, type: this.$store.state.Stat.dimensionType, value: this.$store.state.Stat.dimensionServer })
        } else {
          this.$store.commit('LIBRARY_TABLE_PAGE', 0)
          this.flag = index
          this.$store.commit('LIBRARY_SET_DIMENSION', [this.$store.state.Library.dimensionType, data]);
          this.$store.commit('SET_NOTICE', `当前页数${this.$store.state.Library.tablePage},共${this.$store.state.Library.tableCountPage}页`)
        }
      },
    },
  };
</script>

<style scoped>

</style>
