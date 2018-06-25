import utils from '../utils';

describe('Library', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Library-测试1', function () {
    this.timeout(20000)
    // 1、点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '系统通知：未注册用户可以直接登陆！使用单机版功能！用户注册可以选择远程服务或者区块链服务！')
    // 2、点击顶部导航栏的navbar-libary，进入libary页
      .click('#navbar-library')
      .waitUntilTextExists('#notice-bar', '术语字典-术语字典')

    // 2.1.2、点击工具栏的后一页(library-down)，右侧表中显示下一页内容第四行高亮并提示：翻页成功！table底部页数加一，提示翻页成功，若加一后页数大于当前总页数，提示：当前已经是最后一页！
      .click('#library-down')
      .waitUntilTextExists('#notice-bar', '当前已是尾页')
      .getText('#notice-bar')
      .then(function (rightpanel) {
        expect(rightpanel).to.equal('系统通知：当前已是尾页');
      })
    // 2.1.3、点击工具栏的前一页(library-up)，右侧表中显示上一页内容第四行高亮并提示：翻页成功！table底部页数减一，提示翻页成功，若减一后页数小于0，提示：当前已经是第一页！
      .click('#library-up')
      .waitUntilTextExists('#notice-bar', '当前已是第一页')
      .getText('#notice-bar')
      .then(function (rightpanel) {
        expect(rightpanel).to.equal('系统通知：当前已是第一页');
      })
    // 2.1.4、点击工具栏的编辑数据(remote-file)，进入编辑页面，编辑页面右侧显示当前数据，左侧显示第四行高亮的内容（传入id到编辑页面用于返回）
      .click('#library-edit')
      // .getText('#edit-editbar-input')
      // .then(function (editText) {
      //   expect(editText).to.equal('');
      // })
      .click('#edit-leftbar-back')
      // .waitUntilTextExists('#notice-bar', 'CSV文件读取成功！')
    // 2.1.5、点击维度选择(library-drop)，显示维度下拉选项
    // 2.1.5.1、工具栏的维度选择-机构(library-dropdown-全部)，左侧列表显示当前数据内所有机构，提示：机构维度选择成功，若机构列无内容，提示：无机构维度！
      .click('#library-dropdown1')
      .click('#library-dropdown-全部')
      .waitUntilTextExists('#notice-bar', '请选择文件')
    // 2.1.5.1.1、点击左侧列表(library-leftlist)，右侧表中显示所选机构的对应数据，若右侧表中无数据显示，提示：未找到对应数据！
    // 2.1.5.2、工具栏的维度选择-时间(library-dropdown-年份)，左侧列表显示当前数据内所有时间，提示：时间维度选择成功，若时间列无内容，提示：无时间维度！
      .click('#library-dropdown1')
      .click('#library-dropdown-年份')
      .waitUntilTextExists('#notice-bar', '请选择文件')
    // 2.1.5.2.1、点击左侧列表(library-leftlist)，右侧表中显示所选时间的对应数据，若右侧表中无数据显示，提示：未找到对应数据！
    // // 2.1.5.3、工具栏的维度选择-版本(library-dropdown-版本)，左侧列表显示当前数据内所有版本，提示：版本维度选择成功，若版本列无内容，提示：无版本维度！
      .click('#library-dropdown1')
      .click('#library-dropdown-版本')
      .waitUntilTextExists('#notice-bar', '请选择文件')
    // 2.1.5.3.1、点击左侧列表(library-leftlist)，右侧表中显示所选版本的对应数据，若右侧表中无数据显示，提示：未找到对应数据！
    // 2.1.5.4、点击表中任意一列
    // 2.1.5.5、点击添加列维度，左侧列表显示选中列中的内容（去重），若选中列无内容，提示维度内容为空不可添加！
  })
});

