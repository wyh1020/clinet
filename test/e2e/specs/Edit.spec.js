import utils from '../utils';

describe('Edit', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Edit-测试1', function () {
    this.timeout(60000)
    // 1、点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '未注册用户登陆！')
    // 2、点击顶部导航栏的edit-page，进入edit页
      .click('#navbar-edit')
      .waitUntilTextExists('#edit-editbar-input', '')
    // 底部输入框edit-editbar-input的内容为空
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('');
      })
    // --------------------- 不点击左侧自定义下拉 -----------------------------------
    // 2.1 直接点击编辑按钮
    // 2.1.1 直接点击保存按钮
      .click('#edit-leftbar-preservation')
      .getText('#edit-editbar-input')
      .then(function (preservation) {
        expect(preservation).to.be.an('string');
      })
    // 2.1.2 直接点击前页按钮
      .click('#edit-leftbar-uppage')
      .getText('#edit-editbar-input')
      .then(function (uppage) {
        expect(uppage).to.be.an('string');
      })
    // 2.1.3 直接点击后页按钮
      .click('#edit-leftbar-downpage')
      .getText('#edit-editbar-input')
      .then(function (downpage) {
        expect(downpage).to.be.an('string');
      })
    // --------------------- 不点击左侧自定义下拉 点击右侧工具栏 -----------------------------------
    // 2.1.4.1、点击下拉菜单 编辑器使用帮助 edit-rightbar-editorHelp
      .click('#edit-rightbar-choice')
      .hasFocus('[aria-labelledby="edit-rightbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-rightbar-sel')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.1.4.2、点击下拉菜单 输入提示 edit-rightbar-输入提示
      .click('#edit-rightbar-输入提示')
      // .waitUntilTextExists('#edit-bar-prompt', '输入提示')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.1.4.3、点击下拉菜单 病案参考 edit-rightbar-病案参考
      .click('#edit-rightbar-choice')
      .hasFocus('[aria-labelledby="edit-rightbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-rightbar-sel')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-rightbar-病案参考')
      // .waitUntilTextExists('#edit-bar-prompt', '病案参考')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.1.4.4、点击下拉菜单 病案历史 edit-rightbar-病案历史
      .click('#edit-rightbar-choice')
      .hasFocus('[aria-labelledby="edit-rightbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-rightbar-sel')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-rightbar-病案历史')
      // .waitUntilTextExists('#edit-bar-prompt', '病案历史')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.1.4.5、点击下拉菜单 在线交流 edit-rightbar-在线交流
      .click('#edit-rightbar-choice')
      .hasFocus('[aria-labelledby="edit-rightbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-rightbar-sel')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-rightbar-在线交流')
      // .waitUntilTextExists('#edit-bar-prompt', '在线交流')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.1.4.6、点击下拉菜单 DRG分析 edit-rightbar-DRG分析
      .click('#edit-rightbar-choice')
      .hasFocus('[aria-labelledby="edit-rightbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-rightbar-sel')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-rightbar-DRG分析')
      // .waitUntilTextExists('#edit-bar-prompt', 'drg分析')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.1.4.7、点击下拉菜单 HIS接口 edit-rightbar-HIS接口
      .click('#edit-rightbar-choice')
      .hasFocus('[aria-labelledby="edit-rightbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-rightbar-sel')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-rightbar-HIS接口')
      // .waitUntilTextExists('#edit-bar-prompt', 'HIS接口')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.1.5 点击辅助按钮 edit-rightbar-help
      .click('#edit-rightbar-help')
      // .waitUntilTextExists('#edit-bar-prompt', '编辑器使用帮助')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.1.6 点击本地文件按钮
      .click('#edit-rightbar-local')
      .waitUntilTextExists('#edit-bar-prompt', '读取本地文件')
      // .then(function (editText) {
      //   console.log(editText);
      //   // expect(editText).to.be.an('string');
      // })
      // .getText('.edit-rightpanellocal-tr')
      .getText('#edit-rightpanellocal-table')
      .then(function (editText) {
        expect(editText).to.not.equal('');
      })
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
      .click('#edit-rightpanellocal-tr0')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
    // 2.1.7 点击远程文件按钮
      .click('#edit-rightbar-server')
      .waitUntilTextExists('#edit-bar-prompt', '未登录用户,请在系统服务-用户设置内登录')
    // 2.1.8 点击前页按钮
      .click('#edit-rightbar-uppage')
      .getText('#edit-editbar-input')
      .then(function (uppage) {
        expect(uppage).to.be.an('string');
      })
    // 2.1.9 点击后页按钮
      .click('#edit-rightbar-downpage')
      .getText('#edit-editbar-input')
      .then(function (downpage) {
        expect(downpage).to.be.an('string');
      })
    // --------------------- 点击左侧自定义下拉 -----------------------------------
    // 2.2、点击左侧工具栏 自定义文档下拉按钮 edit-leftbar-choice
      .click('#edit-leftbar-choice')
      .hasFocus('[aria-labelledby="edit-leftbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-leftbar-sel')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.2.1 点击下拉菜单 病案首页(卫统四csv)按钮 edit-leftbar-病案首页（卫统四CSV）
      .click('#edit-leftbar-病案首页（卫统四CSV）')
      // .waitUntilTextExists('#edit-bar-prompt', '病案首页')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.2.2 点击下拉菜单病案首页(卫统四csv)按钮 点击缓存 edit-leftbar-cache
      // .click('#edit-leftbar-cache')
      // .getText('#edit-bar-prompt')
      // .then(function (editText) {
      //   expect(editText).to.be.an('string');
      // })
    // 2.2.3点击右侧 本地按钮 左侧保存按钮
      .click('#edit-rightbar-local')
      .waitUntilTextExists('#edit-bar-prompt', '读取本地文件')
      .click('#edit-leftbar-preservation')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
    // 2.2.1.1 点击下拉菜单入院申请按钮 edit-leftbar-入院申请
      .click('#edit-leftbar-choice')
      .hasFocus('[aria-labelledby="edit-leftbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('');
      })
      .getText('#edit-leftbar-sel')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-leftbar-入院申请')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.2.1.2 点击下拉菜单入院申请按钮 点击缓存 edit-leftbar-cache
      // .click('#edit-leftbar-cache')
      // .getText('#edit-bar-prompt')
      // .then(function (editText) {
      //   expect(editText).to.be.an('string');
      // })
    // 2.2.1.3点击右侧 本地按钮 左侧保存按钮
      .click('#edit-rightbar-local')
      .waitUntilTextExists('#edit-bar-prompt', '读取本地文件')
      .click('#edit-leftbar-preservation')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
    // 2.2.1.1.1 点击下拉菜单 首次病程按钮 edit-leftbar-首次病程
      .click('#edit-leftbar-choice')
      .hasFocus('[aria-labelledby="edit-leftbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-leftbar-sel')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-leftbar-首次病程')
      // .waitUntilTextExists('#edit-bar-prompt', '首次病程')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // // 2.2.1.1.2 点击下拉菜单首次病程按钮 点击缓存 edit-leftbar-cache
    //   .click('#edit-leftbar-cache')
    //   .getText('#edit-bar-prompt')
    //   .then(function (editText) {
    //     expect(editText).to.be.an('string');
    //   })
    // 2.2.1.1.3点击右侧 本地按钮 左侧保存按钮
      .click('#edit-rightbar-local')
      .waitUntilTextExists('#edit-bar-prompt', '读取本地文件')
      .click('#edit-leftbar-preservation')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
    // 2.2.1.1.1.1 点击下拉菜单 病程记录按钮 edit-leftbar-病程记录
      .click('#edit-leftbar-choice')
      .hasFocus('[aria-labelledby="edit-leftbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-leftbar-sel')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-leftbar-病程记录')
      // .waitUntilTextExists('#edit-bar-prompt', '病程记录')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.2.1.1.1.2 点击下拉菜单病程记录按钮 点击缓存 edit-leftbar-cache
      // .click('#edit-leftbar-cache')
      // .getText('#edit-bar-prompt')
      // .then(function (editText) {
      //   expect(editText).to.be.an('string');
      // })
    // 2.2.1.1.1.3点击右侧 本地按钮 左侧保存按钮
      .click('#edit-rightbar-local')
      .waitUntilTextExists('#edit-bar-prompt', '读取本地文件')
      .click('#edit-leftbar-preservation')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
    // 2.2.1.1.1.1.1 点击下拉菜单 病案首页按钮 edit-leftbar-病案首页
      .click('#edit-leftbar-choice')
      .hasFocus('[aria-labelledby="edit-leftbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-leftbar-sel')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-leftbar-病案首页')
      // .waitUntilTextExists('#edit-bar-prompt', '病案首页')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.2.1.1.1.1.1.2 点击下拉菜单病案首页按钮 点击缓存 edit-leftbar-cache
      // .click('#edit-leftbar-cache')
      // .getText('#edit-bar-prompt')
      // .then(function (editText) {
      //   expect(editText).to.be.an('string');
      // })
    // 2.2.1.1.1.1.1.3点击右侧 本地按钮 左侧保存按钮
      .click('#edit-rightbar-local')
      .waitUntilTextExists('#edit-bar-prompt', '读取本地文件')
      .click('#edit-leftbar-preservation')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
    // 2.2.1.1.1.1.1.1 点击下拉菜单 门诊病案按钮 edit-leftbar-门诊病案
      .click('#edit-leftbar-choice')
      .hasFocus('[aria-labelledby="edit-leftbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-leftbar-sel')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-leftbar-门诊病案')
      // .waitUntilTextExists('#edit-bar-prompt', '门诊病案')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.2.1.1.1.1.1.2 点击下拉菜单门诊病案按钮 点击缓存 edit-leftbar-cache
      // .click('#edit-leftbar-cache')
      // .getText('#edit-bar-prompt')
      // .then(function (editText) {
      //   expect(editText).to.be.an('string');
      // })
    // 2.2.1.1.1.1.1.3点击右侧 本地按钮 左侧保存按钮
      .click('#edit-rightbar-local')
      .waitUntilTextExists('#edit-bar-prompt', '读取本地文件')
      .click('#edit-leftbar-preservation')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
    // 2.2.1.1.1.1.1.1.1 点击下拉菜单 健康体检按钮 edit-leftbar-健康体检
      .click('#edit-leftbar-choice')
      .hasFocus('[aria-labelledby="edit-leftbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-leftbar-sel')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#edit-leftbar-健康体检')
      // .waitUntilTextExists('#edit-bar-prompt', '健康体检')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.2.1.1.1.1.1.1.2 点击下拉菜单健康体检按钮 点击缓存 edit-leftbar-cache
      // .click('#edit-leftbar-cache')
      // .getText('#edit-bar-prompt')
      // .then(function (editText) {
      //   expect(editText).to.be.an('string');
      // })
    // 2.2.1.1.1.1.1.1.3点击右侧 本地按钮 左侧保存按钮
      .click('#edit-rightbar-local')
      .waitUntilTextExists('#edit-bar-prompt', '读取本地文件')
      .click('#edit-leftbar-preservation')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
    // 2.16、点击左侧工具栏输入框 回车结束 查询
    // 2.17、点击右侧工具栏输入框 回车结束 查询
    // // 2.18、底部输入框
    //   .click('#edit-editbar-input')
    //   .setValue('#edit-editbar-input', '民族 ')
    //   .getText('#edit-bar-prompt')
    //   .then(function (editText) {
    //     expect(editText).to.be.an('string');
    //   })
    //   // 快捷键ctrl + 2
    //   .waitUntilWindowLoaded(2000)
    //   .keys('\uE009')
    //   .keys('\uE01C')
    //   .getValue('#edit-editbar-input')
    //   .then(function (editText) {
    //     // console.log(editText)
    //     expect(editText).to.be.an('string');
    //   })
    //   // 快捷键ctrl + 0
    //   .waitUntilWindowLoaded(2000)
    //   .keys('\uE009')
    //   .keys('\uE01A')
    //   .getText('#edit-bar-prompt')
    //   .then(function (editText) {
    //     // console.log(editText)
    //     expect(editText).to.be.an('string');
    //   })
    //   // 快捷键ctrl + .
    //   .waitUntilWindowLoaded(2000)
    //   .keys('\uE009')
    //   .keys('\uE028')
    //   .getText('#edit-bar-prompt')
    //   .then(function (editText) {
    //     // console.log(editText)
    //     expect(editText).to.be.an('string');
    //   })
  })
});

