// (数据, 行集合)
export default function chartData(table, xid = [], yid = []) {
  const xArr = []
  let yArr = ['org', 'time']
  const stat = []
  // 按照逗号切分并取得表头
  table = table.map(x => x.split(','))
  const th = table[0]
  // 列是否选择
  if (yid.length === 0) {
    yArr = []
    th.forEach((v, i) => {
      yArr.push(i)
    })
  } else {
    yid.map(x => yArr.push(x))
  }
  // 去除多余的行
  if (xArr.length === 0) {
    xArr.push(th);
  }
  // 选中行添加
  xid.map(x => xArr.push(table[x]))
  // 按照字段去除对应结果
  xArr.map(xs => stat.push(yArr.map(x => xs[x])))
  return stat
}
