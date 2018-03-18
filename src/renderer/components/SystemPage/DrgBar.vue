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
        <li class="nav-item active" v-on:click='compareData' id="server-drg-checkdata">
          <a class="nav-link text-light" href="#"> 校验数据 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='drgCompute' id="server-drg-comp">
          <a class="nav-link text-light" href="#"> 调用Drg分组服务 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='drgResult' id="server-drg-stop">
          <a class="nav-link text-light" href="#"> 停止Drg分组服务 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='drgRule' id="server-drg-rule">
          <a class="nav-link text-light" href="#"> 查看Drg分组规则 <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="server-drg-search">
      </form>
    </div>
  </nav>
</template>

<script>
  import { sGetWt4, sCompDrg, sGetCompRule } from '../../utils/Server'
  export default {
    data() {
      return {
        paths: []
      };
    },
    methods: {
      getLocalData: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getLocalData');
        this.$store.commit('SYSTEM_LOAD_WT4_FILES');
        this.$store.commit('SYSTEM_TABLE_TYPE', 'local');
      },
      getServerData: function () {
        if (this.$store.state.System.connectInfo) {
          this.$store.commit('SYSTEM_SET_TOOLBAR', 'getServerData');
          this.$store.commit('SYSTEM_TABLE_TYPE', 'server');
          sGetWt4(this, [this.$store.state.System.server, this.$store.state.System.port, 1])
        } else {
          this.$store.commit('SET_NOTICE', '服务器连接未设置,请在系统服务内连接');
        }
      },
      compareData: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'compareData');
      },
      drgCompute: function () {
        switch (this.$store.state.System.toolbar) {
          case 'getLocalData':
            this.$store.state.System.wt4LocalRow.forEach((n) => {
              sCompDrg(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.System.wt4Tables[n]], 'getLocalData')
            })
            break;
          case 'getServerData':
            this.$store.state.System.wt4Row.forEach((n) => {
              if (this.$store.state.System.connectInfo) {
                sCompDrg(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.System.wt4.data[n]])
              } else {
                this.$store.commit('SET_NOTICE', '服务器连接未设置,请在系统服务内连接');
              }
            })
            break;
          default:
        }
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'drgCompute');
      },
      drgResult: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'drgResult');
      },
      drgRule: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'drgRule');
        sGetCompRule(this, [this.$store.state.System.server, this.$store.state.System.port, 'mdc', {}])
      },
      page: function (value) {
        if (this.$store.state.System.tableType === 'server') {
          this.$store.commit('SYSTEM_SET_LOCAL_PAGE', value);
          sGetWt4(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.System.localPage])
        } else if (value === 'up' && this.$store.state.System.localPage === 0) {
          this.$store.commit('SET_NOTICE', '已经是第一页');
        } else if (value === 'down' && this.$store.state.System.localPage === this.$store.state.System.wt4TablePage) {
          this.$store.commit('SET_NOTICE', '已经是最后一页');
        } else {
          this.$store.commit('SET_NOTICE', '');
          this.$store.commit('SYSTEM_SET_LOCAL_PAGE', value);
        }
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
