import utils from '../utils';

describe('Library', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Library-测试1', function () {
    // 1、点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '未注册用户登陆！')
    // 2、点击顶部导航栏的navbar-libary，进入libary页
      .click('#navbar-library')
      .waitUntilTextExists('#notice-bar', '系统通知：术语字典-术语字典')
    // 2.1、点击工具栏的本地文件(local-file)，浏览本地文件
      .click('#library-local-file')
      .waitUntilTextExists('#notice-bar', '本地文件')
    // 2.1.1、点击左侧列表(library-leftlist)，读取文件内容
      .click('#library-leftlist')
      .waitUntilTextExists('#notice-bar', 'CSV文件读取成功！')

    // 2.2、点击工具栏的远程文件(remote-file)，浏览远程文件
      .click('#library-remote-file')
      .waitUntilTextExists('#notice-bar', '远程文件')
    // 2.3、点击工具栏的编辑数据(remote-file)，浏览远程文件
      .click('#library-edit')
      .waitUntilTextExists('#edit-input', '')
    // 2.4、前页
    // 2.5、后页
    // 2.6、维度选择
    // 2.6.1、机构
    // 2.6.2、时间
    // 2.6.3、版本
    // 2.6.4、添加列维度
  })
});
