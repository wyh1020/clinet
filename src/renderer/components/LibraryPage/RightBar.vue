<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='loadData' id="library-local-file">
          <a class="nav-link text-light" href="#"> 本地文件 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='serverData' id="library-remote-file">
          <a class="nav-link text-light" href="#"> 远程文件 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='page(-1)' id="library-up">
          <a class="nav-link text-light" href="#"> 前页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='page(1)' id="library-down">
          <a class="nav-link text-light" href="#"> 后页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='edit' id="library-edit">
          <a class="nav-link text-light" href="#"> 编辑数据 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="library-dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            维度选择
          </a>
          <div class="dropdown-menu" aria-labelledby="library-dropdown">
            <!-- <a class="nav-link" href="#" v-on:click='selX("机构")' id="library-dropdown-org"> 机构 <span class="sr-only">(current)</span></a> -->
            <a class="nav-link" href="#" v-on:click='selX("时间")' id="library-dropdown-time"> 时间 <span class="sr-only">(current)</span></a>
            <a class="nav-link" href="#" v-on:click='selX("版本")' id="library-dropdown-version"> 版本 <span class="sr-only">(current)</span></a>
            <div class="dropdown-divider"></div>
            <!-- <a class="nav-link" href="#" v-on:click='selX(null)'> 添加列维度 <span class="sr-only">(current)</span></a> -->
          </div>
        </li>
      </ul>
      <div class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-on:keyup.13="librarySearch" v-model="library">
      </div>
    </div>
  </nav>
</template>

<script>
  import { getLibraryFiles, getLibrary } from '../../utils/LibraryServerFile';
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
          getLibraryFiles(this, [this.$store.state.System.server, this.$store.state.System.port])
        }
      },
      page: function (n) {
        if (this.$store.state.Library.tablePage === 1 && n === -1) {
          this.$store.commit('SET_NOTICE', '当前已是第一页')
        } else if (this.$store.state.Library.tablePage === this.$store.state.Library.serverTablePage.count && n === 1) {
          this.$store.commit('SET_NOTICE', '当前已是尾页');
        } else if (this.$store.state.Library.tableType === 'server') {
          this.$store.commit('LIBRARY_TABLE_PAGE', [n]);
          this.$store.commit('SET_NOTICE', `当前${this.$store.state.Library.tablePage}页,共${this.$store.state.Library.serverTablePage.count}页`)
          getLibrary(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.Library.tableName, this.$store.state.Library.tablePage])
        } else {
          this.$store.commit('LIBRARY_TABLE_PAGE', [n]);
          this.$store.commit('SET_NOTICE', `当前${this.$store.state.Library.tablePage}页,共${this.$store.state.Library.tableCountPage}页`)
        }
      },
      edit: function () {
        if (this.$store.state.Library.fileIndex !== null) {
          this.$store.commit('EDIT_SET_LEFT_PANEL', 'table');
          loadFile(this, this.$store.state.Library.files[this.$store.state.Library.fileIndex], 'library', 'edit')
        }
        this.$store.commit('EDIT_SET_LAST_NAV', '/library');
        this.$store.commit('EDIT_SET_RIGHT_PANEL', 'local');
        this.$store.commit('EDIT_SET_FILES_INDEX', this.$store.state.Library.fileIndex);
        this.$router.push('/edit');
        // this.$store.commit('GET_PATH', 'paths');
      },
      selX: function (x) {
        this.$store.commit('LIBRARY_SET_LEFT_PANEL', ['dimension', x]);
        this.$store.commit('SET_NOTICE', '区块列表');
        this.$store.commit('SET_NOTICE', '维度选择');
      },
      librarySearch: function () {
        switch (this.$store.state.Library.tableType) {
          case 'local':
            this.$store.commit('LIBRARY_GET_SEARCH_TABLE', this.library)
            break;
          case 'server':
            getLibrary(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.Stat.tableName, 0, this.library])
            break;
          default:
        }
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

</style>
