const state = {
  // 选择目录下的CSV文件列表
  files: [],
  // 选择要导入的CSV文件
  file: [],
  // 系统内置的table列表
  tables: [],
  // 选择要处理的table
  table: [],
};

const mutations = {
  GET_FILES(state, files) {
    state.files = files;
  },
  GET_FILE(state, file) {
    state.file = file;
  },
  GET_TABLES(state, tables) {
    state.tables = tables;
  },
  GET_TABLE(state, table) {
    state.table = table;
  }
};

const actions = {
  someAsyncTask({ commit }) {
    // do something async
    commit('GET_FILES');
    commit('GET_FILE');
    commit('GET_TABLES');
    commit('GET_TABLE');
  },
};

export default {
  state,
  mutations,
  actions,
};
