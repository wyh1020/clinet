<template>
  <div>
    <load-bar v-if="toolbar == '系统服务-本地文件导入'"></load-bar>
    <server-bar v-if="toolbar == '系统服务-远程服务器设置'"></server-bar>
    <drg-bar v-if="toolbar == '系统服务-DRG分组服务'"></drg-bar>
    <stat-bar v-if="toolbar == '系统服务-DRG分析计算'"></stat-bar>
    <table>
      <tr v-for="(data, index) in file" v-bind:key='index' v-on:click="onClick(data, index)" v-bind:class="{'table-danger':flag == index}">
        <td v-for="(field, index) in data" v-bind:key='index'>{{data[index]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import LoadBar from './LoadBar';
  import ServerBar from './ServerBar';
  import DrgBar from './DrgBar';
  import StatBar from './StatBar';

  export default {
    components: { DrgBar, ServerBar, LoadBar, StatBar },
    data() {
      return {
        flag: null
      }
    },
    computed: {
      file: {
        get() {
          let f = []
          let fileLen = this.$store.state.System.file.length;
          switch (this.$store.state.Home.toolbar) {
            case 'files':
              if (fileLen > 99) { fileLen = 99 }
              for (let i = 0; i < fileLen; i += 1) {
                f.push(this.$store.state.System.file[i].split(','))
              }
              break;
            case 'tables':
              f = this.$store.state.System.table
              break;
            case 'compareTable':
              f = this.$store.state.System.table
              break;
            case 'checkTable':
              f = this.$store.state.System.table
              break;
            case 'loadTable':
              // f = this.$store.state.System.table
              break;
            case 'compDrg':
              // f = this.$store.state.System.table
              break;
            case 'statDrg':
              // f = this.$store.state.System.table
              break;
            default:
              break;
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
      onClick: function (data, index) {
        this.flag = index
        // console.log(this.$store.state.System.table[n])
        this.$store.commit('GET_FIELD', data);
        this.$store.commit('GET_FIELD_INDEX', index);
      },
    },
  };
</script>

<style scoped>

</style>
