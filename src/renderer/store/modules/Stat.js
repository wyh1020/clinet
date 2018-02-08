const fs = require('fs');
const path = require('path');
const basePath = path.format({ dir: 'C:\\hitbdata\\stat' });

const state = {
  files: [],
  file: []
};

const mutations = {
  STAT_LOAD_FILES() {
    const files = fs.readdirSync(basePath).filter(x => x.endsWith('.csv'))
    state.files = files;
  },
  STAT_LOAD_FILE(state, message) {
    state.file = message;
  },
};

const actions = {
  someAsyncTask({ commit }) {
    commit('STAT_LOAD_FILES');
    commit('STAT_LOAD_FILE');
  },
};

export default {
  state,
  mutations,
  actions,
};
