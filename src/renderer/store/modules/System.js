const state = {
  paths: [],
  file: [],
};

const mutations = {
  GET_PATH(state, paths) {
    // console.log(paths)
    state.paths = paths;
  },
  GET_FILE(state, file) {
    state.file = file;
  }
};

const actions = {
  someAsyncTask({ commit }) {
    // do something async
    commit('GET_PATH');
    commit('GET_FILE');
  },
};

export default {
  state,
  mutations,
  actions,
};
