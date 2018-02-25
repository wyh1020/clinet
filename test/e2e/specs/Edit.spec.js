import utils from '../utils';

describe('Edit', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Edit-测试1', function () {
    // 1、点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '未注册用户登陆！')
    // 2、点击顶部导航栏的edit-page，进入edit页
      .click('#navbar-edit')
      .waitUntilTextExists('#edit-input', '')
    // 底部输入框edit-input的内容为空
      .getText('#edit-input')
      .then(function (editText) {
        // console.log(`editText: ${editText}`)
        expect(editText).to.equal('');
      })
    // 2.1、左返回
    // 2.2、左选择
    // 2.3、左新建
    // 2.4、左保存、
    // 2.5、左另存
    // 2.6、左删除
    // 2.7、左写文件
    // 2.8、右选择
    // 2.9、右帮助
    // 2.10、右本地
    // 2.11、右远程
    // 2.12、右CDA
    // 2.13、右新文件
    // 2.14、右前页
    // 2.15、右后页
    // 2.16、左查询
    // 2.17、右查询
    // 2.18、底部输入框
  })
});
