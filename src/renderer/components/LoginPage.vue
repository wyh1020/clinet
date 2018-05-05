<template>
  <div id="wrapper">
    <!-- <nav-bar></nav-bar> -->
    <div class="row">
      <div class="col-4">
        <main>
          <div class="left-side">
            <div class="jumbotron">
              <h2>登陆系统</h2>
                <form>
                  <div class="form-group">
                    <label for="exampleInputEmail1" class="text-danger">用户名（远程服务用户是电子邮箱，区块链服务用户是12个单词组成的口令）</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" v-model="loginName">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1" class="text-danger">用户密码（区块链服务用户没有密码，或者使用二级密码）</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="" v-model="loginPassword">
                  </div>
                </form>
              <button id="login" class="btn btn-outline-primary" v-on:click="login">登陆（用户认证失败，则自动使用未注册用户登陆）</button>
            </div>
          </div>
        </main>
      </div>
      <div class="col-8" id="right-side">
        <div class="card">
          <div class="card-header">
            面向互联网+医疗，适合医生个人使用的医生工作站系统：
          </div>
          <div class="card-body">
            <p class="card-text">
              互联网+医疗：
              <ul>
                <li>需要适合互联网+的终端</li>
                <li>需要适合互联网+的平台</li>
                <li>需要适合互联网+的服务</li>
              </ul>
            </p>
            <p class="card-text">
              本系统包括4部分功能：
              <ul>
                <li>以底部固定输入框为完全操作方式的通用编辑器</li>
                <li>以疾病诊断和手术/操作为基础的术语字典</li>
                <li>以DRG分析为核心的医疗管理评价分析</li>
                <li>以远程服务或区块链服务为基础的医疗共享网络</li>
              </ul>
            </p>
            <p>
              本系统适用于4个应用场景：
              <ul>
                <li>作为单机版使用，数据以CSV文件（完全结构化，用于系统配置、数据分析、术语字典）、CDA文件（半结构化，用于临床文档）保存在本地</li>
                <li>使用互联网上的远程服务，数据上传到服务器</li>
                <li>使用互联网上的区块链服务，数据发布到区块链</li>
                <li>
                  <a href="#" v-on:click="open('http://www.hitb.com.cn')">联系我们</a>
                  ，建立自己私有的远程服务或区块链服务</li>
              </ul>
            </p>
            <p>
              本系统登陆分3种用户状态：
              <ul>
                <li>使用远程服务用户登陆：测试用户是 test@hitb.com.cn，密码是 123456</li>
                <li>使用区块链服务用户登陆：测试用户是 someone manual strong movie roof episode eight spatial brown soldier soup motor</li>
                <li>使用未注册用户登陆：前2种用户认证失败，则自动使用未注册用户登陆，可以使用单机版功能，可以在系统服务中再次使用远程服务账户登陆，或者在区块链服务中再次使用区块链服务账户登陆</li>
              </ul>
            </p>
            <p>
              鼠标点击《本地文件》或者《远程文件》分2种操作模式：
              <ul>
                <li>鼠标单击：只刷新页面，不刷新数据，响应速度快</li>
                <li>鼠标双击：刷新页面，同时刷新数据，耗时较长</li>
              </ul>
            </p>
          </div>
        </div>
        <div v-if="hasData">
          <h2 class="text-danger">
            {{notice}}
          </h2>
        </div>
      </div>
    </div>
    <notice-bar></notice-bar>
  </div>
</template>

<script>
  import NavBar from './HomePage/NavBar';
  import NoticeBar from './HomePage/NoticeBar';
  import { sLogin } from '../utils/Server';
  import { open } from '../utils/BlockAccount'
  export default {
    name: 'login-page',
    components: { NavBar, NoticeBar },
    data() {
      return {
        hasData: false,
        loginName: '',
        loginPassword: ''
      };
    },
    mounted: function () {
      this.$nextTick(function () {
        this.loginName = this.$store.state.System.user.username
      })
    },
    computed: {
      notice: {
        get() {
          return this.$store.state.Home.notice
        }
      }
    },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
      login() {
        if (global.hitbdata) {
          const name = this.loginName;
          const pass = this.loginPassword;
          const reg = /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
          if (reg.test(name)) {
            const user = { username: name, password: pass }
            const server = global.hitbdata.server['远程测试服务器'][0];
            sLogin(this, [server[0], server[1], user])
          } else if (Array.from(name.split(' ')).length === 12) {
            const key = Object.keys(global.hitbdata.blockchain)[0]
            const server = global.hitbdata.blockchain[key][0];
            this.$store.commit('BLOCK_SET_SERVER', server)
            open(this, [server[0], server[1], name]);
          } else {
            this.$store.commit('SET_NOTICE', '未注册用户登陆！');
          }
          this.$store.commit('SET_NAVBAR', 'edit');
          this.$store.commit('HAS_DATA');
          this.$router.push('/edit');
          this.$store.commit('EDIT_LOAD_FILES');
        } else {
          this.hasData = true;
          this.$store.commit('SET_NOTICE', '初次启动，读取系统初始化文件，请先关闭系统，再打开！')
        }
      },
    },
  };
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: '黑体'
  }

  #wrapper {
    /* background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      ); */
    height: 100vh;
    padding: 40px 80px;
    width: 100vw;
    background: url('~@/assets/logo1.png') center center no-repeat;
    background-size: 100% auto;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
    padding: 0;
    opacity: 0.75;
  }

  form {
    padding-bottom: 0;
    padding-top: 0;
  }

  label {
    border: 0;
  }

  .jumbotron {
    position: absolute;
    top: 30%;
    left: 5%;
    box-shadow: 2px 2px 5px #888888;
    background-color: #F5F5F5;
    padding-top: 30px;
  }

  p {
    padding-bottom: 0;
    margin-top: 1%;
  }

  #right-side {
    margin-top: 2%;
  }

  #login {
    margin-top: 2%;
  }

  .card {
    opacity: 0.75;
  }

</style>
