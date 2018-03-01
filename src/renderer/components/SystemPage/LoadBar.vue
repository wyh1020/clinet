<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='getFiles' id="server-load-loaclfile">
          <a class="nav-link text-light" href="#"> 选择CSV文件 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='getTables' id="server-choose-database">
          <a class="nav-link text-light" href="#"> 选择数据表 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='compareTable'>
          <a class="nav-link text-light" href="#"> 对照数据 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='checkTable'>
          <a class="nav-link text-light" href="#"> 校验数据 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='loadTable'>
          <a class="nav-link text-light" href="#"> 导入数据 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='saveTableData'>
          <a class="nav-link text-light" href="#"> 保存本地文件 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='upLoadTableData'>
          <a class="nav-link text-light" href="#"> 上传服务器数据 <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      </form>
    </div>
  </nav>
</template>

<script>
  const fs = require('fs');
  export default {
    data() {
      return {
        paths: []
      };
    },
    methods: {
      loadPath: function () {},
      getFiles: function () {
        const files = fs.readdirSync(global.hitbdata.path.home)
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'files');
        this.$store.commit('SYSTEM_GET_FILES', files);
      },
      getTables: function () {
        const tables = Object.keys(global.hitbdata.table)
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'tables');
        this.$store.commit('SYSTEM_GET_TABLES', tables);
      },
      compareTable: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'compareTable');
      },
      checkTable: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'checkTable');
      },
      loadTable: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'loadTable');
      },
      saveTableData: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'saveTableData');
      },
      upLoadTableData: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'upLoadTableData');
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
