const state = {
  notice: '',
};

const mutations = {
  SET_NOTICE(state, notice) {
    state.notice = notice;
  },
  DEL_NOTICE(state) {
    state.notice = '';
  },
};

const actions = {
  someAsyncTask({ commit }) {
    // do something async
    commit('SET_NOTICE');
    commit('DEL_NOTICE');
  },
};

export default {
  state,
  mutations,
  actions,
};
