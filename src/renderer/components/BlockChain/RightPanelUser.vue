<template>
  <div>
    <div v-if="toolbar == 'setUser'">
      <!-- <form v-if="account.address === ''">
        <div class="form-group">
          <label class="text-danger">用户名</label>
          <input type="password" placeholder="用户名" v-model="name">
        </div>
      </form>
      <button v-if="account.address === ''" id="block-rightpanel-login" class="btn btn-outline-primary" v-on:click="login">登陆</button> -->
      <div v-if="account.address !== ''">
        <table>
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
          <input type="text" class="form-control" placeholder="发送者" v-model="this.$store.state.Block.account.publicKey" disabled="true">
        </div>
        <div class="form-group">
          <label>接受者</label>
          <select class="form-control" v-model="pay.targetAddress">
            <option v-for="(value, index) in publicKeys"  v-bind:key='index'>{{value}}</option>
          </select>
        </div>
        <div class="form-group">
          <label>金额</label>
          <input type="text" class="form-control" placeholder="金额" v-model="pay.amount">
        </div>
        <div class="form-group"  v-if="this.$store.state.Block.account.secondPublicKey">
          <label>二级密码</label>
          <input type="password" class="form-control" placeholder="二级密码" v-model="pay.secondPassword">
        </div>
        <div class="form-group">
          <label>费用</label>
          <input type="text" class="form-control" placeholder="费用" v-model="pay.fee">
        </div>
        <div class="form-group">
          <label>备注</label>
          <input type="text" class="form-control" placeholder="备注" v-model="pay.message">
        </div>
      </form>
      <button type="submit" class="btn btn-primary" v-on:click="payTrans()">发送</button>
    </div>
    <div v-if="toolbar == 'transRecord'">
      <table>
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
          <tr v-for="(tran, index) in trans" v-bind:key='index'>
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
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" v-for= "(value, index) in blockChain.page_list" v-bind:key="index" v-bind:class="{'disabled':value.page == blockChain.page_num}" v-on:click="blockChainPage(value.page)"><a class="page-link" href="#">
            {{value.num}}
          </a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  import { open } from '../../utils/BlockAccount'
  import { blockPost } from '../../utils/BlockTransaction'
  export default {
    data() {
      return {
        flag: null,
        name: 'someone manual strong movie roof episode eight spatial brown soldier soup motor',
        pay: {
          recipientId: this.$store.state.Block.account.publicKey,
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
          return this.$store.state.Block.transUn
        }
      },
      blockChain: {
        get() {
          return this.$store.state.Block.blockChain
        }
      },
      publicKeys: {
        get() {
          return this.$store.state.Block.publicKeys
        }
      }
    },
    // created: function () {
    //   this.getPublicKey()
    // },
    methods: {
      login: function () {
        const ip = this.$store.state.System.server
        const port = this.$store.state.System.port
        const user = global.hitbdata.blockchain_user
        const username = this.$store.state.System.user.username
        if (user === '') {
          open(this, [ip, port, user, 1, username])
        } else {
          const user = Array.from(this.name.split(' '));
          if (user.length === 12) {
            open(this, [ip, port, this.name, 1, username])
          }
        }
      },
      payTrans: function () {
        const data = this.pay
        console.log(data);
        const ip = this.$store.state.System.server
        const port = 4000
        blockPost(this, [ip, port, data])
        // transactions1(this, [ip, port, data])
      },
      blockChainPage: function (value) {
        const ip = this.$store.state.System.server
        const port = this.$store.state.System.port
        const user = global.hitbdata.blockchain_user
        const username = this.$store.state.System.user.username
        open(this, [ip, port, user, value, username])
      }
    },
  };
</script>

<style scoped>

</style>
