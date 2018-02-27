import utils from '../utils';

describe('Library', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('Library-测试1', function () {
    // 1、点击login页面的login-button
    return this.app.client.click('#login')
    // 等待底部通知框出现'未注册用户登陆！'提示，进入Home页
      .waitUntilTextExists('#notice-bar', '未注册用户登陆！')

    // 2、点击顶部导航栏的navbar-libary，进入libary页
      .click('#navbar-library')
      .waitUntilTextExists('#notice-bar', '系统通知：术语字典-术语字典')

    // ########### 本地文件操作 ###########
    // 2.1、点击工具栏的本地文件(library-local-file)，左列表显示本地测试数据文件并提示获取本地文件成功！，若左列表没有显示数据，提示：无本地文件！
      .click('#library-local-file')
      .waitUntilTextExists('#notice-bar', '系统通知：本地文件')
    // 2.1.1、点击左侧列表(library-leftlist)，选择文件高亮显示，读取数据文件内容，右侧表中显示所选本地文件内容，提示CSV文件读取成功！若右侧表中无数据，提示：无数据！
      .click('#library-leftlist')
      .waitUntilTextExists('#notice-bar', '系统通知：CSV文件读取成功！')
    // 2.1.1.1、点击表中一行（例：第四行），当前行高亮显示
    // 2.1.2、点击工具栏的前一页(library-up)，右侧表中显示上一页内容第四行高亮并提示：翻页成功！table底部页数减一，提示翻页成功，若减一后页数小于0，提示：当前已经是第一页！
      .click('#library-up')
      .waitUntilTextExists('#notice-bar', '系统通知：翻页')
    // 2.1.3、点击工具栏的后一页(library-down)，右侧表中显示下一页内容第四行高亮并提示：翻页成功！table底部页数加一，提示翻页成功，若加一后页数大于当前总页数，提示：当前已经是最后一页！
      .click('#library-down')
      .waitUntilTextExists('#notice-bar', '系统通知：翻页')
    // 2.1.4、点击工具栏的编辑数据(remote-file)，进入编辑页面，编辑页面右侧显示当前数据，左侧显示第四行高亮的内容（传入id到编辑页面用于返回）
      .click('#library-edit')
      .waitUntilTextExists('#edit-input', '')
    // 2.1.5、点击维度选择(library-drop)，显示维度下拉选项
      // .click('#library-drop')
    // 2.1.5.1、工具栏的维度选择-机构(library-org)，左侧列表显示当前数据内所有机构，提示：机构维度选择成功，若机构列无内容，提示：无机构维度！
      // .click('#library-org')
      // .waitUntilTextExists('#notice-bar', '系统通知：维度选择')
    // 2.1.5.1.1、点击左侧列表(library-leftlist)，右侧表中显示所选机构的对应数据，若右侧表中无数据显示，提示：未找到对应数据！
    // 2.1.5.2、工具栏的维度选择-时间(library-time)，左侧列表显示当前数据内所有时间，提示：时间维度选择成功，若时间列无内容，提示：无时间维度！
    // 2.1.5.2.1、点击左侧列表(library-leftlist)，右侧表中显示所选时间的对应数据，若右侧表中无数据显示，提示：未找到对应数据！
    // 2.1.5.3、工具栏的维度选择-版本(library-version)，左侧列表显示当前数据内所有版本，提示：版本维度选择成功，若版本列无内容，提示：无版本维度！
    // 2.1.5.3.1、点击左侧列表(library-leftlist)，右侧表中显示所选版本的对应数据，若右侧表中无数据显示，提示：未找到对应数据！
    // 2.1.5.4、点击表中任意一列
    // 2.1.5.5、点击添加列维度，左侧列表显示选中列中的内容（去重），若选中列无内容，提示维度内容为空不可添加！

    // ########### 远程文件操作 ###########
    // 2.1.6、点击工具栏的远程文件(library-remote-file)，左列表显示远程数据文件
    // 2.1.6.1、点击左侧列表(library-leftlist)，读取数据文件内容，右侧表中显示所选远程文件内容
    // 2.1.7.1.1、点击表中一行（例：第四行），当前行高亮显示
    // 2.1.7.2、点击工具栏的前一页(library-up)，右侧表中显示上一页内容第四行高亮并提示：翻页成功！table底部页数减一，提示翻页成功，若减一后页数小于0，提示：当前已经是第一页！
      // .click('#library-up')
      // .waitUntilTextExists('#notice-bar', '系统通知：翻页')
    // 2.1.7.3、点击工具栏的后一页(library-down)，右侧表中显示下一页内容第四行高亮并提示：翻页成功！table底部页数加一，提示翻页成功，若加一后页数大于当前总页数，提示：当前已经是最后一页！
      // .click('#library-down')
      // .waitUntilTextExists('#notice-bar', '系统通知：翻页')
    // 2.1.7.4、点击工具栏的编辑数据(remote-file)，进入编辑页面，编辑页面右侧显示当前数据，左侧显示第四行高亮的内容（传入id到编辑页面用于返回）
      // .click('#library-edit')
      // .waitUntilTextExists('#edit-input', '')
    // 2.1.8、点击维度选择(library-dropdown)，显示维度下拉选项
    // 2.1.8.1、工具栏的维度选择-机构(library-org)，左侧列表显示当前数据内所有机构，提示：机构维度选择成功，若机构列无内容，提示：无机构维度！
    // 2.1.8.1.1、点击左侧列表(library-leftlist)，右侧表中显示所选机构的对应数据，若右侧表中无数据显示，提示：未找到对应数据！
    // 2.1.8.2、工具栏的维度选择-时间(library-time)，左侧列表显示当前数据内所有时间，提示：时间维度选择成功，若时间列无内容，提示：无时间维度！
    // 2.1.8.2.1、点击左侧列表(library-leftlist)，右侧表中显示所选时间的对应数据，若右侧表中无数据显示，提示：未找到对应数据！
    // 2.1.8.3、工具栏的维度选择-版本(library-version)，左侧列表显示当前数据内所有版本，提示：版本维度选择成功，若版本列无内容，提示：无版本维度！
    // 2.1.8.3.1、点击左侧列表(library-leftlist)，右侧表中显示所选版本的对应数据，若右侧表中无数据显示，提示：未找到对应数据！
    // 2.1.8.4、点击表中任意一列
    // 2.1.8.5、点击添加列维度，左侧列表显示选中列中的内容（去重），若选中列无内容，提示维度内容为空不可添加！
  })
});
