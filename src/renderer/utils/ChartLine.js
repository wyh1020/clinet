const echarts = require('echarts');
export default function chartLine(id) {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById(id));
  // 指定图表的配置项和数据
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '总量',
        type: 'line',
        stack: '总量',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option, true);
}
