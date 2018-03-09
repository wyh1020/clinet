// CDA转换为section结构
// const cda = ['a b c', 'b c d', '个人信息', '姓名 瞪大', '性别 男', '年龄 19', '主诉', '头 痛 3天', '体格检查', '体态 正常', '步态 正常', '心率 120']
// const x = cda.map(m => m.split(' ').filter(i => i !== ''))
// console.log(x)

function editDoc(x) {
  const obj = {}
  let key = '未定义'
  obj[key] = []
  const funx = function (obj, x) {
    if (obj[x[0]]) {
      obj[x[0]].push(x)
    } else {
      key = x[0]
      obj[key] = []
    }
  }
  x.forEach((x) => {
    // console.log(x[0])
    switch (x[0]) {
      case '个人信息':
        funx(obj, x)
        break
      case '主诉':
        funx(obj, x)
        break
      case '病史':
        funx(obj, x)
        break
      case '现病史':
        funx(obj, x)
        break
      case '既往史':
        funx(obj, x)
        break
      case '家族史':
        funx(obj, x)
        break
      case '个人史':
        funx(obj, x)
        break
      case '月经史':
        funx(obj, x)
        break
      case '婚育史':
        funx(obj, x)
        break
      case '家庭史':
        funx(obj, x)
        break
      case '遗传史':
        funx(obj, x)
        break
      case '体格检查':
        funx(obj, x)
        break
      case '医嘱':
        funx(obj, x)
        break
      case '签名':
        funx(obj, x)
        break
      default:
        obj[key].push(x)
    }
  })
  // console.log(obj)
  return obj
}

export default editDoc
// editDoc(x)
