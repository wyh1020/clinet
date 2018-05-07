const echarts = require('echarts');
export default function chartBar(id, opt = null) {
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
    // console.log(opt)
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
    const xAxis = {
      data: th,
      type: 'category',
      axisLabel: {
        interval: 0,
        rotate: 20
      }
    }
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
      } else if (keys.includes('year_time')) {
        name = `${v.year_time}`
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
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: { data: chartKeys, type: 'scroll', width: '80%' },
      toolbox: {
        show: true,
        orient: 'horizontal',
        x: 'right',
        y: 'top',
        color: ['#1e90ff', '#22bb22', '#4b0082', '#d2691e'],
        backgroundColor: 'rgba(0,0,0,0)',
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
      calculable: true,
      xAxis: xAxis,
      yAxis: { type: 'value' },
      series: series
    };
  }
  myChart.setOption(option, true);
}
