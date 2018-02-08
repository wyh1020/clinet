const fs = require('fs');
const path = require('path');
const basePath = path.format({ dir: 'C:\\hitbdata\\user' });

const state = {
  files: [],
  file: [],
  doc: [],
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
    const files = fs.readdirSync(basePath).filter(x => x.endsWith('.csv'))
    state.files = files;
  },
  EDIT_LOAD_FILE(state, message) {
    state.file = message;
  },
};

const actions = {
  someAsyncTask({ commit }) {
    commit('PUSH_DOC');
    commit('EDIT_LOAD_FILES');
    commit('EDIT_LOAD_FILE');
  },
};

export default {
  state,
  mutations,
  actions,
};
