const echarts = require('echarts');
export default function chartScatter(id, opt) {
  console.log(opt);
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById(id));
  // 指定图表的配置项和数据
  const option = {
    xAxis: {
      scale: true
    },
    yAxis: {
      scale: true
    },
    series: [{
      type: 'effectScatter',
      symbolSize: 20,
    }, {
      type: 'scatter',
      data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2],
      ],
    }]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option, true);
}
