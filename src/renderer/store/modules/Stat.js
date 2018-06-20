const fs = require('fs');

const state = {
  files: [],
  file: [],
  table: [],
  tablePage: 1,
  tableSel: [],
  leftPanel: 'file',
  leftBar: null,
  leftLine: null,
  leftRadar: null,
  leftScatter: null,
  rightBar: null,
  rightLine: null,
  rightRadar: null,
  rightScatter: null,
  dimension: null,
  dimensionSel: ['时间', '机构', '病种', '全部', '自定义维度'],
  dimensionType: null,
  dimensionOrg: [],
  dimensionTime: [],
  dimensionDrg: [],
  dimensionOrgSel: [],
  dimensionTimeSel: [],
  dimensionDrgSel: [],
  notice: [],
  tableHeader: [],
  selectedRow: [],
  selectedCol: [],
  compareTable: [],
  serverTable: { page: 1, countPage: 0, data: [], pageList: [], tableName: '' },
  localTables: {},
  localTable: [],
  chartData: [],
  haveRight: false,
  colNum: 10,
  chartLeft: '柱状图',
  chartRight: '折线图',
  tableType: 'local',
  fileIndex: { first: 0, second: 0, third: 0 },
  dimensionServer: '',
  isServer: false,
  fileName: null,
  countPage: 0,
  titlePage: 0,
  compareTable1: [],
  chartOption: '',
  chartIsShow: 'chart',
  serverMenu: { first: [], second: [], third: [], type: '' },
  caseTable: { page: 1, countPage: 0, data: [], pageList: [], tableName: '' },
  caseSelectedRow: [],
  caseSelectedCol: [],
  xObj: {},
  barType: ''
};

