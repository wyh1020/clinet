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
  import LeftPanel from './BlockChain/LeftPanel';
  import MainPanel from './BlockChain/MainPanel';

  export default {
    name: 'block-chain',
    components: { NavBar, LeftPanel, MainPanel },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
      load() {
        this.$router.push('/home');
      },
    },
  };
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 100%; }

</style>
