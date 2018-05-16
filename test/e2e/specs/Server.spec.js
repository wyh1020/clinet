import utils from '../utils';

describe('Server', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Server-测试1', function () {
    this.timeout(38000);
    // 1、点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '未注册用户登陆！')
    // 2.1、点击本地文件导入
      .click('#navbar-system')
      .click('#navbar-system-local')
      // .waitUntilTextExists('#notice-bar', '系统服务-本地文件导入')
      // 2.1.1、点击选择csv文件(server-load-loaclfile)，左侧列表显示clinet-data下所有csv文件
      .click('#server-load-loaclfile')
      .getHTML('.server-leftpanel')
      .then(function (leftpanel) {
        expect(leftpanel).to.be.an('array');
      })
      // 2.1.1.1、点击左侧列表，读取文件，底部提示显示csv文件读取成功！
      .click('.server-leftpanel')
      .waitUntilTextExists('#notice-bar', 'CSV文件读取成功！')
      .getText('.server-load-rightpanel-tr')
      .then(function (rightpanel) {
        expect(rightpanel).to.be.an('array');
      })
      // 2.1.2、点击选择数据表(server-choose-database)，左侧列表显示对照所需要的所有对照表
      .click('#server-load-choosedb')
      .getHTML('.server-leftpanel')
      .then(function (leftpanel) {
        expect(leftpanel).to.be.an('array');
      })
      // 2.1.2.1、选择数据表显示后点击左侧列表，选择想要对照的数据表，底部提示框显示数据表读取成功！
      .click('.server-leftpanel')
      .waitUntilTextExists('#notice-bar', '数据表读取成功！')
      .getHTML('.server-load-rightpanel-tr')
      .then(function (rightpanel) {
        expect(rightpanel).to.be.an('array');
      })
      // 2.1.3、点击对照数据(server-load-contrast)，点击右侧列表之后点击左列表字段进行对照
      .click('#server-load-contrast')
      .click('.server-load-rightpanel-tr')
      .click('.server-leftpanel')
      .getHTML('.server-load-rightpanel-tr')
      .then(function (rightpanel) {
        expect(rightpanel).to.be.an('array');
      })
      // 2.1.4、点击校验数据(server-load-checkdata)，把前一步对照好的数据进行校验，校验完后后，底部提示框显示数据校验完成！
      .click('#server-load-checkdata')
      .getHTML('.server-load-rightpanel-tr')
      .then(function (rightpanel) {
        expect(rightpanel).to.be.an('array');
      })
      // 2.1.7、点击编辑数据(server-load-editdata)，把当前数据转入到编辑模块，对数据进行修改
      .click('#server-load-editdata')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('');
      })
      .click('#edit-leftbar-back')
      // 2.1.8、点击上传服务器数据(server-load-uploaddata)，把数据传到服务器上，在服务器上可以进行统计计算等服务
      .click('#server-load-uploaddata')
      // 2.1.8、点击前页
      .click('#server-load-uppage')
      // 2.1.9、点击后页
      .click('#server-load-downpage')
      // 2.1.10、点击左页
      .click('#server-load-leftpage')
      // 2.1.11、点击右页
      .click('#server-load-rightpage')
    // 2.2、远程服务器设置
      // 2.2.1、远程服务器列表，右侧显示远程测试服务器列表(server-remote-list)
      .click('#navbar-system')
      .click('#navbar-system-server')
      .click('#server-remote-list')
      // 2.2.1.1、选择右侧列表中一个远程服务器(server-rightpanel-tr)，连接远程服务器，底部提示框显示远程服务器连接成功！
      .click('#system-td-tr1')
      .getHTML('.server-rightpanel-tr')
      .then(function (rightpanel) {
        expect(rightpanel).to.be.an('array');
      })
      // 2.2.2、点击用户设置(server-user-setup)，右侧显示用户基本信息
      .click('#server-user-setup')
      .setValue('#server-username', 'test@hitb.com.cn')
      .setValue('#server-password', '123456')
      .click('#server-login')
      .waitUntilTextExists('#notice-bar', '远程服务用户登录成功')
      // 2.2.3、点击修改(server-user-change)
      .click('#server-user-change')
      // 2.2.4、点击确认修改(server-user-ischange)
      .click('#server-user-ischange')
      .click('#server-user-setup')
      // 2.2.5、点击文件权限修改(server-user-changepower)
      .click('#server-user-changepower')
      // 2.2.6、点击机构设置(server-org-setup)，右侧弹出两个输入框，输入信息，点击添加机构按钮，按钮颜色状态发生改变
      .click('#server-org-setup')
      // 2.2.7、点击新建机构设置(server-user-addorg)
      .click('#server-user-neworg')
      // .setValue('#InputOrgCode', '123456')
      // .setValue('#InputOrgName', '123456')
      // .setValue('#InputOrgLevel', '123456')
      // .setValue('#InputOrgType', '123456')
      // .click('#InputOrgProvince')
      // .click('#server-org-province-tr0')
      // .click('#InputOrgCity')
      // .click('#server-org-city-tr0')
      // .click('#InputOrgCity')
      // .click('#server-org-county-tr0')
      // .setValue('#InputOrgPerson_name', '123456')
      // .setValue('#InputOrgTel', '17610513713')
      // .setValue('#InputOrgEmail', '993939137@qq.com')
      // 2.2.8、点击添加机构(server-user-addorg)
      // .click('#server-user-neworg')
      // .waitUntilTextExists('#notice-bar', '机构创建成功')
      // 2.2.6、点击科室设置(server-org-setup)，右侧弹出两个输入框，输入信息，点击添加科室按钮，按钮颜色状态发生改变
      .click('#server-org-setup')
      // 2.2.7、点击新建科室设置(server-user-adddep)
      // .click('#server-user-newdep')
      // .setValue('#InputOrgCode', '123456')
      // .setValue('#InputOrgName', '123456')
      // .setValue('#InputOrgLevel', '123456')
      // .setValue('#InputOrgType', '123456')
      // .click('#InputOrgProvince')
      // .click('#server-org-province-tr0')
      // .click('#InputOrgCity')
      // .click('#server-org-city-tr0')
      // .click('#InputOrgCity')
      // .click('#server-org-county-tr0')
      // .setValue('#InputOrgPerson_name', '123456')
      // .setValue('#InputOrgTel', '17610513713')
      // .setValue('#InputOrgEmail', '993939137@qq.com')
      // 2.2.8、点击添加科室(server-user-adddep)
      // .click('#server-user-newdep')
      // .waitUntilTextExists('#notice-bar', '科室创建成功')
      // 2.2.4、点击人员设置(server-people-setup)，右侧弹出两个输入框，输入信息，点击添加人员按钮，按钮颜色状态发生改变
      // .click('#server-people-setup')
    // 2.3、点击DRG分组服务
      .click('#navbar-system')
      .click('#navbar-system-compdrg')
      // 2.3.1、点击本地病案数据(server-drg-localcase-data)，左侧列表显示本地病案数据
      .click('#server-drg-localcase-data')
      // 2.3.1.1、点击左侧列表，右侧显示本地病历详细信息
      // 2.3.2、点击服务器病案数据(server-drg-sercase-data)，左侧列表显示服务器病案数据
      // 2.3.2.1、点击左侧列表，右侧显示服务器病历详细信息
      .click('#server-drg-sercase-data')
      // 2.3.3、点击校验数据(server-drg-checkdata)，校验病历数据
      .click('#server-drg-checkdata')
      // 2.3.4、点击调用drg分组服务(server-drg-comp)，校验后的数据进行drg分组计算，分组完成后，底部提示框中显示分组计算完成！
      .click('#server-drg-comp')
      // 2.3.5、点击停止drg分组服务(server-drg-stop)，停止调用分组服务
      // .click('#server-drg-stop')
      // 2.3.6、点击查看drg分组规则(server-drg-rule)，分组计算完成后查看分组结果
      .click('#server-drg-rule')
    // 2.4、DRG分析计算
      .click('#navbar-system')
      .click('#navbar-system-statdrg')
      // 2.4.1、点击服务器病案数据(server-stat-case-data)，左侧列表显示服务器病案数据
      .click('#server-stat-case-data')
      // 2.4.2、点击选择分析指标(server-stat-choose-index)，左侧列表显示各项指标
      // 2.4.2.1、点击左侧列表各项指标
      .click('#server-stat-choose-index')
      // 2.4.3、点击选择分析维度(server-stat-choose-stat)，左侧列表显示各项维度
      // 2.4.3.1、点击左侧列表各项维度
      .click('#server-stat-choose-stat')
      // 2.4.4、点击开始计算(server-stat-start-count)，之前选的指标与维度作为条件进行计算
      .click('#server-stat-start-count')
  })
});
