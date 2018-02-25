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
          <a class="nav-link text-light" href="#"> 前一页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='page(1)' id="library-down">
          <a class="nav-link text-light" href="#"> 后一页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='edit' id="library-edit">
          <a class="nav-link text-light" href="#"> 编辑数据 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="library-dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            维度选择
          </a>
          <div class="dropdown-menu" aria-labelledby="library-dropdown">
            <a class="nav-link" href="#" v-on:click='selX("机构")'> 机构 <span class="sr-only">(current)</span></a>
            <a class="nav-link" href="#" v-on:click='selX("时间")'> 时间 <span class="sr-only">(current)</span></a>
            <a class="nav-link" href="#" v-on:click='selX("版本")'> 版本 <span class="sr-only">(current)</span></a>
            <div class="dropdown-divider"></div>
            <a class="nav-link" href="#" v-on:click='selX(null)'> 添加列维度 <span class="sr-only">(current)</span></a>
          </div>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      </form>
    </div>
  </nav>
</template>

<script>
  export default {
    data() {
      return {
        paths: []
      };
    },
    methods: {
      loadData: function () {
        this.$store.commit('LIBRARY_SET_LEFT_PANEL', ['file', null]);
        this.$store.commit('LIBRARY_LOAD_FILES');
        this.$store.commit('SET_NOTICE', '本地文件');
      },
      serverData: function () {
        this.$store.commit('LIBRARY_SERVER_FILES');
        this.$store.commit('SET_NOTICE', '远程文件');
      },
      page: function (n) {
        this.$store.commit('LIBRARY_TABLE_PAGE', [n]);
        this.$store.commit('SET_NOTICE', '翻页');
      },
      edit: function () {
        this.$store.commit('EDIT_SET_LAST_NAV', '/library');
        this.$store.commit('EDIT_SET_RIGHT_PANEL', 'local');
        this.$router.push('/edit');
        // this.$store.commit('GET_PATH', 'paths');
      },
      selX: function (x) {
        this.$store.commit('LIBRARY_SET_LEFT_PANEL', ['dimension', x]);
        this.$store.commit('SET_NOTICE', '区块列表');
        this.$store.commit('SET_NOTICE', '维度选择');
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
