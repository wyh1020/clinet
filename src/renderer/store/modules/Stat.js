const fs = require('fs');

const state = {
  files: [],
  file: [],
  chartLeft: 'chartLeft',
  chartRight: 'chartRight',
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
  SET_CHART_LEFT(state, message) {
    state.chartLeft = message;
  },
  SET_CHART_RIGHT(state, message) {
    state.chartRight = message;
  },
};

const actions = {
  someAsyncTask({ commit }) {
    commit('STAT_LOAD_FILES');
    commit('STAT_LOAD_FILE');
    commit('STAT_SERVER_FILES');
    commit('SET_CHART_LEFT');
    commit('SET_CHART_RIGHT');
  },
};

export default {
  state,
  mutations,
  actions,
};
