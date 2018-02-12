const fs = require('fs');

const state = {
  files: [],
  file: [],
  table: [],
  tablePage: 0,
  leftPanel: 'file',
  dimension: [],
  dimensionType: null,
  dimensionOrg: [],
  dimensionTime: [],
  dimensionVersion: [],
};

const mutations = {
  LIBRARY_LOAD_FILES() {
    const files = fs.readdirSync(global.hitbdata.path.library).filter(x => x.endsWith('.csv'))
    state.files = files;
  },
  LIBRARY_LOAD_FILE(state, message) {
    state.file = message;
  },
  LIBRARY_SERVER_FILES() {
    const files = []
    state.files = files;
  },
  LIBRARY_TABLE_PAGE(state, m) {
    if (m[1]) {
      state.tablePage = 0;
    } else {
      state.tablePage += m[0];
    }
    if (state.tablePage < 0) { state.tablePage = 0 }
    const maxPage = Math.floor(state.file.length / 100)
    if (state.tablePage > maxPage) {
      state.tablePage = maxPage
    }
  },
  LIBRARY_SET_LEFT_PANEL(state, opt) {
    state.leftPanel = opt[0];
    state.dimensionType = opt[1];
    switch (opt[1]) {
      case '机构':
        state.dimension = state.dimensionOrg
        break;
      case '时间':
        state.dimension = state.dimensionTime
        break;
      case '版本':
        state.dimension = state.dimensionVersion
        break;
      default:
        break;
    }
  },
};

const actions = {
  someAsyncTask({ commit }) {
    commit('LIBRARY_LOAD_FILES');
    commit('LIBRARY_LOAD_FILE');
    commit('LIBRARY_SERVER_FILES');
    commit('LIBRARY_TABLE_PAGE');
    commit('LIBRARY_SET_LEFT_PANEL');
  },
};

export default {
  state,
  mutations,
  actions,
};
