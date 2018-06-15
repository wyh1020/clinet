import utils from '../utils';

describe('Stat', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Stat-基本测试', function () {
    this.timeout(100000)
    // 1、点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '系统通知：未注册用户可以直接登陆！使用单机版功能！用户注册可以选择远程服务或者区块链服务！')
    // 2、点击顶部导航栏的stat-page，进入stat页
      .click('#navbar-stat')
      .waitUntilTextExists('#notice-bar', '数据分析-数据分析')
    // 2.1.1.1.4 点击工具栏的后一页 rightPanel显示当前数据的后十条数据并且当前行高亮显示 如果为最后一页则提示"当前已是最后一页"
      .click('#stat-next-page')
      .waitUntilTextExists('#notice-bar', '当前已是尾页')
      .getText('#notice-bar')
      .then(function (rightTable) {
        expect(rightTable).to.equal('系统通知：当前已是尾页');
      })
    // 2.1.1.1.5 点击工具栏的前一页 rightPanel显示当前数据的前十条数据并且当前行高亮显示 如果为第一页则提示"当前已是第一页"
      .click('#stat-prev-page')
      .waitUntilTextExists('#notice-bar', '当前已是第一页')
      .getText('#notice-bar')
      .then(function (rightTable) {
        expect(rightTable).to.equal('系统通知：当前已是第一页');
      })
    // 2.1.1.1.6 点击工具栏的编辑数据 将当前本地文件数据显示传到Edit的rightPanel中并高亮显示当前选中数据 leftPanel显示选中的第一条数据内容
      .click('#stat-edit-data')
      .waitUntilTextExists('#edit-editbar-input', '')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('');
      })
      .click('#edit-leftbar-back')
      // .waitUntilTextExists('#notice-bar', 'CSV文件读取成功！')
    // 2.1.1.1.7 点击工具栏的左图选择 下拉框显示可选图形
    // 2.1.1.1.7.1 点击柱状图 rightPanel左部chart数据展示为柱状图
      .click('#stat-left-chart')
      .click('#stat-left-chart-柱状图')
      .waitUntilTextExists('#notice-bar', '柱状图')
      .hasFocus('[aria-labelledby="stat-left-chart"]')
      .then(function (rightTable) {
        // console.log(rightTable)
        expect(rightTable).to.equal(false)
      })
    // 2.1.1.1.7.2 点击折线图 rightPanel左部chart数据展示为折线图
      .click('#stat-left-chart')
      .click('#stat-left-chart-折线图')
      .waitUntilTextExists('#notice-bar', '折线图')
      .hasFocus('[aria-labelledby="stat-left-chart"]')
      .then(function (rightTable) {
        // console.log(rightTable)
        expect(rightTable).to.equal(false)
      })
    // 2.1.1.1.7.3 点击散点图 rightPanel左部chart数据展示为散点图
      .click('#stat-left-chart')
      .click('#stat-left-chart-散点图')
      .waitUntilTextExists('#notice-bar', '散点图')
      .hasFocus('[aria-labelledby="stat-left-chart"]')
      .then(function (rightTable) {
        // console.log(rightTable)
        expect(rightTable).to.equal(false)
      })
    // 2.1.1.1.7.4 点击雷达图 rightPanel左部chart数据展示为雷达图
      .click('#stat-left-chart')
      .click('#stat-left-chart-雷达图')
      .waitUntilTextExists('#notice-bar', '雷达图')
      .hasFocus('[aria-labelledby="stat-left-chart"]')
      .then(function (rightTable) {
        // console.log(rightTable)
        expect(rightTable).to.equal(false)
      })
    // 2.1.1.1.7.5 点击饼图 rightPanel左部chart数据展示为饼图
      .click('#stat-left-chart')
      .click('#stat-left-chart-饼图')
      .waitUntilTextExists('#notice-bar', '饼图')
      .hasFocus('[aria-labelledby="stat-left-chart"]')
      .then(function (rightTable) {
        // console.log(rightTable)
        expect(rightTable).to.equal(false)
      })
    // 2.1.1.1.8 点击工具栏的右图选择 下拉框显示可选图形
    // 2.1.1.1.8.1 点击柱状图 rightPanel右部chart数据展示为柱状图
      .click('#stat-right-chart')
      .click('#stat-right-chart-柱状图')
      .waitUntilTextExists('#notice-bar', '柱状图')
      .hasFocus('[aria-labelledby="stat-right-chart"]')
      .then(function (rightTable) {
        // console.log(rightTable)
        expect(rightTable).to.equal(false)
      })
    // 2.1.1.1.8.2 点击折线图 rightPanel右部chart数据展示为折线图
      .click('#stat-right-chart')
      .click('#stat-right-chart-折线图')
      .waitUntilTextExists('#notice-bar', '折线图')
      .hasFocus('[aria-labelledby="stat-right-chart"]')
      .then(function (rightTable) {
        // console.log(rightTable)
        expect(rightTable).to.equal(false)
      })
    // 2.1.1.1.8.3 点击散点图 rightPanel右部chart数据展示为散点图
      .click('#stat-right-chart')
      .click('#stat-right-chart-散点图')
      .waitUntilTextExists('#notice-bar', '散点图')
      .hasFocus('[aria-labelledby="stat-right-chart"]')
      .then(function (rightTable) {
        // console.log(rightTable)
        expect(rightTable).to.equal(false)
      })
    // 2.1.1.1.8.4 点击雷达图 rightPanel右部chart数据展示为雷达图
      .click('#stat-right-chart')
      .click('#stat-right-chart-雷达图')
      .waitUntilTextExists('#notice-bar', '雷达图')
      .hasFocus('[aria-labelledby="stat-right-chart"]')
      .then(function (rightTable) {
        // console.log(rightTable)
        expect(rightTable).to.equal(false)
      })
    // 2.1.1.1.8.5 点击饼图 rightPanel左部chart数据展示为饼图
      .click('#stat-right-chart')
      .click('#stat-right-chart-饼图')
      .waitUntilTextExists('#notice-bar', '饼图')
      .hasFocus('[aria-labelledby="stat-right-chart"]')
      .then(function (rightTable) {
        // console.log(rightTable)
        expect(rightTable).to.equal(false)
      })
    // 2.1.1.1.9 点击工具栏的维度选择 下拉框显示可选维度
    // 2.1.1.1.9.1 点击时间 leftPanel显示可选时间维度
      .click('#stat-right-dimension')
      .click('#stat-td-tr0')
      .waitUntilTextExists('#notice-bar', '请选择文件')
    // 2.1.1.1.9.2 点击机构 leftPanel显示可选机构维度
      .click('#stat-right-dimension')
      .click('#stat-td-tr1')
      .waitUntilTextExists('#notice-bar', '请选择文件')
    // 2.1.1.1.9.3 点击病种 leftPanel显示可选病种维度
      // .click('#stat-right-dimension')
      // .click('##stat-td-tr2')
      // .waitUntilTextExists('#notice-bar', '请选择文件')
    // 2.1.2 点击leftPanel列表 rightPanel数据表无数据提示"当前分析文件中无数据" chart显示当前图表无数据 提示显示无提示内容
    // 本地文件 如果leftPanel无数据分析文件 提示"暂无本地分析文件"
  })
});
