<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='getLocalData' id="server-drg-localcase-data">
          <a class="nav-link text-light" href="#"> 本地病案数据 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='getServerData' id="server-drg-sercase-data">
          <a class="nav-link text-light" href="#"> 服务器病案数据 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click="page('up')" id="server-drg-checkdata">
          <a class="nav-link text-light" href="#"> 前页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click="page('down')" id="server-drg-checkdata">
          <a class="nav-link text-light" href="#"> 后页 <span class="sr-only">(current)</span></a>
        </li>
        <!-- <li class="nav-item active" v-on:click='compareData' id="server-drg-checkdata">
          <a class="nav-link text-light" href="#"> 校验数据 <span class="sr-only">(current)</span></a>
        </li> -->
        <li class="nav-item active" v-on:click='drgCompute' id="server-drg-comp">
          <a class="nav-link text-light" href="#"> 调用Drg分组服务 <span class="sr-only">(current)</span></a>
        </li>
        <!-- <li class="nav-item active" v-on:click='drgResult' id="server-drg-stop">
          <a class="nav-link text-light" href="#"> 停止Drg分组服务 <span class="sr-only">(current)</span></a>
        </li> -->
        <li class="nav-item active" v-on:click='drgRule' id="server-drg-rule">
          <a class="nav-link text-light" href="#"> 查看Drg分组规则 <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <div class="form-inline my-2 my-lg-0" v-if="this.toolbar === 'getLocalData'">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="server-drg-search" v-on:keyup.13="systemSearch" v-model='system'>
      </div>
    </div>
  </nav>
</template>

<script>
  import { sGetWt4, sCompDrg, sGetCompRule } from '../../utils/Server'
  export default {
    data() {
      return {
        paths: [],
        system: ''
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
      localPage: {
        get() {
          return this.$store.state.System.localPage
        }
      },
      toolbar: {
        get() {
          return this.$store.state.System.toolbar
        }
      },
      xsLocal: {
        get() {
          let data = [];
          if (this.$store.state.System.wt4LocalRow.length === 0) {
            data = this.$store.state.System.wt4Tables
          } else {
            data = this.$store.state.System.wt4LocalRow
          }
          return data
        }
      },
      xsServer: {
        get() {
          let data = []
          if (this.$store.state.System.wt4Row.length === 0) {
            data = this.$store.state.System.wt4.data
          } else {
            data = this.$store.state.System.wt4Row
          }
          return data
        }
      }
    },
    methods: {
      // 获取本地病案数据
      getLocalData: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getLocalData');
        this.$store.commit('SET_NOTICE', '本地病案数据');
        // 返回默认值页码
        this.$store.commit('SYSTEM_SET_LOCAL_PAGE', 1);
        // 保存分组数据类型
        this.$store.commit('SYSTEM_SET_COMPUTE_DATA', 'getLocalData');
        this.$store.commit('SYSTEM_LOAD_WT4_FILES');
      },
      getServerData: function () {
        if (this.$store.state.System.connectInfo) {
          this.$store.commit('SYSTEM_SET_TOOLBAR', 'getServerData');
          this.$store.commit('SET_NOTICE', '服务器病案数据');
          // 返回默认值页码
          this.$store.commit('SYSTEM_SET_LOCAL_PAGE', 1);
          // 保存分组数据类型
          this.$store.commit('SYSTEM_SET_COMPUTE_DATA', 'getServerData');
          sGetWt4(this, [this.server, this.port, 1])
        } else {
          this.$store.commit('SET_NOTICE', '服务器连接未设置,请在系统服务内连接');
        }
      },
      compareData: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'compareData');
      },
      // 调用drg分组服务器
      drgCompute: function () {
        this.$store.commit('SET_NOTICE', '调用DRG分组服务器');
        if (this.$store.state.System.connectInfo) {
          switch (this.toolbar) {
            case 'getLocalData':
              this.xsLocal.forEach((n, index) => {
                sCompDrg(this, [this.server, this.port, this.$store.state.System.wt4Tables[index], 'BJ'], 'getLocalData')
              })
              break;
            case 'getServerData':
              this.xsServer.forEach((n, index) => {
                sCompDrg(this, [this.server, this.port, this.$store.state.System.wt4.data[index], 'BJ'])
              })
              break;
            default:
          }
          this.$store.commit('SYSTEM_SET_TOOLBAR', 'drgCompute');
        } else {
          this.$store.commit('SET_NOTICE', '服务器连接未设置,请在系统服务内连接');
        }
      },
      drgResult: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'drgResult');
      },
      // 查看drg规则
      drgRule: function () {
        if (this.$store.state.System.connectInfo) {
          this.$store.commit('SET_NOTICE', '查看DRG分组规则');
          this.$store.commit('SYSTEM_SET_TOOLBAR', 'drgRule');
          sGetCompRule(this, [this.server, this.port, 'mdc', {}])
        } else {
          this.$store.commit('SET_NOTICE', '服务器连接未设置,请在系统服务内连接');
        }
      },
      // 翻页
      page: function (value) {
        if (this.$store.state.System.computeData === 'getServerData') {
          this.$store.commit('SYSTEM_SET_LOCAL_PAGE', value);
          sGetWt4(this, [this.server, this.port, this.localPage])
          this.$store.commit('SET_NOTICE', `当前页数${this.localPage}`);
        } else if (value === 'up' && this.localPage === 0) {
          this.$store.commit('SET_NOTICE', '已经是第一页');
        } else if (value === 'down' && this.localPage === this.$store.state.System.wt4TablePage) {
          this.$store.commit('SET_NOTICE', '已经是最后一页');
        } else {
          this.$store.commit('SET_NOTICE', `当前页数${this.localPage}`);
          this.$store.commit('SYSTEM_SET_LOCAL_PAGE', value);
        }
      },
      // 搜索框
      systemSearch: function () {
        this.$store.commit('SYSTEM_SET_LOCAL_PAGE', 1);
        this.$store.commit('SYSTEM_SET_SEARCH', this.system);
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
