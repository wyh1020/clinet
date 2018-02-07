<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='loadPath'>
          <a class="nav-link text-light" href="#"> 选择CSV文件 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='loadModal'>
          <a class="nav-link text-light" href="#"> 选择数据表 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='loadPath'>
          <a class="nav-link text-light" href="#"> 对照 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='loadPath'>
          <a class="nav-link text-light" href="#"> 校验 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='loadPath'>
          <a class="nav-link text-light" href="#"> 导入 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='loadPath'>
          <a class="nav-link text-light" href="#"> DRG分组 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='loadPath'>
          <a class="nav-link text-light" href="#"> DRG分析 <span class="sr-only">(current)</span></a>
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
  const path = require('path');
  const basePath = path.format({ dir: 'C:\\hitbdata' });
  // const c = fs.existsSync(a)
  // const b = fs.readdirSync(a)
  // const stat = fs.lstatSync('C:\\Users');
  // console.log(stat.isDirectory())
  export default {
    data() {
      return {
        paths: []
      };
    },
    methods: {
      loadPath: function () {
        const paths = fs.readdirSync(basePath)
        this.$store.commit('GET_PATH', paths);
      },
      loadModal: function () {
        const tables = Object.keys(global.hitbdata.table)
        this.$store.commit('GET_TABLES', tables);
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
