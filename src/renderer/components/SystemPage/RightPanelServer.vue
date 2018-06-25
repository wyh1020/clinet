<template>
  <div>
    <div v-if="this.toolbar === 'getServers'" id="system-server-port">
      <table>
        <tr v-for="(data, index) in file" v-bind:key='index' v-on:click="connect(data, index)" v-bind:class="{'table-danger':flag == index && index !== 0}" class="server-rightpanel-tr" v-bind:id="'system-td-tr'+index">
          <td v-for="(field, index) in data" v-bind:key='index'>{{data[index]}}</td>
        </tr>
      </table>
    </div>
    <!-- 连接服务器状态 -->
    <!-- <div v-if="this.$store.state.System.connectInfo == true" > -->
      <!-- 登录状态 -->
        <!-- 未登录 -->
        <div v-if="this.$store.state.System.user.login == false && this.$store.state.Block.account.address === ''">
          <div v-if="this.toolbar === 'getUsers'">
            <form>
              <div class="form-group">
                <label class="">用户名（远程服务用户是电子邮箱，区块链服务用户是12个单词组成的口令）</label>
                <input type="text" class="form-control" placeholder="用户名(邮箱)" v-model="emailorname" id="server-username" @input="userLogins()">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">用户密码（区块链服务用户没有密码，或者使用二级密码）</label>
                <input type="password" class="form-control" placeholder="密码" v-model="loginpassword" id="server-password" @input="userLogins()">
              </div>
              <div class="form-group" v-if="this.secondPassword">
                <label for="exampleInputPassword1">确认密码</label>
                <input type="password" class="form-control" placeholder="密码" v-model="confirmPassword" id="server-password" @input="userLogins()">
              </div>
            </form>
            <button id="server-login" type="button" class="btn btn-outline-primary" v-on:click="sysytemlogin()"  v-if="!this.secondPassword">登录(可使用用户账号登录和区块链账号登录)</button>
            <button id="server-regiest" type="button" class="btn btn-outline-primary" v-on:click="sysytemRegisters()"  v-if="!this.secondPassword">注册</button>
            <button id="server-again-regiest" type="button" class="btn btn-outline-primary" v-on:click="sysytemRegister()"  v-if="this.secondPassword">确认注册</button>
            <button id="server-login-return" type="button" class="btn btn-outline-primary" v-on:click="sysytemReturn()"  v-if="this.secondPassword">返回</button>
          </div>
        </div>
        <!-- 未登录 -->
        <!-- 已登录 -->
        <div v-else>
          <!-- <div v-if="this.toolbar === 'upUsers'">
              <form>
                <div class="form-group">
                  <label>新密码</label>
                  <input type="password" class="form-control" placeholder="新密码" v-model="upUserInfo.password" @input="updateUser()">
                  <small class="form-text text-muted">请输入新的密码</small>
                </div>
                <div class="form-group">
                  <label>机构</label>
                  <input type="text" class="form-control" placeholder="新机构" v-model="upUserInfo.org" @input="updateUser()">
                  <small class="form-text text-muted">请输入新的机构</small>
                </div>
              </form>
          </div> -->
          <div v-if="this.toolbar === 'createUsers'">
            <div>
              <form>
                <div class="form-group">
                  <label for="InputEmail">用户注册的Email地址</label>
                  <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email" v-model="email" @input="register()">
                </div>
                <div class="form-group">
                  <label for="InputPassword">新用户密码</label>
                  <input type="password" class="form-control" id="InputPassword" placeholder="Password" v-model="password" @input="register()">
                </div>
                <div class="form-group">
                  <label for="InputOrg">机构</label>
                  <input type="text" class="form-control" id="InputOrg" placeholder="InputOrg" v-model="org" @input="register()">
                </div>
                <div class="form-group">
                  <label for="InputAge">年龄</label>
                  <input type="number" class="form-control" id="InputAge" placeholder="Age" v-model="age" @input="register()">
                </div>
                <div class="form-group">
                  <label for="InputTel">电话</label>
                  <input type="text" class="form-control" id="InputTel" placeholder="Tel" v-model="tel" @input="register()">
                </div>
                <div class="form-group">
                  <label for="InputPersonname">姓名</label>
                  <input type="text" class="form-control" id="InputPersonname" placeholder="Personname" v-model="personname" @input="register()">
                </div>
              </form>
              <button id="server-login" type="button" class="btn btn-outline-primary" v-on:click="sysytemUpdate()">确认修改</button>
            </div>
          </div>
          <div v-if="this.toolbar === 'getUsers'">
            <div v-if="this.userInfo === 'info'">
              <get-users></get-users>
            </div>
            <div v-else>
              <form>
                <div class="form-group">
                  <label>新密码</label>
                  <input type="password" class="form-control" placeholder="新密码" v-model="upUserInfo.password">
                  <small class="form-text text-muted">请输入新的密码</small>
                </div>
                <div class="form-group">
                  <label>机构</label>
                  <input type="text" class="form-control" placeholder="新机构" v-model="upUserInfo.org">
                  <small class="form-text text-muted">请输入新的机构</small>
                </div>
              </form>
            </div>
          </div>
          <div v-if="this.toolbar === 'getOrgs'" class ="orgs">
            <get-orgs></get-orgs>
          </div>
          <div v-if="this.toolbar === 'createOrgs'">
            <create-orgs></create-orgs>
          </div>
          <div v-if="this.toolbar === 'createDepartments'">
            <create-departments></create-departments>
          </div>
          <div v-if="this.toolbar === 'getPersons'">
            <get-persons></get-persons>
          </div>
        </div>
        <!-- 已登录 -->
      <!-- 登录状态 -->
    <!-- </div> -->
    <!-- <div v-else>
      请连接服务器
    </div> -->
    <!-- 连接服务器状态 -->
  </div>
