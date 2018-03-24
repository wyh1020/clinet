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
    <table>
      <tr v-for="(data, index) in xs" v-bind:key='index' v-on:click="onClick(data, index)" class="stat-right-table-tr" v-bind:class="{'table-danger':flag.find((n)=>n===index)}">
        <td v-for="(field, index) in data" v-bind:key='index' v-bind:class="{'table-danger':flagTd.find((n)=>n===index)}" v-on:click="onClickTd(data, index)" class="stat-right-table-td"  v-if="index < 10">{{data[index]}}</td>
      </tr>
    </table>
    <nav aria-label="Page navigation example" v-if="this.$store.state.Stat.tableType === 'server'">
      <ul class="pagination">
        <li class="page-item" v-for= "(value, index) in page.pageList" v-bind:key="index" v-bind:class="{'disabled':value.page == page.page}" v-on:click="serverPage(value.page)"><a class="page-link" href="#">
          {{value.num}}
        </a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import chartData from '../../utils/ChartData';
  import chartLine from '../../utils/ChartLine';
  import chartScatter from '../../utils/ChartScatter';
  import chartRadar from '../../utils/ChartRadar';
  import chartBar from '../../utils/ChartBar';
  import chartPie from '../../utils/ChartPie';
  import RightBar from './RightBar';
  import LeftPanel from './LeftPanel';
  import { getStat } from '../../utils/StatServerFile'
  export default {
    components: { RightBar, LeftPanel },
    data() {
      return {
        // flag: [],
        // flagTd: [],
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
          switch (this.$store.state.Stat.tableType) {
            case 'local': {
              table = this.$store.state.Stat.localTable
              break;
            }
            case 'server': {
              table = this.$store.state.Stat.serverTable
              break;
            }
            default: {
              table = this.$store.state.Stat.compareTable
              break;
            }
          }
          return table
        }
      },
      flag: {
        get() {
          let f = []
          if (this.$store.state.Stat.tableType === 'compare') {
            f = []
          } else {
            f = this.$store.state.Stat.selectedRow
          }
          return f
        }
      },
      flagTd: {
        get() {
          let f = []
          if (this.$store.state.Stat.tableType === 'compare') {
            f = []
          } else {
            f = this.$store.state.Stat.selectedCol
          }
          return f
        }
      },
      page: {
        get() {
          console.log(this.$store.state.Stat.serverPage);
          return this.$store.state.Stat.serverPage
        }
      }
    },
    methods: {
      onClickTd: function (data, index) {
        const value = this.$store.state.Stat.tableSel.map((x) => {
          let isType = false
          if (x[index] === '-' || x[index] === '') {
            isType = false
          } else {
            isType = true
          }
          return isType
        })
        switch (this.$store.state.Stat.tableType) {
          case 'local':
            if (value.includes(true)) {
              if (data[0] === 'org' && data[1] === 'time') {
                this.$store.commit('STAT_SET_COL', index);
              }
            } else {
              this.$store.commit('SET_NOTICE', '无数据,无法选中当前列!');
            }
            break;
          case 'server':
            if (data[0] === '机构' && data[1] === '时间') {
              this.$store.commit('STAT_SET_COL', index);
            }
            break;
          default:
        }
      },
      onClick: function (data, index) {
        this.$store.commit('STAT_SET_ROW', index);
        this.$store.commit('STAT_GET_FIELD', data);
        this.$store.commit('STAT_GET_FIELD_INDEX', index);
        const id = 'chartLeft'
        const type = this.$store.state.Stat.chartLeft
        let table = []
        if (this.$store.state.Stat.tableType === 'local') {
          table = this.$store.state.Stat.localTable
        } else if (this.$store.state.Stat.tableType === 'server') {
          table = this.$store.state.Stat.serverTable
        } else {
          table = this.$store.state.Stat.compareTable
        }
        const option = chartData(table, this.flag, this.flagTd)
        switch (type) {
          case '柱状图':
            chartBar(id, option)
            break;
          case '折线图':
            chartLine(id, option)
            break;
          case '雷达图':
            chartRadar(id, option)
            break;
          case '散点图':
            chartScatter(id, option)
            break;
          case '饼图':
            chartPie(id, option)
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
            chartScatter(idRight, optionRight)
            break;
          case '饼图':
            chartPie(idRight, optionRight)
            break;
          default: break;
        }
      },
      serverPage: function (data) {
        this.$store.commit('STAT_TABLE_SERVER_PAGE', parseInt(data, 10));
        getStat(this, [this.$store.state.System.server, this.$store.state.System.port], { tableName: this.$store.state.Stat.tableName, page: parseInt(data, 10), username: this.$store.state.System.user.username, type: this.$store.state.Stat.dimensionType, value: this.$store.state.Stat.dimensionServer })
      }
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
