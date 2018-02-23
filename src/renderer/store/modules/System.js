
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
  SYSTEM_SET_TOOLBAR(state, toolbar) {
    state.toolbar = toolbar;
  },
  SYSTEM_SET_SERVER(state, m) {
    state.server = m[1];
    state.port = m[2];
  },
  SYSTEM_SET_SERVER_STATUS(state, m) {
    const a = state.file[m[0]]
    const b = a.split(',')
    b.splice(3, 1, m[1])
    state.file.splice(m[0], 1, b.join(','))
  },
  SYSTEM_GET_FILES(state, files) {
    state.files = files;
  },
  SYSTEM_LOAD_FILE(state, file) {
    state.file = file;
  },
  SYSTEM_GET_TABLES(state, tables) {
    state.tables = tables;
  },
  SYSTEM_GET_TABLE(state, table) {
    state.table = table;
  },
  SYSTEM_GET_FIELD(state, field) {
    state.field = field;
  },
  SYSTEM_GET_FIELD_INDEX(state, index) {
    state.fieldIndex = index;
  },
  SYSTEM_SET_TABLE(state, field) {
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
    commit('SYSTEM_SET_TOOLBAR');
    commit('SYSTEM_GET_FILES');
    commit('SYSTEM_LOAD_FILE');
    commit('SYSTEM_GET_TABLES');
    commit('SYSTEM_GET_TABLE');
    commit('SYSTEM_GET_FIELD');
    commit('SYSTEM_SET_TABLE');
    commit('SYSTEM_SET_SERVER');
    commit('SYSTEM_SET_SERVER_STATUS');
  },
};

export default {
  state,
  mutations,
  actions,
};
