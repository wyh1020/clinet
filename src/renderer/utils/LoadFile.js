const fs = require('fs')
const path = require('path');
const readline = require('readline');
export default function loadFile(obj, x, p, e = null) {
  let dir = global.hitbdata.path.home
  switch (p) {
    case 'user':
      dir = global.hitbdata.path.user
      break
    case 'stat':
      dir = global.hitbdata.path.stat
      break
    case 'library':
      dir = global.hitbdata.path.library
      break
    case 'system':
      dir = global.hitbdata.path.system
      break
    case 'system-home':
      dir = global.hitbdata.path.home
      break
    case 'block':
      dir = global.hitbdata.path.system
      break
    default: break
  }
  if (x.endsWith('.csv')) {
    const file = path.format({
      dir: dir,
      base: x
    });
    fs.lstat(file, (err, stat) => {
      if (stat.isDirectory()) {
        obj.$store.commit('SET_NOTICE', '目录不能导入，请选择文件！');
      } else if (stat.size < 1000 * 5000) {
        obj.$store.commit('SET_NOTICE', '正在读取文件，请等待！');
        const fRead = fs.createReadStream(file);
        const fReadline = readline.createInterface({ input: fRead });
        const f = [];
        fReadline.on('close', () => {
          // console.log(f);
          switch (p) {
            case 'user':
              obj.$store.commit('EDIT_LOAD_FILE', f);
              obj.$store.commit('EDIT_SET_LEFT_PANEL', 'table')
              break
            case 'stat':
              if (e) {
                obj.$store.commit('EDIT_LOAD_FILE', f);
                obj.$store.commit('EDIT_SET_LEFT_PANEL', 'table')
              } else {
                obj.$store.commit('STAT_LOAD_FILE', f);
              }
              break
            case 'library':
              if (e) {
                obj.$store.commit('EDIT_LOAD_FILE', f);
                obj.$store.commit('EDIT_SET_LEFT_PANEL', 'table')
              } else {
                obj.$store.commit('LIBRARY_LOAD_FILE', f);
              }
              break
            case 'system':
              if (e) {
                obj.$store.commit('EDIT_LOAD_FILE', f);
                obj.$store.commit('EDIT_SET_LEFT_PANEL', 'table')
              } else {
                obj.$store.commit('SYSTEM_LOAD_FILE', f);
              }
              break
            case 'system-home':
              if (e) {
                obj.$store.commit('EDIT_LOAD_FILE', f);
                obj.$store.commit('EDIT_SET_LEFT_PANEL', 'table')
              } else {
                obj.$store.commit('SYSTEM_LOAD_FILE', f);
              }
              break
            case 'block':
              if (e) {
                obj.$store.commit('EDIT_LOAD_FILE', f);
                obj.$store.commit('EDIT_SET_LEFT_PANEL', 'table')
              } else {
                obj.$store.commit('BLOCK_LOAD_FILE', f);
              }
              break
            default: break
          }
          obj.$store.commit('EDIT_SET_FILE_TYPE', 'csv')
          obj.$store.commit('SET_NOTICE', 'CSV文件读取成功！');
        });
        fReadline.on('line', (line) => {
          f.push(line)
        })
      } else {
        obj.$store.commit('SET_NOTICE', '文件大于5M，无法导入，请拆成小文件！');
      }
    })
  } if (x.endsWith('.cda')) {
    const file = path.format({
      dir: global.hitbdata.path.user,
      base: x
    });
    fs.lstat(file, (err, stat) => {
      if (stat.isDirectory()) {
        obj.$store.commit('SET_NOTICE', '目录不能导入，请选择文件！');
      } else if (stat.size < 1000 * 5000) {
        obj.$store.commit('SET_NOTICE', '正在读取文件，请等待！');
        const fRead = fs.createReadStream(file);
        const fReadline = readline.createInterface({ input: fRead });
        const f = [];
        fReadline.on('close', () => {
          // console.log(f);
          obj.$store.commit('EDIT_LOAD_FILE', f);
          obj.$store.commit('EDIT_SET_LEFT_PANEL', 'table')
          obj.$store.commit('EDIT_SET_FILE_TYPE', 'cda')
          obj.$store.commit('SET_NOTICE', 'CDA文件读取成功！');
        });
        fReadline.on('line', (line) => {
          f.push(line)
        })
      } else {
        obj.$store.commit('SET_NOTICE', '文件大于5M，无法导入，请拆成小文件！');
      }
    })
  } else {
    obj.$store.commit('SET_NOTICE', '选择的不是CSV文件，不能导入！');
  }
}
