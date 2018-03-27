<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#edit-rightbar-nav" aria-controls="edit-rightbar-nav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="edit-rightbar-nav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="edit-rightbar-choice" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            选择
          </a>
          <div class="dropdown-menu" aria-labelledby="edit-rightbar-choice">
            <a class="dropdown-item" href="#" v-on:click='help("编辑器使用帮助")' id="edit-rightbar-editorHelp">编辑器使用帮助</a>
            <a class="dropdown-item" href="#" v-on:click='help("输入框提示")' id="edit-rightbar-inputPrompt">输入框提示</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click='help("病案历史")' id="edit-rightbar-medicalHistory">病案历史</a>
            <a class="dropdown-item" href="#" v-on:click='help("病案参考")' id="edit-rightbar-medicalRefer">病案参考</a>
          </div>
        </li>
        <li class="nav-item active" v-on:click='help(null)' id="edit-rightbar-help">
          <a class="nav-link text-light" href="#"> 帮助 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='localData' id="edit-rightbar-local">
          <a class="nav-link text-light" href="#"> 本地文件 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='serverData' id="edit-rightbar-server">
          <a class="nav-link text-light" href="#"> 远程文件 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active">
          <a class="nav-link text-light" href="#" v-on:click='page(-1)' id="edit-rightbar-uppage"> 前页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active">
          <a class="nav-link text-light" href="#" v-on:click='page(1)' id="edit-rightbar-downpage"> 后页 <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <div class="form-inline my-2 my-lg-0"  v-on:submit.prevent>
        <input class="mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-on:keyup.enter="rightEnter" v-model="rightItem">
      </div>
    </div>
  </nav>
</template>

<script>
  import { getEditFiles, getEdit } from '../../utils/EditServerFile'
  export default {
    data() {
      return {
        name: this.$route.name,
        rightItem: ''
      };
    },
    methods: {
      help: function (n) {
        this.$store.commit('EDIT_SET_RIGHT_PANEL', 'help');
        if (n) {
          this.$store.commit('EDIT_SET_HELP_TYPE', n);
          this.$store.commit('SET_NOTICE', n);
        }
      },
      localData: function () {
        this.$store.commit('EDIT_SET_RIGHT_PANEL', 'local');
        this.$store.commit('EDIT_SET_LEFT_PANEL', 'table');
        switch (this.$store.state.Edit.lastNav) {
          case '/stat':
            this.$store.commit('STAT_LOAD_FILES');
            break;
          case '/library':
            this.$store.commit('LIBRARY_LOAD_FILES');
            break;
          case '/system':
            this.$store.commit('SYSTEM_GET_FILES');
            break;
          default:
            this.$store.commit('EDIT_SET_LAST_NAV', '/edit');
            this.$store.commit('EDIT_LOAD_FILES');
        }
        this.$store.commit('SET_NOTICE', '读取本地文件');
        this.$store.commit('EDIT_SET_HINT_TYPE', 'notice');
      },
      serverData: function () {
        this.$store.commit('EDIT_SET_SERVER_TYPE', 'user');
        if (!this.$store.state.System.user.login) {
          this.$store.commit('SET_NOTICE', '未登录用户,请在系统服务-用户设置内登录');
        } else {
          getEditFiles(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.Edit.serverType])
          this.$store.commit('SET_NOTICE', '读取远程文件');
          this.$store.commit('EDIT_SET_RIGHT_PANEL', 'server');
        }
      },
      page: function (n) {
        if (this.$store.state.Edit.rightPanel === 'left') {
          if (this.$store.state.Edit.filePage === 0 && n === -1) {
            this.$store.commit('SET_NOTICE', '当前已是第一页')
          } else {
            this.$store.commit('EDIT_SET_FILE_PAGE', n);
            this.$store.commit('SET_NOTICE', '下一页')
          }
        } else if (this.$store.state.Edit.filesPage === 0 && n === -1) {
          this.$store.commit('SET_NOTICE', '当前已是第一页')
        } else {
          this.$store.commit('EDIT_SET_FILES_PAGE', n);
          this.$store.commit('SET_NOTICE', '下一页')
        }
      },
      rightEnter(e) {
        if (this.$store.state.Edit.rightPanel === 'local') {
          const files = this.$store.state.Edit.files
          const index = files.indexOf(e.target.value)
          if (index === -1) {
            this.$store.commit('SET_NOTICE', '未查找到，请输入完整内容！')
          } else {
            this.$store.commit('EDIT_SET_FILES_INDEX', index);
          }
          this.rightItem = ''
        } else if (this.$store.state.Edit.rightPanel === 'server' && this.$store.state.Edit.serverType === 'file') {
          getEditFiles(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.Edit.serverType, e.target.value])
          if (this.$store.state.Edit.files === []) {
            this.$store.commit('SET_NOTICE', '未查找到，请输入完整用户名！')
          }
        } else if (this.$store.state.Edit.rightPanel === 'server' && this.$store.state.Edit.serverType === 'show') {
          getEdit(this, [this.$store.state.System.server, this.$store.state.System.port, e.target.value])
          if (this.$store.state.Edit.files === []) {
            this.$store.commit('SET_NOTICE', '未查找到，请输入完整内容！')
          }
        }
      },
      // newFiles: function () {
      //   const x = new Date().toLocaleDateString()
      //   const p = this.$store.state.Edit.lastNav
      //   saveFile(this, x, p)
      //   this.$store.commit('EDIT_SET_HINT_TYPE', 'notice');
      //   // this.$store.commit('EDIT_NEW_FILES');
      // },
    },
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
</style>
