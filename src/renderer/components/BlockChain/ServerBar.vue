<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='getServers' id="block-get-servers">
          <a class="nav-link text-light" href="#"> 服务器节点列表 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='setNodes' id="block-set-nodes">
          <a class="nav-link text-light" href="#"> 设置连接节点 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='blockChainInfo' id="block-chain-info">
          <a class="nav-link text-light" href="#"> 区块链服务介绍 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='blockChainFunction' id="block-chain-function">
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
    methods: {
      getServers: function () {
        loadFile(this, 'hitb_blockchain.csv', 'block')
        this.$store.commit('BLOCK_SET_TOOLBAR', 'getServers');
        this.$store.commit('SET_NOTICE', '服务器节点列表');
      },
      setNodes: function () {
        this.$store.commit('BLOCK_SET_TOOLBAR', 'setNodes');
        this.$store.commit('SET_NOTICE', '设置连接节点');
      },
      blockChainInfo: function () {
        this.$store.commit('BLOCK_SET_TOOLBAR', 'blockChainInfo');
        this.$store.commit('SET_NOTICE', '区块链服务介绍');
      },
      blockChainFunction: function () {
        this.$store.commit('BLOCK_SET_TOOLBAR', 'blockChainFunction');
        this.$store.commit('SET_NOTICE', '区块链服务功能列表');
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
