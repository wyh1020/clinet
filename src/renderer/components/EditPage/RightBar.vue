<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#edit-rightbar-nav" aria-controls="edit-rightbar-nav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="edit-rightbar-nav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="edit-rightbar-choice" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{helpType}}
          </a>
          <div class="dropdown-menu" id="edit-rightbar-sel" aria-labelledby="edit-rightbar-choice">
            <a class="dropdown-item" href="#" v-on:click="help('编辑器使用帮助')">编辑器使用帮助</a>
            <div class="dropdown-divider"></div>
            <a v-for="(data, index) in helpTypes" v-bind:key='index' class="dropdown-item" href="#" v-on:click='help(data)' v-bind:id="'edit-rightbar-'+data">{{data}}</a>
            <!-- <a class="dropdown-item" href="#" v-on:click='help("输入框提示")' id="edit-rightbar-inputPrompt">输入框提示</a>
            <a class="dropdown-item" href="#" v-on:click='help("病案参考")' id="edit-rightbar-medicalRefer">病案参考</a>
            <a class="dropdown-item" href="#" v-on:click='help("病案历史")' id="edit-rightbar-medicalHistory">病案历史</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click='help("在线交流")' id="edit-rightbar-onlineSay">在线交流</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click='help("DRG分析")' id="edit-rightbar-drgStat">DRG分析</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click='help("HIS接口")' id="edit-rightbar-hisInterface">HIS接口</a> -->
          </div>
        </li>
        <li class="nav-item active" v-on:click='help(null)' id="edit-rightbar-help">
          <a class="nav-link text-light" href="#"> 辅助 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='localData()' id="edit-rightbar-local">
          <a class="nav-link text-light" href="#"> 本地 <span class="sr-only">(current)</span>
            <span style="color: red"><b>{{isSaveLocal}}</b></span>
          </a>
        </li>
        <li class="nav-item active" v-on:click='serverData()' id="edit-rightbar-server">
          <a class="nav-link text-light" href="#"> 远程 {{isSaveServer}}<span class="sr-only">(current)</span>
            <span style="color: red"><b>{{isSaveServer}}</b></span>
          </a>
        </li>
        <li class="nav-item active" v-on:click='blockData()' id="edit-rightbar-block">
          <a class="nav-link text-light" href="#"> 区块链 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active">
          <a class="nav-link text-light" href="#" v-on:click='page(-1)' id="edit-rightbar-uppage"> 前页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active">
          <a class="nav-link text-light" href="#" v-on:click='page(1)' id="edit-rightbar-downpage"> 后页 <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0" v-on:submit.prevent>
        <input class="form-control mr-sm-2" type="search" placeholder="模糊查询" aria-label="Search" v-on:keyup.enter="rightEnter" v-model="rightItem">
      </form>
    </div>
  </nav>
</template>

