const axios = require('axios');
const qs = require('qs');
export function getEditFiles(obj, data) {
  let url = ''
  if (data[2] === 'user') {
    url = `http://${data[0]}:${data[1]}/edit/cda_user/`
  } else {
    url = `http://${data[0]}:${data[1]}/edit/cda_file?username=${data[3]}`
  }
  // const url = `http://${data[0]}:${data[1]}/edit/cda_file`
  axios({
    method: 'get',
    url: url,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      obj.$store.commit('EDIT_SERVER_FILES', res.data.cda)
      if (data[2] === 'user') {
        obj.$store.commit('EDIT_SET_SERVER_TYPE', 'file');
      } else {
        obj.$store.commit('EDIT_SET_SERVER_TYPE', 'show');
      }
      obj.$store.commit('SET_NOTICE', res.data.info);
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
  let url = ''
  if (data[5] === 'upload') {
    url = '&type=create'
  }
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/edit/cda?filename=${file[1]}&username=${file[0]}${url}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    //
    if (res.status === 200) {
      obj.$store.commit('EDIT_LOAD_FILE', res.data)
      obj.$store.commit('EDIT_LOAD_FILE', res.data.cda)
      obj.$store.commit('SET_NOTICE', res.data.info);
      obj.$store.commit('EDIT_SET_LEFT_PANEL', 'table')
    } else {
      obj.$store.commit('EDIT_LOAD_FILE', [])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('EDIT_LOAD_FILE', [])
  })
}

export function saveEdit(obj, data) {
  const fileName = data[2]
  const content = data[3]
  const username = data[4]
  // let url = ''
  // if (data[5] === 1) {
  const url = `http://${data[0]}:${data[1]}/edit/cda`
  // } else {
  //   url = `http://${data[0]}:${data[1]}/edit/create_cda`
  // }
  axios({
    method: 'post',
    url: url,
    data: qs.stringify({ file_name: fileName, content: content[0], username: username }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      if (res.data.success) {
        obj.$store.commit('SET_NOTICE', res.data.info)
      } else {
        obj.$store.commit('SET_NOTICE', res.data.info)
      }
    } else {
      obj.$store.commit('SET_NOTICE', '保存失败')
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SET_NOTICE', '保存失败')
  })
}
