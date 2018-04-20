import utils from '../utils';

describe('EditLocalFile', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Edit-本地文件测试1', function () {
    this.timeout(60000)
    // 1、点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#edit-bar-prompt', '未注册用户登陆！')
    // 2、点击顶部导航栏的edit-page，进入edit页
      .click('#navbar-edit')
      .waitUntilTextExists('#edit-editbar-input', '')
    // 底部输入框edit-editbar-input的内容为空
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('');
        console.log('11111111111')
      })
    // 2.10、点击右侧工具栏 本地按钮 edit-rightbar-local 右侧出现当前本地文件
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
    // ++++++++++++++++++点击用户本地文件单行+++++++++++++++++++++++++++++
    // 2.10.1 选择本地文件 点击单行,左侧出现该文件中的病历
      .click('#edit-rightpanellocal-table')
      // .getText('.edit-leftpaneltable-tr')
      .getText('#edit-leftpaneltable-table')
      // .waitUntilWindowLoaded(1000)
      .then(function (editText) {
        // console.log(editText);
        expect(editText).to.not.equal('');
      })
    // ++++++++++++++++++点击用户本地文件单行---不点击选择编辑条目单行+++++++++++++++++++++++++++++
    // 2.10.1.1 点击左侧工具栏 保存按钮 对该病历进行保存
      .click('#edit-leftbar-preservation')
      .waitUntilTextExists('#edit-bar-prompt', '文件保存成功！')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.10.1.2 点击左侧工具栏 另存按钮 对该病历进行另存
      .click('#edit-leftbar-save')
      .waitUntilTextExists('#edit-bar-prompt', '文件保存成功！')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.10.1.3 点击左侧工具栏 删除按钮 对该病历进行删除
      .click('#edit-leftbar-del')
      .waitUntilTextExists('#edit-bar-prompt', '请选择删除内容')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.10.1.4 点击左侧工具栏 前页按钮 对该病历进行跳页
    // 2.10.1.5 点击左侧工具栏 后页按钮 对该病历进行跳页
    // 2.10.1.6 点击左侧工具栏 选择按钮
      .click('#edit-leftbar-choice')
      .hasFocus('[aria-labelledby="edit-leftbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('');
      })
    // 2.10.1.6.1 点击下拉菜单 病案首页(卫统四csv)按钮 edit-leftbar-wt4
      .click('#edit-leftbar-wt4')
      // .waitUntilTextExists('#edit-bar-prompt', '病案首页')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.10.1.6.1.1 点击下拉菜单入院申请按钮 eidt-leftbar-admissionApplication
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
    // 2.10.1.6.1.1.1 点击下拉菜单 首次病程按钮 eidt-leftbar-firstDisease
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
    // 2.10.1.6.1.1.1.1 点击下拉菜单 病程记录按钮 eidt-leftbar-diseaseRecord
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
    // 2.10.1.6.1.1.1.1.1 点击下拉菜单 病案首页按钮 eidt-leftbar-medicalHome
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
    // 2.10.1.6.1.1.1.1.1.1 点击下拉菜单 门诊病案按钮 eidt-leftbar-outpatientMedical
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
    // 2.10.1.6.1.1.1.1.1.1.1 点击下拉菜单 健康体检按钮 eidt-leftbar-healthExamination
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
    // 2.10.1.7 点击左侧工具栏 写文件按钮
    // .click('#edit-leftbar-file')
    // // .waitUntilTextExists('#edit-bar-prompt', '今日的CDA文件已经存在')
    // .getText('#edit-bar-prompt')
    // .then(function (editText) {
    //   expect(editText).to.be.an('string');
    // })
    // 2.10.1.8 点击左侧工具栏 输入框
    // ++++++++++++++++++点击用户本地文件单行---点击选择编辑条目单行+++++++++++++++++++++++++++++
    // 2.10.2.1.1 选择编辑条目, 点击单行获取详细病历, 编辑条目出现在右侧,左侧出现该病历详细内容
    // .click('#edit-leftpaneltable-table')
    // .getText('.edit-leftpaneltable-tr')
    // .then(function (editText) {
    //   expect(editText).to.not.equal('');
    //   // expect(editText).to.not.an('array');
    // })
    // 2.10.2.1.2 底部输入框输入,修改病历
    // 2.10.2.1.3 点击左侧工具栏 保存按钮 对该病历进行保存
      .click('#edit-leftbar-preservation')
      .waitUntilTextExists('#edit-bar-prompt', '文件保存成功！')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.10.2.1.4 点击左侧工具栏 另存按钮 对该病历进行另存
      .click('#edit-leftbar-save')
      .waitUntilTextExists('#edit-bar-prompt', '文件保存成功！')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.10.2.1.5 点击左侧工具栏 删除按钮 对该病历进行删除
      .click('#edit-leftbar-del')
      .waitUntilTextExists('#edit-bar-prompt', '删除成功')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.10.2.1.6 点击左侧工具栏 前页按钮 对该病历进行跳页
    // 2.10.2.1.7 点击左侧工具栏 后页按钮 对该病历进行跳页
    // 2.10.2.1.6 点击左侧工具栏 选择按钮
      .click('#edit-leftbar-choice')
      .hasFocus('[aria-labelledby="edit-leftbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('');
      })
    // 2.10.2.1.6.1 点击下拉菜单 病案首页(卫统四csv)按钮 edit-leftbar-wt4
      .click('#edit-leftbar-wt4')
      // .waitUntilTextExists('#edit-bar-prompt', '病案首页')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.10.2.1.6.1.1 点击下拉菜单入院申请按钮 eidt-leftbar-admissionApplication
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
    // 2.10.2.1.6.1.1.1 点击下拉菜单 首次病程按钮 eidt-leftbar-firstDisease
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
    // 2.10.2.1.6.1.1.1.1 点击下拉菜单 病程记录按钮 eidt-leftbar-diseaseRecord
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
    // 2.10.2.1.6.1.1.1.1.1 点击下拉菜单 病案首页按钮 eidt-leftbar-medicalHome
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
    // 2.10.2.1.6.1.1.1.1.1.1 点击下拉菜单 门诊病案按钮 eidt-leftbar-outpatientMedical
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
    // 2.10.2.1.6.1.1.1.1.1.1.1 点击下拉菜单 健康体检按钮 eidt-leftbar-healthExamination
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
    // 2.10.2.1.7 点击左侧工具栏 写文件按钮
      // .click('#edit-leftbar-file')
      // // .waitUntilTextExists('#edit-bar-prompt', '今日的CDA文件已经存在')
      // .getText('#edit-bar-prompt')
      // .then(function (editText) {
      //   expect(editText).to.be.an('string');
      // })
    // 2.10.2.1.8 点击左侧工具栏 输入框
    // ++++++++++++++++++不点击用户本地文件单行+++++++++++++++++++++++++++++
    // 2.10.2 选择本地文件 不点击单行
    // 2.10.2.2.1 点击左侧工具栏 保存按钮
      .click('#edit-leftbar-preservation')
      .waitUntilTextExists('#edit-bar-prompt', '文件保存成功！')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.10.2.2.2 点击左侧工具栏 另存按钮
      .click('#edit-leftbar-save')
      .waitUntilTextExists('#edit-bar-prompt', '文件保存成功！')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.10.2.2.3 点击左侧工具栏 删除按钮
      .click('#edit-leftbar-del')
      .waitUntilTextExists('#edit-bar-prompt', '删除成功')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        expect(editText).to.be.an('string');
      })
    // 2.10.2.2.4 点击左侧工具栏 前页按钮
    // 2.10.2.2.5 点击左侧工具栏 后页按钮
    // 2.10.2.2.6 点击左侧工具栏 选择按钮
      .click('#edit-leftbar-choice')
      .hasFocus('[aria-labelledby="edit-leftbar-choice"]')
      .getText('#edit-editbar-input')
      .then(function (editText) {
        expect(editText).to.equal('');
      })
    // 2.10.2.2.6.1 点击下拉菜单 病案首页(卫统四csv)按钮 edit-leftbar-wt4
      .click('#edit-leftbar-wt4')
      // .waitUntilTextExists('#edit-bar-prompt', '病案首页')
      .getText('#edit-bar-prompt')
      .then(function (editText) {
        // console.log(editText)
        expect(editText).to.be.an('string');
      })
    // 2.10.2.2.6.1.1 点击下拉菜单入院申请按钮 eidt-leftbar-admissionApplication
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
    // 2.10.2.2.6.1.1.1 点击下拉菜单 首次病程按钮 eidt-leftbar-firstDisease
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
    // 2.10.2.2.6.1.1.1.1 点击下拉菜单 病程记录按钮 eidt-leftbar-diseaseRecord
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
    // 2.10.2.2.6.1.1.1.1.1 点击下拉菜单 病案首页按钮 eidt-leftbar-medicalHome
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
    // 2.10.2.2.6.1.1.1.1.1.1 点击下拉菜单 门诊病案按钮 eidt-leftbar-outpatientMedical
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
    // 2.10.2.2.6.1.1.1.1.1.1.1 点击下拉菜单 健康体检按钮 eidt-leftbar-healthExamination
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
    // 2.10.2.2.7 点击左侧工具栏 写文件按钮
      // .click('#edit-leftbar-file')
      // // .waitUntilTextExists('#edit-bar-prompt', '今日的CDA文件已经存在')
      // .getText('#edit-bar-prompt')
      // .then(function (editText) {
      //   expect(editText).to.be.an('string');
      // })
    // 2.10.2.2.8 点击左侧工具栏 输入框
  });
});

