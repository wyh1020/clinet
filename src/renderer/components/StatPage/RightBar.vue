<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" id="stat-local-doc" v-on:click='loadData'>
          <a class="nav-link text-light" href="#"> 本地文件 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" id="stat-remote-file" v-on:click='serverData'>
          <a class="nav-link text-light" href="#"> 远程文件 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" id="stat-prev-page" v-on:click='page(-1)'>
          <a class="nav-link text-light" href="#"> 前页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" id="stat-next-page" v-on:click='page(1)'>
          <a class="nav-link text-light" href="#"> 后页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" id="stat-edit-data" v-on:click='edit'>
          <a class="nav-link text-light" href="#"> 编辑数据 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" id="stat-join-contrast" v-on:click='compare'>
          <a class="nav-link text-light" href="#"> 加入对比 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" id="stat-show-contrast" v-on:click='showCompare'>
          <a class="nav-link text-light" href="#"> 显示对比 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" id="stat-save-contrast" v-on:click='saveCompare'>
          <a class="nav-link text-light" href="#"> 保存对比 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="stat-left-chart" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            左图选择
          </a>
          <div class="dropdown-menu" aria-labelledby="stat-left-chart">
            <a id="stat-left-chart-bar" class="nav-link" href="#" v-on:click='showChart("chartLeft", "柱状图")'> 柱状图 <span class="sr-only">(current)</span></a>
            <a id="stat-left-chart-discount" class="nav-link" href="#" v-on:click='showChart("chartLeft", "折线图")'> 折线图 <span class="sr-only">(current)</span></a>
            <a id="stat-left-chart-radar-map" class="nav-link" href="#" v-on:click='showChart("chartLeft", "雷达图")'> 雷达图 <span class="sr-only">(current)</span></a>
            <a id="stat-left-chart-scatter-plot" class="nav-link" href="#" v-on:click='showChart("chartLeft", "散点图")'> 散点图 <span class="sr-only">(current)</span></a>
            <a id="stat-left-chart-pie-map" class="nav-link" href="#" v-on:click='showChart("chartLeft", "饼图")'> 饼图 <span class="sr-only">(current)</span></a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="stat-right-chart" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            右图选择
          </a>
          <div class="dropdown-menu" aria-labelledby="stat-right-chart">
            <a id="stat-right-chart-bar" class="nav-link" href="#" v-on:click='showChart("chartRight", "柱状图")'> 柱状图 <span class="sr-only">(current)</span></a>
            <a id="stat-right-chart-discount" class="nav-link" href="#" v-on:click='showChart("chartRight", "折线图")'> 折线图 <span class="sr-only">(current)</span></a>
            <a id="stat-right-chart-radar-map" class="nav-link" href="#" v-on:click='showChart("chartRight", "雷达图")'> 雷达图 <span class="sr-only">(current)</span></a>
            <a id="stat-right-chart-scatter-plot" class="nav-link" href="#" v-on:click='showChart("chartRight", "散点图")'> 散点图 <span class="sr-only">(current)</span></a>
            <a id="stat-right-chart-pie-map" class="nav-link" href="#" v-on:click='showChart("chartRight", "饼图")'> 饼图 <span class="sr-only">(current)</span></a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="stat-right-dimension" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            维度选择
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a id="stat-right-dimension-org" class="nav-link" href="#" v-on:click='selX("机构")'> 机构 <span class="sr-only">(current)</span></a>
            <a id="stat-right-dimension-time" class="nav-link" href="#" v-on:click='selX("时间")'> 时间 <span class="sr-only">(current)</span></a>
            <a id="stat-right-dimension-disease" class="nav-link" href="#" v-on:click='selX("病种")'> 病种 <span class="sr-only">(current)</span></a>
          </div>
        </li>
      </ul>
      <div class="form-inline my-2 my-lg-0">
        <input id="stat-right-search" class="mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-on:keyup.13="statSearch" v-model="stat">
      </div>
    </div>
  </nav>
</template>

