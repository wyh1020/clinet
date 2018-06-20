<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="library-dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            文件
          </a>
          <div class="dropdown-menu" aria-labelledby="library-dropdown">
            <a class="nav-link" href="#" title="显示本地文件" v-on:click='loadData()'> 本地 <span class="sr-only">(current)</span></a>
            <a class="nav-link" href="#" title="显示远程文件" v-on:click='serverData()'> 远程 <span class="sr-only">(current)</span></a>
            <a class="nav-link" href="#" title="显示区块链文件" v-on:click='blockData()'> 区块链 <span class="sr-only">(current)</span></a>
          </div>
        </li>
        <!-- <li class="nav-item active" v-on:click='loadData()' id="library-local-file">
          <a class="nav-link text-light" href="#" title="显示本地文件"> 本地 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='serverData()' id="library-remote-file">
          <a class="nav-link text-light" href="#" title="显示远程文件"> 远程 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='blockData()' id="library-block-file">
          <a class="nav-link text-light" href="#" title="显示区块链文件"> 区块链 <span class="sr-only">(current)</span></a>
        </li> -->

        <li class="nav-item active" v-if ="this.$store.state.Library.tableType === 'server'" v-on:click='blockShare()' id="library-block-file">
          <a class="nav-link text-light" href="#" title="分享选中记录"> 分享 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='page(-1)' id="library-up">
          <a class="nav-link text-light" href="#" title="向前翻页"> 前页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='page(1)' id="library-down">
          <a class="nav-link text-light" href="#" title="向后翻页"> 后页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='edit()' id="library-edit">
          <a class="nav-link text-light" href="#" title="跳转到编辑来编辑该文件"> 编辑数据 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="library-dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            维度选择
          </a>
          <div class="dropdown-menu" aria-labelledby="library-dropdown">
            <!-- <a class="nav-link" href="#" v-on:click='selX("机构")' id="library-dropdown-org"> 机构 <span class="sr-only">(current)</span></a> -->
            <a class="nav-link" href="#" v-on:click='selX("year")' id="library-dropdown-time"> 年份 <span class="sr-only">(current)</span></a>
            <a class="nav-link" href="#" v-on:click='selX("version")' id="library-dropdown-version"> 版本 <span class="sr-only">(current)</span></a>
            <a class="nav-link" href="#" v-on:click='selX("all")' id="library-dropdown-version"> 全部 <span class="sr-only">(current)</span></a>
            <div class="dropdown-divider"></div>
            <!-- <a class="nav-link" href="#" v-on:click='selX(null)'> 添加列维度 <span class="sr-only">(current)</span></a> -->
          </div>
        </li>
      </ul>
      <div class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-on:keyup.13="librarySearch()" v-model="library">
      </div>
    </div>
  </nav>
</template>