const mutations = {
  STAT_LOAD_FILES() {
    state.files = fs.readdirSync(global.hitbdata.path.stat).filter(x => x.endsWith('.csv')).filter(x => !x.startsWith('wt4'))
  },
  STAT_SET_FILE_NAME(state, value) {
    state.fileName = value;
  },
  STAT_LOAD_FILE(state, message) {
    state.isServer = false
    state.file = message;
    state.table = message.map(x => x.split(','))
    state.tableHeader = state.table.slice(0, 1)
    state.tableSel = state.table
    state.tableSel.splice(0, 1)
    state.dimensionOrg = [...new Set(state.table.map(a => a[0]))]
    state.dimensionTime = [...new Set(state.table.map(a => a[1]))]
    state.dimensionDrg = [...new Set(state.table.map(a => a[2]))]
    state.notice = [
      `病案总数：${state.tableSel.length - 1}`,
      `机构总数：${state.dimensionOrg.length}`,
      `时间维度总数：${state.dimensionTime.length - 1}`,
      `病种维度总数：${state.dimensionDrg.length - 1}`,
    ]
    const page = Math.ceil(state.tableSel.length / 20)
    // const page = 1
    state.countPage = page
    for (let i = 1; i < page; i += 1) {
      const f = []
      f.push(state.tableHeader[0])
      for (let j = 1; j < 20; j += 1) {
        f.push(state.tableSel[i * j])
      }
      state.localTables[i] = f
    }
    state.localTable = state.localTables[state.tablePage]
    if (state.tableHeader[0].length > 10) {
      state.haveRight = true
      state.colNum = 10
      const table = []
      const indexs = [...Array(10)].map((v, k) => k)
      state.localTable.forEach((xs) => {
        table.push(indexs.map(x => xs[x]))
      })
      state.localTable = table
    }
    // console.log(state.localTables);
  },
  STAT_TABLE_PAGE(state, n) {
    if (state.tableType === 'server' && n === 0) {
      state.serverTable.page = n;
    } else if (state.countPage !== n) {
      state.tablePage += n;
      state.localTable = state.localTables[state.tablePage]
    }
  },
  STAT_SET_COUNT_PAGE(state, n) {
    state.countPage = n
  },
  STAT_SET_TABLE_PAGE(state, n) {
    state.tablePage = n
  },
  STAT_SERVER_FILES(state, opt) {
    state.files = opt.data;
  },
  STAT_SET_LEFT_PANEL(state, opt) {
    if (state.tableType === 'local') {
      state.leftPanel = opt[0];
      state.dimensionType = opt[1];
      switch (opt[1]) {
        case '机构':
          state.dimension = state.dimensionOrg
          break;
        case '时间':
          state.dimension = state.dimensionTime
          break;
        case '病种':
          state.dimension = state.dimensionDrg
          break;
        default:
          break;
      }
    } else {
      state.leftPanel = opt[0]
      state.dimension = opt[2]
      state.dimensionType = opt[1]
    }
  },
  STAT_SET_SERVER_DIMENSION(state, index) {
    state.dimensionServer = index
  },
  STAT_SET_DIMENSION(state, opt) {
    switch (opt[0]) {
      case '机构':
        state.tableSel = state.table.filter(x => x[0] === opt[1])
        break;
      case '时间':
        state.tableSel = state.table.filter(x => x[1] === opt[1])
        break;
      case '病种':
        state.tableSel = state.table.filter(x => x[2] === opt[1])
        break;
      default:
        state.dimensionOrg = []
        state.dimensionTime = []
        state.dimensionDrg = []
        break;
    }
    state.notice = [
      `病案总数：${state.tableSel.length - 1}`
    ]
    const page = Math.ceil(state.tableSel.length / 20)
    state.countPage = page
    for (let i = 0; i < page; i += 1) {
      const f = []
      f.push(state.tableHeader[0])
      for (let j = 0; j < 19; j += 1) {
        f.push(state.tableSel[(i + 1) * j])
      }
      state.localTables[i] = f
    }
    state.localTable = state.localTables[state.tablePage]
  },
  STAT_GET_FIELD(state, field) {
    state.field = field;
  },
  STAT_GET_FIELD_INDEX(state, index) {
    state.fieldIndex = index;
  },
  STAT_SET_COL(state, index) {
    const x = state.selectedCol.indexOf(index)
    if (x === -1) {
      state.selectedCol.push(index)
    } else {
      state.selectedCol.splice(x, 1)
    }
  },
  STAT_SET_ROW(state, index) {
    const x = state.selectedRow.indexOf(index)
    if (x === -1) {
      state.selectedRow.push(index)
    } else {
      state.selectedRow.splice(x, 1)
    }
  },
  STAT_SET_COMPARE_TABLE(state, data) {
    state.compareTable = data
    // const compare = this.$store.state.Stat.compareTable
    // 取得所有对比行中所有的key并去重
    let keys = []
    keys = keys.concat.apply([], data.map(x => Object.keys(x)))
    keys = Array.from(new Set(keys))
    // 存储表头
    state.compareTable1.push(keys)
    // 取得表内容,取不到的用-代替
    data.forEach((xs) => {
      const f = []
      keys.forEach((x, i) => {
        if (xs[x]) {
          f[i] = xs[x]
        } else {
          f[i] = '-'
        }
      })
      state.compareTable1.push(f)
    })
  },
  STAT_SET_SERVER_TABLE(state, opt) {
    // state.tableSel = opt.tableSel
    // state.dimensionOrg = opt.dimensionOrg
    // state.dimensionTime = opt.dimensionTime
    // state.dimensionDrg = opt.dimensionDrg
    state.notice = [
      `病案总数：${opt.tableSel}`,
      `机构总数：${opt.dimensionOrg}`,
      `时间维度总数：${opt.dimensionTime}`,
      `病种维度总数：${opt.dimensionDrg}`,
    ]
    state.isServer = true
    state.serverTable = opt
  },
  STAT_SET_TABLE_TYPE(state, data) {
    if (data !== 'compare') {
      if (data === 'server' || data === 'case' ||　data === 'block') {
        state.isServer = true
      } else {
        state.isServer = false
      }
    }
    state.tableType = data
  },
  STAT_SET_CHART_LEFT(state, data) {
    state.chartLeft = data
  },
  STAT_SET_CHART_RIGHT(state, data) {
    state.chartRight = data
  },
  STAT_SET_CHART_DATA(state, data) {
    state.chartData = data
  },
  STAT_SET_FILE_INDEX(state, value) {
    if (state.isServer) {
      switch (value[0]) {
        case 'first':
          state.fileIndex.first = value[1]
          break;
        case 'second':
          state.fileIndex.second = value[1]
          break;
        case 'third':
          state.fileIndex.third = value[1]
          break;
        default:
          break;
      }
    } else {
      state.fileIndex.first = value[1]
    }
  },
  STAT_TABLE_NAME(state, index) {
    state.tableName = index
  },
  STAT_SET_FILE_FLAG(state) {
    state.selectedRow = [];
    state.selectedCol = [];
  },
  STAT_GET_FILE_SEARCH(state, values) {
    state.localTables = {}
    const a = state.tableSel.filter(n => n[1] === values || n[0] === values || n[2] === values)
    //   return n[1] === values || n[0] === values || n[2] === values);
    const page = Math.ceil(a.length / 20)
    // const page = 1
    for (let i = 0; i < page; i += 1) {
      const f = []
      f.push(state.tableHeader[0])
      for (let j = 0; j < 19; j += 1) {
        f.push(a[(i + 1) * j])
      }
      state.localTables[i] = f
    }
    state.localTable = state.localTables[state.tablePage]
  },
  STAT_SET_COL_NUM(state, num) {
    if (state.tableType === 'local') {
      state.colNum = num
      const indexs = []
      // const rangeArray = (start, end) => Array((end - start) + 1).map((v, i) => i + start)
      for (let i = num - 10; i < num; i += 1) { indexs.push(i) }
      state.haveRight = true
      const table = []
      state.localTables[state.tablePage].forEach((xs) => {
        table.push(indexs.map(x => xs[x]))
      })
      state.localTable = table
    }
  },
  // STAT_SET_TITLE_PAGE(state, num) {
  //   state.colNum = num
  // },
  STAT_SET_CHART_OPTION(state, opt) {
    state.chartIsShow = 'chart'
    state.chartOption = opt
  },
  STAT_SET_CHART_IS_SHOW(state, value) {
    state.chartIsShow = value
  },
  STAT_SET_SERVER_MENU(state, opt) {
    const type = opt[0]
    const opt2 = opt[1]
    switch (type) {
      case '一级菜单':
        state.serverMenu.first = opt2
        if (state.tableType === 'server') {
          state.serverMenu.first.push('病案数据.csv')
        }
        break;
      case '二级菜单':
        state.serverMenu.second = opt2
        break;
      case '三级菜单':
        state.serverMenu.third = opt2
        break;
      default:
        break;
    }
    state.serverMenu.type = type
  },
  STAT_SET_CASE_TABLE(state, value) {
    state.caseTable = value
  },
  STAT_SET_DIMENSION_SEL(state, value) {
    const index = state.dimensionSel.indexOf(value)
    if (index === -1) {
      state.dimensionSel.push(value)
    }
  },
  STAT_SET_CASE_ROW(state, index) {
    const x = state.caseSelectedRow.indexOf(index)
    if (x === -1) {
      state.caseSelectedRow.push(index)
    } else {
      state.caseSelectedRow.splice(x, 1)
    }
  },
  STAT_SET_CASE_COL(state, index) {
    const x = state.caseSelectedCol.indexOf(index)
    if (x === -1) {
      state.caseSelectedCol.push(index)
    } else {
      state.caseSelectedCol.splice(x, 1)
    }
  },
  STAT_SET_CASE_FLAG(state) {
    state.caseSelectedRow = []
    state.caseSelectedCol = []
  },
  STAT_SET_TABLE(state, value) {
    switch (value[0]) {
      case 'local':
        state.localTable = value[1]
        break;
      case 'server':
        state.serverTable.data = value[1]
        break;
      default:
        break;
    }
  },
  STAT_SET_XOBJ(state, value) {
    const key = Object.keys(state.xObj)
    if ((!key.includes(value[0]) && value[1] === 0) || value[1] === -1) {
      state.xObj[value[0]] = { bvalue: '', svalue: '' }
    }
  },
  STAT_SET_BAR_TYPE(state, value) {
    state.barType = value;
  },
};

