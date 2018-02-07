const state = {
  // 选择目录下的CSV文件列表
  files: [],
  // 选择要导入的CSV文件
  file: [],
  // 系统内置的table列表
  tables: [],
  // 选择要处理的table
  table: [],
  // 选择要处理的field
  field: [],
  fieldIndex: null,
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
  },
  GET_FIELD(state, field) {
    state.field = field;
  },
  GET_FIELD_INDEX(state, index) {
    state.fieldIndex = index;
  },
  SET_TABLE(state, field) {
    // console.log(field)
    // console.log(state.field)
    // console.log(state.fieldIndex)
    // console.log(state.table[state.fieldIndex])
    if (state.table[state.fieldIndex].length > 5) {
      state.table[state.fieldIndex].pop()
    }
    state.table[state.fieldIndex].push(field)
    state.table = state.table;
  },
};

const actions = {
  someAsyncTask({ commit }) {
    // do something async
    commit('GET_FILES');
    commit('GET_FILE');
    commit('GET_TABLES');
    commit('GET_TABLE');
    commit('GET_FIELD');
    commit('SET_TABLE');
  },
};

export default {
  state,
  mutations,
  actions,
};
