import utils from '../utils';

describe('Server', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Server-测试1', function () {
    // 点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '未注册用户登陆！')
    // 点击顶部导航栏的navbar-server，进入server页
      .click('#navbar-system')
      .click('#navbar-system-local')
      .waitUntilTextExists('#notice-bar', '系统服务-本地文件导入')
      .click('#navbar-system')
      .click('#navbar-system-server')
      .waitUntilTextExists('#notice-bar', '系统服务-远程服务器设置')
      .click('#navbar-system')
      .click('#navbar-system-compdrg')
      .waitUntilTextExists('#notice-bar', '系统服务-DRG分组服务')
      .click('#navbar-system')
      .click('#navbar-system-statdrg')
      .waitUntilTextExists('#notice-bar', '系统服务-DRG分析计算')
  })
});
