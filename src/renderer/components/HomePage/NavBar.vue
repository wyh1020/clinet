<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <a class="navbar-brand" href="#" v-on:click="onClick('首页')">HITB-clinet</a>
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
            <a class="dropdown-item" href="#" v-on:click="onClick('数据采集-数据采集')">数据采集</a>
            <div class="dropdown-divider"></div>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            数据分析
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" v-on:click="onClick('数据分析-数据分析')">数据分析</a>
            <div class="dropdown-divider"></div>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            术语字典
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" v-on:click="onClick('术语字典-IDC10BJ版')">IDC10-BJ版</a>
            <a class="dropdown-item" href="#" v-on:click="onClick('术语字典-IDC9BJ版')">IDC9-BJ版</a>
            <a class="dropdown-item" href="#" v-on:click="onClick('术语字典-DRGBJ版')">DRG-BJ版</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click="onClick('术语字典-疾病诊断名称')">疾病诊断名称</a>
            <a class="dropdown-item" href="#" v-on:click="onClick('术语字典-收拾/操作名称')">收拾/操作名称</a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            系统服务
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click="onClick('系统服务-数据导入')">数据导入</a>
            <a class="dropdown-item" href="#" v-on:click="onClick('系统服务-DRG分组服务')">DRG分组服务</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click="onClick('系统服务-远程服务器设置')">远程服务器设置</a>
            <a class="dropdown-item" href="#" v-on:click="onClick('系统服务-机构设置')">机构设置</a>
            <a class="dropdown-item" href="#" v-on:click="onClick('系统服务-用户设置')">用户设置</a>
            <a class="dropdown-item" href="#" v-on:click="onClick('系统服务-上传数据')">上传数据</a>
            <a class="dropdown-item" href="#" v-on:click="onClick('系统服务-DRG分析计算')">DRG分析计算</a>
            <div class="dropdown-divider"></div>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            区块链服务
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" v-on:click="onClick('区块链服务-服务器节点设置')">服务器节点设置</a>
            <a class="dropdown-item" href="#" v-on:click="onClick('区块链服务-账户设置')">账户设置</a>
            <a class="dropdown-item" href="#" v-on:click="onClick('区块链服务-区块设置')">区块查询</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click="onClick('区块链服务-DRG分组服务')">DRG分组服务</a>
            <a class="dropdown-item" href="#" v-on:click="onClick('区块链服务-DRG分析计算')">DRG分析计算</a>
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
      onClick: function (n) {
        switch (n) {
          case '首页':
            this.$store.commit('SET_NAVBAR', '首页');
            this.$router.push('/home');
            break;
          case '数据采集-数据采集':
            this.$store.commit('SET_NAVBAR', '数据采集-数据采集');
            this.$router.push('/edit');
            break;
          case '数据分析-数据分析':
            this.$store.commit('SET_NAVBAR', '数据分析-数据分析');
            this.$router.push('/stat');
            break;
          case '术语字典-IDC10BJ版':
            this.$store.commit('SET_NAVBAR', '术语字典-IDC10BJ版');
            this.$router.push('/library');
            break;
          case '术语字典-IDC9BJ版':
            this.$store.commit('SET_NAVBAR', '术语字典-IDC9BJ版');
            this.$router.push('/library');
            break;
          case '术语字典-DRGBJ版':
            this.$store.commit('SET_NAVBAR', '术语字典-DRGBJ版');
            this.$router.push('/library');
            break;
          case '术语字典-疾病诊断名称':
            this.$store.commit('SET_NAVBAR', '术语字典-疾病诊断名称');
            this.$router.push('/library');
            break;
          case '术语字典-手术/操作名称':
            this.$store.commit('SET_NAVBAR', '术语字典-手术/操作名称');
            this.$router.push('/library');
            break;
          case '系统服务-数据导入':
            this.$store.commit('SET_NAVBAR', '系统服务-数据导入');
            this.$router.push('/system');
            break;
          case '系统服务-DRG分组':
            this.$store.commit('SET_NAVBAR', '系统服务-DRG分组');
            this.$router.push('/system');
            break;
          case '系统服务-远程服务器设置':
            this.$store.commit('SET_NAVBAR', '系统服务-远程服务器设置');
            this.$router.push('/system');
            break;
          case '系统服务-机构设置':
            this.$store.commit('SET_NAVBAR', '系统服务-机构设置');
            this.$router.push('/system');
            break;
          case '系统服务-用户设置':
            this.$store.commit('SET_NAVBAR', '系统服务-用户设置');
            this.$router.push('/system');
            break;
          case '系统服务-上传数据':
            this.$store.commit('SET_NAVBAR', '系统服务-上传数据');
            this.$router.push('/system');
            break;
          case '系统服务-数据分析':
            this.$store.commit('SET_NAVBAR', '系统服务-数据分析');
            this.$router.push('/system');
            break;
          case '区块链服务-账户设置':
            this.$store.commit('SET_NAVBAR', '区块链服务-账户设置');
            this.$router.push('/blockChain');
            break;
          case '区块链服务-服务器节点设置':
            this.$store.commit('SET_NAVBAR', '区块链服务-账户设置');
            this.$router.push('/blockChain');
            break;
          case '区块链服务-DRG分组':
            this.$store.commit('SET_NAVBAR', '区块链服务-DRG分组');
            this.$router.push('/blockChain');
            break;
          case '区块链服务-DRG分析':
            this.$store.commit('SET_NAVBAR', '区块链服务-DRG分析');
            this.$router.push('/blockChain');
            break;
          default:
            this.$store.commit('SET_NAVBAR', '登陆页');
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
