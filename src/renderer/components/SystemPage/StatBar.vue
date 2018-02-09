<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='getTables'>
          <a class="nav-link text-light" href="#"> 服务器病案数据 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='getTables'>
          <a class="nav-link text-light" href="#"> 选择分析指标 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='getTables'>
          <a class="nav-link text-light" href="#"> 选择分析维度 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='getTables'>
          <a class="nav-link text-light" href="#"> 开始计算 <span class="sr-only">(current)</span></a>
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
        this.$store.commit('SET_TOOLBAR', 'files');
        this.$store.commit('GET_FILES', files);
      },
      getTables: function () {
        const tables = Object.keys(global.hitbdata.table)
        this.$store.commit('SET_TOOLBAR', 'tables');
        this.$store.commit('GET_TABLES', tables);
      },
      compareTable: function () {
        this.$store.commit('SET_TOOLBAR', 'compareTable');
      },
      checkTable: function () {
        this.$store.commit('SET_TOOLBAR', 'checkTable');
      },
      loadTable: function () {
        this.$store.commit('SET_TOOLBAR', 'loadTable');
      },
      compDrg: function () {
        this.$store.commit('SET_TOOLBAR', 'compDrg');
      },
      upLoadTableData: function () {
        this.$store.commit('SET_TOOLBAR', 'upLoadTableData');
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
