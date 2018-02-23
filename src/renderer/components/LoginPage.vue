<template>
  <div id="wrapper">
    <nav-bar></nav-bar>
    <div class="row">
      <div class="col-6">
        <img id="logo" src="~@/assets/logo.png" alt="hitb-clinet">
        <main>
          <div class="left-side">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1" class="text-danger">注册的Email地址</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1" class="text-danger">用户密码</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
              </div>
            </form>
            <button id="login" class="btn btn-outline-primary" v-on:click="login">登陆</button>
          </div>
        </main>
      </div>
      <div class="col-6">
        系统说明：
        <hr />
        <div v-if="!hasData">
          <p>
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
  import axios from 'axios';
  // import qs from 'qs';
  import NavBar from './HomePage/NavBar';
  import NoticeBar from './HomePage/NoticeBar';
  // const agent = require('superagent');
  export default {
    name: 'login-page',
    components: { NavBar, NoticeBar },
    data() {
      return {
        hasData: false
      };
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
          this.$store.commit('SET_NOTICE', '未注册用户登陆！');
          this.$store.commit('SET_NAVBAR', 'home');
          this.$store.commit('HAS_DATA');
          this.$router.push('/home');
        } else {
          this.hasData = true;
          this.$store.commit('SET_NOTICE', '初次启动，读取系统初始化文件，请先关闭系统，再打开！')
        }
      },
      log() {
        console.log('aaaaaaaaaa')
        const conf = {
          baseURL: 'http://www.baidu.com',
          method: 'GET',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true,
          xsrfCookieName: 'XSRF-TOKEN',
          xsrfHeaderName: 'X-XSRF-TOKEN',
        }
        axios('/', conf).catch((error) => {
          console.log(error.config)
        });
        // axios.get('http://www.baidu.com')
        //   .set('headers': {'Content-Type': 'application/x-www-form-urlencoded'})
        //   .then((res) => {
        //     console.log(res)
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
        // console.log(agent)
      }
    },
  };
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
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
  }

  form {
    padding-bottom: 0;
  }

  label {
    border: 0;
  }

</style>
