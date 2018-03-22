const axios = require('axios');
const qs = require('qs');
export function getStatFiles(obj, data, filename, username) {
  let url = ''
  if (filename !== '') {
    url = `http://${data[0]}:${data[1]}/stat/stat_file?name=${filename}&username=${username}`
  } else {
    url = `http://${data[0]}:${data[1]}/stat/stat_file?username=${username}`
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

export function getList(obj, url, tableName, type, username) {
  switch (type) {
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
  let file = tableName
  // 去除文件名中的.csv
  file = tableName.split('.csv')[0]
  axios({
    method: 'get',
    url: `http://${url[0]}:${url[1]}/stat/stat_client?type=${type}&username=${username}&page_type=${file}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      obj.$store.commit('STAT_SET_LEFT_PANEL', ['dimension', type, res.data.list])
    } else {
      obj.$store.commit('STAT_SET_LEFT_PANEL', ['dimension', type, []])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('STAT_SET_LEFT_PANEL', ['dimension', type, []])
  })
}

export function getStat(obj, data, opt) {
  let file = opt.tableName
  obj.$store.commit('STAT_TABLE_NAME', file)
  // 去除文件名中的.csv
  file = file.split('.csv')[0]
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
  const pageNum = opt.page + 1
  let url = ''
  switch (opt.type) {
    case '机构':
      url = `&org=${opt.value}`
      break;
    case '时间':
      url = `&time=${data[6]}`
      break;
    case '病种':
      url = `&drg2=${data[6]}`
      break;
    default:
      url = `&${opt.type}=${opt.value}`
      break;
  }
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/stat/stat_client?page=${pageNum}&page_type=${pageType}&tool_type=${toolType}&rows=20&username=${opt.username}${url}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      obj.$store.commit('SET_NOTICE', `当前${pageNum}页,共${res.data.count}页`)
      obj.$store.commit('STAT_SET_SERVER_TABLE', [res.data.stat, res.data.count])
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
