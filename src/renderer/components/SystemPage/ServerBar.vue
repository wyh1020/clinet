<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='getServers()' id="server-remote-list">
          <a class="nav-link text-light" href="#"> 远程服务器列表 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='getUsers()' id="server-user-setup">
          <a class="nav-link text-light" href="#"> 用户设置 <span class="sr-only">(current)</span></a>
        </li>
        <li v-if="toolbar === 'getUsers' && user.login === false">
          <a class="nav-link text-light" href="#" v-on:click="systemUsers('login')" id="server-login">登录</a>
        </li>
        <li v-if="toolbar === 'getUsers' && user.login === false">
          <a class="nav-link text-light" href="#" v-on:click="systemUsers('insert')">新建</a>
        </li>
        <li v-if="toolbar === 'getUsers' && user.login === true" id = "server-user-change">
          <a class="nav-link text-light" href="#" v-on:click="systemUsers('update')">修改</a>
        </li>
        <li v-if="toolbar === 'createUsers'">
          <a class="nav-link text-light" href="#" v-on:click="systemUsers('regiest')">注册</a>
        </li>
        <li v-if="toolbar === 'upUsers'" id = "server-user-ischange">
          <a class="nav-link text-light" href="#" v-on:click="systemUsers('updataUser')">确认修改</a>
        </li>
        <li class="nav-item active" v-on:click="systemUsers('docPower')" v-if="toolbar === 'getUsers' && user.login === true" id = "server-user-changepower">
          <a class="nav-link text-light" href="#"> 文件权限修改 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item dropdown" v-on:click='getOrgs()' id="server-org-setup">
          <a class="nav-link text-light dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> 机构设置 <span class="sr-only">(current)</span></a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" v-on:click="orgInfos('机构信息')">机构信息</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click="orgInfos('科室信息')">科室信息</a>
            <div class="dropdown-divider"></div>
          </div>
        </li>
        <li class="nav-item active" v-if="toolbar === 'getOrgs' && orgPage === 'getOrg'" id = "server-user-neworg">
          <a class="nav-link text-light" href="#" v-on:click="systemUsers('orgNew')"> 新建机构 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-if="toolbar === 'createOrgs' && orgPage === 'getOrg' && orgName ==='insert'" id = "server-user-addorg">
          <a class="nav-link text-light" href="#" v-on:click="systemUsers('orgInsert')"> 添加机构 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-if="toolbar === 'createOrgs' && orgPage === 'getOrg' && orgName ==='update'">
          <a class="nav-link text-light" href="#" v-on:click="systemUsers('orgUpdate')"> 机构修改 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-if="toolbar === 'getOrgs' && orgPage === 'getDepartment'">
          <a class="nav-link text-light" href="#" v-on:click="systemUsers('newDep')"> 新建科室 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-if="toolbar === 'createDepartments' && orgPage === 'getDepartment' && orgName ==='insertDep'">
          <a class="nav-link text-light" href="#" v-on:click="systemUsers('insertDep')"> 添加科室 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-if="toolbar === 'createDepartments' && orgPage === 'getDepartment' && orgName ==='updateDep'">
          <a class="nav-link text-light" href="#" v-on:click="systemUsers('updateDep')"> 科室修改 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='getPersons()' id="server-people-setup" v-if="this.$store.state.System.userPower === 1">
          <a class="nav-link text-light" href="#"> 人员设置 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-if="this.$store.state.System.userPower === 1 && toolbar === 'getPersons' && orgPage === 'getPerson'" v-on:click="systemUsers('personUpdate')">
          <a class="nav-link text-light" href="#"> 人员修改 <span class="sr-only">(current)</span></a>
        </li>
        <!-- <li class="nav-item active" v-on:click='getServerFunctions' id="server-remote-function-setup">
          <a class="nav-link text-light" href="#"> 远程服务功能设置 <span class="sr-only">(current)</span></a>
        </li> -->
      </ul>
      <!-- <div class="form-inline my-2 my-lg-0" v-if="['getPersons', 'getOrgs'].includes(this.$store.state.System.toolbar)">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="server-search">
      </div> -->
    </div>
  </nav>
</template>

