const axios = require('axios');
const qs = require('qs');
const ChartScatter = require('./ChartScatter');
const ChartRadar = require('./ChartRadar');
const ChartBar = require('./ChartBar');
const ChartLine = require('./ChartLine');
const ChartPie = require('./ChartPie');
const ChartData = require('./ChartData');
// this, [url, port], filename, username, serverType
export function getStatFiles(obj, data, filename, username, serverType = 'server') {
  obj.$store.commit('STAT_SET_TABLE_TYPE', serverType)
  let url = ''
  if (filename !== '') {
    url = `http://${data[0]}:${data[1]}/stat/stat_file?name=${filename}&username=${username}&server_type=${serverType}`
  } else {
    url = `http://${data[0]}:${data[1]}/stat/stat_file?username=${username}&server_type=${serverType}`
  }
  axios({
    method: 'get',
    url: url,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      // 菜单层级
      obj.$store.commit('STAT_SET_SERVER_MENU', [res.data.menu, res.data.data])
      // obj.$store.commit('STAT_SERVER_FILES', res.data)
    } else {
      obj.$store.commit('STAT_SERVER_FILES', [])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('STAT_SERVER_FILES', [])
  })
}

export function getList(obj, data, tableName, type, username, serverType = 'server') {
  obj.$store.commit('STAT_SET_TABLE_TYPE', serverType)
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
    url: `http://${data[0]}:${data[1]}/stat/stat_client?type=${type}&username=${username}&page_type=${file}&server_type=${serverType}`,
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

export function getStat(obj, data, opt, tableType, serverType = 'server') {
  obj.$store.commit('STAT_SET_TABLE_TYPE', serverType)
  let file = opt.tableName
  const tableName = file
  // 去除文件名中的.csv
  file = file.split('.csv')[0]
  // 切分查看是否有总数.平均.占比等工具查询
  let pageType = file
  file = file.split('_')
  let toolType = ''
  if (['总数', '平均', '占比'].includes(file[file.length - 1])) {
    pageType = file.splice(0, file.length - 1).join('_')
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
  let url = ''
  if (opt.type === '机构' || opt.type === 'org') {
    url = `&org=${opt.value}`
  } else if (opt.type === '时间' || opt.type === 'time') {
    url = `&time=${opt.value}`
  } else if (opt.type === '病种' || opt.type === 'drg' || opt.type === 'drg2') {
    url = `&drg=${opt.value}`
  }
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/stat/stat_client?page=${opt.page}&server_type=${serverType}&page_type=${pageType}&tool_type=${toolType}&rows=20&username=${opt.username}${url}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      const stat = res.data.stat
      // stat.splice(0, 1)
      obj.$store.commit('SET_NOTICE', `当前${opt.page}页,共${res.data.count}页`)
      const resObj = { page: parseInt(res.data.page, 10), countPage: res.data.count, data: stat, pageList: res.data.page_list, tableName: tableName, tableSel: res.data.num, dimensionOrg: res.data.org_num, dimensionTime: res.data.time_num, dimensionDrg: res.data.drg_num }
      obj.$store.commit('STAT_SET_COUNT_PAGE', res.data.count)
      obj.$store.commit('STAT_SET_SERVER_TABLE', resObj)
      if (tableType === 'edit') {
        obj.$store.commit('EDIT_LOAD_FILE', res.data.stat.filter(x => x !== undefined).map(x => x.join(',')))
      }
      ChartData.default(obj, res.data.stat, obj.$store.state.Stat.selectedRow, obj.$store.state.Stat.selectedCol)
      switch (obj.$store.state.Stat.chartLeft) {
        case '柱状图':
          ChartBar.default('chartLeft', obj.$store.state.Stat.chartData)
          break;
        case '折线图':
          ChartLine.default('chartLeft', obj.$store.state.Stat.chartData)
          break;
        case '雷达图':
          ChartRadar.default('chartLeft', obj.$store.state.Stat.chartData)
          break;
        case '散点图':
          ChartScatter.default('chartLeft', obj.$store.state.Stat.chartData)
          break;
        case '饼图':
          ChartPie.default('chartLeft', obj.$store.state.Stat.chartData)
          break;
        default: break;
      }
      switch (obj.$store.state.Stat.chartRight) {
        case '柱状图':
          ChartBar.default('chartRight', obj.$store.state.Stat.chartData)
          break;
        case '折线图':
          ChartLine.default('chartRight', obj.$store.state.Stat.chartData)
          break;
        case '雷达图':
          ChartRadar.default('chartRight', obj.$store.state.Stat.chartData)
          break;
        case '散点图':
          ChartScatter.default('chartRight', obj.$store.state.Stat.chartData)
          break;
        case '饼图':
          ChartPie.default('chartRight', obj.$store.state.Stat.chartData)
          break;
        default: break;
      }
    }
  }).catch((err) => {
    console.log(err);
  })
}

// 保存对比
export function saveStat(obj, compare, data, user = { username: '' }) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/stat/stat_create/`,
    data: qs.stringify({ data: JSON.stringify(compare), username: user.username }),
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

// 获取从stat得到的wt4数据
export function getStatWt4(obj, data, org, time, drg, serverType = 'server') {
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/library/stat_wt4?org=${org}&time=${time}&drg=${drg}&server_type=${serverType}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    const resObj = { page: parseInt(res.data.page, 10), countPage: res.data.count, data: res.data.wt4, pageList: res.data.page_list, tableName: '' }
    obj.$store.commit('STAT_SET_COUNT_PAGE', res.data.count)
    obj.$store.commit('STAT_SET_CASE_TABLE', resObj)
    obj.$store.commit('STAT_SET_TABLE_TYPE', 'case')
  }).catch((err) => {
    console.log(err)
    obj.$store.commit('SET_NOTICE', '保存对比失败!');
  })
  obj.$store.commit('STAT_SET_TABLE_TYPE', serverType)
}
