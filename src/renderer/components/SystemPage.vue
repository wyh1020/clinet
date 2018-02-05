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
  </div>
</template>

<script>
  import NavBar from './HomePage/NavBar';
  import LeftPanel from './SystemPage/LeftPanel';
  import MainPanel from './SystemPage/MainPanel';

  export default {
    name: 'system-page',
    components: { NavBar, LeftPanel, MainPanel },
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
