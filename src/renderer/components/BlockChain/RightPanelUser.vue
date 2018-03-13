<template>
  <div>
    <div v-if="toolbar == 'setUser'">
      <form v-if="account.address === ''">
        <div class="form-group">
          <label class="text-danger">用户名</label>
          <input type="password" placeholder="用户名" v-model="name">
        </div>
      </form>
      <button v-if="account.address === ''" id="block-rightpanel-login" class="btn btn-outline-primary" v-on:click="login">登陆</button>
      <div  v-if="account.address !== ''">
        <table class="table">
          <tr v-for="(line, index) in Object.entries(account)" v-bind:key='index'>
            <td v-for="(filed, index) in line" v-bind:key='index'>{{line[index]}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="toolbar == 'account'">
      {{account.balance}}
    </div>
    <div v-if="toolbar == 'transaction'">
      <form>
        <div class="form-group">
          <label>发送者</label>
          <input type="text" class="form-control" placeholder="Enter email" v-model="this.$store.state.Block.account.address" disabled="true">
        </div>
        <div class="form-group">
          <label>接受者</label>
          <input type="text" class="form-control" placeholder="Enter email" v-model="pay.targetAddress">
        </div>
        <div class="form-group">
          <label>金额</label>
          <input type="text" class="form-control" placeholder="Enter email" v-model="pay.amount">
        </div>
        <div class="form-group"  v-if="this.$store.state.Block.account.secondPublicKey">
          <label>二级密码</label>
          <input type="password" class="form-control" placeholder="Enter email" v-model="pay.secondPassword">
        </div>
        <div class="form-group">
          <label>费用</label>
          <input type="text" class="form-control" placeholder="Enter email" v-model="pay.fee">
        </div>
        <div class="form-group">
          <label>备注</label>
          <input type="text" class="form-control" placeholder="Enter email" v-model="pay.message">
        </div>
      </form>
      <button type="submit" class="btn btn-primary" v-on:click="payTrans">发送</button>
    </div>
    <div v-if="toolbar == 'transRecord'">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>类型</th>
            <th>发送者</th>
            <th>接受者</th>
            <th>费用</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tran, index) in trans.transactions" v-bind:key='index'>
            <td>{{tran.id}}</td>
            <td>{{tran.type}}</td>
            <td>{{tran.recipientId}}</td>
            <td>
              {{tran.senderId}}
            </td>
            <td>{{tran.amount}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { open } from '../../utils/BlockAccount'
  import { transactions1 } from '../../utils/BlockTransaction'
  export default {
    data() {
      return {
        flag: null,
        name: 'someone manual strong movie roof episode eight spatial brown soldier soup motor',
        pay: {
          recipientId: this.$store.state.Block.account.address,
          targetAddress: 'ABbhjhV4g32tWr7JPg1fZfX1TGH9TZQEFg',
          amount: 100,
          secondPass: 'dzc944262316',
          fee: '0.1',
          message: ''
        }
      }
    },
    computed: {
      toolbar: {
        get() {
          return this.$store.state.Block.toolbar
        }
      },
      account: {
        get() {
          return this.$store.state.Block.account
        }
      },
      trans: {
        get() {
          return this.$store.state.Block.trans
        }
      }
    },
    methods: {
      load: function (n) {
        switch (n) {
          case 1:
            this.$router.push('/edit');
            break;
          default:
            this.$router.push('/edit');
        }
      },
      login: function () {
        const ip = this.$store.state.Block.server
        const port = this.$store.state.Block.port
        const user = global.hitbdata.blockchain_user
        if (user === '') {
          open(this, [ip, port, user])
        } else {
          const user = Array.from(this.name.split(' '));
          if (user.length === 12) {
            open(this, [ip, port, this.name])
          }
        }
      },
      payTrans: function () {
        const data = this.pay
        console.log(data);
        const ip = this.$store.state.Block.server
        const port = this.$store.state.Block.port
        transactions1(this, [ip, port, data])
      }
    },
  };
</script>

<style scoped>

</style>
