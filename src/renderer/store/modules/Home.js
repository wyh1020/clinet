const state = {
  // 底部通知栏内容
  notice: '',
  // 顶部导航栏选择
  navbar: '',
  // 页面工具栏选择
  toolbar: ''
};

const mutations = {
  SET_NOTICE(state, notice) {
    state.notice = notice;
  },
  DEL_NOTICE(state) {
    state.notice = '';
  },
  SET_NAVBAR(state, navbar) {
    state.navbar = navbar;
  },
  SET_TOOLBAR(state, toolbar) {
    state.toolbar = toolbar;
  },
};

const actions = {
  someAsyncTask({ commit }) {
    // do something async
    commit('SET_NOTICE');
    commit('DEL_NOTICE');
    commit('SET_NAVBAR');
    commit('SET_TOOLBAR');
  },
};

export default {
  state,
  mutations,
  actions,
};
