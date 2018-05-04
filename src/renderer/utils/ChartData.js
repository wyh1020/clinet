// (数据, 行集合)
export default function chartData(obj, table, xid = [], yid = []) {
  obj.$store.commit('STAT_SET_CHART_IS_SHOW', 'chart');
  const xArr = []
  let yArr = []
  const stat = []
  // 按照逗号切分并取得表头
  console.log(table)
  table = table.map((x) => {
    let y = []
    if (Array.isArray(x)) {
      y = x
    } else {
      y = x.split(',')
    }
    return y
  })
  // 取得表头
  if (table.length > 0) {
    const th = table[0].filter(x => x !== 'stat_type')
    if (th.includes('org') && th.includes('time')) {
      yArr = ['org', 'time']
    } else {
      yArr = ['机构', '时间']
    }
    const statObj = []
    // 转换为[obj, obj, ...]
    table.forEach((xs) => {
      const obj = {}
      xs.forEach((x, i) => {
        obj[th[i]] = x
      })
      statObj.push(obj)
    })
    // 列是否选择
    if (yid.length === 0) {
      yArr = th
    } else {
      yid.map(x => yArr.push(th[x]))
    }
    xid = xid.filter(t => t !== 0)
    // 去除可能因为选择了列而产生的行0位选择\
    if (xid.length === 0) {
      xid = [...Array(table.length)].map((v, k) => k)
    }
    xid = xid.filter(t => t !== 0)
    // 取出选中的行
    xid.map(x => xArr.push(statObj[x]))
    // 按照字段取得对应结果
    xArr.forEach((xs) => {
      const obj = {}
      yArr.forEach((y) => {
        obj[y] = xs[y]
      })
      stat.push(obj)
    })
    stat.forEach((xs, i) => {
      Object.keys(xs).forEach((x) => {
        if (xs[x] === '-' || xs[x] === '' || x === 'stat_type' || `${x}` === 'undefined') {
          delete xs[x]
        }
      })
      stat[i] = xs
    })
    obj.$store.commit('STAT_SET_CHART_DATA', stat)
  }
}
