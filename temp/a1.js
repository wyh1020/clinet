const message = ['a b']
const x = message.map(m => m.split(' ').filter(i => i !== ''))
console.log(x)

// 写入CDH文件(输入框上面的提示框)
const cdh = { a: ['a', 'b'], b: ['a', 'c'] }
const a = Object.entries(cdh).map(x => x.toString().replace(/,/g, ' '))
const doc = a.toString().replace(/,/g, '\n')
console.log(a)
console.log(doc)
// 读取CDH文件
const obj = {}
a.forEach((x) => {
  const s = x.split(' ').filter(i => i !== '');
  const k = s.shift()
  obj[k] = s
})
console.log(obj)
