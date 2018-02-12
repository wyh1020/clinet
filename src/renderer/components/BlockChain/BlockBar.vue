<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='blockList'>
          <a class="nav-link text-light" href="#"> 区块列表 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='block'>
          <a class="nav-link text-light" href="#"> 区块内容 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='blockInfo'>
          <a class="nav-link text-light" href="#"> 区块内容明细 <span class="sr-only">(current)</span></a>
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
      blockList: function () {
        this.$store.commit('BLOCK_SET_TOOLBAR', 'blockList');
      },
      block: function () {
        this.$store.commit('BLOCK_SET_TOOLBAR', 'block');
      },
      blockInfo: function () {
        this.$store.commit('BLOCK_SET_TOOLBAR', 'blockInfo');
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
