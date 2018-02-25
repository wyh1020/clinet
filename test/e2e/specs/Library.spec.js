import utils from '../utils';

describe('Library', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Library-测试1', function () {
    // 点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '未注册用户登陆！')
    // 点击顶部导航栏的navbar-libary，进入libary页
      .click('#navbar-library')
      .waitUntilTextExists('#notice-bar', '系统通知：术语字典-术语字典')
    // 点击工具栏的本地文件(local-file)，浏览本地文件
      .click('#library-local-file')
      .waitUntilTextExists('#library-leftpanel', '术语字典文件')
    // 点击左侧列表(library-leftlist)，读取文件内容
      .click('#library-leftlist')
      .waitUntilTextExists('#notice-bar', 'CSV文件读取成功！')
  })
});