<script>
  import { getEditFiles, getEdit, clinetHelp, getDocTypes, getHelpTypes, getCaseHistory } from '../../utils/EditServerFile'
  import { getStat } from '../../utils/StatServerFile'
  import { getLibrary } from '../../utils/LibraryServerFile'
  import { sCompDrg } from '../../utils/Server'
  export default {
    data() {
      return {
        name: this.$route.name,
        rightItem: '',
        // helpType: '编辑器使用帮助'
      };
    },
    computed: {
      isSaveLocal: {
        get() {
          let length = null
          if (this.$store.state.Edit.isSaveLocal.length > 0) {
            length = this.$store.state.Edit.isSaveLocal.length
          }
          return length
        }
      },
      isSaveServer: {
        get() {
          let length = null
          if (this.$store.state.Edit.isSaveServer.length > 0) {
            length = this.$store.state.Edit.isSaveServer.length
          }
          return length
        }
      },
      helpType: {
        get() {
          return this.$store.state.Edit.helpType
        }
      },
      helpTypes: {
        get() {
          return this.$store.state.Edit.helpTypes
        }
      },
    },
    methods: {
      help: function (n) {
        if (n) {
          this.$store.commit('EDIT_SET_RIGHT_PANELS', n);
          this.$store.commit('SET_NOTICE', n);
          this.$store.commit('EDIT_SET_HELP_TYPE', n);
          if (this.$store.state.Edit.rightPanel === 'server') {
            clinetHelp(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.System.user.username)
          }
          if (n === 'DRG分析') {
            if (this.$store.state.System.wt4Tables.length > 1) {
              sCompDrg(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.System.wt4Tables, 'BJ', 'getLocalData')
            } else {
              this.$store.commit('SET_NOTICE', '请选择分析数据！');
            }
          } else if (n === '编辑器使用帮助' || n === '在线交流') {
            this.$store.commit('SET_NOTICE', n);
            this.helpType = n
            this.$store.commit('EDIT_SET_RIGHT_PANEL', 'help');
          } else if (this.$store.state.Edit.rightPanel === '输入框提示') {
            if (this.$store.state.Edit.rightPanel === 'server') {
              if (!this.$store.state.Edit.rightCdh) {
                this.$store.commit('SET_NOTICE', '输入提示无内容！');
              } else if (!global.hitbdata.cdh) {
                this.$store.commit('SET_NOTICE', '输入提示无内容！');
              }
            }
          } else if (n === '病案历史') {
            getCaseHistory(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.Edit.doc, this.$store.state.System.user.username)
          }
        }
      },
      localData: function () {
        this.$store.commit('EDIT_SET_RIGHT_PANELS', '本地文件');
        this.$store.commit('EDIT_SET_DOC_TYPES', ['自定义文档', '病案首页（卫统四CSV）', '入院申请', '首次病程', '病程记录', '病案首页', '门诊病案', '健康体检']);
        this.$store.commit('EDIT_SET_HELP_TYPES', ['输入框提示', '病案参考', '病案历史', '在线交流', 'DRG分析', 'HIS接口'])
        this.$store.commit('EDIT_SET_CHAT_TYPE', false);
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
        // this.$store.commit('EDIT_SET_DOC_TYPES',)
        getHelpTypes(this, [this.$store.state.System.server, this.$store.state.System.port])
        getDocTypes(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.System.user.username)
        this.$store.commit('EDIT_SET_CHAT_TYPE', false);
        this.$store.commit('EDIT_SET_SERVER_TYPE', 'user');
        this.$store.commit('EDIT_SET_LEFT_PANEL', 'table');
        this.$store.commit('EDIT_SET_RIGHT_PANEL', 'server');
        if (!this.$store.state.System.user.login) {
          this.$store.commit('SET_NOTICE', '未登录用户,请在系统服务-用户设置内登录');
          this.$store.commit('EDIT_SERVER_FILES', []);
          // this.$store.commit('EDIT_SET_RIGHT_PANEL', 'server');
        } else {
          this.$store.commit('EDIT_SET_RIGHT_PANELS', '远程文件');
          this.$store.commit('SET_NOTICE', '读取远程文件');
          getEditFiles(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.Edit.serverType, this.$store.state.System.user.username, 'server')
          // this.$store.commit('EDIT_SET_RIGHT_PANEL', 'server');
        }
      },
      blockData: function () {
        this.$store.commit('EDIT_SET_RIGHT_PANELS', '区块链文件');
        this.$store.commit('SET_NOTICE', '读取区块链文件');
        this.$store.commit('EDIT_SET_SERVER_TYPE', 'user');
        getEditFiles(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.Edit.serverType, this.$store.state.System.user.username, 'block')
        // this.$store.commit('EDIT_SET_RIGHT_PANEL', 'server');
        this.$store.commit('EDIT_SET_RIGHT_PANEL', 'block');
      },
      page: function (n) {
        if (this.$store.state.Edit.rightType === 'left') {
          let page = 0
          let countPage = 0
          switch (this.$store.state.Edit.lastNav) {
            case '/library':
              page = this.$store.state.Library.tablePage
              countPage = this.$store.state.Library.countPage
              break;
            case '/stat':
              page = this.$store.state.Stat.tablePage
              countPage = this.$store.state.Stat.countPage
              break;
            default:
              page = this.$store.state.Edit.filePage
              break;
          }
          if (page === 1 && n === -1) {
            this.$store.commit('SET_NOTICE', '当前已是第一页')
          } else if (countPage === page && n === 1 && ['/stat', '/library'].includes(this.$store.state.Edit.lastNav)) {
            this.$store.commit('SET_NOTICE', '当前已是尾页');
          } else {
            switch (this.$store.state.Edit.lastNav) {
              case '/library':
                if (this.$store.state.Library.tableType === 'server') {
                  this.$store.commit('LIBRARY_TABLE_PAGE', [n]);
                  getLibrary(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.Library.serverTable.tableName, this.$store.state.Library.tablePage, this.$store.state.Library.dimensionType, this.$store.state.Library.dimensionServer, 'edit', 'server')
                } else {
                  this.$store.commit('LIBRARY_TABLE_PAGE', [n]);
                  this.$store.commit('EDIT_LOAD_FILE', this.$store.state.Library.localTable)
                  this.$store.commit('SET_NOTICE', `当前${this.$store.state.Library.tablePage}页,共${this.$store.state.Library.countPage}页`)
                }
                break;
              case '/stat':
                if (this.$store.state.Stat.tableType === 'server') {
                  this.$store.commit('STAT_TABLE_PAGE', n);
                  getStat(this, [this.$store.state.System.server, this.$store.state.System.port], { tableName: this.$store.state.Stat.serverTable.tableName, page: this.$store.state.Stat.tablePage, username: this.$store.state.System.user.username, type: this.$store.state.Stat.dimensionType, value: this.$store.state.Stat.dimensionServer }, 'edit')
                } else {
                  this.$store.commit('STAT_TABLE_PAGE', n);
                  this.$store.commit('SET_NOTICE', `当前${this.$store.state.Stat.tablePage}页,共${this.$store.state.Stat.countPage}页`)
                }
                break;
              default:
                this.$store.commit('EDIT_SET_FILE_PAGE', n);
                this.$store.commit('SET_NOTICE', '下一页')
                break;
            }
          }
        } else if (this.$store.state.Edit.rightPanel === 'edit') {
          if (this.$store.state.Edit.filesPage === 0 && n === -1) {
            this.$store.commit('SET_NOTICE', '当前已是第一页')
          } else {
            this.$store.commit('EDIT_SET_FILES_PAGE', n);
            this.$store.commit('SET_NOTICE', '下一页')
          }
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
        } else if ((this.$store.state.Edit.rightPanel === 'block' || this.$store.state.Edit.rightPanel === 'server') && this.$store.state.Edit.serverType === 'file') {
          getEditFiles(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.Edit.serverType, this.$store.state.System.user.username, this.$store.state.Edit.rightPanel)
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
  #edit-rightbar-nav {
    background-image: linear-gradient(to right , #4772fe, #7997fa);
  }
  .nav-link {
    color:#ffffff;
  }
</style>
