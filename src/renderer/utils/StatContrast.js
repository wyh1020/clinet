// 加入对比方法(obj,当前分析,表头,列选中(index),行选中(index))
export default function addContrast(obj, table = [], compare = [], th = [], yid = [], xid = []) {
  const xArr = []; // 行分析数据
  let yArr = []; // 列index
  const stat = []
  if (table) {
    // 当从未执行过加入对比时,将表头数据添加至对比行数据内
    if (compare.length === 0) {
      xArr.push(th[0]);
    } else {
      // 存储之前添加的对比
      compare.map(x => stat.push(x))
    }
    // 去除选中列后行列表中多余的0
    xid = xid.filter(t => t !== 0)
    // 按照行index从table取得对应结果
    xid.forEach((x) => {
      xArr.push(table[x])
    });
    // 当没有选中列时,为全部列
    if (yid.length === 0) {
      yid = th[0]
      // 对比列的index
      yid.map(y => yArr.push(th[0].indexOf(y)));
    } else {
      yArr = yid
    }
    // 取得之前添加过的对比的关键信息
    const statVal = stat.map(x => `${x[0]}${x[1]}${x[2]}`)
    // 按照列index取得对应结果,没有被存储过会添加
    xArr.forEach((xs) => {
      if (!statVal.includes(`${xs[0]}${xs[1]}${xs[2]}`)) {
        stat.push(yArr.map(x => xs[x]))
      }
    })
    obj.$store.commit('SET_NOTICE', '加入成功')
    obj.$store.commit('STAT_SET_COMPARE_TABLE', stat)
  }
}

// 清空对比
export function clearContrast(obj) {
  // xArr = [];
  // yArr = [];
  obj.$store.commit('STAT_SET_COMPARE_TABLE', [])
  return true
}
