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
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
              </div>
            </form>
            <button class="btn btn-primary" v-on:click="login">登陆</button>
            <div v-if="hasData">
              <hr>
              <a href="static/hitb_data.csv">请点击下载系统初始化文件，并放到C盘的hitbdata/system目录下，然后关闭这个应用系统，再重新打开！</a>
              <hr>
            </div>

          </div>
        </main>
      </div>
      <div class="col-6">
        系统说明：
      </div>
    </div>
    <notice-bar></notice-bar>
  </div>
</template>

<script>
  import NavBar from './HomePage/NavBar';
  import NoticeBar from './HomePage/NoticeBar';
  export default {
    name: 'login-page',
    components: { NavBar, NoticeBar },
    data() {
      return {
        hasData: false
      };
    },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
      login() {
        if (global.hitbdata) {
          this.$store.commit('SET_NOTICE', '未注册用户登陆！');
          this.$router.push('/home');
        } else {
          this.hasData = true;
          this.$store.commit('SET_NOTICE', '读取系统初始化文件失败，请重新下载，放到C盘的hitbdata/system目录下！')
        }
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

</style>
