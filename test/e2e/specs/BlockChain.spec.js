import utils from '../utils';

describe('BlockChain', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('BlockChain-测试1', function () {
    // 1、点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '未注册用户登陆！')
    // 2.1、服务器节点设置
      .click('#navbar-block')
      .click('#navbar-block-server')
      .waitUntilTextExists('#notice-bar', '区块链服务-服务器节点设置')
      // 2.1.1、服务器节点列表
      // 2.1.2、设置连接节点
      // 2.1.3、区块链服务介绍
      // 2.1.4、区块链服务功能列表
    // 2.2、账户设置
      .click('#navbar-block')
      .click('#navbar-block-account')
      .waitUntilTextExists('#notice-bar', '区块链服务-账户设置')
      // 2.2.1、账户设置
      // 2.2.2、账户余额
      // 2.2.3、转账交易
      // 2.2.4、账户交易记录
    // 2.3、区块查询
      .click('#navbar-block')
      .click('#navbar-block-block')
      .waitUntilTextExists('#notice-bar', '区块链服务-区块查询')
      // 2.3.1、区块列表
      // 2.3.2、区块内容
      // 2.3.3、区块内容明细
    // 2.4、DRG分组服务
      .click('#navbar-block')
      .click('#navbar-block-compdrg')
      .waitUntilTextExists('#notice-bar', '区块链服务-DRG分组服务')
      // 2.4.1、本地病案数据
      // 2.4.2、服务器病案数据
      // 2.4.3、校验数据
      // 2.4.4、调用drg分组服务
      // 2.4.5、查看drg分组服务
      // 2.4.6、查看drg分组规则
    // 2.5、DRG分析计算
      .click('#navbar-block')
      .click('#navbar-block-statdrg')
      .waitUntilTextExists('#notice-bar', '区块链服务-DRG分析计算')
      // 2.5.1、服务器病案数据
      // 2.5.2、选择分析指标
      // 2.5.3、选择分析维度
      // 2.5.4、开始计算
  })
});
