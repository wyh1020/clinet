const echarts = require('echarts');
export default function chartScatter(id, opt = null) {
  let option = {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [],
      type: 'bar'
    }]
  }
  const myChart = echarts.init(document.getElementById(id), 'light');
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
      } else if (keys.includes('year_time')) {
        name = `${v.year_time}`
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
    // 指定图表的配置项和数据
    option = {
      legend: {
        type: 'scroll',
        width: '80%',
        data: legend
      },
      toolbox: {
        show: true,
        orient: 'horizontal',
        x: 'right',
        y: 'top',
        color: ['#1e90ff', '#22bb22', '#4b0082', '#d2691e'],
        // backgroundColor: 'rgba(0,0,0,0)',
        borderColor: '#ccc',
        borderWidth: 0,
        padding: 5,
        feature: {
          dataView: {
            show: true,
            title: '数据视图',
            readOnly: false,
            lang: ['数据视图', '关闭', '刷新']
          },
          saveAsImage: {
            show: true,
            title: '保存为图片',
            type: 'png',
            lang: ['点击保存']
          }
        }
      },
      tooltip: {
      },
      xAxis: {},
      yAxis: {},
      series: series
    };
  }
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option, true);
}
