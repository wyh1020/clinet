<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='setUser' id="set-user">
          <a class="nav-link text-light" href="#"> 账户设置 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='account' id="account">
          <a class="nav-link text-light" href="#"> 账户余额 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='transaction' id="transaction">
          <a class="nav-link text-light" href="#"> 转账交易 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='transRecord' id="trans-record">
          <a class="nav-link text-light" href="#"> 账户交易记录 <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      </form>
    </div>
  </nav>
</template>

<script>
  import { getTransactions, transactionsUnconfirmedAll } from '../../utils/BlockTransaction'
  export default {
    data() {
      return {
        paths: []
      };
    },
    methods: {
      setUser: function () {
        this.$store.commit('BLOCK_SET_TOOLBAR', 'setUser');
        this.$store.commit('SET_NOTICE', '账户设置');
      },
      account: function () {
        this.$store.commit('BLOCK_SET_TOOLBAR', 'account');
        this.$store.commit('SET_NOTICE', '账户余额');
      },
      transaction: function () {
        this.$store.commit('BLOCK_SET_TOOLBAR', 'transaction');
        this.$store.commit('SET_NOTICE', '转账交易');
      },
      transRecord: function () {
        const ip = this.$store.state.Block.server
        const port = this.$store.state.Block.port
        const user = global.hitbdata.blockchain_user
        // console.log(ip)
        getTransactions(this, [ip, port, user])
        transactionsUnconfirmedAll(this, [ip, port, user])
        this.$store.commit('BLOCK_SET_TOOLBAR', 'transRecord');
        this.$store.commit('SET_NOTICE', '账户交易记录');
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
