const echarts = require('echarts');
export default function chartBar(id, opt = null) {
  let option = {}
  const myChart = echarts.init(document.getElementById(id));
  if (opt) {
    // 取得表头并删除前两位
    const keys = Object.keys(opt[0])
    const th = Object.keys(opt[0])
    let drg2 = false
    if (th.includes('drg2') || th.includes('病种')) {
      th.splice(0, 3)
      drg2 = true
    } else {
      th.splice(0, 2)
      drg2 = false
    }
    // 定义xaxis
    const xAxis = { data: th, type: 'category' }
    // 取得要显示的列
    const stat = opt
    // stat.shift()
    const series = []
    const chartKeys = []
    stat.forEach((v) => {
      let name = ''
      if (keys.includes('org') && keys.includes('time') && drg2) {
        name = `${v.org} ${v.time} ${v.drg2}`
      } else if (keys.includes('机构') && keys.includes('时间') && drg2) {
        name = `${v.机构} ${v.时间} ${v.病种}`
      } else if (keys.includes('org') && keys.includes('time')) {
        name = `${v.org} ${v.time}`
      } else {
        name = `${v.机构} ${v.时间}`
      }
      const data = []
      th.forEach((y) => {
        data.push(v[y])
      })
      chartKeys.push(name)
      series.push({ data: data, name: name, type: 'bar' })
    })
    // 显示图
    option = {
      tooltip: { trigger: 'axis' },
      legend: { data: chartKeys },
      calculable: true,
      xAxis: xAxis,
      yAxis: { type: 'value' },
      series: series
    };
  }
  myChart.setOption(option, true);
}
