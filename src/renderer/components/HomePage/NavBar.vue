<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <a class="navbar-brand" href="#" v-on:click="load(0)">HITB-clinet</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            数据采集
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" v-on:click="load(1)">数据采集</a>
            <div class="dropdown-divider"></div>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            数据分析
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" v-on:click="load(2)">数据分析</a>
            <div class="dropdown-divider"></div>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            术语字典
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" v-on:click="load(3)">IDC10-BJ版</a>
            <a class="dropdown-item" href="#" v-on:click="load(3)">IDC9-BJ版</a>
            <a class="dropdown-item" href="#" v-on:click="load(3)">DRG-BJ版</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click="load(3)">疾病诊断名称</a>
            <a class="dropdown-item" href="#" v-on:click="load(3)">收拾/操作名称</a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            系统服务
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" v-on:click="load(4)">机构设置</a>
            <a class="dropdown-item" href="#" v-on:click="load(4)">用户设置</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click="load(4)">病案首页（卫统四）</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click="load(4)">DRG分组服务</a>
            <a class="dropdown-item" href="#" v-on:click="load(4)">DRG分析服务</a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            区块链服务-医疗联盟
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" v-on:click="load(5)">账户设置</a>
            <a class="dropdown-item" href="#" v-on:click="load(5)">服务器节点设置</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click="load(5)">DRG分组服务</a>
            <a class="dropdown-item" href="#" v-on:click="load(4)">DRG分析服务</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">{{currentTime}}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

  export default {
    data() {
      return {
        currentTime: new Date().toLocaleString()
      };
    },
    methods: {
      created: function () {
        this.$nextTick(function () {
          this.timer()
        })
      },
      timer: function () {
        this.getTime = () => {
          this.currentTime = new Date().toLocaleString();
        }
        setInterval(this.getTime, 1000);
      },
      load: function (n) {
        switch (n) {
          case 0:
            this.$router.push('/home');
            break;
          case 1:
            this.$router.push('/edit');
            break;
          case 2:
            this.$router.push('/stat');
            break;
          case 3:
            this.$router.push('/library');
            break;
          case 4:
            this.$router.push('/system');
            break;
          case 5:
            this.$router.push('/blockChain');
            break;
          default:
            this.$router.push('/');
        }
      },

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
