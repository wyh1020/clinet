
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
  // 用户创建信息
  registerInfo: [],
  // 连接状态
  connectInfo: false,
  // 用户状态
  user: { username: '', org: '', type: 2, login: false },
  // 机构信息
  orgs: [],
  org: []
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
    if (m[1] === '连接成功') {
      state.connectInfo = true
    } else {
      state.connectInfo = false
    }
    console.log(state.connectInfo)
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
    if (state.table[state.fieldIndex].length > 5) {
      state.table[state.fieldIndex].pop()
    }
    state.table[state.fieldIndex].push(field)
    state.table = state.table;
  },
  // 用户注册
  SYSTEM_REGISTER_USER(state, field) {
    state.registerInfo = field
  },
  // 用户登录-登录无故刷新项目
  SYSTEM_SET_USER(state, field) {
    state.user = field[1];
  },
  // 用户信息
  SYSTEM_INFO_USER(state, field) {
    state.user = field[1]
  },
  SYSTEM_GET_ORGS(state, field) {
    console.log(field);
    state.orgs = field
  },
  SYSTEM_NEW_ORG(state, field) {
    console.log(field)
    state.org = field
  }
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
    commit('SYSTEM_REGISTER_USER');
    commit('SYSTEM_SET_USER');
    commit('SYSTEM_INFO_USER');
    commit('SYSTEM_GET_ORGS');
    commit('SYSTEM_NEW_ORG');
  },
};

export default {
  state,
  mutations,
  actions,
};
