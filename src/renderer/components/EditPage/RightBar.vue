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
            <a class="dropdown-item" href="#" v-on:click='help'>输入框提示</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click='help'>病案历史</a>
            <a class="dropdown-item" href="#" v-on:click='help'>病案参考</a>
          </div>
        </li>
        <li class="nav-item active" v-on:click='help' id="edit-rightbar-help">
          <a class="nav-link text-light" href="#"> 帮助 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='localData' id="edit-rightbar-local">
          <a class="nav-link text-light" href="#"> 本地 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='serverData' id="edit-rightbar-server">
          <a class="nav-link text-light" href="#"> 远程 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='newFiles' id="edit-rightbar-files">
          <a class="nav-link text-light" href="#"> 新文件 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active">
          <a class="nav-link text-light" href="#" v-on:click='page(-1)' id="edit-rightbar-uppage"> 前页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active">
          <a class="nav-link text-light" href="#" v-on:click='page(1)' id="edit-rightbar-downpage"> 后页 <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      </form>
    </div>
  </nav>
</template>

<script>
  import saveFile from '../../utils/SaveFile'
  export default {
    data() {
      return {
        name: this.$route.name
      };
    },
    methods: {
      help: function () {
        this.$store.commit('EDIT_SET_RIGHT_PANEL', 'help');
      },
      localData: function () {
        this.$store.commit('EDIT_SET_LAST_NAV', 'user');
        this.$store.commit('EDIT_SET_RIGHT_PANEL', 'local');
        this.$store.commit('EDIT_SET_LEFT_PANEL', 'table');
        this.$store.commit('EDIT_LOAD_FILES');
      },
      serverData: function () {
        this.$store.commit('EDIT_SET_RIGHT_PANEL', 'server');
        this.$store.commit('EDIT_SERVER_FILES');
      },
      page: function (n) {
        if (this.$store.state.Edit.rightPanel === 'left') {
          this.$store.commit('EDIT_SET_FILE_PAGE', n);
        } else {
          this.$store.commit('EDIT_SET_FILES_PAGE', n);
        }
      },
      newFiles: function () {
        const x = new Date().toLocaleDateString()
        const p = this.$store.state.Edit.lastNav
        saveFile(this, x, p)
        // this.$store.commit('EDIT_NEW_FILES');
      },
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
