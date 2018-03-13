const fs = require('fs');

const state = {
  files: [],
  file: [],
  table: [],
  tablePage: 0,
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
  dimension: [],
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
  serverTable: [],
  chartLeft: '柱状图',
  chartRight: '折线图',
  tableType: 'local',
  fileIndex: null,
  tableName: '',
  statFlag: [],
  statFlarTd: []
};

const mutations = {
  STAT_LOAD_FILES() {
    state.files = fs.readdirSync(global.hitbdata.path.stat).filter(x => x.endsWith('.csv'))
  },
  STAT_LOAD_FILE(state, message) {
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
  },
  STAT_TABLE_PAGE(state, n) {
    state.tablePage += n;
  },
  STAT_SERVER_FILES(state, opt) {
    state.files = opt.data;
  },
  STAT_SET_LEFT_PANEL(state, opt) {
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
  },
  STAT_SET_DIMENSION(state, opt) {
    switch (opt[0]) {
      case '机构':
        // state.dimensionOrg.push(opt[1])
        // console.log(opt)
        state.tableSel = state.table.filter(x => x[0] === opt[1])
        break;
      case '时间':
        // console.log(opt)
        // state.dimensionTime.push(opt[1])
        state.tableSel = state.table.filter(x => x[1] === opt[1])
        break;
      case '病种':
        // console.log(opt)
        // state.dimensionDrg.push(opt[1])
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
  },
  STAT_SET_CHART_OPTION(state, opt) {
    const id = opt[0]
    const type = opt[1]
    const option = opt[2]
    if (id === 'chartLeft') {
      switch (type) {
        case '柱状图':
          state.leftBar = option;
          break;
        case '折线图':
          state.leftLine = option;
          break;
        case '雷达图':
          state.leftRadar = option;
          break;
        case '散点图':
          state.leftScatter = option;
          break;
        default:
          break
      }
    } else {
      switch (type) {
        case '柱状图':
          state.rightBar = option;
          break;
        case '折线图':
          state.rightLine = option;
          break;
        case '雷达图':
          state.rightRadar = option;
          break;
        case '散点图':
          state.rightScatter = option;
          break;
        default:
          break
      }
    }
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
  },
  STAT_SET_SERVER_TABLE(state, data) {
    state.serverTable = data
  },
  STAT_SET_TABLE_TYPE(state, data) {
    state.tableType = data
  },
  STAT_SET_CHART_LEFT(state, data) {
    state.chartLeft = data
  },
  STAT_SET_CHART_RIGHT(state, data) {
    state.chartRight = data
  },
  STAT_SET_FILE_INDEX(state, index) {
    state.fileIndex = index
  },
  STAT_TABLE_NAME(state, index) {
    state.tableName = index
  },
  STAT_SET_FILE_FLAG(state) {
    state.selectedRow = [];
    state.selectedCol = [];
  }
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
    commit('STAT_SET_TABLE_TYPE');
    commit('STAT_SET_FILE_INDEX');
    commit('STAT_SET_FILE_FLAG');
  },
};

export default {
  state,
  mutations,
  actions,
};
