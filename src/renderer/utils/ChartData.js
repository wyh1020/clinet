// (数据, 行集合)
export default function chartData(table, xid = [], yid = []) {
  const xArr = []
  let yArr = ['org', 'time']
  const stat = []
  // 按照逗号切分并取得表头
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
  const th = table[0]
  if (th.includes('stat_type')) {
    th.splice(th.indexOf('stat_type'), 1)
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
  // 去除可能因为选择了列而产生的行0位选择
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
  return stat
}
