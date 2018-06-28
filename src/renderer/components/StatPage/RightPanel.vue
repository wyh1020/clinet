<template>
  <div>
    <right-bar></right-bar>
    <div class="row" v-show="this.$store.state.Stat.chartIsShow === 'chart'">
      <div class="col">
        <left-panel></left-panel>
      </div>
      <div class="col">
        <div id="chartLeft" style="width: 600px; height:400px;" v-on:dblclick="chart('left')"></div>
      </div>
      <div class="col">
        <div id="chartRight" style="width: 600px; height:400px;" v-on:dblclick="chart('right')"></div>
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
    <div class="row" v-show="this.$store.state.Stat.chartIsShow === 'menu'">
      <div class="col">
        <left-panel></left-panel>
      </div>
      <div class="col">
        <table>
          <tr>
            <th class="table-danger"> 数据分析文件</th>
          </tr>
          <tr class="stat-left-file-tr" v-for="(data, index) in serverMenu.second" v-bind:key='index' v-on:click="loadFile(data, ['second', index])" v-bind:class="{'table-danger':fileIndex.second == index}" v-bind:id="'stat-left-twofile-tr'+index">
            <td>{{data}}</td>
          </tr>
        </table>
      </div>
      <div class="col">
        <table>
          <tr>
            <th class="table-danger"> 数据分析文件</th>
          </tr>
          <tr class="stat-left-file-tr" v-for="(data, index) in serverMenu.third" v-bind:key='index' v-on:click="loadFile(data, ['third', index])" v-bind:class="{'table-danger':fileIndex.third == index}" v-bind:id="'stat-left-thrfile-tr'+index">
            <td>{{data}}</td>
          </tr>
        </table>
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
    <div class="row" v-if="this.$store.state.Stat.chartIsShow === 'dimension'">
      <div class="col" style="max-width:400px">
        <left-panel></left-panel>
      </div>
      <div class="col" style="max-width:400px" v-for="(data, index) in header" v-bind:key='index'>
        <form style="margin-top: 20px" v-on:submit.prevent>
          <div class="form-group">
            <label for="exampleInputEmail1">维度选择：{{data}}</label>
            >
            <input type="text" class="form-control" placeholder="" v-model="xObj[data].svalue">
            <input type="text" class="form-control" placeholder="" v-model="xObj[data].bvalue">
          </div>
        </form>
        <button type="submit" class="btn btn-primary" v-on:click="selX(data, 1)">查询</button>
        <button type="submit" class="btn btn-primary" v-on:click="selX(data, 0)">清空</button>
      </div>
    </div>
    <div>
      <table>
        <tr v-for="(data, index) in xs" v-bind:key='index' v-on:click="onClick(data, index)" class="stat-right-table-tr" v-bind:class="{'table-danger':flag.find((n)=>n===index)}">
          <td v-for="(field, index) in data"  v-bind:key='index' v-bind:class="{'table-danger':flagTd.find((n)=>n===index)}" v-on:click="onClickTd(data, index)" class="stat-right-table-td"  v-if="index < 10">{{data[index]}}</td>
        </tr>
      </table>
    </div>
    <nav aria-label="Page navigation example" v-if="this.$store.state.Stat.tableType === 'server' || this.$store.state.Stat.tableType === 'block'">
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
  import { getStatFiles, getStat, getStatWt4 } from '../../utils/StatServerFile';
  import loadFile from '../../utils/LoadFile';
  export default {
    components: { RightBar, LeftPanel },
    data() {
      return {
      };
    },
    computed: {
      xObj: {
        get() {
          return this.$store.state.Stat.xObj
        },
        set() {
          return this.$store.state.Stat.xObj
        }
      },
      serverMenu: {
        get() {
          return this.$store.state.Stat.serverMenu
        }
      },
      fileIndex: {
        get() {
          return this.$store.state.Stat.fileIndex
        }
      },
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
              table = this.$store.state.Stat.serverTable.data
              break;
            }
            case 'block': {
              table = this.$store.state.Stat.serverTable.data
              break;
            }
            case 'case': {
              table = this.$store.state.Stat.caseTable.data
              break;
            }
            default: {
              const compare = this.$store.state.Stat.compareTable
              // 取得所有对比行中所有的key并去重
              let keys = []
              keys = keys.concat.apply([], compare.map(x => Object.keys(x)))
              keys = Array.from(new Set(keys))
              // 存储表头
              table.push(keys)
              // 取得表内容,取不到的用-代替
              compare.forEach((xs) => {
                const f = []
                keys.forEach((x, i) => {
                  if (xs[x]) {
                    f[i] = xs[x]
                  } else {
                    f[i] = '-'
                  }
                })
                table.push(f)
              })
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
            f = this.$store.state.Stat.selectedRow
          } else if (this.$store.state.Stat.tableType === 'case') {
            f = this.$store.state.Stat.caseSelectedRow
          } else {
            f = this.$store.state.Stat.selectedRow
          }
          return f
        },
        set() {}
      },
      flagTd: {
        get() {
          let f = []
          if (this.$store.state.Stat.tableType === 'compare') {
            f = this.$store.state.Stat.selectedCol
          } else if (this.$store.state.Stat.tableType === 'case') {
            f = this.$store.state.Stat.caseSelectedCol
          } else {
            f = this.$store.state.Stat.selectedCol
          }
          return f
        },
        set() {}
      },
      page: {
        get() {
          return { pageList: this.$store.state.Stat.serverTable.pageList, page: this.$store.state.Stat.serverTable.page }
        }
      },
      header: {
        get() {
          let f = []
          let col = []
          const name = []
          let table = ''
          if (this.$store.state.Stat.tableType === 'compare') {
            f = []
          } else if (this.$store.state.Stat.tableType === 'case') {
            table = this.$store.state.Stat.caseTable
            col = this.$store.state.Stat.caseSelectedCol
          } else if (this.$store.state.Stat.tableType === 'local') {
            table = this.$store.state.Stat.localTable
            col = this.$store.state.Stat.selectedCol
          } else if (this.$store.state.Stat.tableType === 'server') {
            table = this.$store.state.Stat.serverTable
            col = this.$store.state.Stat.selectedCol
          }
          col.map((x) => {
            if (table.length > 0) {
              // this.xObj[table[0][x]] = { bvalue: '', svalue: '' }
              name.push(table[0][x])
            } else if (table.length === undefined) {
              name.push(table.data[0][x])
            }
            return name
          })
          f = name
          return f
        },
      }
    },
    mounted: function () {
      if (this.$store.state.Stat.chartData.length > 0) {
        this.onClick()
        // this.onClickTd()
      }
    },
    methods: {
      onClickTd: function (data, index) {
        this.$store.commit('STAT_SET_XOBJ', [data[index], 0]);
        const header = this.$store.state.Stat.serverTable.data[0]
        let cindex = 0
        let oindex = 0
        let tindex = 0
        if (this.$store.state.Stat.tableType === 'server' || this.$store.state.Stat.tableType === 'block') {
          cindex = header.indexOf('病历数')
          oindex = header.indexOf('机构')
          tindex = header.indexOf('时间')
        }
        if (index !== undefined) {
          this.$store.commit('STAT_SET_CHART_IS_SHOW', 'chart');
          const value = this.$store.state.Stat.tableSel.map((x) => {
            let isType = false
            if (x[index] === '-' || x[index] === '') {
              isType = false
            } else {
              isType = true
            }
            return isType
          })
          if (this.$store.state.Stat.tableType === 'local') {
            if (value.includes(true)) {
              const a = this.$store.state.Stat.localTable[0]
              if (a.includes(data[index])) {
                this.$store.commit('STAT_SET_COL', index);
              }
            } else {
              this.$store.commit('SET_NOTICE', '无数据,无法选中当前列!');
            }
          } else if (this.$store.state.Stat.tableType === 'server' || this.$store.state.Stat.tableType === 'block') {
            if ((data[0] === '机构' && data[1] === '时间') || data[0] === 'year_time') {
              this.$store.commit('STAT_SET_COL', index);
            }
            if (index === cindex && data !== this.$store.state.Stat.serverTable.data[0]) {
              this.$store.commit('STAT_SET_TABLE_TYPE', 'case');
              this.$store.commit('SET_NOTICE', '查看病历数');
              let org = ''
              if (data[oindex] === '全部机构') {
                org = ''
              } else {
                org = data[oindex]
              }
              const time = data[tindex]
              const drg = ''
              getStatWt4(this, [this.$store.state.System.server, this.$store.state.System.port], org, time, drg)
            }
          } else if (this.$store.state.Stat.tableType === 'case') {
            if (data[0] === '病案ID' && data[1] === '主要诊断') {
              this.$store.commit('STAT_SET_CASE_COL', index);
            }
          } else if (data[0] === 'id') {
            this.$store.commit('STAT_SET_COL', index);
          }
        }
      },
      onClick: function (data, index) {
        if (index !== undefined) {
          this.flag = index
          this.$store.commit('STAT_SET_ROW', index);
          this.$store.commit('STAT_GET_FIELD', data);
          this.$store.commit('STAT_GET_FIELD_INDEX', index);
        }
        this.$store.commit('STAT_SET_CHART_IS_SHOW', 'chart');
        const id = 'chartLeft'
        const type = this.$store.state.Stat.chartLeft
        let table = []
        switch (this.$store.state.Stat.tableType) {
          case 'local':
            table = this.$store.state.Stat.localTable
            break;
          case 'server':
            table = this.$store.state.Stat.serverTable.data
            break;
          case 'block':
            table = this.$store.state.Stat.serverTable.data
            break;
          case 'case':
            this.$store.commit('STAT_SET_CASE_ROW', index);
            table = this.$store.state.Stat.caseTable.data
            break;
          default:
            table = this.$store.state.Stat.compareTable
            break;
        }
        chartData(this, table, this.flag, this.flagTd)
        let chartdata = []
        if (this.$store.state.Stat.chartData.length === 0) {
          chartdata = null
        } else {
          chartdata = this.$store.state.Stat.chartData
        }
        switch (type) {
          case '柱状图':
            chartBar(id, chartdata)
            break;
          case '折线图':
            chartLine(id, chartdata)
            break;
          case '雷达图':
            chartRadar(id, chartdata)
            break;
          case '散点图':
            chartScatter(id, chartdata)
            break;
          case '饼图':
            chartPie(id, chartdata)
            break;
          default: break;
        }
        const idRight = 'chartRight'
        const typeRight = this.$store.state.Stat.chartRight
        switch (typeRight) {
          case '柱状图':
            chartBar(idRight, chartdata)
            break;
          case '折线图':
            chartLine(idRight, chartdata)
            break;
          case '雷达图':
            chartRadar(idRight, chartdata)
            break;
          case '散点图':
            chartScatter(idRight, chartdata)
            break;
          case '饼图':
            chartPie(idRight, chartdata)
            break;
          default: break;
        }
      },
      serverPage: function (data) {
        this.$store.commit('STAT_SET_TABLE_PAGE', parseInt(data, 10))
        getStat(this, [this.$store.state.System.server, this.$store.state.System.port], { tableName: this.$store.state.Stat.serverTable.tableName, page: parseInt(data, 10), username: this.$store.state.System.user.username, type: this.$store.state.Stat.dimensionType, value: this.$store.state.Stat.dimensionServer }, 'stat')
      },
      chart: function (data) {
        this.$store.commit('STAT_SET_CHART_OPTION', data)
        if (this.$store.state.Stat.chartData.length > 0) {
          this.$router.push('/chart');
        }
      },
      loadFile: function (data, index) {
        this.$store.commit('STAT_SET_FILE_FLAG');
        // this.flag = index
        this.$store.commit('STAT_SET_FILE_NAME', data);
        this.$store.commit('STAT_SET_FILE_INDEX', index);
        // 图表
        if (index[0] === 'third') {
          this.$store.commit('STAT_SET_CHART_IS_SHOW', 'chart');
          chartBar('chartLeft', null)
          chartLine('chartRight', null)
        }
        this.$store.commit('STAT_SET_TABLE_PAGE', 1)
        if (this.$store.state.Stat.isServer) {
          if (data.endsWith('.csv')) {
            getStat(this, [this.$store.state.System.server, this.$store.state.System.port], { tableName: data, page: 1, username: this.$store.state.System.user.username, type: this.$store.state.Stat.dimensionType, value: this.$store.state.Stat.dimensionServer }, 'stat', this.$store.state.Stat.tableType)
          } else {
            getStatFiles(this, [this.$store.state.System.server, this.$store.state.System.port], data, this.$store.state.System.user.usernamee, this.$store.state.Stat.tableType)
          }
        } else {
          loadFile(this, data, 'stat')
          this.$store.commit('STAT_SET_TABLE_TYPE', 'local');
        }
      },
      selX: function (data, value) {
        if (value === 1) {
          let tableType = ''
          let table = []
          const table1 = []
          // let header = []
          switch (this.$store.state.Stat.tableType) {
            case 'local':
              table = this.$store.state.Stat.localTable
              tableType = 'local'
              break;
            case 'server':
              table = this.$store.state.Stat.serverTable.data
              tableType = 'server'
              break;
            case 'block':
              table = this.$store.state.Stat.serverTable.data
              tableType = 'block'
              break;
            default:
              break;
          }
          const [a, ...b] = table
          console.log(b)
          const index = a.indexOf(data)
          if (index > -1) {
            table.map((x) => {
              if (x[index] < this.$store.state.Stat.xObj[data].bvalue && x[index] > this.$store.state.Stat.xObj[data].svalue) {
                table1.push(x)
              }
              return table1
            })
            table1.splice(0, 0, a)
            this.$store.commit('STAT_SET_TABLE', [tableType, table1]);
          }
        } else {
          this.$store.commit('STAT_SET_XOBJ', [data, -1]);
        }
      },
    },
  };
</script>

<style scoped>
  table {
    width: 100%;
    margin: 40px;
    margin-top: 0px;
    margin-left: 2px;
    padding: 0;
  }
</style>
