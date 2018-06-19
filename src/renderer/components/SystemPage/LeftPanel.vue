<template>
  <div>
    <table>
      <tr>
        <th class="table-danger">{{x}}</th>
      </tr>
      <tr v-for="(data, index) in xs" v-bind:key='index' v-bind:class="{'table-danger':flag == index}" v-on:click="onClick(data, index)" class="server-leftpanel">
        <td>{{data}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import loadFile from '../../utils/LoadFile';
  import { sCompDrg, sGetTarget } from '../../utils/Server';
  export default {
    data() {
      return {
        flag: null
      };
    },
    computed: {
      x: {
        get() {
          let x = ''
          switch (this.$store.state.System.toolbar) {
            case 'files':
              x = '选择CSV文件'
              break;
            case 'tables':
              x = '选择数据表'
              break;
            case 'compareTable':
              x = '对照数据'
              break;
            case 'checkTable':
              x = '校验数据'
              break;
            case 'loadTable':
              x = '导入数据'
              break;
            case 'saveTableData':
              x = '保存本地文件'
              break;
            case 'upLoadTableData':
              x = '上传服务器数据'
              break;
            case 'getServers':
              x = '远程服务器列表'
              break;
            case 'getUsers':
              x = '服务器用户设置'
              break;
            case 'getOrgs':
              x = '服务器机构设置'
              break;
            case 'getPersons':
              x = '服务器人员设置'
              break;
            case 'getServerFunctions':
              x = '服务器功能设置'
              break;
            case 'getLocalData':
              x = '本地病案数据'
              break;
            case 'getServerData':
              x = '服务器病案数据'
              break;
            case 'compareData':
              x = '校验病案数据'
              break;
            case 'drgCompute':
              x = 'DRG分组计算'
              break;
            case 'drgResult':
              x = 'DRG分组结果'
              break;
            case 'drgRule':
              x = 'DRG分组规则'
              break;
            case 'serverData':
              x = '服务器数据'
              break;
            case 'getIndex':
              x = '分析指标'
              break;
            case 'getDimension':
              x = '分析维度'
              break;
            case 'statCompute':
              x = '分析计算'
              break;
            default:
              x = '';
          }
          return x
        }
      },
      xs: {
        get() {
          let xs = []
          switch (this.$store.state.System.toolbar) {
            case 'files':
              xs = this.$store.state.System.files.filter(x => x.endsWith('.csv'))
              break;
            case 'tables':
              xs = this.$store.state.System.tables
              break;
            case 'compareTable':
              if (this.$store.state.System.file && this.$store.state.System.file[0]) {
                xs = this.$store.state.System.file[0].split(',')
              } else {
                this.$store.commit('SET_NOTICE', '请先选择CSV文件，然后再做对照！');
              }
              break;
            case 'getLocalData':
              xs = this.$store.state.System.wt4Files
              break;
            case 'drgCompute':
              xs = this.$store.state.System.computeVersion
              break;
            case 'getIndex':
              xs = this.$store.state.System.targetList;
              break;
            default:
              xs = [];
          }
          return xs
        }
      },
      xsLocal: {
        get() {
          let data = [];
          if (this.$store.state.System.wt4LocalRow.length === 0) {
            data = this.$store.state.System.wt4Tables
          } else {
            data = this.$store.state.System.wt4LocalRow
          }
          return data
        }
      },
      xsServer: {
        get() {
          let data = []
          if (this.$store.state.System.wt4Row.length === 0) {
            data = this.$store.state.System.wt4.data
          } else {
            data = this.$store.state.System.wt4Row
          }
          return data
        }
      }
    },
    methods: {
      onClick: function (data, index) {
        this.flag = index
        this.$store.commit('SYSTEM_SET_SERVER_TABLE', data);
        switch (this.$store.state.System.toolbar) {
          case 'files':
            this.$store.commit('SYSTEM_SET_SERVER_LOAD_TABLE', index);
            loadFile(this, data, 'system-home')
            break;
          case 'tables':
            this.$store.commit('SYSTEM_GET_TABLE', global.hitbdata.table[data]);
            this.$store.commit('SET_NOTICE', '数据表读取成功！');
            break;
          case 'compareTable':
            if (this.$store.state.System.tables.length !== 0) {
              if (this.$store.state.System.fieldIndex === null) {
                this.$store.commit('SET_NOTICE', '请选择要对照的列');
              } else {
                this.$store.commit('SYSTEM_SET_TABLE', data);
              }
            } else {
              this.$store.commit('SET_NOTICE', '请选择数据表');
            }
            break;
          case 'getLocalData':
            loadFile(this, data, 'wt4')
            break;
          case 'drgCompute':
            this.drgCompute(data)
            break;
          case 'getIndex':
            this.$store.commit('SYSTEM_SET_INDEX_TABLE', data);
            sGetTarget(this, [this.$store.state.System.server, this.$store.state.System.port], data);
            break;
          default:
            break;
        }
      },
      drgCompute: function (value) {
        switch (this.$store.state.System.computeData) {
          case 'getLocalData':
            this.xsLocal.forEach((n, index) => {
              sCompDrg(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.System.wt4Tables[index], value, 'getLocalData')
            })
            break;
          case 'getServerData':
            this.xsServer.forEach((n, index) => {
              sCompDrg(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.System.wt4.data[index], value)
            })
            break;
          default:
        }
      }
    },
  };
</script>

<style scoped>
</style>
