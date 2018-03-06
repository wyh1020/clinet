let xArr = []; // 行分析数据
let yArr = []; // 列index
// 加入对比方法(obj,当前分析,表头,列选中(index),行选中(index))
export default function addContrast(obj, table = null, th = [], yid = [], xid = []) {
  if (table) {
    th = th[0]
    // 当从未执行过加入对比时,将表头数据添加至对比行数据内
    if (xArr.length === 0) {
      xArr.push(th);
    }
    // 按照行index从table取得对应结果
    xid.map(x => xArr.push(table[x]));
    // 当没有选中列时,为全部列
    if (yid.length === 0) {
      yid = th
      // 对比列的index
      yid.map(y => yArr.push(th.indexOf(y)));
    } else {
      yArr = yid
    }
    const stat = []
    // 按照列index取得对应结果
    xArr.map(xs => stat.push(yArr.map(x => xs[x])))
    obj.$store.commit('STAT_SET_COMPARE_TABLE', stat)
  }
}

// 清空对比
export function clearContrast() {
  xArr = [];
  yArr = [];
  return true
}

// // 显示对比
// export function showContrast() {
//   const stat = []
//   // 按照字段去除对应结果
//   xArr.map(xs => stat.push(yArr.map(x => xs[x])))
//   return stat
// }
