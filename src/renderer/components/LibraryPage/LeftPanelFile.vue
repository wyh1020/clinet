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
        // flag: null
      };
    },
    computed: {
      xs: {
        get() {
          return this.$store.state.Library.files
        }
      },
      flag: {
        get() {
          return this.$store.state.Library.fileIndex
        }
      }
    },
    methods: {
      loadFile: function (data, index) {
        this.$store.commit('LIBRARY_SET_SERVER_TABLE_TITLE', data);
        this.$store.commit('SYSTEM_GET_SHARE_FILE_NAME', this.$store.state.Library.files[index]);
        this.$store.commit('LIBRARY_GET_ROW', 0);
        this.$store.commit('LIBRARY_SET_FILE_INDEX', index);
        if (this.$store.state.Library.tableType === 'server') {
          this.$store.commit('LIBRARY_SET_TABLE_PAGE', 1);
          getLibrary(this, [this.$store.state.System.server, this.$store.state.System.port], data, 1, null, null, 'library', 'server')
        } else if (this.$store.state.Library.tableType === 'block') {
          this.$store.commit('LIBRARY_SET_TABLE_PAGE', 1);
          getLibrary(this, [this.$store.state.System.server, this.$store.state.System.port], data, 1, null, null, 'library', 'block')
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
