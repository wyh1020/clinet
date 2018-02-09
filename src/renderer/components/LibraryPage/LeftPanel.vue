<template>
  <div>
    <table>
      <tr>
        <th class="table-danger"> 术语字典文件</th>
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
        flag: null
      };
    },
    computed: {
      xs: {
        get() {
          return this.$store.state.Library.files
        }
      }
    },
    methods: {
      loadFile: function (x) {
        loadFile(this, x, 'library')
      },
    },
  };
</script>

<style scoped>

</style>
