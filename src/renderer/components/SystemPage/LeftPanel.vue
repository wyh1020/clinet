<template>
  <div>
    <table>
      <tr>
        <th>文件名</th>
        <th>文件操作</th>
      </tr>
      <tr v-for="(path, index) in paths" v-bind:key='index'>
        <td>{{path}}</td>
        <td v-on:click="load(path)">
          <button>导入文件</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        name: this.$route.name
      };
    },
    computed: {
      paths: {
        get() {
          return this.$store.state.System.paths
        }
      }
    },
    methods: {
      load: function (path) {
        console.log(path)
        this.$store.commit('GET_FILE', path);
      },
    },
  };
</script>

<style scoped>

</style>
