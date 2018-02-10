<template>
  <div>
    <table>
      <tr>
        <th class="table-danger"> 用户本地文件</th>
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
      xs: {
        get() {
          return this.$store.state.Edit.files
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
        loadFile(this, data, 'user')
      },
    },
  };
</script>

<style scoped>

</style>
