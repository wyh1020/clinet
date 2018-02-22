<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='getServers'>
          <a class="nav-link text-light" href="#"> 远程服务器列表 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='getUsers'>
          <a class="nav-link text-light" href="#"> 用户设置 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='getOrgs'>
          <a class="nav-link text-light" href="#"> 机构设置 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='getPersons'>
          <a class="nav-link text-light" href="#"> 人员设置 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='getServerFunctions'>
          <a class="nav-link text-light" href="#"> 远程服务功能设置 <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      </form>
    </div>
  </nav>
</template>

<script>
  import loadFile from '../../utils/LoadFile';
  export default {
    data() {
      return {
        paths: []
      };
    },
    methods: {
      getServers: function () {
        loadFile(this, 'hitb_server.csv', 'system')
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getServers');
      },
      getUsers: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getUsers');
      },
      getOrgs: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getOrgs');
      },
      getPersons: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getPersons');
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
