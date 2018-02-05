<template>
  <div>
    <right-bar></right-bar>
    <table>
      <tr>
        <th>文件名</th>
        <th>文件操作</th>
      </tr>
      <tr v-for="(path, index) in paths" v-bind:key='index'>
        <td>{{path}}</td>
        <td></td>
      </tr>
    </table>

    <div>
      {{paths}}
    </div>
  </div>
</template>

<script>
  import RightBar from './RightBar';
  export default {
    components: { RightBar },
    data() {
      return {
        file: ''
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
      load: function (n) {
        switch (n) {
          case 1:
            this.$router.push('/edit');
            break;
          case 2:
            this.$router.push('/stat');
            break;
          case 3:
            this.$router.push('/library');
            break;
          case 4:
            this.$router.push('/system');
            break;
          default:
            this.$router.push('/edit');
        }
      },
    },
  };
</script>

<style scoped>

</style>
