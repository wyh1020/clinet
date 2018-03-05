<template>
  <div>
    <div v-if="toolbar == 'setUser'">
      <form v-if="!account">
        <div class="form-group">
          <label for="exampleInputEmail1" class="text-danger">注册的Email地址</label>
          <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1" class="text-danger">用户密码</label>
          <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
      </form>
      <button v-if="!account" id="login" class="btn btn-outline-primary" v-on:click="login">登陆</button>
      <div  v-if="account">
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
    <div v-if="toolbar == 'transRecord'">
      trans
      {{trans}}
    </div>
  </div>
</template>

<script>
  import { open } from '../../utils/BlockAccount'
  export default {
    data() {
      return {
        flag: null,
        email: '',
        password: ''
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
        open(this, [ip, port, user])
      }
    },
  };
</script>

<style scoped>

</style>
