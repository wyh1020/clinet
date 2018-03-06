<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='serverData' id="server-stat-case-data">
          <a class="nav-link text-light" href="#"> 服务器病案数据 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='getIndex' id="server-stat-choose-index">
          <a class="nav-link text-light" href="#"> 选择分析指标 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='getDimension' id="server-stat-choose-stat">
          <a class="nav-link text-light" href="#"> 选择分析维度 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='statCompute' id="server-stat-start-count">
          <a class="nav-link text-light" href="#"> 开始计算 <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="server-stat-search">
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
      serverData: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'serverData');
      },
      getIndex: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getIndex');
      },
      getDimension: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getDimension');
      },
      statCompute: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'statCompute');
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
