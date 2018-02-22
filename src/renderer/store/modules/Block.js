const state = {
  // 页面工具栏选择
  toolbar: '',
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
  server: '',
  port: '',
};

const mutations = {
  BLOCK_SET_TOOLBAR(state, toolbar) {
    state.toolbar = toolbar;
  },
  BLOCK_SET_SERVER(state, m) {
    state.server = m[1];
    state.port = m[2];
  },
  BLOCK_SET_SERVER_STATUS(state, m) {
    const x = `${state.file[m[0]]}${m[1]}`
    state.file.splice(m[0], 1, x)
  },
  BLOCK_GET_FILES(state, files) {
    state.files = files;
  },
  BLOCK_LOAD_FILE(state, file) {
    state.file = file;
  },
  BLOCK_GET_TABLES(state, tables) {
    state.tables = tables;
  },
  BLOCK_GET_TABLE(state, table) {
    state.table = table;
  },
  BLOCK_GET_FIELD(state, field) {
    state.field = field;
  },
  BLOCK_GET_FIELD_INDEX(state, index) {
    state.fieldIndex = index;
  },
  BLOCK_SET_TABLE(state, field) {
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
    commit('BLOCK_SET_TOOLBAR');
    commit('BLOCK_GET_FILES');
    commit('BLOCK_LOAD_FILE');
    commit('BLOCK_GET_TABLES');
    commit('BLOCK_GET_TABLE');
    commit('BLOCK_GET_FIELD');
    commit('BLOCK_SET_TABLE');
    commit('BLOCK_SET_SERVER');
    commit('BLOCK_SET_SERVER_STATUS');
  },
};

export default {
  state,
  mutations,
  actions,
};
