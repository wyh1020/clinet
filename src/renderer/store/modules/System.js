const state = {
  paths: [],
  file: [],
  tables: []
};

const mutations = {
  GET_PATH(state, paths) {
    // console.log(paths)
    state.paths = paths;
  },
  GET_FILE(state, file) {
    state.file = file;
  },
  GET_TABLES(state, tables) {
    state.paths = tables;
  }
};

const actions = {
  someAsyncTask({ commit }) {
    // do something async
    commit('GET_PATH');
    commit('GET_FILE');
    commit('GET_TABLES');
  },
};

export default {
  state,
  mutations,
  actions,
};
