<template>
  <div>
    <table id="edit-right-table">
      <tr>
        <th class="table-danger" id="edit-right-title"> {{title}}</th>
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
    components: { },
    computed: {
      title: {
        get() {
          let x = '用户本地文件'
          switch (this.$store.state.Edit.lastNav) {
            case '/stat':
              x = '数据分析文件'
              break;
            case '/library':
              x = '术语字典文件'
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
            default:
              break
          }
          return x
        }
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
        loadFile(this, data, x, 'edit')
      },
    },
  };
</script>

<style scoped>

</style>
