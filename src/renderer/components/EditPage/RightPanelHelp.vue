<template>
  <div>
    <table>
      <tr>
        <th class="table-danger"> 编辑器使用帮助</th>
      </tr>
      <tr>
        <td>
          病案的结构化：病案数据分为5层结构
          <ul>
            <li>病案集合：单条或多条病案保存为一个CSV文件（或数据库表），每一行是一条病案</li>
            <li>单条病案：CSV文件（或数据库表）中的一行是一条病案</li>
            <li>病案章节：自定义的section作为章节分隔，包含一个或多个病案条目</li>
            <li>病案条目：CSV文件中用英文逗号分隔的字符串，或数据库表中的一个字段中的内容</li>
            <li>条目解析：作为条目的字符串内部是用空格分隔，从中解析出key-value结构</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>
          病案的标准化：病案标准化分为3部分
          <ul>
            <li>
              病案类型：例如门诊病案、住院病案、首次病程、病案首页、病程记录、等等
            </li>
            <li>
              病案章节：例如个人信息、主诉、现病史、体格检查、检验申请、检查申请、临床医嘱、长期医嘱、等等
            </li>
            <li>
              病案条目：例如姓名、性别、年龄、体态、面容、步态、心率、血压、等等
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>
          底部输入框的使用：
          <ul>
            <li class="text-danger">
              在底部输入框中每次输入一个条目，用空格分隔条目中的内容结构，回车确定输入。
            </li>
            <li>
              在左边面板中查看输入内容
            </li>
          </ul>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    components: { },
    computed: {
    },
    methods: {
    },
  };
</script>

<style scoped>
  ul {
    padding-bottom: 0;
  }
</style>
