<template>
  <div>
    <nav-bar></nav-bar>
    <main>
      <div class="row">
        <div class="col-3">
          <left-panel></left-panel>
        </div>
        <div class="col-9">
          <main-panel></main-panel>
        </div>
      </div>
    </main>
    <notice-bar></notice-bar>
  </div>
</template>

<script>
  import NavBar from './HomePage/NavBar';
  import LeftPanel from './StatPage/LeftPanel';
  import MainPanel from './StatPage/MainPanel';
  import NoticeBar from './HomePage/NoticeBar';
  
  export default {
    name: 'stat-page',
    components: { NavBar, LeftPanel, MainPanel, NoticeBar },
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
