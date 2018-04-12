<template>
  <div>
    <div v-if="this.toolbar === 'getServers'">
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
                  <input type="text" class="form-control" placeholder="用户名(邮箱)" v-model="emailorname" id="server-username">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">用户密码（区块链服务用户没有密码，或者使用二级密码）</label>
                  <input type="password" class="form-control" placeholder="密码" v-model="loginpassword" id="server-password">
                </div>
              </form>
                <button type="submit" class="btn btn-primary" v-on:click="login('login')" id="server-login">登录</button>
                <button type="submit" class="btn btn-primary" v-on:click="login('regrest')">重新创建用户</button>
          </div>
          <div v-if="this.toolbar === 'createUsers'">
            <!-- <div v-if="this.$store.state.System.registerInfo[2] == true">
              <button class="btn btn-primary" v-on:click="newRegister">重新创建用户</button>
            </div> -->
            <div>
              <!-- <h3  v-if="this.$store.state.System.registerInfo[2] == false">{{this.$store.state.System.registerInfo[1]}}, &nbsp; &nbsp; &nbsp;请重新注册</h3> -->
              <form>
                <div class="form-group">
                  <label for="InputEmail">用户注册的Email地址</label>
                  <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                </div>
                <div class="form-group">
                  <label for="InputPassword">用户密码</label>
                  <input type="password" class="form-control" id="InputPassword" placeholder="Password" v-model="password">
                </div>
                <div class="form-group">
                  <label for="InputOrg">机构</label>
                  <input type="text" class="form-control" id="InputOrg" placeholder="InputOrg" v-model="org">
                </div>
                <div class="form-group">
                  <label for="InputAge">年龄</label>
                  <input type="number" class="form-control" id="InputAge" placeholder="Age" v-model="age">
                </div>
                <div class="form-group">
                  <label for="InputTel">电话</label>
                  <input type="text" class="form-control" id="InputTel" placeholder="Tel" v-model="tel">
                </div>
                <div class="form-group">
                  <label for="InputPersonname">姓名</label>
                  <input type="text" class="form-control" id="InputPersonname" placeholder="Personname" v-model="personname">
                </div>
              </form>
              <button type="submit" class="btn btn-primary" v-on:click="register">注册用户</button>
            </div>
          </div>
        </div>
        <!-- 未登录 -->
        <!-- 已登录 -->
        <div v-else>
          <div v-if="this.toolbar === 'getUsers'">
            <div v-if="this.userInfo === 'info'">
              <get-users></get-users>
              <button type="submit" class="btn btn-primary" v-on:click="orgRegister('userinfo')"  v-if="this.$store.state.System.user.login == true">修改</button>
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
              <button class="btn btn-primary" v-on:click="orgRegister('newUserInfo')" >确认修改</button>
              <button class="btn btn-primary" v-on:click="orgRegister('returnUserInfo')" >返回</button>
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
  import { sLogin, sRegister, sConnect, sUpdateUser } from '../../utils/Server'
  import { open } from '../../utils/BlockAccount'
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
        personname: '',
        emailorname: 'test@hitb.com.cn',
        loginpassword: '123456',
        userInfo: 'info',
        upUserInfo: { org: this.$store.state.System.user.org, password: '' }
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
      }
    },
    methods: {
      login: function (value) {
        switch (value) {
          case 'login':
            this.login_s();
            break;
          case 'regrest':
            this.$store.commit('SYSTEM_SET_TOOLBAR', 'createUsers')
            break;
          default:
        }
      },
      login_s: function () {
        const reg = /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
        const user = { username: this.emailorname, password: this.loginpassword }
        if (reg.test(this.emailorname)) {
          this.$store.commit('SYSTEM_SET_SERVER', this.$store.state.System.file[1].split(','))
          sLogin(this, [this.server, this.port, user])
        } else if (Array.from(this.emailorname.split(' ')).length === 12) {
          const key = Object.keys(global.hitbdata.blockchain)[0]
          const server = global.hitbdata.blockchain[key][0];
          this.$store.commit('BLOCK_SET_SERVER', server)
          open(this, [server[0], server[1], user.username]);
        }
      },
      connect: function (data, index) {
        this.flag = index
        this.$store.commit('SYSTEM_SET_SERVER', data)
        if (this.toolbar === 'getServers' && index !== 0) {
          sConnect(this, [data[1], data[2], index])
        }
      },
      register: function () {
        this.$store.commit('SYSTEM_SET_SERVER', this.$store.state.System.file[1].split(','))
        const user = { username: this.email, password: this.password, org: this.org, age: this.age, tel: this.tel, email: this.email, name: this.personname, type: 2 }
        const reg = [/^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g,
          /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$$/, /^[0-9]{1,2}$/, /^1[0-9]{10}$/]
        console.log(this.password)
        let a = 1;
        let b = 1;
        let c = 1;
        let d = 1;
        const age = parseInt(this.age, 10)
        console.log(age)
        if (reg[0].test(this.email)) {
          a = 1
        } else {
          a = 0
          this.$store.commit('SET_NOTICE', '用户名或邮箱输入错误');
        }
        if (reg[1].test(this.password)) {
          b = 1
        } else {
          b = 0
          this.$store.commit('SET_NOTICE', '密码错误 只能由数字字母和@#$%^&组成');
        }
        if (reg[2].test(parseInt(this.age, 10))) {
          c = 1
        } else {
          c = 0
          this.$store.commit('SET_NOTICE', '年龄输入错误');
        }
        if (reg[3].test(this.tel)) {
          d = 1
        } else {
          d = 0
          this.$store.commit('SET_NOTICE', '电话输入错误');
        }
        if (a * b * c * d === 1) {
          console.log(user)
          sRegister(this, [this.server, this.port, user])
        }
      },
      newRegister: function () {
        this.$store.commit('SYSTEM_REGISTER_USER', [{}, '重新创建用户'])
      },
      orgRegister: function (value) {
        switch (value) {
          case 'userinfo':
            this.userInfo = 'upUserInfo'
            break;
          case 'newUserInfo':
            sUpdateUser(this, [this.server, this.port, this.$store.state.System.user.id, this.upUserInfo])
            break;
          case 'returnUserInfo':
            this.userInfo = 'info'
            break;
          default:
        }
      }
    },
  };
</script>

<style scoped>
.orgs{
  margin-top: 0.8em;
}
</style>
