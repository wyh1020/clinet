const state = {
  // 页面工具栏选择
  toolbar: '',
  // 选择目录下的CSV文件列表
  files: [],
  // 选择要导入的CSV文件
  file: [],
  // 系统内置的table列表
  tables: [],
  // 选择要处理的table
  table: [],
  // 选择要处理的field
  field: [],
  fieldIndex: null,
  server: '',
  port: '',
  peers: [],
  funs: [],
  account: { address: '' },
  myTrans: [],
  myTransUn: [],
  trans: [],
  transUn: [],
  blockInfo: {},
  pege: 0,
  blockPage: 0,
  blockChain: {},
  blockBlock: { data: { blocks: [] } },
  publicKeys: [],
  blockShare: []
};

const mutations = {
  BLOCK_SET_TOOLBAR(state, toolbar) {
    state.toolbar = toolbar;
  },
  BLOCK_SET_PEERS(state, peers) {
    state.peers = peers;
  },
  BLOCK_GET_BLOCK_INFO(state, peers) {
    state.blockInfo = peers;
  },
  BLOCK_SET_FUNS(state, funs) {
    state.funs = funs;
  },
  BLOCK_SET_SERVER(state, m) {
    // console.log(m)
    state.server = m[0];
    state.port = m[1];
  },
  BLOCK_SET_ACCOUNT(state, account) {
    state.account = account;
  },
  BLOCK_SET_MYTRANS(state, myTrans) {
    state.myTrans = myTrans;
  },
  BLOCK_SET_MYTRANSUN(state, myTransUn) {
    state.myTransUn = myTransUn;
  },
  BLOCK_SET_TRANS(state, trans) {
    console.log(trans)
    state.trans = trans;
  },
  BLOCK_SET_TRANSUN(state, transUn) {
    console.log(transUn);
    state.transUn = transUn;
  },
  BLOCK_SET_SERVER_STATUS(state, m) {
    const a = state.file[m[0]]
    const b = a.split(',')
    b.splice(3, 1, m[1])
    state.file.splice(m[0], 1, b.join(','))
  },
  BLOCK_GET_FILES(state, files) {
    state.files = files;
  },
  BLOCK_LOAD_FILE(state, file) {
    state.file = file;
  },
  BLOCK_GET_TABLES(state, tables) {
    state.tables = tables;
  },
  BLOCK_GET_TABLE(state, table) {
    state.table = table;
  },
  BLOCK_GET_FIELD(state, field) {
    state.field = field;
  },
  BLOCK_GET_FIELD_INDEX(state, index) {
    state.fieldIndex = index;
  },
  BLOCK_SET_TABLE(state, field) {
    // console.log(field)
    // console.log(state.field)
    // console.log(state.fieldIndex)
    // console.log(state.table[state.fieldIndex])
    if (state.table[state.fieldIndex].length > 5) {
      state.table[state.fieldIndex].pop()
    }
    state.table[state.fieldIndex].push(field)
    state.table = state.table;
  },
  BLOCK_SET_PAGE(state, value) {
    switch (value) {
      case 'up':
        state.pege -= 1
        break;
      case 'down':
        state.pege += 1
        break;
      default:
    }
  },
  BLOCK_SET_BLOCKPAGE(state, value) {
    switch (value) {
      case 'up':
        state.blockPage -= 1
        break;
      case 'down':
        state.blockPage += 1
        break;
      default:
    }
  },
  BLOCK_SET_BLOCKCHAIN(state, value) {
    state.blockChain = value
  },
  BLOCK_SET_BLOCKBLOCK(state, value) {
    state.blockBlock = value
  },
  BLOCK_GET_PUBLICKEYS(state, value) {
    state.publicKeys = value
  },
  BLOCK_GET_SHARE(state, value) {
    state.blockShare = value
  },
};

const actions = {
  someAsyncTask({ commit }) {
    commit('BLOCK_SET_TOOLBAR');
    commit('BLOCK_GET_FILES');
    commit('BLOCK_LOAD_FILE');
    commit('BLOCK_GET_TABLES');
    commit('BLOCK_GET_TABLE');
    commit('BLOCK_GET_FIELD');
    commit('BLOCK_SET_TABLE');
    commit('BLOCK_SET_SERVER');
    commit('BLOCK_SET_SERVER_STATUS');
    commit('BLOCK_SET_PEERS');
    commit('BLOCK_SET_FUNS');
    commit('BLOCK_SET_ACCOUNT');
    commit('BLOCK_SET_TRANS');
    commit('BLOCK_SET_TRANSUN');
    commit('BLOCK_SET_MYTRANS');
    commit('BLOCK_SET_MYTRANSUN');
    commit('BLOCK_SET_PAGE');
    commit('BLOCK_SET_BLOCKPAGE');
    commit('BLOCK_SET_BLOCKCHAIN');
    commit('BLOCK_SET_BLOCKBLOCK');
    commit('BLOCK_GET_PUBLICKEYS');
    commit('BLOCK_GET_SHARE');
  },
};

export default {
  state,
  mutations,
  actions,
};
