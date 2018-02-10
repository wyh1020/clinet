<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='help'>
          <a class="nav-link text-light" href="#"> 帮助 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='loadData'>
          <a class="nav-link text-light" href="#"> 本地文件 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='serverData'>
          <a class="nav-link text-light" href="#"> 远程文件 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active">
          <a class="nav-link text-light" href="#"> 前一页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active">
          <a class="nav-link text-light" href="#"> 后一页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            选择帮助类型
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">输入框提示</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">病案历史</a>
            <a class="dropdown-item" href="#">病案参考</a>
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
        name: this.$route.name
      };
    },
    methods: {
      help: function () {
        this.$store.commit('EDIT_SET_RIGHT_PANEL', 'help');
      },
      loadData: function () {
        this.$store.commit('EDIT_SET_RIGHT_PANEL', 'local');
        this.$store.commit('EDIT_LOAD_FILES');
      },
      serverData: function () {
        this.$store.commit('EDIT_SERVER_FILES');
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
