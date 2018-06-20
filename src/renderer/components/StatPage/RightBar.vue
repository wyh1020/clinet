<template>
  <nav class="navbar navbar-expand-lg sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-if="this.$store.state.Stat.tableType === 'case'" v-on:click='backTable()'>
          <a class="nav-link text-light" href="#"> 返回 <span class="sr-only">(current)</span></a>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="stat-file-dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            文件
          </a>
          <div class="dropdown-menu" aria-labelledby="stat-file-dropdown">
            <a class="nav-link" href="#" title="显示本地文件" id="stat-local-file" v-on:click='loadData()'> 本地 <span class="sr-only">(current)</span></a>
            <a class="nav-link" href="#" title="显示远程文件" id="stat-remote-file" v-on:click='serverData()'> 远程 <span class="sr-only">(current)</span></a>
            <a class="nav-link" href="#" title="显示区块链文件" id="stat-block-file" v-on:click='blockData()'> 区块链 <span class="sr-only">(current)</span></a>
          </div>
        </li>
        <!-- <li class="nav-item active" id="stat-local-doc" v-on:click='loadData()'>
          <a class="nav-link text-light" href="#" title="显示本地文件"> 本地 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" id="stat-remote-file" v-on:click='serverData()'>
          <a class="nav-link text-light" href="#" title="显示远程文件"> 远程 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" id="stat-block-file" v-on:click='blockData()'>
          <a class="nav-link text-light" href="#" title="显示区块链文件"> 区块链 <span class="sr-only">(current)</span></a>
        </li> -->
        <li class="nav-item active" v-if ="this.$store.state.Stat.tableType === 'server'" v-on:click='blockShare()'>
          <a class="nav-link text-light" href="#" title="分享选中记录"> 分享 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" id="stat-prev-page" v-on:click='page(-1)'>
          <a class="nav-link text-light" href="#" title="向前翻页"> 前页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" id="stat-next-page" v-on:click='page(1)'>
          <a class="nav-link text-light" href="#" title="向后翻页"> 后页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" id="stat-edit-data" v-on:click='edit()'>
          <a class="nav-link text-light" href="#" title="跳转到编辑来编辑该文件"> 编辑数据 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="stat-left-chart" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="选择分析图表左图类型">
            左图选择
          </a>
          <div class="dropdown-menu" aria-labelledby="stat-left-chart">
            <a class="nav-link" href="#" v-for="chart in charts" v-bind:key='chart' v-on:click='showChart("chartLeft", chart)' v-bind:id="'stat-left-chart-'+chart"> {{chart}} <span class="sr-only">(current)</span></a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="stat-right-chart" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  title="选择分析图表右图类型">
            右图选择
          </a>
          <div class="dropdown-menu" aria-labelledby="stat-right-chart">
            <a class="nav-link" href="#"  v-for="chart in charts" v-bind:key='chart' v-on:click='showChart("chartRight", chart)' v-bind:id="'stat-right-chart-'+chart"> {{chart}} <span class="sr-only">(current)</span></a>
          </div>
        </li>
        <li v-if="this.$store.state.Stat.tableType !== 'compare'" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="stat-right-dimension" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            维度选择
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <!-- <a id="stat-right-dimension-org" class="nav-link" href="#" v-on:click='selX("机构")'> 机构 <span class="sr-only">(current)</span></a>
            <a id="stat-right-dimension-time" class="nav-link" href="#" v-on:click='selX("时间")'> 时间 <span class="sr-only">(current)</span></a>
            <a id="stat-right-dimension-disease" class="nav-link" href="#" v-on:click='selX("病种")' v-if="tableType === 'local'"> 病种 <span class="sr-only">(current)</span></a>
            <a id="stat-right-dimension-disease" class="nav-link" href="#" v-on:click='selX("全部")'> 全部 <span class="sr-only">(current)</span></a> -->
            <a v-for="(data, index) in dimensionSel" v-bind:key='index' class="nav-link" href="#" v-on:click='selX(index)' v-bind:id="'stat-td-tr'+index" > {{data}} <span class="sr-only">(current)</span></a>
          </div>
        </li>
        <!-- 加入对比 -->
        <li class="nav-item active" id="stat-left-page" v-on:click='compare()' v-if="this.$store.state.Stat.selectedRow.length > 0 || this.$store.state.Stat.selectedCol > 0"  title="当前选中记录加入到对比中">
          <a class="nav-link  text-light" href="#"> 加入对比 <span class="sr-only"></span></a>
        </li>
        <!-- 加入对比 -->
        <!-- 显示对比 -->
        <li class="nav-item active" id="stat-show-contrast" v-on:click='showCompare()' v-if="this.$store.state.Stat.compareTable.length > 0"  title="显示当前已加入对比的内容">
          <a class="nav-link text-light" href="#"> 显示对比 <span class="sr-only">(current)</span></a>
        </li>
        <!-- 显示对比 -->
        <!-- 保存对比 -->
        <li class="nav-item active" id="stat-save-contrast" v-on:click='saveCompare()'  v-if="this.$store.state.Stat.compareTable.length > 0">
          <a class="nav-link text-light" href="#"  title="将目前对比内容保存为文件"> 保存对比 <span class="sr-only">(current)</span></a>
        </li>
        <!-- 保存对比 -->
        <li class="nav-item active" id="stat-left-page" v-on:click='title(-10)' v-if="this.$store.state.Stat.haveRight">
          <a class="nav-link" href="#"> 左页 <span class="sr-only"></span></a>
        </li>
        <li class="nav-item active" id="stat-right-page" v-on:click='title(10)' v-if="this.$store.state.Stat.haveRight">
          <a class="nav-link" href="#"> 右页 <span class="sr-only"></span></a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0" v-on:submit.prevent>
        <a v-if="this.$store.state.Stat.tableType == 'compare'">当前文件:对比</a>
        <a v-else>当前文件:{{this.$store.state.Stat.fileName}}</a>
        <input id="stat-right-search" class="mr-sm-2 form-control" type="search" placeholder="Search" aria-label="Search" v-on:keyup.13="statSearch()" v-model="stat">
      </form>
    </div>
  </nav>
