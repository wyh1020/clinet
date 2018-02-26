import utils from '../utils';

describe('Stat', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Stat-测试1', function () {
    // 1、点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '未注册用户登陆！')
    // 2、点击顶部导航栏的stat-page，进入stat页
      .click('#navbar-stat')
      .waitUntilTextExists('#notice-bar', '数据分析-数据分析')
    // 2.1、本地文件 leftPanel显示本地文件列表
    // 2.2、远程文件 leftPanel显示远程文件列表
    // 2.3、前页 rightPanel数据显示前十条 如果为第一页则提示"当前已是第一页"
    // 2.3.1 点击前页之后 rightPanel的chart展示当前十条数据
    // 2.4、后页 rightPanel数据显示后十条 如果为最后一页则提示"当前已是最后一页"
    // 2.4.1 点击后页之后 rightPanel的chart展示当前十条数据
    // 2.5、编辑数据 跳转至Edit编辑页面 将Edit的rightPanel显示Stat的rightPanel数据表内容
    // 2.6、加入对比 rightPanel数据未选择 提示"请选择加入对比数据"
    // 2.6.1 点击rightPanel单条或多条数据 点击加入对比 将当前单条数据加入到对比数据中
    // 2.7、保存对比
    // 2.8、显示对比 将对比数据展示在rightPanel数据表中
    // 2.8.1 点击显示对比后 rightPanel的chart展示当前十条对比数据
    // 2.9、左图选择 下拉框显示可选图形
    // 2.9.1、柱状图 左部chart数据展示为柱状图
    // 2.9.2、折线图 左部chart数据展示为折线图
    // 2.9.3、散点图 左部chart数据展示为散点图
    // 2.9.4、雷达图 左部chart数据展示为雷达图
    // 2.10、右图选择 下拉框显示可选图形
    // 2.10.1、柱状图 右部chart数据展示为柱状图
    // 2.10.2、折线图 右部chart数据展示为折线图
    // 2.10.3、散点图 右部chart数据展示为散点图
    // 2.10.4、雷达图 右部chart数据展示为雷达图
    // 2.11、维度选择 下拉框显示可选维度
    // 2.11.1、机构 leftPanel显示可选机构维度
    // 2.11.2、时间 leftPanel显示可选时间维度
    // 2.11.3、病种 leftPanel显示可选病种维度

    // 2.12 左列表 点击左列表 rightPanel数据表展示文件内容 rightPanel图表展示当前数据
    // 2.13 rightPanel数据表 无数据提示"无数据" 默认展示十条数据
    // 2.13.1 点击单条或多条 高亮显示 rightPanel图表展示选中行数据 及提示内容
  })
});
