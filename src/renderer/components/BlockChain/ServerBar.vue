<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='getServers'>
          <a class="nav-link text-light" href="#"> 服务器节点列表 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='setNodes'>
          <a class="nav-link text-light" href="#"> 设置连接节点 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='blockChainInfo'>
          <a class="nav-link text-light" href="#"> 区块链服务介绍 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='blockChainFunction'>
          <a class="nav-link text-light" href="#"> 区块链服务功能列表 <span class="sr-only">(current)</span></a>
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
        loadFile(this, 'hitb_blockchain.csv', 'system')
        this.$store.commit('BLOCK_SET_TOOLBAR', 'getServers');
      },
      setNodes: function () {
        this.$store.commit('BLOCK_SET_TOOLBAR', 'setNodes');
      },
      blockChainInfo: function () {
        this.$store.commit('BLOCK_SET_TOOLBAR', 'blockChainInfo');
      },
      blockChainFunction: function () {
        this.$store.commit('BLOCK_SET_TOOLBAR', 'blockChainFunction');
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
