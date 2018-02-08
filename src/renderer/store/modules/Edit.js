const state = {
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