</template>

<script>
  import { share } from '../../utils/Server';
  import chartLine from '../../utils/ChartLine';
  import chartScatter from '../../utils/ChartScatter';
  import chartRadar from '../../utils/ChartRadar';
  import chartBar from '../../utils/ChartBar';
  import chartPie from '../../utils/ChartPie';
  import chartData from '../../utils/ChartData';
  import addContrast from '../../utils/StatContrast';
  // import saveFile from '../../utils/SaveFile';
  import { getStatFiles, getStat, saveStat, getList } from '../../utils/StatServerFile';
  import loadFile from '../../utils/LoadFile';

  export default {
    data() {
      return {
        paths: [],
        stat: '',
        tableType: this.$store.state.Stat.tableType,
      };
    },
    computed: {
      dimensionSel: {
        get() {
          return this.$store.state.Stat.dimensionSel
        }
      },
      file: {
        get() {
          return this.$store.state.Stat.file
        }
      },
      selectedCol: {
        get() {
          return this.$store.state.Stat.selectedCol
        }
      },
      charts: {
        get() {
          return ['柱状图', '折线图', '雷达图', '散点图', '饼图']
        }
      },
    },
    methods: {
      loadData: function () {
        this.$store.commit('SET_NOTICE', '选择本地文件')
        this.$store.commit('STAT_SET_TABLE_PAGE', 1)
        this.$store.commit('STAT_SET_LEFT_PANEL', ['file', null]);
        this.$store.commit('STAT_SET_TABLE_TYPE', 'local');
        this.$store.commit('STAT_LOAD_FILES');
        this.$store.commit('STAT_SET_CHART_IS_SHOW', 'chart');
      },
      serverData: function () {
        if (!this.$store.state.System.user.login) {
          this.$store.commit('SET_NOTICE', '未登录用户,请在系统服务-用户设置内登录');
        } else {
          this.$store.commit('SET_NOTICE', '选择远程文件')
          this.$store.commit('STAT_SET_CHART_IS_SHOW', 'menu');
          this.$store.commit('STAT_SET_TABLE_PAGE', 1)
          this.$store.commit('STAT_SET_TABLE_TYPE', 'server')
          this.$store.commit('STAT_SET_BAR_TYPE', 'server')
          this.$store.commit('STAT_SET_LEFT_PANEL', ['file', null]);
          getStatFiles(this, [this.$store.state.System.server, this.$store.state.System.port], '', this.$store.state.System.user.usernamee, this.$store.state.Stat.tableType)
        }
      },
      blockData: function () {
        if (!this.$store.state.System.user.login) {
          this.$store.commit('SET_NOTICE', '未登录用户,请在系统服务-用户设置内登录');
        } else {
          this.$store.commit('SET_NOTICE', '区块链文件');
          this.$store.commit('STAT_SET_TABLE_TYPE', 'block');
          this.$store.commit('STAT_SET_BAR_TYPE', 'block');
          this.$store.commit('STAT_SET_CHART_IS_SHOW', 'menu');
          this.$store.commit('STAT_SET_TABLE_PAGE', 1)
          this.$store.commit('STAT_SET_LEFT_PANEL', ['file', null]);
          getStatFiles(this, [this.$store.state.System.server, this.$store.state.System.port], '', this.$store.state.System.user.username, 'block')
        }
      },
      page: function (n) {
        if (this.$store.state.Stat.tablePage === 1 && n === -1) {
          this.$store.commit('SET_NOTICE', '当前已是第一页')
        } else if ((this.$store.state.Stat.tablePage === this.$store.state.Stat.countPage && n === 1) || this.$store.state.Stat.countPage === 0) {
          this.$store.commit('SET_NOTICE', '当前已是尾页');
        } else {
          let table = []
          switch (this.$store.state.Stat.tableType) {
            case 'server':
              this.$store.commit('STAT_TABLE_PAGE', n);
              getStat(this, [this.$store.state.System.server, this.$store.state.System.port], { tableName: this.$store.state.Stat.serverTable.tableName, page: this.$store.state.Stat.tablePage, username: this.$store.state.System.user.username, type: this.$store.state.Stat.dimensionType, value: this.$store.state.Stat.dimensionServer }, 'stat')
              table = this.$store.state.Stat.serverTable.data
              break;
            case 'local':
              this.$store.commit('STAT_TABLE_PAGE', n);
              this.$store.commit('SET_NOTICE', `当前${this.$store.state.Stat.tablePage}页,共${this.$store.state.Stat.countPage}页`)
              table = this.$store.state.Stat.localTable
              chartData(this, table, this.$store.state.Stat.selectedRow, this.$store.state.Stat.selectedCol)
              break;
            default:
              break;
          }
          switch (this.$store.state.Stat.chartLeft) {
            case '柱状图':
              chartBar('chartLeft', this.$store.state.Stat.chartData)
              break;
            case '折线图':
              chartLine('chartLeft', this.$store.state.Stat.chartData)
              break;
            case '雷达图':
              chartRadar('chartLeft', this.$store.state.Stat.chartData)
              break;
            case '散点图':
              chartScatter('chartLeft', this.$store.state.Stat.chartData)
              break;
            case '饼图':
              chartPie('chartLeft', this.$store.state.Stat.chartData)
              break;
            default: break;
          }
          switch (this.$store.state.Stat.chartRight) {
            case '柱状图':
              chartBar('chartRight', this.$store.state.Stat.chartData)
              break;
            case '折线图':
              chartLine('chartRight', this.$store.state.Stat.chartData)
              break;
            case '雷达图':
              chartRadar('chartRight', this.$store.state.Stat.chartData)
              break;
            case '散点图':
              chartScatter('chartRight', this.$store.state.Stat.chartData)
              break;
            case '饼图':
              chartPie('chartRight', this.$store.state.Stat.chartData)
              break;
            default: break;
          }
        }
      },
      edit: function () {
        switch (this.$store.state.Stat.tableType) {
          case 'local':
            if (this.$store.state.Stat.fileIndex !== null) {
              this.$store.commit('EDIT_SET_LEFT_PANEL', 'table');
              this.$store.commit('EDIT_LOAD_FILE', this.$store.state.Stat.localTable);
            }
            this.$store.commit('EDIT_SET_RIGHT_PANEL', 'local');
            this.$store.commit('EDIT_SET_FILES_INDEX', this.$store.state.Stat.fileIndex);
            break;
          case 'server':
            this.$store.commit('EDIT_SET_LEFT_PANEL', 'table');
            this.$store.commit('EDIT_SET_RIGHT_PANEL', 'server');
            this.$store.commit('EDIT_SET_FILES_INDEX', 0);
            this.$store.commit('EDIT_LOAD_FILE', this.$store.state.Stat.serverTable.data);
            break;
          default:
        }
        this.$store.commit('EDIT_SET_LAST_NAV', '/stat');
        this.$store.commit('SET_NOTICE', '数据采集-数据采集');
        this.$store.commit('EDIT_SET_BAR_VALUE', '');
        this.$router.push('/edit');
      },
      selX: function (x) {
        this.$store.commit('SET_NOTICE', `选择维度：${this.dimensionSel[x]}`)
        switch (this.$store.state.Stat.tableType) {
          case 'local': {
            if (this.$store.state.Stat.localTable.length > 0) {
              if (this.dimensionSel[x] === '全部') {
                this.$store.commit('STAT_SET_LEFT_PANEL', ['file', null]);
                loadFile(this, this.$store.state.Stat.fileName, 'stat')
              } else if (this.dimensionSel[x] === '自定义维度') {
                if (this.selectedCol.length > 0) {
                  this.$store.commit('STAT_SET_CHART_IS_SHOW', 'dimension');
                } else {
                  this.$store.commit('SET_NOTICE', '请选择维度！')
                }
              } else if (this.dimensionSel[x] === '时间' || this.dimensionSel[x] === '机构' || this.dimensionSel[x] === '病种') {
                this.$store.commit('STAT_SET_LEFT_PANEL', ['dimension', this.dimensionSel[x]]);
              }
            } else {
              this.$store.commit('SET_NOTICE', '请选择文件');
            }
            break;
          }
          case 'server': {
            if (this.$store.state.Stat.serverTable.data.length > 0) {
              if (this.dimensionSel[x] === '全部') {
                this.$store.commit('STAT_SET_TABLE_TYPE', 'server');
                this.$store.commit('STAT_SET_LEFT_PANEL', ['file', null]);
                getStat(this, [this.$store.state.System.server, this.$store.state.System.port], { tableName: this.$store.state.Stat.serverTable.tableName, page: this.$store.state.Stat.tablePage, username: this.$store.state.System.user.username, type: this.$store.state.Stat.dimensionType, value: this.$store.state.Stat.dimensionServer }, 'stat')
              } else if (this.dimensionSel[x] === '自定义维度') {
                if (this.selectedCol.length > 0) {
                  this.$store.commit('STAT_SET_CHART_IS_SHOW', 'dimension');
                } else {
                  this.$store.commit('SET_NOTICE', '请选择维度！')
                }
              } else {
                getList(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.Stat.serverTable.tableName, this.dimensionSel[x], this.$store.state.System.user.username)
              }
            } else {
              this.$store.commit('SET_NOTICE', '请选择文件');
            }
            break;
          }
          default: {
            break;
          }
        }
      },
      showChart: function (id, type) {
        let option = this.$store.state.Stat.chartData
        this.$store.commit('SET_NOTICE', type)
        if (option.length === 0) {
          option = null
        }
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
            table = this.$store.state.Stat.serverTable.data
            header = this.$store.state.Stat.serverTable.data[0]
            break;
          case 'local':
            table = this.$store.state.Stat.localTable
            header = this.$store.state.Stat.tableHeader[0]
            break;
          default:
            break;
        }
        const col = this.$store.state.Stat.selectedCol
        const row = this.$store.state.Stat.selectedRow
        const compareTable = this.$store.state.Stat.compareTable
        if (this.$store.state.Stat.tableType !== 'compare') {
          if (row.length > 0 && row[0] !== 0) {
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
        if (this.$store.state.Stat.tableType === 'server' || this.$store.state.Stat.serverTable !== []) {
          // 取得所有对比行中所有的key并去重
          const compareFile = []
          let keys = []
          keys = keys.concat.apply([], this.$store.state.Stat.compareTable.map(x => Object.keys(x)))
          keys = Array.from(new Set(keys))
          // 存储表头
          compareFile.push(keys)
          // 取得表内容,取不到的用-代替
          this.$store.state.Stat.compareTable.forEach((xs) => {
            const f = []
            keys.forEach((x, i) => {
              if (xs[x]) {
                f[i] = xs[x]
              } else {
                f[i] = '-'
              }
            })
            compareFile.push(f)
          })
          saveStat(this, compareFile, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.System.user)
        }
      },
      statSearch: function () {
        switch (this.$store.state.Stat.tableType) {
          case 'local':
            if (this.stat === '') {
              this.$store.commit('SET_NOTICE', '请选择加入查询內容!');
            } else {
              this.$store.commit('STAT_GET_FILE_SEARCH', this.stat)
            }
            break;
          case 'server':
            getStat(this, [this.$store.state.System.server, this.$store.state.System.port], { tableName: this.$store.state.Stat.serverTable.tableName, page: 0, username: this.$store.state.System.user.username, type: this.$store.state.Stat.dimensionType, value: this.stat }, 'stat')
            break;
          default:
        }
      },
      title: function (n) {
        switch (this.$store.state.Stat.tableType) {
          case 'server':
            // this.$store.commit('STAT_SET_TITLE_PAGE', n);
            break;
          case 'local':
            if (n > 0 && this.$store.state.Stat.colNum + n <= this.$store.state.Stat.tableHeader[0].length) {
              this.$store.commit('STAT_SET_COL_NUM', this.$store.state.Stat.colNum + n);
            } else if (n < 0 && this.$store.state.Stat.colNum + n > 0) {
              this.$store.commit('STAT_SET_COL_NUM', this.$store.state.Stat.colNum + n);
            } else {
              this.$store.commit('SET_NOTICE', '超出范围');
            }
            break;
          default:
            break;
        }
      },
      backTable: function () {
        this.$store.commit('STAT_SET_TABLE_TYPE', 'server');
      },
      blockShare: function () {
        const filename = this.$store.state.Stat.serverTable.tableName
        let array = []
        array = this.$store.state.Stat.selectedRow.map(n => this.$store.state.Stat.serverTable.data[n])
        share(this, [this.$store.state.System.server, this.$store.state.System.port], 'stat', filename, this.$store.state.System.user.username, array)
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
  #navbarSupportedContent {
    /* background: radial-gradient(to bottom, #4772fe 0%, #7997fa 0%); */
    background-image: linear-gradient(to right , #4772fe, #7997fa);
    /* background: #2f5ed4; */
    color:#000000;
  }
  .nav-item {
    color:#ffffff;
  }
</style>
