const echarts = require('echarts');
export default function chartScatter(id, opt) {
  if (opt) {
    // 取得表头并删除前两位
    const ths = Object.keys(opt[0])
    const keys = Object.keys(opt[0])
    let drg2 = false
    if (ths.includes('drg2') || ths.includes('病种')) {
      ths.splice(0, 3)
      drg2 = true
    } else {
      ths.splice(0, 2)
      drg2 = false
    }
    const th = ths.splice(-2, 2)
    const legend = []
    const series = []
    opt.forEach((v) => {
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
      legend.push(name)
      series.push({ name: name, data: [data], type: 'scatter' })
    })
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById(id));
    // 指定图表的配置项和数据
    const option = {
      legend: {
        data: legend
      },
      tooltip: {
      },
      xAxis: {},
      yAxis: {},
      series: series
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option, true);
  }
}
