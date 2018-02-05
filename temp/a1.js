const fs = require('fs');
const path = require('path');
const a = path.format({
  dir: 'C:\\',
  // base: 'file.txt'
});
const c = fs.existsSync(a)
console.log(a)
const b = fs.readdirSync(a)
console.log(b)

const stat = fs.lstatSync('C:\\Users');
console.log(stat.isDirectory())

console.log(c)
