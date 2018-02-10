const fs = require('fs');

const state = {
  files: [],
  file: [],
  table: [],
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
};

const mutations = {
  STAT_LOAD_FILES() {
    const files = fs.readdirSync(global.hitbdata.path.stat).filter(x => x.endsWith('.csv'))
    state.files = files;
  },
  STAT_LOAD_FILE(state, message) {
    state.file = message;
    state.table = message.map(x => x.split(','))
  },
  STAT_SERVER_FILES() {
    const files = []
    state.files = files;
  },
  STAT_SET_LEFT_PANEL(state, opt) {
    state.leftPanel = opt[0];
    let x = []
    switch (opt[1]) {
      case '机构':
        x = [...new Set(state.table.map(a => a[0]))]
        break;
      case '时间':
        x = [...new Set(state.table.map(a => a[1]))]
        break;
      case '病种':
        x = [...new Set(state.table.map(a => a[2]))]
        break;
      default:
        break;
    }
    state.dimension = x
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
  },
};

export default {
  state,
  mutations,
  actions,
};
