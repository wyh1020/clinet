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
    // 2.1、本地文件
    // 2.2、远程文件
    // 2.3、前页
    // 2.4、后页
    // 2.5、编辑数据
    // 2.6、加入对比
    // 2.7、保存对比
    // 2.8、显示对比
    // 2.9、左图选择
    // 2.9.1、柱状图
    // 2.9.2、折线图
    // 2.9.3、散点图
    // 2.9.4、雷达图
    // 2.10、右图选择
    // 2.10.1、柱状图
    // 2.10.2、折线图
    // 2.10.3、散点图
    // 2.10.4、雷达图
    // 2.11、维度选择
    // 2.11.1、机构
    // 2.11.2、时间
    // 2.11.3、病种
  })
});