<script>
  import { getLibraryFiles, getLibrary, getList } from '../../utils/LibraryServerFile';
  import { share } from '../../utils/Server';
  import loadFile from '../../utils/LoadFile';
  export default {
    data() {
      return {
        paths: [],
        library: ''
      };
    },
    methods: {
      loadData: function () {
        this.$store.commit('LIBRARY_SET_LEFT_PANEL', ['file', null]);
        this.$store.commit('LIBRARY_LOAD_FILES');
        this.$store.commit('LIBRARY_SET_TABLE_TYPE', 'local');
        this.$store.commit('SET_NOTICE', '本地文件');
      },
      serverData: function () {
        if (!this.$store.state.System.user.login) {
          this.$store.commit('SET_NOTICE', '未登录用户,请在系统服务-用户设置内登录');
        } else {
          this.$store.commit('SET_NOTICE', '远程文件');
          this.$store.commit('LIBRARY_SET_TABLE_TYPE', 'server');
          this.$store.commit('LIBRARY_SET_LEFT_PANEL', ['file', null]);
          getLibraryFiles(this, [this.$store.state.System.server, this.$store.state.System.port], 'server')
        }
      },
      blockData: function () {
        if (!this.$store.state.System.user.login) {
          this.$store.commit('SET_NOTICE', '未登录用户,请在系统服务-用户设置内登录');
        } else {
          this.$store.commit('SET_NOTICE', '区块链文件');
          this.$store.commit('LIBRARY_SET_TABLE_TYPE', 'block');
          this.$store.commit('LIBRARY_SET_LEFT_PANEL', ['file', null]);
          getLibraryFiles(this, [this.$store.state.System.server, this.$store.state.System.port], 'block')
        }
      },
      page: function (n) {
        if (this.$store.state.Library.tablePage === 1 && n === -1) {
          this.$store.commit('SET_NOTICE', '当前已是第一页')
        } else if ((this.$store.state.Library.tablePage === this.$store.state.Library.countPage && n === 1) || this.$store.state.Library.countPage === 0) {
          this.$store.commit('SET_NOTICE', '当前已是尾页');
        } else if (this.$store.state.Library.tableType === 'server' || this.$store.state.Library.tableType === 'block') {
          this.$store.commit('LIBRARY_TABLE_PAGE', [n]);
          getLibrary(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.Library.serverTable.tableName, this.$store.state.Library.tablePage, this.$store.state.Library.dimensionType, this.$store.state.Library.dimensionServer, 'library', this.$store.state.Library.tableType)
        } else if (this.$store.state.Library.tableType === 'local') {
          this.$store.commit('LIBRARY_TABLE_PAGE', [n]);
          this.$store.commit('SET_NOTICE', `当前${this.$store.state.Library.tablePage}页,共${this.$store.state.Library.countPage}页`)
        }
      },
      edit: function () {
        let f = []
        if (this.$store.state.Library.tableType === 'local') {
          if (this.$store.state.Library.localTable.includes(undefined)) {
            f = this.$store.state.Library.localTable.filter(x => x !== undefined)
          } else {
            f = this.$store.state.Library.localTable
          }
        }
        if (this.$store.state.Library.tableType === 'server') {
          this.$store.commit('EDIT_SET_LEFT_PANEL', 'table');
          this.$store.commit('EDIT_SET_LAST_NAV', '/library');
          this.$store.commit('EDIT_SET_RIGHT_PANEL', 'server');
          this.$store.commit('EDIT_SET_FILES_INDEX', 0);
          this.$store.commit('EDIT_SET_LEFT_PANEL', 'table')
        } else {
          if (this.$store.state.Library.fileIndex !== null) {
            this.$store.commit('EDIT_SET_LEFT_PANEL', 'table');
            this.$store.commit('EDIT_LOAD_FILE', f);
          }
          this.$store.commit('EDIT_SET_LAST_NAV', '/library');
          this.$store.commit('EDIT_SET_RIGHT_PANEL', 'local');
          this.$store.commit('EDIT_SET_FILES_INDEX', this.$store.state.Library.fileIndex);
        }
        this.$router.push('/edit');
        this.$store.commit('EDIT_SET_BAR_VALUE', '');
      },
      selX: function (x) {
        switch (this.$store.state.Library.tableType) {
          case 'local': {
            if (this.$store.state.Library.localTable.length > 0) {
              if (x === 'all') {
                this.$store.commit('LIBRARY_SET_LEFT_PANEL', ['file', null]);
                loadFile(this, this.$store.state.Library.files[this.$store.state.Library.fileIndex], 'library')
              } else {
                this.$store.commit('LIBRARY_SET_LEFT_PANEL', ['dimension', x]);
                this.$store.commit('SET_NOTICE', '维度选择');
              }
            } else {
              this.$store.commit('SET_NOTICE', '请选择文件');
            }
            break;
          }
          case 'server': {
            if (this.$store.state.Library.serverTable.data.length > 0) {
              if (x === 'all') {
                this.$store.commit('LIBRARY_SET_LEFT_PANEL', ['file', null]);
                getLibrary(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.Library.serverTable.tableNam, this.$store.state.Library.tablePage, this.$store.state.Library.dimensionType, this.$store.state.Library.dimensionServer, 'library', 'block')
              } else {
                getList(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.Library.serverTable.tableName, x, this.$store.state.System.user.username)
              }
            } else {
              this.$store.commit('SET_NOTICE', '请选择文件');
            }
            break;
          }
          default: {
            break;
          }
        }
      },
      librarySearch: function () {
        switch (this.$store.state.Library.tableType) {
          case 'local':
            this.$store.commit('LIBRARY_GET_SEARCH_TABLE', this.library)
            break;
          case 'server':
            getLibrary(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.Library.serverTable.tableNam, 1, this.$store.state.Library.dimensionType, this.$store.state.Library.dimensionServer, 'library', 'block')
            break;
          default:
        }
      },
      blockShare: function () {
        let array = []
        array = this.$store.state.Library.fieldIndex.map(n => this.$store.state.Library.serverTable.data[n])
        share(this, [this.$store.state.System.server, this.$store.state.System.port], 'library', this.$store.state.System.shareFileName, this.$store.state.System.user.username, array)
      }
    },
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  #navbarSupportedContent {
    background-image: linear-gradient(to right , #4772fe, #7997fa);
  }
  .nav-item {
    color:#ffffff;
  }
  .nav-link {
    color:#000000;
  }

</style>
