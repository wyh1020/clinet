import utils from '../utils';

describe('Stat', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Stat-测试1', function () {
    this.timeout(100000)
    // 1、点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '未注册用户登陆！')
    // 2、点击顶部导航栏的stat-page，进入stat页
      .click('#navbar-stat')
      .waitUntilTextExists('#notice-bar', '数据分析-数据分析')
    // 2.1、本地文件 leftPanel显示本地文件列表
      .click('#stat-local-doc')
    // 2.1.1 点击leftPanel列表 rightPanel数据表显示当前文件的前十条数据 chart显示当前数据图表 提示显示当前数据提示内容
      .click('.stat-left-file-tr')
      .waitUntilTextExists('#notice-bar', 'CSV文件读取成功！')
      .getText('.stat-right-table-tr')
      .then(function (rightTable) {
        // console.log(rightTable)
        expect(rightTable).to.be.an('array');
      })
    // 2.1.1.1 点击rightPanel数据表的单条或多条数据高亮显示 rightPanel的chart及提示显示当前数据的图表及提示内容
      .click('.stat-right-table-tr')
      .waitUntilWindowLoaded(8000)
      .click('.stat-right-table-td')
      .waitUntilWindowLoaded(1000)
      .getText('.stat-right-table-tr')
      .then(function (rightTableTr) {
        // console.log(rightTableTr)
        expect(rightTableTr).to.be.an('array');
      })
    // 2.1.1.1.1 点击工具栏的加入对比 将rightPanel数据表中选中的数据加入到对比数据中
      // .click('#stat-join-contrast')
      // .waitUntilTextExists('#notice-bar', '加入成功')
    // 2.1.1.1.2 点击工具栏的显示对比 将对比数据显示到rightPanel的数据表中
      // .click('#stat-show-contrast')
      // .waitUntilWindowLoaded(1000)
      // .getText('.stat-right-table-tr')
      // .then(function (rightTableTr) {
      //   // console.log(rightTableTr)
      //   expect(rightTableTr).to.be.an('string');
      // })
    // 2.1.1.1.3 点击工具栏的保存对比(stat-save-contrast)
      // .click('#stat-save-contrast')
    // 2.1.1.1.4 点击工具栏的后一页 rightPanel显示当前数据的后十条数据并且当前行高亮显示 如果为最后一页则提示"当前已是最后一页"
      .click('#stat-next-page')
      // .waitUntilWindowLoaded(1000)
      .getText('.stat-right-table-tr')
      .then(function (rightTable) {
        expect(rightTable).to.be.an('array');
      })
    // 2.1.1.1.5 点击工具栏的前一页 rightPanel显示当前数据的前十条数据并且当前行高亮显示 如果为第一页则提示"当前已是第一页"
      .click('#stat-prev-page')
      // .waitUntilWindowLoaded(1000)
      .getText('.stat-right-table-tr')
      .then(function (rightTable) {
        expect(rightTable).to.be.an('array');
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
      .click('#stat-left-chart-bar')
      // .waitUntilTextExists('#stat-left-bar', '柱状图')
      .hasFocus('[aria-labelledby="stat-left-chart"]')
      .then(function (rightTable) {
        // console.log(rightTable)
        expect(rightTable).to.equal(false)
      })
    // 2.1.1.1.7.2 点击折线图 rightPanel左部chart数据展示为折线图
      .click('#stat-left-chart')
      .click('#stat-left-chart-discount')
      // .waitUntilTextExists('#stat-left-bar', '折线图')
      .hasFocus('[aria-labelledby="stat-left-chart"]')
      .then(function (rightTable) {
        // console.log(rightTable)
        expect(rightTable).to.equal(false)
      })
    // 2.1.1.1.7.3 点击散点图 rightPanel左部chart数据展示为散点图
      .click('#stat-left-chart')
      .click('#stat-left-chart-scatter-plot')
      // .waitUntilTextExists('#stat-left-bar', '散点图')
      .hasFocus('[aria-labelledby="stat-left-chart"]')
      .then(function (rightTable) {
        // console.log(rightTable)
        expect(rightTable).to.equal(false)
      })
    // 2.1.1.1.7.4 点击雷达图 rightPanel左部chart数据展示为雷达图
      .click('#stat-left-chart')
      .click('#stat-left-chart-radar-map')
      // .waitUntilTextExists('#stat-left-bar', '雷达图')
      .hasFocus('[aria-labelledby="stat-left-chart"]')
      .then(function (rightTable) {
        // console.log(rightTable)
        expect(rightTable).to.equal(false)
      })
    // 2.1.1.1.7.5 点击饼图 rightPanel左部chart数据展示为饼图
      .click('#stat-left-chart')
      .click('#stat-left-chart-pie-map')
      // .waitUntilTextExists('#stat-left-bar', '饼图')
      .hasFocus('[aria-labelledby="stat-left-chart"]')
      .then(function (rightTable) {
        // console.log(rightTable)
        expect(rightTable).to.equal(false)
      })
    // 2.1.1.1.8 点击工具栏的右图选择 下拉框显示可选图形
    // 2.1.1.1.8.1 点击柱状图 rightPanel右部chart数据展示为柱状图
      .click('#stat-right-chart')
      .click('#stat-right-chart-bar')
      // .waitUntilTextExists('#stat-right-bar', '柱状图')
      .hasFocus('[aria-labelledby="stat-right-chart"]')
      .then(function (rightTable) {
        // console.log(rightTable)
        expect(rightTable).to.equal(false)
      })
    // 2.1.1.1.8.2 点击折线图 rightPanel右部chart数据展示为折线图
      .click('#stat-right-chart')
      .click('#stat-right-chart-discount')
      // .waitUntilTextExists('#stat-right-bar', '折线图')
      .hasFocus('[aria-labelledby="stat-right-chart"]')
      .then(function (rightTable) {
        // console.log(rightTable)
        expect(rightTable).to.equal(false)
      })
    // 2.1.1.1.8.3 点击散点图 rightPanel右部chart数据展示为散点图
      .click('#stat-right-chart')
      .click('#stat-right-chart-scatter-plot')
      // .waitUntilTextExists('#stat-right-bar', '散点图')
      .hasFocus('[aria-labelledby="stat-right-chart"]')
      .then(function (rightTable) {
        // console.log(rightTable)
        expect(rightTable).to.equal(false)
      })
    // 2.1.1.1.8.4 点击雷达图 rightPanel右部chart数据展示为雷达图
      .click('#stat-right-chart')
      .click('#stat-right-chart-radar-map')
      // .waitUntilTextExists('#stat-right-bar', '雷达图')
      .hasFocus('[aria-labelledby="stat-right-chart"]')
      .then(function (rightTable) {
        // console.log(rightTable)
        expect(rightTable).to.equal(false)
      })
    // 2.1.1.1.8.5 点击饼图 rightPanel左部chart数据展示为饼图
      .click('#stat-right-chart')
      .click('#stat-right-chart-pie-map')
      // .waitUntilTextExists('#stat-right-bar', '饼图')
      .hasFocus('[aria-labelledby="stat-right-chart"]')
      .then(function (rightTable) {
        // console.log(rightTable)
        expect(rightTable).to.equal(false)
      })
    // 2.1.1.1.9 点击工具栏的维度选择 下拉框显示可选维度
    // 2.1.1.1.9.1 点击时间 leftPanel显示可选时间维度
      .click('#stat-right-dimension')
      .click('#stat-td-tr0')
      .getText('.stat-left-dimension-tr')
      .then(function (time) {
        expect(time).to.be.an('array');
      })
      .click('.stat-left-dimension-tr')
      .getText('.stat-right-table-tr')
      .then(function (time) {
        expect(time).to.be.an('array');
      })
    // 2.1.1.1.9.2 点击机构 leftPanel显示可选机构维度
      .click('#stat-right-dimension')
      .click('#stat-td-tr1')
      .getText('.stat-left-dimension-tr')
      .then(function (org) {
        expect(org).to.be.an('array');
      })
      .click('.stat-left-dimension-tr')
      .getText('.stat-right-table-tr')
      .then(function (org) {
        expect(org).to.be.an('array');
      })
    // 2.1.1.1.9.3 点击病种 leftPanel显示可选病种维度
      // .click('#stat-right-dimension')
      // .click('##stat-td-tr2')
      // .getText('.stat-left-dimension-tr')
      // .then(function (disease) {
      //   console.log(disease);
      //   expect(disease).to.be.an('array');
      // })
      // .click('.stat-left-dimension-tr')
      // .getText('.stat-right-table-tr')
      // .then(function (disease) {
      //   expect(disease).to.be.an('array');
      // })
    // 2.1.2 点击leftPanel列表 rightPanel数据表无数据提示"当前分析文件中无数据" chart显示当前图表无数据 提示显示无提示内容
    // 本地文件 如果leftPanel无数据分析文件 提示"暂无本地分析文件"

    // 2.2、远程文件 leftPanel显示远程文件列表
      .click('#stat-remote-file')
      .waitUntilTextExists('#notice-bar', '未登录用户,请在系统服务-用户设置内登录')
      .click('#navbar-system')
      .click('#navbar-system-server')
      // .waitUntilTextExists('#notice-bar', '系统服务-远程服务器设置')
      .click('#server-user-setup')
      .click('#server-login')
      .click('#navbar-stat')
      .click('#stat-local-doc')
      .click('#stat-remote-file')
      // .waitUntilTextExists('.stat-left-file-tr', '医疗质量')
      // .getText('.stat-left-file-tr')
      // .then(function (file) {
      //   expect(file).to.be.an('array');
      // })
    // 2.2.1 点击leftPanel列表 rightPanel数据表显示当前文件的前十条数据 chart显示当前数据图表 提示显示当前数据提示内容
      // .click('.stat-left-file-tr')
      // .click('.stat-left-file-tr')
      // .click('.stat-left-file-tr')
      // .click('.stat-left-file-tr')
      // .getText('.stat-right-table-tr')
      // .then(function (righttable) {
      //   console.log(righttable);
      //   // expect(righttable).to.be.an('array');
      // })
    // 2.2.1.1 点击rightPanel数据表的单条或多条数据高亮显示 rightPanel的chart及提示显示当前数据的图表及提示内容
      // .click('.stat-right-table-tr')
      // .waitUntilWindowLoaded(8000)
      // .click('.stat-right-table-td')
      // .waitUntilWindowLoaded(1000)
      // .getText('.stat-right-table-tr')
      // .then(function (rightTableTr) {
      //   console.log(rightTableTr)
      //   // expect(rightTableTr).to.be.an('array');
      // })
    // 2.2.1.1.1 点击工具栏的加入对比 将rightPanel数据表中选中的数据加入到对比数据中
      // .click('#stat-join-contrast')
      // .waitUntilTextExists('#notice-bar', '加入成功')
    // 2.2.1.1.2 点击工具栏的显示对比 将对比数据显示到rightPanel的数据表中
      // .click('#stat-show-contrast')
      // .waitUntilWindowLoaded(1000)
      // .getText('#stat-right-table')
      // .then(function (rightTableTr) {
      //   // console.log(rightTableTr)
      //   expect(rightTableTr).to.be.an('string');
      // })
    // 2.2.1.1.3 点击工具栏的保存对比
    // 2.2.1.1.4 点击工具栏的后一页 rightPanel显示当前数据的后十条数据并且当前行高亮显示 如果为最后一页则提示"当前已是最后一页"
      // .click('#stat-next-page')
      // .waitUntilWindowLoaded(1000)
      // .getText('#stat-right-table')
      // .then(function (rightTable) {
      //   expect(rightTable).to.be.an('string');
      // })
    // 2.2.1.1.5 点击工具栏的前一页 rightPanel显示当前数据的前十条数据并且当前行高亮显示 如果为第一页则提示"当前已是第一页"
      // .click('#stat-prev-page')
      // .waitUntilWindowLoaded(500)
      // .getText('#stat-right-table')
      // .then(function (rightTable) {
      //   expect(rightTable).to.be.an('string');
      // })
    // 2.2.1.1.6 点击工具栏的编辑数据 将当前远程文件数据显示传到Edit的rightPanel中并高亮显示当前选中数据 leftPanel显示选中的第一条数据内容
      // .click('#stat-edit-data')
      // .waitUntilTextExists('#edit-editbar-input', '')
      // .getText('#edit-editbar-input')
      // .then(function (editText) {
      //   expect(editText).to.equal('');
      // })
      // .click('#edit-leftbar-back')
      // .waitUntilTextExists('#notice-bar', 'CSV文件读取成功！')
    // 2.2.1.1.7 点击工具栏的左图选择 下拉框显示可选图形
    // 2.2.1.1.7.1 点击柱状图 rightPanel左部chart数据展示为柱状图
      // .click('#stat-left-chart')
      // .click('#stat-left-chart-bar')
      // // .waitUntilTextExists('#stat-left-bar', '柱状图')
      // .hasFocus('[aria-labelledby="stat-left-chart"]')
      // .then(function (rightTable) {
      //   // console.log(rightTable)
      //   expect(rightTable).to.equal(false)
      // })
    // 2.2.1.1.7.2 点击折线图 rightPanel左部chart数据展示为折线图
      // .click('#stat-left-chart')
      // .click('#stat-left-chart-discount')
      // // .waitUntilTextExists('#stat-left-bar', '折线图')
      // .hasFocus('[aria-labelledby="stat-left-chart"]')
      // .then(function (rightTable) {
      //   // console.log(rightTable)
      //   expect(rightTable).to.equal(false)
      // })
    // 2.2.1.1.7.3 点击散点图 rightPanel左部chart数据展示为散点图
      // .click('#stat-left-chart')
      // .click('#stat-left-chart-scatter-plot')
      // // .waitUntilTextExists('#stat-left-bar', '散点图')
      // .hasFocus('[aria-labelledby="stat-left-chart"]')
      // .then(function (rightTable) {
      //   // console.log(rightTable)
      //   expect(rightTable).to.equal(false)
      // })
    // 2.2.1.1.7.4 点击雷达图 rightPanel左部chart数据展示为雷达图
      // .click('#stat-left-chart')
      // .click('#stat-left-chart-radar-map')
      // // .waitUntilTextExists('#stat-left-bar', '雷达图')
      // .hasFocus('[aria-labelledby="stat-left-chart"]')
      // .then(function (rightTable) {
      //   // console.log(rightTable)
      //   expect(rightTable).to.equal(false)
      // })
    // 2.2.1.1.7.5 点击饼图 rightPanel左部chart数据展示为饼图
      // .click('#stat-left-chart')
      // .click('#stat-left-chart-pie-map')
      // // .waitUntilTextExists('#stat-left-bar', '饼图')
      // .hasFocus('[aria-labelledby="stat-left-chart"]')
      // .then(function (rightTable) {
      //   // console.log(rightTable)
      //   expect(rightTable).to.equal(false)
      // })
    // 2.2.1.1.8 点击工具栏的右图选择 下拉框显示可选图形
    // 2.2.1.1.8.1 点击柱状图 rightPanel右部chart数据展示为柱状图
      // .click('#stat-right-chart')
      // .click('#stat-right-chart-bar')
      // // .waitUntilTextExists('#stat-right-bar', '柱状图')
      // .hasFocus('[aria-labelledby="stat-right-chart"]')
      // .then(function (rightTable) {
      //   // console.log(rightTable)
      //   expect(rightTable).to.equal(false)
      // })
    // 2.2.1.1.8.2 点击折线图 rightPanel右部chart数据展示为折线图
      // .click('#stat-right-chart')
      // .click('#stat-right-chart-discount')
      // // .waitUntilTextExists('#stat-right-bar', '折线图')
      // .hasFocus('[aria-labelledby="stat-right-chart"]')
      // .then(function (rightTable) {
      //   // console.log(rightTable)
      //   expect(rightTable).to.equal(false)
      // })
    // 2.2.1.1.8.3 点击散点图 rightPanel右部chart数据展示为散点图
      // .click('#stat-right-chart')
      // .click('#stat-right-chart-scatter-plot')
      // // .waitUntilTextExists('#stat-right-bar', '散点图')
      // .hasFocus('[aria-labelledby="stat-right-chart"]')
      // .then(function (rightTable) {
      //   // console.log(rightTable)
      //   expect(rightTable).to.equal(false)
      // })
    // 2.2.1.1.8.4 点击雷达图 rightPanel右部chart数据展示为雷达图
      // .click('#stat-right-chart')
      // .click('#stat-right-chart-radar-map')
      // // .waitUntilTextExists('#stat-right-bar', '雷达图')
      // .hasFocus('[aria-labelledby="stat-right-chart"]')
      // .then(function (rightTable) {
      //   // console.log(rightTable)
      //   expect(rightTable).to.equal(false)
      // })
    // 2.2.1.1.8.5 点击饼图 rightPanel右部chart数据展示为饼图
      // .click('#stat-right-chart')
      // .click('#stat-right-chart-pie-map')
      // // .waitUntilTextExists('#stat-right-bar', '饼图')
      // .hasFocus('[aria-labelledby="stat-right-chart"]')
      // .then(function (rightTable) {
      //   // console.log(rightTable)
      //   expect(rightTable).to.equal(false)
      // })
    // 2.2.1.1.9 点击工具栏的维度选择 下拉框显示可选维度
    // 2.2.1.1.9.1 点击机构 leftPanel显示可选机构维度
      // .click('#stat-right-dimension')
      // .click('#stat-right-dimension-org')
      // .waitUntilWindowLoaded(1000)
      // .getText('.stat-left-dimension-tr')
      // .then(function (org) {
      //   expect(org).to.be.an('string');
      // })
      // .click('.stat-left-dimension-tr')
      // .waitUntilWindowLoaded(1000)
      // .getText('#stat-right-table')
      // .then(function (org) {
      //   expect(org).to.be.an('string');
      // })
    // 2.2.1.1.9.2 点击时间 leftPanel显示可选时间维度
      // .click('#stat-right-dimension')
      // .click('#stat-right-dimension-time')
      // .waitUntilWindowLoaded(1000)
      // .getText('.stat-left-dimension-tr')
      // .then(function (time) {
      //   expect(time).to.be.an('array');
      // })
      // .click('.stat-left-dimension-tr')
      // .waitUntilWindowLoaded(1000)
      // .getText('#stat-right-table')
      // .then(function (time) {
      //   expect(time).to.be.an('string');
      // })
    // 2.2.1.1.9.3 点击病种 leftPanel显示可选病种维度
      // .click('#stat-right-dimension')
      // .click('#stat-right-dimension-disease')
      // .waitUntilWindowLoaded(1000)
      // .getText('.stat-left-dimension-tr')
      // .then(function (disease) {
      //   // console.log(disease);
      //   expect(disease).to.be.an('array');
      // })
      // .click('.stat-left-dimension-tr')
      // .waitUntilWindowLoaded(1000)
      // .getText('#stat-right-table')
      // .then(function (disease) {
      //   expect(disease).to.be.an('string');
      // })
  })
});
