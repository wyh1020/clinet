const axios = require('axios');
// const qs = require('qs');
export default function getStatFiles(obj, data) {
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/stat/stat_file/`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      obj.$store.commit('STAT_SERVER_FILES', res.data)
      obj.$store.commit('STAT_SET_TABLE_TYPE', 'server');
    } else {
      obj.$store.commit('STAT_SERVER_FILES', [])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('STAT_SERVER_FILES', [])
  })
}

export function getStat(obj, data) {
  const file = data[2].split('_')
  let pageType = data[2]
  if (['总数', '平均', '占比'].includes(file[file.length - 1])) {
    pageType = ''
  }
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/stat/stat_client?page_type=${pageType}&rows=20`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      obj.$store.commit('SET_NOTICE', '读取远程文件成功')
      obj.$store.commit('STAT_SET_SERVER_TABLE', res.data.stat)
    } else {
      obj.$store.commit('STAT_SERVER_FILES', [])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('STAT_SERVER_FILES', [])
  })
}
