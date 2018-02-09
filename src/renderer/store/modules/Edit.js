const fs = require('fs');

const state = {
  files: [],
  file: [],
  doc: [],
  leftPanel: 'table'
};

const mutations = {
  PUSH_DOC(state, message) {
    state.doc.push(message);
  },
  POP_DOC(state, message) {
    console.log(message);
    state.doc.pop();
  },
  EDIT_LOAD_FILES() {
    const files = fs.readdirSync(global.hitbdata.path.user).filter(x => x.endsWith('.csv'))
    state.files = files;
  },
  EDIT_LOAD_FILE(state, message) {
    state.file = message;
  },
  EDIT_LOAD_DOC(state, message) {
    state.doc = message;
  },
  EDIT_SET_LEFTPANEL(state, message) {
    state.leftPanel = message;
  },
  EDIT_SERVER_FILES() {
    // todo: 从服务器接口获取文档列表
    const files = []
    state.files = files;
  },
};

const actions = {
  someAsyncTask({ commit }) {
    commit('PUSH_DOC');
    commit('EDIT_LOAD_FILES');
    commit('EDIT_LOAD_FILE');
    commit('EDIT_LOAD_DOC');
    commit('EDIT_SERVER_FILES');
  },
};

export default {
  state,
  mutations,
  actions,
};
