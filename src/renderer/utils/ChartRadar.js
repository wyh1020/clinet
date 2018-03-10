const echarts = require('echarts');
export default function chartRadar(id, opt = []) {
  // 取得表头并删除前两位
  const th = Object.keys(opt[0])
  // 判断是否存在drg2字段
  let drg2 = false
  if (th.includes('drg2')) {
    th.splice(0, 3)
    drg2 = true
  } else {
    th.splice(0, 2)
    drg2 = false
  }
  const data = []
  const legendData = []
  const indicator = []
  // 删除表头
  const stat = opt
  // stat.shift()
  // 取得每个维度的最大值
  const max = th.map(v => stat[0][v])
  // 取得每个维度的最大值
  stat.forEach((s) => {
    th.forEach((v, i) => {
      if (s[v] > max[i]) {
        max[i] = s[v]
      }
    })
  })
  // 取得图设置的indicator字段
  max.forEach((v, i) => {
    indicator.push({ max: v, name: th[i] })
  })
  // 生成图的其他字段
  stat.forEach((v) => {
    let name = ''
    if (drg2) {
      name = `${v.org} ${v.time} ${v.drg2}`
    } else {
      name = `${v.org} ${v.time}`
    }
    const value = []
    th.forEach((y) => {
      value.push(v[y])
    })
    legendData.push(name)
    data.push({ value: value, name: name })
  })
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById(id));
  // 指定图表的配置项和数据
  const option = {
    tooltip: {},
    legend: {
      data: legendData
    },
    radar: {
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: indicator
    },
    series: [{
      type: 'radar',
      data: data
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option, true);
}
