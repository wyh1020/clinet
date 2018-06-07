// CDA转换为section结构
// const cda = ['a b c', 'b c d', '个人信息', '姓名 瞪大', '性别 男', '年龄 19', '主诉', '头 痛 3天', '体格检查', '体态 正常', '步态 正常', '心率 120']
// const x = cda.map(m => m.split(' ').filter(i => i !== ''))

const sections = [
  '个人信息',
  '病史', '现病史', '既往史', '家族史', '个人史',
  '月经史', '婚育史', '家庭史', '遗传史',
  '主诉',
  '体格检查',
  '医嘱',
  '签名'
]

function editDoc(x) {
  const obj = {}
  let key = '标题'
  let n = 0
  obj[key] = []

  x.forEach((x) => {
    x = [n].concat(x)
    n += 1
    if (sections.includes(x[1])) {
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
