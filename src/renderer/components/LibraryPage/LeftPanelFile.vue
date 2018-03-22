<template>
  <div>
    <table>
      <tr>
        <th class="table-danger" id="library-leftpanel">术语字典文件</th>
      </tr>
      <tr v-for="(data, index) in xs" v-bind:key='index' v-on:click="loadFile(data, index)" v-bind:class="{'table-danger':flag == index}" class="library-leftlist">
        <td>{{data}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import loadFile from '../../utils/LoadFile';
  import { getLibrary } from '../../utils/LibraryServerFile'
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
        this.$store.commit('LIBRARY_GET_ROW', 0);
        this.$store.commit('LIBRARY_SET_FILE_INDEX', index);
        if (this.$store.state.Library.tableType === 'server') {
          if (this.$store.state.System.server === '') {
            const key = Object.keys(global.hitbdata.server)
            const server = global.hitbdata.server[key][0];
            getLibrary(this, [server[0], server[1], data, 0])
          } else {
            getLibrary(this, [this.$store.state.System.server, this.$store.state.System.port, data, 0])
          }
          this.$store.commit('LIBRARY_TABLE_NAME', data);
        } else {
          loadFile(this, data, 'library')
          this.$store.commit('LIBRARY_SET_TABLE_TYPE', 'local');
        }
      },
    },
  };
</script>

<style scoped>

</style>
