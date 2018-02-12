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
        this.flag = index
        this.$store.commit('LIBRARY_SET_DIMENSION', [this.$store.state.Library.dimensionType, data]);
      },
    },
  };
</script>

<style scoped>

</style>
