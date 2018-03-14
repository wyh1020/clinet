const axios = require('axios');
// const qs = require('qs');
export function getEditFiles(obj, data) {
  let url = ''
  if (data[2] === 'user') {
    url = `http://${data[0]}:${data[1]}/edit/cda_user/`
  } else {
    url = `http://${data[0]}:${data[1]}/edit/cda_file?username=${data[3]}`
  }
  axios({
    method: 'get',
    url: url,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      obj.$store.commit('EDIT_SERVER_FILES', res.data)
      if (data[2] === 'user') {
        obj.$store.commit('EDIT_SET_SERVER_TYPE', 'file');
      } else {
        obj.$store.commit('EDIT_SET_SERVER_TYPE', 'show');
      }
    } else {
      obj.$store.commit('EDIT_SERVER_FILES', [])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('EDIT_SERVER_FILES', [])
  })
}

export function getEdit(obj, data) {
  // 去除文件名中的.csv
  const file = data[2].split('-')
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/edit/cda?filename=${file[1]}&username=${file[0]}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    //
    if (res.status === 200) {
      obj.$store.commit('SET_NOTICE', '读取远程文件成功')
      obj.$store.commit('EDIT_LOAD_FILE', res.data)
    } else {
      obj.$store.commit('EDIT_LOAD_FILE', [])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('EDIT_LOAD_FILE', [])
  })
}
