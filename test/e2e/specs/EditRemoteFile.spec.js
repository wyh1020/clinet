import utils from '../utils';

describe('EditRemoteFile', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Edit-远程文件测试1', function () {
    this.timeout(60000)
    // 1、点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '未注册用户登陆！')
    // 2、点击顶部导航栏的edit-page，进入edit页
      .click('#navbar-edit')
      .waitUntilTextExists('#edit-editbar-input', '')
    // 底部输入框edit-editbar-input的内容为空
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('');
      })
    // --------------点击 远程文件按钮-------------------------------------
      .click('#edit-rightbar-server')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
      // .click('#navbar-system')
      // .click('#navbar-system-server')
      // .click('#server-remote-list')
      // .getText('#notice-bar')
      // .then(function (editText) {
      //   expect(editText).to.be.an('string');
      // })
      // .click('#system-td-tr1')
      // .waitUntilWindowLoaded(2000)
      // .getText('#system-td-tr1')
      // .then(function (editText) {
      //   expect(editText).to.be.an('string');
      // })
      // .getText('#notice-bar')
      // .then(function (editText) {
      //   expect(editText).to.be.an('string');
      // })
      // .click('#navbar-edit')
      // .waitUntilTextExists('#edit-editbar-input', '')
      // .click('#edit-rightbar-server')
      // .getText('#edit-bar-prompt')
      // .then(function (editText) {
      //   expect(editText).to.be.an('string');
      // })
      .click('#navbar-system')
      .click('#navbar-system-server')
      .getText('#notice-bar')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
      .click('#server-user-setup')
      .getText('#notice-bar')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
      // .setValue('#server-username', 'test@hitb.com.cn')
      // .setValue('#server-password', '123456')
      .click('#server-login')
      .getText('#server-login')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
      .waitUntilTextExists('#notice-bar', '远程服务用户登录成功')
      .getText('#notice-bar')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
      .click('#navbar-edit')
      .waitUntilTextExists('#edit-editbar-input', '')
      .click('#edit-rightbar-server')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
      // .click('.edit-rightpanellocal-tr')
      // .getText('#edit-bar-prompt')
      // .then(function (editText) {
      //   console.log(editText);
      //   expect(editText).to.be.an('string');
      // })
      // .click('.edit-rightpanellocal-tr')
      // .getText('#edit-bar-prompt')
      // .then(function (editText) {
      //   console.log(editText);
      //   expect(editText).to.be.an('string');
      // })
  });
});

