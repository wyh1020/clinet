import utils from '../utils';

describe('Edit', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Edit-测试1', function () {
    // 点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '未注册用户登陆！')
      .getText('#notice-bar')
      .then(function (noticeText) {
        console.log(noticeText)
        expect(noticeText).to.equal('系统通知：未注册用户登陆！');
      })
    // 点击顶部导航栏的edit-page，进入edit页
      .click('#edit-page')
      .waitUntilTextExists('#edit-input', '')
    // 底部输入框edit-input的内容为空
      .getText('#edit-input')
      .then(function (editText) {
        console.log(`editText: ${editText}`)
        expect(editText).to.equal('');
      })
  })
});
