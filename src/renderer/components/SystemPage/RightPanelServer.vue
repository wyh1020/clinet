<template>
  <div>
    <div v-if="this.$store.state.System.toolbar === 'getUsers'">
      <form>
        <div class="form-group">
          <label for="InputEmail">用户注册的Email地址</label>
          <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
        </div>
        <div class="form-group">
          <label for="InputPassword">用户密码</label>
          <input type="password" class="form-control" id="InputPassword" placeholder="Password" v-model="password">
        </div>
      </form>
      <button type="submit" class="btn btn-primary" v-on:click="register">注册用户</button>
    </div>
    <div v-if="this.$store.state.System.toolbar === 'getOrgs'">
      <form>
        <div class="form-group">
          <label for="InputEmail">机构设置</label>
          <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
        </div>
        <div class="form-group">
          <label for="InputPassword">用户密码</label>
          <input type="password" class="form-control" id="InputPassword" placeholder="Password" v-model="password">
        </div>
      </form>
      <button type="submit" class="btn btn-primary" v-on:click="register">添加机构</button>
    </div>
    <div v-if="this.$store.state.System.toolbar === 'getPersons'">
      <form>
        <div class="form-group">
          <label for="InputEmail">机构人员设置</label>
          <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
        </div>
        <div class="form-group">
          <label for="InputPassword">用户密码</label>
          <input type="password" class="form-control" id="InputPassword" placeholder="Password" v-model="password">
        </div>
      </form>
      <button type="submit" class="btn btn-primary" v-on:click="register">添加机构</button>
    </div>
    <table>
      <tr v-for="(data, index) in file" v-bind:key='index' v-on:click="onClick(data, index)" v-bind:class="{'table-danger':flag == index}">
        <td v-for="(field, index) in data" v-bind:key='index'>{{data[index]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  // import { sGetOrg, sCreateOrg, sUpdateOrg, sGetDepart, sCreateDepart, sUpdateDepart, sGetSystemDepart, sUploadDoc, sCheckDoc, sInsertDoc, sStatDoc, sCompDrg, sUpdateUser, sGetStat, sGetStatInfo, sGetStatInfoChart, sdownLoadStatInfo, sSaveDefined, sGetRule, sSearchRule, sGetUser, sLogin, sRegister } from '../../utils/server'
  import { sGetUser, sLogin, sRegister } from '../../utils/Server'
  export default {
    data() {
      return {
        flag: null,
        email: '',
        password: ''
      }
    },
    computed: {
      file: {
        get() {
          const f = []
          let fileLen = this.$store.state.System.file.length;
          switch (this.$store.state.System.toolbar) {
            case 'getServers':
              if (fileLen > 99) { fileLen = 99 }
              for (let i = 0; i < fileLen; i += 1) {
                f.push(this.$store.state.System.file[i].split(','))
              }
              break;
            case 'getUsers':
              break;
            case 'getOrgs':
              break;
            case 'getPersons':
              break;
            case 'getServerFunctions':
              break;
            default:
              break;
          }
          return f
        }
      },
    },
    methods: {
      onClick: function (data, index) {
        this.flag = index
        this.$store.commit('SYSTEM_SET_SERVER', data);
        if (this.$store.state.System.toolbar === 'getServers') {
          sGetUser(this, [data[1], data[2], index])
          sLogin(this, [data[1], data[2]])
        }
      },
      register: function () {
        console.log(this.email)
        console.log(this.password)
        sRegister(this, [this.$store.state.System.server, this.$store.state.System.port, this.email, this.password])
        // sGetOrg(this, [this.$store.state.System.server, this.$store.state.System.port, this.email, this.password])
      }
    },
  };
</script>

<style scoped>

</style>
