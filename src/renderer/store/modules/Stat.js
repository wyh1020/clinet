const fs = require('fs');

const state = {
  files: [],
  file: [],
  leftBar: null,
  leftLine: null,
  leftRadar: null,
  leftScatter: null,
  rightBar: null,
  rightLine: null,
  rightRadar: null,
  rightScatter: null,
};

const mutations = {
  STAT_LOAD_FILES() {
    const files = fs.readdirSync(global.hitbdata.path.stat).filter(x => x.endsWith('.csv'))
    state.files = files;
  },
  STAT_LOAD_FILE(state, message) {
    state.file = message;
  },
  STAT_SERVER_FILES() {
    const files = []
    state.files = files;
  },
  SET_CHART_OPTION(state, opt) {
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
    commit('SET_CHART_OPTION');
  },
};

export default {
  state,
  mutations,
  actions,
};
