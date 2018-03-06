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
        this.flag = index
        this.$store.commit('STAT_SET_DIMENSION', [this.$store.state.Stat.dimensionType, data]);
      },
    },
  };
</script>

<style scoped>

</style>
