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
};

const mutations = {
  STAT_LOAD_FILES() {
    const files = fs.readdirSync(global.hitbdata.path.stat).filter(x => x.endsWith('.csv'))
    state.files = files;
  },
  STAT_LOAD_FILE(state, message) {
    state.file = message;
    state.table = message.map(x => x.split(','))
    state.tableSel = state.table
    state.dimensionOrg = [...new Set(state.table.map(a => a[0]))]
    state.dimensionTime = [...new Set(state.table.map(a => a[1]))]
    state.dimensionDrg = [...new Set(state.table.map(a => a[2]))]
  },
  STAT_TABLE_PAGE(state, n) {
    state.tablePage += n;
  },
  STAT_SERVER_FILES() {
    const files = []
    state.files = files;
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
        state.dimensionOrg.push(opt[1])
        console.log(opt)
        state.tableSel = state.table.filter(x => x[0] === opt[1])
        break;
      case '时间':
        console.log(opt)
        state.dimensionTime.push(opt[1])
        state.tableSel = state.table.filter(x => x[1] === opt[1])
        break;
      case '病种':
        console.log(opt)
        state.dimensionDrg.push(opt[1])
        state.tableSel = state.table.filter(x => x[2] === opt[1])
        break;
      default:
        state.dimensionOrg = []
        state.dimensionTime = []
        state.dimensionDrg = []
        break;
    }
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
  },
};

export default {
  state,
  mutations,
  actions,
};
