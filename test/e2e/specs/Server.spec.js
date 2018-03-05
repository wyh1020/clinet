import utils from '../utils';

describe('Server', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Server-测试1', function () {
    // this.timeout(5000);
    // 1、点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '未注册用户登陆！')
    // 2.1、本地文件导入
      .click('#navbar-system')
      .click('#navbar-system-local')
      .waitUntilTextExists('#notice-bar', '系统服务-本地文件导入')
      // 2.1.1、选择csv文件(server-load-loaclfile)
      .click('#server-load-loaclfile')
      // .waitUntilTextExists('#notice-bar', 'CSV文件读取成功！')
      .getHTML('.server-leftpanel')
      .then(function (leftpanel) {
        expect(leftpanel).to.be.an('array');
      })
      // 2.1.1.1、点击左侧列表，读取文件
      // .click('.server-leftpanel')
      // .waitUntilTextExists('#notice-bar', 'CSV文件读取成功！')
      // .getHTML('.server-load-rightpanel')
      // .then(function (rightpanel) {
      //   expect(rightpanel).to.be.an('array');
      // })
      // 2.1.2、选择数据表(server-choose-database)
      // .click('#server-choose-database')
      // .waitUntilTextExists('#notice-bar', 'CSV文件读取成功！')
      // .getHTML('.server-leftpanel')
      // .then(function (leftpanel) {
      //   expect(leftpanel).to.be.an('array');
      // })
      // 2.1.2.1、选择数据表后点击左侧列表，读取对照表数据
      // .click('.server-leftpanel')
      // .waitUntilTextExists('#notice-bar', 'CSV文件读取成功！')
      // .getHTML('.server-load-rightpanel')
      // .then(function (rightpanel) {
      //   expect(rightpanel).to.be.an('array');
      // })
      // 2.1.3、对照数据(server-contrast-data)
      // .click('#server-contrast-data')
      // .waitUntilTextExists('#notice-bar', '数据表读取成功！')
      // .getHTML('.server-leftpanel')
      // .then(function (leftpanel) {
      //   expect(leftpanel).to.be.an('array');
      // })
      // 2.1.3.1、选择对照数据后点击左侧列表
      // .click('.server-leftpanel')
      // .waitUntilTextExists('#notice-bar', 'CSV文件读取成功！')
      // .getHTML('.server-load-rightpanel')
      // .then(function (rightpanel) {
      //   expect(rightpanel).to.be.an('array');
      // })
      // 2.1.4、校验数据
      // 2.1.5、导入数据
      // 2.1.6、保存本地文件
      // 2.1.7、上传服务器数据
    // 2.2、远程服务器设置
      // 2.2.1、远程服务器列表，右侧显示远程测试服务器列表
      // .click('#navbar-system')
      // .click('#navbar-system-server')
      // .waitUntilTextExists('#notice-bar', '系统服务-远程服务器设置')
      // 2.2.2、点击用户设置，右侧显示用户基本信息
      // 2.2.3、点击机构设置，右侧弹出两个输入框，输入信息，点击添加机构按钮，按钮颜色状态发生改变
      // 2.2.4、点击人员设置，右侧弹出两个输入框，输入信息，点击添加人员按钮，按钮颜色状态发生改变
      // 2.2.5、远程服务功能设置
    // 2.3、DRG分组服务
      // .click('#navbar-system')
      // .click('#navbar-system-compdrg')
      // .waitUntilTextExists('#notice-bar', '系统服务-DRG分组服务')
      // 2.3.1、本地病案数据
      // 2.3.2、服务器病案数据
      // 2.3.3、校验数据
      // 2.3.4、调用drg分组服务
      // 2.3.5、查看drg分组结果
      // 2.3.6、查看drg分组规则
    // 2.4、DRG分析计算
      // .click('#navbar-system')
      // .click('#navbar-system-statdrg')
      // .waitUntilTextExists('#notice-bar', '系统服务-DRG分析计算')
      // 2.4.1、服务器病案数据
      // 2.4.2、选择分析指标
      // 2.4.3、选择分析维度
      // 2.4.4、开始计算
  })
});