const echarts = require('echarts');
export default function chartPie(id, opt = null) {
  let option = {}
  const myChart = echarts.init(document.getElementById(id));
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
    // 取最后点击的列为数据
    const th = ths.splice(-1, 1)[0]
    const legend = []
    const data = []
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
      legend.push(name)
      data.push({ name: name, value: v[th] })
    })
    // 基于准备好的dom，初始化echarts实例
    // 指定图表的配置项和数据
    option = {
      tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c} ({d}%)' },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: legend
      },
      series: [{
        name: th,
        type: 'pie',
        radius: '55%',
        data: data
      }]
    };
  }
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option, true);
}
