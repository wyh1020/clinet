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
    fs.lstat(file, (err, stat) => {
      if (stat.isDirectory()) {
        console.log('目录不能导入，请选择文件')
      } else if (stat.size < 1000 * 5000) {
        const fRead = fs.createReadStream(file);
        const fReadline = readline.createInterface({ input: fRead });
        let i = 0
        fReadline.on('close', () => {
          console.log('readline close...');
        });
        fReadline.on('line', (line) => {
          i += 1
          console.log(line);
          console.log(i)
        })
        // fReadline.close()
      } else {
        console.log(stat.size)
        console.log('文件大于5M，无法导入，请拆成小文件')
      }
    })
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
