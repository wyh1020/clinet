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
  import { getStat } from '../../utils/StatServerFile'
  export default {
    data() {
      return {
        flag: null
      };
    },
    computed: {
      xs: {
        get() {
          return this.$store.state.Stat.dimension
        }
      }
    },
    methods: {
      setDimension: function (data, index) {
        if (this.$store.state.Stat.tableType === 'server') {
          this.flag = index
          this.$store.commit('STAT_SET_DIMENSION', [this.$store.state.Stat.dimensionType, data]);
          this.$store.commit('STAT_SET_SERVER_DIMENSION', data)
          this.$store.commit('STAT_TABLE_PAGE', 0)
          getStat(this, [this.$store.state.System.server, this.$store.state.System.port], { tableName: this.$store.state.Stat.serverTable.tableName, page: 0, username: this.$store.state.System.user.username, type: this.$store.state.Stat.dimensionType, value: this.$store.state.Stat.dimensionServer })
        } else {
          this.$store.commit('STAT_TABLE_PAGE', 0)
          this.flag = index
          this.$store.commit('STAT_SET_DIMENSION', [this.$store.state.Stat.dimensionType, data]);
        }
      },
    },
  };
</script>

<style scoped>

</style>
