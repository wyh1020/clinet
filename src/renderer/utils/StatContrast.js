// 加入对比方法(obj,当前分析,表头,列选中(index),行选中(index))
export default function addContrast(obj, table = [], compare = [], th = [], yid = [], xid = []) {
  if (yid.length === 0) { yid = [] }
  const xArr = []; // 行分析数据
  let yArr = []; // 列index
  const stat = []
  if (table) {
    const statObj = []
    // 转换为[obj, obj, ...]
    const tables = table.filter(x => x !== th)
    tables.forEach((xs) => {
      const obj = {}
      xs.forEach((x, i) => {
        obj[th[i]] = x
      })
      statObj.push(obj)
    })
    // 当从未执行过加入对比时,将表头数据添加至对比行数据内
    if (compare.length !== 0) {
      // 存储之前添加的对比
      compare.map(x => stat.push(x))
    }
    // 去除选中列后行列表中多余的0
    xid = xid.filter(t => t !== 0)
    // 按照行index从table取得对应结果
    xid.forEach((x) => {
      xArr.push(statObj[x - 1])
    });
    // 当没有选中列时,为全部列
    if (yid.length === 0) {
      yArr = th
    } else if (yid.length !== th.length) {
      if (th.includes('drg2') || th.includes('病种')) {
        yArr = [0, 1, 2].map(x => th[x])
      } else {
        yArr = [0, 1].map(x => th[x])
      }
      yid.forEach((x) => {
        yArr.push(th[x])
      })
    }
    // 取得之前添加过的对比的关键信息
    let statVal = []
    if (th.includes('drg2')) {
      statVal = stat.map(x => `${x.org}${x.time}${x.drg2}`)
    } else if (th.includes('病种')) {
      statVal = stat.map(x => `${x.机构}${x.时间}${x.病种}`)
    } else if (th.includes('org')) {
      statVal = stat.map(x => `${x.org}${x.time}`)
    } else {
      statVal = stat.map(x => `${x.机构}${x.时间}`)
    }
    xArr.forEach((xs) => {
      let push = false
      const y = {}
      if (Object.keys(xs).includes('drg2') && !statVal.includes(`${xs.org}${xs.time}${xs.drg2}`)) {
        push = true
      } else if (Object.keys(xs).includes('病种') && !statVal.includes(`${xs.机构}${xs.时间}${xs.病种}`)) {
        push = true
      } else if (!Object.keys(xs).includes('drg2') && !statVal.includes(`${xs.org}${xs.time}`)) {
        push = true
      } else if (!Object.keys(xs).includes('病种') && !statVal.includes(`${xs.机构}${xs.时间}`)) {
        push = true
      }
      if (push) {
        yArr.forEach((x) => {
          y[x] = xs[x]
        })
        stat.push(y)
      }
    })
    obj.$store.commit('SET_NOTICE', '加入成功')
    obj.$store.commit('STAT_SET_COMPARE_TABLE', stat)
    const a = stat.map(x => Object.keys(x).length)
    const b = Math.max.apply(null, a)
    obj.$store.commit('STAT_SET_COL_NUM', b)
  }
}

// 清空对比
export function clearContrast(obj) {
  obj.$store.commit('STAT_SET_COMPARE_TABLE', [])
  return true
}
