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
  if (x && x.endsWith('.csv')) {
    const fileName = path.format({
      dir: dir,
      base: x
    });
    const data = obj.$store.state.Edit.file.map(x => `${x},\n`).toString()
    // console.log(data)
    console.log(fileName)
    fs.writeFile(fileName, data, (err) => {
      console.log(err)
    })
  } else if (x && x.endsWith('.cda')) {
    const fileName = path.format({
      dir: global.hitbdata.path.user,
      base: x
    });
    const data = obj.$store.state.Edit.file.map(x => `${x},\n`).toString()
    fs.writeFile(fileName, data, (err) => {
      console.log(err)
    })
  } else {
    const fileName = path.format({
      dir: dir,
      base: `${x}.cda`
    });
    if (fs.existsSync(fileName)) {
      console.log('今日的CDA文件已经存在！')
      obj.$store.commit('SET_NOTICE', '今日的CDA文件已经存在！');
    } else {
      fs.writeFile(fileName, '', (err) => {
        if (err) {
          console.log(err)
        } else {
          obj.$store.commit('SET_NOTICE', '今日的CDA文件新建成功！');
        }
      })
    }
  }
}
