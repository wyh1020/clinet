const fs = require('fs');

const state = {
  files: [],
  file: [],
  table: [],
  tableSel: [],
  tablePage: 0,
  leftPanel: 'file',
  dimension: [],
  dimensionType: null,
  dimensionOrg: [],
  dimensionTime: [],
  dimensionVersion: [],
  field: '',
  fieldIndex: null,
};

const mutations = {
  LIBRARY_LOAD_FILES() {
    const files = fs.readdirSync(global.hitbdata.path.library).filter(x => x.endsWith('.csv'))
    state.files = files;
  },
  LIBRARY_LOAD_FILE(state, message) {
    state.file = message;
    state.table = message.map(x => x.split(','))
    state.tableSel = state.table
    state.dimensionOrg = [...new Set(state.table.map(a => a[0]))]
    state.dimensionTime = [...new Set(state.table.map(a => a[1]))]
    state.dimensionVersion = [...new Set(state.table.map(a => a[2]))]
    state.notice = [
      `术语总数：${state.tableSel.length - 1}`,
      `机构总数：${state.dimensionOrg.length - 1}`,
      `时间维度总数：${state.dimensionTime.length - 1}`,
      `版本维度总数：${state.dimensionVersion.length - 1}`,
    ]
  },
  LIBRARY_SERVER_FILES() {
    const files = []
    state.files = files;
  },
  LIBRARY_TABLE_PAGE(state, m) {
    if (m[1]) {
      state.tablePage = 0;
    } else {
      state.tablePage += m[0];
    }
    if (state.tablePage < 0) { state.tablePage = 0 }
    const maxPage = Math.floor(state.file.length / 100)
    if (state.tablePage > maxPage) {
      state.tablePage = maxPage
    }
  },
  LIBRARY_SET_LEFT_PANEL(state, opt) {
    state.leftPanel = opt[0];
    state.dimensionType = opt[1];
    switch (opt[1]) {
      case '机构':
        state.dimension = state.dimensionOrg
        break;
      case '时间':
        state.dimension = state.dimensionTime
        break;
      case '版本':
        state.dimension = state.dimensionVersion
        break;
      default:
        break;
    }
  },
  LIBRARY_SET_DIMENSION(state, opt) {
    switch (opt[0]) {
      case '机构':
        // state.dimensionOrg.push(opt[1])
        // console.log(opt)
        state.tableSel = state.table.filter(x => x[0] === opt[1])
        break;
      case '时间':
        // console.log(opt)
        // state.dimensionTime.push(opt[1])
        state.tableSel = state.table.filter(x => x[1] === opt[1])
        break;
      case '版本':
        // console.log(opt)
        // state.dimensionDrg.push(opt[1])
        state.tableSel = state.table.filter(x => x[2] === opt[1])
        break;
      default:
        state.dimensionOrg = []
        state.dimensionTime = []
        state.dimensionVersion = []
        break;
    }
    state.notice = [
      `术语总数：${state.tableSel.length - 1}`
    ]
  },
  LIBRARY_GET_FIELD(state, field) {
    state.field = field;
  },
  LIBRARY_GET_FIELD_INDEX(state, index) {
    state.fieldIndex = index;
  },
};

const actions = {
  someAsyncTask({ commit }) {
    commit('LIBRARY_LOAD_FILES');
    commit('LIBRARY_LOAD_FILE');
    commit('LIBRARY_SERVER_FILES');
    commit('LIBRARY_TABLE_PAGE');
    commit('LIBRARY_SET_LEFT_PANEL');
    commit('LIBRARY_SET_DIMENSION');
    commit('LIBRARY_GET_FIELD');
    commit('LIBRARY_GET_FIELD_INDEX');
  },
};

export default {
  state,
  mutations,
  actions,
};
