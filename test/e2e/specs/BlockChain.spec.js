import utils from '../utils';

describe('BlockChain', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('BlockChain-测试1', function () {
    // 点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '未注册用户登陆！')
    // 点击顶部导航栏的navbar-block，进入block页
      .click('#navbar-block')
      .click('#navbar-block-server')
      .waitUntilTextExists('#notice-bar', '区块链服务-服务器节点设置')
      // todo:点击工具栏
      .click('#navbar-block')
      .click('#navbar-block-account')
      .waitUntilTextExists('#notice-bar', '区块链服务-账户设置')
      // todo:点击工具栏
      .click('#navbar-block')
      .click('#navbar-block-block')
      .waitUntilTextExists('#notice-bar', '区块链服务-区块查询')
      // todo:点击工具栏
      .click('#navbar-block')
      .click('#navbar-block-compdrg')
      .waitUntilTextExists('#notice-bar', '区块链服务-DRG分组服务')
      // todo:点击工具栏
      .click('#navbar-block')
      .click('#navbar-block-statdrg')
      .waitUntilTextExists('#notice-bar', '区块链服务-DRG分析计算')
      // todo:点击工具栏
  })
});
