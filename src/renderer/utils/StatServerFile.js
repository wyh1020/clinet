const axios = require('axios');
const qs = require('qs');
export function getStatFiles(obj, data) {
  let url = ''
  if (data[2]) {
    url = `http://${data[0]}:${data[1]}/stat/stat_file?name=${data[2]}&username=${data[3]}`
  } else {
    url = `http://${data[0]}:${data[1]}/stat/stat_file?username=${data[3]}`
  }
  axios({
    method: 'get',
    url: url,
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

export function getList(obj, data) {
  let type = ''
  switch (data[3]) {
    case '机构':
      type = 'org'
      break;
    case '时间':
      type = 'time'
      break;
    case '病种':
      type = 'drg2'
      break;
    default:
      break;
  }
  let file = data[2]
  // 去除文件名中的.csv
  file = data[2].split('.csv')[0]
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/stat/stat_client?type=${type}&username=${data[4]}&page_type=${file}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      obj.$store.commit('STAT_SET_LEFT_PANEL', [res.data.list[0][0], data[3]])
    } else {
      obj.$store.commit('STAT_SET_LEFT_PANEL', [[], data[3]])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('STAT_SET_LEFT_PANEL', [[], data[3]])
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
    url: `http://${data[0]}:${data[1]}/stat/stat_client?page=${pageNum}&page_type=${pageType}&tool_type=${toolType}&rows=20&username=${data[4]}`,
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

// 清空对比
export function saveStat(obj, compare, data) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/stat/stat_create/`,
    data: qs.stringify({ data: JSON.stringify(compare), username: data[2].username }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      if (res.data.success) {
        obj.$store.commit('SET_NOTICE', `保存对比     ${res.data.filename}     成功!`);
      } else {
        obj.$store.commit('SET_NOTICE', `保存对比     ${res.data.filename}     失败,文件已经存在!`);
      }
    } else {
      obj.$store.commit('SET_NOTICE', '保存对比失败!');
    }
  }).catch((err) => {
    console.log(err)
    obj.$store.commit('SET_NOTICE', '保存对比失败!');
  })
}
