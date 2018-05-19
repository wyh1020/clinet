import utils from '../utils';

describe('EditLocalFile', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Edit-本地文件测试1', function () {
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
    // -----------------只点击 本地文件按钮 不点击文件列表---------------------------------
      .click('#edit-rightbar-local')
      .waitUntilTextExists('#edit-bar-prompt', '读取本地文件')
    // -----------------右侧侧下拉点击-----------------
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
    // 2.1.4.2、点击下拉菜单 输入框提示 edit-rightbar-inputPrompt
      .click('#edit-rightbar-inputPrompt')
      // .waitUntilTextExists('#edit-bar-prompt', '输入框提示')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.1.4.3、点击下拉菜单 病案参考 edit-rightbar-medicalRefer
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
      .click('#edit-rightbar-medicalRefer')
      // .waitUntilTextExists('#edit-bar-prompt', '病案参考')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.1.4.4、点击下拉菜单 病案历史 edit-rightbar-medicalHistory
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
      .click('#edit-rightbar-medicalHistory')
      // .waitUntilTextExists('#edit-bar-prompt', '病案历史')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.1.4.5、点击下拉菜单 在线交流 edit-rightbar-onlineSay
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
      .click('#edit-rightbar-onlineSay')
      // .waitUntilTextExists('#edit-bar-prompt', '在线交流')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.1.4.6、点击下拉菜单 DRG分析 edit-rightbar-drgStat
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
      .click('#edit-rightbar-drgStat')
      // .waitUntilTextExists('#edit-bar-prompt', 'drg分析')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.1.4.7、点击下拉菜单 HIS接口 edit-rightbar-hisInterface
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
      .click('#edit-rightbar-hisInterface')
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
    // 2.1.6 点击远程文件按钮
      .click('#edit-rightbar-server')
      .waitUntilTextExists('#edit-bar-prompt', '未登录用户,请在系统服务-用户设置内登录')
    // 2.1.7 点击前页按钮
      .click('#edit-rightbar-uppage')
      .getText('#edit-editbar-input')
      .then(function (uppage) {
        expect(uppage).to.be.an('string');
      })
    // 2.1.8 点击后页按钮
      .click('#edit-rightbar-downpage')
      .getText('#edit-editbar-input')
      .then(function (downpage) {
        expect(downpage).to.be.an('string');
      })
    // -----------------左侧 下拉 以及按钮 点击-----------------
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
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.2.1 点击下拉菜单 病案首页(卫统四csv)按钮 edit-leftbar-wt4
      .click('#edit-leftbar-病案首页（卫统四CSV）')
      // .waitUntilTextExists('#edit-bar-prompt', '病案首页')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.2.1.1 点击下拉菜单病案首页(卫统四csv)按钮 eidt-leftbar-admissionApplication
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
    // 2.2.1.1.1 点击下拉菜单 首次病程按钮 eidt-leftbar-firstDisease
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
      // .waitUntilTextExists('#edit-bar-首次病程', '首次病程')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.2.1.1.1.1 点击下拉菜单 病程记录按钮 eidt-leftbar-diseaseRecord
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
    // 2.2.1.1.1.1.1 点击下拉菜单 病案首页按钮 eidt-leftbar-medicalHome
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
    // 2.2.1.1.1.1.1.1 点击下拉菜单 门诊病案按钮 eidt-leftbar-outpatientMedical
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
    // 2.2.1.1.1.1.1.1.1 点击下拉菜单 健康体检按钮 eidt-leftbar-healthExamination
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
    // -----------------只点击 本地文件按钮 点击文件列表---------------------------------
    // --------------本地文件table操作--------------------
    // 2.3、点击右侧工具栏 本地按钮 edit-rightbar-local 右侧出现当前本地文件
      .click('#edit-rightbar-local')
      .waitUntilTextExists('#edit-bar-prompt', '读取本地文件')
      .getText('#edit-rightpanellocal-table')
      .then(function (editText) {
        expect(editText).to.not.equal('');
      })
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
    // ++++++++++++++++++点击用户本地文件单行+++++++++++++++++++++++++++++
    // 2.3.1 选择本地文件 点击单行,左侧出现该文件中的病历
      // .click('#edit-rightpanellocal-tr0')
      // .getText('#edit-bar-prompt')
      // .then(function (editText) {
      //   // console.log(editText);
      //   expect(editText).to.be.an('string');
      // })
    // 2.3.2 点击左侧 第一行 td 删除按钮 edit-leftpaneltable-del0
      .click('#edit-leftpaneltable-del0')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
      .click('#edit-leftpaneltable-del1')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
      .click('#edit-leftpaneltable-del2')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
      .click('#edit-leftpaneltable-del3')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
      // .click('#edit-leftpaneltable-del4')
      // .getText('#edit-bar-prompt')
      // .then(function (editText) {
      //   // console.log(editText);
      //   expect(editText).to.be.an('string');
      // })
      // .click('#edit-leftpaneltable-del5')
      // .getText('#edit-bar-prompt')
      // .then(function (editText) {
      //   // console.log(editText);
      //   expect(editText).to.be.an('string');
      // })
      // .click('#edit-leftpaneltable-del6')
      // .getText('#edit-bar-prompt')
      // .then(function (editText) {
      //   // console.log(editText);
      //   expect(editText).to.be.an('string');
      // })
    // 2.3.2.1 点击保存按钮 edit-leftbar-preservation
      .click('#edit-leftbar-preservation')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
    // 2.3.3 点击左侧 第一行 td 编辑按钮 edit-leftpaneltable-edit0
      .click('#edit-leftpaneltable-edit0')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
      .click('#edit-editbar-input')
      .keys('\uE015')
      .setValue('#edit-editbar-input', '姓名 这是个名字')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.3.3 点击缓存 edit-leftbar-cache
      .click('#edit-leftbar-cache')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.3.3.1 点击右侧 本地按钮 左侧保存按钮
      .click('#edit-rightbar-local')
      .waitUntilTextExists('#edit-bar-prompt', '读取本地文件')
      .click('#edit-leftbar-preservation')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
    // 2.3.4 点击左侧 第一行 td 参考按钮 edit-leftpaneltable-ref0
      .click('#edit-leftpaneltable-ref0')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.3.5 点击左侧 第一行 td 上传按钮 edit-leftpaneltable-upl0
      .click('#edit-leftpaneltable-upl0')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
  });
});