const actions = {
  someAsyncTask({ commit }) {
    commit('STAT_LOAD_FILES');
    commit('STAT_LOAD_FILE');
    commit('STAT_SERVER_FILES');
    commit('STAT_SET_CHART_OPTION');
    commit('STAT_SET_LEFT_PANEL');
    commit('STAT_TABLE_PAGE');
    commit('STAT_SET_DIMENSION');
    commit('STAT_GET_FIELD');
    commit('STAT_GET_FIELD_INDEX');
    commit('STAT_SET_COL');
    commit('STAT_SET_ROW');
    commit('STAT_SET_COMPARE_TABLE');
    commit('STAT_SET_CHART_LEFT');
    commit('STAT_SET_CHART_RIGHT');
    commit('STAT_SET_CHART_DATA');
    commit('STAT_SET_TABLE_TYPE');
    commit('STAT_SET_FILE_INDEX');
    commit('STAT_SET_FILE_FLAG');
    commit('STAT_GET_FILE_SEARCH');
    commit('STAT_SET_SERVER_DIMENSION');
    commit('STAT_SET_SERVER_TABLE');
    commit('STAT_SET_TABLE_PAGE');
    commit('STAT_SET_FILE_NAME');
    commit('STAT_SET_COUNT_PAGE');
    commit('STAT_SET_COL_NUM');
    commit('STAT_SET_TITLE_PAGE');
    commit('STAT_SET_CHART_IS_SHOW');
    commit('STAT_SET_SERVER_MENU');
    commit('STAT_SET_CASE_TABLE');
    commit('STAT_SET_DIMENSION_SEL');
    commit('STAT_SET_CASE_ROW');
    commit('STAT_SET_CASE_COL');
    commit('STAT_SET_CASE_FLAG');
    commit('STAT_SET_TABLE');
    commit('STAT_SET_XOBJ');
    commit('STAT_SET_BAR_TYPE');
  },
};
export default {
  state,
  mutations,
  actions,
};
