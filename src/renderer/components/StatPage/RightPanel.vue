<template>
  <div>
    <right-bar></right-bar>
    <div class="row">
      <div class="col">
        <left-panel></left-panel>
      </div>
      <div class="col">
        <div id="chartLeft" style="width: 600px; height:400px;"></div>
      </div>
      <div class="col">
        <div id="chartRight" style="width: 600px; height:400px;"></div>
      </div>
      <div class="col">
        <div class="alert alert-danger" role="alert" style="height:100%; overflow-y:auto;">
          <h4 class="alert-heading">数据分析提示</h4>
          <ol class="">
            <li v-for="(data, index) in notice" v-bind:key='index'>{{data}}</li>
          </ol>
        </div>
      </div>
    </div>
    <table>
      <tr v-for="(data, index) in xs" v-bind:key='index' v-on:click="onClick(data, index)" v-bind:class="{'table-danger':flag.find((n)=>n===index)}">
        <td v-for="(field, index) in data" v-bind:key='index' v-bind:class="{'table-danger':flagTd.find((n)=>n===index)}" v-on:click="onClickTd(data, index)">{{data[index]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import chartData from '../../utils/ChartData';
  import chartLine from '../../utils/ChartLine';
  import chartScatter from '../../utils/ChartScatter';
  import chartRadar from '../../utils/ChartRadar';
  import chartBar from '../../utils/ChartBar';
  import RightBar from './RightBar';
  import LeftPanel from './LeftPanel';
  export default {
    components: { RightBar, LeftPanel },
    data() {
      return {
        flag: [],
        flagTd: []
      };
    },
    computed: {
      notice: {
        get() {
          return this.$store.state.Stat.notice
        }
      },
      xs: {
        get() {
          const f = []
          let start = 0
          let fileLen = this.$store.state.Stat.tableSel.length;
          // console.log(fileLen)
          if (fileLen > 99) {
            if (this.$store.state.Stat.tablePage > 0) {
              start = 100 * this.$store.state.Stat.tablePage
              fileLen = start + 99
            } else {
              fileLen = 99
            }
          }
          for (let i = start; i < fileLen; i += 1) {
            f.push(this.$store.state.Stat.tableSel[i])
          }
          return f
        }
      }
    },
    methods: {
      onClickTd: function (data, index) {
        if (data[0] === 'org' && data[1] === 'time') {
          const x = this.flagTd.indexOf(index)
          if (x === -1) {
            this.flagTd.push(index)
          } else {
            this.flagTd.splice(x, 1)
          }
        }
      },
      onClick: function (data, index) {
        const x = this.flag.indexOf(index)
        if (x === -1) {
          this.flag.push(index)
        } else {
          this.flag.splice(x, 1)
        }
        // console.log(this.$store.state.System.table[n])
        this.$store.commit('GET_FIELD', data);
        this.$store.commit('GET_FIELD_INDEX', index);
        const id = 'chartLeft'
        const type = '柱状图'
        const table = this.$store.state.Stat.file
        const option = chartData(table)
        // console.log(option)
        switch (type) {
          case '柱状图':
            chartBar(id, option)
            this.$store.commit('STAT_SET_CHART_OPTION', [id, type, option])
            break;
          case '折线图':
            chartLine(id)
            break;
          case '雷达图':
            chartRadar(id)
            break;
          case '散点图':
            chartScatter(id)
            break;
          default: break;
        }
      },
    },
  };
</script>

<style scoped>
  table {
    width: 100%;
    margin: 40px;
    margin-top: 5px;
    margin-left: 2px;
    padding: 0;
  }
</style>
