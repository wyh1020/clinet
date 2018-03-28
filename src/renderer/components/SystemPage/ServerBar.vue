<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='getServers' id="server-remote-list">
          <a class="nav-link text-light" href="#"> 远程服务器列表 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='getUsers' id="server-user-setup">
          <a class="nav-link text-light" href="#"> 用户设置 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='getOrgs' id="server-org-setup">
          <a class="nav-link text-light" href="#"> 机构设置 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='getPersons' id="server-people-setup" v-if="this.$store.state.System.userPower === 1">
          <a class="nav-link text-light" href="#"> 人员设置 <span class="sr-only">(current)</span></a>
        </li>
        <!-- <li class="nav-item active" v-on:click='getServerFunctions' id="server-remote-function-setup">
          <a class="nav-link text-light" href="#"> 远程服务功能设置 <span class="sr-only">(current)</span></a>
        </li> -->
      </ul>
      <!-- <div class="form-inline my-2 my-lg-0" v-if="['getPersons', 'getOrgs'].includes(this.$store.state.System.toolbar)">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="server-search">
      </div> -->
    </div>
  </nav>
</template>

<script>
  import { sGetOrg, sGetProvince, sGetUsers } from '../../utils/Server';
  import loadFile from '../../utils/LoadFile';
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
      }
    },
    methods: {
      getServers: function () {
        loadFile(this, 'hitb_server.csv', 'system')
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getServers');
        this.$store.commit('SET_NOTICE', '远程服务器列表');
      },
      getUsers: function () {
        if (!this.$store.state.System.connectInfo) {
          loadFile(this, 'hitb_server.csv', 'system')
        }
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getUsers');
        this.$store.commit('SET_NOTICE', '用户设置');
      },
      getOrgs: function () {
        sGetProvince(this, [this.server, this.port])
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getOrgs');
        sGetOrg(this, [this.server, this.port, this.$store.state.System.user, this.$store.state.System.pageInfo.org]);
        this.$store.commit('SET_NOTICE', '机构设置');
      },
      getPersons: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getPersons');
        sGetUsers(this, [this.server, this.port]);
        this.$store.commit('SET_NOTICE', '人员设置');
      },
      getServerFunctions: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getServerFunctions');
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
