// (数据, 行集合)
export default function chartData(table, xid = [1, 2, 3], yid = ['org', 'time', 'hsjc_rate', 'hszl_rate']) {
  const xArr = []
  const yArr = []
  const stat = []
  // 按照逗号切分并取得表头
  table = table.map(x => x.split(','))
  const th = table[0]
  // 去除多余的行
  if (xArr.length === 0) {
    xArr.push(th);
  }
  // 选中行添加
  xid.map(x => xArr.push(table[x]))
  // 选中列对比
  yid.map(y => yArr.push(th.indexOf(y)))
  // 按照字段去除对应结果
  xArr.map(xs => stat.push(yArr.map(x => xs[x])))
  return stat
}