</template>

<script>
  import loadFile from '../../utils/LoadFile';
  import GetUsers from './RightPanelServer/GetUsers';
  import GetOrgs from './RightPanelServer/GetOrgs';
  import CreateOrgs from './RightPanelServer/CreateOrgs';
  import CreateDepartments from './RightPanelServer/CreateDepartments';
  import GetPersons from './RightPanelServer/GetPersons';
  import { sConnect, sRegister, sUpdateUser } from '../../utils/Server'
  import { socketConnect } from '../../utils/Socket';
  export default {
    components: { GetUsers, GetOrgs, CreateOrgs, CreateDepartments, GetPersons },
    data() {
      return {
        flag: null,
        email: '',
        password: '',
        org: '',
        age: '',
        tel: '',
        textPower: '',
        personname: '',
        emailorname: 'test@hitb.com.cn',
        loginpassword: '123456',
        confirmPassword: '',
        userInfo: 'info',
        upUserInfo: { org: this.$store.state.System.user.org, password: '' },
        secondPassword: false

      }
    },
    created: function () {
      loadFile(this, 'hitb_server.csv', 'system')
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
      toolbar: {
        get() {
          return this.$store.state.System.toolbar
        }
      },
      server: {
        get() {
          return this.$store.state.System.server
        }
      },
      port: {
        get() {
          return this.$store.state.System.port
        }
      },
    },
    methods: {
      userLogins: function () {
        const b = { username: this.emailorname, password: this.loginpassword }
        this.$store.commit('SYSTEM_LOGIN_USER', b)
      },
      sysytemlogin: function () {
        const reg = /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
        const user = this.$store.state.System.userLogin
        if (reg.test(user.username)) {
          this.$store.commit('SYSTEM_SET_SERVER', this.$store.state.System.file[1].split(','))
          socketConnect(this, [this.server, this.port], { username: user.username, password: user.password });
        } else if (Array.from(user.username.split(' ')).length === 12) {
          const key = Object.keys(global.hitbdata.blockchain)[0]
          const server = global.hitbdata.blockchain[key][0];
          this.$store.commit('BLOCK_SET_SERVER', server)
          open(this, [server[0], server[1], user.username]);
        }
      },
      sysytemRegisters: function () {
        this.secondPassword = true
        // this.$store.commit('SYSTEM_SET_TOOLBAR', 'createUsers')
      },
      sysytemReturn: function () {
        this.secondPassword = false
      },
      sysytemRegister: function () {
        this.$store.commit('SYSTEM_SET_SERVER', this.$store.state.System.file[1].split(','))
        // 邮箱,密码,年龄.电话
        const reg = /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
        let a = 1;
        if (reg.test(this.emailorname)) {
          a = 1
        } else {
          a = 0
          this.$store.commit('SET_NOTICE', '用户名或邮箱输入错误');
        }
        if (a === 1) {
          if (this.loginpassword === this.confirmPassword) {
            const user = { username: this.emailorname, password: this.loginpassword, org: '测试医院1', age: '26', tel: '15611756970', email: this.emailorname, name: 'test', type: 2 }
            sRegister(this, [this.server, this.port], user)
            this.secondPassword = false
          }
        }
      },
      sysytemUpdate: function () {
        sUpdateUser(this, [this.server, this.port], this.$store.state.System.user.id, this.$store.state.System.registerInfo)
      },
      connect: function (data, index) {
        this.flag = index
        this.$store.commit('SYSTEM_SET_SERVER', data)
        if (this.toolbar === 'getServers' && index !== 0) {
          sConnect(this, [data[1], data[2]], index)
        }
      },
      register: function () {
        const user = { username: this.email, password: this.password, org: this.org, age: this.age, tel: this.tel, email: this.email, name: this.personname, type: 2 }
        this.$store.commit('SYSTEM_REGISTER_USER', user)
      },
      updateUser: function () {
        const b = { org: this.upUserInfo.org, password: this.upUserInfo.password }
        this.$store.commit('SYSTEM_UPDATE_USER', b)
      },
    },
  };
</script>

<style scoped>
.orgs{
  margin-top: 0.8em;
}
</style>
