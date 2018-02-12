<template>
  <div>
    <table>
      <tr>
        <th class="table-danger">{{x}}</th>
      </tr>
      <tr v-for="(data, index) in xs" v-bind:key='index' v-bind:class="{'table-danger':flag == index}" v-on:click="onClick(data, index)">
        <td>{{data}}</td>
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
      x: {
        get() {
          let x = ''
          switch (this.$store.state.Block.toolbar) {
            case 'getServers':
              x = '区块链节点服务器'
              break;
            case 'tables':
              x = '选择数据表'
              break;
            default:
              break;
          }
          return x
        }
      },
      xs: {
        get() {
          let xs = []
          switch (this.$store.state.Block.toolbar) {
            case 'files':
              xs = this.$store.state.Block.files.filter(x => x.endsWith('.csv'))
              break;
            case 'tables':
              xs = this.$store.state.Block.tables
              break;
            case 'compareTable':
              if (this.$store.state.Block.file && this.$store.state.Block.file[0]) {
                xs = this.$store.state.Block.file[0].split(',')
              } else {
                this.$store.commit('SET_NOTICE', '请先选择CSV文件，然后再做对照！');
              }
              break;
            default:
              xs = [];
          }
          return xs
        }
      }
    },
    methods: {
      onClick: function (data, index) {
        console.log(data)
        console.log(index)
      },
    },
  };
</script>

<style scoped>

</style>
