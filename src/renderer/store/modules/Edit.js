const fs = require('fs');

const state = {
  files: [],
  file: [],
  doc: [],
  docIndex: 0,
  filesIndex: null,
  fileIndex: null,
  leftPanel: 'doc',
  rightPanel: 'help',
  lastNav: null,
  filePage: 0,
  filesPage: 0,
  fileType: 'csv',
};

const mutations = {
  EDIT_UPDATE_DOC(state, m) {
    state.doc[m[0]] = m[1];
  },
  EDIT_DELETE_ITEM(state, n) {
    state.doc.splice(n, 1);
  },
  EDIT_LOAD_FILES() {
    const files = fs.readdirSync(global.hitbdata.path.user).filter(x => x.endsWith('.csv') || x.endsWith('.cda'))
    state.files = files;
  },
  EDIT_LOAD_FILE(state, message) {
    state.file = message;
  },
  EDIT_SET_FILE_PAGE(state, n) {
    state.filePage += n;
  },
  EDIT_SET_FILES_PAGE(state, n) {
    state.filesPage += n;
  },
  EDIT_LOAD_DOC(state, message) {
    // console.log(message)
    const x = message.map(m => m.split(' ').filter(i => i !== ''))
    // console.log(x)
    state.doc = x;
  },
  EDIT_SET_DOC(state) {
    state.doc = [];
  },
  EDIT_SET_LEFT_PANEL(state, message) {
    state.leftPanel = message;
  },
  EDIT_SET_RIGHT_PANEL(state, message) {
    state.rightPanel = message;
  },
  EDIT_SERVER_FILES() {
    // todo: 从服务器接口获取文档列表
    const files = []
    state.files = files;
  },
  EDIT_SET_FILES_INDEX(state, message) {
    state.filesIndex = message;
  },
  EDIT_SET_FILE_INDEX(state, message) {
    state.fileIndex = message;
  },
  EDIT_SET_FILE_TYPE(state, message) {
    state.fileType = message;
  },
  EDIT_SET_LAST_NAV(state, message) {
    state.lastNav = message;
  },
  EDIT_SET_DOC_INDEX(state, m) {
    if (m[1]) {
      state.docIndex = 0;
    } else {
      state.docIndex += m[0];
      if (state.docIndex < 0) { state.docIndex = 0 }
      if (state.docIndex > state.doc.length) { state.docIndex = state.doc.length }
    }
  },
};

const actions = {
  someAsyncTask({ commit }) {
    commit('EDIT_LOAD_FILES');
    commit('EDIT_LOAD_FILE');
    commit('EDIT_LOAD_DOC');
    commit('EDIT_SET_DOC');
    commit('EDIT_SERVER_FILES');
    commit('EDIT_SET_LEFT_PANEL');
    commit('EDIT_SET_RIGHT_PANEL');
    commit('EDIT_SET_FILES_INDEX');
    commit('EDIT_SET_FILE_INDEX');
    commit('EDIT_SET_LAST_NAV');
    commit('EDIT_SET_FILE_PAGE');
    commit('EDIT_SET_FILES_PAGE');
    commit('EDIT_SET_DOC_INDEX');
    commit('EDIT_UPDATE_DOC');
    commit('EDIT_DELETE_ITEM');
    commit('EDIT_SET_FILE_TYPE');
  },
};

export default {
  state,
  mutations,
  actions,
};
