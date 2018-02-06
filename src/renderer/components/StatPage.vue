<template>
  <div>
    <nav-bar></nav-bar>
    <main>
      <right-panel></right-panel>
    </main>
    <notice-bar></notice-bar>
  </div>
</template>

<script>
  import NavBar from './HomePage/NavBar';
  import RightPanel from './StatPage/RightPanel';
  import NoticeBar from './HomePage/NoticeBar';
  
  export default {
    name: 'stat-page',
    components: { NavBar, RightPanel, NoticeBar },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
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

</style>
