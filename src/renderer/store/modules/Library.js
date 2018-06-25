const fs = require('fs');

const state = {
  files: [],
  file: [],
  table: [],
  tableSel: [],
  localTables: [],
  localTable: [],
  tablePage: 1,
  countPage: 0,
  leftPanel: 'file',
  dimension: [],
  dimensionType: null,
  dimensionOrg: [],
  dimensionTime: [],
  dimensionVersion: [],
  field: '',
  fieldIndex: [],
  tableHeader: [],
  fileIndex: null,
  tableType: 'local',
  serverTable: { page: 1, countPage: 0, data: [], pageList: [], tableName: '' },
  dimensionSearch: { time: 0, version: 0, org: 0 },
  rowHeight: null,
  dimensionServer: '',
  title: [],
  fileTypes: ['本地', '远程', '区块链']
};

const mutations = {
  LIBRARY_LOAD_FILES() {
    state.files = fs.readdirSync(global.hitbdata.path.library).filter(x => x.endsWith('.csv'))
  },
  LIBRARY_LOAD_FILE(state, message) {
    state.file = message;
    state.table = message.map(x => x.split(','))
    state.tableHeader = state.table.slice(0, 1)
    state.tableSel = state.table
    state.tableSel.splice(0, 1)
    const time = state.dimensionSearch.time = state.tableHeader[0].indexOf('year')
    const version = state.dimensionSearch.version = state.tableHeader[0].indexOf('version')
    const org = state.dimensionSearch.org = state.tableHeader[0].indexOf('org')
    state.dimensionOrg = [...new Set(state.table.map(a => a[org]))]
    state.dimensionTime = [...new Set(state.table.map(a => a[time]))]
    state.dimensionVersion = [...new Set(state.table.map(a => a[version]))]
    state.notice = [
      `术语总数：${state.tableSel.length - 1}`,
      `机构总数：${state.dimensionOrg.length - 1}`,
      `时间维度总数：${state.dimensionTime.length - 1}`,
      `版本维度总数：${state.dimensionVersion.length - 1}`,
    ]
    state.tablePage = 1;
    const page = Math.ceil(state.tableSel.length / 35)
    state.countPage = page
    for (let i = 1; i <= page; i += 1) {
      const f = []
      f.push(state.tableHeader[0])
      for (let j = 1; j <= 35; j += 1) {
        f.push(state.tableSel[(i) * j])
      }
      state.localTables[i] = f
    }
    state.localTable = state.localTables[state.tablePage]
  },
  LIBRARY_SERVER_FILES(state, opt) {
    state.files = opt.data;
  },
  LIBRARY_TABLE_PAGE(state, m) {
    if (m[1]) {
      state.tablePage = 1;
    } else {
      state.tablePage += m[0];
    }
    const page = Math.ceil(state.tableSel.length / 35)
    if (state.tablePage > page && state.tableType !== 'server') {
      state.tablePage = page
    } else if (state.tablePage < 1) {
      state.tablePage = 1
    }
    // .slice(1)
    state.localTable = state.localTables[state.tablePage]
  },
  LIBRARY_SET_TABLE_PAGE(state, page) {
    state.tablePage = page;
  },
  LIBRARY_SET_SERVER_DIMENSION(state, index) {
    state.dimensionServer = index
  },
  LIBRARY_SET_LEFT_PANEL(state, opt) {
    if (state.tableType === 'local') {
      state.leftPanel = opt[0];
      state.dimensionType = opt[1];
      switch (opt[1]) {
        case 'org':
          state.dimension = state.dimensionOrg
          break;
        case 'year':
          state.dimension = state.dimensionTime
          break;
        case 'version':
          state.dimension = state.dimensionVersion
          break;
        default:
          break;
      }
    } else {
      state.leftPanel = opt[0];
      state.dimensionType = opt[1];
      state.dimension = opt[2];
    }
  },
  LIBRARY_SET_DIMENSION(state, opt) {
    switch (opt[0]) {
      case 'org':
        // state.dimensionOrg.push(opt[1])
        // console.log(opt)
        state.tableSel = state.table.filter(x => x[0] === opt[1])
        break;
      case 'year':
        state.tableSel = state.table.filter(x => x[state.dimensionSearch.time] === opt[1])
        break;
      case 'version':
        // console.log(opt)
        // state.dimensionDrg.push(opt[1])
        state.tableSel = state.table.filter(x => x[state.dimensionSearch.version] === opt[1])
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
    const page = Math.ceil(state.tableSel.length / 35)
    state.countPage = page
    for (let i = 1; i <= page; i += 1) {
      const f = []
      f.push(state.tableHeader[0])
      for (let j = 1; j <= 35; j += 1) {
        f.push(state.tableSel[(i) * j])
      }
      state.localTables[i] = f
    }
    state.tablePage = 1
    state.localTable = state.localTables[state.tablePage].slice(1)
  },
  LIBRARY_GET_FIELD(state, field) {
    state.field = field;
  },
  LIBRARY_GET_FIELD_INDEX(state, index) {
    if (state.fieldIndex.includes(index)) {
      state.fieldIndex.splice(state.fieldIndex.findIndex(v => v === index), 1)
    } else {
      state.fieldIndex = [...state.fieldIndex, index]
    }
  },
  LIBRARY_SET_FILE_INDEX(state, index) {
    state.fileIndex = index;
  },
  LIBRARY_SET_TABLE_TYPE(state, index) {
    state.tableType = index;
  },
  LIBRARY_SET_SERVER_TABLE(state, opt) {
    state.serverTable = opt
  },
  LIBRARY_GET_SEARCH_TABLE(state, data) {
    state.localTables = {}
    const a = state.tableSel.filter(n => n.includes(data));
    const page = Math.ceil(a.length / 35)
    state.countPage = page
    for (let i = 1; i < page; i += 1) {
      const f = []
      f.push(state.tableHeader[0])
      for (let j = 1; j <= 35; j += 1) {
        f.push(a[(i) * j])
      }
      state.localTables[i] = f
    }
    state.localTable = state.localTables[state.tablePage].slice(1)
  },
  LIBRARY_GET_ROW(state, data) {
    state.rowHeight = data
  },
  LIBRARY_SET_COUNT_PAGE(state, n) {
    state.countPage = n
  },
  LIBRARY_SET_FILE_TYPES(state, value) {
    state.fileTypes = value
  },
  // LIBRARY_SET_SERVER_TABLE_TITLE(state, n) {
  //   state.title = []
  // }
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
    commit('LIBRARY_SET_FILE_INDEX');
    commit('LIBRARY_SET_TABLE_TYPE');
    commit('LIBRARY_GET_SEARCH_TABLE');
    commit('LIBRARY_GET_ROW');
    commit('LIBRARY_SET_TABLE_PAGE');
    commit('LIBRARY_SET_SERVER_DIMENSION');
    commit('LIBRARY_SET_COUNT_PAGE');
    commit('LIBRARY_SET_SERVER_TABLE_TITLE');
    commit('LIBRARY_SET_FILE_TYPES');
  },
};

export default {
  state,
  mutations,
  actions,
};
