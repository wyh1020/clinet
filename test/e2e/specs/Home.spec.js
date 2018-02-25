import utils from '../utils';

describe('Home', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Home-测试1', function () {
    // 点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '未注册用户登陆！')
      .getText('#notice-bar')
      .then(function (noticeText) {
        expect(noticeText).to.equal('系统通知：未注册用户登陆！');
      })
  })
});
