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
            <li>病案集合<em class="table-primary">（文件）</em>：单条或多条病案保存为一个CDA文件（或非关系数据库表，或关系数据库表的array类型的字段），每一行是一条病案</li>
            <li>单条病案<em class="table-primary">（文档）</em>：CDA文件（自定义结构的临床文档clinic document）中的一行是一条病案，也就是一条记录就是一条病案</li>
            <li>病案章节：自定义的section作为章节分隔，包含一个或多个病案条目</li>
            <li>病案条目<em class="table-primary">（输入框内容）</em>：CDA文件中的每一行用英文逗号分隔的字符串，作为条目的字符串内部是用空格分隔，从中可以解析出key-value结构</li>
            <li>条目解析：将用空格分隔的条目字符串转换为数组结构（或对象结构），默认第一位是key，后面的都是value</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>
          病案的标准化：病案标准化分为4部分
          <ul>
            <li>
              病案类型：例如门诊病案、住院病案、首次病程、病案首页、病程记录、等等
            </li>
            <li>
              病案章节：例如个人信息、主诉、现病史、体格检查、检验申请、检查申请、临床医嘱、长期医嘱、等等
            </li>
            <li>
              病案条目：例如姓名、性别、年龄、体态、面容、步态、心率、血压、等等（采用key-value结构）
            </li>
            <li>
              术语字典：病案条目的value的可选择项，例如疾病诊断名称、手术/操作名称、性别、体态、步态、面容、等等
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
            <li>
              在底部输入框中用上、下键移动输入位置，
            </li>
            <li>
              用ctrl+上、下键移动条目在文档中的位置（CSV文件不可用，仅CDA文件可用）
            </li>
            <li>
              用ctrl+delete键删除条目（CSV文件不可用，仅CDA文件可用）
            </li>
            <li>
              左菜单中的《新建》《保存》《另存》《删除》都是对文件中的一条（行）记录的操作，仅是在内存中的处理，并没有实际写入文件，再次点击文件，会重新导入文件中内容，已操作但未写入文件的内容都丢掉了。
            </li>
            <li class="text-danger">
              左菜单中的《写文件》是将当前内存中的内容写入文件中（或远程服务器），永久保存，不可撤销！
            </li>
            <li>
              右菜单中的《新文件》是在user/目录下建立一个以当天日期作为文件名的CDA文件
            </li>
            <li>
              右菜单中的《本地》是打开本地目录下的文件
            </li>
            <li>
              右菜单中的《远程》是打开远程服务器上的文件
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>
          左菜单中的选择文档类型的《选择》
          <ul>
            <li></li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>
          右菜单中的选择帮助类型的《选择》
          <ul>
            <li></li>
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
