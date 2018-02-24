import utils from '../utils';

describe('Server', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Server-测试1', function () {
    // 点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '未注册用户登陆！')
    // 点击顶部导航栏的server-page，进入server页
      // .click('#library-page')
      // .waitUntilTextExists('#notice-bar', '未注册用户登陆！')
  })
});
