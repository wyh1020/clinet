const echarts = require('echarts');
export default function chartBar(id, opt = null) {
  if (opt) {
    const myChart = echarts.init(document.getElementById(id));
    // console.log(opt)
    const option = {
      xAxis: {
        type: 'category',
        data: opt.xdata
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: opt.ydata,
        type: 'bar'
      }]
    };
    myChart.setOption(option, true);
  }
}
