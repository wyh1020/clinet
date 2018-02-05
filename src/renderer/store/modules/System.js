const fs = require('fs')
const path = require('path');
const readline = require('readline');

const state = {
  paths: [],
  file: [],
};

const mutations = {
  GET_PATH(state, paths) {
    console.log(paths)
    state.paths = paths;
  },
  GET_FILE(state, path1) {
    // console.log(path1)
    const file = path.format({
      dir: 'C:\\hitbdata\\',
      base: path1
    });
    const stat = fs.lstatSync(file);
    if (stat.isDirectory()) {
      console.log('目录不能导入，请选择文件')
    } else {
      const fRead = fs.createReadStream(file);
      const fReadline = readline.createInterface({ input: fRead });
      let i = 0
      fReadline.on('line', (line) => {
        i += 1
        console.log(line);
        console.log(i)
        if (i > 10) { fReadline.close() }
      })
      // todo:
    }
  }
};

const actions = {
  someAsyncTask({ commit }) {
    // do something async
    commit('GET_PATH');
    commit('GET_FILE');
  },
};

export default {
  state,
  mutations,
  actions,
};
