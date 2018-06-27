<template>
  <div id="edit-rightpanelhelp">
    <!-- <table v-if="type === '编辑器使用帮助'"> -->
    <table v-if="this.$store.state.Edit.rightPanels.includes('编辑器使用帮助') && !this.$store.state.Edit.rightFolds.includes('编辑器使用帮助')">
      <tr>
        <th class="table-danger"> 编辑器使用帮助
          <a href="#" v-on:click="close('编辑器使用帮助')" style="float: right">✖</a>
          <a href="#" v-on:click="fold('编辑器使用帮助')" style="float: right; marginRight: 3px">↗</a>
        </th>
      </tr>
      <tr>
        <td>
          一、完全结构化数据：系统配置、术语字典、数据分析
          <ul>
            <li>文件：CSV文件（或关系数据库表）</li>
            <li>文档头：CSV文件中的第一条（行）记录（或关系数据库表的字段定义）</li>
            <li>文档：CSV文件中除第一行以外的一条（行）记录</li>
            <li>条目：文档中的一个字段，在输入框和编辑页面上自动将文档头（key）与条目（value）组合起来，作为一个用空格分隔的字符串</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>
          二、病案的半结构化：病案数据分为5层结构
          <ul>
            <li>病案集合<em class="table-primary">（文件）</em>：单条或多条病案保存为一个CDA文件（或非关系数据库表，或关系数据库表的array类型的字段），每一行是一条病案</li>
            <li>单条病案<em class="table-primary">（文档）</em>：CDA文件（自定义结构的临床文档clinical document）中的一行是一条病案，也就是一条记录就是一条病案</li>
            <li>病案章节：自定义的section作为章节分隔，包含一个或多个病案条目</li>
            <li>病案条目<em class="table-primary">（输入框内容）</em>：CDA文件中的每一行用英文逗号分隔的字符串，作为条目的字符串内部是用空格分隔，从中可以解析出key-value结构</li>
            <li>条目解析：将用空格分隔的条目字符串转换为数组结构（或对象结构），默认第一位是key，后面的都是value</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>
          三、病案的标准化：病案标准化分为4部分
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
          四、底部输入框的使用：
          <ul>
            <li class="text-danger">
              在底部输入框中每次输入一个条目，用空格分隔条目中的内容结构，回车确定输入。内容中如果包含中文逗号，则自动拆分成多个条目输入。
            </li>
            <li>
              在左边面板中查看并编辑输入内容，可以用鼠标点选，也可以用上、下键切换。
            </li>
            <li>
              用上、下键可以移动输入位置，
            </li>
            <li>
              用ctrl+上、下键可以移动条目在文档中的位置（CSV文件不可用，仅CDA文件可用）
            </li>
            <li>
              用ctrl+delete键可以删除条目（CSV文件不可用，仅CDA文件可用）
            </li>
            <li>
              用ctrl+enter键，在文档中当前位置后插入条目（CSV文件不可用，仅CDA文件可用）
            </li>
            <li>
              用空格键或上、下键可以触发当前输入项的提示
            </li>
            <li>
              用ctrl+小键盘的按键可以选择输入当前输入项的提示
            </li>
            <li>
              用pageUp、pageDown键可以向前、向后翻页当前输入项的提示
            </li>
            <li>
              左菜单中的《新建》《保存》《另存》《删除》都是对文件中的一条（行）记录的操作。
            </li>
            <li class="text-danger">
              本地系统不提供删除文件的功能，请自行到目录下删除文件。远程服务器也不提供删除数据库表的功能。
            </li>
            <li>
              右菜单中的《本地文件》是打开本地目录下的文件
            </li>
            <li>
              右菜单中的《远程文件》是打开远程服务器上的文件
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>
          五、左工具栏中的《新建》
          <ul>
            <li>可以选择不同的模板，默认是《自定义文档》，也就是空白文档。</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>
          六、右工具栏中的《帮助》
          <ul>
            <li>可以选择不同的帮助页面，默认是《编辑器使用帮助》，也就是当前看到的帮助。</li>
          </ul>
        </td>
      </tr>
    </table>
    <table v-if="this.$store.state.Edit.rightPanels.includes('编辑器使用帮助') && this.$store.state.Edit.rightFolds.includes('编辑器使用帮助')">
      <tr>
        <th class="table-danger"> 编辑器使用帮助
          <a href="#" v-on:click="close('编辑器使用帮助')" style="float: right">✖</a>
          <a href="#" v-on:click="fold('编辑器使用帮助')" style="float: right; marginRight: 5px">↙</a>
        </th>
      </tr>
      <tr  style="textAlign: center"><a href="#" v-on:click="fold('编辑器使用帮助')">...</a></tr>
    </table>
    <!-- <table v-if="type === '病案历史'"> -->
    <table v-if="this.$store.state.Edit.rightPanels.includes('病案历史')">
      <tr>
        <th class="table-danger"> 病案历史
          <a href="#" v-on:click="close('病案历史')" style="float: right">✖</a>
        </th>
      </tr>
    </table>
    <right-panel-his v-if="this.$store.state.Edit.rightPanels.includes('病案历史')"></right-panel-his>
    <!-- <right-panel-cdh v-if="type === '输入框提示'"></right-panel-cdh> -->
    <right-panel-cdh v-if="this.$store.state.Edit.rightPanels.includes('输入框提示') || this.$store.state.Edit.rightPanels.includes('输入提示')"></right-panel-cdh>
    <!-- <right-panel-doc v-if="type === '病案参考'"></right-panel-doc> -->
    <right-panel-doc v-if="this.$store.state.Edit.rightPanels.includes('病案参考')"></right-panel-doc>
    <!-- <table v-if="type === 'DRG分析'"> -->
    <table v-if="this.$store.state.Edit.rightPanels.includes('DRG分析')">
      <tr>
        <th class="table-danger"> DRG分析
          <a href="#" v-on:click="close('DRG分析')" style="float: right">✖</a>
        </th>
      </tr>
    </table>
    <!-- <table v-if="type === '在线交流'"> -->
    <table v-if="this.$store.state.Edit.rightPanels.includes('在线交流')">
      <tr class="table-danger">
        <th class="table-danger" colspan="2"> 当前在线用户：
          <a href="#" v-on:click="close('在线交流')" style="float: right">✖</a>
        </th>
      </tr>
      <tr v-for="(data, index) in chatUsers" v-bind:key='index'>
        <td class="table-danger"> {{data}}</td>
        <td class="table-danger" v-on:click="invite(data)"><a href="#">邀请</a></td>
      </tr>
    </table>
    <!-- <table v-if="type === 'HIS接口'"> -->
    <table v-if="this.$store.state.Edit.rightPanels.includes('HIS接口')">
      <tr>
        <th class="table-danger"> HIS接口
          <a href="#" v-on:click="close('HIS接口')" style="float: right">✖</a>
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
  import RightPanelDoc from './RightPanelDoc';
  import RightPanelHis from './RightPanelHis';
  import RightPanelCdh from './RightPanelCdh';
  import { invite } from '../../utils/Socket'
  export default {
    components: { RightPanelDoc, RightPanelCdh, RightPanelHis },
    computed: {
      type: {
        get() {
          return this.$store.state.Edit.helpType
        }
      },
      chatUsers: {
        get() {
          return this.$store.state.Edit.chatUsers
        }
      }
    },
    methods: {
      invite(data) {
        invite(this, this.$store.state.System.user.username, data)
      },
      close(data) {
        this.$store.commit('EDIT_DELETE_RIGHT_PANELS', data);
      },
      fold(data) {
        this.$store.commit('EDIT_SET_RIGHT_FOLDS', data);
      }
    },
  };
</script>

<style scoped>
  ul {
    padding-bottom: 0;
  }
</style>
