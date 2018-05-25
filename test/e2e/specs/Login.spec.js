import utils from '../utils';

describe('Login', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  // 未注册用户登陆
  it('Login-测试1', function () {
    // 点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，登陆成功
      .waitUntilTextExists('#notice-bar', '系统通知：未注册用户可以直接登陆！使用单机版功能！用户注册可以选择远程服务或者区块链服务！')
  })
  // 服务器注册用户登陆

  // 区块链注册用户登陆
});
