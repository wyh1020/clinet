<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='serverData()' id="server-stat-case-data">
          <a class="nav-link text-light" href="#"> 服务器病案数据 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='getIndex()' id="server-stat-choose-index">
          <a class="nav-link text-light" href="#"> 选择分析指标 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='getDimension()' id="server-stat-choose-stat">
          <a class="nav-link text-light" href="#"> 选择分析维度 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='statCompute()' id="server-stat-start-count">
          <a class="nav-link text-light" href="#"> 开始计算 <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <!-- <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="server-stat-search">
      </form> -->
    </div>
  </nav>
</template>

<script>
  import { sGetTarget, sGetWt4 } from '../../utils/Server'
  export default {
    data() {
      return {
        paths: []
      };
    },
    computed: {
      server: {
        get() {
          return this.$store.state.System.server
        }
      },
      port: {
        get() {
          return this.$store.state.System.port
        }
      },
    },
    created: function () {
      this.serverData();
    },
    methods: {
      // 获取服务器数据
      serverData: function () {
        if (!this.$store.state.System.user.login) {
          this.$store.commit('SET_NOTICE', '未登录用户,请在系统服务-用户设置内登录');
        } else {
          this.$store.commit('SYSTEM_SET_TOOLBAR', 'serverData');
          sGetWt4(this, [this.server, this.port], 1)
        }
      },
      // 获取分析指标
      getIndex: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getIndex');
        sGetTarget(this, [this.server, this.port], 'list');
      },
      // 获取维度
      getDimension: function () {
        sGetTarget(this, [this.server, this.port], '');
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getDimension');
      },
      // 调用分组计算
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
  #navbarSupportedContent {
    background-image: linear-gradient(to right , #4772fe, #7997fa);
  }
  .nav-link {
    color:#ffffff;
  }
</style>
