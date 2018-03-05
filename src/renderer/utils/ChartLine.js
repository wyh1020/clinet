const echarts = require('echarts');
export default function chartLine(id, opt = null) {
  // 取得表头并删除前两位
  const th = opt[0]
  th.splice(0, 2)
  // 定义xaxis
  const xAxis = { data: th, type: 'category' }
  // 取得要显示的列
  const stat = opt
  stat.shift()
  const series = []
  const chartKeys = []
  stat.forEach((v) => {
    const name = `${v[0]} ${v[1]}`
    v.splice(0, 2)
    chartKeys.push(name)
    series.push({ data: v, name: name, type: 'line' })
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
