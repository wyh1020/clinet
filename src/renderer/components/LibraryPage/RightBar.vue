<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='loadData'>
          <a class="nav-link text-light" href="#"> 本地文件 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='serverData'>
          <a class="nav-link text-light" href="#"> 远程文件 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active">
          <a class="nav-link text-light" href="#"> 前一页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active">
          <a class="nav-link text-light" href="#"> 后一页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='edit'>
          <a class="nav-link text-light" href="#"> 编辑数据 <span class="sr-only">(current)</span></a>
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
        paths: []
      };
    },
    methods: {
      loadData: function () {
        this.$store.commit('LIBRARY_LOAD_FILES');
      },
      serverData: function () {
        this.$store.commit('LIBRARY_SERVER_FILES');
      },
      edit: function () {
        this.$store.commit('EDIT_SET_LAST_NAV', '/library');
        this.$store.commit('EDIT_SET_RIGHT_PANEL', 'local');
        this.$router.push('/edit');
        // this.$store.commit('GET_PATH', 'paths');
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
