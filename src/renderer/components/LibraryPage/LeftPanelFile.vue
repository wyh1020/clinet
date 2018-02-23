<template>
  <div>
    <table>
      <tr>
        <th class="table-danger" id="library-leftpanel">术语字典文件</th>
      </tr>
      <tr v-for="(data, index) in xs" v-bind:key='index' v-on:click="loadFile(data, index)" v-bind:class="{'table-danger':flag == index}" id="library-leftlist">
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
      loadFile: function (data, index) {
        this.flag = index;
        this.$store.commit('LIBRARY_TABLE_PAGE', [0, true]);
        loadFile(this, data, 'library')
      },
    },
  };
</script>

<style scoped>

</style>
