const axios = require('axios');
// const qs = require('qs');
export function getStatFiles(obj, data) {
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
  let file = data[2]
  // 去除文件名中的.csv
  file = data[2].split('.csv')[0]
  // 切分查看是否有总数.平均.占比等工具查询
  let pageType = file
  file = file.split('_')
  let toolType = ''
  if (['总数', '平均', '占比'].includes(file[file.length - 1])) {
    pageType = ''
    switch (file[file.length - 1]) {
      case '总数':
        toolType = 'total'
        break;
      case '平均':
        toolType = 'avg'
        break;
      case '占比':
        toolType = 'rate'
        break;
      default:
        break;
    }
  }
  const pageNum = data[3] + 1
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/stat/stat_client?page=${pageNum}&page_type=${pageType}&tool_type=${toolType}&rows=20`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      obj.$store.commit('SET_NOTICE', `当前${pageNum}页`)
      obj.$store.commit('STAT_SET_SERVER_TABLE', res.data.stat)
    } else {
      obj.$store.commit('STAT_SET_SERVER_TABLE', [])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('STAT_SET_SERVER_TABLE', [])
  })
}
