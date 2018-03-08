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
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a id="stat-left-chart-bar" class="nav-link" href="#" v-on:click='showChart("chartLeft", "柱状图")'> 柱状图 <span class="sr-only">(current)</span></a>
            <a id="stat-left-chart-discount" class="nav-link" href="#" v-on:click='showChart("chartLeft", "折线图")'> 折线图 <span class="sr-only">(current)</span></a>
            <a id="stat-left-chart-radar-map" class="nav-link" href="#" v-on:click='showChart("chartLeft", "雷达图")'> 雷达图 <span class="sr-only">(current)</span></a>
            <a id="stat-left-chart-scatter-plot" class="nav-link" href="#" v-on:click='showChart("chartLeft", "散点图")'> 散点图 <span class="sr-only">(current)</span></a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="stat-right-chart" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            右图选择
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a id="stat-right-chart-bar" class="nav-link" href="#" v-on:click='showChart("chartRight", "柱状图")'> 柱状图 <span class="sr-only">(current)</span></a>
            <a id="stat-right-chart-discount" class="nav-link" href="#" v-on:click='showChart("chartRight", "折线图")'> 折线图 <span class="sr-only">(current)</span></a>
            <a id="stat-right-chart-radar-map" class="nav-link" href="#" v-on:click='showChart("chartRight", "雷达图")'> 雷达图 <span class="sr-only">(current)</span></a>
            <a id="stat-right-chart-scatter-plot" class="nav-link" href="#" v-on:click='showChart("chartRight", "散点图")'> 散点图 <span class="sr-only">(current)</span></a>
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
      <form class="form-inline my-2 my-lg-0">
        <input id="stat-right-search" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      </form>
    </div>
  </nav>
</template>

<script>
  import chartLine from '../../utils/ChartLine';
  import chartScatter from '../../utils/ChartScatter';
  import chartRadar from '../../utils/ChartRadar';
  import chartBar from '../../utils/ChartBar';
  import addContrast from '../../utils/StatContrast';
  import chartData from '../../utils/ChartData';
  import saveFile from '../../utils/SaveFile';

  export default {
    data() {
      return {
        paths: []
      };
    },
    methods: {
      loadData: function () {
        this.$store.commit('STAT_SET_LEFT_PANEL', ['file', null]);
        this.$store.commit('STAT_LOAD_FILES');
      },
      serverData: function () {
        this.$store.commit('STAT_SERVER_FILES');
      },
      page: function (n) {
        this.$store.commit('STAT_TABLE_PAGE', n);
      },
      edit: function () {
        this.$store.commit('EDIT_SET_LAST_NAV', '/stat');
        this.$store.commit('EDIT_SET_RIGHT_PANEL', 'local');
        this.$store.commit('EDIT_SET_FILES_INDEX', this.$store.state.Stat.fileIndex);
        this.$router.push('/edit');
      },
      selX: function (x) {
        this.$store.commit('STAT_SET_LEFT_PANEL', ['dimension', x]);
      },
      showChart: function (id, type) {
        const table = this.$store.state.Stat.file
        const option = chartData(table, this.$store.state.Stat.selectedRow, this.$store.state.Stat.selectedCol)
        console.log(option);
        if (id === 'chartRight') {
          this.$store.commit('SET_CHART_RIGHT', type);
          switch (type) {
            case '柱状图':
              chartBar(id, option)
              break;
            case '折线图':
              chartLine(id, option)
              break;
            case '雷达图':
              chartRadar(id)
              break;
            case '散点图':
              chartScatter(id)
              break;
            default: break;
          }
        } else {
          this.$store.commit('SET_CHART_LEFT', type);
          switch (type) {
            case '柱状图':
              chartBar(id, option)
              break;
            case '折线图':
              chartLine(id, option)
              break;
            case '雷达图':
              chartRadar(id)
              break;
            case '散点图':
              chartScatter(id)
              break;
            default: break;
          }
        }
      },
      compare: function () {
        const table = this.$store.state.Stat.tableSel
        const header = this.$store.state.Stat.tableHeader
        const col = this.$store.state.Stat.selectedCol
        const row = this.$store.state.Stat.selectedRow
        addContrast(this, table, header, col, row)
      },
      showCompare: function () {
        this.$store.commit('STAT_SET_TABLE_TYPE', 'compare');
      },
      saveCompare: function () {
        const d = new Date();
        const datetime = `${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}`
        this.$store.commit('STAT_LOAD_FILE', this.$store.state.Stat.compareTable);
        saveFile(this, `${datetime}stat.csv`, 'stat')
      },
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
