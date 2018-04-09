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
  lastNav: '/edit',
  filePage: 0,
  filesPage: 0,
  fileType: 'cda',
  hintPage: 0,
  editBarValue: '',
  hintType: 'notice',
  hint: [],
  helpType: '编辑器使用帮助',
  serverType: 'user',
  docType: '',
  selectedCol: [],
  selectedType: 'row'
};

const mutations = {
  EDIT_UPDATE_DOC(state, m) {
    state.doc.splice(m[0], 1, m[1])
    // if (m[0] === 0) {
    //   state.doc.splice(0, 1, m[1])
    // } else {
    //   state.doc[m[0]] = m[1];
    // }
  },
  EDIT_DELETE_ITEM(state, n) {
    state.doc.splice(n, 1);
  },
  EDIT_DELETE_DOC(state, n) {
    state.file.splice(n, 1);
    state.doc = [];
  },
  EDIT_DELETE_FILE(state, n) {
    state.files.splice(n, 1);
    state.file = [];
  },
  EDIT_ADD_DOC(state, message) {
    state.file.push(message);
  },
  EDIT_ADD_FILE(state, message) {
    state.files.push(message);
  },
  EDIT_SAVE_DOC(state, m) {
    if (state.lastNav !== '/edit') {
      console.log(m)
      const a = m[1].split(',')
      console.log(m[1])
      console.log(a)
    } else {
      state.file.splice(m[0], 1, m[1]);
    }
    // console.log(m[1])
  },
  EDIT_SAVE_FILE(state, m) {
    state.file.splice(m[0], 1, m[1]);
  },
  EDIT_LOAD_FILES() {
    const files = fs.readdirSync(global.hitbdata.path.user).filter(x => x.endsWith('.cda'))
    state.files = files;
  },
  EDIT_LOAD_FILE(state, message) {
    state.file = message;
  },
  EDIT_NEW_FILES(state) {
    console.log(state)
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
    state.doc = x;
    // console.log(state.doc)
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
  EDIT_SERVER_FILES(state, message) {
    // todo: 从服务器接口获取文档列表
    // const files = []
    state.files = message;
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
  EDIT_SET_HINT_PAGE(state, page) {
    if (page === 'up') {
      state.hintPage += 1
    } else if (page === '0') {
      state.hintPage = state.hintPage
    } else {
      state.hintPage -= 1
    }
  },
  EDIT_CONCAT_BAR_VALUE(state, value) {
    const v = state.editBarValue.split(' ')
    if (state.editBarValue[state.editBarValue.length - 1] === ' ') {
      if (value !== undefined) {
        v.push(value)
        state.editBarValue = v.join(' ')
      }
    } else if (value !== undefined) {
      v.splice(v.length - 1, 1, value)
      state.editBarValue = v.join(' ')
    }
  },
  EDIT_SET_BAR_VALUE(state, value) {
    console.log(value)
    state.editBarValue = value
  },
  EDIT_SET_HINT_TYPE(state, value) {
    state.hintType = value
  },
  EDIT_SET_HINT(state, value) {
    state.hint = value
  },
  EDIT_SET_HELP_TYPE(state, value) {
    state.helpType = value
  },
  EDIT_SET_SERVER_TYPE(state, value) {
    state.serverType = value
  },
  EDIT_SET_DOC_TYPE(state, value) {
    state.docType = value
  },
  EDIT_SEARCH_DOC_INDEX(state, m) {
    state.docIndex = m;
  },
  EDIT_SET_COL(state, index) {
    // state.selectedCol.splice(0, 1, index)
    const x = state.selectedCol.indexOf(index)
    if (x === -1) {
      state.selectedCol.splice(0, 1, index)
    } else {
      state.selectedCol.splice(x, 1)
    }
  },
  EDIT_SET_SELECTED_TYPE(state, type) {
    state.selectedType = type;
  },
  EDIT_UPDATE_FILE(state, value) {
    // state.file = type;
    console.log(state.file)
    console.log(value)
    state.file.map((x, key) => {
      if (key > 0) {
        x.splice(value[0], 1, value[1])
      }
      return x
    })
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
    commit('EDIT_DELETE_DOC');
    commit('EDIT_DELETE_FILE');
    commit('EDIT_ADD_DOC');
    commit('EDIT_ADD_FILE');
    commit('EDIT_SAVE_DOC');
    commit('EDIT_SAVE_FILE');
    commit('EDIT_SET_FILE_TYPE');
    commit('EDIT_NEW_FILES');
    commit('EDIT_SET_HINT_PAGE');
    commit('EDIT_SET_BAR_VALUE');
    commit('EDIT_CONCAT_BAR_VALUE');
    commit('EDIT_SET_HINT_TYPE');
    commit('EDIT_SET_HINT');
    commit('EDIT_SET_HELP_TYPE');
    commit('EDIT_SET_SERVER_TYPE');
    commit('EDIT_SET_DOC_TYPE');
    commit('EDIT_SEARCH_DOC_INDEX');
    commit('EDIT_SET_COL');
    commit('EDIT_SET_SELECTED_TYPE');
    commit('EDIT_UPDATE_FILE');
  },
};

export default {
  state,
  mutations,
  actions,
};
