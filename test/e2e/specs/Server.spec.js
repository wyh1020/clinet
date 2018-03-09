import utils from '../utils';

describe('Server', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Server-测试1', function () {
    this.timeout(38000);
    // 1、点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#edit-bar-prompt', '未注册用户登陆！')
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
      .click('.server-leftpanel')
      .waitUntilTextExists('#notice-bar', 'CSV文件读取成功！')
      .getText('.server-load-rightpanel-tr')
      .then(function (rightpanel) {
        expect(rightpanel).to.be.an('array');
      })
      // 2.1.2、点击选择数据表(server-choose-database)
      .click('#server-load-choosedb')
      // .waitUntilTextExists('#notice-bar', 'CSV文件读取成功！')
      .getHTML('.server-leftpanel')
      .then(function (leftpanel) {
        expect(leftpanel).to.be.an('array');
      })
      // 2.1.2.1、选择数据表后点击左侧列表，选择数据表
      .click('.server-leftpanel')
      .waitUntilTextExists('#notice-bar', '数据表读取成功！')
      .getHTML('.server-load-rightpanel-tr')
      .then(function (rightpanel) {
        expect(rightpanel).to.be.an('array');
      })
      // 2.1.3、点击对照数据(server-load-contrast)，点击右侧列表在点击左列表字段进行对照
      .click('#server-load-contrast')
      // .waitUntilTextExists('#notice-bar', '数据表读取成功！')
      .click('.server-load-rightpanel-tr')
      .click('.server-leftpanel')
      .getHTML('.server-load-rightpanel-tr')
      .then(function (rightpanel) {
        expect(rightpanel).to.be.an('array');
      })
      // 2.1.4、校验数据(server-load-checkdata)
      .click('#server-load-checkdata')
      .getHTML('.server-load-rightpanel-tr')
      .then(function (rightpanel) {
        expect(rightpanel).to.be.an('array');
      })
      // 2.1.5、导入数据(server-load-import)
      .click('#server-load-import')
      // 2.1.6、保存本地文件(server-load-savelocal)
      .click('#server-load-savelocal')
      // 2.1.7、上传服务器数据(server-load-uploaddata)
      .click('#server-load-uploaddata')
    // 2.2、远程服务器设置
      // 2.2.1、远程服务器列表，右侧显示远程测试服务器列表(server-remote-list)
      .click('#navbar-system')
      .click('#navbar-system-server')
      .waitUntilTextExists('#notice-bar', '系统服务-远程服务器设置')
      .click('#server-remote-list')
      .getHTML('.server-rightpanel-tr')
      .then(function (rightpanel) {
        expect(rightpanel).to.be.an('array');
      })
      // 2.2.2、点击用户设置(server-user-setup)，右侧显示用户基本信息
      .click('#server-user-setup')
      // 2.2.3、点击机构设置(server-org-setup)，右侧弹出两个输入框，输入信息，点击添加机构按钮，按钮颜色状态发生改变
      .click('#server-org-setup')
      // 2.2.4、点击人员设置(server-people-setup)，右侧弹出两个输入框，输入信息，点击添加人员按钮，按钮颜色状态发生改变
      .click('#server-people-setup')
      // 2.2.5、远程服务功能设置(server-remote-function-setup)
      .click('#server-remote-function-setup')
    // 2.3、DRG分组服务
      .click('#navbar-system')
      .click('#navbar-system-compdrg')
      .waitUntilTextExists('#notice-bar', '系统服务-DRG分组服务')
      // 2.3.1、本地病案数据(server-drg-localcase-data)
      .click('#server-drg-localcase-data')
      // 2.3.2、服务器病案数据(server-drg-sercase-data)
      .click('#server-drg-sercase-data')
      // 2.3.3、校验数据(server-drg-checkdata)
      .click('#server-drg-checkdata')
      // 2.3.4、调用drg分组服务(server-drg-comp)
      .click('#server-drg-comp')
      // 2.3.5、停止drg分组服务(server-drg-stop)
      .click('#server-drg-stop')
      // 2.3.6、查看drg分组规则(server-drg-rule)
      .click('#server-drg-rule')
    // 2.4、DRG分析计算
      .click('#navbar-system')
      .click('#navbar-system-statdrg')
      .waitUntilTextExists('#notice-bar', '系统服务-DRG分析计算')
      // 2.4.1、服务器病案数据(server-stat-case-data)
      .click('#server-stat-case-data')
      // 2.4.2、选择分析指标(server-stat-choose-index)
      .click('#server-stat-choose-index')
      // 2.4.3、选择分析维度(server-stat-choose-stat)
      .click('#server-stat-choose-stat')
      // 2.4.4、开始计算(server-stat-start-count)
      .click('#server-stat-start-count')
  })
});
