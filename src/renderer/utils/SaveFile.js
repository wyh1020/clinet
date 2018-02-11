const fs = require('fs')
const path = require('path');
export default function saveFile(obj, x, p) {
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
    default: break
  }
  if (x.endsWith('.csv')) {
    const fileName = path.format({
      dir: dir,
      base: x
    });
    const data = obj.$store.state.Edit.file.map(x => `${x},\n`).toString()
    console.log(data)
    console.log(fileName)
    fs.writeFile(fileName, data, (err) => {
      console.log(err)
    })
  } if (x.endsWith('.cda')) {
    const fileName = path.format({
      dir: global.hitbdata.path.user,
      base: x
    });
    const data = obj.$store.state.Edit.file.map(x => `${x},\n`).toString()
    fs.writeFile(fileName, data, (err) => {
      console.log(err)
    })
  } else {
    // obj.$store.commit('SET_NOTICE', '选择的不是CSV文件，不能导入！');
  }
}