<script>
  import chartLine from '../../utils/ChartLine';
  import chartScatter from '../../utils/ChartScatter';
  import chartRadar from '../../utils/ChartRadar';
  import chartBar from '../../utils/ChartBar';
  import chartPie from '../../utils/ChartPie';
  import addContrast from '../../utils/StatContrast';
  import chartData from '../../utils/ChartData';
  import saveFile from '../../utils/SaveFile';
  import { getStatFiles, getStat, saveStat } from '../../utils/StatServerFile';
  import loadFile from '../../utils/LoadFile';

  export default {
    data() {
      return {
        paths: [],
        stat: ''
      };
    },
    methods: {
      loadData: function () {
        this.$store.commit('STAT_SET_LEFT_PANEL', ['file', null]);
        this.$store.commit('STAT_SET_TABLE_TYPE', 'local');
        this.$store.commit('STAT_LOAD_FILES');
      },
      serverData: function () {
        if (!this.$store.state.System.connectInfo) {
          this.$store.commit('SET_NOTICE', '服务器连接未设置,请在系统服务内连接');
        } else if (!this.$store.state.System.user.login) {
          this.$store.commit('SET_NOTICE', '未登录用户,请在系统服务-用户设置内登录');
        } else {
          this.$store.commit('STAT_SET_TABLE_TYPE', 'server');
          getStatFiles(this, [this.$store.state.System.server, this.$store.state.System.port, '', this.$store.state.System.user.username])
        }
      },
      page: function (n) {
        if (this.$store.state.Stat.tablePage === 0 && n === -1) {
          this.$store.commit('SET_NOTICE', '当前已是第一页')
        } else if (this.$store.state.Stat.tableType === 'server') {
          this.$store.commit('STAT_TABLE_PAGE', n);
          getStat(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.Stat.tableName, this.$store.state.Stat.tablePage])
        } else {
          this.$store.commit('STAT_TABLE_PAGE', n);
        }
      },
      edit: function () {
        if (this.$store.state.Stat.fileIndex !== null) {
          this.$store.commit('EDIT_SET_LEFT_PANEL', 'table');
          loadFile(this, this.$store.state.Stat.files[this.$store.state.Stat.fileIndex], 'stat', 'edit')
        }
        this.$store.commit('EDIT_SET_LAST_NAV', '/stat');
        this.$store.commit('EDIT_SET_RIGHT_PANEL', 'local');
        this.$store.commit('EDIT_SET_FILES_INDEX', this.$store.state.Stat.fileIndex);
        this.$router.push('/edit');
      },
      selX: function (x) {
        this.$store.commit('STAT_SET_LEFT_PANEL', ['dimension', x]);
      },
      showChart: function (id, type) {
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
        const option = chartData(table, this.$store.state.Stat.selectedRow, this.$store.state.Stat.selectedCol)
        if (id === 'chartRight') {
          this.$store.commit('STAT_SET_CHART_RIGHT', type);
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
        } else {
          this.$store.commit('STAT_SET_CHART_LEFT', type);
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
        }
      },
      compare: function () {
        let table = []
        let header = []
        switch (this.$store.state.Stat.tableType) {
          case 'server':
            table = this.$store.state.Stat.serverTable
            header = [this.$store.state.Stat.serverTable[0]]
            break;
          case 'local':
            table = this.$store.state.Stat.tableSel
            header = this.$store.state.Stat.tableHeader
            break;
          default:
            break;
        }
        const col = this.$store.state.Stat.selectedCol
        const row = this.$store.state.Stat.selectedRow
        const compareTable = this.$store.state.Stat.compareTable
        if (this.$store.state.Stat.tableType !== 'compare') {
          if (col.length > 0 || row.length > 0) {
            addContrast(this, table, compareTable, header, col, row)
          } else {
            this.$store.commit('SET_NOTICE', '请选择加入对比数据!');
          }
        }
      },
      showCompare: function () {
        if (this.$store.state.Stat.compareTable.length > 0) {
          this.$store.commit('STAT_SET_TABLE_TYPE', 'compare');
        } else {
          this.$store.commit('SET_NOTICE', '对比数据为空,请选择对比数据!');
        }
      },
      saveCompare: function () {
        if (this.$store.state.Stat.tableType === 'server') {
          saveStat(this, this.$store.state.Stat.compareTable, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.System.user])
        } else if (this.$store.state.Stat.compareTable.length > 0) {
          const d = new Date();
          let month = d.getMonth() + 1
          if (month < 10) {
            month = `0${month}`
          }
          let date = d.getDate() + 1
          if (date < 10) {
            date = `0${date}`
          }
          const datetime = `${d.getFullYear()}${month}${date}`
          this.$store.commit('EDIT_LOAD_FILE', this.$store.state.Stat.compareTable);
          saveFile(this, `${datetime}_stat.csv`, '/stat')
        } else {
          this.$store.commit('SET_NOTICE', '无法保存对比,请选择对比数据!');
        }
      },
      statSearch: function () {
        switch (this.$store.state.Stat.tableType) {
          case 'local':
            this.$store.commit('STAT_GET_FILE_SEARCH', this.stat)
            break;
          case 'server':
            console.log(this.$store.state.Stat.tableName);
            getStat(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.Stat.tableName, 0, this.$store.state.System.user, this.stat])
            console.log('服务器搜索');
            break;
          default:
        }
      }
    },
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

</style>
