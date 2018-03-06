const echarts = require('echarts');
export default function chartBar(id, opt = null) {
  if (opt) {
    // 取得表头并删除前两位
    const th = opt[0]
    let drg2 = false
    if (th.indexOf('drg2') > 0) {
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
    stat.shift()
    const series = []
    const chartKeys = []
    stat.forEach((v) => {
      let name = ''
      if (drg2) {
        name = `${v[0]} ${v[1]} ${v[2]}`
        v.splice(0, 3)
      } else {
        name = `${v[0]} ${v[1]}`
        v.splice(0, 2)
      }
      chartKeys.push(name)
      series.push({ data: v, name: name, type: 'bar' })
    })
    // 显示图
    const myChart = echarts.init(document.getElementById(id));
    const option = {
      tooltip: { trigger: 'axis' },
      legend: { data: chartKeys },
      // toolbox: {
      //   show: true,
      //   feature: {
      //     magicType: { type: ['bar', 'line', 'stack', 'tiled'] },
      //     saveAsImage: {}
      //   }
      // },
      calculable: true,
      xAxis: xAxis,
      yAxis: { type: 'value' },
      series: series
    };
    myChart.setOption(option, true);
  }
}
