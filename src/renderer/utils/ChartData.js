export default function chartData(table, x = 1, y = 3) {
  // console.log(table)
  // console.log(x)
  // console.log(y)
  const opt = {}
  table = table.filter(x => x.includes('半年') && !x.includes('drg'))
  table = table.map(x => x.split(','))
  opt.xdata = table.map(doc => doc[x])
  opt.ydata = table.map(doc => doc[y])
  return opt
}
