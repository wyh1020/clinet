// CDA转换为section结构
// const cda = ['a b c', 'b c d', '个人信息', '姓名 瞪大', '性别 男', '年龄 19', '主诉', '头 痛 3天', '体格检查', '体态 正常', '步态 正常', '心率 120']
// const x = cda.map(m => m.split(' ').filter(i => i !== ''))

const sections = [
  '标题',
  '个人信息',
  '病史', '现病史', '既往史', '家族史', '个人史',
  '月经史', '婚育史', '家庭史', '遗传史',
  '主诉',
  '体格检查',
  '医嘱',
  '签名',
  '上次住院情况',
  '本次住院情况',
  '背景Background',
  '评估Assessment',
  '建议Recommendation',
  '产科检查',
  '疾病诊断',
  '药物信息',
  '检验信息',
  '检查信息',
  '复查信息',
  '孕产史',
  '疾病史',
  '手术史',
  '体格检查',
  '妇科检查',
  '配偶信息',
  '产检信息',
  '医保科'
]

function editDoc(x, sectionList) {
  const obj = {}
  let key = '标题'
  let n = 0
  obj[key] = []

  x.forEach((x) => {
    x = [n].concat(x)
    n += 1
    let sectionList1 = sections
    if (sectionList.length !== 0) {
      sectionList1 = sectionList
    }
    if (sectionList1.includes(x[1])) {
      key = x
      if (!obj[key]) {
        obj[key] = []
      }
    } else {
      obj[key].push(x)
    }
  })

  return obj
}

export default editDoc
