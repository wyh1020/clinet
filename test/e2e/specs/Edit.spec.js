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
    // +++++++++++++不点击选择新建,点击工具栏按钮++++++++++++++++++
    // 2.2、点击左侧工具栏 选择下拉按钮 edit-leftbar-choice
      .click('#edit-leftbar-choice')
      .hasFocus('[aria-labelledby="edit-leftbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-leftba-sel')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.1、点击左侧工具栏 保存按钮 edit-leftbar-preservation
      .click('#edit-leftbar-preservation')
      .waitUntilTextExists('#edit-bar-prompt', '请先打开一个本地或者远程的CDA文件！')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.1.1、点击左侧工具栏 另存按钮 edit-leftbar-save
      .click('#edit-leftbar-save')
      .waitUntilTextExists('#edit-bar-prompt', '请先打开一个本地或者远程的CDA文件！')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.1.2、点击左侧工具栏 删除按钮 edit-leftbar-del
      .click('#edit-leftbar-del')
      .waitUntilTextExists('#edit-bar-prompt', '请选择删除内容')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.1.3、点击左侧工具栏 写文件按钮 edit-leftbar-file
      // .click('#edit-leftbar-file')
      // .waitUntilTextExists('#edit-bar-prompt', '请先打开一个本地或者远程的CDA文件')
      // .getText('#edit-bar-prompt')
      // .then(function (editText) {
      //   expect(editText).to.be.an('string');
      // })
    // 2.1.4、左侧模糊查询框
    // 2.1.5、点击右侧工具栏 选择下拉按钮 edit-rightbar-choice
      .click('#edit-rightbar-choice')
      .hasFocus('[aria-labelledby="edit-rightbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-leftba-sel')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
    // 2.1.5.1、点击下拉菜单 编辑器使用帮助 edit-rightbar-editorHelp
      .click('#edit-rightbar-editorHelp')
      // .waitUntilTextExists('#edit-bar-prompt', '编辑器使用帮助')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.1.5.2、点击下拉菜单 输入框提示 edit-rightbar-inputPrompt
      .click('#edit-rightbar-choice')
      .hasFocus('[aria-labelledby="edit-rightbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-leftba-sel')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
      .click('#edit-rightbar-inputPrompt')
      // .waitUntilTextExists('#edit-bar-prompt', '输入框提示')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.1.5.3、点击下拉菜单 病案历史 edit-rightbar-medicalHistory
      .click('#edit-rightbar-choice')
      .hasFocus('[aria-labelledby="edit-rightbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-leftba-sel')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
      .click('#edit-rightbar-medicalHistory')
      // .waitUntilTextExists('#edit-bar-prompt', '病案历史')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.1.5.4、点击下拉菜单 病案参考 edit-rightbar-medicalRefer
      .click('#edit-rightbar-choice')
      .hasFocus('[aria-labelledby="edit-rightbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-leftba-sel')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
      .click('#edit-rightbar-medicalRefer')
      // .waitUntilTextExists('#edit-bar-prompt', '病案参考')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.1.6、点击右侧工具栏 帮助按钮 edit-help
    // 2.1.7、点击右侧工具栏 本地按钮 edit-rightbar-local 右侧出现当前本地文件
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
        expect(editText).to.be.an('string');
      })
    // 2.1.8、远程文件
    // 2.1.9、前页
    // 2.1.10、后页
    // 2.1.11、右侧模糊查询框
    // +++++++++++++点击选择新建,点击工具栏按钮++++++++++++++++++
    // 2.1、点击左侧工具栏 返回按钮edit-leftbar-back, 页面返回首页
      // .click('#edit-leftbar-back')
      // .waitUntilTextExists('#notice-bar', '数据采集-数据采集')
      // // 点击顶部导航栏的edit-page，进入edit页
      // .click('#navbar-edit')
      // .waitUntilTextExists('#edit-editbar-input', '')
      // .getText('#edit-editbar-input')
      // .then(function (editText) {
      //   expect(editText).to.equal('');
      // })
    // 2.2、点击左侧工具栏 选择下拉按钮 edit-leftbar-choice
      .click('#edit-leftbar-choice')
      .hasFocus('[aria-labelledby="edit-leftbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-leftba-sel')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.2.1 点击下拉菜单 病案首页(卫统四csv)按钮 edit-leftbar-wt4
      .click('#edit-leftbar-wt4')
      // .waitUntilTextExists('#edit-bar-prompt', '病案首页')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.2.1.1 点击下拉菜单入院申请按钮 eidt-leftbar-admissionApplication
      .click('#edit-leftbar-choice')
      .hasFocus('[aria-labelledby="edit-leftbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-leftba-sel')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#eidt-leftbar-admissionApplication')
      // .waitUntilTextExists('#edit-bar-prompt', '入院申请')
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
      .getText('#edit-leftba-sel')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#eidt-leftbar-firstDisease')
      // .waitUntilTextExists('#edit-bar-prompt', '首次病程')
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
      .getText('#edit-leftba-sel')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#eidt-leftbar-diseaseRecord')
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
      .getText('#edit-leftba-sel')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#eidt-leftbar-medicalHome')
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
      .getText('#edit-leftba-sel')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#eidt-leftbar-outpatientMedical')
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
      .getText('#edit-leftba-sel')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      .click('#eidt-leftbar-admissionApplication')
      // .waitUntilTextExists('#edit-bar-prompt', '健康体检')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.3、点击左侧工具栏 新建按钮 edit-leftbar-newdoc
    // 2.4、点击左侧工具栏 保存按钮 edit-leftbar-preservation
      .click('#edit-leftbar-preservation')
      .waitUntilTextExists('#edit-bar-prompt', '请先打开一个本地或者远程的CDA文件！')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.5、点击左侧工具栏 另存按钮 edit-leftbar-save
      .click('#edit-leftbar-save')
      .waitUntilTextExists('#edit-bar-prompt', '请先打开一个本地或者远程的CDA文件！')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.6、点击左侧工具栏 删除按钮 edit-leftbar-del
      .click('#edit-leftbar-del')
      .waitUntilTextExists('#edit-bar-prompt', '删除成功')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.7、点击左侧工具栏 写文件按钮 edit-leftbar-file
      // .click('#edit-leftbar-file')
      // .waitUntilTextExists('#edit-bar-prompt', '请先打开一个本地或者远程的CDA文件')
      // .getText('#edit-bar-prompt')
      // .then(function (editText) {
      //   expect(editText).to.be.an('string');
      // })
    // 2.8、点击右侧工具栏 选择下拉按钮 edit-leftbar-choice
      .click('#edit-rightbar-choice')
      .hasFocus('[aria-labelledby="edit-rightbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-leftba-sel')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
    // 2.8.1、点击下拉菜单 编辑器使用帮助 edit-rightbar-editorHelp
      .click('#edit-rightbar-editorHelp')
      // .waitUntilTextExists('#edit-bar-prompt', '编辑器使用帮助')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.8.2、点击下拉菜单 输入框提示 edit-rightbar-inputPrompt
      .click('#edit-rightbar-choice')
      .hasFocus('[aria-labelledby="edit-rightbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-leftba-sel')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
      .click('#edit-rightbar-inputPrompt')
      // .waitUntilTextExists('#edit-bar-prompt', '输入框提示')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.8.3、点击下拉菜单 病案历史 edit-rightbar-medicalHistory
      .click('#edit-rightbar-choice')
      .hasFocus('[aria-labelledby="edit-rightbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-leftba-sel')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
      .click('#edit-rightbar-medicalHistory')
      // .waitUntilTextExists('#edit-bar-prompt', '病案历史')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.8.4、点击下拉菜单 病案参考 edit-rightbar-medicalRefer
      .click('#edit-rightbar-choice')
      .hasFocus('[aria-labelledby="edit-rightbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.equal('');
      })
      .getText('#edit-leftba-sel')
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.be.an('string');
      })
      .click('#edit-rightbar-medicalRefer')
      // .waitUntilTextExists('#edit-bar-prompt', '病案参考')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.9、点击右侧工具栏 帮助按钮 edit-help
    // 2.10、点击右侧工具栏 本地按钮 edit-rightbar-local 右侧出现当前本地文件
    // 2.11、点击右侧工具栏 远程按钮 edit-server-data
      // .click('#edit-rightbar-server')
      // .waitUntilTextExists('#edit-bar-prompt', '读取远程文件')
    // 2.12、点击右侧工具栏 CDA按钮 edit-user
    // 2.13、点击右侧工具栏 新文件按钮 edit-new-files
    // 2.14、点击右侧工具栏 前页按钮 edit-page-3
    // 2.15、点击右侧工具栏 后页按钮 edit-page-4
    // 2.16、点击左侧工具栏输入框 回车结束 查询
    // 2.17、点击右侧工具栏输入框 回车结束 查询
    // 2.18、底部输入框
      .click('#edit-editbar-input')
      .setValue('#edit-editbar-input', '民族 ')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
      // 快捷键ctrl + 2
      .waitUntilWindowLoaded(2000)
      .keys('\uE009')
      .keys('\uE01C')
      .getValue('#edit-editbar-input')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
      // 快捷键ctrl + 0
      .waitUntilWindowLoaded(2000)
      .keys('\uE009')
      .keys('\uE01A')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
      // 快捷键ctrl + .
      .waitUntilWindowLoaded(2000)
      .keys('\uE009')
      .keys('\uE028')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
  })
});
