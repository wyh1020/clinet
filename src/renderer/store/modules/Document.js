const state = {
  doc: [1, 2, 3],
};

const mutations = {
  DECREMENT_MAIN_COUNTER(state) {
    state.doc.pop('1');
  },
  INCREMENT_MAIN_COUNTER(state) {
    state.doc.push('1');
  },
};

const actions = {
  someAsyncTask({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER');
  },
};

export default {
  state,
  mutations,
  actions,
};
