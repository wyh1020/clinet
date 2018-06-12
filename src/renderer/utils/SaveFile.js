const fs = require('fs')
const path = require('path');
export default function saveFile(obj, x, p) {
  // console.log(x)
  let dir = global.hitbdata.path.home
  switch (p) {
    case '/edit':
      dir = global.hitbdata.path.user
      break
    case '/stat':
      dir = global.hitbdata.path.stat
      break
    case '/library':
      dir = global.hitbdata.path.library
      break
    case '/system':
      dir = global.hitbdata.path.system
      break
    default: break
  }
  if (x && x.endsWith('.csv')) {
    const fileName = path.format({
      dir: dir,
      base: x
    });
    // const data = obj.$store.state.Edit.file.map(x => x.join(',')).join('\n')
    const data = obj.$store.state.Edit.file.join('\n')
    fs.writeFile(fileName, data, (err) => {
      if (!err) {
        obj.$store.commit('SET_NOTICE', '文件保存成功！')
      }
    })
  } else if (x && x.endsWith('.cda')) {
    const fileName = path.format({
      dir: global.hitbdata.path.user,
      base: x
    });
    // const data = obj.$store.state.Edit.file.map(x => `${x},\n`).toString()
    let data = []
    const a = typeof p
    if (a === 'string') {
      data = obj.$store.state.Edit.file.join('\n')
    } else {
      data = p.join('\n')
    }
    // // const data = p.join(',\n')
    // console.log(obj.$store.state.Edit.file);
    // console.log(p);
    fs.writeFile(fileName, data, (err) => {
      if (!err) {
        obj.$store.commit('SET_NOTICE', `文件成功保存到《${fileName}》！`)
      }
    })
  } else {
    obj.$store.commit('SET_NOTICE', '请先打开一个本地或者远程的CDA文件！');
    // console.log(x)
    // const fileName = path.format({
    //   dir: dir,
    //   base: `${x}.cda`
    // });
    // // console.log(fileName)
    // if (fs.existsSync(fileName)) {
    //   console.log('今日的CDA文件已经存在！')
    //   obj.$store.commit('SET_NOTICE', '今日的CDA文件已经存在！');
    //   obj.$store.commit('EDIT_SET_FILES_INDEX', 0);
    // } else {
    //   fs.writeFile(fileName, '', (err) => {
    //     if (err) {
    //       console.log(err)
    //     } else {
    //       obj.$store.commit('SET_NOTICE', '今日的CDA文件新建成功！');
    //       obj.$store.commit('EDIT_LOAD_FILES');
    //       obj.$store.commit('EDIT_SET_FILES_INDEX', 0);
    //     }
    //   })
    // }
  }
}
