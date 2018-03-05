let xArr = [];
let yArr = [];
// 加入对比方法(当前分析,行选中,列选中)(addContrast(this.$store.state.Stat.table, [], []))
export function addContrast(stat, xid, yid) {
  const th = stat[0]
  // 去除多余的行
  if (xArr.length === 0) {
    xArr.push(th);
  }
  // 选中行添加进对比
  xid.map(x => xArr.push(stat[x]));
  // 选中列对比
  yid.map(y => yArr.push(th.indexOf(y)));
  return true
}

// 清空对比
export function clearContrast() {
  xArr = [];
  yArr = [];
  return true
}

// 显示对比
export function showContrast() {
  const stat = []
  // 按照字段去除对应结果
  xArr.map(xs => stat.push(yArr.map(x => xs[x])))
  return stat
}
