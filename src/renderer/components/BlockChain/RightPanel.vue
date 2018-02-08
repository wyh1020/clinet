<template>
  <div>
    <server-bar v-if="toolbar == '区块链服务-服务器节点设置'"></server-bar>
    <user-bar v-if="toolbar == '区块链服务-账户设置'"></user-bar>
    <block-bar v-if="toolbar == '区块链服务-区块查询'"></block-bar>
    <drg-bar v-if="toolbar == '区块链服务-DRG分组服务'"></drg-bar>
    <stat-bar v-if="toolbar == '区块链服务-DRG分析计算'"></stat-bar>
    <table>
      <tr v-for="(line, index) in file" v-bind:key='index'>
        <td v-for="(filed, index) in line" v-bind:key='index'>{{line[index]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import UserBar from './UserBar';
  import BlockBar from './BlockBar';
  import ServerBar from './ServerBar';
  import DrgBar from './DrgBar';
  import StatBar from './StatBar';

  export default {
    components: { DrgBar, ServerBar, UserBar, StatBar, BlockBar },
    data() {
      return {
        flag: null
      }
    },
    computed: {
      file: {
        get() {
          const f = [];
          let len = this.$store.state.System.file.length;
          if (len > 99) { len = 99 }
          for (let i = 0; i < len; i += 1) {
            f.push(this.$store.state.System.file[i].split(','))
          }
          return f
        }
      },
      toolbar: {
        get() {
          // console.log(this.$store.state.Home.navbar)
          return this.$store.state.Home.navbar
        }
      }
    },
    methods: {
      load: function (n) {
        switch (n) {
          case 1:
            this.$router.push('/edit');
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
