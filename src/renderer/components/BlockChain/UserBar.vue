<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='setUser()' id="block-user-setup">
          <a class="nav-link text-light" href="#"> 账户设置 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='account()' id="block-user-account">
          <a class="nav-link text-light" href="#"> 账户余额 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='transaction()' id="block-user-transaction">
          <a class="nav-link text-light" href="#"> 转账交易 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='transRecord()' id="block-user-trans-record">
          <a class="nav-link text-light" href="#"> 账户交易记录 <span class="sr-only">(current)</span></a>
        </li>
        <!-- <li class="nav-item active" v-on:click="page('up')" id="block-user-trans-record">
          <a class="nav-link text-light" href="#"> 前页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click="page('down')" id="block-user-trans-record">
          <a class="nav-link text-light" href="#"> 后页 <span class="sr-only">(current)</span></a>
        </li> -->
      </ul>
      <form class="form-inline my-2 my-lg-0" v-on:submit.prevent>
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="block-user-search">
      </form>
    </div>
  </nav>
</template>

<script>
  import { open, getAccountsPublicKey } from '../../utils/BlockAccount'
  import { transactionsUnconfirmedAll } from '../../utils/BlockTransaction'
  export default {
    data() {
      return {
        paths: [],
        name: 'someone manual strong movie roof episode eight spatial brown soldier soup motor'
      };
    },
    methods: {
      setUser: function () {
        this.$store.commit('BLOCK_SET_TOOLBAR', 'setUser');
        this.$store.commit('SET_NOTICE', '账户设置');
        this.login();
      },
      account: function () {
        this.$store.commit('BLOCK_SET_TOOLBAR', 'account');
        this.$store.commit('SET_NOTICE', '账户余额');
      },
      transaction: function () {
        this.$store.commit('BLOCK_SET_TOOLBAR', 'transaction');
        this.$store.commit('SET_NOTICE', '转账交易');
        const ip = this.$store.state.System.server
        const port = 4000
        const username = this.$store.state.Block.account.username
        getAccountsPublicKey(this, [ip, port, username])
      },
      transRecord: function () {
        const ip = this.$store.state.System.server
        const port = 4000
        const user = global.hitbdata.blockchain_user
        // getTransactions(this, [ip, port, user])
        transactionsUnconfirmedAll(this, [ip, port, user])
        this.$store.commit('BLOCK_SET_TOOLBAR', 'transRecord');
        this.$store.commit('SET_NOTICE', '账户交易记录');
      },
      login: function () {
        const ip = this.$store.state.System.server
        const port = 4000
        // const user = global.hitbdata.blockchain_user
        const username = this.$store.state.System.user.username
        open(this, [ip, port, this.name, 1, username])
        // if (user === '') {
        //   open(this, [ip, port, user, 1, username])
        // } else {
        //   const user = Array.from(this.name.split(' '));
        //   if (user.length === 12) {
        //     open(this, [ip, port, this.name, 1, username])
        //   }
        // }
      },
      page: function (value) {
        console.log(value);
        // const ip = this.$store.state.Block.server
        // const port = this.$store.state.Block.port
        // const user = global.hitbdata.blockchain_user
        // if (value === 'up' && this.$store.state.Block.pege === 0) {
        //   this.$store.commit('SET_NOTICE', '已经是第一页');
        // } else if (value === 'down' && this.$store.state.Block.trans.transactions.length < 10) {
        //   this.$store.commit('SET_NOTICE', '已经是最后一页');
        // } else {
        //   this.$store.commit('BLOCK_SET_PAGE', value);
        //   // getTransactions(this, [ip, port, user])
        // }
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
  #navbarSupportedContent {
    background-image: linear-gradient(to right , #4772fe, #7997fa);
  }
  .nav-link {
    color:#ffffff;
  }

</style>
