import utils from '../utils';

describe('Launch', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  // 系统正常启动
  it('Launch-测试1', function () {
    return this.app.client.browserWindow.isVisible()
      .then((isVisible) => {
        assert.equal(isVisible, true)
      })
      // 获取title
      .getTitle()
      .then((title) => {
        expect(title).to.equal('clinet---医生工作站，应用区块链技术，连接成clinic-net');
      })
      // 获取底部通知栏内容
      .getText('#notice-bar')
      .then(function (noticeText) {
        expect(noticeText).to.equal('系统通知：未注册用户可以直接登陆！使用单机版功能！用户注册可以选择远程服务或者区块链服务！');
      })
  });
});


// 对于端到端测试，electron-vue 使用 Spectron 和 测试框架 Mocha (以及 Chai)。Mocha 和 Chai 的 API (包括 expect、should 以及 assert 在内) 均在全局范围内可用
// https://electronjs.org/spectron
// The client API is WebdriverIO's browser object.
// http://webdriver.io/api.html
// https://github.com/electron/spectron
// E2E 测试的常用操作如下：
// 打开网页，跳转网页：打开 login, home, edit, stat, library, server, blockchain等等；
// 填写输入框，提交表单：键入搜索词，提交搜索表单；
// 元素单击等操作：单击搜索结果的第一项；
// 元素数量、属性检视：确认搜索结果展示了 10 条；
// 页面运行环境检视：确认页面的地址是正确的；
