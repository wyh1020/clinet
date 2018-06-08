<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='shareSearch()' id="block-chain-info">
          <a class="nav-link text-light" href="#"> 获取 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='shareInsert()' id="block-chain-peer">
          <a class="nav-link text-light" href="#"> 导入 <span class="sr-only">(current)</span></a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import { blockShare, insertBlockShare } from '../../utils/BlockBlock'
  export default {
    methods: {
      shareSearch: function () {
        blockShare(this, [this.$store.state.System.server, this.$store.state.System.port])
      },
      shareInsert: function () {
        insertBlockShare(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.Block.blockShareInsert])
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
  #navbarSupportedContent {
    background-image: linear-gradient(to right , #4772fe, #7997fa);
  }
  .nav-link {
    color:#ffffff;
  }

</style>
