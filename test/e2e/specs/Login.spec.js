import utils from '../utils';

describe('Login', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  // 未注册用户登陆
  it('Login-测试1', function () {
    // 点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，登陆成功
      .waitUntilTextExists('#notice-bar', '未注册用户登陆！')
  })
  // 服务器注册用户登陆

  // 区块链注册用户登陆
});
