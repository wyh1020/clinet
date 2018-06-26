import utils from '../utils';

describe('Launch', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  // 系统正常启动
  it('edit-远程测试', function () {
    this.timeout(60000)
    // 1、点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '系统通知：未注册用户可以直接登陆！使用单机版功能！用户注册可以选择远程服务或者区块链服务！')
      // 点击nav-navbar进入edit页面
      .click('#navbar-edit')
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：数据采集-数据采集')
      // 点击远程按钮
      .click('#edit-rightbar-server')
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：模板列表查询失败')
      // 点击nav-navbar 进入system
      .click('#navbar-system')
      .click('#navbar-system-server')
      .click('#server-user-setup')
      .getValue('#server-username')
      .then(function (name) {
        expect(name).to.equal('test@hitb.com.cn')
      })
      .getValue('#server-password')
      // .waitUntilTextExists('#notice-bar', '系统通知：用户设置')
      .then(function (password) {
        expect(password).to.equal('123456')
      })
      .setValue('#server-username', 'test@test.com.cn')
      .setValue('#server-password', '123456')
      .click('#server-login')
      // .waitForExist(50)
      .getText('#navbar-username')
      .then(function (value) {
        console.log(value);
        // !expect(value).to.equal('')
      })
      // .getHTML('#server-table-user')
      // .then(function (value) {
      //   console.log(value);
      //   // !expect(value).to.equal('')
      // })
      .click('#navbar-edit')
      .waitUntilTextExists('#edit-bar-prompt', '系统通知：数据采集-数据采集')
      .click('#edit-rightbar-server')
      // .waitUntilTextExists('#edit-bar-prompt', '系统通知：读取成功')
      .getText('#edit-bar-prompt')
      .then(function (value) {
        console.log(value);
        // !expect(value).to.equal('')
      })
      // .waitForExist(50)
  });
});
