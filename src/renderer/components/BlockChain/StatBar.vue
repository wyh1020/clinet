<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='serverStatData' id="server-stat-data">
          <a class="nav-link text-light" href="#"> 服务器病案数据 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='getIndex' id="get-index">
          <a class="nav-link text-light" href="#"> 选择分析指标 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='getDimension' id="get-dimension">
          <a class="nav-link text-light" href="#"> 选择分析维度 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='compStat' id="comp-stat">
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
  export default {
    data() {
      return {
        paths: []
      };
    },
    methods: {
      serverStatData: function () {
        this.$store.commit('BLOCK_SET_TOOLBAR', 'serverStatData');
        this.$store.commit('SET_NOTICE', '服务器病案数据');
      },
      getIndex: function () {
        this.$store.commit('BLOCK_SET_TOOLBAR', 'getIndex');
        this.$store.commit('SET_NOTICE', '选择分析指标');
      },
      getDimension: function () {
        this.$store.commit('BLOCK_SET_TOOLBAR', 'getDimension');
        this.$store.commit('SET_NOTICE', '选择分析维度');
      },
      compStat: function () {
        this.$store.commit('BLOCK_SET_TOOLBAR', 'compStat');
        this.$store.commit('SET_NOTICE', '开始计算');
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
