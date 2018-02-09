<template>
  <div>
    <right-bar></right-bar>
    <table>
      <tr>
        <th class="table-danger"> 用户本地文件</th>
      </tr>
      <tr v-for="(data, index) in xs" v-bind:key='index' v-on:click="loadFile(data)">
        <td>{{data}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import RightBar from './RightBar';
  import loadFile from '../../utils/LoadFile';
  export default {
    components: { RightBar },
    data() {
      return {
        name: this.$route.name
      };
    },
    computed: {
      xs: {
        get() {
          return this.$store.state.Edit.files
        }
      }
    },
    methods: {
      loadFile: function (x) {
        loadFile(this, x, 'user')
      },
    },
  };
</script>

<style scoped>

</style>
