import utils from '../utils';

describe('BlockChain', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('BlockChain-测试1', function () {
    this.timeout(60000)
    // 1、点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '未注册用户登陆！')
    // 2.1、点击服务器节点设置
      .click('#navbar-block')
      .click('#navbar-block-server')
      // .waitUntilTextExists('#notice-bar', '区块链服务-服务器节点设置')
      // 2.1.1、点击服务器节点列表(block-get-servers)
      // .click('#block-get-servers')
      // .getText('.block-rightpanel-server-tr')
      // .then(function (rightpanel) {
      //   expect(rightpanel).to.be.an('array');
      // })
      // .click('.block-rightpanel-server-td')
      // 2.1.2、点击设置连接节点(block-set-nodes)
      // .click('#block-set-nodes')
      // .waitUntilTextExists('#notice-bar', '设置连接节点')
      // 2.1.3、点击区块链服务介绍(block-chain-info)
      .click('#block-chain-info')
      // .getText('#block-server-introduce')
      // .then(function (introduce) {
      //   expect(introduce).to.be.an('string');
      // })
      // 2.1.4、点击区块链服务功能列表(block-chain-function)
      .click('#block-chain-function')
    // 2.2、点击账户设置
      // 2.2.1、点击账户设置(block-user-setup)
      .click('#navbar-system')
      .click('#navbar-system-server')
      .click('#server-user-setup')
      .click('#server-login')
      .click('#navbar-block')
      .click('#navbar-block-account')
      .click('#block-user-setup')
      // .waitUntilTextExists('#notice-bar', '区块链服务登录成功!')
      // 2.2.2、点击账户余额(block-user-account)
      .click('#block-user-account')
      // 2.2.3、点击转账交易(block-user-transaction)
      .click('#block-user-transaction')
      // 2.2.4、点击账户交易记录(block-user-trans-record)
      .click('#block-user-trans-record')
      // .getText('#block-user-transRecord')
      // .then(function (transRecord) {
      //   console.log(transRecord);
      //   expect(transRecord).to.be.an('string');
      // })
    // 2.3、点击区块查询
      .click('#navbar-block')
      .click('#navbar-block-block')
      // 2.3.1、点击区块列表(block-list)
      .click('#block-list')
      // 2.3.2、点击区块内容(block-content)
      // .click('#block-content')
      // .waitUntilTextExists('#notice-bar', '区块内容')
      // 2.3.3、点击区块内容明细(block-info)
      .click('#block-info')
    // 2.4、点击DRG分组服务
      // .click('#navbar-block')
      // .click('#navbar-block-compdrg')
      // .waitUntilTextExists('#notice-bar', '区块链服务-DRG分组服务')
      // 2.4.1、点击本地病案数据(block-local-data)
      // .click('#block-local-data')
      // .waitUntilTextExists('#notice-bar', '本地病案数据')
      // 2.4.2、点击服务器病案数据(block-server-data)
      // .click('#block-server-data')
      // .waitUntilTextExists('#notice-bar', '服务器病案数据')
      // 2.4.3、点击校验数据(block-check-data)
      // .click('#block-check-data')
      // .waitUntilTextExists('#notice-bar', '校验数据')
      // 2.4.4、点击调用drg分组服务(block-comp-drg)
      // .click('#block-comp-drg')
      // .waitUntilTextExists('#notice-bar', '调用drg分组服务')
      // 2.4.5、点击查看drg分组服务(block-drg-result)
      // .click('#block-drg-result')
      // .waitUntilTextExists('#notice-bar', '查看drg分组服务')
      // 2.4.6、点击查看drg分组规则(block-drg-rule)
      // .click('#block-drg-rule')
      // .waitUntilTextExists('#notice-bar', '查看drg分组规则')
    // 2.5、点击DRG分析计算
      // .click('#navbar-block')
      // .click('#navbar-block-statdrg')
      // .waitUntilTextExists('#notice-bar', '区块链服务-DRG分析计算')
      // 2.5.1、点击服务器病案数据(block-server-stat-data)
      // .click('#block-server-stat-data')
      // .waitUntilTextExists('#notice-bar', '服务器病案数据')
      // 2.5.2、点击选择分析指标(block-get-index)
      // .click('#block-get-index')
      // .waitUntilTextExists('#notice-bar', '选择分析指标')
      // 2.5.3、点击选择分析维度(block-get-dimension)
      // .click('#block-get-dimension')
      // .waitUntilTextExists('#notice-bar', '选择分析维度')
      // 2.5.4、点击开始计算(block-comp-stat)
      // .click('#block-comp-stat')
      // .waitUntilTextExists('#notice-bar', '开始计算')
  })
});
