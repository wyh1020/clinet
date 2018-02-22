<template>
  <div style="height:400px; overflow-y:auto;">
    <table>
      <tr>
        <th class="table-danger"> 数据分析文件</th>
      </tr>
      <tr v-for="(data, index) in xs" v-bind:key='index' v-on:click="loadFile(data, index)" v-bind:class="{'table-danger':flag == index}">
        <td>{{data}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import loadFile from '../../utils/LoadFile';
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
        this.flag = index
        loadFile(this, data, 'stat')
      },
    },
  };
</script>

<style scoped>

</style>
