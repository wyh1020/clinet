const state = {
  // 底部通知栏内容
  notice: '未注册用户可以直接登陆！使用单机版功能！用户注册可以选择远程服务或者区块链服务！',
  // 顶部导航栏选择
  navbar: '',
  // 页面工具栏选择
  toolbar: '',
  // 初始化数据加载状态
  hasData: false
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
  HAS_DATA(state) {
    state.hasData = true;
  },
};

const actions = {
  someAsyncTask({ commit }) {
    // do something async
    commit('SET_NOTICE');
    commit('DEL_NOTICE');
    commit('SET_NAVBAR');
    commit('SET_TOOLBAR');
    commit('HAS_DATA');
  },
};

export default {
  state,
  mutations,
  actions,
};
