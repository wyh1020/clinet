const axios = require('axios');
// const qs = require('qs');
export function getLibraryFiles(obj, data) {
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/library/rule_file/`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      obj.$store.commit('LIBRARY_SERVER_FILES', res.data)
      obj.$store.commit('LIBRARY_SET_TABLE_TYPE', 'server');
    } else {
      obj.$store.commit('LIBRARY_SERVER_FILES', [])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('LIBRARY_SERVER_FILES', [])
  })
}

export function getLibrary(obj, data) {
  // 去除文件名中的.csv
  const type = data[2].split('.csv')[0]
  const pageNum = data[3]
  let url = ''
  if (data[4] !== '') {
    url = `&${data[4]}=${data[5]}`
  }
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/library/rule_client?rows=30&tab_type=${type}&page=${pageNum}${url}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    console.log(res.data);
    if (res.status === 200) {
      obj.$store.commit('LIBRARY_SET_TABLE_PAGE', pageNum)
      obj.$store.commit('LIBRARY_SET_SERVER_TABLE', res.data)
    } else {
      obj.$store.commit('LIBRARY_SET_SERVER_TABLE', {})
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('LIBRARY_SET_SERVER_TABLE', {})
  })
}

export function getList(obj, url, tableName, type, username) {
  let file = tableName
  // 去除文件名中的.csv
  file = tableName.split('.csv')[0]
  axios({
    method: 'get',
    url: `http://${url[0]}:${url[1]}/library/rule_client?tab_type=${file}&type=${type}&username=${username}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      obj.$store.commit('LIBRARY_SET_LEFT_PANEL', ['dimension', type, res.data.list])
    } else {
      obj.$store.commit('LIBRARY_SET_LEFT_PANEL', ['dimension', type, []])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('LIBRARY_SET_LEFT_PANEL', ['dimension', type, []])
  })
}