<script>
  import { sGetOrg, sGetProvince, sGetUsers, sRegister, sUpdateUser,
    sCreateOrg, sUpdateOrg, sGetDepart, sCreateDepart, sUpdateDepart } from '../../utils/Server';
  import { open } from '../../utils/BlockAccount'
  import loadFile from '../../utils/LoadFile';
  import { socketConnect } from '../../utils/Socket';
  export default {
    data() {
      return {
        paths: []
      };
    },
    computed: {
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
      toolbar: {
        get() {
          return this.$store.state.System.toolbar
        }
      },
      user: {
        get() {
          return this.$store.state.System.user
        }
      },
      userLogin: {
        get() {
          return this.$store.state.System.userLogin
        }
      },
      registerInfo: {
        get() {
          return this.$store.state.System.registerInfo
        }
      },
      upUserInfo: {
        get() {
          return this.$store.state.System.userUpdate
        }
      },
      personUpdate: {
        get() {
          return this.$store.state.System.personUpdate
        }
      },
      personId: {
        get() {
          return this.$store.state.System.personId
        }
      },
      orgInfo: {
        get() {
          return this.$store.state.System.orgInfo
        }
      },
      orgId: {
        get() {
          return this.$store.state.System.orgId
        }
      },
      orgPage: {
        get() {
          return this.$store.state.System.orgPage
        }
      },
      orgName: {
        get() {
          return this.$store.state.System.orgName
        }
      },
      departmentInfo: {
        get() {
          return this.$store.state.System.departmentInfo
        }
      },
      depId: {
        get() {
          return this.$store.state.System.departmentId
        }
      }
    },
    methods: {
      getServers: function () {
        loadFile(this, 'hitb_server.csv', 'system')
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getServers');
        this.$store.commit('SET_NOTICE', '远程服务器列表');
      },
      getUsers: function () {
        if (!this.$store.state.System.connectInfo) {
          loadFile(this, 'hitb_server.csv', 'system')
        }
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getUsers');
        this.$store.commit('SET_NOTICE', '用户设置');
      },
      getOrgs: function () {
        sGetProvince(this, [this.server, this.port])
        this.$store.commit('SYSTEM_SET_ORG_NAME', null);
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getOrgs');
        if (!this.$store.state.System.user.login) {
          this.$store.commit('SET_NOTICE', '未登录用户,请在系统服务-用户设置内登录');
        } else {
          sGetOrg(this, [this.server, this.port, this.$store.state.System.user, this.$store.state.System.pageInfo.org]);
          this.$store.commit('SET_NOTICE', '机构设置');
        }
        //
      },
      getPersons: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getPersons');
        this.$store.commit('SYSTEM_GET_ORGPAGE', 'getPersonTable');
        sGetUsers(this, [this.server, this.port, '1']);
        this.$store.commit('SET_NOTICE', '人员设置');
      },
      getServerFunctions: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'getServerFunctions');
      },
      orgInfos: function (value) {
        if (!this.$store.state.System.user.login) {
          this.$store.commit('SET_NOTICE', '未登录用户,请在系统服务-用户设置内登录');
        } else {
          switch (value) {
            case '机构信息':
              this.$store.commit('SYSTEM_GET_ORGPAGE', 'getOrg');
              this.$store.commit('SET_NOTICE', '机构信息');
              break;
            case '科室信息':
              this.$store.commit('SYSTEM_GET_ORGPAGE', 'getDepartment');
              sGetDepart(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.System.user, this.$store.state.System.pageInfo.department])
              this.$store.commit('SET_NOTICE', '科室信息');
              break;
            default:
          }
        }
      },
      systemUsers: function (value) {
        if (value === 'login') {
          const reg = /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
          const user = this.userLogin
          if (reg.test(user.username)) {
            this.$store.commit('SYSTEM_SET_SERVER', this.$store.state.System.file[1].split(','))
            socketConnect(this, [this.server, this.port, user.username, user.password])
          } else if (Array.from(user.username.split(' ')).length === 12) {
            const key = Object.keys(global.hitbdata.blockchain)[0]
            const server = global.hitbdata.blockchain[key][0];
            this.$store.commit('BLOCK_SET_SERVER', server)
            open(this, [server[0], server[1], user.username]);
          }
        } else if (value === 'insert') {
          this.$store.commit('SYSTEM_SET_TOOLBAR', 'createUsers')
        } else if (value === 'regiest') {
          this.$store.commit('SYSTEM_SET_SERVER', this.$store.state.System.file[1].split(','))
          // 邮箱,密码,年龄.电话
          const reg = /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
          let a = 1;
          if (reg.test(this.registerInfo.email)) {
            a = 1
          } else {
            a = 0
            this.$store.commit('SET_NOTICE', '用户名或邮箱输入错误');
          }
          if (a === 1) {
            sRegister(this, [this.server, this.port, this.registerInfo])
          }
        } else if (value === 'update') {
          this.$store.commit('SYSTEM_SET_TOOLBAR', 'upUsers')
        } else if (value === 'updataUser') {
          sUpdateUser(this, [this.server, this.port, this.$store.state.System.user.id, this.upUserInfo])
        } else if (value === 'docPower') {
          // sUpdateDocPower
          sUpdateUser(this, [this.server, this.port, this.$store.state.System.user.id, { is_show: !this.$store.state.System.user.is_show }])
        } else if (value === 'personUpdate') {
          sUpdateUser(this, [this.$store.state.System.server, this.$store.state.System.port, this.personId, this.personUpdate])
        } else if (value === 'orgNew') {
          this.$store.commit('SYSTEM_SET_ORG_NAME', 'insert');
          this.$store.commit('SYSTEM_SET_TOOLBAR', 'createOrgs')
        } else if (value === 'orgInsert') {
          const reg = [/^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g, /^1[0-9]{10}$/]
          let a = 1
          let b = 1
          if (reg[0].test(this.orgInfo.email)) {
            a = 1
          } else {
            a = 0
            this.$store.commit('SET_NOTICE', '邮箱输入错误');
          }
          if (reg[1].test(this.orgInfo.tel)) {
            b = 1
          } else {
            b = 0
            this.$store.commit('SET_NOTICE', '电话输入错误');
          }
          if (a * b === 1) {
            sCreateOrg(this, [this.$store.state.System.server, this.$store.state.System.port, this.orgInfo])
          }
        } else if (value === 'orgUpdate') {
          sUpdateOrg(this, [this.$store.state.System.server, this.$store.state.System.port, this.orgId, this.orgInfo])
        } else if (value === 'newDep') {
          this.$store.commit('SYSTEM_SET_ORG_NAME', 'insertDep');
          this.$store.commit('SYSTEM_SET_TOOLBAR', 'createDepartments')
        } else if (value === 'insertDep') {
          sCreateDepart(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.System.user, this.departmentInfo]);
        } else if (value === 'updateDep') {
          sUpdateDepart(this, [this.$store.state.System.server, this.$store.state.System.port, this.depId, this.departmentInfo]);
          console.log('修改')
        }
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
</style>
