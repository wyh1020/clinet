import utils from '../utils';

describe('Library', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Library-测试1', function () {
    // 点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '未注册用户登陆！')
      .getText('#notice-bar')
      .then(function (noticeText) {
        console.log(noticeText)
        expect(noticeText).to.equal('系统通知：未注册用户登陆！');
      })
    // 点击顶部导航栏的libary-page，进入libary页
      .click('#library-page')
      .waitUntilTextExists('#notice-bar', '未注册用户登陆！')
      .getText('#notice-bar')
      .then(function (noticeText) {
        console.log(noticeText)
        expect(noticeText).to.equal('系统通知：未注册用户登陆！');
      })
    // 点击工具栏的本地文件(local-file)，浏览本地文件
      .click('#local-file')
      .waitUntilTextExists('#library-leftpanel', '术语字典文件')
      .getText('#library-leftpanel')
      .then(function (leftpanel) {
        console.log(leftpanel)
        expect(leftpanel).to.equal('术语字典文件');
      })
    // 点击左侧列表(library-leftlist)，读取文件内容
      .click('#library-leftlist')
      // .waitUntilTextExists('#library-rightpanel', '未注册用户登陆！')
      // .getText('#library-rightpanel')
      // .then(function (rightpanel) {
      //   console.log(rightpanel)
      //   // expect(noticeText).to.equal('系统通知：未注册用户登陆！');
      // })
      .waitUntilTextExists('#notice-bar', 'CSV文件读取成功！')
      .getText('#notice-bar')
      .then(function (noticeText) {
        console.log(noticeText)
        expect(noticeText).to.equal('系统通知：CSV文件读取成功！');
      })
  })
});
