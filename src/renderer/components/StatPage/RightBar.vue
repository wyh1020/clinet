<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='load'>
          <a class="nav-link" href="#"> 编辑数据 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='show'>
          <a class="nav-link" href="#"> 显示图表 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='load'>
          <a class="nav-link" href="#"> 加入对比 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='load'>
          <a class="nav-link" href="#"> 显示对比 <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">查找</button>
      </form>
    </div>
  </nav>
</template>

<script>
  const echarts = require('echarts');
  export default {
    data() {
      return {
        paths: []
      };
    },
    methods: {
      load: function () {
        this.$router.push('/edit');
      },
      show: function () {
        this.showChart1()
        this.showChart2()
      },
      showChart1() {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.getElementById('chart1'));
        // 指定图表的配置项和数据
        const option = {
          title: {
            text: '折线图堆叠'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
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
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '直接访问',
              type: 'line',
              stack: '总量',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      showChart2() {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.getElementById('chart2'));
        // const data = [
        //   [3.275154, 2.957587],
        //   [-3.344465, 2.603513],
        //   [0.355083, -3.376585],
        //   [1.852435, 3.547351],
        //   [-2.078973, 2.552013],
        //   [-0.993756, -0.884433],
        //   [2.682252, 4.007573],
        //   [-3.087776, 2.878713],
        //   [-1.565978, -1.256985],
        //   [2.441611, 0.444826],
        //   [-0.659487, 3.111284],
        //   [-0.459601, -2.618005],
        //   [2.17768, 2.387793],
        //   [-2.920969, 2.917485],
        //   [-0.028814, -4.168078],
        //   [3.625746, 2.119041],
        //   [-3.912363, 1.325108],
        //   [-0.551694, -2.814223],
        //   [2.855808, 3.483301],
        //   [-3.594448, 2.856651],
        //   [0.421993, -2.372646],
        //   [1.650821, 3.407572],
        //   [-2.082902, 3.384412],
        //   [-0.718809, -2.492514],
        //   [4.513623, 3.841029],
        //   [-4.822011, 4.607049],
        //   [-0.656297, -1.449872],
        //   [1.919901, 4.439368],
        //   [-3.287749, 3.918836],
        //   [-1.576936, -2.977622],
        //   [3.598143, 1.97597],
        //   [-3.977329, 4.900932],
        //   [-1.79108, -2.184517],
        //   [3.914654, 3.559303],
        //   [-1.910108, 4.166946],
        //   [-1.226597, -3.317889],
        //   [1.148946, 3.345138],
        //   [-2.113864, 3.548172],
        //   [0.845762, -3.589788],
        //   [2.629062, 3.535831],
        //   [-1.640717, 2.990517],
        //   [-1.881012, -2.485405],
        //   [4.606999, 3.510312],
        //   [-4.366462, 4.023316],
        //   [0.765015, -3.00127],
        //   [3.121904, 2.173988],
        //   [-4.025139, 4.65231],
        //   [-0.559558, -3.840539],
        //   [4.376754, 4.863579],
        //   [-1.874308, 4.032237],
        //   [-0.089337, -3.026809],
        //   [3.997787, 2.518662],
        //   [-3.082978, 2.884822],
        //   [0.845235, -3.454465],
        //   [1.327224, 3.358778],
        //   [-2.889949, 3.596178],
        //   [-0.966018, -2.839827],
        //   [2.960769, 3.079555],
        //   [-3.275518, 1.577068],
        //   [0.639276, -3.41284]
        // ];

        // const clusterNumber = 6;
        // // See https://github.com/ecomfe/echarts-stat
        // // const step = ecStat.clustering.hierarchicalKMeans(data, clusterNumber, true);
        // let result;
        // 指定图表的配置项和数据
        const option = {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
            data: ['销量']
          },
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    },
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

</style>
