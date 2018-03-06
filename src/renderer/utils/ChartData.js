// (数据, 行集合)
export default function chartData(table, xid = [], yid = []) {
  let xArr = []
  let yArr = [0, 1]
  const stat = []
  // 按照逗号切分并取得表头
  table = table.map(x => x.split(','))
  // table = table.map(x => x.pop)
  const th = table[0]
  th.pop()
  // 列是否选择
  if (yid.length === 0) {
    yArr = th.map((v, i) => i)
  } else {
    yid.map(x => yArr.push(x))
  }
  // 去除多余的行
  if (xArr.length === 0) {
    xArr.push(th)
  } else {
    xArr = []
  }
  // 删除第一行点击
  xid = xid.filter(t => t !== 0)
  // 选中行添加
  xid.map(x => xArr.push(table[x]))
  // 按照字段去除对应结果
  xArr.map(xs => stat.push(yArr.map(x => xs[x])))

  // console.log(stat);
  // console.log(stat[1]);
  // console.log('==============');
  return stat
}
