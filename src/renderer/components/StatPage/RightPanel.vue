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
        <div class="alert alert-danger" id="stat-right-prompt" role="alert" style="height:100%; overflow-y:auto;">
          <h4 class="alert-heading">数据分析提示</h4>
          <ol class="">
            <li v-for="(data, index) in notice" v-bind:key='index'>{{data}}</li>
          </ol>
        </div>
      </div>
    </div>
    <table id="stat-right-table">
      <tr v-for="(data, index) in xs" v-bind:key='index' v-on:click="onClick(data, index)" class="stat-right-table-tr" v-bind:class="{'table-danger':flag.find((n)=>n===index)}">
        <td v-for="(field, index) in data" v-bind:key='index' v-bind:class="{'table-danger':flagTd.find((n)=>n===index)}" v-on:click="onClickTd(data, index)" id="stat-right-table-td"  v-if="index < 10">{{data[index]}}</td>
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
        flagTd: [],
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
          let table = []
          if (this.$store.state.Stat.tableType === 'local') {
            const f = []
            let start = 0
            let fileLen = this.$store.state.Stat.tableSel.length;
            // console.log(fileLen)
            if (fileLen > 19) {
              if (this.$store.state.Stat.tablePage > 0) {
                start = 20 * this.$store.state.Stat.tablePage
                fileLen = start + 19
              } else {
                fileLen = 19
              }
            }
            for (let i = start; i < fileLen; i += 1) {
              f.push(this.$store.state.Stat.tableSel[i])
            }
            const a = this.$store.state.Stat.tableHeader[0]
            f.splice(0, 0, a)
            table = f
          } else if (this.$store.state.Stat.tableType === 'server') {
            table = this.$store.state.Stat.serverTable
          } else {
            table = this.$store.state.Stat.compareTable
          }
          return table
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
          this.$store.commit('STAT_SET_COL', index);
        }
      },
      onClick: function (data, index) {
        const x = this.flag.indexOf(index)
        if (x === -1) {
          this.flag.push(index)
        } else {
          this.flag.splice(x, 1)
        }
        this.$store.commit('STAT_SET_ROW', index);
        this.$store.commit('STAT_GET_FIELD', data);
        this.$store.commit('STAT_GET_FIELD_INDEX', index);
        const id = 'chartLeft'
        const type = this.$store.state.Stat.chartLeft
        let table = []
        if (this.$store.state.Stat.tableType === 'local') {
          table = this.$store.state.Stat.file
        } else if (this.$store.state.Stat.tableType === 'server') {
          table = this.$store.state.Stat.serverTable
        } else {
          table = this.$store.state.Stat.compareTable
        }
        const option = chartData(table, this.flag, this.flagTd)
        switch (type) {
          case '柱状图':
            chartBar(id, option)
            this.$store.commit('STAT_SET_CHART_OPTION', [id, type, option])
            break;
          case '折线图':
            chartLine(id, option)
            break;
          case '雷达图':
            chartRadar(id, option)
            break;
          case '散点图':
            chartScatter(id)
            break;
          default: break;
        }
        const idRight = 'chartRight'
        const typeRight = this.$store.state.Stat.chartRight
        const optionRight = chartData(table, this.flag, this.flagTd)
        switch (typeRight) {
          case '柱状图':
            chartBar(idRight, optionRight)
            break;
          case '折线图':
            chartLine(idRight, optionRight)
            break;
          case '雷达图':
            chartRadar(idRight, optionRight)
            break;
          case '散点图':
            chartScatter(idRight)
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
