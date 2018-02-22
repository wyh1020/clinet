const message = ['a b']
const x = message.map(m => m.split(' ').filter(i => i !== ''))
console.log(x)
