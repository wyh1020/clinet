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
          let server = []
          if (this.$store.state.System.server === '') {
            const key = Object.keys(global.hitbdata.server)
            server = global.hitbdata.server[key][0];
          } else {
            server = [this.$store.state.System.server, this.$store.state.System.port]
          }
          if (this.$store.state.Edit.serverType === 'file') {
            getEditFiles(this, [server[0], server[1], this.$store.state.Edit.serverType, data])
          } else {
            getEdit(this, [server[0], server[1], data])
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
