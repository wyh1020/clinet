<template>
  <div style="height:400px; overflow-y:auto;">
    <table>
      <tr>
        <th class="table-danger"> 数据分析文件</th>
      </tr>
      <tr v-for="(data, index) in xs" v-bind:key='index' v-on:click="loadFile(data)">
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
        name: this.$route.name
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
      loadFile: function (x) {
        loadFile(this, x, 'stat')
      },
    },
  };
</script>

<style scoped>

</style>
