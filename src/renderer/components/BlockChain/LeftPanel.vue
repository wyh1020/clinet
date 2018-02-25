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
    computed: {
      x: {
        get() {
          let x = ''
          switch (this.$store.state.Block.toolbar) {
            case 'getServers':
              x = '区块链节点服务器'
              break;
            case 'setNodes':
              x = '设置连接节点'
              break;
            case 'blockChainInfo':
              x = '区块链服务介绍'
              break;
            case 'blockChainFunction':
              x = '区块链服务功能列表'
              break;
            case 'setUser':
              x = '账户设置'
              break;
            case 'account':
              x = '账户余额'
              break;
            case 'transaction':
              x = '转账交易'
              break;
            case 'transRecord':
              x = '账户交易记录'
              break;
            case 'blockList':
              x = '区块列表'
              break;
            case 'block':
              x = '区块内容'
              break;
            case 'blockInfo':
              x = '区块内容明细'
              break;
            case 'localData':
              x = '本地病案数据'
              break;
            case 'serverData':
              x = '区块链病案数据'
              break;
            case 'checkData':
              x = '校验数据'
              break;
            case 'compDrg':
              x = '调用Drg分组服务'
              break;
            case 'drgResult':
              x = '查看Drg分组结果'
              break;
            case 'drgRule':
              x = '查看Drg分组规则'
              break;
            case 'serverStatData':
              x = '服务器病案数据'
              break;
            case 'getIndex':
              x = '选择分析指标'
              break;
            case 'getDimension':
              x = '选择分析维度'
              break;
            case 'compStat':
              x = '开始计算'
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
