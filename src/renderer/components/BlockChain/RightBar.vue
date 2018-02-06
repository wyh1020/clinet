<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='loadPath'>
          <a class="nav-link" href="#"> 选择本地数据表 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='loadPath'>
          <a class="nav-link" href="#"> DRG分组 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='loadPath'>
          <a class="nav-link" href="#"> DRG分析 <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">查找</button>
      </form>
    </div>
  </nav>
</template>

<script>
  export default {
    data() {
      return {
        paths: []
      };
    },
    methods: {
      loadPath: function () {
        this.$store.commit('GET_PATH', 'paths');
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
