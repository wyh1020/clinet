<template>
  <div>
    <div v-if="this.$store.state.System.toolbar === 'getServers'">
      <table>
        <tr v-for="(data, index) in file" v-bind:key='index' v-on:click="connect(data, index)" v-bind:class="{'table-danger':flag == index}">
          <td v-for="(field, index) in data" v-bind:key='index'>{{data[index]}}</td>
        </tr>
      </table>
    </div>
    <!-- 连接服务器状态 -->
    <div v-if="this.$store.state.System.connectInfo == true" >
      <!-- 登录状态 -->
        <!-- 未登录 -->
        <div v-if="this.$store.state.System.user.login == false">
          <div v-if="this.$store.state.System.toolbar === 'getUsers'">
            <form>
                <div class="form-group">
                  <label for="exampleInputEmail1andname">输入用户名或emails</label>
                  <input type="text" class="form-control" placeholder="exampleInputEmail1andname" v-on:blur="logininput()" v-model="emailorname">
                </div>
                <div class="form-group" v-if="this.loginpass == true">
                  <label for="exampleInputPassword1">密码</label>
                  <input type="password" class="form-control" placeholder="Password" v-model="loginpassword">
                </div>
                <button type="submit" class="btn btn-primary" v-on:click="login()">提交</button>
              </form>
          </div>
          <div v-if="this.$store.state.System.toolbar === 'createUsers'">
            <div v-if="this.$store.state.System.registerInfo[2] == true">
              {{this.$store.state.System.registerInfo[1]}}
              <button class="btn btn-primary" v-on:click="new_register">重新创建用户</button>
            </div>
            <div v-else>
              <h3  v-if="this.$store.state.System.registerInfo[2] == false">{{this.$store.state.System.registerInfo[1]}}, &nbsp; &nbsp; &nbsp;请重新注册</h3>
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
                  <input type="password" class="form-control" id="InputPersonname" placeholder="Personname" v-model="personname">
                </div>
              </form>
              <button type="submit" class="btn btn-primary" v-on:click="register">注册用户</button>
            </div>
          </div>
        </div>
        <!-- 未登录 -->
        <!-- 已登录 -->
        <div v-else>
          <div v-if="this.$store.state.System.toolbar === 'getUsers'">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">名称</th>
                  <th scope="col">信息</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) in this.$store.state.System.user">
                  <td>{{key}}</td>
                  <td>{{value}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="this.$store.state.System.toolbar === 'getOrgs'">
            <button class="btn btn-primary" v-on:click="createOrgs()">新建机构</button>
            <table class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>机构编码</th>
                  <th>机构名称</th>
                  <th>机构等级</th>
                  <th>机构类别</th>
                  <th>省份</th>
                  <th>市</th>
                  <th>县</th>
                  <th>联系人</th>
                  <th>联系电话</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for = "value in this.$store.state.System.orgs.data">
                  <td>{{value.id}}</td>
                  <td>{{value.code}}</td>
                  <td>{{value.name}}</td>
                  <td>{{value.level}}</td>
                  <td>{{value.type}}</td>
                  <td>{{value.province}}</td>
                  <td>{{value.city}}</td>
                  <td>{{value.county}}</td>
                  <td>{{value.person_name}}</td>
                  <td>{{value.tel}}</td>
                  <td>{{value.email}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div  v-if="this.$store.state.System.toolbar === 'createOrgs'">
            <form>
              <div class="form-group">
                <label for="InputOrgCode">机构编码</label>
                <input type="text" class="form-control" placeholder="OrgCode" v-model="Orgcode">
              </div>
              <div class="form-group">
                <label for="InputOrgName">机构名称</label>
                <input type="text" class="form-control" placeholder="OrgName" v-model="Orgname">
              </div>
              <div class="form-group">
                <label for="InputOrgLevel">机构等级</label>
                <input type="text" class="form-control" placeholder="OrgLevel" v-model="Orglevel">
              </div>
              <div class="form-group">
                <label for="InputOrgType">机构类别</label>
                <input type="text" class="form-control" placeholder="OrgType" v-model="Orgtype">
              </div>
              <div class="form-group">
                <label for="InputOrgProvince">省份</label>
                <input type="text" class="form-control" placeholder="Province" v-model="Orgprovince">
              </div>
              <div class="form-group">
                <label for="InputOrgCity">市</label>
                <input type="text" class="form-control" placeholder="City" v-model="Orgcity">
              </div>
              <div class="form-group">
                <label for="InputOrgCounty">机构县</label>
                <input type="text" class="form-control" placeholder="County" v-model="Orgcounty">
              </div>
              <div class="form-group">
                <label for="InputOrgPerson_name">联系人</label>
                <input type="text" class="form-control" placeholder="Person_name" v-model="Orgperson_name">
              </div>
              <div class="form-group">
                <label for="InputOrgTel">联系电话</label>
                <input type="text" class="form-control" placeholder="Tel" v-model="Orgtel">
              </div>
              <div class="form-group">
                <label for="InputOrgEmail">Email</label>
                <input type="email" class="form-control" placeholder="Email" v-model="Orgemail">
              </div>
            </form>
            <button type="submit" class="btn btn-primary" v-on:click="orgRegister">添加机构</button>
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
        </div>
        <!-- 已登录 -->
      <!-- 登录状态 -->
    </div>
    <div v-else>
      请连接服务器
    </div>
    <!-- 连接服务器状态 -->
  </div>
</template>

<script>
  // import { sGetOrg, sCreateOrg, sUpdateOrg, sGetDepart, sCreateDepart, sUpdateDepart, sGetSystemDepart, sUploadDoc, sCheckDoc, sInsertDoc, sStatDoc, sCompDrg, sUpdateUser, sGetStat, sGetStatInfo, sGetStatInfoChart, sdownLoadStatInfo, sSaveDefined, sGetRule, sSearchRule, sGetUser, sLogin, sRegister } from '../../utils/server'
  // import { sGetUser, sLogin, sRegister, sConnect } from '../../utils/Server'
  import { sLogin, sRegister, sConnect, sCreateOrg } from '../../utils/Server'
  export default {
    data() {
      return {
        flag: null,
        email: '',
        password: '',
        org: '',
        age: '',
        tel: '',
        personname: '',
        emailorname: '',
        loginpassword: '',
        loginpass: true,
        Orgcode: '',
        Orgname: '',
        Orglevel: '',
        Orgtype: '',
        Orgprovince: '',
        Orgcity: '',
        Orgcounty: '',
        Orgperson_name: '',
        Orgtel: '',
        Orgemail: ''
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
      logininput: function () {
        const reg = /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
        if (this.emailorname.length === 16) {
          if (reg.test(this.emailorname)) {
            this.loginpass = true
          } else {
            this.loginpass = false
          }
        } else {
          this.loginpass = true
        }
      },
      login: function () {
        const user = { username: this.emailorname, password: this.loginpassword }
        sLogin(this, [this.$store.state.System.server, this.$store.state.System.port, user])
        // if (this.loginpass === false) {
        //   // alert('区块链登录')
        //   // sLogin(this, [this.emailorname, this.loginpassword])
        // } else {
        //   if (this.loginpassword === '') {
        //     // alert('请输入密码')
        //   } else {
        //     const reg = /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
        //     if (!reg.test(this.emailorname)) {
        //       // alert('用户名必须是邮箱')
        //     } else {
        //       sLogin(this, [this.emailorname, this.loginpassword])
        //     }
        //   }
        //   this.$store.state.System.registerInfo[2] = true
        // }
      },
      connect: function (data, index) {
        this.flag = index
        this.$store.commit('SYSTEM_SET_SERVER', data)
        if (this.$store.state.System.toolbar === 'getServers') {
          sConnect(this, [data[1], data[2], index])
        }
      },
      register: function () {
        const user = { username: this.email, password: this.password, org: this.org, age: this.age, tel: this.tel, email: this.email, name: this.personname, type: 2 }
        sRegister(this, [this.$store.state.System.server, this.$store.state.System.port, user])
        // sGetOrg(this, [this.$store.state.System.server, this.$store.state.System.port, this.email, this.password])
      },
      new_register: function () {
        this.$store.commit('SYSTEM_REGISTER_USER', [{}, '重新创建用户'])
      },
      createOrgs: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'createOrgs');
      },
      orgRegister: function () {
        const org = { code: this.Orgcode, name: this.Orgname, level: this.Orglevel, type: this.Orgtype, province: this.Orgprovince, city: this.Orgcity, county: this.Orgcounty, person_name: this.Orgperson_name, tel: this.Orgtel, email: this.Orgemail }
        console.log(org)
        sCreateOrg(this, [this.$store.state.System.server, this.$store.state.System.port, org])
      }
    },
  };
</script>

<style scoped>

</style>
