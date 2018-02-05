<template>
  <div>
    <right-bar></right-bar>
    <table>
      <tr>
        <th v-on:click="load(1)">数据采集</th>
        <th v-on:click="load(2)">数据分析</th>
        <th v-on:click="load(3)">术语字典</th>
        <th v-on:click="load(4)">系统设置</th>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>    
    </table>
  </div>
</template>

<script>
  import RightBar from './RightBar';
  export default {
    components: { RightBar },
    data() {
      return {
        name: this.$route.name
      };
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
