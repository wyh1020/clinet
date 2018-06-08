<template>
  <nav class="navbar navbar-expand-lg fixed-bottom">
    <a v-on:click='inviteUser(notice)' id="notice-bar" class="navbar-brand" href="#">系统通知：{{notice}}</a>
  </nav>
</template>

<script>
  import { join } from '../../utils/Socket'
  export default {
    computed: {
      notice: {
        get() {
          return this.$store.state.Home.notice
        }
      }
    },
    methods: {
      inviteUser(notice) {
        if (notice.includes('邀请您进入')) {
          join(this, this.$store.state.Edit.fileName, this.$store.state.Edit.socketRecord[this.$store.state.Edit.socketRecord.length - 1].room)
        }
      }
    }
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .navbar {
    background-image: linear-gradient(to right , #4772fe, #7997fa);
  }
  #notice-bar {
    color:#ffffff;
  }
</style>
