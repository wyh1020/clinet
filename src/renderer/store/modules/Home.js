const state = {
  notice: '',
};

const mutations = {
  SET(state, notice) {
    state.notice = notice;
  },
  DEL(state) {
    state.notice = '';
  },
};

const actions = {
  someAsyncTask({ commit }) {
    // do something async
    commit('SET');
    commit('DEL');
  },
};

export default {
  state,
  mutations,
  actions,
};
