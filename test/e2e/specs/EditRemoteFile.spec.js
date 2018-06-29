import utils from '../utils';

describe('EditRemoteFile', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Edit-远程文件测试1', function () {
    this.timeout(60000)
    // 1、点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '系统通知：未注册用户可以直接登陆！使用单机版功能！用户注册可以选择远程服务或者区块链服务！')
    // 2、点击顶部导航栏的edit-page，进入edit页
      .click('#navbar-edit')
      .waitUntilTextExists('#edit-editbar-input', '')
    // 底部输入框edit-editbar-input的内容为空
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('');
      })
    // --------------点击 远程文件按钮-------------------------------------
    // 2.1 点击edit 远程文件按钮
      .click('#edit-rightbar-server')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.2 点击导航栏 系统服务下拉
      .click('#navbar-system')
    // 2.3 点击导航栏 系统服务 下拉 远程服务器设置 按钮
      .click('#navbar-system-server')
      .getText('#notice-bar')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.4 点击 用户设置 按钮
      .click('#server-user-setup')
      .getText('#notice-bar')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
      .setValue('#server-username', 'test@test.com.cn')
      .setValue('#server-password', '123456')
    // 2.5 点击登录按钮
      .click('#server-login')
      .pause(1000)
      // .waitUntilTextExists('#notice-bar', '远程服务用户登录成功')
      .getText('#notice-bar')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.6 点击 导航栏中 edit下拉 按钮
      .click('#navbar-edit')
      .waitUntilTextExists('#edit-editbar-input', '')
    // 2.6 点击 右侧工具栏 远程文件 按钮
      .click('#edit-rightbar-server')
      // .getText('#edit-rightpanellocal-table')
      // .then(function (editText) {
      //   console.log(editText);
      //   expect(editText).to.not.equal('');
      // })
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
      .pause(1000)
    // 2.7 点击 右侧 table 第一行 文件 列表
      .click('#edit-rightpanellocal-tr1')
      .getText('#edit-rightpanellocal-table')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.not.equal('');
      })
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
      .pause(1000)
      .click('#edit-rightpanellocal-tr2')
      .getText('#edit-leftpaneltable-table')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
      // .waitUntilTextExists('#notice-bar', '文件读取成功,但文件拥有者不允许修改')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
    // 2.3.2 点击左侧 第一行 td 删除按钮 edit-leftpaneltable-del0
      .click('#edit-rightbar-server')
      .click('#edit-leftpaneltable-del0')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
    // 2.3.2.1 点击保存按钮 edit-leftbar-preservation
      // .click('#edit-leftbar-preservation')
      // .getText('#edit-bar-prompt')
      // .then(function (editText) {
      //   // console.log(editText);
      //   expect(editText).to.be.an('string');
      // })
    // 2.3.3 点击左侧 第一行 td 编辑按钮 edit-leftpaneltable-edit0
      .click('#edit-leftpaneltable-edit0')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
      .click('#edit-editbar-input')
      .keys('\uE015')
      .setValue('#edit-editbar-input', '姓名 这是个名字')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.3.3 点击缓存 edit-leftbar-cache
      .click('#edit-leftbar-cache')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.3.3.1 点击右侧 本地按钮 左侧保存按钮
      // .click('#edit-rightbar-local')
      // .waitUntilTextExists('#edit-bar-prompt', '读取本地文件')
      // .click('#edit-leftbar-preservation')
      // .getText('#edit-bar-prompt')
      // .then(function (editText) {
      //   // console.log(editText);
      //   expect(editText).to.be.an('string');
      // })
    // 2.3.4 点击左侧 第一行 td 参考按钮 edit-leftpaneltable-ref0
      .click('#edit-rightbar-server')
      .click('#edit-leftpaneltable-ref0')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .getText('#edit-rightpanellocal-table')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.not.equal('');
      })
    // 2.3.5 点击左侧 第一行 td 下载 edit-leftpaneltable-dow
      .click('#edit-leftpaneltable-dow0')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
  });
});
