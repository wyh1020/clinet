const fs = require('fs');

const state = {
  files: [],
  file: []
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
};

const actions = {
  someAsyncTask({ commit }) {
    commit('STAT_LOAD_FILES');
    commit('STAT_LOAD_FILE');
    commit('STAT_SERVER_FILES');
  },
};

export default {
  state,
  mutations,
  actions,
};
