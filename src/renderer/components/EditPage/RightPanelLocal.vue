<template>
  <div>
    <table id="edit-rightpanellocal-table">
      <tr>
        <th class="table-danger" id="edit-rightpanellocal-title"> {{title}}</th>
      </tr>
      <tr class="edit-rightpanellocal-tr" v-for="(data, index) in xs" v-bind:key='index' v-on:click="loadFile(data, index)" v-bind:class="{'table-danger':flag == index}">
        <td>{{data}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import loadFile from '../../utils/LoadFile';
  import { getLibrary } from '../../utils/LibraryServerFile'
  import { getStat } from '../../utils/StatServerFile';
  import { getEditFiles, getEdit } from '../../utils/EditServerFile'
  export default {
    components: { },
    computed: {
      title: {
        get() {
          let x = '用户本地文件'
          if (this.$store.state.Edit.rightPanel === 'server') { x = '用户远程文件' }
          switch (this.$store.state.Edit.lastNav) {
            case '/stat':
              x = '数据分析文件'
              break;
            case '/library':
              x = '术语字典文件'
              break;
            case '/system':
              x = '本地导入文件'
              break;
            default:
              break
          }
          return x
        }
      },
      xs: {
        get() {
          let x = this.$store.state.Edit.files
          switch (this.$store.state.Edit.lastNav) {
            case '/stat':
              x = this.$store.state.Stat.files
              break;
            case '/library':
              x = this.$store.state.Library.files
              break;
            case '/system':
              x = this.$store.state.System.files
              break;
            default:
              break
          }
          return x
        },
      },
      flag: {
        get() {
          return this.$store.state.Edit.filesIndex
        }
      }
    },
    methods: {
      loadFile: function (data, index) {
        this.$store.commit('EDIT_SET_FILES_INDEX', index)
        if (data.endsWith('.cda')) {
          this.$store.commit('EDIT_SET_FILE_TYPE', 'cda')
        } else {
          this.$store.commit('EDIT_SET_FILE_TYPE', 'csv')
        }
        let x = 'user'
        switch (this.$store.state.Edit.lastNav) {
          case '/stat':
            x = 'stat'
            break;
          case '/library':
            x = 'library'
            break;
          default:
            break
        }
        if (this.$store.state.Edit.rightPanel === 'server') {
          this.$store.commit('EDIT_SET_LEFT_PANEL', 'table');
          switch (this.$store.state.Edit.lastNav) {
            case '/edit':
              if (this.$store.state.Edit.serverType === 'file') {
                getEditFiles(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.Edit.serverType, data])
              } else {
                getEdit(this, [this.$store.state.System.server, this.$store.state.System.port, data])
              }
              break;
            case '/library':
              this.$store.commit('LIBRARY_SET_TABLE_PAGE', 1);
              getLibrary(this, [this.$store.state.System.server, this.$store.state.System.port, data, 1])
              break;
            case '/stat':
              this.$store.commit('STAT_SET_TABLE_PAGE', 1)
              getStat(this, [this.$store.state.System.server, this.$store.state.System.port], { tableName: this.$store.state.Stat.serverTable.tableName, page: this.$store.state.Stat.tablePage, username: this.$store.state.System.user.username, type: this.$store.state.Stat.dimensionType, value: this.$store.state.Stat.dimensionServer })
              break;
            default:
              break;
          }
        } else {
          loadFile(this, data, x, 'edit')
        }
      },
    },
  };
</script>

<style scoped>

</style>
