const state = {
  doc: [1, 2, 3],
};

const mutations = {
  PUSH_DOC(state) {
    state.doc.push('1');
  },
  POP_DOC(state) {
    state.doc.pop('1');
  },
};

const actions = {
  someAsyncTask({ commit }) {
    // do something async
    commit('PUSH_DOC');
  },
};

export default {
  state,
  mutations,
  actions,
};
