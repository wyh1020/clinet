<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click="load">
          <a class="nav-link text-light" href="#"> 返回上级菜单 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item" v-on:click="toTable">
          <a class="nav-link text-light" href="#">返回列表</a>
        </li>
        <li class="nav-item" v-on:click="newDoc">
          <a class="nav-link text-light" href="#">新建</a>
        </li>
        <li class="nav-item" v-on:click="save">
          <a class="nav-link text-light" href="#">保存</a>
        </li>
        <li class="nav-item" v-on:click="saveOther">
          <a class="nav-link text-light" href="#">另存为</a>
        </li>
        <li class="nav-item" v-on:click="del">
          <a class="nav-link text-light" href="#">删除</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            选择文档类型
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">病案首页（卫统四）</a>
            <a class="dropdown-item" href="#">病案首页</a>
            <a class="dropdown-item" href="#">首次病程</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">疾病名称</a>
          </div>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      </form>
    </div>
  </nav>
</template>

<script>

  export default {
    data() {
      return {
        name: this.$route.name
      };
    },
    methods: {
      load: function () {
        this.$router.push('/stat');
      },
      toTable: function () {
        this.$store.commit('EDIT_SET_LEFTPANEL', 'table')
      },
      newDoc: function () {
        this.$store.commit('EDIT_SET_LEFTPANEL', 'doc')
      },
      save: function () {

      },
      saveOther: function () {

      },
      del: function () {

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
